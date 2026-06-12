import { registerPlugin } from '@fpp/plugin-sdk';
import manifest from './manifest.json';
import { ThemePicker } from './components/ThemePicker';

export function activate() {
  registerPlugin({
    manifest,
    widgets: [{ slot: 'dashboard.main', component: ThemePicker, priority: 8 }],
  });
}
