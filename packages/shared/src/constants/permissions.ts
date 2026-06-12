export const PERMISSIONS = [
  'tasks:read',
  'tasks:write',
  'tasks:delete',
  'reports:read',
  'reports:generate',
  'reports:export',
  'analytics:read',
  'notifications:read',
  'notifications:write',
  'events:task.*',
  'events:report.*',
  'events:user.*',
  'events:locale.*',
  'events:theme.*',
  'storage:local',
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export function matchesPermission(granted: string, required: string): boolean {
  if (granted === required) return true;
  if (granted.endsWith('.*')) {
    const prefix = granted.slice(0, -1);
    return required.startsWith(prefix);
  }
  return false;
}

export function hasPermission(granted: string[], required: string): boolean {
  return granted.some((p) => matchesPermission(p, required));
}
