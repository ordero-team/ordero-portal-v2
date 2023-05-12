module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'prefer-rest-params': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          object: false,
        },
      },
    ],
  },
};
