import { useCallback } from 'react';
import type { PlatformEventMap, PlatformEventName } from '@fpp/shared';
import { usePlatform } from '../platform/di/PlatformContext';

export function useEventBus() {
  const { eventBus } = usePlatform();

  const emit = useCallback(
    <K extends PlatformEventName>(
      event: K,
      payload: PlatformEventMap[K]
    ) => {
      eventBus.emit(event, payload, { source: 'host' });
    },
    [eventBus]
  );

  const subscribe = useCallback(
    <K extends PlatformEventName>(
      event: K,
      handler: (payload: PlatformEventMap[K]) => void
    ) => {
      return eventBus.subscribe(event, (payload) => handler(payload));
    },
    [eventBus]
  );

  return { emit, subscribe, eventBus };
}
