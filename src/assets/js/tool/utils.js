/**
 * 深拷贝(可拷贝对象或数组)
 */
export function extend(source) {
  let sourceCopy = source.constructor === Array ? [] : {}
  for (let keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        sourceCopy[keys] = source[keys].constructor === Array ? [] : {}
        sourceCopy[keys] = extend(source[keys])
      } else {
        sourceCopy[keys] = source[keys]
      }
    }
  }
  return sourceCopy
}
/**
 * 数组排序
 * list Array 要排序的数组
 * key String 要排序的数组的key
 * direction String 排序方向 asc 升序 desc降序
 */
export function orderBy(list, key, direction) {
  if (!list || list.constructor !== Array) return list
  return list.sort((a, b) => {
    return direction === 'asc' ? a[key] - b[key] : b[key] - a[key]
  })
}
/**
 * 金额过滤
 * num Number 小数点最少保留几位，默然两位，超出不限制
 */
export function decimals(value, num = 2) {
  if (value === '--') return value
  if (typeof value === 'undefined' || typeof value === 'object' || value === '') { return '--' }
  if (escape(value).indexOf('%u') !== -1) return value
  value = value.toString()
  let valueRex = /.*\..*/
  if (valueRex.test(value)) {
    let weishu = value.split('.')[1].length
    value = weishu > num ? value : parseFloat(+value).toFixed(num)
  } else {
    value = parseFloat(+value).toFixed(num)
  }
  return value
}
/**
 * 格式化时间
 * fmt String 格式yyyy-MM-dd hh:mm:ss
 */
export function formatDate(value, fmt) {
  // yyx 若是文字就直接显示文字
  if (/^[\u4E00-\u9FA5]+$/.test(value)) {
    return value
  }
  // yyx 若是文字就直接显示文字
  if (!value || !fmt) return '--'
  if (value && value.length === 8) {
    // 20180808
    value = new Date(
      value.substring(0, 4) +
        '/' +
        value.substring(4, 6) +
        '/' +
        value.substring(6, 8)
    )
  }
  if (typeof value === 'string') {
    value = new Date(value.replace(/-/g, '/'))
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (value.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  value = typeof value === 'object' ? value : new Date(value.replace(/-/g, '/'))
  let o = {
    'M+': value.getMonth() + 1,
    'd+': value.getDate(),
    'h+': value.getHours(),
    'm+': value.getMinutes(),
    's+': value.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
      )
    }
  }
  return fmt
}
/**
 * 可配置的金额过滤
 * opt Object {
 *  num 小数点最少保留几位，默然两位，超出不限制
 *  symbol 金额后面要添加的符号或字符
 *  removeZero 为0的时候返回 --
 * }
 * defStr 默认字符串
 */
export function upratio(value, opt, defStr = '--') {
  if (value === defStr) return defStr
  if (typeof value === 'undefined' || typeof value === 'object' || value === '') { return defStr }
  if (escape(value).indexOf('%u') !== -1) return value
  let num = opt && opt.num ? opt.num : 2
  value = value.toString()
  if (opt && opt.removeZero && parseFloat(value.replace('%', '')) === 0) { return defStr }
  let valueRex = /.*\..*/
  if (valueRex.test(value)) {
    let weishu = value.split('.')[1].length
    value = weishu > num ? value : parseFloat(+value).toFixed(num)
  } else {
    value = parseFloat(+value).toFixed(num)
  }
  return opt && opt.symbol !== undefined ? value + opt.symbol : value + '%'
}
/**
 *
 */
export function toThousands(value, length) {
  if (!value) return ''
  if (length) value = parseFloat(value).toFixed(length)
  return value.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
    return s1.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,') + s2
  })
}
// 隐藏数据部分的用星号代替
export function hiddennumber(value) {
  if (!value) return
  let newValue
  newValue = String(value)
  newValue = newValue.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  return newValue
}
/**
 *
 */
export function getCycle(data, type) {
  let fixdate = ''
  let fixdPeriod = ''
  if (data.cycleunit === '0') {
    fixdate = '每月' + data.jyrq + '日'
    fixdPeriod = '月'
  } else if (data.cycleunit === '2') {
    fixdate = '每天'
    fixdPeriod = '天'
  } else {
    if (data.jyzq === '2') {
      fixdPeriod = '双周'
    } else {
      fixdPeriod = '周'
    }
    if (data.jyrq === '2') {
      fixdate = data.jyzq === '2' ? '每双周周一' : '每周周一'
    }
    if (data.jyrq === '3') {
      fixdate = data.jyzq === '2' ? '每双周周二' : '每周周二'
    }
    if (data.jyrq === '4') {
      fixdate = data.jyzq === '2' ? '每双周周三' : '每周周三'
    }
    if (data.jyrq === '5') {
      fixdate = data.jyzq === '2' ? '每双周周四' : '每周周四'
    }
    if (data.jyrq === '6') {
      fixdate = data.jyzq === '2' ? '每双周周五' : '每周周五'
    }
  }
  if (type === 's') {
    return fixdate
  } else {
    return {
      fixdate: fixdate,
      fixdPeriod: fixdPeriod
    }
  }
}
// 数字前补0
function prefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n)
}

// 1rem对应px
function getRemUnit() {
  var docEl = document.documentElement
  return (docEl.clientWidth / 375) * 16
}

// 处理JS小数运算精度丢失问题
export function fixFloatAdd(num1, num2) {
  var r1, r2, m, n
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  n = r1 >= r2 ? r1 : r2
  return ((num1 * m + num2 * m) / m).toFixed(n)
}

export function fixFloatSub(num1, num2) {
  var r1, r2, m, n
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  n = r1 >= r2 ? r1 : r2
  m = Math.pow(10, Math.max(r1, r2))
  return ((num1 * m - num2 * m) / m).toFixed(n)
}

export function fixFloatMul(num1, num2) {
  var m = 0
  try {
    m += num1.toString().split('.')[1].length
  } catch (e) {}
  try {
    m += num2.toString().split('.')[1].length
  } catch (e) {}
  return (
    (Number(num1.toString().replace('.', '')) *
      Number(num2.toString().replace('.', ''))) /
    Math.pow(10, m)
  )
}

export function fixFloatDiv(arg1, arg2) {
  let t1 = 0
  let t2 = 0
  let r1, r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

export default {
  extend,
  orderBy,
  decimals,
  formatDate,
  upratio,
  toThousands,
  hiddennumber,
  getCycle,
  prefixInteger,
  getRemUnit
}
