/* eslint-disable */
// 可以使用 // @ts-ignore 忽略下一行模块

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Navigation from 'vue-navigation'
import avaRouter from '@/router/index'
import router from '@/router/router'
import CommonUi from '@/components/CommonUi'
import consts from '@/assets/js/consts'
import utils from '@/assets/js/tool/utils'
import { api } from '@/assets/js/api/apiType'
import http from '@/assets/js/api/http'
import common from '@/assets/js/common'
// 全局引入
import './registerServiceWorker'
import './assets/css/basic.scss'
import './assets/css/resetVant.scss'
// 使用本地文字
import 'vant/lib/icon/local.css'
Vue.use(Navigation, { router, keyName: '_p' })
Vue.use(CommonUi)

avaRouter.init && avaRouter.init(router)

Vue.prototype.router = avaRouter
Vue.prototype.CONSTS = consts.CONSTS
Vue.prototype.utils = utils
Vue.prototype.api = api
Vue.prototype.http = http
Vue.prototype.common = common
Vue.prototype.transitionTime = 200 // 页面过渡时间

Vue.config.productionTip = false
Vue.config.errorHandler = (err, vm, info) => {
  console.error('compent:' + vm.$options.name)
  console.error('err:' + err.toString())
  console.error('info:' + info.toString())
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
