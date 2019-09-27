<template>
  <div class="home-page">
    <header class="bcblue tc f18 h44 lh44 white">我的</header>
    <div class="index-h ofh">
      <VScroll
        ref="nfScroll"
        @refresh="onRefresh"
        v-model="refresh"
        :refreshColor="refreshColor"
        up
      >
        <div class="bcfff">
          <UserInfo></UserInfo>
          <van-grid :border="false" clickable class="mlr10">
            <van-grid-item
              v-for="(item, i) in moneyBtns"
              :key="i"
              :icon="item.icon"
              :text="item.text"
              @click="moneyitemClick($event, i)"
            />
          </van-grid>
          <van-cell-group class="tl">
            <template v-for="(item, i) in configList">
              <van-cell
                :key="i"
                :title="item.title"
                is-link
                @click="configClick(item.routerName, i)"
              />
            </template>
          </van-cell-group>
        </div>
        <div class="mt16 mb6">
          <van-button size="large" class="red" tag="div" @click="onLogout">退出账户</van-button>
        </div>
        <!-- slot -->
        <slot></slot>
      </VScroll>
    </div>
  </div>
</template>
<script>
import UserInfo from '@/views/me/UserInfo'
import { mapGetters } from 'vuex'
export default {
  name: 'MePage',
  components: { UserInfo },
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
      moneyBtns: [
        {
          text: '快捷充值',
          icon: 'cash-back-record',
          routerName: ''
        },
        {
          text: '提现',
          icon: 'peer-pay',
          routerName: ''
        },
        {
          text: '资金明细',
          icon: 'cash-on-deliver',
          routerName: ''
        },
        {
          text: '投注记录',
          icon: 'records',
          routerName: ''
        }
      ],
      configList: [
        {
          title: '我的银行卡',
          routerName: ''
        },
        {
          title: '消息中心',
          routerName: ''
        },
        {
          title: '修改登录密码',
          routerName: 'ChangeLoginPassword'
        },
        {
          title: '安全问题',
          routerName: ''
        }
      ]
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
  activated() {
    this.$refs.nfScroll.refresh()
  },
  mounted() {
    // 初始化页面按钮提示
    // this.common.initPageBtns('HomePage', this.blocks)

    setTimeout(() => {
      this.onRefresh()
    }, 200)
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
    moneyitemClick(value, i) {
      console.log(i)
    },
    configClick(routerName, i) {
      routerName && this.avarouter.go(routerName)
    },
    // 退出
    onLogout() {
      this.avaDialog
        .confirm({
          title: '温馨提示',
          message: '您是否确认退出本次登录',
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        })
        .then(() => {
          this.clearData()
        })
        .catch(() => {})
    },
    clearData() {
      // this.common.isLogin(false)
      // this.common.setSesVal('resume_flag', '')
      // this.common.setLocVal('safe_out', 'true')
      // this.$store.dispatch('updateAuthFlow', { authName: '登录/注册' })
      this.common.clearLocVal()
      this.avarouter.replace('Login')
      // this.$store.commit('SET_MYINTEGRAL_SCORE', {
      //   key: 'activescore',
      //   value: ''
      // })
    }
  }
}
</script>
<style scoped lang="scss">
.home-page {
  .index-h {
    box-sizing: border-box;
    height: calc(100% - 2.875rem);
  }
}
</style>
