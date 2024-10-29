import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginJs from '@eslint/js'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'max-len': ['error', { code: 140, comments: 140 }],
      'react/react-in-jsx-scope': 'off',
      'symbol-description': 'error',
      'no-useless-return': 'error',
      'no-useless-rename': 'error',
      'prefer-template': 'error',
      'no-lonely-if': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-param-reassign': 'warn',
      'array-callback-return': [2, { allowImplicit: true }],
      'no-constructor-return': 'warn',
      'no-eval': 'error',
      'no-extend-native': 'warn',
      'no-extra-bind': 'warn',
      'no-extra-label': 'warn',
      'no-implicit-coercion': 'warn',
      'no-implied-eval': 'warn',
      'no-labels': 'warn',
      'no-lone-blocks': 'warn',
      'no-new-func': 'warn',
      'no-new-wrappers': 'warn',
      'no-proto': 'warn',
      'no-return-assign': 'warn',
      'no-script-url': 'warn',
      'no-self-compare': 'warn',
      'no-sequences': 'warn',
      'no-useless-call': 'warn',
      'no-useless-concat': 'warn',
      'prefer-rest-params': 'warn',
      'prefer-spread': 'warn',
      'no-promise-executor-return': 'warn',
      'no-template-curly-in-string': 'warn',
      'no-unreachable-loop': 'warn',
      yoda: 'warn',
    },
  },
]
