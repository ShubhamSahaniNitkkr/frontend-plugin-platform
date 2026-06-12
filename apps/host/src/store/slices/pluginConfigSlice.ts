import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PluginConfigState {
  configs: Record<string, Record<string, unknown>>;
}

const initialState: PluginConfigState = {
  configs: {},
};

const pluginConfigSlice = createSlice({
  name: 'pluginConfig',
  initialState,
  reducers: {
    setPluginConfig(
      state,
      action: PayloadAction<{ pluginId: string; config: Record<string, unknown> }>
    ) {
      state.configs[action.payload.pluginId] = action.payload.config;
    },
    patchPluginConfig(
      state,
      action: PayloadAction<{
        pluginId: string;
        partial: Record<string, unknown>;
      }>
    ) {
      const current = state.configs[action.payload.pluginId] ?? {};
      state.configs[action.payload.pluginId] = {
        ...current,
        ...action.payload.partial,
      };
    },
  },
});

export const { setPluginConfig, patchPluginConfig } = pluginConfigSlice.actions;
export default pluginConfigSlice.reducer;
