import { EVENT_SCHEMAS, hasPermission, } from '@fpp/shared';
export class EventBus {
    subscriptions = new Map();
    middleware = [];
    subscriptionCounter = 0;
    use(middleware) {
        this.middleware.push(middleware);
    }
    emit(event, payload, context) {
        const schema = EVENT_SCHEMAS[event];
        const result = schema.safeParse(payload);
        if (!result.success) {
            console.error(`[EventBus] Invalid payload for ${event}:`, result.error);
            return;
        }
        const meta = {
            source: context.source,
            timestamp: new Date().toISOString(),
        };
        this.runMiddleware(event, payload, meta, () => {
            this.dispatch(event, payload, meta);
        });
    }
    subscribe(event, handler, options = {}) {
        const id = `sub_${++this.subscriptionCounter}`;
        const subscription = {
            id,
            event,
            handler: handler,
            pluginId: options.pluginId,
            once: options.once,
            isPattern: false,
        };
        this.addSubscription(event, subscription);
        return () => this.removeSubscription(event, id);
    }
    subscribePattern(pattern, handler, options = {}) {
        const id = `sub_${++this.subscriptionCounter}`;
        const subscription = {
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
    unsubscribeAll(pluginId) {
        for (const [event, subs] of this.subscriptions.entries()) {
            const remaining = subs.filter((s) => s.pluginId !== pluginId);
            if (remaining.length === 0) {
                this.subscriptions.delete(event);
            }
            else {
                this.subscriptions.set(event, remaining);
            }
        }
    }
    getSubscriptionCount(event) {
        if (event) {
            return this.subscriptions.get(event)?.length ?? 0;
        }
        let total = 0;
        for (const subs of this.subscriptions.values()) {
            total += subs.length;
        }
        return total;
    }
    getSubscriptionSummary() {
        return Array.from(this.subscriptions.entries()).map(([event, subs]) => ({
            event,
            count: subs.length,
            listeners: subs.map((s) => s.pluginId ?? 'host'),
        }));
    }
    observe(listener) {
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
    observers = [];
    clear() {
        this.subscriptions.clear();
    }
    addSubscription(event, subscription) {
        const existing = this.subscriptions.get(event) ?? [];
        existing.push(subscription);
        this.subscriptions.set(event, existing);
    }
    removeSubscription(event, id) {
        const existing = this.subscriptions.get(event) ?? [];
        const remaining = existing.filter((s) => s.id !== id);
        if (remaining.length === 0) {
            this.subscriptions.delete(event);
        }
        else {
            this.subscriptions.set(event, remaining);
        }
    }
    runMiddleware(event, payload, meta, final) {
        let index = 0;
        const next = () => {
            if (index < this.middleware.length) {
                const mw = this.middleware[index++];
                mw(event, payload, meta, next);
            }
            else {
                final();
            }
        };
        next();
    }
    dispatch(event, payload, meta) {
        const exactSubs = this.subscriptions.get(event) ?? [];
        const patternSubs = [];
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
                    sub.handler(event, payload, meta);
                }
                else {
                    sub.handler(payload, meta);
                }
                if (sub.once) {
                    this.removeSubscription(sub.event, sub.id);
                }
            }
            catch (error) {
                console.error(`[EventBus] Handler error for ${event}:`, error);
            }
        }
        for (const observer of this.observers ?? []) {
            try {
                observer.listener(event, payload, meta);
            }
            catch (error) {
                console.error(`[EventBus] Observer error for ${event}:`, error);
            }
        }
    }
    matchesPattern(pattern, event) {
        if (pattern.endsWith('.*')) {
            const prefix = pattern.slice(0, -2);
            return event.startsWith(prefix);
        }
        return pattern === event;
    }
}
export function createPermissionMiddleware(getPermissions) {
    return (event, _payload, meta, next) => {
        const permissions = getPermissions(meta.source);
        const eventPermission = `events:${event.split('.')[0]}.*`;
        if (meta.source === 'host' ||
            hasPermission(permissions, eventPermission) ||
            hasPermission(permissions, `events:${event}`)) {
            next();
        }
        else {
            console.warn(`[EventBus] Permission denied for ${meta.source} to emit ${event}`);
        }
    };
}
//# sourceMappingURL=EventBus.js.map