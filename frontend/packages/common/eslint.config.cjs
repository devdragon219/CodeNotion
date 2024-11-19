const eslintConfigFn = require('../../eslint.config.fn.cjs');

module.exports = [
  {
    ignores: [
      'coverage',
      'dist',
      'node_modules',
      'scripts',
      'lib/gql',
      'lib/test',
      'lib/**/*.test.*',
      'codegen.ts',
      'eslint.config.cjs',
      'vite.config.ts',
      'vitest.config.ts',
    ],
  },
  ...eslintConfigFn(__dirname, ['{lib,src}/**/*.{ts,tsx}']),
  {
    files: ['{lib,src}/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@fullcalendar/core/index.js',
              importNames: ['Calendar'],
            },
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
              name: '@mui/system',
              importNames: ['Box', 'Grid', 'Stack'],
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
    settings: {
      'import-x/ignore': ['react-apexcharts'],
    },
  },
];
