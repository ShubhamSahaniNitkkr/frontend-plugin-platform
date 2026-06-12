import { useCallback } from 'react';
import { getPluginContext } from '../context.js';
import { usePluginId } from '../PluginIdContext.js';
export function usePluginNotify() {
    const pluginId = usePluginId();
    const ctx = getPluginContext(pluginId);
    return useCallback((message, variant = 'info', title) => {
        ctx.events.emit('notification.show', { message, variant, title });
    }, [ctx]);
}
//# sourceMappingURL=usePluginNotify.js.map