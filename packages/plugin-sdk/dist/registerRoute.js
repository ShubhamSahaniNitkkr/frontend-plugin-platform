import { getCurrentPluginId, getHostBridge } from './context.js';
export function registerRoute(route) {
    getCurrentPluginId();
    const bridge = getHostBridge();
    bridge.registerContributions({
        manifest: { id: getCurrentPluginId() },
        routes: [route],
    });
}
//# sourceMappingURL=registerRoute.js.map