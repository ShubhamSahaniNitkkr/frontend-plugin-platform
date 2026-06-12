import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../db/database.js';
import { config } from '../config.js';
export function login(email, password) {
    const db = getDb();
    const user = db
        .prepare('SELECT id, email, name, password_hash FROM users WHERE email = ?')
        .get(email);
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
        return null;
    }
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '24h' });
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            permissions: ['host:admin'],
        },
    };
}
export function getMe(userId) {
    const db = getDb();
    const user = db
        .prepare('SELECT id, email, name FROM users WHERE id = ?')
        .get(userId);
    if (!user)
        return null;
    return {
        ...user,
        permissions: ['host:admin'],
    };
}
//# sourceMappingURL=auth.service.js.map