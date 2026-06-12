import type { InstalledPlugin } from '@fpp/shared';
import { baseApi } from './baseApi';

export const pluginRegistryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInstalledPlugins: builder.query<
      { data: InstalledPlugin[]; meta: { total: number; enabled: number } },
      void
    >({
      query: () => '/plugins',
      providesTags: ['Plugins'],
    }),
    installPlugin: builder.mutation<
      { data: InstalledPlugin },
      { id: string; version?: string }
    >({
      query: ({ id, version }) => ({
        url: `/plugins/${id}/install`,
        method: 'POST',
        body: { version },
      }),
      invalidatesTags: ['Plugins', 'Marketplace'],
    }),
    uninstallPlugin: builder.mutation<{ data: { success: boolean } }, string>({
      query: (id) => ({ url: `/plugins/${id}/uninstall`, method: 'DELETE' }),
      invalidatesTags: ['Plugins', 'Marketplace'],
    }),
    enablePlugin: builder.mutation<{ data: InstalledPlugin }, string>({
      query: (id) => ({ url: `/plugins/${id}/enable`, method: 'PATCH' }),
      invalidatesTags: ['Plugins', 'Marketplace'],
    }),
    disablePlugin: builder.mutation<{ data: InstalledPlugin }, string>({
      query: (id) => ({ url: `/plugins/${id}/disable`, method: 'PATCH' }),
      invalidatesTags: ['Plugins', 'Marketplace'],
    }),
    getPluginConfig: builder.query<
      { data: Record<string, unknown> },
      string
    >({
      query: (id) => `/plugins/${id}/config`,
    }),
    updatePluginConfig: builder.mutation<
      { data: Record<string, unknown> },
      { id: string; config: Record<string, unknown> }
    >({
      query: ({ id, config }) => ({
        url: `/plugins/${id}/config`,
        method: 'PATCH',
        body: config,
      }),
    }),
    updatePluginHealth: builder.mutation<
      { data: { success: boolean } },
      {
        id: string;
        health: string;
        lastError?: string | null;
        loadTimeMs?: number | null;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/plugins/${id}/health`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetInstalledPluginsQuery,
  useInstallPluginMutation,
  useUninstallPluginMutation,
  useEnablePluginMutation,
  useDisablePluginMutation,
  useGetPluginConfigQuery,
  useUpdatePluginConfigMutation,
  useUpdatePluginHealthMutation,
} = pluginRegistryApi;
