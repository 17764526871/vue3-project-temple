// commitlint.config.cjs

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 自定义规则
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复问题
        'docs', // 文档修改
        'style', // 代码格式（不影响功能，如空格、分号等）
        'refactor', // 代码重构
        'perf', // 性能优化
        'test', // 添加、修改测试
        'build', // 构建系统或外部依赖变更
        'ci', // 持续集成相关
        'chore', // 其他修改（不包括上述类型）
        'revert', // 回滚
      ],
    ],
    // 其他规则
  },
};
