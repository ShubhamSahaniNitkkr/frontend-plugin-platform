import { hasPermission } from '@fpp/shared';
import { getDb } from '../db/database.js';
export function requirePermission(permission) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ title: 'Unauthorized', status: 401 });
            return;
        }
        const db = getDb();
        const installed = db
            .prepare(`SELECT mp.permissions FROM installed_plugins ip
         JOIN marketplace_plugins mp ON mp.id = ip.plugin_id
         WHERE ip.user_id = ? AND ip.status = 'enabled'`)
            .all(req.user.id);
        const allPermissions = installed.flatMap((p) => JSON.parse(p.permissions));
        // Demo user gets all permissions for host operations
        allPermissions.push('tasks:read', 'tasks:write', 'tasks:delete', 'reports:read', 'reports:generate', 'reports:export', 'analytics:read', 'notifications:read', 'notifications:write');
        if (hasPermission(allPermissions, permission)) {
            next();
        }
        else {
            res.status(403).json({
                title: 'Forbidden',
                status: 403,
                detail: `Missing permission: ${permission}`,
            });
        }
    };
}
//# sourceMappingURL=requirePermission.js.map