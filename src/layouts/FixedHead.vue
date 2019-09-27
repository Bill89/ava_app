<template>
  <div
    class="fixedhead"
    :class="{'as-sub-title': subTitle}"
    :style="[{'backgroundColor': headBjColor} , styles]"
    v-if="!noHeadSub"
  >
    <span class="for-arrow-handler" @click.stop="goBack"></span>
    <div class="title">
      <p class="ellipsis">{{ headerTitle }}</p>
      <p v-if="subTitle" class="size12">{{ subTitle }}</p>
    </div>
    <div class="right">
      <span v-if="rightText" @click="$emit('triggerHander', rightText)">{{ rightText }}</span>
      <template v-for="(icon, index) in iconsSub">
        <span
          v-if="!rightText && icon && (isApp || icon !== 'service')"
          :key="index"
          @click="jump(icon)"
          :class="`icon-${icon}`"
          class="item-icon"
        >
          <!-- <img class="inline-middle" v-if="icon === 'rectangle'" :src="rectangleGif" /> -->
          <span v-if="icon === 'rectangle'" class="size9 inline-middle">资产诊断</span>
        </span>
      </template>
    </div>
  </div>
</template>
<script>
// import rectangleGif from '@/assets/img/rectangle.gif'
/**
 * @author
 * @description 公共头部组件
 * @date
 * @param noHead Boolean 默认fasle
 * @param headBj String `#112047_${Math.random()}` 必须加随机数，才能更新
 */
// import ShareModel from '@/assets/js/share.js'
export default {
  name: 'FixedHead',
  props: [
    'headerTitle',
    'subTitle',
    'icons',
    'rightText',
    'customBack',
    'styles',
    'noHead',
    'headBj',
    'targetObj'
  ],
  data() {
    return {
      // rectangleGif,
      isApp: null,
      // isApp: this.platform.isApp() || this.platform.isSimulatorApp(),
      headBjColor: ''
    }
  },
  watch: {
    headBj: {
      handler(a) {
        if (this.noHead) return
        this.headBjColor = a ? a.split('_')[0] : ''
        setTimeout(() => {
          // this.bridge.setStatusBarColor(() => {}, {
          //   rgb: this.headBjColor || '#256EF6'
          // })
        }, this.transitionTime)
      }
    }
  },
  activated() {
    if (!this.isApp) {
      this.headerTitle && (document.title = this.headerTitle)
    }
  },
  computed: {
    iconsSub() {
      if (!this.isApp && this.icons && this.icons.length > 0) {
        // 浏览器，微信不需要分享和在线客服
        return this.icons.filter(v => v !== 'share' && v !== 'service')
      } else {
        return this.icons
      }
    },
    noHeadSub() {
      // 如果是微信,头部右边没有功能按钮，则隐藏头部
      // if (this.platform.isWeixn()) {
      //   let noHead =
      //     (!this.iconsSub || this.iconsSub.length === 0) && !this.rightText
      //   this.$parent.changeHead(!noHead)
      //   return noHead
      // } else {
      return this.noHead
      // }
    }
  },
  mounted() {
    if (this.isApp) {
      setTimeout(() => {
        !this.noHead &&
          this.bridge.setStatusBarColor(() => {}, {
            rgb: this.headBj ? this.headBj.split('_')[0] : '#256EF6'
          })
      }, this.transitionTime)
    }
  },
  methods: {
    goBack() {
      if (this.customBack) {
        this.$emit('customBack')
        this.$bus.emit('customBack')
        return
      }
      this.avarouter.goBack()
    },
    jump(icon) {
      this.$emit('triggerHander', icon)
      switch (icon) {
        case 'share':
          // new ShareModel(this.targetObj).doShare()
          break
        case 'search':
          this.avarouter.go('Search')
          break
        case 'service':
          let pvalue = this.headerTitle
          if (this.subTitle) {
            pvalue = `${this.headerTitle}(${this.subTitle})`
          }
          this.piwikTrack.piwikTrackEvent({ action: '点击了在线客服', pvalue })
          this.common.gotoServerPage()
          break
        case 'search1':
          // emit 出去  新增定投-> 普通定投、目标盈定投
          break
        case 'question':
          // 开户实名认证  RealNameAuthentication
          this.avarouter.go('AuthenticationPrivileges')
          break
        case 'question-btn':
          this.nfDialog
            .alert({
              title: '温馨提示',
              confirmButtonText: '我知道了',
              message:
                '<div class="text-center">因系统调整，交易申请暂不包含代销机构交易记录</div>'
            })
            .then(() => {})
          break
      }
    }
  }
}
</script>
<style lang="scss">
.as-sub-title {
  &.fixedhead {
    line-height: 1rem;
    padding-top: 0.25rem;
  }
  .title {
    line-height: 1.25rem;
  }
}
.fixedhead {
  height: 2.875rem;
  line-height: 2.875rem;
  box-sizing: border-box;
  font-size: 1.125rem;
  text-align: center;
  color: #ffffff;
  background: #256ef6 url(../assets/img/common/icon_back.png) no-repeat 1rem
    center;
  background-size: 1.5rem 1.5rem;
  &::after {
    // 解决部分页面头部出现1像素白条问题
    content: '';
    display: block;
    position: relative;
    bottom: 1px;
    background-color: inherit;
    width: 100%;
    height: 2px;
  }
  .for-arrow-handler {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    background: transparent;
    width: 4rem;
    height: 2.875rem;
  }
  .title {
    > p {
      max-width: 60%;
      margin: 0 auto;
    }
  }
  .right {
    max-width: 12rem;
    position: absolute;
    right: 0;
    top: 0;
    line-height: 2.875rem;
    height: 2.875rem;
    font-size: 0.88rem;
    padding-right: 1rem;
    text-align: right;
    .item-icon {
      width: 1.6rem;
      height: 2.875rem;
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 1.25rem 1.25rem;
      display: inline-block;
      margin-left: 1rem;
    }
    // .icon-service {
    //   background-image: url('../assets/img/service.png');
    //   background-size: 1.5rem 1.5rem;
    // }
    // .icon-share {
    //   background-image: url('../assets/img/share.png');
    //   background-size: 1.5rem 1.5rem;
    // }
    // .icon-filter {
    //   background-image: url('../assets/img/filter.png');
    //   background-size: 1.5rem 1.5rem;
    // }
    // .icon-search,
    // .icon-search1 {
    //   background-image: url('../assets/img/search.png');
    //   background-size: 1.5rem 1.5rem;
    // }
    // .icon-menu {
    //   background-image: url('../assets/img/menu.png');
    //   background-size: 1.5rem 1.5rem;
    // }
    // .icon-question {
    //   background-image: url('../assets/img/question.png');
    //   background-size: 1.25rem 1.25rem;
    // }
    // .icon-question-btn {
    //   background-image: url('../assets/img/question.png');
    //   background-size: 1.25rem 1.25rem;
    // }
    .icon-rectangle {
      // background-image: url('../assets/img/rectangle.gif');
      //background-size: 1.25rem 1.25rem;
      // background-position: 0;
      img {
        width: 1.25rem;
      }
      width: 5rem;
    }
  }
}
</style>
