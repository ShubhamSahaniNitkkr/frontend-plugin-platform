import { useSyncExternalStore } from 'react';
import type { SlotId } from '@fpp/shared';
import { componentRegistry } from '../platform/component-registry/ComponentRegistry';

const subscribe = (cb: () => void) => componentRegistry.subscribe(cb);
const getServerSnapshot = () => [] as ReturnType<typeof componentRegistry.getWidgets>;

export function usePluginSlot(slotId: SlotId) {
  return useSyncExternalStore(
    subscribe,
    () => componentRegistry.getWidgets(slotId),
    getServerSnapshot
  );
}

const getServerRoutes = () => [] as ReturnType<typeof componentRegistry.getRoutes>;
const getServerMenuItems = () => [] as ReturnType<typeof componentRegistry.getMenuItems>;

export function usePluginRoutes() {
  return useSyncExternalStore(
    subscribe,
    () => componentRegistry.getRoutes(),
    getServerRoutes
  );
}

export function usePluginMenuItems() {
  return useSyncExternalStore(
    subscribe,
    () => componentRegistry.getMenuItems(),
    getServerMenuItems
  );
}
