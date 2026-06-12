import { resolvePluginId, getPluginContext } from './context.js';
export function getConfiguration(pluginId) {
    const id = resolvePluginId(pluginId);
    return getPluginContext(id).config.get();
}
export async function setConfiguration(partial, pluginId) {
    const id = resolvePluginId(pluginId);
    await getPluginContext(id).config.set(partial);
}
//# sourceMappingURL=configuration.js.map