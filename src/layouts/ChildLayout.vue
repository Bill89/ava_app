<template>
  <div class="child-layout absolute-100">
    <slot name="mark"></slot>
    <slot name="header">
      <!-- <fixed-head
        :headerTitle="title"
        :subTitle="subTitle"
        :rightText="rightText"
        :icons="icons"
        @triggerHander="clickHeader"
        :noHead="showHead"
        :headBj="bjColor"
      ></fixed-head>-->
      <van-nav-bar
        :title="title"
        :right-text="rightText"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </slot>
    <div
      class="child-main-body"
      :class="{'no-footer': !btnArrs.length && !$slots.footer,'no-head': showHead}"
    >
      <!-- 无信号时，暂时控制只有远程页面才显示 -->
      <template v-if="onOffLine || routeName !== 'RemotePage'">
        <VScroll
          v-model="refreshState"
          v-if="!customScroll"
          class-name="absolute-100"
          ref="nfScroll"
          :up="up"
          :down="down"
          :allLoaded="allLoaded"
          :refreshColor="refreshColor"
          @refresh="$emit('refresh')"
          @getMore="$emit('getMore')"
        >
          <slot></slot>
        </VScroll>
        <template v-else>
          <slot></slot>
        </template>
        <slot name="popup"></slot>
      </template>
      <no-signal v-else></no-signal>
    </div>
    <slot name="footer">
      <fixed-foot
        :menus="btnArrs"
        :icon-index="footIcons"
        v-if="btnArrs.length"
        @customClick="clickFooter"
      ></fixed-foot>
    </slot>
  </div>
</template>

<script>
/**
 * @author
 * @description 公共的页面级布局组件
 * @date 2018-5-16
 * @param value 刷新状态
 * @param title 头部标题
 * @param subTitle 头部小标题
 * @param rightText 头部右侧文字标题
 * @param icons 头部右侧图标
 * @param menus 底部按钮
 * @param footIcons 底部图标
 * @param up Boolean 是否下拉刷新
 * @param down Boolean 是否上拉刷新
 * @param allLoaded Boolean 是否全部加载完毕
 * @param refreshColor Object 自定义头部样式
 * @param customScroll Boolean 是否自定义滚动,默认带滚动
 * @param noHead Boolean 是否显示头部，默认显示
 * @param headBj String 头部背景颜色和设备头部颜色
 */
import NoSignal from '@/components/NoSignal'
export default {
  name: 'ChildLayout',
  components: {
    NoSignal
  },
  props: {
    value: Boolean,
    title: String,
    subTitle: String,
    rightText: String,
    icons: {
      type: Array,
      default() {
        return []
      }
    },
    menus: {
      type: [Array, String],
      default() {
        return []
      }
    },
    footIcons: {
      type: Array,
      default() {
        return []
      }
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
        return {}
      }
    },
    customScroll: {
      type: Boolean,
      default: false
    },
    noHead: {
      type: Boolean,
      default: false
    },
    headBj: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      refreshState: '',
      showHead: this.noHead,
      onOffLine: this.CONSTS.ON_OFF_LINE, // 是否有网络
      routeName: this.$route.name,
      bjColor: this.headBj
    }
  },
  computed: {
    btnArrs() {
      const m = this.menus
      return typeof m === 'string' ? [m] : m
    }
  },
  watch: {
    value(a) {
      this.refreshState = a
    },
    refreshState(a) {
      this.$emit('input', a)
    },
    noHead(a) {
      this.showHead = a
    }
  },
  activated() {
    this.bjColor = this.headBj
      ? `${this.headBj}_${Math.random()}`
      : `_${Math.random()}`
  },
  methods: {
    onClickLeft() {
      this.avarouter.goBack()
    },
    onClickRight(a) {
      this.$emit('onClickRight', a)
    },
    clickFooter(a) {
      this.$emit('clickFooter', a)
    },
    // 滚动内容到视图区域，外层调用，勿删
    scrollIntoView(p) {
      this.$refs.nfScroll && this.$refs.nfScroll.scrollIntoView(p)
    },
    // 外层调用
    changeHead(showHead) {
      this.showHead = !showHead
    }
  }
}
</script>
<style lang="scss" scoped>
.child-layout {
  height: 100%;
  z-index: 1;
  box-sizing: border-box;
  background-color: #f5f5f5; // 默认背景色
  overflow: hidden;
  .child-main-body {
    height: calc(100% - 5.5rem);
    box-sizing: border-box;
    position: relative;
    // 原生滚动-开始
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    // 原生滚动结束
    &.no-footer {
      height: calc(100% - 2.875rem);
    }
    &.no-head {
      height: calc(100% - 2.875rem);
    }
    &.no-head.no-footer {
      height: calc(100%);
    }
  }
}
</style>
