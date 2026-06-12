import { useCallback, useEffect, useState } from 'react';
import { getConfiguration, setConfiguration } from '../configuration.js';
export function usePluginConfig(defaults) {
    const [config, setConfig] = useState(() => ({
        ...defaults,
        ...getConfiguration(),
    }));
    useEffect(() => {
        setConfig({ ...defaults, ...getConfiguration() });
    }, []);
    const update = useCallback(async (partial) => {
        const next = { ...config, ...partial };
        setConfig(next);
        await setConfiguration(partial);
    }, [config]);
    return [config, update];
}
//# sourceMappingURL=usePluginConfig.js.map