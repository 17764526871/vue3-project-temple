import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@/styles/index.scss';
import '@/styles/global.scss';
import router from './router'; // 引入路由
import pinia from './store';

// 判断是否为开发环境
if (import.meta.env.VITE_USE_MOCK === 'true') {
  // 引入 Mock 服务
  import('./mock');
}

createApp(App).use(router).use(pinia).mount('#app');
