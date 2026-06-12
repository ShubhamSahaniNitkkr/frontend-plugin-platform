import { registerPlugin } from '@fpp/plugin-sdk';
import manifest from './manifest.json';
import { ActivityFeedPanel } from './components/ActivityFeed';
import { NotificationBell } from './components/NotificationBell';
import { NotificationToastHost } from './components/NotificationToastHost';

export function activate() {
  registerPlugin({
    manifest,
    widgets: [
      {
        slot: 'dashboard.sidebar',
        component: ActivityFeedPanel,
        priority: 20,
      },
      {
        slot: 'header.actions',
        component: NotificationToastHost,
        priority: 1,
      },
      {
        slot: 'header.actions',
        component: NotificationBell,
        priority: 100,
      },
    ],
  });
}
