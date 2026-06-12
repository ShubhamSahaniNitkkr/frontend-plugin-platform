import type { PluginHostBridge } from './types.js';
declare global {
    interface Window {
        __FPP_HOST_BRIDGE__?: PluginHostBridge;
    }
}
export declare function setHostBridge(bridge: PluginHostBridge): void;
export declare function getHostBridge(): PluginHostBridge;
export declare function setCurrentPluginId(pluginId: string): void;
export declare function getCurrentPluginId(): string;
export declare function clearCurrentPluginId(): void;
//# sourceMappingURL=context.d.ts.map