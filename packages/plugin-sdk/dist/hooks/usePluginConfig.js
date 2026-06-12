import { useCallback, useEffect, useState } from 'react';
import { getPluginContext } from '../context.js';
import { usePluginId } from '../PluginIdContext.js';
export function usePluginConfig(defaults) {
    const pluginId = usePluginId();
    const ctx = getPluginContext(pluginId);
    const [config, setConfig] = useState(() => ({
        ...defaults,
        ...ctx.config.get(),
    }));
    useEffect(() => {
        setConfig({ ...defaults, ...ctx.config.get() });
    }, [pluginId]);
    const update = useCallback(async (partial) => {
        const next = { ...config, ...partial };
        setConfig(next);
        await ctx.config.set(partial);
    }, [config, ctx]);
    return [config, update];
}
//# sourceMappingURL=usePluginConfig.js.map