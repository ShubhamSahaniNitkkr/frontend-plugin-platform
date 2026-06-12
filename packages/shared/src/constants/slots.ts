export const SLOT_IDS = [
  'dashboard.main',
  'dashboard.sidebar',
  'header.actions',
  'settings.sections',
  'reports.widgets',
  'sidebar.nav',
] as const;

export type SlotId = (typeof SLOT_IDS)[number];
