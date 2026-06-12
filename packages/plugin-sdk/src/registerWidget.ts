import { getCurrentPluginId, getHostBridge } from './context.js';
import type { WidgetDefinition } from './types.js';

export function registerWidget(widget: WidgetDefinition): void {
  getCurrentPluginId();
  const bridge = getHostBridge();
  bridge.registerContributions({
    manifest: { id: getCurrentPluginId() } as never,
    widgets: [widget],
  });
}
