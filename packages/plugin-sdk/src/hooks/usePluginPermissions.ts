import { useMemo } from 'react';
import { getPluginContext } from '../context.js';
import { usePluginId } from '../PluginIdContext.js';

export function usePluginPermissions() {
  const pluginId = usePluginId();
  const ctx = getPluginContext(pluginId);

  const permissions = ctx.permissions.getAll();

  const can = useMemo(
    () => (permission: string) => ctx.permissions.has(permission),
    [ctx, permissions]
  );

  return { permissions, can };
}
