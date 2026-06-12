import type { PlatformEventMap, PlatformEventName } from '@fpp/shared';
export type EventHandler<K extends PlatformEventName> = (payload: PlatformEventMap[K], meta: EventMeta) => void;
export type PatternHandler = (event: string, payload: unknown, meta: EventMeta) => void;
export interface EventMeta {
    source: string;
    timestamp: string;
}
export type UnsubscribeFn = () => void;
export interface EmitContext {
    source: string;
    permissions?: string[];
}
export interface SubscribeOptions {
    pluginId?: string;
    once?: boolean;
}
export type EventMiddleware = (event: string, payload: unknown, meta: EventMeta, next: () => void) => void;
//# sourceMappingURL=types.d.ts.map