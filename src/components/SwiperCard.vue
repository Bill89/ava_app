<template>
  <div class="swiper-card">
    <swiper :options="getSwiperOption()" ref="refswiper">
      <swiper-slide
        v-for="(slide, index) in swiperData"
        :key="index"
        :style="getWidth(slideWidth)"
        @click.native="click(slide, index)"
      >
        <slot name="slideCard" :item="slide"></slot>
      </swiper-slide>
      <swiper-slide>
        <!-- 最后加多一个 swiper-slide 用于补充第一个swiper-slide的 margin-left: 1rem; -->
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'SwiperCard',
  props: {
    // 数据
    swiperData: {
      type: Array,
      default() {
        return []
      }
    },
    // 每个卡片的宽度
    slideWidth: {
      type: String,
      default: ''
    },
    // 每个卡片的间隔
    spaceBetweenSlide: {
      type: String,
      default: ''
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 8,
        touchMoveStopPropagation: false, // 解决和iscroll冲突问题 true阻止touchmove冒泡事件
        resistanceRatio: 0 // 抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离
      }
    }
  },
  methods: {
    click(item, index) {
      this.$emit('swiperClick', item, index)
    },
    getSwiperOption() {
      this.swiperOption.spaceBetween = parseInt(this.spaceBetweenSlide)
      return this.swiperOption
    },
    getWidth(width) {
      return `width: ${width} !important`
    }
  }
}
</script>
<style lang='scss' scoped>
.swiper-card {
  .swiper-slide {
    width: 33.6%; // 宽度 使用%
    .background-img {
      background-size: 100%;
    }
  }
  .swiper-slide:last-child {
    width: 1%;
  }
}
</style>
