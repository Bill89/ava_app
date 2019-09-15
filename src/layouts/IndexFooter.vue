<template>
  <div class="index-footer tc bt">
    <div
      v-for="(item, i) in list"
      :key="i"
      @click="()=>{}"
      @touchstart="toggleTab(item, i)"
      @mousedown="toggleTab(item, i)"
      class="relative"
      :class="`tab${i+1}`"
      :style="{'color': currentTab === item.tab ? activeColor : defaultColor}"
    >
      <span class="img" :class="{'unread': item.unread || (i === 3 && msgUnreads)}">
        <img :src="currentTab === item.tab ? item.activeImg : item.defaultImg" />
      </span>
      <p class="text absolute">{{ item.text }}</p>
    </div>
  </div>
</template>
<script>
import defaultIm1 from '@/assets/img/nav/nav-home.png'
import defaultIm2 from '@/assets/img/nav/nav-discover.png'
import defaultIm3 from '@/assets/img/nav/nav-product.png'
import defaultIm4 from '@/assets/img/nav/nav-me.png'
import activeBtn1 from '@/assets/img/nav/nav-home-active.png'
import activeBtn2 from '@/assets/img/nav/nav-discover-active.png'
import activeBtn3 from '@/assets/img/nav/nav-product-active.png'
import activeBtn4 from '@/assets/img/nav/nav-me-active.png'
import { extend } from '@/assets/js/tool/utils'
let defaultList = [
  {
    text: '首页',
    tab: 'HomePage',
    defaultImg: defaultIm1,
    activeImg: activeBtn1,
    unread: false
  },
  {
    text: '奖池',
    tab: 'PondPage',
    defaultImg: defaultIm2,
    activeImg: activeBtn2,
    unread: false
  },
  {
    text: '游戏大厅',
    tab: 'GameHallPage',
    defaultImg: defaultIm2,
    activeImg: activeBtn2,
    unread: false
  },
  {
    text: '走势',
    tab: 'TrendPage',
    defaultImg: defaultIm3,
    activeImg: activeBtn3,
    unread: false
  },
  {
    text: '我的',
    tab: 'MePage',
    defaultImg: defaultIm4,
    activeImg: activeBtn4,
    unread: false
  }
]
// index页底部按钮
export default {
  name: 'IndexFooter',
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      currentTab: this.value,
      list: extend(defaultList),
      defaultColor: '#bdc3cf', // 默认字体颜色
      activeColor: '#256ef6' // 点击时的字体颜色
    }
  },
  computed: {
    showBtns() {
      return this.$store.state.indexBtns
    },
    holidayInfo() {
      return this.$store.getters.holidayInfo
    },
    msgUnreads() {
      return this.$store.getters.msgUnreads
    }
  },
  watch: {
    value: {
      handler(a) {
        this.currentTab = a
      },
      immediate: true
    },
    // 红点提示
    showBtns: {
      handler(a) {
        // this.list[1].unread = a.productBtn
        // this.list[2].unread = a.discoverBtn
        // this.list[3].unread = a.meBtn
      },
      deep: true,
      immediate: true
    },
    // 节日图片
    holidayInfo: {
      handler(a) {
        if (a && a.tabbarcheckedimg && a.tabbaruncheckedimg) {
          let aData = a.tabbarcheckedimg
          let dData = a.tabbaruncheckedimg
          const list = this.list
          for (let i = 0, l = list.length; i < l; i++) {
            let aImg = aData[`0${i + 1}`]
            let dImg = dData[`0${i + 1}`]
            aImg && (list[i].activeImg = aImg)
            dImg && (list[i].defaultImg = dImg)
          }
          this.activeColor = aData.color ? aData.color : '#256ef6'
          this.defaultColor = dData.color ? dData.color : '#bdc3cf'
        } else {
          let list = extend(defaultList)
          // list[1].unread = this.showBtns.productBtn
          // list[2].unread = this.showBtns.discoverBtn
          // list[3].unread = this.showBtns.meBtn
          this.list = list
          this.activeColor = '#256ef6'
          this.defaultColor = '#bdc3cf'
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 点击
    toggleTab(item, index) {
      this.$emit('input', item.tab)
      // this.$store.commit('HIDE_LOADING', true) // 页面跳转后关闭loading框
      // this.common.setSesVal('index_currentTab', item.tab)
      this.currentTab = item.tab

      // if (this.currentTab !== 'ProductPage') {
      //   this.$bus.emit('clearLoopSlider')
      // } else {
      //   this.$bus.emit('startLoopSlider')
      // }

      // this.piwikTrack.piwikTrackPageView('index', item.text)
      document.title = item.text
    }
  }
}
</script>
<style lang="scss" scoped>
.index-footer {
  width: 100%;
  height: 3.125rem;
  display: flex;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 1px 4px #dddddd;
  & > div {
    width: 20%;
    padding: 0.25rem 0;
    box-sizing: border-box;
    .img {
      position: absolute;
      display: inline-block;
      transform: scale(0.5) translate(-100%, 50%);
      bottom: 1rem;
      z-index: 3;
      &.unread::before {
        width: 16px;
        height: 16px;
        border-radius: 8px;
      }
    }
    .text {
      bottom: 0.1875rem;
      left: 50%;
      transform: translateX(-50%);
      line-height: 1rem;
      font-size: 0.63rem;
      white-space: nowrap;
    }
  }
}
</style>
