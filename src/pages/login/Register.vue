<template>
  <child-layout title="注册">
    <van-cell-group>
      <van-field
        v-model.trim="userInfo.registrationCode"
        required
        clearable
        label="注册码"
        right-icon="question-o"
        placeholder="2-8位字符，由字母、数字组成"
        :error-message="userInfo.registrationCodeMsg"
        @click-right-icon="$dialog({ message: '注册码是您进入Ava平台的唯一凭证，请您先获取注册码' })"
      />
      <van-field
        v-model.trim="userInfo.account"
        required
        clearable
        label="用户名"
        :error-message="userInfo.accountMsg"
        placeholder="4-16位字符，由字母、数字组成"
      />
      <van-field
        v-model.trim="userInfo.password"
        type="password"
        label="密 码"
        placeholder="6-20位字符，区分大小写"
        required
        clearable
        :error-message="userInfo.passwordMsg"
      />
      <van-field
        v-model.trim="userInfo.confirPassword"
        type="password"
        label="确认密码"
        placeholder="6-20位字符，区分大小写"
        required
        clearable
        :error-message="userInfo.confirPasswordMsg"
      />
    </van-cell-group>
    <div class="p16">
      <van-button type="primary" size="large" @click="onRegister">注册</van-button>
    </div>
  </child-layout>
</template>
<script>
import validate from '@/assets/js/tool/validate'
export default {
  name: 'Register',
  data() {
    return {
      userInfo: {
        registrationCode: '',
        registrationCodeMsg: '',
        account: '',
        accountMsg: '',
        password: '',
        passwordMsg: '',
        confirPassword: '',
        confirPasswordMsg: ''
      }
    }
  },
  methods: {
    // 注册
    onRegister() {
      const user = this.userInfo
      const codeMsg = validate.validateField(user.registrationCode, 2)
      const accountMsg = validate.validateField(user.account, 4)
      const passwordMsg = validate.validateField(user.password, 6)
      const confirPasswordMsg = validate.validateField(user.confirPassword, 6)

      user.registrationCodeMsg = codeMsg && `注册码${codeMsg}`
      user.accountMsg = accountMsg && `用户名${accountMsg}`
      user.passwordMsg = passwordMsg && `密码${passwordMsg}`
      user.confirPasswordMsg =
        confirPasswordMsg && `确认密码${confirPasswordMsg}`
      if (user.password !== user.confirPassword) {
        user.passwordMsg = '两次密码输入不一致'
        user.confirPasswordMsg = `两次密码输入不一致`
        return
      }
      if (codeMsg || accountMsg || passwordMsg || confirPasswordMsg) return
      const param = {
        invitationCode: user.registrationCode,
        account: user.account,
        password: user.password,
        confirPassword: user.confirPassword
      }
      this.http.post(this.api.register, param).then(res => {
        // 保存用户信息后登录
        this.common.saveLoginData(res)
        this.avarouter.replace('Index')
      })
    }
  }
}
</script>
