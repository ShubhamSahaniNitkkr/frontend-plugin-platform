import { type PlatformEventMap, type PlatformEventName } from '@fpp/shared';
import type { EmitContext, EventHandler, EventMiddleware, PatternHandler, SubscribeOptions, UnsubscribeFn } from './types.js';
export declare class EventBus {
    private subscriptions;
    private middleware;
    private subscriptionCounter;
    use(middleware: EventMiddleware): void;
    emit<K extends PlatformEventName>(event: K, payload: PlatformEventMap[K], context: EmitContext): void;
    subscribe<K extends PlatformEventName>(event: K, handler: EventHandler<K>, options?: SubscribeOptions): UnsubscribeFn;
    subscribePattern(pattern: string, handler: PatternHandler, options?: SubscribeOptions): UnsubscribeFn;
    unsubscribeAll(pluginId: string): void;
    getSubscriptionCount(event?: string): number;
    clear(): void;
    private addSubscription;
    private removeSubscription;
    private runMiddleware;
    private dispatch;
    private matchesPattern;
}
export declare function createPermissionMiddleware(getPermissions: (source: string) => string[]): EventMiddleware;
//# sourceMappingURL=EventBus.d.ts.map