import { useEffect } from 'react';
import type { PlatformEventMap, PlatformEventName } from '@fpp/shared';
import { getPluginContext } from '../context.js';
import { usePluginId } from '../PluginIdContext.js';

export function usePluginEvent<K extends PlatformEventName>(
  event: K,
  handler: (payload: PlatformEventMap[K]) => void
): void {
  const pluginId = usePluginId();

  useEffect(() => {
    const ctx = getPluginContext(pluginId);
    return ctx.events.subscribe(event, handler);
  }, [pluginId, event, handler]);
}
