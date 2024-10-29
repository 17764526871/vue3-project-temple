# 项目技术选型文档与项目介绍

本文档旨在对本项目的技术选型进行总结，并提供项目的整体介绍，便于在 Confluence 上归档和共享。

---

## 目录

1. [项目概述](#1-项目概述)
2. [技术栈选型](#2-技术栈选型)
    - 2.1 [前端框架：Vue 3](#21-前端框架vue-3)
    - 2.2 [构建工具：Vite](#22-构建工具vite)
    - 2.3 [路由管理：Vue Router 4](#23-路由管理vue-router-4)
    - 2.4 [状态管理：Pinia](#24-状态管理pinia)
    - 2.5 [HTTP 请求：Axios](#25-http-请求axios)
    - 2.6 [Mock 数据：Mock.js](#26-mock-数据mockjs)
    - 2.7 [实用工具库：VueUse](#27-实用工具库vueuse)
    - 2.8 [代码质量：ESLint、Stylelint、Prettier](#28-代码质量eslintstylelintprettier)
    - 2.9 [Git Hooks：Husky、Lint-Staged](#29-git-hookshuskylint-staged)
3. [项目目录结构](#3-项目目录结构)
4. [脚本说明](#4-脚本说明)
5. [总结](#5-总结)

---

## 1. 项目概述

本项目是一个基于 Vue 3 和 Vite 的单页面应用，旨在构建一个高性能、易维护、可扩展的前端架构。项目包含基础的路由、状态管理、HTTP 请求封装、Mock 数据模拟等功能，为后续的功能开发打下坚实的基础。

---

## 2. 技术栈选型

### 2.1 前端框架：Vue 3

**选择理由：**

- **响应式 API**：Vue 3 引入了组合式 API，提升了代码的可读性和可维护性。
- **性能优化**：相比 Vue 2，Vue 3 在性能上有显著提升，包括更快的渲染和更小的打包体积。
- **社区支持**：Vue 3 已成为主流，社区生态丰富，未来更新和支持更加有保障。

### 2.2 构建工具：Vite

**选择理由：**

- **极速冷启动**：利用浏览器的原生 ES 模块，实现毫秒级的启动速度。
- **按需编译**：只编译实际使用的模块，提高了开发时的热更新速度。
- **丰富的插件生态**：支持 Rollup 插件，同时有专门的 Vite 插件，可以满足各种定制化需求。

### 2.3 路由管理：Vue Router 4

**选择理由：**

- **官方支持**：与 Vue 3 无缝集成，支持组合式 API。
- **功能丰富**：支持动态路由、嵌套路由、路由守卫等高级功能。
- **类型安全**：提供完善的 TypeScript 支持。

### 2.4 状态管理：Pinia

**选择理由：**

- **轻量易用**：Pinia 是 Vuex 的替代方案，更加简洁和直观。
- **组合式 API**：与 Vue 3 的组合式 API 深度集成，代码组织更合理。
- **支持模块化**：方便地拆分和组织状态，提高代码的可维护性。

### 2.5 HTTP 请求：Axios

**选择理由：**

- **功能强大**：支持请求拦截器、响应拦截器、取消请求等高级功能。
- **浏览器兼容性好**：支持 Promise API，适用于各种主流浏览器。
- **社区成熟**：文档完善，社区资源丰富。

### 2.6 Mock 数据：Mock.js

**选择理由：**

- **快速模拟数据**：方便地模拟 AJAX 请求，返回自定义数据，支持随机数据生成。
- **开发效率高**：前后端分离开发时，无需等待后端接口即可进行前端开发和测试。
- **易于集成**：与 Axios 等库兼容性好，配置简单。

### 2.7 实用工具库：VueUse

**选择理由：**

- **丰富的组合式函数**：提供大量实用的组合式函数，如状态管理、浏览器 API 封装等。
- **提升开发效率**：减少重复代码，专注于业务逻辑开发。
- **社区活跃**：持续更新，提供良好的文档和支持。

### 2.8 代码质量：ESLint、Stylelint、Prettier

**选择理由：**

- **ESLint**：提供 JavaScript 和 TypeScript 代码的语法检查和规范约束，防止低级错误。
- **Stylelint**：用于检查和规范 CSS/SCSS 代码，保持样式代码的一致性。
- **Prettier**：自动格式化代码，保持代码风格一致，提高代码可读性。

### 2.9 Git Hooks：Husky、Lint-Staged

**选择理由：**

- **Husky**：在 Git 提交阶段运行脚本，确保提交代码符合规范。
- **Lint-Staged**：仅对暂存区的文件运行 Lint 检查，提高效率。
- **保持团队协作**：强制在提交前进行代码检查，减少代码质量问题。

---

## 3. 项目目录结构

```
my-vue-app/
├── .husky/                  # Husky Git 钩子目录
│   ├── commit-msg
│   └── pre-commit
├── node_modules/
├── public/                  # 公共资源
├── src/
│   ├── api/                 # API 请求封装
│   │   ├── axios.js         # Axios 实例和拦截器
│   │   └── index.js         # API 方法封装
│   ├── assets/              # 静态资源
│   ├── components/          # 公共组件
│   ├── mock/                # Mock.js 模拟接口
│   │   ├── index.js         # Mock 初始化
│   │   └── user.js          # 用户相关模拟接口
│   ├── router/              # 路由配置
│   │   └── index.js
│   ├── store/               # 状态管理（Pinia）
│   │   └── user.js          # 用户状态
│   ├── styles/              # 全局样式
│   ├── utils/               # 工具函数
│   ├── views/               # 视图组件
│   │   ├── About.vue
│   │   ├── Home.vue
│   │   └── Login.vue
│   ├── App.vue
│   └── main.js
├── .editorconfig            # 编辑器配置
├── .eslintrc.cjs            # ESLint 配置
├── .stylelintrc.cjs         # Stylelint 配置
├── .prettierrc              # Prettier 配置
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js           # Vite 配置
└── ...                      # 其他文件
```

---

## 4. 脚本说明

**`package.json` 中的脚本**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint \"src/**/*.{js,jsx,ts,tsx,vue}\" --fix",
    "lint:style": "stylelint \"src/**/*.{css,scss,vue}\" --fix",
    "lint:all": "npm run lint && npm run lint:style",
    "prepare": "husky install"
  }
}
```

- **`dev`**：启动开发服务器，进行本地开发。
- **`build`**：构建生产环境代码，进行打包。
- **`preview`**：预览生产环境构建的内容。
- **`lint`**：使用 ESLint 检查并自动修复 JavaScript/TypeScript/Vue 文件中的问题。
- **`lint:style`**：使用 Stylelint 检查并自动修复 CSS/SCSS/Vue 文件中的样式问题。
- **`lint:all`**：同时运行 `lint` 和 `lint:style`，全面检查代码质量。
- **`prepare`**：安装 Husky Git 钩子，在执行 `npm install` 时自动运行，确保 Git Hooks 正常工作。

---

**未来展望：**

- **功能扩展**：根据业务需求，逐步完善功能模块，如国际化支持、权限管理等。
- **性能优化**：持续关注应用性能，采用懒加载、代码分割等技术进行优化。
- **测试覆盖**：引入单元测试、集成测试等，提升代码可靠性和稳定性。
- **团队协作**：完善开发流程和规范，促进团队高效协作。

---

