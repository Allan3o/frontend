module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '.husky/'],
  rules: {
    'no-unused-vars': ['warn', { args: 'none' }],
    'no-undef': 'error',
  },
};
