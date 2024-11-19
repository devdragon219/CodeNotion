import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig((config) => ({
  base: '/',
  build: {
    rollupOptions: {
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
          checker({
            enableBuild: false,
            eslint: {
              lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
              useFlatConfig: true,
            },
            typescript: {
              tsconfigPath: './tsconfig.json',
            },
          }),
          svgr(),
        ]
      : []),
  ],
  server: {
    host: process.env.LOCAL_FRONTEND_HOST || 'localhost',
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
        target: process.env.LOCAL_BACKEND || 'https://rg5-dev.grupposcai.it/',
      },
      '/kc': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:8080', // KeyCloak
      },
    },
    port: 3000,
  },
}));
