import type { PlatformEventMap, PlatformEventName } from '@fpp/shared';
export declare function usePluginEvent<K extends PlatformEventName>(event: K, handler: (payload: PlatformEventMap[K]) => void): void;
//# sourceMappingURL=usePluginEvent.d.ts.map