module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard-scss', // 使用标准的 SCSS 规则集合
    'stylelint-config-prettier-scss', // 关闭与 Prettier 冲突的规则
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    // 自定义规则
    'prettier/prettier': true,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'font-family-no-missing-generic-family-keyword': null,
    'font-family-no-duplicate-names': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'v-deep'],
      },
    ],
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
};
