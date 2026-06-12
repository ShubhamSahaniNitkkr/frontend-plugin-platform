import { describe, it, expect, beforeEach } from 'vitest';
import { setHostBridge, getHostBridge } from '../context.js';
import type { PluginHostBridge } from '../types.js';

const mockBridge: PluginHostBridge = {
  registerContributions: () => {},
  getContext: () => ({} as never),
  cleanup: () => {},
};

describe('Plugin SDK context', () => {
  beforeEach(() => {
    setHostBridge(mockBridge);
  });

  it('returns host bridge after initialization', () => {
    expect(getHostBridge()).toBe(mockBridge);
  });
});
