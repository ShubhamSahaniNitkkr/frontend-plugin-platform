import { useEffect } from 'react';
import { subscribeEvent } from '../events.js';
export function usePluginEvent(event, handler) {
    useEffect(() => {
        const unsubscribe = subscribeEvent(event, handler);
        return unsubscribe;
    }, [event, handler]);
}
//# sourceMappingURL=usePluginEvent.js.map