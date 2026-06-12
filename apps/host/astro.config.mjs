import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

export default defineConfig({
  integrations: [react()],
  server: { port: 4321 },
  vite: {
    resolve: {
      alias: {
        '@fpp/shared': path.resolve(root, 'packages/shared/src/index.ts'),
        '@fpp/event-bus': path.resolve(root, 'packages/event-bus/src/index.ts'),
        '@fpp/plugin-sdk': path.resolve(root, 'packages/plugin-sdk/src/index.ts'),
      },
    },
    ssr: {
      noExternal: ['@mantine/core', '@mantine/hooks', '@mantine/notifications'],
    },
    optimizeDeps: {
      include: ['@mantine/core', '@mantine/hooks', '@mantine/notifications'],
    },
  },
});
