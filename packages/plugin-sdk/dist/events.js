import { getCurrentPluginId, getHostBridge } from './context.js';
export function emitEvent(event, payload) {
    const pluginId = getCurrentPluginId();
    const bridge = getHostBridge();
    const ctx = bridge.getContext({ id: pluginId });
    ctx.events.emit(event, payload);
}
export function subscribeEvent(event, handler) {
    const pluginId = getCurrentPluginId();
    const bridge = getHostBridge();
    const ctx = bridge.getContext({ id: pluginId });
    return ctx.events.subscribe(event, handler);
}
//# sourceMappingURL=events.js.map