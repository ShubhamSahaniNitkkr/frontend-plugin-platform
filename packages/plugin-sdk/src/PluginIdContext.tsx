import { createContext, useContext, type ReactNode } from 'react';

const PluginIdContext = createContext<string | null>(null);

export function PluginIdProvider({
  pluginId,
  children,
}: {
  pluginId: string;
  children: ReactNode;
}) {
  return (
    <PluginIdContext.Provider value={pluginId}>
      {children}
    </PluginIdContext.Provider>
  );
}

export function usePluginId(): string {
  const pluginId = useContext(PluginIdContext);
  if (!pluginId) {
    throw new Error(
      '[PluginSDK] usePluginId must be used within PluginIdProvider (wrap plugin UI in PluginBoundary)'
    );
  }
  return pluginId;
}

export function tryGetPluginId(): string | null {
  return useContext(PluginIdContext);
}
