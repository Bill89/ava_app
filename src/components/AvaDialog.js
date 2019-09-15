import { Dialog, Toast } from 'vant'
// 一行居中，超过一行靠左
const getOpt = opt => {
  if (opt.message) {
    opt.message = `<div class="nf-dialog__message">${opt.message}</div>`
    return opt
  } else {
    return opt
  }
}
const resetOption = () => {
  setTimeout(() => {
    const e = document.querySelector('.nf-dialog__message')
    if (!e) return
    const lh = +getComputedStyle(e).lineHeight.replace('px', '')
    if (e.clientHeight <= lh) {
      e.style.textAlign = 'center'
    }
  }, 0)
}
export default {
  topDialog: false, // 设置顶层弹窗标识
  close: () => {
    Dialog.close()
  },
  stopDialog: (opt, self) => {
    // 是否阻止此次弹窗
    if (opt.topDialog) {
      self.topDialog = opt.topDialog
      return false
    }
    if (self.topDialog) return true
  },
  alert(opt) {
    if (!opt || (typeof opt === 'object' && !opt.message)) return new Promise((resolve, reject) => {})
    let self = this
    if (typeof opt === 'string') {
      opt = { message: opt }
    }
    opt.title = opt.title || '提示'
    if (self.topDialog && opt.topDialog) {
      return new Promise((resolve, reject) => {})
    }
    if (this.stopDialog(opt, self)) {
      Toast(opt.message)
      return new Promise((resolve, reject) => {})
    }
    opt = getOpt(opt)
    return new Promise((resolve, reject) => {
      resetOption()
      Dialog.alert(opt)
        .then(() => {
          self.topDialog = false
          resolve()
        })
        .catch(() => {
          reject(new Error('something bad happened'))
        })
    })
  },
  confirm(opt) {
    if (!opt || (typeof opt === 'object' && !opt.message)) return new Promise((resolve, reject) => {})
    let self = this
    opt = getOpt(opt)
    opt.title = opt.title || '提示'
    if (this.stopDialog(opt, self)) return new Promise((resolve, reject) => {})
    resetOption()
    return new Promise((resolve, reject) => {
      return Dialog.confirm(opt)
        .then(() => {
          self.topDialog = false
          resolve()
        })
        .catch(() => {
          self.topDialog = false
          reject(new Error('something bad happened'))
        })
    })
  }
}
