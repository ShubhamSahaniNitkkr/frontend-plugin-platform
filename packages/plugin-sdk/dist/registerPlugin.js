import { pluginManifestSchema } from '@fpp/shared';
import { clearCurrentPluginId, getHostBridge, setCurrentPluginId } from './context.js';
export function registerPlugin(definition) {
    const result = pluginManifestSchema.safeParse(definition.manifest);
    if (!result.success) {
        throw new Error(`[PluginSDK] Invalid manifest: ${result.error.message}`);
    }
    setCurrentPluginId(definition.manifest.id);
    try {
        const bridge = getHostBridge();
        bridge.registerContributions(definition);
    }
    finally {
        clearCurrentPluginId();
    }
}
//# sourceMappingURL=registerPlugin.js.map