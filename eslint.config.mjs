import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['.next/**', '.agents/**', 'node_modules/**', 'out/**', 'dist/**', 'coverage/**'] },

  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      // TypeScript gère déjà la résolution des globals/types (window, document, HTMLDivElement, etc.).
      'no-undef': 'off',
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
];

