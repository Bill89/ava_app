import commonJs from '@/assets/js/common'
import Vue from 'vue'

/* eslint-disable */
let router = {}
const init = function(ar) {
  router = ar
}
let routePath = ''
let baseUrl = ''

let getBaseUrl = function() {
  if (baseUrl === '') {
    let url = window.location.href
    if (url.length > 0) {
      if (url.indexOf('#') > 0) {
        url = url.substring(0, url.indexOf('#') + 1)
      }
      let lastChar = url.charAt(url.length - 1)
      if (lastChar === '/') {
        url = url.substring(0, url.length - 1)
      }
      baseUrl = url
    }
  }
  return baseUrl
}

let getPathByName = function(routes, name) {
  for (let i = 0; i < routes.length; i++) {
    if (routePath !== '') {
      return routePath
    }
    let r = routes[i]
    if (r.children && r.children.length > 0) {
      getPathByName(r.children, name)
    }
    if (r.name === name) {
      routePath = r.path
      return routePath
    }
  }
}

let currentPageName = 'index'

const getCurrentPageName = () => {
  return currentPageName
}

const setCurrentPageName = pageName => {
  currentPageName = pageName
}

/**
 * 页面跳转
 * @param name: 路由名称
 * @param params: 参数
 * @param isReplace: 是否替换掉当前的 history 记录
 */
function go(name, params = null, isReplace = false, query = {}) {
  router.isClickJump = true // 通过点击界面按钮跳转页面(ios可以通过手势滑动，浏览器可以通过点击返回按钮)
  if (params) {
    commonJs.setSesVal(name, params) // 先保存参数，再进行页面跳转(有可能在跳转前使用到参数)
  } else {
    commonJs.clearSesVal(name)
  }
  if (isReplace) {
    params ? router.replace({ name, params, query }) : router.replace({ name, query })
  } else {
    params ? router.push({ name, params, query }) : router.push({ name, query })
  }
}
/**
 * 页面替换跳转(from页面则会被销毁,返回则是回到from前一个页面)
 * @param name: 路由名称
 * @param params: 参数
 */
function replace(name, params) {
  go(name, params, true)
}

/**
 * 返回上一级页面
 */
function goBack(backNo = -1) {
  router.isBack = true
  router.isClickJump = true
  window.history.go(backNo)
}

/**
 * 返回指定页面
 * @param name: 路由名称
 */
function goBackTo(name) {
  router.isBack = true
  router.isClickJump = true
  let backName = ''
  let backIndex = 0
  let findRoute = false
  // 计算需要返回的层级数
  let routes = Vue.navigation.getRoutes()
  for (let i = routes.length; i > 0; i--) {
    backName = routes[i - 1]
    backName = backName.split('?')
    if (backName[0] === name) {
      findRoute = true
      break
    }
    backIndex -= 1
  }
  backIndex = findRoute ? backIndex : -1
  goBack(backIndex)
}

/**
 * 获取参数
 * @param name: 路由名称
 */
function getParams(name) {
  return commonJs.getSesVal(name)
}
/**
 * 获取url参数
 * @param variable: 参数名称
 */
function getQueryVariable(variable) {
  var url = location.href
  var vars = url.substring(url.indexOf('?') + 1, url.length).split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }

  return ''
}

export default {
  init,
  go: go,
  replace: replace,
  goBack: goBack,
  goBackTo: goBackTo,
  getParams: getParams,
  getCurrentPageName: getCurrentPageName,
  setCurrentPageName: setCurrentPageName
}
