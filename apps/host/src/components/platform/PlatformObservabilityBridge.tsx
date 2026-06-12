import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { recordEvent } from '../../store/slices/platformObservabilitySlice';
import { usePlatform } from '../../platform/di/PlatformContext';

/** Invisible bridge — taps EventBus and records to Redux for the platform console. */
export function PlatformObservabilityBridge() {
  const dispatch = useDispatch<AppDispatch>();
  const { eventBus } = usePlatform();

  useEffect(() => {
    return eventBus.observe((event, payload, meta) => {
      dispatch(
        recordEvent({
          event,
          source: meta.source,
          timestamp: meta.timestamp,
          payload,
        })
      );
    });
  }, [eventBus, dispatch]);

  return null;
}
