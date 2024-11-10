<template>
  <div>
    <h1>登录</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">用户名：</label>
        <input id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">密码：</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/store/user.js';

const router = useRouter();
const userStore = useUserStore();

const username = ref('admin');
const password = ref('123456');

const login = () => {
  // 模拟登录逻辑
  if (username.value === 'admin' && password.value === '123456') {
    userStore.login('admin');
    router.push('/');
  } else {
    alert('用户名或密码错误');
  }
};
</script>

<style scoped>
/* 添加你的样式 */
</style>
