import { describe, it, expect, vi } from 'vitest';
import { EventBus } from '../EventBus';

describe('EventBus', () => {
  it('emits and receives events', () => {
    const bus = new EventBus();
    const handler = vi.fn();

    bus.subscribe('task.created', handler);
    bus.emit(
      'task.created',
      { taskId: '1', title: 'Test', userId: 'u1' },
      { source: 'host' }
    );

    expect(handler).toHaveBeenCalledWith(
      { taskId: '1', title: 'Test', userId: 'u1' },
      expect.objectContaining({ source: 'host' })
    );
  });

  it('unsubscribes correctly', () => {
    const bus = new EventBus();
    const handler = vi.fn();
    const unsub = bus.subscribe('task.created', handler);

    unsub();
    bus.emit(
      'task.created',
      { taskId: '1', title: 'Test', userId: 'u1' },
      { source: 'host' }
    );

    expect(handler).not.toHaveBeenCalled();
  });

  it('supports pattern subscriptions', () => {
    const bus = new EventBus();
    const handler = vi.fn();

    bus.subscribePattern('task.*', handler);
    bus.emit(
      'task.created',
      { taskId: '1', title: 'Test', userId: 'u1' },
      { source: 'host' }
    );

    expect(handler).toHaveBeenCalled();
  });

  it('unsubscribes all for a plugin', () => {
    const bus = new EventBus();
    const handler = vi.fn();

    bus.subscribe('task.created', handler, { pluginId: 'p1' });
    bus.unsubscribeAll('p1');
    bus.emit(
      'task.created',
      { taskId: '1', title: 'Test', userId: 'u1' },
      { source: 'host' }
    );

    expect(handler).not.toHaveBeenCalled();
  });
});
