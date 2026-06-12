import { registerPlugin } from '@fpp/plugin-sdk';
import manifest from './manifest.json';
import { TaskList } from './routes/TaskList';

export function activate() {
  registerPlugin({
    manifest,
    routes: [
      {
        path: '/plugins/com.fpp.task-manager/tasks',
        component: TaskList,
        label: 'Tasks',
        permission: 'tasks:read',
      },
    ],
    menuItems: [
      {
        label: 'Tasks',
        path: '/plugins/com.fpp.task-manager/tasks',
        icon: 'checklist',
        order: 10,
      },
    ],
  });
}
