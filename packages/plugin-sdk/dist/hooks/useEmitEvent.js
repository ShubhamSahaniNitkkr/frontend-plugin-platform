import { useCallback } from 'react';
import { getPluginContext } from '../context.js';
import { usePluginId } from '../PluginIdContext.js';
export function useEmitEvent() {
    const pluginId = usePluginId();
    const ctx = getPluginContext(pluginId);
    return useCallback((event, payload) => {
        ctx.events.emit(event, payload);
    }, [ctx]);
}
//# sourceMappingURL=useEmitEvent.js.map