<template>
  <div class="no-signal tc gray size16">
    <span class="icon"></span>
    <div>网络不给力，请稍后再试！</div>
    <span class="button h30 lh30 border-box" @click="refresh">再试一次</span>
  </div>
</template>
<script>
export default {
  name: 'NoSignal',
  methods: {
    refresh() {
      this.$store.commit('RELOAD_VIEW')
    }
  }
}
</script>
<style lang="scss" scoped>
.no-signal {
  .icon {
    display: inline-block;
    width: 5.875rem;
    height: 4.3125rem;
    margin: 7.75rem 0 1.375rem;
    background: url(../assets/img/no-signal.png) no-repeat center;
    background-size: contain;
  }
  .button {
    display: inline-block;
    width: 6rem;
    margin-top: 1.375rem;
    border: 1px solid #979797;
    border-radius: 15px;
  }
}
</style>
