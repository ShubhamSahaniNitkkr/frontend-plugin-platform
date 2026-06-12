import { useCallback } from 'react';
import { hasPermission } from '@fpp/shared';
import { permissionGuard } from '../platform/permissions/PermissionGuard';

export function usePluginPermissions(pluginId: string) {
  const permissions = permissionGuard.getPluginPermissions(pluginId);

  const can = useCallback(
    (permission: string) => hasPermission(permissions, permission),
    [permissions]
  );

  return { permissions, can };
}
