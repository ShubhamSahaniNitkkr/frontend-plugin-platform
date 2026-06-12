import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export function createPluginConfig(pluginDir: string, outDir: string) {
  return defineConfig({
    plugins: [react()],
    build: {
      lib: {
        entry: path.resolve(pluginDir, 'src/index.ts'),
        formats: ['es'],
        fileName: 'index',
      },
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
        },
      },
    },
    resolve: {
      alias: {
        '@fpp/plugin-sdk': path.resolve(
          pluginDir,
          '../../packages/plugin-sdk/src/index.ts'
        ),
        '@fpp/shared': path.resolve(
          pluginDir,
          '../../packages/shared/src/index.ts'
        ),
      },
    },
  });
}
