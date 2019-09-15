<template>
  <div class="root-layout">
    <!-- 内容 -->
    <keep-alive>
      <component class="root-content" :is="currentTab"></component>
    </keep-alive>
    <index-footer v-model="currentTab"></index-footer>
  </div>
</template>
<script>
import HomePage from '@/layouts/HomePage'
import PondPage from '@/layouts/PondPage'
import GameHallPage from '@/layouts/GameHallPage'
import TrendPage from '@/layouts/TrendPage'
import MePage from '@/layouts/MePage'
import IndexFooter from '@/layouts/IndexFooter'

export default {
  name: 'Index',
  data() {
    return {
      currentTab: this.common.getSesVal('index_currentTab')
        ? this.common.getSesVal('index_currentTab')
        : 'HomePage'
    }
  },
  components: {
    HomePage,
    PondPage,
    GameHallPage,
    TrendPage,
    MePage,
    IndexFooter
  },
  watch: {
    currentTab() {
      this.init()
    }
  },
  methods: {
    init() {
      console.log(this.currentTab)
    }
  }
}
</script>
<style lang="scss" scoped>
.root-layout {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.root-content {
  height: calc(100% - 3.125rem);
  width: 100%;
  box-sizing: border-box;
}
</style>
