<template>
  <div class="home-page">
    <header class="bcblue tc f18 h44 lh44 white">游戏大厅</header>
    <van-search
      v-model.trim="searchValue"
      left-icon
      right-icon="search"
      background="#f5f5f5"
      placeholder="请输入关键词搜索游戏"
      @blur="onSearch"
    ></van-search>
    <div class="index-h ofh">
      <VScroll
        ref="nfScroll"
        @refresh="onRefresh"
        v-model="refresh"
        :refreshColor="refreshColor"
        up
      >
        <section-box title="福利彩票" class="m10">
          <van-grid :column-num="3" gutter="10" :border="false" clickable>
            <van-grid-item
              v-for="(item, i) in hallData.welfareList"
              :key="i"
              :icon="item.url"
              to="/"
              :text="item.label"
              class="border-box"
            >
              <img slot="icon" v-lazy="item.url" width="57" height="57" class="mb8" />
            </van-grid-item>
          </van-grid>
        </section-box>
        <section-box title="体育彩票" class="m10">
          <van-grid :column-num="3" gutter="10" :border="false" clickable>
            <van-grid-item
              v-for="(item, i) in hallData.sportsList"
              :key="i"
              :icon="item.url"
              to="/"
              :text="item.label"
              class="border-box"
            >
              <img slot="icon" v-lazy="item.url" width="57" height="57" class="mb8" />
            </van-grid-item>
          </van-grid>
        </section-box>
        <section-box title="电子竞技" class="m10">
          <van-grid :column-num="3" gutter="10" :border="false" clickable>
            <van-grid-item
              v-for="(item, i) in hallData.welfareList.slice(0, 3)"
              :key="i"
              :icon="item.url"
              to="/"
              :text="item.label"
              class="border-box"
            >
              <img slot="icon" v-lazy="item.url" width="57" height="57" class="mb8" />
            </van-grid-item>
          </van-grid>
        </section-box>
        <section-box title="时时彩" class="m10">
          <van-grid :column-num="3" gutter="10" :border="false" clickable>
            <van-grid-item
              v-for="(item, i) in hallData.sportsList.slice(0, 3)"
              :key="i"
              :icon="item.url"
              to="/"
              :text="item.label"
              class="border-box"
            >
              <img slot="icon" v-lazy="item.url" width="57" height="57" class="mb8" />
            </van-grid-item>
          </van-grid>
        </section-box>
        <section-box title="高频彩" class="m10">
          <van-grid :column-num="3" gutter="10" :border="false" clickable>
            <van-grid-item
              v-for="(item, i) in hallData.welfareList.slice(0, 3)"
              :key="i"
              :icon="item.url"
              to="/"
              :text="item.label"
              class="border-box"
            >
              <img slot="icon" v-lazy="item.url" width="57" height="57" class="mb8" />
            </van-grid-item>
          </van-grid>
        </section-box>
        <section-box title="低频彩" class="m10">
          <van-grid :column-num="3" gutter="10" :border="false" clickable>
            <van-grid-item
              v-for="(item, i) in hallData.sportsList.slice(0, 3)"
              :key="i"
              :icon="item.url"
              to="/"
              :text="item.label"
              class="border-box"
            >
              <img slot="icon" v-lazy="item.url" width="57" height="57" class="mb8" />
            </van-grid-item>
          </van-grid>
        </section-box>
        <!-- slot -->
        <slot></slot>
      </VScroll>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GameHallPage',
  data() {
    return {
      refresh: true,
      refreshColor: {
        loadBgColor: '',
        textColor: '',
        cirCleColor: ''
        // loadBgColor: this.CONSTS.meTopColor,
        // textColor: this.CONSTS.updateColor,
        // cirCleColor: this.CONSTS.jumpBcColor
      },
      searchValue: '', // 搜索的关键词
      hallData: {
        welfareList: [
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/a13abff4-89a6-445c-a7a5-9aff2f0be4fc.png',
            label: '幸运飞艇'
          },
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/ced24720-6202-479d-b106-20c9543d8eb5.png',
            label: '分分时时彩'
          },
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/4efae891-c937-46e8-83a1-c8cde4006cb3.png',
            label: '分分PK拾'
          },
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/f4f8f6f7-b256-4c8c-8c21-478b65be9c1e.png',
            label: '香港六合彩'
          },
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/30cc5c90-e6e9-4616-a7fd-257cfe124cd9.png',
            label: '五分PK拾'
          },
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/200bbc20-fb0e-4c28-abfd-523345c61d8e.png',
            label: '背景PK拾'
          }
        ],
        sportsList: [
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/a13abff4-89a6-445c-a7a5-9aff2f0be4fc.png',
            label: '幸运飞艇'
          },
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/ced24720-6202-479d-b106-20c9543d8eb5.png',
            label: '分分时时彩'
          },
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/4efae891-c937-46e8-83a1-c8cde4006cb3.png',
            label: '分分PK拾'
          },
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/f4f8f6f7-b256-4c8c-8c21-478b65be9c1e.png',
            label: '香港六合彩'
          },
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/30cc5c90-e6e9-4616-a7fd-257cfe124cd9.png',
            label: '五分PK拾'
          },
          {
            url:
              'https://tg-cdn2.gdbzh.com.cn/200bbc20-fb0e-4c28-abfd-523345c61d8e.png',
            label: '背景PK拾'
          }
        ]
      }
    }
  },
  computed: {
    chinesered() {
      return this.theme === 'chinesered' ? 'chinesered' : ''
    }
  },
  watch: {
    allBtns: {
      handler() {
        // this.common.initPageBtns('HomePage', this.blocks)
      },
      deep: true
    }
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      Promise.all([])
        .then(res => {
          this.refresh = false
        })
        .catch(() => {
          this.refresh = false
        })
    },
    // 刷新视图，外层调用
    refreshView() {
      this.$refs.nfScroll.refresh()
    },
    onSearch(value) {
      this.searchValue && console.log('搜索的关键词为:', this.searchValue)
    }
  },
  activated() {
    this.$refs.nfScroll.refresh()
  },
  mounted() {
    // 初始化页面按钮提示
    // this.common.initPageBtns('HomePage', this.blocks)

    setTimeout(() => {
      this.onRefresh()
    }, 200)
  }
}
</script>
<style scoped lang="scss">
.home-page {
  .index-h {
    box-sizing: border-box;
    height: calc(100% - 2.875rem - 58px);
  }
}
</style>
