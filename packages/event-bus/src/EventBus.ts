import {
  EVENT_SCHEMAS,
  hasPermission,
  type PlatformEventMap,
  type PlatformEventName,
} from '@fpp/shared';
import type {
  EmitContext,
  EventHandler,
  EventMeta,
  EventMiddleware,
  PatternHandler,
  SubscribeOptions,
  UnsubscribeFn,
} from './types.js';

type Subscription = {
  id: string;
  event: string;
  handler: EventHandler<PlatformEventName> | PatternHandler;
  pluginId?: string;
  once?: boolean;
  isPattern: boolean;
};

export class EventBus {
  private subscriptions = new Map<string, Subscription[]>();
  private middleware: EventMiddleware[] = [];
  private subscriptionCounter = 0;

  use(middleware: EventMiddleware): void {
    this.middleware.push(middleware);
  }

  emit<K extends PlatformEventName>(
    event: K,
    payload: PlatformEventMap[K],
    context: EmitContext
  ): void {
    const schema = EVENT_SCHEMAS[event];
    const result = schema.safeParse(payload);
    if (!result.success) {
      console.error(`[EventBus] Invalid payload for ${event}:`, result.error);
      return;
    }

    const meta: EventMeta = {
      source: context.source,
      timestamp: new Date().toISOString(),
    };

    this.runMiddleware(event, payload, meta, () => {
      this.dispatch(event, payload, meta);
    });
  }

  subscribe<K extends PlatformEventName>(
    event: K,
    handler: EventHandler<K>,
    options: SubscribeOptions = {}
  ): UnsubscribeFn {
    const id = `sub_${++this.subscriptionCounter}`;
    const subscription: Subscription = {
      id,
      event,
      handler: handler as EventHandler<PlatformEventName>,
      pluginId: options.pluginId,
      once: options.once,
      isPattern: false,
    };

    this.addSubscription(event, subscription);
    return () => this.removeSubscription(event, id);
  }

  subscribePattern(
    pattern: string,
    handler: PatternHandler,
    options: SubscribeOptions = {}
  ): UnsubscribeFn {
    const id = `sub_${++this.subscriptionCounter}`;
    const subscription: Subscription = {
      id,
      event: pattern,
      handler,
      pluginId: options.pluginId,
      once: options.once,
      isPattern: true,
    };

    this.addSubscription(pattern, subscription);
    return () => this.removeSubscription(pattern, id);
  }

  unsubscribeAll(pluginId: string): void {
    for (const [event, subs] of this.subscriptions.entries()) {
      const remaining = subs.filter((s) => s.pluginId !== pluginId);
      if (remaining.length === 0) {
        this.subscriptions.delete(event);
      } else {
        this.subscriptions.set(event, remaining);
      }
    }
  }

  getSubscriptionCount(event?: string): number {
    if (event) {
      return this.subscriptions.get(event)?.length ?? 0;
    }
    let total = 0;
    for (const subs of this.subscriptions.values()) {
      total += subs.length;
    }
    return total;
  }

  getSubscriptionSummary(): { event: string; count: number; listeners: string[] }[] {
    return Array.from(this.subscriptions.entries()).map(([event, subs]) => ({
      event,
      count: subs.length,
      listeners: subs.map((s) => s.pluginId ?? 'host'),
    }));
  }

  observe(
    listener: (event: string, payload: unknown, meta: EventMeta) => void
  ): UnsubscribeFn {
    const id = `obs_${++this.subscriptionCounter}`;
    const observer = { id, listener };
    if (!this.observers) {
      this.observers = [];
    }
    this.observers.push(observer);
    return () => {
      this.observers = this.observers?.filter((o) => o.id !== id);
    };
  }

  private observers: { id: string; listener: (event: string, payload: unknown, meta: EventMeta) => void }[] = [];

  clear(): void {
    this.subscriptions.clear();
  }

  private addSubscription(event: string, subscription: Subscription): void {
    const existing = this.subscriptions.get(event) ?? [];
    existing.push(subscription);
    this.subscriptions.set(event, existing);
  }

  private removeSubscription(event: string, id: string): void {
    const existing = this.subscriptions.get(event) ?? [];
    const remaining = existing.filter((s) => s.id !== id);
    if (remaining.length === 0) {
      this.subscriptions.delete(event);
    } else {
      this.subscriptions.set(event, remaining);
    }
  }

  private runMiddleware(
    event: string,
    payload: unknown,
    meta: EventMeta,
    final: () => void
  ): void {
    let index = 0;
    const next = () => {
      if (index < this.middleware.length) {
        const mw = this.middleware[index++];
        mw(event, payload, meta, next);
      } else {
        final();
      }
    };
    next();
  }

  private dispatch(event: string, payload: unknown, meta: EventMeta): void {
    const exactSubs = this.subscriptions.get(event) ?? [];
    const patternSubs: Subscription[] = [];

    for (const [pattern, subs] of this.subscriptions.entries()) {
      if (pattern.includes('*')) {
        for (const sub of subs) {
          if (sub.isPattern && this.matchesPattern(pattern, event)) {
            patternSubs.push(sub);
          }
        }
      }
    }

    const allSubs = [...exactSubs.filter((s) => !s.isPattern), ...patternSubs];

    for (const sub of allSubs) {
      try {
        if (sub.isPattern) {
          (sub.handler as PatternHandler)(event, payload, meta);
        } else {
          (sub.handler as EventHandler<PlatformEventName>)(
            payload as PlatformEventMap[PlatformEventName],
            meta
          );
        }
        if (sub.once) {
          this.removeSubscription(sub.event, sub.id);
        }
      } catch (error) {
        console.error(`[EventBus] Handler error for ${event}:`, error);
      }
    }

    for (const observer of this.observers ?? []) {
      try {
        observer.listener(event, payload, meta);
      } catch (error) {
        console.error(`[EventBus] Observer error for ${event}:`, error);
      }
    }
  }

  private matchesPattern(pattern: string, event: string): boolean {
    if (pattern.endsWith('.*')) {
      const prefix = pattern.slice(0, -2);
      return event.startsWith(prefix);
    }
    return pattern === event;
  }
}

export function createPermissionMiddleware(
  getPermissions: (source: string) => string[]
): EventMiddleware {
  return (event, _payload, meta, next) => {
    const permissions = getPermissions(meta.source);
    const eventPermission = `events:${event.split('.')[0]}.*`;
    if (
      meta.source === 'host' ||
      hasPermission(permissions, eventPermission) ||
      hasPermission(permissions, `events:${event}`)
    ) {
      next();
    } else {
      console.warn(
        `[EventBus] Permission denied for ${meta.source} to emit ${event}`
      );
    }
  };
}
