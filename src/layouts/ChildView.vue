<template>
  <transition
    :name="transitionName"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <keep-alive :include="includecomponents" :exclude="exincludecomponents">
      <navigation>
        <router-view @setScrollPos="setScrollPos" :key="routerViewKey"></router-view>
      </navigation>
    </keep-alive>
  </transition>
</template>

<script>
import Velocity from 'velocity-animate'
import router from '@/router'

export default {
  name: 'ChildView',
  data() {
    return {
      isBack: false,
      includecomponents: ['index'],
      exincludecomponents: ['LoginPage'],
      routeTo: null,
      isClickJump: false,
      transitionName: ''
    }
  },
  computed: {
    routerViewKey() {
      return this.$store.state.routerViewKey
    },
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  methods: {
    setScrollPos(childBody) {
      // 还原滚动条位置
      if (this.isBack) {
        if (
          this.routeTo &&
          this.routeTo.meta &&
          this.routeTo.meta.scrollPosition !== undefined
        ) {
          if (childBody) {
            childBody.scrollTop = this.routeTo.meta.scrollPosition
          }
        }
      }
    },
    beforeEnter(el) {
      if (!this.isClickJump) {
        // ios 手势滑动，复原开始位置
        Velocity(
          el,
          { translateX: '0%' },
          {
            duration: 0,
            _cacheValues: false
          }
        )
        return
      }
      // 向左滑进入下级页面，右滑返回
      Velocity(
        el,
        { translateX: this.isBack ? '-30%' : '100%' },
        { duration: 0, _cacheValues: false }
      )
    },
    enter(el, done) {
      if (!this.isClickJump) {
        done()
        return
      }
      if (this.isBack) {
        this.setScrollPos(el.getElementsByClassName('child-main-body')[0])
      }
      Velocity(
        el,
        { translateX: '0%' },
        {
          duration: this.transitionTime,
          delay: 0,
          easing: 'linear',
          complete: done,
          _cacheValues: false
        }
      )
    },
    afterEnter(el) {},
    beforeLeave(el) {},
    leave(el, done) {
      if (!this.isClickJump) {
        done()
        return
      }
      Velocity(
        el,
        { translateX: this.isBack ? '100%' : '-30%' },
        {
          duration: this.transitionTime,
          delay: 50,
          _cacheValues: false,
          easing: 'linear',
          complete: done
        }
      )
    },
    afterLeave(el) {
      // this.$bus.emit('afterEnterMx')
      this.isClickJump = false
    },
    saveScrollTop(from) {
      if (from.path === '/') {
        return
      }
      // 保存滚动条位置
      if (from.meta === undefined) {
        from.meta = { scrollPosition: 0 }
      }
      if (from.meta.scrollPosition === undefined) {
        from.meta.scrollPosition = 0
      }
      var childBody = document.getElementsByClassName('child-main-body')[0]
      if (childBody) {
        from.meta.scrollPosition = childBody.scrollTop
      }
    }
  },
  mounted() {},
  watch: {
    $route(to, from) {
      // this.$store.commit('HIDE_LOADING', true) // 页面跳转后关闭loading框
      // if (from.name) {
      //   this.bridge.BRSDK_onPageEnd(null, {
      //     pageId: from.name,
      //     pageName: from.name
      //   })
      // }
      // this.bridge.BRSDK_onPageStart(null, {
      //   pageId: to.name,
      //   pageName: to.name
      // })
      if (this.$router.isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.avarouter.setCurrentPageName(to.name)
      const includecomponents = this.includecomponents
      this.isBack = this.$router.isBack
      this.isClickJump = this.$router.isClickJump
      this.$nextTick(() => {
        this.$router.isBack = false
        this.$router.isClickJump = false
      })
      if (this.isBack) {
        this.routeTo = to
        from.meta.scrollPosition = 0
        if (from.name) {
          for (let i = 0, l = includecomponents.length; i < l; i++) {
            if (includecomponents[i] === from.name) {
              includecomponents.splice(i, 1)
            }
          }
        }
      } else {
        this.saveScrollTop(from) // 保存滚动条位置
        includecomponents.push(to.name)
      }
    }
  }
}
</script>

<style lang="scss">
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
</style>
