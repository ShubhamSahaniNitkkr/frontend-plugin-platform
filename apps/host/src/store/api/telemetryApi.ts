import { baseApi } from './baseApi';

export interface ActivityFeedItem {
  id: string;
  type: string;
  message: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface PluginTelemetry {
  pluginId: string;
  events: { event: string; count: number }[];
  errorCount: number;
  totalEvents: number;
}

export const telemetryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivityFeed: builder.query<{ data: ActivityFeedItem[] }, void>({
      query: () => '/telemetry/activity',
      providesTags: ['Activity'],
    }),
    getPluginTelemetry: builder.query<{ data: PluginTelemetry }, string>({
      query: (id) => `/telemetry/plugins/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Telemetry', id }],
    }),
  }),
});

export const { useGetActivityFeedQuery, useGetPluginTelemetryQuery } = telemetryApi;
