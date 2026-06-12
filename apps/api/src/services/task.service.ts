import { randomUUID } from 'node:crypto';
import type { CreateTaskInput, UpdateTaskInput } from '@fpp/shared';
import { getDb } from '../db/database.js';

export function listTasks(userId: string) {
  const db = getDb();
  return db
    .prepare('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC')
    .all(userId)
    .map((row) => formatTask(row as Record<string, string>));
}

export function getTask(userId: string, taskId: string) {
  const db = getDb();
  const row = db
    .prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?')
    .get(taskId, userId) as Record<string, string> | undefined;
  return row ? formatTask(row) : null;
}

export function createTask(userId: string, input: CreateTaskInput) {
  const db = getDb();
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO tasks (id, user_id, title, description, status, priority, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    userId,
    input.title,
    input.description ?? '',
    input.status ?? 'todo',
    input.priority ?? 'medium',
    now,
    now
  );

  return getTask(userId, id);
}

export function updateTask(
  userId: string,
  taskId: string,
  input: UpdateTaskInput
) {
  const existing = getTask(userId, taskId);
  if (!existing) return null;

  const db = getDb();
  const now = new Date().toISOString();

  db.prepare(
    `UPDATE tasks SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      status = COALESCE(?, status),
      priority = COALESCE(?, priority),
      updated_at = ?
     WHERE id = ? AND user_id = ?`
  ).run(
    input.title ?? null,
    input.description ?? null,
    input.status ?? null,
    input.priority ?? null,
    now,
    taskId,
    userId
  );

  return getTask(userId, taskId);
}

export function deleteTask(userId: string, taskId: string) {
  const db = getDb();
  const result = db
    .prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?')
    .run(taskId, userId);
  return result.changes > 0;
}

function formatTask(row: Record<string, string>) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status as 'todo' | 'in_progress' | 'done',
    priority: row.priority as 'low' | 'medium' | 'high',
    userId: row.user_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
