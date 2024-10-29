import axios from 'axios';

// 创建 Axios 实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量中读取基础 URL
  timeout: 10000, // 请求超时时间（毫秒）
  // 其他自定义配置
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 例如，添加 Token 到请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // 例如，直接返回响应数据
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 服务器有返回响应
      const status = error.response.status;
      switch (status) {
        case 401:
          // 未授权，重定向到登录页
          // 清除本地存储的 Token
          localStorage.removeItem('token');
          // 跳转到登录页面
          window.location.href = '/login';
          break;
        case 403:
          // 拒绝访问
          alert('您没有权限进行此操作');
          break;
        case 500:
          // 服务器错误
          alert('服务器错误，请稍后重试');
          break;
        // 处理其他状态码
        default:
          alert(`请求错误，状态码：${status}`);
      }
    } else {
      // 服务器没有返回响应（可能是网络问题）
      alert('网络错误，请检查您的网络连接');
    }
    return Promise.reject(error);
  },
);

export default instance;
