import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { EventBus } from '@fpp/event-bus';
import type { PluginManager } from '../plugin-manager/PluginManager';

export interface PlatformContextValue {
  pluginManager: PluginManager;
  eventBus: EventBus;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({
  value,
  children,
}: {
  value: PlatformContextValue;
  children: ReactNode;
}) {
  const memoized = useMemo(() => value, [value.pluginManager, value.eventBus]);
  return (
    <PlatformContext.Provider value={memoized}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform(): PlatformContextValue {
  const ctx = useContext(PlatformContext);
  if (!ctx) {
    throw new Error('usePlatform must be used within PlatformProvider');
  }
  return ctx;
}
