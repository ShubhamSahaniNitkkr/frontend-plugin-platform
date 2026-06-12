import { getCurrentPluginId, getHostBridge } from './context.js';
export function getConfiguration() {
    const pluginId = getCurrentPluginId();
    const bridge = getHostBridge();
    const ctx = bridge.getContext({ id: pluginId });
    return ctx.config.get();
}
export async function setConfiguration(partial) {
    const pluginId = getCurrentPluginId();
    const bridge = getHostBridge();
    const ctx = bridge.getContext({ id: pluginId });
    await ctx.config.set(partial);
}
//# sourceMappingURL=configuration.js.map