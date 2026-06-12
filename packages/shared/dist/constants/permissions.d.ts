export declare const PERMISSIONS: readonly ["tasks:read", "tasks:write", "tasks:delete", "reports:read", "reports:generate", "reports:export", "analytics:read", "notifications:read", "notifications:write", "events:task.*", "events:report.*", "events:user.*", "events:locale.*", "events:theme.*", "storage:local"];
export type Permission = (typeof PERMISSIONS)[number];
export declare function matchesPermission(granted: string, required: string): boolean;
export declare function hasPermission(granted: string[], required: string): boolean;
//# sourceMappingURL=permissions.d.ts.map