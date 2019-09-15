export const api = {
  register: 'mycontroller/register', // 注册
  login: 'mycontroller/login', // 登录
  userInfo: 'mycontroller/userInfo' // 用户信息
}

// 提交修改类的api需要添加到blockApi
// 请求时需阻塞
export const blockApi = ['register', 'login'].map(key => api[key])

// 请求失败时需要公共处理的错误提示
export const errApiIncludes = ['register', 'login'].map(key => api[key])
