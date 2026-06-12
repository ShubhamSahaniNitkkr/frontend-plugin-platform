import { getDb } from '../db/database.js';
export function listMarketplacePlugins(userId) {
    const db = getDb();
    const plugins = db
        .prepare('SELECT * FROM marketplace_plugins ORDER BY name')
        .all();
    const installedMap = new Map();
    if (userId) {
        const installed = db
            .prepare('SELECT plugin_id, status FROM installed_plugins WHERE user_id = ?')
            .all(userId);
        for (const row of installed) {
            installedMap.set(row.plugin_id, { status: row.status });
        }
    }
    return plugins.map((p) => {
        const installed = installedMap.get(p.id);
        const versions = db
            .prepare('SELECT version FROM marketplace_versions WHERE plugin_id = ? ORDER BY version DESC')
            .all(p.id);
        return {
            id: p.id,
            name: p.name,
            description: p.description,
            author: p.author,
            category: p.category,
            icon: p.icon ?? undefined,
            latestVersion: versions[0]?.version ?? '1.0.0',
            permissions: JSON.parse(p.permissions),
            versions: versions.map((v) => v.version),
            installed: !!installed,
            enabled: installed?.status === 'enabled',
        };
    });
}
export function getMarketplacePlugin(pluginId, userId) {
    const plugins = listMarketplacePlugins(userId);
    return plugins.find((p) => p.id === pluginId) ?? null;
}
//# sourceMappingURL=marketplace.service.js.map