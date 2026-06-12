import { useCallback, useEffect, useState } from 'react';
import { getPluginContext } from '../context.js';
import { usePluginId } from '../PluginIdContext.js';

export function usePluginConfig<T extends Record<string, unknown>>(
  defaults: T
): [T, (partial: Partial<T>) => Promise<void>] {
  const pluginId = usePluginId();
  const ctx = getPluginContext(pluginId);

  const [config, setConfig] = useState<T>(() => ({
    ...defaults,
    ...ctx.config.get<T>(),
  }));

  useEffect(() => {
    setConfig({ ...defaults, ...ctx.config.get<T>() });
  }, [pluginId]);

  const update = useCallback(
    async (partial: Partial<T>) => {
      const next = { ...config, ...partial };
      setConfig(next);
      await ctx.config.set(partial as Record<string, unknown>);
    },
    [config, ctx]
  );

  return [config, update];
}
