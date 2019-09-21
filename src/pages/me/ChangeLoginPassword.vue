template
<template>
  <ChildLayout title="修改登录密码" customScroll>
    <van-cell-group>
      <van-field
        v-model.trim="userInfo.oldPassword"
        required
        clearable
        label="旧密码"
        placeholder="请输入您的旧登录密码"
        :error-message="userInfo.oldPasswordMsg"
      />
      <van-field
        v-model.trim="userInfo.newPassword"
        type="password"
        label="新密码"
        placeholder="请输入您的新登录密码"
        required
        clearable
        :error-message="userInfo.newPasswordMsg"
      />
      <van-field
        v-model.trim="userInfo.confirPassword"
        type="password"
        label="确认密码"
        placeholder="请再次输入您的新登录密码"
        required
        clearable
        :error-message="userInfo.confirPasswordMsg"
      />
    </van-cell-group>
    <div class="c_666 mlr16 mt16 tl">登录密码是由数字和字母组成的6-20个字符，不能和用户名相同</div>
    <div class="p16">
      <van-button type="primary" size="large" @click="onConfirmChange">确认修改</van-button>
    </div>
  </ChildLayout>
</template>
<script>
import validate from '@/assets/js/tool/validate'
export default {
  name: 'ChangeLoginPassword',
  data() {
    return {
      userInfo: {
        oldPassword: '',
        oldPasswordMsg: '',
        newPassword: '',
        newPasswordMsg: '',
        confirPassword: '',
        confirPasswordMsg: ''
      }
    }
  },
  methods: {
    // 注册
    onConfirmChange() {
      const user = this.userInfo
      const oldPasswordMsg = validate.validateField(user.oldPassword, 6)
      const newPasswordMsg = validate.validateField(user.newPassword, 6)
      const confirPasswordMsg = validate.validateField(user.confirPassword, 6)

      user.oldPasswordMsg = oldPasswordMsg && `旧密码${oldPasswordMsg}`
      user.newPasswordMsg = newPasswordMsg && `新密码${newPasswordMsg}`
      user.confirPasswordMsg =
        confirPasswordMsg && `确认密码${confirPasswordMsg}`

      if (user.newPassword !== user.confirPassword) {
        user.newPasswordMsg = '两次密码输入不一致'
        user.confirPasswordMsg = `两次密码输入不一致`
        return
      }
      if (oldPasswordMsg || newPasswordMsg || confirPasswordMsg) return
      const param = {
        password: user.oldPassword,
        newPassword: user.newPassword,
        confirmNewPassword: user.confirPassword
      }
      this.http.post(this.api.updatePassword, param).then(res => {
        this.$toast('修改登录密码成功')
        this.avarouter.goBack()
      })
    }
  }
}
</script>
<style scoped>
</style>
