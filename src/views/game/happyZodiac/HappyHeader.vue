<template>
  <header>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="avarouter.goBack()"
      @click-right="show = !show"
    >
      <div slot="title">
        <van-dropdown-menu active-color="#256ef6">
          <van-dropdown-item v-model="value1" :title="ruleTitle" ref="item">
            <AvaTabs class="ava-tabs" v-model="active" :titles="titles" animated swipeable>
              <section slot="slot1"></section>
            </AvaTabs>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
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
      show: false,
      value1: 0,
      ruleTitle: '一星定位',
      active: '一星定位',
      titles: [
        { title: '大小单双', value: 0 },
        { title: '龙虎和', value: 1 },
        { title: '一星定位', value: 2 },
        { title: '一星不定位', value: 3 },
        { title: '二星不定位', value: 4 },
        { title: '三星不定位', value: 5 },
        { title: '四星不定位', value: 6 },
        { title: '五星不定位', value: 7 }
      ]
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
