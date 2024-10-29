import axios from './axios';

// 示例：获取用户信息
export function getUserInfo() {
  return axios.get('/user/info');
}

// 示例：登录
export function login(data) {
  return axios.post('/auth/login', data);
}
