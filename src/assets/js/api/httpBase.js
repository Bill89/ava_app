/* eslint-disable */
import Vue from 'vue'
import qs from 'qs'
import store from '@/store'
import { Toast } from 'vant'
import Cache from '@/store/Cache'
import commonJs from '@/assets/js/common'
import constJs from '@/assets/js/consts'
import ignoreAPI from '@/assets/js/api/ignoreAPI'
import { blockApi, api } from '@/assets/js/api/apiType'

const localCache = new Cache()
Vue.use(Toast)

function requestInterceptor(config, isKV = false) {
  // 先加载本地数据更新store
  // updateStore(config.data.function)
  // if (['AT005', 'NF001', 'NF002'].includes(config.data.function)) {
  //   // 2、开户页面，第三方合作开户引流要记录第三方的合作渠道号字段subChannel (手机网站)
  //   let subChannel = commonJs.getSesVal('subChannel')
  //   subChannel && (config.data.thirdpart = commonJs.getSesVal('subChannel'))
  // }
  // let randomNum = commonJs.generateRandom(16)
  // let randomToken = commonJs.createReqtoken(randomNum)
  // let deviceInfo = commonJs.getLocVal(constJs.CONSTS.CKEY_DEVICEINFO) ? JSON.parse(commonJs.getLocVal(constJs.CONSTS.CKEY_DEVICEINFO)) : {}
  // config.data.reqrandom = randomNum
  // config.data.reqtoken = randomToken
  // config.data.devicetype = deviceInfo.devicetype
  // config.data.clientversion = deviceInfo.clientVersion
  // config.data.platform = commonJs.getLocVal('app_platform')
  // config.data.udid = deviceInfo.devicetoken
  // config.data.uuid = deviceInfo.devicetoken
  // !config.data.channel && (config.data.channel = commonJs.getLocVal('channel') || 'iapp')
  // !config.data.ignoreLoading && (config.data.ignoreLoading = false) // 是否不显示loading框

  // if (api.AUTO_LOGIN === config.data.function && deviceInfo && deviceInfo.res) {
  //   config.data.jpushid = deviceInfo.res.jpushid
  //   config.data.devicenotifystatus = deviceInfo.res.deviceNotifyStatus
  // }
  // if (commonJs.isLogin()) {
  //   config.data.userid = commonJs.Decrypt(commonJs.getPhoneCaching(constJs.CONSTS.CKEY_USERINFO + '.idno'))
  //   config.data.accountId = commonJs.getPhoneCaching(constJs.CONSTS.CKEY_USERINFO + '.accountId')
  //   config.data.eqcustno = commonJs.getPhoneCaching(constJs.CONSTS.CKEY_USERINFO + '.eqcustno')
  //   config.data.custno = commonJs.getPhoneCaching(constJs.CONSTS.CKEY_USERINFO + '.custno')
  //   config.data.originalString = commonJs.getPhoneCaching(constJs.CONSTS.CKEY_USERINFO + '.originalString')
  //   config.data.sessionkey = commonJs.getDecryptSessionkey()
  // }
  if (!isKV) {
    // config.data = qs.stringify(config.data)
    config.data = config.data
  }
  return config
}

// 请求成功拦截
function responseSucInterceptor(response) {
  if (response.data && response.status === 200) {
    // 对相应消息体做处理
    if (response.data.code === constJs.CONSTS.SUCCESS_FLAG || response.data.code === '') {
      // 保存返回数据
      saveResponseData(response)
    }
  }
  return response
}

// 请求失败拦截
function responseErrorInterceptor(error) {
  if (error && error.response) {
    // 服务器做出响应，但服务器响应的状态码不在 2xx 范围内
    switch (error.response.status) {
      case 408:
        Toast('请求超时，请检查您的网络状态后重试！')
        break
      case -100:
      case -300:
        Toast('网络异常，请检查您的网络状态！')
        break
      case -200:
        Toast('系统异常，请稍后再试！(' + error.response.status + ')')
        break
      case -300:
        Toast('网络不可用，请检查您的网络状态后重试！')
        break
      default:
        Toast('系统正在维护中，请稍后再试！')
    }
  } else {
    // if (error && error.code && error.code.indexOf('ETS-') === -1) {
    //   // 如果不是业务级的错误才提示信息，否则调用者来处理
    //   Toast(error.message)
    // }
    console.log('Error', error.message) // 在设置触发错误的请求时发生了一些事情
  }
  return Promise.reject(error.data || error)
}

// 请求成功
function responseSuccess(functionNo, result, resolve, reject) {
  if (!result || result.data === undefined || !result.data) {
    reject({ message: '数据返回错误！' })
    return
  }
  const data = result.data || result
  if (data.code === constJs.CONSTS.SUCCESS_FLAG) {
    resolve(data)
  } else if (data.code === constJs.CONSTS.TIME_OUT) {
    commonJs.isLogin(false)
    setTimeout(() => {
      commonJs.isUserLogin()
      Toast(data.msg)
    }, 0)
  } else if (data.code === constJs.CONSTS.ETS_IDX001) {
    // 请求数据格式不正确
    if (result.status) {
      result.response = {}
      result.response.status = result.status
    }
    reject(data)
  } else {
    if (result.status !== undefined) {
      result.response = {}
      result.response.status = result.status
    }
    reject(data)
  }
}
// 请求失败
function responseError(resolve, reject) {}
// post请求
function post(url, data = {}, isNeedCache = false, httpObj) {
  // 如果该API需要登录才允许访问，没登录则不处理
  if (ignoreAPI.isIgNotLoginAPI(url) && !commonJs.isLogin()) {
    return Promise.reject()
  }
  // loading框计数
  if (data && !data.ignoreLoading && store.state.loadingState !== '0') {
    const f = blockApi.includes(url) ? '2' : '1'
    // store.commit('ADD_COUNT', url)
    // store.commit('SHOW_LOADING', f)
  }
  if (isNeedCache) {
    saveCacheFunction(url)
  } else {
    removeCacheFunction(url)
  }
  if (httpObj && typeof httpObj.nfpost === 'function') {
    return httpObj.nfpost(url, data, isNeedCache)
  }
}
/**
 * 加载本地api数据
 * @param functionNo 功能号
 */
var getLocalData = functionNo => {
  return localCache.getData(functionNo)
}
var cacheFunctionNos = []
function saveCacheFunction(functionNo) {
  if (cacheFunctionNos.indexOf(functionNo) === -1) {
    cacheFunctionNos.push(functionNo)
  }
}
function removeCacheFunction(functionNo) {
  var index = cacheFunctionNos.indexOf(functionNo)
  if (index !== -1) {
    cacheFunctionNos.splice(index, 1)
  }
}
function updateStore(functionNo) {
  if (isIncludeMutation(functionNo)) {
    store.commit(`LoadLocal${functionNo}`, localCache.getData(functionNo))
  }
}
/**
 * 保存为本地数据
 * @param key 功能号
 * @param data 数据
 */
var setLocalData = (key, data) => {
  return localCache.setData(key, data)
}
// 保存请求成功后的数据
function saveResponseData(res) {
  if (res.config.data) {
    try {
      var configData = res.config.data
      var formatData = ''
      if (configData.indexOf('function=') > -1) {
        // key-valu
        formatData = qs.parse(configData)
      } else {
        // json
        formatData = JSON.parse(res.config.data)
      }
      if (isIncludeMutation(formatData.function) || cacheFunctionNos.indexOf(formatData.function) !== -1) {
        localCache.setData(formatData.function, res.data)
      }
    } catch (e) {
      console.error(e)
    }
  }
}
function isIncludeMutation(funcName) {
  funcName = `LoadLocal${funcName}`
  for (let m in store._mutations) {
    if (m === funcName) {
      return true
    }
  }
  return false
}

export default {
  post,
  requestInterceptor,
  responseSucInterceptor,
  responseErrorInterceptor,
  responseSuccess,
  responseError,
  setLocalData,
  getLocalData
}
