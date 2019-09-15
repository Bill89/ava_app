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
              to="/"
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
                to="index"
                @click="configClick($event, i)"
              />
            </template>
          </van-cell-group>
        </div>
        <div class="mt16 mb6">
          <van-button size="large" class="red" tag="div" @click="onLogout">退出账户</van-button>
        </div>
        <!-- <section-box title="用户信息" class="m10">包括资金、等级、充值、提现、投注记录、消息、设置等</section-box> -->
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
          routerPath: ''
        },
        {
          text: '提现',
          icon: 'peer-pay',
          routerPath: ''
        },
        {
          text: '资金明细',
          icon: 'cash-on-deliver',
          routerPath: ''
        },
        {
          text: '投注记录',
          icon: 'records',
          routerPath: ''
        }
      ],
      configList: [
        {
          title: '我的银行卡',
          routerPath: ''
        },
        {
          title: '消息中心',
          routerPath: ''
        },
        {
          title: '修改登录密码',
          routerPath: ''
        },
        {
          title: '修改安全密码',
          routerPath: ''
        },
        {
          title: '安全问题',
          routerPath: ''
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
    configClick(value, i) {
      console.log(this.configList[i].title, i)
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
      this.common.isLogin(false)
      this.common.setSesVal('resume_flag', '')
      this.common.setLocVal('safe_out', 'true')
      // this.$store.dispatch('updateAuthFlow', { authName: '登录/注册' })
      this.router.replace('Login')
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
    height: calc(100% - 2.75rem);
  }
}
</style>
