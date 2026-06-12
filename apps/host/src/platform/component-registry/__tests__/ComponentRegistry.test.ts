import { describe, it, expect, vi } from 'vitest';
import { ComponentRegistry } from '../ComponentRegistry';

const MockComponent = () => null;

describe('ComponentRegistry', () => {
  it('registers and retrieves widgets by slot', () => {
    const registry = new ComponentRegistry();

    registry.registerWidget({
      pluginId: 'p1',
      slot: 'dashboard.main',
      component: MockComponent,
      priority: 5,
    });
    registry.registerWidget({
      pluginId: 'p2',
      slot: 'dashboard.main',
      component: MockComponent,
      priority: 10,
    });

    const widgets = registry.getWidgets('dashboard.main');
    expect(widgets).toHaveLength(2);
    expect(widgets[0].pluginId).toBe('p2');
  });

  it('unregisters plugin contributions', () => {
    const registry = new ComponentRegistry();
    const listener = vi.fn();
    registry.subscribe(listener);

    registry.registerRoute({
      pluginId: 'p1',
      path: '/test',
      component: MockComponent,
    });
    registry.unregisterPlugin('p1');

    expect(registry.getRoutes()).toHaveLength(0);
    expect(listener).toHaveBeenCalled();
  });
});
