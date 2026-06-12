import { getDb } from '../db/database.js';

export function listMarketplacePlugins(userId?: string) {
  const db = getDb();
  const plugins = db
    .prepare('SELECT * FROM marketplace_plugins ORDER BY name')
    .all() as Array<{
    id: string;
    name: string;
    description: string;
    author: string;
    category: string;
    icon: string | null;
    permissions: string;
    entry: string;
  }>;

  const installedMap = new Map<string, { status: string }>();
  if (userId) {
    const installed = db
      .prepare(
        'SELECT plugin_id, status FROM installed_plugins WHERE user_id = ?'
      )
      .all(userId) as { plugin_id: string; status: string }[];
    for (const row of installed) {
      installedMap.set(row.plugin_id, { status: row.status });
    }
  }

  return plugins.map((p) => {
    const installed = installedMap.get(p.id);
    const versions = db
      .prepare(
        'SELECT version FROM marketplace_versions WHERE plugin_id = ? ORDER BY version DESC'
      )
      .all(p.id) as { version: string }[];

    return {
      id: p.id,
      name: p.name,
      description: p.description,
      author: p.author,
      category: p.category,
      icon: p.icon ?? undefined,
      latestVersion: versions[0]?.version ?? '1.0.0',
      permissions: JSON.parse(p.permissions) as string[],
      versions: versions.map((v) => v.version),
      installed: !!installed,
      enabled: installed?.status === 'enabled',
    };
  });
}

export function getMarketplacePlugin(pluginId: string, userId?: string) {
  const plugins = listMarketplacePlugins(userId);
  return plugins.find((p) => p.id === pluginId) ?? null;
}
