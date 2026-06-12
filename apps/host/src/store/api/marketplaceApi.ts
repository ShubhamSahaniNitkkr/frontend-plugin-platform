import type { MarketplacePlugin } from '@fpp/shared';
import { baseApi } from './baseApi';

export const marketplaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarketplacePlugins: builder.query<
      { data: MarketplacePlugin[]; meta: { total: number } },
      void
    >({
      query: () => '/marketplace/plugins',
      providesTags: ['Marketplace'],
    }),
    getMarketplacePlugin: builder.query<{ data: MarketplacePlugin }, string>({
      query: (id) => `/marketplace/plugins/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Marketplace', id }],
    }),
  }),
});

export const {
  useGetMarketplacePluginsQuery,
  useGetMarketplacePluginQuery,
} = marketplaceApi;
