<template>
  <div class="home-page">
    <header class="bcblue tc f18 h44 lh44 white">奖池</header>
    <div class="index-h ofh">
      <VScroll
        ref="nfScroll"
        @refresh="onRefresh"
        v-model="refresh"
        :refreshColor="refreshColor"
        up
      >
        <section-box title="所有运营游戏的奖金池预览" class="m10">
          <p>累计总奖金</p>
          <p>有效分红总额</p>
          <p>有效分红总人数</p>
          <p>玩家自己预计分红金额</p>
        </section-box>
        <!-- slot -->
        <slot></slot>
      </VScroll>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PondPage',
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
      }
    }
  },
  components: {},
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
.home-page {
}
</style>
