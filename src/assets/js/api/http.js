/* eslint-disable */
import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import constJs from '@/assets/js/consts'
import httpbase from '@/assets/js/api/httpBase.js'
import { errApiIncludes } from '@/assets/js/api/apiType.js'
// import NfUi from '@/components/NfUi.js'
const httpFetch = {}
const Axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || '/',
  timeout: 20000 // 请求超时20秒
  // headers: {
  //   'Content-type': 'application/json; charset=UTF-8'
  // }
})
// 请求拦截
Axios.interceptors.request.use(
  config => {
    return httpbase.requestInterceptor(config)
  },
  error => {
    return Promise.reject(error.message)
  }
)
// 返回拦截
Axios.interceptors.response.use(
  response => {
    return httpbase.responseSucInterceptor(response)
  },
  error => {
    if (error.code && error.code === 'ECONNABORTED') {
      error.response = {}
      error.response.status = 408
    }
    return httpbase.responseErrorInterceptor(error)
  }
)
/**
 * get请求
 * @param functionNo 功能号
 * @param data 参数
 * @param isNeedCache 是否需要缓存改数据
 */
httpFetch.get = (url, params = {}) => {
  //这个参数是要POST的
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(function(response) {
        resolve(response)
      })
      .catch(function(error) {
        reject(error)
      })
  })
}
/**
 * post请求
 * @param url 请求地址
 * @param data 参数
 * @param isNeedCache 是否需要缓存改数据
 */
httpFetch.post = (url, data = {}, isNeedCache = false) => {
  return httpbase.post(url, data, isNeedCache, httpFetch)
}

httpFetch.nfpost = (url, data = {}, isNeedCache = false) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, data)
      .then(response => {
        if (!response || response.data === undefined || !response.data) {
          Toast('数据返回错误！')
          reject(response)
        }
        const data = response.data || response
        if (data.code === constJs.CONSTS.SUCCESS_FLAG) {
          resolve(data.data)
        } else {
          if (errApiIncludes.includes(url)) {
            Toast(data.msg)
          }
          reject(data)
        }
        // store.commit('HIDE_LOADING', url)
      })
      .catch(err => {
        // store.commit('HIDE_LOADING', url)
        console.log('请求异常信息：' + err)
        reject({}) // 返回空的对象，前端需要知道请求结束
      })
  })
}
/**
 * 加载本地api数据
 * @param functionNo 功能号
 */
httpFetch.getLocalData = functionNo => {
  return httpbase.getLocalData(functionNo)
}

/**
 * 保存为本地数据
 * @param key 功能号
 * @param data 数据
 */
httpFetch.setLocalData = (key, data) => {
  return httpbase.setLocalData(key, data)
}

// TODO
function rediect(config) {
  // mock 数据的url 最后一部分的命名必须是参数 function
  var functionNo = config.url
  var rediectUrl = process.env.SERVER_URL + /*config.method +*/ +functionNo
  return rediectUrl
}
export default httpFetch
