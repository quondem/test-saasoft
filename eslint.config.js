/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  extends: [
    "eslint:recommended", // Использует рекомендованные правила ESLint
    "plugin:vue/vue3-recommended", // Рекомендованные правила для Vue 3
    "prettier", // Отключает правила ESLint, которые конфликтуют с Prettier
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "vue-eslint-parser",

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),

  {
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      'vue/multi-word-component-names': 'off',
    }
  }
]
