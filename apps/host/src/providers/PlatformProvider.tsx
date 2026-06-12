import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { store } from '../store';
import { useGetInstalledPluginsQuery } from '../store/api/pluginRegistryApi';
import { setPlugins } from '../store/slices/pluginMetadataSlice';
import { setLocale } from '../store/slices/localeSlice';
import { setPrimaryColor } from '../store/slices/themeSlice';
import { PlatformProvider as PlatformCtx } from '../platform/di/PlatformContext';
import { getPluginManager } from '../platform/plugin-manager/PluginManager';
import { buildEnableOptions } from '../platform/plugin-manager/pluginEnableHelpers';
import type { Locale } from '../i18n/translations';
import { PlatformObservabilityBridge } from '../components/platform/PlatformObservabilityBridge';

export function PlatformProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const { data, isSuccess } = useGetInstalledPluginsQuery(undefined, {
    skip: !user.token,
  });
  const bootstrappedRef = useRef(false);
  const loggedInEmittedRef = useRef(false);

  const pluginManager = useMemo(
    () => getPluginManager(dispatch, () => store.getState()),
    [dispatch]
  );

  const platformValue = useMemo(
    () => ({
      pluginManager,
      eventBus: pluginManager.getEventBus(),
    }),
    [pluginManager]
  );

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(
        setPlugins(
          data.data.map((p) => ({
            id: p.id,
            name: p.name,
            status: p.status,
            health: p.health,
            version: p.version,
            lastError: p.lastError,
            loadTimeMs: p.loadTimeMs,
            permissions: p.permissions,
            entry: p.entry,
          }))
        )
      );
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    const eventBus = pluginManager.getEventBus();

    const unsubLocale = eventBus.subscribe('locale.changed', (payload) => {
      dispatch(setLocale(payload.locale as Locale));
    });

    const unsubTheme = eventBus.subscribe('theme.preset', (payload) => {
      dispatch(setPrimaryColor(payload.primaryColor));
    });

    return () => {
      unsubLocale();
      unsubTheme();
    };
  }, [pluginManager, dispatch]);

  useEffect(() => {
    if (
      user.isAuthenticated &&
      user.id &&
      user.email &&
      !loggedInEmittedRef.current
    ) {
      loggedInEmittedRef.current = true;
      pluginManager.getEventBus().emit(
        'user.loggedIn',
        {
          userId: user.id,
          email: user.email,
          timestamp: new Date().toISOString(),
        },
        { source: 'host' }
      );
    }
  }, [user.isAuthenticated, user.id, user.email, pluginManager]);

  useEffect(() => {
    if (!isSuccess || !data?.data || bootstrappedRef.current) return;
    bootstrappedRef.current = true;

    const enablePlugins = async () => {
      for (const plugin of data.data) {
        if (plugin.status === 'enabled') {
          await pluginManager.enablePlugin(
            buildEnableOptions(plugin, pluginManager, dispatch)
          );
        }
      }
      window.dispatchEvent(new CustomEvent('fpp:navigate'));
    };

    void enablePlugins();
  }, [isSuccess, data, pluginManager, dispatch]);

  return (
    <PlatformCtx value={platformValue}>
      <PlatformObservabilityBridge />
      {children}
    </PlatformCtx>
  );
}
