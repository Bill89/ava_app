<template>
  <div class="HistoryItem bcfff w100 h150 tc br3">
    <img class="gameLogo mt10" v-lazy="data.url" />
    <p>{{ data.gameName }}</p>
    <!-- <p class="red">{{ dateTime }}</p> -->
    <countdown class="red" :endDate="endTime"></countdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HistoryItem',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      timer: 0,
      dateTime: new Date(),
      startTime: Date.now() + 100000,
      endTime: Date.now() + 100000
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      // this.dateTime = Date.now() // 修改数据date
      this.dateTime = new Date()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在vue实例销毁钱，清除我们的定时器
    }
  },
  methods: {
    countDownS_cb() {},
    countDownE_cb() {}
  }
})
</script>

<style lang="scss" scoped>
.HistoryItem {
  .gameLogo {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }
}
</style>
