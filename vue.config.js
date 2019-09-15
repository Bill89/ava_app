module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true, // 忽略host检查
    proxy: {
      // 代理api/请求到正确的服务
      'api/': {
        context: () => true,
        target: 'http://172.20.3.67:30000/',
        pathRewrite: { '^api/': '' }
      }
    }
  }
}
