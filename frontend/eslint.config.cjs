const eslintConfigFn = require('./eslint.config.fn.cjs');

module.exports = [
  {
    ignores: [
      '.yarn',
      'node_modules',
      'scripts',
      '.pnp.cjs',
      '.pnp.loaded.mjs',
      'eslint.config.cjs',
      'eslint.config.fn.cjs',
      'vite.config.ts',
      'prettier.config.cjs',
    ],
  },
  ...eslintConfigFn(__dirname),
];
