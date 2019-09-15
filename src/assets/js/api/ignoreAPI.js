// 未登录状态下，不能访问API请求配置（发起post请求时会被忽略）
// (需要显示界面，但是API需要登录后才可请求，如首页/资产)
// 如果界面都需要登录后才能进入的，不需要在此配置
const igNotLoginApiList = [
  'NF700', // 资产
  'NF736',
  'NF771'
]

export default {
  isIgNotLoginAPI(functionNo) {
    return igNotLoginApiList.includes(functionNo)
  }
}
