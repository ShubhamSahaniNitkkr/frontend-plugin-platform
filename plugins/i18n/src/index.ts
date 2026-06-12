import { registerPlugin } from '@fpp/plugin-sdk';
import manifest from './manifest.json';
import { LanguageSelector } from './components/LanguageSelector';
import { LanguagePanel } from './components/LanguagePanel';

export function activate() {
  registerPlugin({
    manifest,
    widgets: [
      { slot: 'dashboard.main', component: LanguagePanel, priority: 5 },
      { slot: 'header.actions', component: LanguageSelector, priority: 50 },
    ],
  });
}
