export const pluginEntryMap: Record<string, () => Promise<{ activate?: () => void }>> = {
  'com.fpp.i18n': () =>
    import('../../../../../plugins/i18n/src/index.ts'),
  'com.fpp.themes': () =>
    import('../../../../../plugins/themes/src/index.ts'),
  'com.fpp.calculator': () =>
    import('../../../../../plugins/calculator/src/index.ts'),
  'com.fpp.task-manager': () =>
    import('../../../../../plugins/task-manager/src/index.ts'),
  'com.fpp.notifications': () =>
    import('../../../../../plugins/notifications/src/index.ts'),
  'com.fpp.reports': () =>
    import('../../../../../plugins/reports/src/index.ts'),
};
