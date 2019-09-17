<template>
  <div class>
    对不起！你访问的页面不存在
    <span @click="goBackHomepage">返回首页</span>
  </div>
</template>
<script>
export default {
  name: 'Page404',
  methods: {
    goBackHomepage() {
      this.avarouter.go('HomePage')
    }
  }
}
</script>
