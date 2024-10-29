import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  // 读取环境变量
  const env = loadEnv(mode, process.cwd());
  // 判断是否启用 Mock
  const useMock = env.VITE_USE_MOCK === 'true';
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入的目标
        imports: [
          'vue',
          'vue-router',
          // 如果使用了其他库，例如 'pinia'，可以在此添加
        ],
        // 自动生成 `auto-imports.d.ts` 声明文件
        dts: 'src/auto-imports.d.ts',
        // 解析 .vue 文件中的 `<template>`
        vueTemplate: true,
        // 自动生成 ESLint 配置，解决未定义报错
        eslintrc: {
          enabled: true, // 启用
          filepath: './.eslintrc-auto-import.json', // 生成文件路径
          globalsPropValue: true, // 设置全局变量
        },
      }),
      Components({
        // 自动扫描的组件目录
        dirs: ['src/components'],
        // 生成 `components.d.ts` 声明文件
        dts: 'src/components.d.ts',
      }),
      legacy({
        targets: [
          'Chrome >= 65',
          'Safari >= 11',
          'Firefox >= 60',
          'Edge >= 16',
          'iOS >= 11',
          'Android >= 5',
        ],
        // 可选：额外的 Polyfills 配置
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240, // 大于 10kb 的文件进行压缩
        algorithm: 'gzip', // 压缩算法，可选 'brotliCompress'，'deflate' 等
        ext: '.gz', // 生成的文件后缀
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8088,
      proxy: useMock
        ? {}
        : {
            // 字符串简写写法：将 /api 开头的请求代理到目标服务器
            '/api': {
              target: env.VITE_PROXY_TARGET, // 代理的目标服务器
              changeOrigin: true, // 是否修改请求的源
              rewrite: (path) => path.replace(/^\/api/, ''), // 可选，重写请求路径
            },
          },
    },
    build: {
      target: 'es2015', // 设置构建的目标环境
      sourcemap: false, // 生产环境下关闭 sourcemap，减少打包体积
      cssCodeSplit: true, // 启用 CSS 代码分割
      minify: 'terser', // 使用 terser 进行代码压缩
      chunkSizeWarningLimit: 2000, // 将警告限制提高到 2000kb，默认是 500kb
      terserOptions: {
        compress: {
          drop_console: true, // 去除 console
          drop_debugger: true, // 去除 debugger
        },
      },
      rollupOptions: {
        output: {
          // 自定义代码拆分
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // 将第三方库打包到 vendor.js 中
            }
          },
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'axios'], // 根据项目实际情况添加
    },
  };
});
