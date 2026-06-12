import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { config } from '../config.js';
let db = null;
export function getDb() {
    if (!db) {
        const dir = path.dirname(config.databasePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        db = new Database(config.databasePath);
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');
        initializeSchema(db);
        seedData(db);
    }
    return db;
}
function initializeSchema(database) {
    database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS marketplace_plugins (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT NOT NULL,
      icon TEXT,
      permissions TEXT NOT NULL DEFAULT '[]',
      entry TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS marketplace_versions (
      plugin_id TEXT NOT NULL,
      version TEXT NOT NULL,
      host_compatibility TEXT NOT NULL DEFAULT '^1.0.0',
      changelog TEXT,
      PRIMARY KEY (plugin_id, version),
      FOREIGN KEY (plugin_id) REFERENCES marketplace_plugins(id)
    );

    CREATE TABLE IF NOT EXISTS installed_plugins (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      plugin_id TEXT NOT NULL,
      version TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'installed',
      health TEXT NOT NULL DEFAULT 'healthy',
      last_error TEXT,
      load_time_ms INTEGER,
      installed_at TEXT NOT NULL DEFAULT (datetime('now')),
      enabled_at TEXT,
      UNIQUE(user_id, plugin_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (plugin_id) REFERENCES marketplace_plugins(id)
    );

    CREATE TABLE IF NOT EXISTS plugin_configs (
      user_id TEXT NOT NULL,
      plugin_id TEXT NOT NULL,
      config TEXT NOT NULL DEFAULT '{}',
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (user_id, plugin_id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'todo',
      priority TEXT NOT NULL DEFAULT 'medium',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS reports (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS telemetry_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      plugin_id TEXT NOT NULL,
      event TEXT NOT NULL,
      payload TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS activity_feed (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      message TEXT NOT NULL,
      metadata TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
}
function seedData(database) {
    const userCount = database
        .prepare('SELECT COUNT(*) as count FROM users')
        .get();
    if (userCount.count === 0) {
        const hash = bcrypt.hashSync('password123', 10);
        database
            .prepare('INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)')
            .run('user-1', 'demo@fpp.dev', hash, 'Demo User');
    }
    const pluginCount = database
        .prepare('SELECT COUNT(*) as count FROM marketplace_plugins')
        .get();
    if (pluginCount.count === 0) {
        const plugins = [
            {
                id: 'com.fpp.analytics',
                name: 'Analytics',
                description: 'Dashboard widgets, usage statistics, and activity charts.',
                author: 'FPP Team',
                category: 'Productivity',
                icon: 'chart-bar',
                permissions: JSON.stringify(['analytics:read', 'events:task.*', 'events:user.*']),
                entry: '/plugins/com.fpp.analytics/index.js',
            },
            {
                id: 'com.fpp.task-manager',
                name: 'Task Manager',
                description: 'Create, update, and manage tasks with a full dashboard.',
                author: 'FPP Team',
                category: 'Productivity',
                icon: 'checklist',
                permissions: JSON.stringify(['tasks:read', 'tasks:write', 'tasks:delete', 'events:task.*']),
                entry: '/plugins/com.fpp.task-manager/index.js',
            },
            {
                id: 'com.fpp.notifications',
                name: 'Notifications',
                description: 'Toast notifications, event alerts, and activity feed.',
                author: 'FPP Team',
                category: 'Communication',
                icon: 'bell',
                permissions: JSON.stringify(['notifications:read', 'notifications:write', 'events:task.*', 'events:report.*', 'events:user.*']),
                entry: '/plugins/com.fpp.notifications/index.js',
            },
            {
                id: 'com.fpp.reports',
                name: 'Reports',
                description: 'Generate and export reports from platform data.',
                author: 'FPP Team',
                category: 'Analytics',
                icon: 'file-analytics',
                permissions: JSON.stringify(['reports:read', 'reports:generate', 'reports:export', 'tasks:read', 'events:report.*']),
                entry: '/plugins/com.fpp.reports/index.js',
            },
        ];
        const insertPlugin = database.prepare(`
      INSERT INTO marketplace_plugins (id, name, description, author, category, icon, permissions, entry)
      VALUES (@id, @name, @description, @author, @category, @icon, @permissions, @entry)
    `);
        const insertVersion = database.prepare(`
      INSERT INTO marketplace_versions (plugin_id, version, host_compatibility, changelog)
      VALUES (?, ?, ?, ?)
    `);
        for (const plugin of plugins) {
            insertPlugin.run(plugin);
            insertVersion.run(plugin.id, '1.0.0', '^1.0.0', 'Initial release');
        }
    }
}
//# sourceMappingURL=database.js.map