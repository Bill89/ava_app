<template>
  <div v-show="isLoading">
    <div class="loading-mask" v-show="loadingState === '2'"></div>
    <div class="nf-loading">
      <!-- <img :src="nfLoadingImg" class="nfLoadingImg">
      <img :src="nfLoadingCircleImg" class="nfLoadingCircleImg">-->
    </div>
  </div>
</template>
<script>
// import nfLoadingImg from 'assets/img/nfLoading.png'
// import nfLoadingCircleImg from 'assets/img/nfLoading-circle.png'
// 优先阻塞 => 显示 => 不显示
export default {
  name: 'Loading',
  data() {
    return {
      // nfLoadingImg,
      // nfLoadingCircleImg,
      timer: '', // 计时器
      timerId: 0, // 计时器ID
      maxTimer: 29000, // loading最大延时
      minTimer: 0 // 最小延时
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    // '0' 不显示，'1' 显示不阻塞, '2'显示阻塞
    loadingState() {
      return this.$store.state.loadingState
    }
  },
  watch: {
    isLoading(a) {
      clearTimeout(this.timerId)
      let timer
      if (a) {
        this.timer = new Date()
        timer = this.maxTimer
      } else {
        const t = this.minTimer - (+new Date() - +new Date(this.timer))
        timer = t > 0 ? t : 0
      }
      this.timerId = setTimeout(() => {
        this.$store.commit('HIDE_LOADING', true)
      }, timer)
    }
  }
}
</script>
<style lang='scss' scoped>
.loading-mask {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.nf-loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 7.5rem;
  height: 7.5rem;
  .nfLoadingImg {
    width: 7.5rem;
  }
  .nfLoadingCircleImg {
    position: absolute;
    width: 5.88rem;
    left: 0.82rem;
    top: 0.82rem;
    animation: rotate 2s 0s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg) translateZ(0);
    }
    100% {
      transform: rotate(360deg) translateZ(0);
    }
  }
}
</style>
