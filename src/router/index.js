import { createRouter, createWebHistory } from 'vue-router';

// 导入组件
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import { useUserStore } from '@/store/user';
// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true, roles: ['user', 'admin'] },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiresAuth: true, roles: ['user', 'admin'] },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

// 导出路由实例
export default router;
