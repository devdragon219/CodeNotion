const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const globals = require('globals');
const pluginImportX = require('eslint-plugin-import-x');
const pluginPromise = require('eslint-plugin-promise');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginReactRefresh = require('eslint-plugin-react-refresh');
const pluginUnicorn = require('eslint-plugin-unicorn');

module.exports = (tsconfigRootDir, files = ['src/**/*.{ts,tsx}']) =>
  tseslint.config(
    eslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    ...tseslint.configs.strictTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir,
        },
      },
    },
    {
      files,
      languageOptions: {
        globals: {
          ...globals.browser,
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        'import-x': pluginImportX,
        promise: pluginPromise,
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
        unicorn: pluginUnicorn,
      },
      rules: {
        ...pluginPromise.configs.recommended.rules,
        ...pluginReactHooks.configs.recommended.rules,
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unnecessary-type-parameters': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-declaration-merging': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/prefer-promise-reject-errors': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'import-x/export': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/no-empty-named-blocks': 'error',
        'import-x/no-named-as-default': 'error',
        'import-x/no-named-as-default-member': 'error',
        'import-x/no-unused-modules': 'error',
        'react/react-in-jsx-scope': 'off',
        'react-refresh/only-export-components': 'warn',
        'unicorn/no-lonely-if': 'error',
        'unicorn/no-useless-spread': 'error',
        'unicorn/no-useless-switch-case': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/prefer-array-index-of': 'error',
        'unicorn/prefer-array-some': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-switch': 'error',
        'unicorn/prefer-ternary': 'error',
        'unicorn/require-array-join-separator': 'error',
      },
      settings: {
        'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import-x/external-module-folders': ['.yarn'],
        'import-x/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import-x/resolver': {
          node: {
            extensions: ['.d.ts', '.js', '.jsx', '.ts', '.tsx'],
            moduleDirectory: ['.yarn'],
          },
          typescript: {
            alwaysTryTypes: true,
            project: `${tsconfigRootDir}/tsconfig.json`,
          },
        },
        react: {
          version: 'detect',
        },
      },
    },
  );
