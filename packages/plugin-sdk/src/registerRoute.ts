import { getCurrentPluginId, getHostBridge } from './context.js';
import type { RouteDefinition } from './types.js';

export function registerRoute(route: RouteDefinition): void {
  getCurrentPluginId();
  const bridge = getHostBridge();
  bridge.registerContributions({
    manifest: { id: getCurrentPluginId() } as never,
    routes: [route],
  });
}
