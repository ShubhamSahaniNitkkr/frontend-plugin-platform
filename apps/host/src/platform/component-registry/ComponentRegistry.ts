import type { SlotId } from '@fpp/shared';
import type { ComponentType } from 'react';

export interface RegisteredRoute {
  pluginId: string;
  path: string;
  component: ComponentType;
  label?: string;
  permission?: string;
}

export interface RegisteredWidget {
  pluginId: string;
  slot: SlotId;
  component: ComponentType;
  priority: number;
}

export interface RegisteredMenuItem {
  pluginId: string;
  label: string;
  path: string;
  icon?: string;
  section?: string;
  order: number;
}

export interface RegisteredSettings {
  pluginId: string;
  component: ComponentType;
}

const EMPTY_ROUTES: RegisteredRoute[] = [];
const EMPTY_MENU_ITEMS: RegisteredMenuItem[] = [];
const EMPTY_SETTINGS: RegisteredSettings[] = [];
const EMPTY_WIDGETS: RegisteredWidget[] = [];

export interface RegistryStats {
  routes: number;
  widgets: number;
  menuItems: number;
  settings: number;
}

export interface ContributionSnapshot {
  routes: Array<{ pluginId: string; path: string; label?: string }>;
  widgets: Array<{ pluginId: string; slot: SlotId; priority: number }>;
  menuItems: Array<{ pluginId: string; label: string; path: string }>;
}

const EMPTY_STATS: RegistryStats = {
  routes: 0,
  widgets: 0,
  menuItems: 0,
  settings: 0,
};

const EMPTY_CONTRIBUTIONS: ContributionSnapshot = {
  routes: [],
  widgets: [],
  menuItems: [],
};

export class ComponentRegistry {
  private routes: RegisteredRoute[] = [];
  private widgets: RegisteredWidget[] = [];
  private menuItems: RegisteredMenuItem[] = [];
  private settings: RegisteredSettings[] = [];
  private listeners = new Set<() => void>();
  private routesSnapshot: RegisteredRoute[] = EMPTY_ROUTES;
  private menuItemsSnapshot: RegisteredMenuItem[] = EMPTY_MENU_ITEMS;
  private settingsSnapshot: RegisteredSettings[] = EMPTY_SETTINGS;
  private widgetSnapshots = new Map<SlotId, RegisteredWidget[]>();
  private statsSnapshot: RegistryStats = EMPTY_STATS;
  private contributionsSnapshot: ContributionSnapshot = EMPTY_CONTRIBUTIONS;

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private invalidateSnapshots(): void {
    this.routesSnapshot = [...this.routes];
    this.menuItemsSnapshot = [...this.menuItems].sort((a, b) => a.order - b.order);
    this.settingsSnapshot = [...this.settings];
    this.widgetSnapshots.clear();
    this.statsSnapshot = {
      routes: this.routes.length,
      widgets: this.widgets.length,
      menuItems: this.menuItems.length,
      settings: this.settings.length,
    };
    this.contributionsSnapshot = {
      routes: this.routes.map((r) => ({
        pluginId: r.pluginId,
        path: r.path,
        label: r.label,
      })),
      widgets: this.widgets.map((w) => ({
        pluginId: w.pluginId,
        slot: w.slot,
        priority: w.priority,
      })),
      menuItems: this.menuItems.map((m) => ({
        pluginId: m.pluginId,
        label: m.label,
        path: m.path,
      })),
    };
  }

  private notify(): void {
    this.invalidateSnapshots();
    for (const listener of this.listeners) {
      listener();
    }
  }

  registerRoute(route: RegisteredRoute): void {
    this.routes.push(route);
    this.notify();
  }

  registerWidget(widget: RegisteredWidget): void {
    this.widgets.push(widget);
    this.notify();
  }

  registerMenuItem(item: RegisteredMenuItem): void {
    this.menuItems.push(item);
    this.notify();
  }

  registerSettings(settings: RegisteredSettings): void {
    this.settings.push(settings);
    this.notify();
  }

  unregisterPlugin(pluginId: string): void {
    this.routes = this.routes.filter((r) => r.pluginId !== pluginId);
    this.widgets = this.widgets.filter((w) => w.pluginId !== pluginId);
    this.menuItems = this.menuItems.filter((m) => m.pluginId !== pluginId);
    this.settings = this.settings.filter((s) => s.pluginId !== pluginId);
    this.notify();
  }

  getRoutes(): RegisteredRoute[] {
    return this.routesSnapshot;
  }

  getRoute(path: string): RegisteredRoute | undefined {
    return this.routes.find((r) => r.path === path);
  }

  getWidgets(slot: SlotId): RegisteredWidget[] {
    let snapshot = this.widgetSnapshots.get(slot);
    if (!snapshot) {
      const filtered = this.widgets
        .filter((w) => w.slot === slot)
        .sort((a, b) => b.priority - a.priority);
      snapshot = filtered.length > 0 ? filtered : EMPTY_WIDGETS;
      this.widgetSnapshots.set(slot, snapshot);
    }
    return snapshot;
  }

  getMenuItems(): RegisteredMenuItem[] {
    return this.menuItemsSnapshot;
  }

  getSettings(): RegisteredSettings[] {
    return this.settingsSnapshot;
  }

  getStats(): RegistryStats {
    return this.statsSnapshot;
  }

  getContributions(): ContributionSnapshot {
    return this.contributionsSnapshot;
  }

  clear(): void {
    this.routes = [];
    this.widgets = [];
    this.menuItems = [];
    this.settings = [];
    this.invalidateSnapshots();
    this.notify();
  }
}

export const componentRegistry = new ComponentRegistry();
