<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const playerStore = usePlayerStore()
const siteStore = useSiteStore()
const { withdraw, transfer } = useWalletStore()
const withdrawAmount = ref(0)
const tPwd = ref('')
const withdrawFee = computed(() => withdrawFeeCount())
const selectType = ref('withdraw')
const showSectionType = ref(true)
await useAsyncData(async () => {
  if (siteStore.siteData.smsVerify === 3) {
    if (!playerStore.playerInfo.smsVerify) {
      navigateTo('/user/smsVerify')
    }
  }
  if (!playerStore.playerInfo?.bankInfo) {
    navigateTo('/user/bank')
  }

  if (playerStore.playerInfo.bankInfo.status !== 1) {
    navigateTo('/user/bank')
  }
})
// methods
const goWithdraw = async () => {
  if (
    withdrawAmount.value < siteStore.siteData.minWithdrawAmount ||
    withdrawAmount.value > siteStore.siteData.maxWithdrawAmount
  ) {
    ElNotification({
      title: `${t('提款金額不符合規定')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  if (siteStore.siteData.transactionPasswordRequired) {
    if (!tPwd.value) {
      ElNotification({
        title: `${t('請輸入交易密碼')}`,
        type: 'error',
        duration: 1000,
        showClose: false
      })
      return
    }
  }
  console.log('withdrawAmount.value', withdrawAmount.value)
  console.log('Number(mainBalance.value)', Number(mainBalance.value))
  if (withdrawAmount.value > Number(mainBalance.value)) {
    ElNotification({
      title: `${t('可提領餘額不足')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  const withdrawRes = await withdraw(
    siteStore.siteData.transactionPasswordRequired
      ? {
          amount: JSON.stringify(withdrawAmount.value),
          password: tPwd.value,
          walletType: siteStore.siteData?.mainWalletType
        }
      : {
          amount: JSON.stringify(withdrawAmount.value),
          walletType: siteStore.siteData?.mainWalletType
        }
  )
  if (withdrawRes.success) {
    ElNotification({
      title: `${t('提款成功')}`,
      type: 'success',
      duration: 1000
    })
    withdrawAmount.value = 0
    tPwd.value = ''
    await playerStore.fetchInfo()
  }
}
const withdrawFeeCount = () => {
  const fee =
    withdrawAmount.value * siteStore.siteData.withdrawFeeRatio +
    siteStore.siteData.withdrawFeeFixed
  return fee < 1 ? 0 : new Intl.NumberFormat().format(fee)
}
const hiddenAccountNo = (value) => {
  if (value) {
    return value.replace(/^.{4}/, '****')
  } else {
    return ''
  }
}
onMounted(() => {
  if (playerStore.playerInfo.bankInfo !== null) {
    const bank = siteStore.siteData.depositOptions.bank.find((item) => {
      return item === playerStore.playerInfo.bankInfo.bankName
    })
    if (!bank) {
      showSectionType.value = false
    } else {
      showSectionType.value = true
    }
  }
})

const walletTypeName = (item: any) => {
  const type = item.type
  switch (type) {
    case 1:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('交易錢包')
    case 2:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('電力錢包')
    case 3:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('商城錢包')
    case 4:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('質押錢包')
    default:
      return t('其他資產')
  }
}

const transferWalletData = ref({
  from: '',
  to: '',
  amount: ''
})

const transferBtn = ref(false)

const goTransfer = async () => {
  transferBtn.value = false
  const fromData = playerStore.playerInfo.wallet.find(
    (item: any) => item.id === transferWalletData.value.from
  )
  const toData = playerStore.playerInfo.wallet.find(
    (item: any) => item.id === transferWalletData.value.to
  )
  if (!fromData) {
    ElNotification({
      title: `${t('請選擇轉出錢包')}`,
      type: 'error',
      duration: 1000
    })
    return
  }
  if (!toData) {
    ElNotification({
      title: `${t('請選擇轉入錢包')}`,
      type: 'error',
      duration: 1000
    })
    return
  }
  const transferRes = await transfer({
    fromWalletId: transferWalletData.value.from,
    toWalletId: transferWalletData.value.to,
    amount: JSON.stringify(transferWalletData.value.amount),
    memo: `用戶操作 ${walletTypeName(fromData)} 劃轉至 ${walletTypeName(toData)} ,數量: ${transferWalletData.value.amount}`
  })
  if (transferRes.success) {
    ElNotification({
      title: `${t('轉帳成功')}`,
      type: 'success',
      duration: 1000
    })
    await playerStore.fetchInfo()
    transferWalletData.value.amount = 0
  }
}

const mainBalance = computed(() => {
  const mainWallet = playerStore.playerInfo.wallet.find(
    (item: any) => item.type === siteStore.siteData?.mainWalletType
  )
  return mainWallet ? mainWallet.balance : 0
})

watch(
  () => transferWalletData.value.from,
  (newValue) => {
    console.log('transferWalletData.value', transferWalletData.value.from)
    const toWalletList = playerStore.playerInfo.wallet.filter(
      (item: any) => item.id !== transferWalletData.value.from
    )
    transferWalletData.value.to = toWalletList[0].id
  },
  { deep: true }
)
watch(
  () => transferWalletData.value.amount,
  (newValue) => {
    if (newValue > 0) {
      transferBtn.value = true
    } else {
      transferBtn.value = false
    }
  },
  { deep: true }
)
</script>
<template>
  <div class="withdraw">
    <div class="withdraw-title">
      <i class="fas fa-wallet"></i>
      <span>{{ $lang('總資產') }}</span>
    </div>

    <div class="withdraw-tabs">
      <button
        type="button"
        class="withdraw-tabs-btn"
        @click="navigateTo('/user/deposit')"
      >
        {{ $lang('儲值') }}
      </button>
      <button
        type="button"
        class="withdraw-tabs-btn"
        :class="selectType === 'withdraw' ? 'active' : ''"
        @click="selectType = 'withdraw'"
      >
        {{ $lang('提領') }}
      </button>
      <button
        v-if="playerStore.playerInfo.wallet.length > 1"
        type="button"
        class="withdraw-tabs-btn"
        :class="selectType === 'transfer' ? 'active' : ''"
        @click="selectType = 'transfer'"
      >
        {{ $lang('劃轉') }}
      </button>
    </div>

    <div
      v-if="selectType === 'withdraw' && playerStore.playerInfo.bankInfo"
      class="form"
    >
      <div class="form-item">
        <h4>
          {{ $lang('交易所名稱') }}
        </h4>
        <input
          class="disabled"
          type="text"
          :value="playerStore.playerInfo.bankInfo.bankName || '-'"
        />
      </div>
      <div class="form-item">
        <h4>
          {{ $lang('提領地址') }}
        </h4>
        <input
          class="disabled"
          type="text"
          :value="
            hiddenAccountNo(playerStore.playerInfo.bankInfo.accountNo) || '-'
          "
        />
      </div>
      <div class="form-item">
        <h4>{{ $lang('我的資產') }}({{ $lang('主錢包') }})</h4>
        <input
          class="disabled"
          type="text"
          :value="new Intl.NumberFormat('zh-TW').format(mainBalance) || '-'"
        />
      </div>
      <div class="form-item">
        <h4>
          {{ $lang('金額') }}
        </h4>
        <input v-model="withdrawAmount" v-trim-input type="number" />
        <span class="tip">
          {{ $lang('限制金額') }}：{{
            new Intl.NumberFormat('zh-TW').format(
              siteStore.siteData.minWithdrawAmount
            )
          }}
          ~
          {{
            new Intl.NumberFormat('zh-TW').format(
              siteStore.siteData.maxWithdrawAmount
            )
          }}
        </span>

        <span class="fee text-right w-100" style="margin: 0 0 0 10px"
          >{{ $lang('手續費') }}：{{
            withdrawAmount > 0 ? withdrawFeeCount() : 0
          }}</span
        >
      </div>
      <div
        v-if="siteStore.siteData.transactionPasswordRequired"
        class="form-item"
      >
        <h4>
          {{ $lang('交易密碼') }}
        </h4>
        <input v-model="tPwd" v-trim-input type="password" />
      </div>

      <button type="button" class="submit form-btn-sec" @click="goWithdraw">
        {{ $lang('送出') }}
      </button>
    </div>

    <div v-if="selectType === 'transfer'" class="form">
      <div class="form-item">
        <h4>
          {{ $lang('轉出錢包') }}
        </h4>
        <select v-model="transferWalletData.from" class="selectStyle">
          <option
            v-for="item in playerStore.playerInfo.wallet"
            :key="item.id"
            :value="item.id"
            @click="transferWalletData.from = item.id"
          >
            {{ walletTypeName(item) }} ($
            {{ new Intl.NumberFormat('zh-tw').format(item.balance) }})
          </option>
        </select>
      </div>
      <div class="form-item">
        <h4>
          {{ $lang('轉入錢包') }}
        </h4>
        <select v-model="transferWalletData.to" class="selectStyle">
          <option
            v-for="item in playerStore.playerInfo.wallet"
            :key="item.id"
            :value="item.id"
            @click="transferWalletData.to = item.id"
          >
            {{ walletTypeName(item) }} ($
            {{ new Intl.NumberFormat('zh-tw').format(item.balance) }})
          </option>
        </select>
      </div>
      <div class="form-item">
        <h4>
          {{ $lang('數量') }}
        </h4>
        <input v-model="transferWalletData.amount" v-trim-input type="number" />
      </div>

      <button type="button" class="submit form-btn-sec" @click="goTransfer">
        {{ $lang('送出') }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="sass">
.withdraw-title
    font-weight: bold
    padding: 12px 15px
    font-size: 18px
    margin-bottom: 6px
    background-color: #32333a
    color: #fff
    border-radius: 6px
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26)
    display: flex
    align-items: center

    span
      display: block
      margin-left: 10px
      margin-top: 2px

    @media (min-width: 768px)
      padding: 22px 26px
      font-size: 20px
      margin-bottom: 16px
</style>

<style scoped lang="sass">
.withdraw
  padding: 5px 10px 35px

  &-tabs
    display: flex
    justify-content: flex-end
    margin-bottom: 28px

    &-btn
      padding: 6px 12px
      border-radius: 4px
      background-color: #6c757d
      color: #fff
      margin-left: 12px
      font-size: 14px
      transition: opacity 0.3s

      &:hover
        opacity: 0.7

      &.active
        background-color: #007bff

  .form
    margin-bottom: 40px
  .form-item
    width: 100%

    .fee
      font-size: 14px
      color: rgb(47, 138, 88)
      font-weight: bold
      margin-left: 6px

    .tip
      color: rgb(208, 77, 94)
      font-size: 14px

  p
    margin-top: 24px
    margin-bottom: 10px
    text-align: center

  .form-btn-sec
    margin: 0 auto
    display: block


  @media screen and (min-width: 768px)
    padding: 30px 30px 60px

    .form-item
      max-width: 600px
      margin: 0 auto 10px
</style>
<style scoped lang="sass">
.selectStyle
  width: 100%
  height: 32px
  padding: 2px 15px
  font-size: 19px
  line-height: 32px
  font-weight: 400
  background-color: #fff
  border: 1px solid #000
  border-radius: 4px
</style>
