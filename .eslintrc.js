module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // 函数圆括号之前没有一个空格
    'space-before-function-paren': ['error', 'never']
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
