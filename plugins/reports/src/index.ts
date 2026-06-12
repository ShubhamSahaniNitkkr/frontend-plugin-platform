import { registerPlugin } from '@fpp/plugin-sdk';
import manifest from './manifest.json';
import { ReportsPage } from './routes/ReportsPage';

export function activate() {
  registerPlugin({
    manifest,
    routes: [
      {
        path: '/plugins/com.fpp.reports',
        component: ReportsPage,
        label: 'Reports',
        permission: 'reports:read',
      },
    ],
    menuItems: [
      {
        label: 'Reports',
        path: '/plugins/com.fpp.reports',
        icon: 'file-analytics',
        order: 40,
      },
    ],
  });
}
