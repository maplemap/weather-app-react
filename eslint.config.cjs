const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      globals: {
        browser: true,
        jest: true,
        jasmine: true,
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      prettier: require('eslint-plugin-prettier'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'no-inline-styles': require('eslint-plugin-no-inline-styles'),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-console': isProduction ? ERROR : WARNING,
      'no-eval': ERROR,
      'react-hooks/rules-of-hooks': ERROR,
      'react-hooks/exhaustive-deps': ERROR,
      'max-params': [ERROR, 3],
      'no-debugger': ERROR,
      'no-nested-ternary': ERROR,
      'object-shorthand': ERROR,
      semi: [ERROR, 'always'],
      'no-extra-semi': OFF,
      quotes: [ERROR, 'single', {avoidEscape: true}],
      'no-inline-styles/no-inline-styles': ERROR,
      'no-unused-vars': OFF,
      'no-use-before-define': OFF,
      'react/react-in-jsx-scope': OFF,
      '@typescript-eslint/no-non-null-assertion': ERROR,
    },
    ignores: ['node_modules/*', 'eslint.config.cjs'],
  },
];