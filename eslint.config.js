// eslint.config.js

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';
import autoImportConfig from './.eslintrc-auto-import.json' assert { type: 'json' };

const compat = new FlatCompat();

export default [
  {
    // 指定适用的文件类型
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,vue}'],
    ignores: ['node_modules'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // 添加 Prettier 的规则
      'prettier/prettier': 'error',
    },
  },
  {
    // JavaScript 文件的配置
    files: ['**/*.{js,mjs,cjs,jsx}'],
    rules: {
      // 继承 eslint:recommended 规则
      ...js.configs.recommended.rules,
      // 禁用与 Prettier 冲突的规则
      ...prettierConfig.rules,
    },
  },
  {
    // TypeScript 文件的配置
    files: ['**/*.{ts,tsx}'],
    rules: {
      // 继承 @typescript-eslint/recommended 规则
      ...typescriptPlugin.configs.recommended.rules,
      // 禁用与 Prettier 冲突的规则
      ...prettierConfig.rules,
    },
  },
  {
    // Vue 文件的配置
    files: ['**/*.vue'],
    rules: {
      // 继承 plugin:vue/vue3-essential 规则
      ...vue.configs['vue3-essential'].rules,
      // 继承 @typescript-eslint/recommended 规则
      ...typescriptPlugin.configs.recommended.rules,
      // 禁用与 Prettier 冲突的规则
      ...prettierConfig.rules,
    },
  },
  {
    // 自定义规则，适用于所有文件
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,vue}'],
    rules: {
      /*
       * "off" 或 0    ==>  关闭规则
       * "warn" 或 1   ==>  警告级别（不会导致程序退出）
       * "error" 或 2  ==>  错误级别（当被触发的时候，程序会退出）
       */
      // ESLint 规则
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁用 console
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁用 debugger
      'no-unexpected-multiline': 'error', // 禁止空余的多行
      'no-useless-escape': 'off', // 关闭不必要的转义字符检查

      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型
      '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用非空断言
      '@typescript-eslint/no-namespace': 'off', // 允许使用命名空间
      '@typescript-eslint/semi': 'off', // 关闭分号检查

      // Vue 规则
      'vue/multi-word-component-names': 'off', // 允许组件名称不是多个单词
      'vue/script-setup-uses-vars': 'error', // 防止 <script setup> 中的变量被误报为未使用
      'vue/no-mutating-props': 'off', // 允许修改 props
      'vue/attribute-hyphenation': 'off', // 关闭属性连字符检查
    },
  },
  {
    languageOptions: {
      globals: {
        // 合并自动导入的全局变量
        ...autoImportConfig.globals,
      },
    },
  },
];
