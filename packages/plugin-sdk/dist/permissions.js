import { getCurrentPluginId, getHostBridge } from './context.js';
export function getPermissions() {
    const pluginId = getCurrentPluginId();
    const bridge = getHostBridge();
    const ctx = bridge.getContext({ id: pluginId });
    return ctx.permissions.getAll();
}
export function hasPermission(permission) {
    const pluginId = getCurrentPluginId();
    const bridge = getHostBridge();
    const ctx = bridge.getContext({ id: pluginId });
    return ctx.permissions.has(permission);
}
//# sourceMappingURL=permissions.js.map