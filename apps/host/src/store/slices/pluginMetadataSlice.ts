import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PluginHealth, PluginStatus } from '@fpp/shared';

export interface PluginMetadataEntry {
  id: string;
  name: string;
  status: PluginStatus;
  health: PluginHealth;
  version: string;
  lastError: string | null;
  loadTimeMs: number | null;
  permissions: string[];
  entry: string;
}

interface PluginMetadataState {
  plugins: Record<string, PluginMetadataEntry>;
  loading: boolean;
}

const initialState: PluginMetadataState = {
  plugins: {},
  loading: false,
};

const pluginMetadataSlice = createSlice({
  name: 'pluginMetadata',
  initialState,
  reducers: {
    setPlugins(state, action: PayloadAction<PluginMetadataEntry[]>) {
      state.plugins = {};
      for (const plugin of action.payload) {
        state.plugins[plugin.id] = plugin;
      }
    },
    updatePluginStatus(
      state,
      action: PayloadAction<{ id: string; status: PluginStatus }>
    ) {
      const plugin = state.plugins[action.payload.id];
      if (plugin) {
        plugin.status = action.payload.status;
      }
    },
    updatePluginHealth(
      state,
      action: PayloadAction<{
        id: string;
        health: PluginHealth;
        lastError?: string | null;
        loadTimeMs?: number | null;
      }>
    ) {
      const plugin = state.plugins[action.payload.id];
      if (plugin) {
        plugin.health = action.payload.health;
        if (action.payload.lastError !== undefined) {
          plugin.lastError = action.payload.lastError;
        }
        if (action.payload.loadTimeMs !== undefined) {
          plugin.loadTimeMs = action.payload.loadTimeMs;
        }
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setPlugins,
  updatePluginStatus,
  updatePluginHealth,
  setLoading,
} = pluginMetadataSlice.actions;
export default pluginMetadataSlice.reducer;
