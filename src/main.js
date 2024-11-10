import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@/styles/index.scss';
import '@/styles/global.scss';
import router from './router'; // 引入路由
import pinia from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 判断是否为开发环境
if (import.meta.env.VITE_USE_MOCK === 'true') {
  // 引入 Mock 服务
  import('./mock');
}
const app = createApp(App);
app.use(ElementPlus).use(router).use(pinia).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
