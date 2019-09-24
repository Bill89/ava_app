import Vue from 'vue'
import Router from 'vue-router'
// 模块懒加载
// 建议全部使用懒加载模式引用 例子：
// component: () => import('@/pages/product/FinancialPlanDetail')
Vue.use(Router)
export default new Router({
  linkActiveClass: 'nf-active',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import(/* webpackChunkName: "index" */ '@/layouts/Index')
    },
    {
      path: '/nofound',
      name: 'Page404',
      meta: { name: '404页面' },
      component: () => import(/* webpackChunkName: "Page404" */ '@/components/Page404')
    },
    {
      path: '/register',
      name: 'Register',
      meta: { name: '注册' },
      component: () => import(/* webpackChunkName: "Register" */ '@/pages/login/Register')
    },
    {
      path: '/login',
      name: 'Login',
      meta: { name: '登录' },
      component: () => import(/* webpackChunkName: "Login" */ '@/pages/login/Login')
    },
    {
      path: '/changeLoginPassword',
      name: 'ChangeLoginPassword',
      meta: { name: '修改登录密码' },
      component: () => import(/* webpackChunkName: "ChangeLoginPassword" */ '@/pages/me/ChangeLoginPassword')
    },
    {
      path: '/happyZodiac',
      name: 'HappyZodiac',
      meta: { name: '欢乐生肖' },
      component: () => import(/* webpackChunkName: "HappyZodiac" */ '@/pages/game/HappyZodiac')
    },
    {
      path: '/trendChart',
      name: 'TrendChart',
      meta: { name: '欢乐生肖走势图' },
      component: () => import(/* webpackChunkName: "HappyZodiac" */ '@/pages/game/HappyZodiac/TrendChart')
    },
    {
      path: '/happyZodiacRule',
      name: 'HappyZodiacRule',
      meta: { name: '玩法说明' },
      component: () => import(/* webpackChunkName: "HappyZodiac" */ '@/pages/game/HappyZodiac/HappyZodiacRule')
    },
    // {
    //   path: '/assets',
    //   name: 'AssetsPage',
    //   meta: { isNeedLogin: true, name: '资产' },
    //   component: () => import(/* webpackChunkName: "AssetsPage" */ '@/pages/account/AssetsPage')
    // },
    {
      path: '*',
      redirect: '/index' // 此重置路由必须在最后一个才有效，勿动
    }
  ]
})
