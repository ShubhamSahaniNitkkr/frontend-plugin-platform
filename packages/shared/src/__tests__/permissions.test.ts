import { describe, it, expect } from 'vitest';
import { hasPermission, matchesPermission } from '../constants/permissions';

describe('permissions', () => {
  it('matches exact permissions', () => {
    expect(matchesPermission('tasks:read', 'tasks:read')).toBe(true);
    expect(matchesPermission('tasks:read', 'tasks:write')).toBe(false);
  });

  it('matches wildcard permissions', () => {
    expect(matchesPermission('events:task.*', 'events:task.created')).toBe(true);
  });

  it('hasPermission checks granted list', () => {
    expect(hasPermission(['tasks:read', 'events:task.*'], 'tasks:read')).toBe(
      true
    );
    expect(hasPermission(['tasks:read'], 'tasks:delete')).toBe(false);
  });
});
