<template>
  <div class="trend-page">
    <header class="bcblue tc f18 h44 lh44 white">走势</header>
    <div class="index-h ofh">
      <VScroll
        ref="nfScroll"
        @refresh="onRefresh"
        v-model="refresh"
        :refreshColor="refreshColor"
        up
      >
        <!-- <section-box title="所有彩票走势" class="m10">可自定义排序</section-box> -->
        <section class="mb6">
          <TrendItem v-for="(item, i) in gameAllHistory" :item="item" :key="i"></TrendItem>
        </section>
        <!-- slot -->
        <slot></slot>
      </VScroll>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TrendItem from '@/views/trend/TrendItem'
export default {
  name: 'TrendPage',
  components: {
    TrendItem
  },
  data() {
    return {
      refresh: true,
      refreshColor: {
        loadBgColor: '',
        textColor: '',
        cirCleColor: ''
        // loadBgColor: this.CONSTS.meTopColor,
        // textColor: this.CONSTS.updateColor,
        // cirCleColor: this.CONSTS.jumpBcColor
      },
      gameAllHistory: [
        {
          gameId: 0,
          gameName: '双色球',
          list: [
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            }
          ]
        },
        {
          gameId: 0,
          gameName: '大乐透',
          list: [
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            }
          ]
        },
        {
          gameId: 0,
          gameName: '世界杯',
          list: [
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            }
          ]
        },
        {
          gameId: 0,
          gameName: 'AG体育',
          list: [
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            }
          ]
        },
        {
          gameId: 0,
          gameName: '分分彩',
          list: [
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            }
          ]
        },
        {
          gameId: 0,
          gameName: '时时彩',
          list: [
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            }
          ]
        },
        {
          gameId: 0,
          gameName: '开元棋牌',
          list: [
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            }
          ]
        },
        {
          gameId: 0,
          gameName: '快3',
          list: [
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            },
            {
              issue: '20190830-01',
              lotteryNum: '6,8,12,22,23,26,5'
            }
          ]
        }
      ]
    }
  },
  computed: {
    chinesered() {
      return this.theme === 'chinesered' ? 'chinesered' : ''
    }
  },
  watch: {
    allBtns: {
      handler() {
        // this.common.initPageBtns('HomePage', this.blocks)
      },
      deep: true
    }
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      Promise.all([])
        .then(res => {
          this.refresh = false
        })
        .catch(() => {
          this.refresh = false
        })
    },
    // 刷新视图，外层调用
    refreshView() {
      this.$refs.nfScroll.refresh()
    }
  },
  activated() {
    this.$refs.nfScroll.refresh()
  },
  mounted() {
    // 初始化页面按钮提示
    // this.common.initPageBtns('HomePage', this.blocks)

    setTimeout(() => {
      this.onRefresh()
    }, 200)
  }
}
</script>
<style scoped lang="scss">
.trend-page {
  .index-h {
    box-sizing: border-box;
    height: calc(100% - 2.75rem);
  }
}
</style>
