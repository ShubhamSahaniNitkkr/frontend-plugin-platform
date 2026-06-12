import { resolvePluginId, getPluginContext } from './context.js';

export function getPermissions(pluginId?: string): string[] {
  const id = resolvePluginId(pluginId);
  return getPluginContext(id).permissions.getAll();
}

export function hasPermission(permission: string, pluginId?: string): boolean {
  const id = resolvePluginId(pluginId);
  return getPluginContext(id).permissions.has(permission);
}
