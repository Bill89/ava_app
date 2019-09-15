<template>
  <div id="wrapper" ref="wrapper" :class="className">
    <div
      class="scroller"
      :class="{'scroll-static': showIcon && !scrolling, 'no-scroll': !up && !down}"
      ref="scroller"
    >
      <div class="scroll-head-mask" v-if="up" :style="headbg"></div>
      <div v-if="up" :style="textColor" class="scroll-head tc">
        <p v-show="showBeforeText">松开刷新</p>
        <p :class="{'no-fixation': !shadowIcon}">
          <span class="shadow-icon" :style="shadowColor"></span>
          <span class="pull-icon" ref="pullIcon"></span>
        </p>
        <span class="size10">上次更新时间： {{ headText }}</span>
      </div>
      <slot>
        <!-- <div class="tc">暂无数据</div> -->
      </slot>
      <div class="scroll-foot" v-if="down">
        <div v-show="!allLoaded">{{ footText }}</div>
        <div v-show="allLoaded">全部加载完成</div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * @author
 * @description 下拉刷新，上拉加载组件
 * @date 2018-7-4
 * @param value Object 控制关闭刷新,IScroll重新计算滚动高度
 * @param up Boolean 是否需要下拉刷新
 * @param down Boolean 是否需要上拉刷新
 * @param allLoaded Boolean 是否全部加载完毕
 * @param refreshColor Object 自定义头部样式
 * @param className String wrapper类名
 * @param getScrilling Boolean 滚动时是否需要scroll实例信息
 * @event refresh 下拉刷新事件
 * @event getMore 上拉加载更多
 * @method scrollIntoView 使内容滚动到视图区域，同原生srollIntoView,默认参数true
 */
import IScroll from '@/assets/js/iscroll-probe'
import { formatDate } from '@/assets/js/tool/utils'
export default {
  name: 'VScroll',
  props: {
    value: {
      type: [Boolean, Number],
      default: true
    },
    up: {
      type: [Boolean, Number],
      default: false
    },
    down: {
      type: [Boolean, Number],
      default: false
    },
    allLoaded: {
      type: [Boolean, Number],
      default: false
    },
    refreshColor: {
      type: Object,
      default() {
        return {
          loadBgColor: '#F5F5F5', // 背景色
          textColor: '#666', // 文本颜色
          cirCleColor: '#d2d2d2' // 跳跃阴影颜色
        }
      }
    },
    className: String,
    getScrilling: Boolean
  },
  data() {
    return {
      myScroll: null, // IScroll实例
      observer: null, // 观察者实例
      headText: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'), // 头部提示
      footText: '上拉加载更多', // 底部提示
      timer: 0, // 刷新时请求的计时器
      minTimer: 1000, // 刷新最少延时
      maxTimer: 29000, // 刷新最大延时(实际是30秒)
      showIcon: false, // 下拉刷新动画图标
      scrolling: false, // 滚动时
      showBeforeText: false, // 提示文字
      shadowIcon: true, // 阴影图标
      recordOldHeight: '0' // 记录下旧的高度，避免重复触发回调函数
    }
  },
  computed: {
    // 计算头部样式
    headbg() {
      const r = this.refreshColor && this.refreshColor.loadBgColor
      return r
        ? `background-color: ${this.refreshColor.loadBgColor}`
        : 'background-color: #F5F5F5'
    },
    // 头部文字样式
    textColor() {
      var textColor = '#666'
      if (this.refreshColor && this.refreshColor.textColor) {
        if (this.refreshColor.textColor) {
          textColor = this.refreshColor.textColor
        }
      }
      textColor = 'color:' + textColor + ';' + this.headbg
      return textColor
    },
    // icon样式
    shadowColor() {
      let bc = ''
      this.refreshColor &&
        this.refreshColor.cirCleColor &&
        (bc = this.refreshColor.cirCleColor)
      return `background-color: ${bc}`
    }
  },
  watch: {
    value(a) {
      if (!a) {
        const _this = this
        let timer = this.minTimer - (+new Date() - +new Date(this.timer))
        timer = timer > 0 ? timer : 800
        setTimeout(() => {
          _this.headText = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
          _this.footText = '上拉加载更多'
          _this.$store.commit('SET_LOADING_STATE', '1')
          _this.shadowIcon = true
          setTimeout(() => {
            _this.showIcon = a
          }, 600)
        }, timer)
      }
    }
  },
  mounted() {
    this.initLoad()
    this.mutaionObserver()
  },
  beforeDestroy() {
    this.myScroll && this.myScroll.destroy && this.myScroll.destroy()
    this.myScroll = null
    if (this.observer) {
      this.observer.disconnect()
      this.observer.takeRecords()
      this.observer = null
    }
  },
  methods: {
    mutaionObserver() {
      const MObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver
      if (!MObserver) {
        console.warn('此设备暂不支持MutationObserver属性')
        return
      }
      const scroller = this.$refs.scroller
      // 低版本(如android4.3及以下)无MutationObserver属性时，节点的添加删除，需要刷新isroll的页面，需自行处理
      this.observer = new MObserver(mutationList => {
        const height = getComputedStyle(scroller).getPropertyValue('height')
        if (height !== this.recordOldHeight) {
          this.recordOldHeight = height
          this.myScroll.refresh()
        }
      })
      this.observer.observe(scroller, {
        childList: true,
        subtree: true,
        attributeFilter: ['client-height']
      })
    },
    initLoad() {
      let that = this
      const options = {
        mouseWheel: true, // 是否支持鼠标滚轮
        scrollX: false, // 是否显示横向滚动条
        bounce: this.up || this.down, // 是否弹跳效果
        probeType: 2, // 为2的时候，会在屏幕滑动的过程中实时的派发scroll，为3，实时的派发scroll事件,可能会卡顿
        preventDefault: false // 不阻止默认事件，解决ios点击移动不触发事件
      }
      // 兼容andirod系统内核也可以滚动
      // if (this.CONSTS.isAndroidSys) {
      //   Object.assign(options, {
      //     preventDefault: true,
      //     preventDefaultException: {
      //       tagName: /^(SPAN|I|P|B|UL|LI|H1|H2|DIV|A|INPUT|TEXTAREA|BUTTON|SELECT|IMG)$/
      //     }
      //   })
      // }
      // 初始化IScroll
      this.myScroll = new IScroll(this.$refs.wrapper, options)
      const wrapper = this.$refs.wrapper
      const scroller = this.$refs.scroller
      const pullIcon = this.$refs.pullIcon
      this.myScroll.on('beforeScrollStart', () => {
        this.myScroll.y === 0 &&
          this.showIcon &&
          this.myScroll._translate(0, 80)
      })
      // 开始滚动
      this.myScroll.on('scrollStart', () => {
        if (!this.myScroll) return
        this.scrolling = true
        this.myScroll.refresh()
      })
      // 滚动时
      this.myScroll.on('scroll', () => {
        if (!this.myScroll) return
        this.getScrilling && this.$emit('getScrollData', this.myScroll)
        const y = this.myScroll.y
        if (that.up && y > 0) {
          if (!this.showIcon && y >= 80) {
            that.showBeforeText = true
          } else {
            that.showBeforeText = false
            const bottom = parseFloat(
              getComputedStyle(pullIcon).getPropertyValue('bottom')
            )
            bottom <= 0 && (pullIcon.style.bottom = -20 + y / 4 + 'px')
          }
        }
        const fh = scroller.clientHeight - wrapper.clientHeight + y
        if (
          that.down &&
          y < 0 &&
          fh < 0 &&
          that.footText === '上拉加载更多' &&
          !that.allLoaded
        ) {
          that.footText = '正在加载...'
          that.$emit('input', true)
          that.$store.commit('SET_LOADING_STATE', '0')
          setTimeout(() => {
            that.$emit('getMore')
          }, 1000)
          that.maxDelayed()
        }
      })
      // 滚动结束
      this.myScroll.on('scrollEnd', () => {
        if (!this.myScroll) return
        this.getScrilling && this.$emit('getScrollData', this.myScroll)
        this.myScroll.y >= 0 && !this.showBeforeText && (this.scrolling = false)
      })
      // 触摸结束
      this.$refs.wrapper.addEventListener('touchend', () => {
        if (!this.myScroll) return
        if (this.up && this.showBeforeText && !this.showIcon) {
          this.showBeforeText = false
          this.showIcon = true
          this.shadowIcon = false
          this.timer = new Date()
          this.$emit('input', true)
          setTimeout(() => {
            this.$emit('refresh')
            this.$store.commit('SET_LOADING_STATE', '0')
            this.maxDelayed()
          }, 20)
        }
        this.myScroll.y >= 0 && !this.showBeforeText && (this.scrolling = false)
      })
    },
    // 请求最大延时
    maxDelayed() {
      setTimeout(() => {
        this.$emit('input', false)
        this.$store.commit('SET_LOADING_STATE', '1')
      }, this.maxTimer)
    },
    // 滚动内容到视图区域，外层调用，勿删
    scrollIntoView(p = true) {
      if (p) {
        this.myScroll.scrollTo(0, 0)
      } else {
        this.$nextTick(() => {
          this.myScroll.refresh()
          this.myScroll.scrollTo(0, this.myScroll.maxScrollY, 200)
        })
      }
    },
    // 刷新icroll
    refresh() {
      this.$nextTick(() => {
        this.myScroll.refresh()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#wrapper {
  height: 100%;
  overflow: hidden;
  .scroller {
    max-width: 100%; // 解决第一次安装,部分页面可以左右滑动的问题
    width: 100%;
    min-height: calc(100% + 1.5px);
    position: relative;
    display: flex;
    flex-flow: column;
    &.no-scroll {
      min-height: 100%;
    }
    &.scroll-static {
      transform: translate(0px, 80px) translateZ(0px) !important;
      transition-duration: 400ms !important;
      .no-fixation {
        .pull-icon {
          animation: jumps 0.8s linear infinite;
        }
        .shadow-icon {
          border-radius: 50%;
          animation: jump-b 0.8s linear infinite;
        }
      }
    }
  }
  .scroll-head {
    position: absolute;
    top: -5rem;
    left: 0;
    right: 0;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      width: 100%;
      height: 3.75rem;
      position: relative;
      display: flex;
      justify-content: center;
      overflow: hidden;
      .pull-icon {
        display: inline-block;
        box-sizing: border-box;
        width: 1.625rem;
        height: 1.5625rem;
        background: url(../assets/img/scroll-icon.png) no-repeat center;
        background-size: 1.625rem 1.5625rem;
        position: absolute;
        bottom: -1.25rem;
        animation: jump-one 0.6s linear 1;
      }
      .shadow-icon {
        display: inline-block;
        width: 1.875rem;
        height: 0.25rem;
        position: absolute;
        bottom: 0;
      }
    }
  }
  .scroll-head-mask {
    height: 50vh;
    position: absolute;
    top: -50vh;
    left: 0;
    right: 0;
    background-color: #ccc;
  }
  .scroll-foot {
    > div {
      height: 35px;
      text-align: center;
      line-height: 35px;
      color: #bdbdbd;
    }
  }
}
@keyframes jump-one {
  from {
    bottom: 19px;
  }
  to {
    bottom: -1.25rem;
  }
}
@keyframes jumps {
  from {
    bottom: 0px;
  }
  50% {
    bottom: 28px;
  }
  to {
    bottom: 0px;
  }
}
@keyframes jump-b {
  from {
    width: 1.375rem;
  }
  50% {
    width: 0.8rem;
  }
  to {
    width: 1.375rem;
  }
}
</style>
