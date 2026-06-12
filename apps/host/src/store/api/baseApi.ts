import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';
import {
  recordApiCall,
  updateApiCall,
} from '../slices/platformObservabilitySlice';
import { API_URL } from '../../lib/apiUrl';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const loggingBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const start = performance.now();
  const url = typeof args === 'string' ? args : args.url;
  const method =
    typeof args === 'string' ? 'GET' : (args.method ?? 'GET').toUpperCase();
  const timestamp = new Date().toISOString();

  api.dispatch(
    recordApiCall({ method, url, status: 'pending', timestamp })
  );

  const result = await rawBaseQuery(args, api, extraOptions);
  const durationMs = Math.round(performance.now() - start);

  if (result.error) {
    api.dispatch(
      updateApiCall({
        method,
        url,
        status: 'error',
        statusCode: result.error.status as number | undefined,
        durationMs,
        error:
          typeof result.error.data === 'object' &&
          result.error.data &&
          'message' in result.error.data
            ? String((result.error.data as { message: string }).message)
            : 'Request failed',
      })
    );
  } else {
    api.dispatch(
      updateApiCall({
        method,
        url,
        status: 'success',
        statusCode: 200,
        durationMs,
      })
    );
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: loggingBaseQuery,
  tagTypes: [
    'User',
    'Marketplace',
    'Plugins',
    'Tasks',
    'Reports',
    'Telemetry',
    'Activity',
  ],
  endpoints: () => ({}),
});
