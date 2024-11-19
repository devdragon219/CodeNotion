const eslintConfigFn = require('../../eslint.config.fn.cjs');

module.exports = [
  {
    ignores: [
      'coverage',
      'dist',
      'node_modules',
      'public',
      'scripts',
      'src/gql',
      'src/test',
      'src/**/*.test.*',
      'codegen.ts',
      'eslint.config.cjs',
      'vite.config.ts',
      'vitest.config.ts',
    ],
  },
  ...eslintConfigFn(__dirname),
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@mui/base',
              importNames: ['useSnackbar'],
            },
            {
              name: '@mui/material',
              importNames: [
                'Accordion',
                'Alert',
                'CardActions',
                'Dialog',
                'DialogContent',
                'Grid',
                'Stepper',
                'Tabs',
                'TextField',
                'useTheme',
              ],
            },
            {
              name: '@mui/x-date-pickers',
              importNames: ['DateField', 'TimeField'],
            },
            {
              name: 'notistack',
              importNames: ['Transition', 'useSnackbar'],
            },
            {
              name: 'react-hook-form',
              importNames: ['Form', 'useFieldArray'],
            },
            {
              name: 'react-router-dom',
              importNames: ['Form'],
            },
          ],
        },
      ],
    },
  },
];
