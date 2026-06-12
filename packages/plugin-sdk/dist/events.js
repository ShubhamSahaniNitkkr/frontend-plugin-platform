import { getPluginContext, resolvePluginId } from './context.js';
export function emitEvent(event, payload, pluginId) {
    const id = resolvePluginId(pluginId);
    getPluginContext(id).events.emit(event, payload);
}
export function subscribeEvent(event, handler, pluginId) {
    const id = resolvePluginId(pluginId);
    return getPluginContext(id).events.subscribe(event, handler);
}
//# sourceMappingURL=events.js.map