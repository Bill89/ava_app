<!-- 倒计时组件 -->
<template>
  <span>{{ timeArray.join(':') }}</span>
</template>

<script>
export default {
  data() {
    return {
      timeArray:
        this.theme === 2
          ? new Array(this.type * 2).fill('0')
          : new Array(this.type).fill('00'),
      timeArrayT:
        this.theme === 2
          ? new Array(this.type * 2).fill('0')
          : new Array(this.type).fill('00'),
      isAnimate:
        this.theme === 2
          ? new Array(this.type * 2).fill(false)
          : new Array(this.type).fill(false)
    }
  },
  props: {
    endDate: { type: [Date, Number, String], default: 0 }, // 截止时间
    type: { type: [Number, String], default: 3 }, // 时间精度 4/3/2/1
    theme: { type: [Number, String], default: 1 }
  },
  computed: {
    endTime() {
      if (this.endDate instanceof Date) {
        return this.endDate.getTime()
      }
      return Number(this.endDate) > 0 ? Number(this.endDate) : 0
    },
    step() {
      return this.theme === 1 ? 1 : 2
    },
    arr() {
      const length = this.timeArray.length
      const step = this.step
      const temp = [
        length - 1,
        length - step - 1,
        length - step * 2 - 1,
        length - step * 3 - 1
      ]
      temp.length = this.type > 1 ? this.type : 1
      return temp
    }
  },
  watch: {
    timeArray(newV, oldV) {
      const diff = []
      newV.forEach((value, index) => {
        if (value !== oldV[index]) {
          this.$set(this.isAnimate, index, true)
          diff.push({ value, index })
        }
      })
      setTimeout(() => {
        diff.forEach(item => {
          this.$set(this.timeArrayT, item.index, item.value)
        })
      }, 350)
    },
    endTime(newV) {
      if (newV > 0) {
        this.start(true)
      }
    }
  },
  mounted() {
    this.start(true)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    // 开始倒计时
    start(isFirst) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let t = this.endTime - new Date().getTime() // 剩余的毫秒数
        t = t < 0 ? 0 : t
        let day = 0 // 剩余的天
        let hour = 0 // 剩余的小时
        let min = 0 // 剩余的分钟
        let second = 0 // 剩余的秒
        const type = Number(this.type)
        if (type >= 4) {
          day = Math.floor(t / 86400000) // 剩余的天
          hour = Math.floor(t / 3600000 - day * 24) // 剩余的小时 已排除天
          min = Math.floor(t / 60000 - day * 1440 - hour * 60) // 剩余的分钟 已排除天和小时
          second = Math.floor(t / 1000 - day * 86400 - hour * 3600 - min * 60) // 剩余的秒
        } else if (type >= 3) {
          hour = Math.floor(t / 3600000) // 剩余的小时
          min = Math.floor(t / 60000 - hour * 60) // 剩余的分钟 已排小时
          second = Math.floor(t / 1000 - hour * 3600 - min * 60) // 剩余的秒
        } else if (type >= 2) {
          min = Math.floor(t / 60000) // 剩余的分钟
          second = Math.floor(t / 1000 - min * 60) // 剩余的秒
        } else {
          second = Math.floor(t / 1000) // 剩余的秒
        }
        let arr = []
        if (Number(this.theme) === 1) {
          // 不分开
          type >= 4 && arr.push(String(day).padStart(2, '0'))
          type >= 3 && arr.push(String(hour).padStart(2, '0'))
          type >= 2 && arr.push(String(min).padStart(2, '0'))
          arr.push(String(second).padStart(2, '0'))
        } else {
          // 分开
          type >= 4 &&
            arr.push(
              ...String(day)
                .padStart(2, '0')
                .split('')
            )
          type >= 3 &&
            arr.push(
              ...String(hour)
                .padStart(2, '0')
                .split('')
            )
          type >= 2 &&
            arr.push(
              ...String(min)
                .padStart(2, '0')
                .split('')
            )
          arr.push(
            ...String(second)
              .padStart(2, '0')
              .split('')
          )
        }
        this.timeArray = arr
        if (isFirst) {
          this.timeArrayT = [...this.timeArray]
          this.isAnimate = new Array(this.timeArray.length).fill(false)
        }
        if (t > 0) {
          this.start()
        } else {
          this.$emit('timeUp')
        }
      }, 1000)
    },
    onAnimateEnd(index) {
      this.$set(this.isAnimate, index, false)
    }
  }
}
</script>
