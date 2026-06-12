import { hasPermission } from '@fpp/shared';

export class PermissionGuard {
  private pluginPermissions = new Map<string, string[]>();

  setPluginPermissions(pluginId: string, permissions: string[]): void {
    this.pluginPermissions.set(pluginId, permissions);
  }

  removePlugin(pluginId: string): void {
    this.pluginPermissions.delete(pluginId);
  }

  getPluginPermissions(pluginId: string): string[] {
    return this.pluginPermissions.get(pluginId) ?? [];
  }

  can(pluginId: string, permission: string): boolean {
    const permissions = this.getPluginPermissions(pluginId);
    return hasPermission(permissions, permission);
  }

  getPermissionsForSource(source: string): string[] {
    if (source === 'host') {
      return ['events:task.*', 'events:report.*', 'events:user.*'];
    }
    return this.getPluginPermissions(source);
  }
}

export const permissionGuard = new PermissionGuard();
