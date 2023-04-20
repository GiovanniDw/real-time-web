/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    node: true,
    browser: true,
    es6: true
  }
}
