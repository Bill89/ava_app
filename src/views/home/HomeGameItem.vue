<template>
  <div class="HomeGameItem bcfff p8 br4">
    <header class="flex-between wb100">
      <div class="f14">
        幸运飞艇
        <span>new</span>
      </div>
      <div class="red">00:00:05</div>
      <div>
        <van-icon name="replay"></van-icon>
        <span class="f10 ml4">换一组</span>
      </div>
    </header>
    <div class="tr">五星直选-复式</div>
    <div class="flex f14">
      <van-icon name="youzan-shield" color="#da1d1d" size="20"></van-icon>
      <span class="ml6">推荐号码</span>
      <span class="recommend-no">5</span>
      <span class="recommend-no">8</span>
      <span class="recommend-no">5</span>
      <span class="recommend-no">0</span>
      <span class="recommend-no">2</span>
    </div>
    <div class="tl mt6">
      <van-button plain round type="danger" class="h30 lh30">进入投注</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HomeGameItem',
  data() {
    return {}
  },
  methods: {}
})
</script>
<style lang="scss" scoped>
.HomeGameItem + .HomeGameItem {
  margin-top: 0.375rem;
}
.HomeGameItem {
  .recommend-no {
    color: white;
    margin-left: 0.5rem;
    background-color: rgb(182, 16, 16);
    width: 1.25rem;
    height: 1.25rem;
    line-height: 1.25rem;
    border-radius: 0.625rem;
  }
}
</style>
