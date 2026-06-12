import { useCallback } from 'react';
import type { PlatformEventMap, PlatformEventName } from '@fpp/shared';
import { getPluginContext } from '../context.js';
import { usePluginId } from '../PluginIdContext.js';

export function useEmitEvent() {
  const pluginId = usePluginId();
  const ctx = getPluginContext(pluginId);

  return useCallback(
    <K extends PlatformEventName>(event: K, payload: PlatformEventMap[K]) => {
      ctx.events.emit(event, payload);
    },
    [ctx]
  );
}
