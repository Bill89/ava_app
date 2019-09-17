<template>
  <footer class="fb-between bcfff h50 plr16">
    <div>
      <span>已选0注，0.00元</span>
      <div>{{ selectedValues }}</div>
    </div>
    <div>
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="onBuy">购买</van-button>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'KindFooter',
  props: {
    selectedNum: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      selectedValues: ''
    }
  },
  watch: {
    selectedNum: {
      handler(v) {
        let val = ''
        for (const value of Object.values(v)) {
          val += value + ','
        }
        this.selectedValues = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onBuy() {
      const param = Object.values(this.selectedNum).map((v, i) => ({
        area: i,
        bet: '1',
        number: v
      }))
      this.http
        .post(this.api.bet, param)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
