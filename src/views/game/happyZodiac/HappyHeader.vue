<template>
  <header>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="avarouter.goBack()"
      @click-right="show = !show"
    >
      <van-icon name="wap-nav" slot="right" />
    </van-nav-bar>
    <van-overlay class-name="overlay" :show="show" @click="show = false"></van-overlay>
    <div class="menu fwb w100 inline-block bcfff absolute" v-show="show">
      <p class="h40 lh40 bb" @click="avarouter.go('TrendChart')">走势图</p>
      <p class="h40 lh40" @click="avarouter.go('HappyZodiacRule')">玩法说明</p>
    </div>
  </header>
</template>
<script>
export default {
  name: 'HappyHeader',
  props: {
    value: [String, Number]
  },
  data() {
    return {
      title: '欢乐生肖',
      show: false
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0);
}
.menu {
  z-index: 1;
  right: 0;
  // top: 100px;
  border-radius: 4px;
  box-shadow: -0.2rem 0.2rem 0.2rem #efefef;
}
</style>
