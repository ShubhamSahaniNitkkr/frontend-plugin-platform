import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export function usePlugin(pluginId: string) {
  const plugin = useSelector(
    (state: RootState) => state.pluginMetadata.plugins[pluginId]
  );
  const config = useSelector(
    (state: RootState) => state.pluginConfig.configs[pluginId] ?? {}
  );

  return { plugin, config, exists: !!plugin };
}

export function useEnabledPlugins() {
  return useSelector((state: RootState) =>
    Object.values(state.pluginMetadata.plugins).filter(
      (p) => p.status === 'enabled'
    )
  );
}
