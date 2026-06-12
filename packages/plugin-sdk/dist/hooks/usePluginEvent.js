import { useEffect } from 'react';
import { getPluginContext } from '../context.js';
import { usePluginId } from '../PluginIdContext.js';
export function usePluginEvent(event, handler) {
    const pluginId = usePluginId();
    useEffect(() => {
        const ctx = getPluginContext(pluginId);
        return ctx.events.subscribe(event, handler);
    }, [pluginId, event, handler]);
}
//# sourceMappingURL=usePluginEvent.js.map