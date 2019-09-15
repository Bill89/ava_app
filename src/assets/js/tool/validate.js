// 输入框校验
export default {
  /**
   * @description 输入框格式校验
   * @param {String} field 要校验的字段
   * @param {Number} minLength 最小长度
   */
  validateField(field, minLength = 0) {
    field += ''
    if (!field) {
      return '不能为空'
    }
    if (field.length < minLength) {
      return '长度不符'
    }
    if (/[\u4E00-\u9FA5]/.test(field)) {
      return '格式错误'
    }
    return ''
  }
}
