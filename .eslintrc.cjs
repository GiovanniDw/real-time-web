/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
  ],
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaVersion: 'latest',
    sourceType: "module"
  },
  env: {
    node: true,
    browser: true,
    es6: true
  },
  rules: {
    "no-unused-vars": "off"
  }
}
