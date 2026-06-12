import type { PlatformEventMap, PlatformEventName } from '@fpp/shared';
export declare function emitEvent<K extends PlatformEventName>(event: K, payload: PlatformEventMap[K], pluginId?: string): void;
export declare function subscribeEvent<K extends PlatformEventName>(event: K, handler: (payload: PlatformEventMap[K]) => void, pluginId?: string): () => void;
//# sourceMappingURL=events.d.ts.map