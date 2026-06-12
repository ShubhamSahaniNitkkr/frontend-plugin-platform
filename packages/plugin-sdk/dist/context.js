let hostBridge = null;
let currentPluginId = null;
export function setHostBridge(bridge) {
    hostBridge = bridge;
    if (typeof window !== 'undefined') {
        window.__FPP_HOST_BRIDGE__ = bridge;
    }
}
export function getHostBridge() {
    const bridge = hostBridge ??
        (typeof window !== 'undefined' ? window.__FPP_HOST_BRIDGE__ : null);
    if (!bridge) {
        throw new Error('[PluginSDK] Host bridge not initialized');
    }
    return bridge;
}
export function setCurrentPluginId(pluginId) {
    currentPluginId = pluginId;
}
export function getCurrentPluginId() {
    if (!currentPluginId) {
        throw new Error('[PluginSDK] registerPlugin must be called during plugin load');
    }
    return currentPluginId;
}
export function clearCurrentPluginId() {
    currentPluginId = null;
}
//# sourceMappingURL=context.js.map