import type { EventBus } from '@fpp/event-bus';
import type {
  MenuItemContribution,
  PluginManifest,
  PlatformEventMap,
  PlatformEventName,
  SlotId,
} from '@fpp/shared';
import type { ComponentType } from 'react';

export interface PluginLifecycle {
  onInstall?(ctx: PluginContext): Promise<void>;
  onEnable?(ctx: PluginContext): Promise<void>;
  onDisable?(ctx: PluginContext): Promise<void>;
  onUpdate?(ctx: PluginContext, fromVersion: string): Promise<void>;
  onUninstall?(ctx: PluginContext): Promise<void>;
  onDestroy?(ctx: PluginContext): Promise<void>;
}

export interface RouteDefinition {
  path: string;
  component: ComponentType;
  label?: string;
  permission?: string;
}

export interface WidgetDefinition {
  slot: SlotId;
  component: ComponentType;
  priority?: number;
}

export interface MenuItemDefinition extends MenuItemContribution {
  component?: never;
}

export interface PluginDefinition {
  manifest: PluginManifest;
  lifecycle?: PluginLifecycle;
  routes?: RouteDefinition[];
  widgets?: WidgetDefinition[];
  menuItems?: MenuItemDefinition[];
  settings?: ComponentType;
}

export interface PlatformServices {
  eventBus: EventBus;
  navigate: (path: string) => void;
  notify: (message: string, variant?: 'info' | 'success' | 'error' | 'warning') => void;
  getTheme: () => 'light' | 'dark';
  telemetry: TelemetryAPI;
}

export interface ConfigAPI {
  get<T = Record<string, unknown>>(): T;
  set(partial: Record<string, unknown>): Promise<void>;
}

export interface PermissionAPI {
  getAll(): string[];
  has(permission: string): boolean;
}

export interface EventAPI {
  emit<K extends PlatformEventName>(
    event: K,
    payload: PlatformEventMap[K]
  ): void;
  subscribe<K extends PlatformEventName>(
    event: K,
    handler: (payload: PlatformEventMap[K]) => void
  ): () => void;
  subscribePattern(
    pattern: string,
    handler: (event: string, payload: unknown) => void
  ): () => void;
}

export interface TelemetryAPI {
  track(event: string, payload?: Record<string, unknown>): void;
  measure(name: string, durationMs: number): void;
}

export interface PluginContext {
  pluginId: string;
  manifest: PluginManifest;
  services: PlatformServices;
  config: ConfigAPI;
  permissions: PermissionAPI;
  events: EventAPI;
  telemetry: TelemetryAPI;
}

export interface PluginHostBridge {
  registerContributions(definition: PluginDefinition): void;
  getContext(manifest: PluginManifest): PluginContext;
  cleanup(pluginId: string): void;
}
