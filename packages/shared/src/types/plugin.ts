export type PluginStatus = 'available' | 'installed' | 'enabled' | 'disabled' | 'updating' | 'unhealthy';

export type PluginHealth = 'healthy' | 'degraded' | 'unhealthy';

export interface InstalledPlugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  status: PluginStatus;
  health: PluginHealth;
  permissions: string[];
  entry: string;
  installedAt: string;
  enabledAt: string | null;
  lastError: string | null;
  loadTimeMs: number | null;
  category?: string;
  icon?: string;
}

export interface MarketplacePlugin {
  id: string;
  name: string;
  description: string;
  author: string;
  latestVersion: string;
  category: string;
  icon?: string;
  permissions: string[];
  versions: string[];
  installed: boolean;
  enabled: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  permissions: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  type: string;
  title: string;
  data: unknown;
  createdAt: string;
  userId: string;
}
