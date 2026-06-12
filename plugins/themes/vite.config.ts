import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPluginConfig } from '../vite-plugin-config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default createPluginConfig(
  __dirname,
  path.resolve(__dirname, '../../apps/host/public/plugins/com.fpp.themes')
);
