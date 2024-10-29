<template>
  <div id="app">
    <nav>
      <router-link to="/">主页</router-link>
      |
      <router-link to="/about">关于我们</router-link>
      |
      <router-link v-if="!isAuthenticated" to="/login">登录</router-link>
      <span v-else @click="logout" style="cursor: pointer">登出</span>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();

const isAuthenticated = computed(() => {
  return localStorage.getItem('isAuthenticated') === 'true';
});

const logout = () => {
  localStorage.removeItem('isAuthenticated');
  router.push('/login');
};
</script>
