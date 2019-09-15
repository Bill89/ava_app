<template>
  <div class="trend-item mlr10 mt10 p10 bcfff tl br3">
    <div>
      <span class="f16">{{ item.gameName }}</span>
      <span class="ml16">{{ item.list[0].issue }}</span>
    </div>
    <slot>
      <div class="f18 red">{{ item.list[0].lotteryNum }}</div>
    </slot>
    <div v-for="(historyItem, i) in item.list.slice(1)" :key="i" class="fb-between">
      <div>
        <span class="f12">第{{ historyItem.issue }}期</span>
        <span class="ml16">{{ historyItem.lotteryNum }}</span>
      </div>
      <span class="f14 red" v-if="item.list.length === i + 2">立即投注</span>
      <!-- <van-button plain type="danger" size="small">立即投注</van-button> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TrendItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.trend-item + .trend-item {
  margin-top: 0.625rem;
}
</style>
