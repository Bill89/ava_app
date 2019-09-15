// import nodeCryptoJs from 'node-cryptojs-aes'
import store from '@/store'
export default {
  /**
   * 设置本地缓存
   * @param namespace
   * @param value
   */
  setLocVal(namespace, value) {
    if (namespace.indexOf('.') > -1) {
      let _arr = namespace.split('.')
      let copy = {}
      let context = {}
      let _len = _arr.length
      for (let i = 0; i < _len; i++) {
        let str = _arr[i]
        copy[_arr[0]] = context
        if (i === 0 && window.localStorage[_arr[0]]) {
          context[str] = JSON.parse(window.localStorage[_arr[0]])
        }
        if (!context[str]) {
          context[str] = {}
        }
        if (i === _len - 1) {
          context[str] = value
        } else {
          context = context[str] // 递归
        }
      }
      window.localStorage[_arr[0]] = JSON.stringify(copy[_arr[0]])
    } else {
      window.localStorage[namespace] = value
    }
  },
  /**
   * 获取缓存
   * @param namespace 保存数据的keys
   * namespace格式：使用'.'作为命名空间分隔符或者默认格式
   */
  getLocVal(namespace) {
    let _arr = namespace.split('.')
    let _len = _arr.length
    let data = window.localStorage[_arr[0]]
    if (_len === 1) {
      return data || ''
    }
    if (!data) {
      return ''
    } else {
      data = JSON.parse(data)
    }
    for (let i = 1; i < _len; i++) {
      data = data[_arr[i]]
      if (!data) {
        return ''
      }
    }
    if (typeof data === 'string') {
      // 保证返回的都是字符串
      return data
    } else {
      return JSON.stringify(data)
    }
  },
  /**
   * 清除缓存
   * @param keys 保存数据的keys，如果不传清空所有缓存数据
   * keys格式：多个key可以用',' 分隔，每个key的可以使用'.'作为命名空间分隔符
   */
  clearLocVal(keys) {
    if (keys) {
      let keyArr = keys.split(',') // 用逗号分隔多个键值
      for (let i = 0; i < keyArr.length; i++) {
        if (keyArr[i].indexOf('.') > -1) {
          let _arr = keyArr[i].split('.')
          let _len = _arr.length
          let data = this.getLocVal(_arr[0])
          if (!data) {
            return
          } else {
            data = JSON.parse(data)
          }
          for (let j = 1; j < _len; j++) {
            data = data[_arr[j]]
            if (!data) {
              return
            }
          }
          if (data) {
            this.setLocVal(keyArr[i], '')
          }
        } else {
          window.localStorage.removeItem(keyArr[i])
        }
      }
    } else {
      window.localStorage.clear()
    }
  },
  /**
   * 设置本地会话缓存
   * @param key: String
   * @param val: String
   * @constructor
   */
  setSesVal(key, val) {
    if (!key) return
    if (typeof val === 'string') {
      sessionStorage.setItem(key, val)
    } else {
      sessionStorage.setItem(key, JSON.stringify(val))
    }
  },
  /**
   * 获取本地会话缓存
   * @param key: String
   * @constructor
   */
  getSesVal: function(key) {
    if (!key) return ''
    try {
      let jsonStr = sessionStorage.getItem(key)
      if (!jsonStr) {
        return ''
      }
      if (this.keyValueIsString(key)) {
        return jsonStr
      }
      return JSON.parse(jsonStr)
    } catch (e) {
      return sessionStorage.getItem(key)
    }
  },
  /**
   * 判断key对应的value是string类型(非json格式)
   * @param key: String
   * @returns true:是string, false: json格式
   */
  keyValueIsString(key) {
    // JSON.parse无法解析不符合json格式的字符串(正确的json格式：number 'null' 'true' 'false' '{' '[')
    // 使用try catch在JSON.parse出错时会被中断（在不同的设备，内核 有可能会出现程序中断的情况）
    // 更好的做法是用另一个getSesValStr 来获取不需要JSON.parse无解析的字符串
    // 为了做最小的改动，通过判断特定key进行处理
    let keys = ['index_currentTab', 'quickLoginType', 'sessionkey', 'source', 'unionId', 'weixinid']
    return keys.indexOf(key) > -1
  },
  /**
   * 清空本地会话缓存
   * @param key String 不传清空所有
   */
  clearSesVal(key) {
    if (key) {
      sessionStorage.removeItem(key)
    } else {
      sessionStorage.clear()
    }
  },
  /**
   * 数据加密
   * @param word: String
   * @param AESkey: String
   * @constructor
   */
  Encrypt(word, AESkey) {
    if (!AESkey) {
      AESkey = 'nffund2015cs9903'
    }
    let key = nodeCryptoJs.CryptoJS.enc.Utf8.parse(AESkey)
    let iv = nodeCryptoJs.CryptoJS.enc.Utf8.parse(AESkey)
    let srcs = nodeCryptoJs.CryptoJS.enc.Utf8.parse(this.rem_bla(word))
    return nodeCryptoJs.CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: nodeCryptoJs.CryptoJS.mode.CBC
    }).toString()
  },
  /**
   * 数据解密
   * @param word: String
   * @returns word: String
   * @constructor
   */
  Decrypt(word) {
    try {
      let AESkey = 'nffund2015cs9903'
      let key = nodeCryptoJs.CryptoJS.enc.Utf8.parse(AESkey)
      let iv = nodeCryptoJs.CryptoJS.enc.Utf8.parse(AESkey)
      let decrypted = nodeCryptoJs.CryptoJS.AES.decrypt(word, key, {
        iv: iv,
        mode: nodeCryptoJs.CryptoJS.mode.CBC
      })
      return nodeCryptoJs.CryptoJS.enc.Utf8.stringify(decrypted).toString()
    } catch (e) {
      return word
    }
  },
  /**
   * 生成随机数
   * @param n: NUMBER
   * @returns {string}
   */
  generateRandom(n) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let res = ''
    for (let i = 0; i < n; i++) {
      let id = Math.ceil(Math.random() * 35)
      res += chars[id]
    }
    return res
  },
  /**
   * 生成随机token
   * @param reqrandom: String
   * @returns {*}
   */
  createReqtoken(reqrandom) {
    return this.Encrypt(reqrandom, 'tkeynfjj08282016')
  },
  /**
   * 是否登录标识
   * @param flag: boolean
   * @returns {*}
   */
  isLogin(flag) {
    if (flag === true || flag === false) {
      if (flag === false) {
        store.commit('UPDATE_AUTH_FLOW', { authName: '登录/注册' })
      }
      this.setSesVal('isLogin', flag)
    } else {
      return this.getSesVal('isLogin') === true
    }
  },
  /**
   * 获取解密后sessionkey快捷方法
   * @returns {string}
   */
  getDecryptSessionkey() {
    return this.Decrypt(this.getSesVal('sessionkey'))
  },
  /**
   * 数字隔三位加分隔符
   * @param num: String
   * @returns {string}
   */
  format(num) {
    if (num.indexOf(',') > -1) {
      num = num.replace(/,/g, '')
    }
    if (num.indexOf('.') > -1) {
      if (num.substr(num.indexOf('.'), num.length).length > 2) {
        num = parseFloat(num).toFixed(2)
      }
    }
    num = num + ''
    return num.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  },
  /**
   * 检测是否定义
   * @param value: String
   * @returns {boolean}
   */
  isDefine(value) {
    if (value === null || value === '' || value === 'undefined' || value === undefined || value === 'null' || value === '(null)' || value === 'NULL' || typeof value === 'undefined') {
      return false
    } else {
      value = value + ''
      value = value.replace(/\s/g, '')
      return value !== ''
    }
  },
  /**
   * 交易类金额输入框数字和两位小数校验
   * @param self
   * @returns {string}
   */
  applysumOnlyNum(self) {
    let oriVal = self.value
    let val = self.value
    if (val) {
      val = val.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
      val = val.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      val = val
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      val = val.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      if (val.indexOf('.') < 0 && val !== '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        val = parseFloat(val)
      }
      val = val.toString()
    }
    if (oriVal !== val) self.value = val
    return val
  },
  /**
   * Dom 添加自定义事件
   */
  addEventByClassName(classname, eventType, callback) {
    let dom = document.getElementsByClassName(classname)[0]
    dom &&
      dom.addEventListener(
        eventType,
        function() {
          let element = event.target || event.srcElement
          if (typeof callback === 'function') callback(element)
          event.preventDefault()
        },
        false
      )
  },
  showLoading() {
    store.commit('SHOW_LOADING', 2)
  },
  hideLoading() {
    store.commit('HIDE_LOADING', true)
  },

  /**
   * 浏览器端参数获取
   * @returns {{}}
   */
  browserParamQuery(name) {
    let params = {}
    let loc = document.location + ''
    if (loc.indexOf('?') > 0) {
      loc = loc.substr(loc.indexOf('?') + 1)
    } else {
      return name ? '' : {}
    }
    let pieces = loc.split('&')
    params.keys = []
    for (let i = 0, l = pieces.length; i < l; i += 1) {
      const keyVal = pieces[i].split('=')
      params[keyVal[0]] = decodeURIComponent(keyVal[1])
      params.keys.push(keyVal[0])
    }
    return name ? params[name] : params
  }
}
// 全局处理android输入框被软键盘挡住问题
// android输入框不失焦时滚动页面，软键盘会自动弹起问题
// 注：resize事件在ios的第三方键盘会无效，不过可以用focusin、focusout事件代替
let winW = window.innerWidth
let winH = window.innerHeight
window.addEventListener('resize', () => {
  const w = window.innerWidth
  const h = window.innerHeight
  const tagName = document.activeElement.tagName || ''
  // 横竖切换
  if (winW !== w && winH !== h) {
    winW = w
    winH = h
  }
  if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
    setTimeout(function() {
      document.activeElement.scrollIntoView(false)
    }, 100)
    // 取消聚焦
    setTimeout(() => {
      winH <= window.innerHeight && document.activeElement.blur()
    }, 1000)
  }
})

window.addEventListener('touchend', event => {
  let tagName = document.activeElement.tagName || ''
  if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
    if (event && event.target && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
      // 如果焦点在input中，且点击的不是input，则让其失去焦点
      document.activeElement.blur()
    }
  }
})
