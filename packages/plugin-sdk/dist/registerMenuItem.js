import { getCurrentPluginId, getHostBridge } from './context.js';
export function registerMenuItem(menuItem) {
    getCurrentPluginId();
    const bridge = getHostBridge();
    bridge.registerContributions({
        manifest: { id: getCurrentPluginId() },
        menuItems: [menuItem],
    });
}
//# sourceMappingURL=registerMenuItem.js.map