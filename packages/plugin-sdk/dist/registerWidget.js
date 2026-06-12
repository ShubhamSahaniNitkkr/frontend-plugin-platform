import { getCurrentPluginId, getHostBridge } from './context.js';
export function registerWidget(widget) {
    getCurrentPluginId();
    const bridge = getHostBridge();
    bridge.registerContributions({
        manifest: { id: getCurrentPluginId() },
        widgets: [widget],
    });
}
//# sourceMappingURL=registerWidget.js.map