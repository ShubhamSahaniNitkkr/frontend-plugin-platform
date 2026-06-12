import jwt from 'jsonwebtoken';
import { config } from '../config.js';
export function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        res.status(401).json({
            type: 'about:blank',
            title: 'Unauthorized',
            status: 401,
            detail: 'Missing or invalid authorization header',
        });
        return;
    }
    const token = header.slice(7);
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        req.user = payload;
        next();
    }
    catch {
        res.status(401).json({
            type: 'about:blank',
            title: 'Unauthorized',
            status: 401,
            detail: 'Invalid or expired token',
        });
    }
}
export function optionalAuth(req, _res, next) {
    const header = req.headers.authorization;
    if (header?.startsWith('Bearer ')) {
        try {
            const payload = jwt.verify(header.slice(7), config.jwtSecret);
            req.user = payload;
        }
        catch {
            // ignore invalid token for optional auth
        }
    }
    next();
}
//# sourceMappingURL=auth.js.map