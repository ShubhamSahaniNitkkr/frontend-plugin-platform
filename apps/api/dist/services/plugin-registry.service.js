import { randomUUID } from 'node:crypto';
import { getDb } from '../db/database.js';
import { config } from '../config.js';
function semverCompare(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        if ((pa[i] ?? 0) > (pb[i] ?? 0))
            return 1;
        if ((pa[i] ?? 0) < (pb[i] ?? 0))
            return -1;
    }
    return 0;
}
function isCompatible(hostVersion, range) {
    if (range.startsWith('^')) {
        const min = range.slice(1);
        const [major] = min.split('.').map(Number);
        const [hMajor] = hostVersion.split('.').map(Number);
        return hMajor === major && semverCompare(hostVersion, min) >= 0;
    }
    return hostVersion === range;
}
export function listInstalledPlugins(userId) {
    const db = getDb();
    const rows = db
        .prepare(`SELECT ip.*, mp.name, mp.description, mp.author, mp.permissions, mp.entry, mp.category, mp.icon
       FROM installed_plugins ip
       JOIN marketplace_plugins mp ON mp.id = ip.plugin_id
       WHERE ip.user_id = ?
       ORDER BY mp.name`)
        .all(userId);
    return rows.map((r) => ({
        id: r.plugin_id,
        name: r.name,
        version: r.version,
        description: r.description,
        author: r.author,
        status: r.status,
        health: r.health,
        permissions: JSON.parse(r.permissions),
        entry: r.entry,
        installedAt: r.installed_at,
        enabledAt: r.enabled_at,
        lastError: r.last_error,
        loadTimeMs: r.load_time_ms,
        category: r.category,
        icon: r.icon ?? undefined,
    }));
}
export function getInstalledPlugin(userId, pluginId) {
    return listInstalledPlugins(userId).find((p) => p.id === pluginId) ?? null;
}
export function checkCompatibility(pluginId, version) {
    const db = getDb();
    const ver = db
        .prepare('SELECT host_compatibility FROM marketplace_versions WHERE plugin_id = ? AND version = ?')
        .get(pluginId, version);
    if (!ver) {
        return { compatible: false, reasons: ['Version not found'] };
    }
    const compatible = isCompatible(config.hostVersion, ver.host_compatibility);
    return {
        compatible,
        reasons: compatible ? [] : [`Host version ${config.hostVersion} incompatible with ${ver.host_compatibility}`],
    };
}
export function installPlugin(userId, pluginId, version) {
    const db = getDb();
    const marketplace = db
        .prepare('SELECT id FROM marketplace_plugins WHERE id = ?')
        .get(pluginId);
    if (!marketplace) {
        throw new Error('Plugin not found in marketplace');
    }
    const existing = db
        .prepare('SELECT id FROM installed_plugins WHERE user_id = ? AND plugin_id = ?')
        .get(userId, pluginId);
    if (existing) {
        throw new Error('Plugin already installed');
    }
    const targetVersion = version ??
        db
            .prepare('SELECT version FROM marketplace_versions WHERE plugin_id = ? ORDER BY version DESC LIMIT 1')
            .get(pluginId).version;
    const compatibility = checkCompatibility(pluginId, targetVersion);
    if (!compatibility.compatible) {
        throw new Error(compatibility.reasons.join(', '));
    }
    const id = randomUUID();
    db.prepare(`INSERT INTO installed_plugins (id, user_id, plugin_id, version, status)
     VALUES (?, ?, ?, ?, 'installed')`).run(id, userId, pluginId, targetVersion);
    db.prepare(`INSERT OR IGNORE INTO plugin_configs (user_id, plugin_id, config) VALUES (?, ?, '{}')`).run(userId, pluginId);
    return getInstalledPlugin(userId, pluginId);
}
export function uninstallPlugin(userId, pluginId) {
    const db = getDb();
    db.prepare('DELETE FROM installed_plugins WHERE user_id = ? AND plugin_id = ?').run(userId, pluginId);
    db.prepare('DELETE FROM plugin_configs WHERE user_id = ? AND plugin_id = ?').run(userId, pluginId);
}
export function enablePlugin(userId, pluginId) {
    const db = getDb();
    const result = db
        .prepare(`UPDATE installed_plugins SET status = 'enabled', enabled_at = datetime('now'), health = 'healthy', last_error = NULL
       WHERE user_id = ? AND plugin_id = ? AND status IN ('installed', 'disabled')`)
        .run(userId, pluginId);
    if (result.changes === 0) {
        throw new Error('Plugin not found or already enabled');
    }
    return getInstalledPlugin(userId, pluginId);
}
export function disablePlugin(userId, pluginId) {
    const db = getDb();
    const result = db
        .prepare(`UPDATE installed_plugins SET status = 'disabled', enabled_at = NULL
       WHERE user_id = ? AND plugin_id = ? AND status = 'enabled'`)
        .run(userId, pluginId);
    if (result.changes === 0) {
        throw new Error('Plugin not found or not enabled');
    }
    return getInstalledPlugin(userId, pluginId);
}
export function updatePlugin(userId, pluginId, version) {
    const compatibility = checkCompatibility(pluginId, version);
    if (!compatibility.compatible) {
        throw new Error(compatibility.reasons.join(', '));
    }
    const db = getDb();
    db.prepare(`UPDATE installed_plugins SET version = ?, status = 'updating' WHERE user_id = ? AND plugin_id = ?`).run(version, userId, pluginId);
    db.prepare(`UPDATE installed_plugins SET status = 'enabled' WHERE user_id = ? AND plugin_id = ?`).run(userId, pluginId);
    return getInstalledPlugin(userId, pluginId);
}
export function updatePluginHealth(userId, pluginId, health, lastError, loadTimeMs) {
    const db = getDb();
    db.prepare(`UPDATE installed_plugins SET health = ?, last_error = ?, load_time_ms = COALESCE(?, load_time_ms)
     WHERE user_id = ? AND plugin_id = ?`).run(health, lastError ?? null, loadTimeMs ?? null, userId, pluginId);
}
export function getPluginConfig(userId, pluginId) {
    const db = getDb();
    const row = db
        .prepare('SELECT config FROM plugin_configs WHERE user_id = ? AND plugin_id = ?')
        .get(userId, pluginId);
    return row ? JSON.parse(row.config) : {};
}
export function setPluginConfig(userId, pluginId, config) {
    const db = getDb();
    db.prepare(`INSERT INTO plugin_configs (user_id, plugin_id, config, updated_at)
     VALUES (?, ?, ?, datetime('now'))
     ON CONFLICT(user_id, plugin_id) DO UPDATE SET config = excluded.config, updated_at = datetime('now')`).run(userId, pluginId, JSON.stringify(config));
    return getPluginConfig(userId, pluginId);
}
export function patchPluginConfig(userId, pluginId, partial) {
    const current = getPluginConfig(userId, pluginId);
    return setPluginConfig(userId, pluginId, { ...current, ...partial });
}
//# sourceMappingURL=plugin-registry.service.js.map