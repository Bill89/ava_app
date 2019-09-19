<template>
  <ChildLayout title="欢乐生肖" customScroll class="HappyZodiac">
    <header class="f-box bcfff p16 h50">
      <div class="wb50">
        倒计时间
        <countdown class="red" :endDate="endTime"></countdown>
      </div>
      <div class="wb50">第20190920-009期</div>
    </header>
    <AvaTabs class="ava-tabs" v-model="active" :titles="titles" animated swipeable>
      <section class="bcfff m10" v-for="(item, i) in list" :key="i" slot="slot1">
        <div class="fb-between bb p8">
          <span>{{ item.areaName }}</span>
          <div>
            <van-button round size="mini">大</van-button>
            <van-button round size="mini">小</van-button>
            <van-button round size="mini">全</van-button>
            <van-button round size="mini">奇</van-button>
            <van-button round size="mini">偶</van-button>
            <van-button round size="mini">清</van-button>
          </div>
        </div>
        <div class="mt8 p8">
          <van-button
            round
            plain
            hairline
            size="mini"
            type="info"
            v-for="(n, index) in numbs.split('')"
            :key="index"
            @click="onNumb(i, n)"
          >{{ n }}</van-button>
        </div>
      </section>
      <section slot="slot2" class="h400 bcfff">
        <div>走势2222222222222222</div>
      </section>
    </AvaTabs>
    <KindFooter :selectedNum="selectedNum" slot="footer" v-if="!active" class="mlr10 mb10"></KindFooter>
  </ChildLayout>
</template>
<script>
import KindFooter from '@/views/game/happyZodiac/KindFooter'
export default {
  name: 'HappyZodiac',
  components: {
    KindFooter
  },
  data() {
    return {
      active: 0,
      titles: ['彩票', '走势'],
      endTime: Date.now() + 100000,
      tabName: 'kind',
      list: [
        {
          areaName: '万'
        },
        {
          areaName: '千'
        },
        {
          areaName: '百'
        },
        {
          areaName: '十'
        },
        {
          areaName: '个'
        }
      ],
      numbs: '0123456789',
      selectedNum: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: ''
      }
    }
  },
  methods: {
    // 选择号码
    onNumb(i, n) {
      const num = this.selectedNum[i]
      if (num) {
        this.selectedNum[i] = num.includes(n) ? num.replace(n, '') : num + n
      } else {
        this.selectedNum[i] = n
      }
    }
  }
}
</script>
<style scoped>
.HappyZodiac .ava-tabs {
  height: calc(100% - 82px);
}
</style>
