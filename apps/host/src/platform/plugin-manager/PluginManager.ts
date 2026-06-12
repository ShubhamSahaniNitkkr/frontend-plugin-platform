import { createPermissionMiddleware, EventBus } from '@fpp/event-bus';
import type {
  ConfigAPI,
  EventAPI,
  PermissionAPI,
  PluginContext,
  PluginLifecycle,
  PlatformServices,
  TelemetryAPI,
} from '@fpp/plugin-sdk';
import { hasPermission, type PluginManifest } from '@fpp/shared';
import type { AppDispatch } from '../../store';
import {
  patchPluginConfig,
  setPluginConfig,
} from '../../store/slices/pluginConfigSlice';
import {
  updatePluginHealth,
  updatePluginStatus,
} from '../../store/slices/pluginMetadataSlice';
import { componentRegistry } from '../component-registry/ComponentRegistry';
import { permissionGuard } from '../permissions/PermissionGuard';
import { executeDestroy, executeDisable, executeEnable } from './PluginLifecycle';
import { initializeHostBridge } from './PluginHostBridge';
import { pluginLoader } from './PluginLoader';

export interface PluginEnableOptions {
  pluginId: string;
  entry: string;
  permissions: string[];
  manifest: PluginManifest;
  getConfig: () => Record<string, unknown>;
  saveConfig: (partial: Record<string, unknown>) => Promise<void>;
  trackTelemetry: (
    event: string,
    payload?: Record<string, unknown>
  ) => void;
  navigate: (path: string) => void;
  notify: (
    message: string,
    variant?: 'info' | 'success' | 'error' | 'warning'
  ) => void;
  getTheme: () => 'light' | 'dark';
}

export class PlatformRuntime {
  eventBus = new EventBus();
  private lifecycles = new Map<string, PluginLifecycle>();
  private dispatch: AppDispatch;
  private getState: () => ReturnType<typeof import('../../store').store.getState>;

  constructor(
    dispatch: AppDispatch,
    getState: () => ReturnType<typeof import('../../store').store.getState>
  ) {
    this.dispatch = dispatch;
    this.getState = getState;

    this.eventBus.use(
      createPermissionMiddleware((source) =>
        permissionGuard.getPermissionsForSource(source)
      )
    );
  }

  setLifecycle(pluginId: string, lifecycle: PluginLifecycle): void {
    this.lifecycles.set(pluginId, lifecycle);
  }

  removeLifecycle(pluginId: string): void {
    this.lifecycles.delete(pluginId);
  }

  createPluginContext(manifest: PluginManifest): PluginContext {
    const pluginId = manifest.id;
    const permissions = permissionGuard.getPluginPermissions(pluginId);
    const state = this.getState();

    const config: ConfigAPI = {
      get: <T = Record<string, unknown>>() =>
        (state.pluginConfig.configs[pluginId] ?? {}) as T,
      set: async (partial) => {
        this.dispatch(patchPluginConfig({ pluginId, partial }));
      },
    };

    const permissionAPI: PermissionAPI = {
      getAll: () => permissions,
      has: (p) => hasPermission(permissions, p),
    };

    const events: EventAPI = {
      emit: (event, payload) => {
        this.eventBus.emit(event, payload, { source: pluginId, permissions });
      },
      subscribe: (event, handler) =>
        this.eventBus.subscribe(event, (_payload, _meta) => handler(_payload), {
          pluginId,
        }),
      subscribePattern: (pattern, handler) =>
        this.eventBus.subscribePattern(
          pattern,
          (event, payload) => handler(event, payload),
          { pluginId }
        ),
    };

    const telemetry: TelemetryAPI = {
      track: (event, payload) => {
        this.eventBus.emit(
          'plugin.enabled',
          { pluginId, version: manifest.version },
          { source: 'host' }
        );
        void event;
        void payload;
      },
      measure: (name, durationMs) => {
        void name;
        void durationMs;
      },
    };

    const services: PlatformServices = {
      eventBus: this.eventBus,
      navigate: (path) => {
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      },
      notify: (message, variant = 'info') => {
        this.eventBus.emit(
          'notification.show',
          { message, variant },
          { source: pluginId }
        );
      },
      getTheme: () => this.getState().theme.mode,
      telemetry,
    };

    return {
      pluginId,
      manifest,
      services,
      config,
      permissions: permissionAPI,
      events,
      telemetry,
    };
  }
}

export class PluginManager {
  private runtime: PlatformRuntime;
  private initialized = false;

  constructor(
    dispatch: AppDispatch,
    getState: () => ReturnType<typeof import('../../store').store.getState>
  ) {
    this.runtime = new PlatformRuntime(dispatch, getState);
  }

  initialize(): void {
    if (this.initialized) return;
    initializeHostBridge(this.runtime);
    this.initialized = true;
  }

  getEventBus(): EventBus {
    return this.runtime.eventBus;
  }

  async enablePlugin(options: PluginEnableOptions): Promise<boolean> {
    this.initialize();

    const { pluginId, entry, permissions, manifest } = options;

    permissionGuard.setPluginPermissions(pluginId, permissions);

    componentRegistry.unregisterPlugin(pluginId);

    const loadResult = await pluginLoader.load(entry, pluginId);

    if (!loadResult.success) {
      this.getDispatch().updateHealth(pluginId, 'unhealthy', loadResult.error, loadResult.loadTimeMs);
      return false;
    }

    try {
      const ctx = this.runtime.createPluginContext(manifest);
      const lifecycle = this.runtime['lifecycles'].get(pluginId);
      await executeEnable(lifecycle, ctx);

      this.getDispatch().updateStatus(pluginId, 'enabled');
      this.getDispatch().updateHealth(pluginId, 'healthy', null, loadResult.loadTimeMs);

      this.runtime.eventBus.emit(
        'plugin.enabled',
        { pluginId, version: manifest.version },
        { source: 'host' }
      );

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Enable failed';
      this.getDispatch().updateHealth(pluginId, 'unhealthy', message);
      componentRegistry.unregisterPlugin(pluginId);
      pluginLoader.unload(pluginId);
      return false;
    }
  }

  async disablePlugin(
    pluginId: string,
    manifest: PluginManifest
  ): Promise<void> {
    const lifecycle = this.runtime['lifecycles'].get(pluginId);
    const ctx = this.runtime.createPluginContext(manifest);

    try {
      await executeDisable(lifecycle, ctx);
    } catch (error) {
      console.error(`[PluginManager] disable error for ${pluginId}:`, error);
    }

    componentRegistry.unregisterPlugin(pluginId);
    this.runtime.eventBus.unsubscribeAll(pluginId);
    this.runtime.removeLifecycle(pluginId);
    pluginLoader.unload(pluginId);
    permissionGuard.removePlugin(pluginId);

    this.getDispatch().updateStatus(pluginId, 'disabled');

    this.runtime.eventBus.emit(
      'plugin.disabled',
      { pluginId },
      { source: 'host' }
    );
  }

  async destroyPlugin(
    pluginId: string,
    manifest: PluginManifest
  ): Promise<void> {
    const lifecycle = this.runtime['lifecycles'].get(pluginId);
    const ctx = this.runtime.createPluginContext(manifest);

    try {
      await executeDestroy(lifecycle, ctx);
    } catch (error) {
      console.error(`[PluginManager] destroy error for ${pluginId}:`, error);
    }

    componentRegistry.unregisterPlugin(pluginId);
    this.runtime.eventBus.unsubscribeAll(pluginId);
    this.runtime.removeLifecycle(pluginId);
    pluginLoader.unload(pluginId);
    permissionGuard.removePlugin(pluginId);
  }

  private getDispatch() {
    const dispatch = this.runtime['dispatch'] as AppDispatch;
    return {
      updateStatus: (id: string, status: 'enabled' | 'disabled') =>
        dispatch(updatePluginStatus({ id, status })),
      updateHealth: (
        id: string,
        health: 'healthy' | 'degraded' | 'unhealthy',
        lastError?: string | null,
        loadTimeMs?: number | null
      ) =>
        dispatch(
          updatePluginHealth({ id, health, lastError, loadTimeMs })
        ),
    };
  }
}

let pluginManagerInstance: PluginManager | null = null;

export function getPluginManager(
  dispatch: AppDispatch,
  getState: () => ReturnType<typeof import('../../store').store.getState>
): PluginManager {
  if (!pluginManagerInstance) {
    pluginManagerInstance = new PluginManager(dispatch, getState);
  }
  return pluginManagerInstance;
}
