import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default defineConfig((config) =>
  mergeConfig(
    viteConfig(config),
    defineConfig({
      test: {
        coverage: {
          include: ['lib/utils/**/schemas/*.ts'],
          exclude: [],
          reporter: ['cobertura'],
        },
        globals: true,
        poolOptions: {
          forks: {
            singleFork: true,
          },
        },
        reporters: ['verbose'],
        setupFiles: ['./lib/configs/yup.ts'],
      },
    }),
  ),
);
