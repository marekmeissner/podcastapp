module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier/@typescript-eslint'
    ],
    parserOptions: {
      project: './tsconfig.base.json',
      ecmaVersion: 2018,
      sourceType: 'module',
      tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'warn',
    }
  };
    