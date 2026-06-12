import {
  setHostBridge,
  type PluginDefinition,
  type PluginHostBridge,
  type PluginContext,
} from '@fpp/plugin-sdk';
import type { PluginManifest } from '@fpp/shared';
import { componentRegistry } from '../component-registry/ComponentRegistry';
import { permissionGuard } from '../permissions/PermissionGuard';
import type { PlatformRuntime } from './PluginManager';

export function initializeHostBridge(runtime: PlatformRuntime): void {
  const bridge: PluginHostBridge = {
    registerContributions(definition: PluginDefinition) {
      const pluginId = definition.manifest.id;

      if (definition.routes) {
        for (const route of definition.routes) {
          componentRegistry.registerRoute({
            pluginId,
            path: route.path,
            component: route.component,
            label: route.label,
            permission: route.permission,
          });
        }
      }

      if (definition.widgets) {
        for (const widget of definition.widgets) {
          componentRegistry.registerWidget({
            pluginId,
            slot: widget.slot,
            component: widget.component,
            priority: widget.priority ?? 0,
          });
        }
      }

      if (definition.menuItems) {
        for (const item of definition.menuItems) {
          componentRegistry.registerMenuItem({
            pluginId,
            label: item.label,
            path: item.path,
            icon: item.icon,
            section: item.section,
            order: item.order ?? 0,
          });
        }
      }

      if (definition.settings) {
        componentRegistry.registerSettings({
          pluginId,
          component: definition.settings,
        });
      }

      if (definition.lifecycle) {
        runtime.setLifecycle(pluginId, definition.lifecycle);
      }

      if (definition.manifest.permissions) {
        permissionGuard.setPluginPermissions(
          pluginId,
          definition.manifest.permissions
        );
      }
    },

    getContext(manifest: PluginManifest): PluginContext {
      return runtime.createPluginContext(manifest);
    },

    cleanup(pluginId: string) {
      componentRegistry.unregisterPlugin(pluginId);
      permissionGuard.removePlugin(pluginId);
      runtime.eventBus.unsubscribeAll(pluginId);
      runtime.removeLifecycle(pluginId);
    },
  };

  setHostBridge(bridge);
}
