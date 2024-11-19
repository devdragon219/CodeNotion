import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default defineConfig((config) =>
  mergeConfig(
    viteConfig(config),
    defineConfig({
      test: {
        coverage: {
          include: ['src/utils/**/schemas/*.ts'],
          exclude: [],
          reporter: ['cobertura'],
        },
        globals: true,
        isolate: false,
        poolOptions: {
          forks: {
            singleFork: true,
          },
        },
        reporters: ['verbose'],
        setupFiles: ['./src/configs/yup.ts'],
      },
    }),
  ),
);
