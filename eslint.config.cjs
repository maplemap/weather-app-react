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
      quotes: [ERROR, 'single', { avoidEscape: true }],
      'no-inline-styles/no-inline-styles': ERROR,
      'no-unused-vars': OFF,
      'no-use-before-define': OFF,
      'react/react-in-jsx-scope': OFF,
      '@typescript-eslint/no-non-null-assertion': ERROR,
    },
  },
  {
    files: ['**/*.test.tsx', '**/*.test.ts'],
    plugins: {
      vitest: require('eslint-plugin-vitest'),
      jasmine: require('eslint-plugin-jasmine'),
    },
    rules: {
      'custom-rules/no-arrow-function-inline': OFF,
      'custom-rules/prefer-use-callback': OFF,
      '@typescript-eslint/typedef': OFF,
      'vitest/prefer-called-with': [ERROR],
      'vitest/consistent-test-it': ERROR,
      'vitest/max-expects': [ERROR, { max: 2 }],
      'vitest/no-disabled-tests': ERROR,
      'vitest/no-focused-tests': ERROR,
      'vitest/prefer-hooks-in-order': ERROR,
      'vitest/prefer-hooks-on-top': ERROR,
      'vitest/prefer-lowercase-title': [
        ERROR,
        {
          ignore: ['describe'],
        },
      ],
      'jasmine/new-line-between-declarations': ERROR,
      'jasmine/new-line-before-expect': ERROR,
      'jasmine/expect-matcher': ERROR,
      'jasmine/no-suite-dupes': [ERROR, 'branch'],
      'jasmine/no-spec-dupes': [ERROR, 'branch'],
    },
  },
  {
    ignores: ['node_modules/*', 'eslint.config.cjs', 'coverage/*'],
  },
];