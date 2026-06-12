import { registerPlugin } from '@fpp/plugin-sdk';
import manifest from './manifest.json';
import { CompactCalculator } from './components/CompactCalculator';
import { CalculatorPage } from './routes/CalculatorPage';

export function activate() {
  registerPlugin({
    manifest,
    routes: [
      {
        path: '/plugins/com.fpp.calculator',
        component: CalculatorPage,
        label: 'Calculator',
      },
    ],
    menuItems: [
      {
        label: 'Calculator',
        path: '/plugins/com.fpp.calculator',
        icon: 'calculator',
        order: 25,
      },
    ],
    widgets: [
      {
        slot: 'dashboard.sidebar',
        component: CompactCalculator,
        priority: 15,
      },
    ],
  });
}
