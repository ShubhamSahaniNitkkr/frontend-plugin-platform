import { describe, it, expect, beforeEach } from 'vitest';
import { setHostBridge, getHostBridge } from '../context.js';
const mockBridge = {
    registerContributions: () => { },
    getContext: () => ({}),
    cleanup: () => { },
};
describe('Plugin SDK context', () => {
    beforeEach(() => {
        setHostBridge(mockBridge);
    });
    it('returns host bridge after initialization', () => {
        expect(getHostBridge()).toBe(mockBridge);
    });
});
//# sourceMappingURL=context.test.js.map