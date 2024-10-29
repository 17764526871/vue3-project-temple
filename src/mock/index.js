import Mock from 'mockjs';

// 导入模拟数据
import './modules/user.js';

// 如果需要，可以在此处设置全局延迟
Mock.setup({
  timeout: '200-600', // 模拟请求延迟，范围为 200-600 毫秒
});
