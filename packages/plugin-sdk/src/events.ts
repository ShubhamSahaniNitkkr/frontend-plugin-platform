import type { PlatformEventMap, PlatformEventName } from '@fpp/shared';
import { getPluginContext, resolvePluginId } from './context.js';

export function emitEvent<K extends PlatformEventName>(
  event: K,
  payload: PlatformEventMap[K],
  pluginId?: string
): void {
  const id = resolvePluginId(pluginId);
  getPluginContext(id).events.emit(event, payload);
}

export function subscribeEvent<K extends PlatformEventName>(
  event: K,
  handler: (payload: PlatformEventMap[K]) => void,
  pluginId?: string
): () => void {
  const id = resolvePluginId(pluginId);
  return getPluginContext(id).events.subscribe(event, handler);
}
