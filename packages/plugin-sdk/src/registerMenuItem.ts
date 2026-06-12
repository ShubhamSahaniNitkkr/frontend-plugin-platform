import { getCurrentPluginId, getHostBridge } from './context.js';
import type { MenuItemDefinition } from './types.js';

export function registerMenuItem(menuItem: MenuItemDefinition): void {
  getCurrentPluginId();
  const bridge = getHostBridge();
  bridge.registerContributions({
    manifest: { id: getCurrentPluginId() } as never,
    menuItems: [menuItem],
  });
}
