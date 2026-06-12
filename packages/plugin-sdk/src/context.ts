import type { PluginHostBridge } from './types.js';

declare global {
  interface Window {
    __FPP_HOST_BRIDGE__?: PluginHostBridge;
  }
}

let hostBridge: PluginHostBridge | null = null;
let currentPluginId: string | null = null;

export function setHostBridge(bridge: PluginHostBridge): void {
  hostBridge = bridge;
  if (typeof window !== 'undefined') {
    window.__FPP_HOST_BRIDGE__ = bridge;
  }
}

export function getHostBridge(): PluginHostBridge {
  const bridge =
    hostBridge ??
    (typeof window !== 'undefined' ? window.__FPP_HOST_BRIDGE__ : null);
  if (!bridge) {
    throw new Error('[PluginSDK] Host bridge not initialized');
  }
  return bridge;
}

export function setCurrentPluginId(pluginId: string): void {
  currentPluginId = pluginId;
}

export function getCurrentPluginId(): string {
  if (currentPluginId) {
    return currentPluginId;
  }
  throw new Error(
    '[PluginSDK] Plugin ID not available — use hooks (usePluginEvent, usePluginConfig) inside plugin UI, or call during registerPlugin()'
  );
}

export function resolvePluginId(pluginId?: string): string {
  if (pluginId) return pluginId;
  if (currentPluginId) return currentPluginId;
  throw new Error('[PluginSDK] Plugin ID is required');
}

export function getPluginContext(pluginId: string) {
  return getHostBridge().getContext({ id: pluginId } as never);
}

export function clearCurrentPluginId(): void {
  currentPluginId = null;
}
