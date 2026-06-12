import { resolvePluginId, getPluginContext } from './context.js';
export function getPermissions(pluginId) {
    const id = resolvePluginId(pluginId);
    return getPluginContext(id).permissions.getAll();
}
export function hasPermission(permission, pluginId) {
    const id = resolvePluginId(pluginId);
    return getPluginContext(id).permissions.has(permission);
}
//# sourceMappingURL=permissions.js.map