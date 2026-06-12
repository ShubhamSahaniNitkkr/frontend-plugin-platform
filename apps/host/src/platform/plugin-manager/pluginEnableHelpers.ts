import type { PluginManifest } from '@fpp/shared';
import type { InstalledPlugin, MarketplacePlugin } from '@fpp/shared';
import type { PluginManager, PluginEnableOptions } from './PluginManager';
import type { AppDispatch } from '../../store';
import { store } from '../../store';
import { setPluginConfig } from '../../store/slices/pluginConfigSlice';

export function toManifest(
  plugin: Pick<
    InstalledPlugin | MarketplacePlugin,
    'id' | 'name' | 'description' | 'author' | 'permissions'
  > & { version?: string; latestVersion?: string; entry?: string }
): PluginManifest {
  return {
    id: plugin.id,
    name: plugin.name,
    version: plugin.version ?? plugin.latestVersion ?? '1.0.0',
    description: plugin.description,
    author: plugin.author,
    entry: plugin.entry ?? `/plugins/${plugin.id}/index.js`,
    hostCompatibility: '^1.0.0',
    permissions: plugin.permissions as PluginManifest['permissions'],
  };
}

export function buildEnableOptions(
  plugin: InstalledPlugin | (MarketplacePlugin & { version?: string; entry?: string }),
  pluginManager: PluginManager,
  dispatch: AppDispatch
): PluginEnableOptions {
  const manifest = toManifest(plugin);
  return {
    pluginId: plugin.id,
    entry: manifest.entry,
    permissions: plugin.permissions,
    manifest,
    getConfig: () => store.getState().pluginConfig.configs[plugin.id] ?? {},
    saveConfig: async (partial) => {
      dispatch(setPluginConfig({ pluginId: plugin.id, config: partial }));
    },
    trackTelemetry: () => {},
    navigate: (path) => {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.dispatchEvent(new CustomEvent('fpp:navigate'));
    },
    notify: (message, variant) => {
      pluginManager.getEventBus().emit(
        'notification.show',
        { message, variant: variant ?? 'info' },
        { source: 'host' }
      );
    },
    getTheme: () => store.getState().theme.mode,
  };
}
