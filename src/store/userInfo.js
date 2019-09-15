// import { api } from '@/api/apiType'
// import index from '@/api/index.js'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
// let { httpFetch } = index
const http = Vue.prototype.http
const state = {
  userInfo: {}
}
const getters = {
  userInfo: state => state.userInfo
}
const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data
  }
}
const actions = {
  // 我的页面数据
  mePageInfo({ commit }, item = {}) {
    item = {
      ...item,
      interfaceversion: '3',
      skipquerymsg: '0', // 0不用查未读消息数量
      redpacketflag: '1' // 1查询红包券，0不查
    }
    return new Promise((resolve, reject) => {
      http
        .post(api.ME_PAGE, item)
        .then(res => {
          commit('SET_MYINFO', res)
          commit('SET_MYINTEGRAL_SCORE', { key: 'activescore', value: res.score })
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
