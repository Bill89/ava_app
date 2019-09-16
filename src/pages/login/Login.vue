<template>
  <div>
    <header class="bcblue tc f18 h44 lh44 white">登录</header>
    <van-cell-group>
      <van-field
        v-model.trim="userInfo.account"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
        :error-message="userInfo.accountMsg"
      />
      <van-field
        v-model.trim="userInfo.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        clearable
        :error-message="userInfo.passwordMsg"
      />
    </van-cell-group>
    <div class="p16">
      <van-button type="primary" size="large" @click="onLogin">登录</van-button>
    </div>
    <div class="plr16">
      <van-button plain type="primary" size="large" @click="goRegister">注册》</van-button>
    </div>
  </div>
</template>
<script>
import validate from '@/assets/js/tool/validate'
export default {
  name: 'Login',
  data() {
    return {
      userInfo: {
        account: '',
        accountMsg: '',
        password: '',
        passwordMsg: ''
      }
    }
  },
  methods: {
    // 登录
    onLogin() {
      const user = this.userInfo
      const accountMsg = validate.validateField(user.account, 4)
      const passwordMsg = validate.validateField(user.password, 6)
      user.accountMsg = user.account
        ? accountMsg && '用户名错误'
        : '请输入用户名'
      user.passwordMsg = user.password
        ? passwordMsg && '密码格式错误'
        : '请输入密码'
      if (accountMsg || passwordMsg) return
      const param = {
        account: user.account,
        password: user.password
      }
      this.http.post(this.api.login, param).then(res => {
        // 保存用户数据后进入
        // this.$store.commit('SET_USER_INFO', res)
        this.common.saveLoginData(res)
        this.router.replace('Index')
      })
    },
    // 注册
    goRegister() {
      this.router.go('Register')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
