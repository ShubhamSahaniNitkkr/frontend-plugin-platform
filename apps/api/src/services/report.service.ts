import { randomUUID } from 'node:crypto';
import type { GenerateReportInput } from '@fpp/shared';
import { getDb } from '../db/database.js';
import { listTasks } from './task.service.js';

export function listReports(userId: string) {
  const db = getDb();
  return db
    .prepare('SELECT * FROM reports WHERE user_id = ? ORDER BY created_at DESC')
    .all(userId)
    .map((row) => formatReport(row as Record<string, string>));
}

export function generateReport(userId: string, input: GenerateReportInput) {
  let data: unknown;

  switch (input.type) {
    case 'tasks':
      data = listTasks(userId);
      break;
    case 'activity': {
      const db = getDb();
      data = db
        .prepare(
          'SELECT * FROM activity_feed WHERE user_id = ? ORDER BY created_at DESC LIMIT 50'
        )
        .all(userId);
      break;
    }
    case 'usage': {
      const db = getDb();
      data = db
        .prepare(
          `SELECT plugin_id, event, COUNT(*) as count FROM telemetry_events
           WHERE user_id = ? GROUP BY plugin_id, event ORDER BY count DESC`
        )
        .all(userId);
      break;
    }
    default:
      data = {};
  }

  const db = getDb();
  const id = randomUUID();
  const title = input.title ?? `${input.type} Report`;

  db.prepare(
    `INSERT INTO reports (id, user_id, type, title, data) VALUES (?, ?, ?, ?, ?)`
  ).run(id, userId, input.type, title, JSON.stringify(data));

  return formatReport(
    db
      .prepare('SELECT * FROM reports WHERE id = ?')
      .get(id) as Record<string, string>
  );
}

export function exportReport(
  userId: string,
  reportId: string,
  format: 'json' | 'csv'
) {
  const db = getDb();
  const row = db
    .prepare('SELECT * FROM reports WHERE id = ? AND user_id = ?')
    .get(reportId, userId) as Record<string, string> | undefined;

  if (!row) return null;

  const report = formatReport(row);

  if (format === 'csv' && Array.isArray(report.data)) {
    const items = report.data as Record<string, unknown>[];
    if (items.length === 0) return 'id\n';
    const keys = Object.keys(items[0]);
    const header = keys.join(',');
    const rows = items.map((item) =>
      keys.map((k) => JSON.stringify(item[k] ?? '')).join(',')
    );
    return [header, ...rows].join('\n');
  }

  return JSON.stringify(report, null, 2);
}

function formatReport(row: Record<string, string>) {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    data: JSON.parse(row.data),
    createdAt: row.created_at,
    userId: row.user_id,
  };
}
