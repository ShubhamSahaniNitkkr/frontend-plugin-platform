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
    if (currentPluginId) {
        return currentPluginId;
    }
    throw new Error('[PluginSDK] Plugin ID not available — use hooks (usePluginEvent, usePluginConfig) inside plugin UI, or call during registerPlugin()');
}
export function resolvePluginId(pluginId) {
    if (pluginId)
        return pluginId;
    if (currentPluginId)
        return currentPluginId;
    throw new Error('[PluginSDK] Plugin ID is required');
}
export function getPluginContext(pluginId) {
    return getHostBridge().getContext({ id: pluginId });
}
export function clearCurrentPluginId() {
    currentPluginId = null;
}
//# sourceMappingURL=context.js.map