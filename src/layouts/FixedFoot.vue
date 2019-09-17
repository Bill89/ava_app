<template>
  <div class="fixedfoot" :class="{'only-one': newMenus.length === 1, 'has-shade': hasShade}">
    <button
      v-for="(menu,index) in newMenus"
      :key="index"
      @click="onClickMenu(menu)"
      :disabled="!!(disabledMenu && disabledMenu.includes(menu))"
      :class="{'disabled': !!(disabledMenu && disabledMenu.includes(menu))}"
    >{{menu}}</button>
  </div>
</template>
<script>
export default {
  props: [
    'menus',
    'iconIndex',
    'backRoute',
    'detailInfo',
    'customEvent',
    'disabledMenu',
    'hasShade'
  ],
  data() {
    return {
      bg: 'red',
      attentionBtnIndex: -1,
      attentionState: null,
      promise: null,
      focusid: '',
      getFundDetail: {},
      canClickAttention: false
    }
  },
  watch: {
    detailInfo: {
      handler(a) {
        this.getFundDetail = a
        this.attentionBtnIndex !== -1 && this.initAttentionState(a)
      },
      deep: true
    }
  },
  created() {
    this.attentionBtnIndex = this.menus.findIndex(
      menu => menu.indexOf('关注') !== -1
    )
  },
  computed: {
    newMenus() {
      let transMenus = Array.from(this.menus)
      transMenus[this.attentionBtnIndex] =
        this.attentionState === true
          ? '已关注'
          : this.attentionState === false
            ? '+关注'
            : '关注'
      return transMenus
    }
  },
  methods: {
    initAttentionState(obj) {
      if ('fundcode' in obj || 'combcode' in obj) {
        this.httpFetch
          .post(this.apiType.QUERY_COMBO_ATTENTION_STATE, {
            fundcode: obj.fundcode || obj.combcode
          })
          .then(data => {
            if (data.focusid) {
              this.attentionState = true
              this.focusid = data.focusid
            } else {
              this.attentionState = false
            }
            this.canClickAttention = true
          })
          .catch(err => {
            if (!err) return // 没登录的情况
            this.nfToast.fail({ message: err.message })
          })
      }
    },
    actionAttentionHandler() {
      let attentionParams = this.attentionState
        ? { focusid: this.focusid }
        : {
          codetype: this.getFundDetail.fundcode ? '0' : '1',
          fundcode: this.getFundDetail.fundcode || this.getFundDetail.combcode
        }
      let attentiuonUrl = this.attentionState
        ? this.apiType.CANCEL_FUND_ATTENTION
        : this.apiType.ADD_FUND_ATTENTION
      let newPromise = new Promise((resolve, reject) => {
        this.httpFetch
          .post(attentiuonUrl, attentionParams)
          .then(data => {
            resolve(data)
          })
          .catch(res => {
            reject(res)
          })
      })
      return newPromise
    },
    fireAttentionHandler() {
      if (this.promise) return this.promise
      this.promise = this.actionAttentionHandler()
      this.promise.then(() => {
        this.promise = null
      })
      return this.promise
    },
    onClickMenu(menu) {
      if (this.attentionState !== -1 && menu.indexOf('关注') !== -1) {
        if (!this.common.isLogin()) {
          this.avarouter.go('LoginPage')
          return false
        }
        if (!this.canClickAttention) return false
        this.canClickAttention = false
        this.fireAttentionHandler()
          .then(data => {
            this.nfToast({ message: data.message })
            if (!this.attentionState) this.focusid = data.focusid
            this.attentionState = !this.attentionState
            this.$bus.emit('updateMyAttention')
            this.canClickAttention = true
          })
          .catch(res => {
            this.nfToast({ message: res.message })
            this.canClickAttention = true
          })
        return false
      }

      if (this.customEvent) {
        this.$emit('customClick')
        this.$bus.emit(this.customEvent)
        return
      }
      if (menu === '智能取现' || menu === '工资理财' || menu === '智能充值') {
        this.piwikTrack.piwikTrackEvent({ action: menu })
      }
      switch (menu) {
        case '取现':
        case '智能取现':
          if (!this.common.certificationNotice({ isWeakUser: 0 })) {
            this.avarouter.go('EnchashmentPage', this.detailInfo)
          }
          break
        case '工资理财':
          if (!this.common.certificationNotice({ isWeakUser: 0 })) {
            this.goFinancial()
          }
          break
        case '充值':
        case '智能充值':
          if (!this.common.certificationNotice({ isWeakUser: 0 })) {
            this.avarouter.go('RechargePage', this.detailInfo)
          }
          break
        case '定投':
          if (!this.common.certificationNotice({ isWeakUser: 0 })) {
            if (this.detailInfo.pensionFlag) {
              // 养老宝的定投
              this.avarouter.go('CombInvestmentPage', {
                planType: 'add',
                combDetail: this.detailInfo,
                pensionFlag: this.detailInfo.pensionFlag
              })
            } else {
              this.avarouter.go('InvestmentPage', {
                fundDetail: this.detailInfo,
                planType: 'add'
              })
            }
          }
          break
        case '查看交易确认信息':
          this.avarouter.go('TradeConfirm')
          break
        case '购买':
          if (!this.common.certificationNotice({ isWeakUser: 0 })) {
            if (this.detailInfo.fundtype === '2') {
              this.avarouter.go('RechargePage', this.detailInfo)
            } else {
              if (this.detailInfo.combcode) {
                this.avarouter.go('BuyCombPage', {
                  combDetail: this.detailInfo
                })
              } else {
                this.avarouter.go('BuyFundPage', {
                  fundDetail: this.detailInfo
                })
              }
            }
          }
          break
        default:
          this.$emit('customClick', menu)
      }
    },
    goFinancial() {
      if (this.detailInfo && this.detailInfo.isGoFinancialPlan) {
        this.avarouter.go('FinancialPlan', { planType: 'add' })
        return
      }
      this.httpFetch
        .post(this.apiType.FINANCIAL_PLAN_PAGE)
        .then(res => {
          if (res && res.returnlist.length) {
            this.avarouter.go('FinancialPondPage', { res: res })
          } else {
            this.avarouter.go('FinancialPlan', { planType: 'add' })
          }
        })
        .catch(err => {
          this.nfToast(err.message)
        })
    }
  }
}
</script>
<style lang="scss">
.only-one.fixedfoot a:last-child {
  background-color: #ffffff;
  color: #256ef6;
  border-right: none;
}
.fixedfoot {
  height: 2.75rem;
  box-sizing: border-box;
  // border-top: 1px solid #E5E5E5;
  display: flex;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 1px 4px #dddddd;
  padding: 0;
  margin: 0;
  button {
    flex: 1;
    line-height: 3rem;
    font-size: 1rem;
    border-right: solid #f5f5f5;
    border-width: 0 1px 0 0;
    outline: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
  }
  button:last-child {
    background-color: #256ef6;
    color: white;
    border-right: none;
    &.disabled {
      background-color: #dbdbdb;
      color: graytext;
      border-color: graytext;
    }
  }
  button.as-icon {
    font-size: 0.625rem;
    padding-top: 0.75rem;
    // background-repeat: no-repeat;
    // background-position: center 0.4rem;
    // background: url(../assets/img/common/icon_follow.png) center 0.25rem no-repeat;
  }
  &.has-shade {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      box-shadow: 0 0 3px black;
    }
  }
}
</style>
