import { describe, it, expect, beforeAll } from 'vitest';
import { getDb } from '../db/database.js';
import { checkCompatibility } from '../services/plugin-registry.service.js';
beforeAll(() => {
    getDb();
});
describe('checkCompatibility', () => {
    it('returns compatible for valid version', () => {
        const result = checkCompatibility('com.fpp.analytics', '1.0.0');
        expect(result.compatible).toBe(true);
    });
    it('returns incompatible for unknown version', () => {
        const result = checkCompatibility('com.fpp.analytics', '99.0.0');
        expect(result.compatible).toBe(false);
    });
});
//# sourceMappingURL=compatibility.test.js.map