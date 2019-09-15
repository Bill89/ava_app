<template>
  <tabs
    :class="{'nf-fund-style': nfFund}"
    :active="active"
    :sticky="sticky"
    :lineWidth="lineWidth"
    :swipeable="swipeable"
    :swipeThreshold="swipeThreshold"
    :type="type"
    :duration="duration"
    @click="onClick"
    @disabled="clickHandleDisabled"
  >
    <tab v-for="(item, i) in newTitles" :key="i" :title="item.title" :disabled="!!item.disabled">
      <template v-if="noCache ? active === i : alreadyClick.includes(i)">
        <slot :name="`head${i+1}`"></slot>
        <nf-pull-refresh v-if="!customScroll" :ref="`slot${i+1}`">
          <slot :name="`slot${i+1}`"></slot>
        </nf-pull-refresh>
        <template v-else>
          <slot :name="`slot${i+1}`"></slot>
        </template>
      </template>
    </tab>
  </tabs>
</template>
<script>
/**
 * @author
 * @description Tabs 标签页(点击加载并缓存)
 * @param value String, Number 当前激活标签的索引
 * @param titles Array title 标题,disabled 是否禁用标签 item 可为Object或String类型
 * @param customScroll Boolean 是否自定义滚动,默认带滚动
 * @param noCache Boolean 不缓存数据
 * @param 其他参数同官网
 */
import { Tab, Tabs } from 'vant'
export default {
  name: 'NfTabs',
  components: {
    Tab,
    Tabs
  },
  props: {
    value: [String, Number],
    sticky: Boolean,
    lineWidth: Number,
    swipeable: Boolean,
    swipeThreshold: {
      type: Number,
      default: 4
    },
    type: {
      type: String,
      default: 'line'
    },
    duration: {
      type: Number,
      default: 0.2
    },
    titles: {
      type: Array,
      default() {
        return []
      }
    },
    customScroll: {
      type: Boolean,
      default: false
    },
    noCache: {
      type: Boolean,
      default: false
    },
    nfFund: {
      type: Boolean,
      default: false
    },
    customClick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0, // 当前下标
      alreadyClick: [0]
    }
  },
  computed: {
    newTitles() {
      return this.titles.map(item => {
        return typeof item !== 'object' ? { title: item } : item
      })
    }
  },
  watch: {
    value: {
      handler(p) {
        const a = p ? +p : 0
        this.active = a
        !this.alreadyClick.includes(a) && this.alreadyClick.push(a)
      },
      immediate: true
    }
  },
  methods: {
    onClick(index, title) {
      if (!this.customClick) {
        this.active = index
        !this.alreadyClick.includes(index) && this.alreadyClick.push(index)
        this.$emit('input', index)
      }
      this.$emit('tabClick', { index, title })
    },
    clickHandleDisabled(index, title) {
      this.$emit('disabled', { index, title })
    }
  }
}
</script>
<style>
.van-tabs__wrap.van-hairline--top-bottom::after {
  border-width: 0 0 1px 0;
}
</style>
