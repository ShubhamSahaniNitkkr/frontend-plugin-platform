import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import localeReducer from './slices/localeSlice';
import pluginConfigReducer from './slices/pluginConfigSlice';
import pluginMetadataReducer from './slices/pluginMetadataSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import platformObservabilityReducer from './slices/platformObservabilitySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    locale: localeReducer,
    theme: themeReducer,
    pluginMetadata: pluginMetadataReducer,
    pluginConfig: pluginConfigReducer,
    platformObservability: platformObservabilityReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
