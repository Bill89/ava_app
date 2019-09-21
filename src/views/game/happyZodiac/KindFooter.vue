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
      selectedValues: '',
      areaName: ['wan', 'qian', 'bai', 'shi', 'ge']
    }
  },
  watch: {
    selectedNum: {
      handler(v) {
        this.selectedValues = Object.values(v).join(',')
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onBuy() {
      const param = {
        wan: this.selectedNum[0].split('').join(','),
        qian: this.selectedNum[1].split('').join(','),
        bai: this.selectedNum[2].split('').join(','),
        shi: this.selectedNum[3].split('').join(','),
        ge: this.selectedNum[4].split('').join(','),
        bet: '1',
        lotteryId: 1
      }
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
