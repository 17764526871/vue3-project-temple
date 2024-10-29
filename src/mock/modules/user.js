import Mock from 'mockjs';

// 模拟登录接口
Mock.mock('/api/auth/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body);
  if (username === 'admin' && password === '123456') {
    return {
      code: 0,
      message: '登录成功',
      data: {
        token: 'mock-token',
      },
    };
  } else {
    return {
      code: 1,
      message: '用户名或密码错误',
    };
  }
});

// 模拟获取用户信息接口
Mock.mock('/api/user/info', 'get', () => {
  return {
    code: 0,
    message: '获取成功',
    data: {
      username: 'admin',
      email: 'admin@example.com',
      roles: ['admin'],
    },
  };
});

Mock.mock('/api/user/list', 'get', () => {
  return Mock.mock({
    code: 0,
    message: '获取成功',
    'data|10': [
      // 生成包含 10 条数据的数组
      {
        'id|+1': 1, // 自增 ID
        name: '@cname', // 随机中文姓名
        age: '@integer(20, 50)', // 随机年龄
        email: '@email', // 随机邮箱
        address: '@city(true)', // 随机地址
      },
    ],
  });
});
