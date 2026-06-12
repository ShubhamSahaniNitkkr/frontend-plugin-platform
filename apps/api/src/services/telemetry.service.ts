import { getDb } from '../db/database.js';

export function trackEvent(
  userId: string | undefined,
  pluginId: string,
  event: string,
  payload?: Record<string, unknown>
) {
  const db = getDb();
  db.prepare(
    `INSERT INTO telemetry_events (user_id, plugin_id, event, payload) VALUES (?, ?, ?, ?)`
  ).run(userId ?? null, pluginId, event, payload ? JSON.stringify(payload) : null);
}

export function getPluginTelemetry(userId: string, pluginId: string) {
  const db = getDb();
  const events = db
    .prepare(
      `SELECT event, COUNT(*) as count FROM telemetry_events
       WHERE user_id = ? AND plugin_id = ? GROUP BY event`
    )
    .all(userId, pluginId) as { event: string; count: number }[];

  const errors = db
    .prepare(
      `SELECT COUNT(*) as count FROM telemetry_events
       WHERE user_id = ? AND plugin_id = ? AND event = 'error'`
    )
    .get(userId, pluginId) as { count: number };

  return {
    pluginId,
    events,
    errorCount: errors.count,
    totalEvents: events.reduce((sum, e) => sum + e.count, 0),
  };
}

export function addActivityFeed(
  userId: string,
  type: string,
  message: string,
  metadata?: Record<string, unknown>
) {
  const db = getDb();
  db.prepare(
    `INSERT INTO activity_feed (user_id, type, message, metadata) VALUES (?, ?, ?, ?)`
  ).run(userId, type, message, metadata ? JSON.stringify(metadata) : null);
}

export function getActivityFeed(userId: string, limit = 20) {
  const db = getDb();
  return db
    .prepare(
      'SELECT * FROM activity_feed WHERE user_id = ? ORDER BY created_at DESC LIMIT ?'
    )
    .all(userId, limit)
    .map((row) => {
      const r = row as Record<string, string | null>;
      return {
        id: r.id,
        type: r.type,
        message: r.message,
        metadata: r.metadata ? JSON.parse(r.metadata) : null,
        createdAt: r.created_at,
      };
    });
}
