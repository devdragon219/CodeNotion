import react from '@vitejs/plugin-react-swc';
import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { Plugin, build, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

import { dependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig((config) => ({
  build: {
    lib: {
      entry: {
        scalars: resolve(__dirname, join('lib', 'gql', 'scalars.ts')),
        types: resolve(__dirname, join('lib', 'gql', 'types.ts')),
        yup: resolve(__dirname, join('lib', 'configs', 'yup.ts')),
        ...[
          'components',
          'configs',
          'contexts',
          'enums',
          'hooks',
          'i18n',
          'interfaces',
          'layouts',
          'test',
          'utils',
        ].reduce(
          (acc, dir) => ({
            ...acc,
            [dir]: resolve(__dirname, join('lib', dir, 'index.ts')),
          }),
          {},
        ),
      },
      formats: ['es'],
    },
    minify: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', ...Object.keys(dependencies)],
      output: {
        manualChunks(id) {
          if (id.includes('@emotion') || id.includes('@mui') || id.includes('react')) {
            return '@mui_react';
          }

          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    target: 'esnext',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [
    react(),
    ...(config.mode !== 'test'
      ? [
          {
            apply: 'build',
            enforce: 'pre',
            name: 'index',
            buildStart() {
              execSync('sh ./scripts/generate-index-files.sh');
            },
            buildEnd() {
              execSync('sh ./scripts/delete-index-files.sh');
            },
          } as Plugin,
          dts({ exclude: ['src'] }),
          svgr(),
        ]
      : []),
  ],
  publicDir: config.command === 'build' ? 'lib/assets' : undefined,
  server: {
    port: 3000,
  },
}));
