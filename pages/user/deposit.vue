<script setup>
const router = useRouter()
const { copy } = useCopy()
const playerStore = usePlayerStore()
const siteStore = useSiteStore()
const walletList = ref([])
const { deposit, getWallet, queryDepositRecords, updateDeposit } =
  useWalletStore()
const { t } = useI18n()
const scrollContainer = ref(null)
onMounted(async () => {
  if (!playerStore.playerInfo?.bankInfo) {
    navigateTo('/user/bank')
  }

  if (playerStore.playerInfo.bankInfo.status !== 1) {
    navigateTo('/user/bank')
  }

  const res = await getWallet()
  walletList.value = res.data.siteWalletConfig.walletTypes
  walletInfo.value = walletList.value.find((item) => item.walletTypeId === 1)
  form.value.walletId = playerStore?.playerInfo.wallet[0].id
})
const loading = ref(false)
const handleScroll = () => {
  if (!scrollContainer.value) return
  const { scrollTop, clientHeight, scrollHeight } = scrollContainer.value
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    if (!isNull.value) {
      queryRecords(true)
    }
  }
}
const config = useRuntimeConfig()
const { siteId } = config.public
const form = ref({
  walletId: '',
  siteId,
  // playerId: playerStore.playerInfo.id,
  currency: 'USD',
  channel: 'BankTransfer',
  amount: null,
  bankData: {
    bankName: playerStore.playerInfo.bankInfo?.bankName || '',
    accountNumber: playerStore.playerInfo.bankInfo?.accountNo || ''
  },
  memo: ''
})
const submit = async () => {
  if (!form.value.amount) {
    ElNotification({
      title: `${t('請輸入金額')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  if (!form.value.walletId) {
    ElNotification({
      title: `${t('請選擇錢包')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  form.value.amount = String(form.value.amount)
  const depositRes = await deposit(form.value)
  console.log(depositRes, 'depositRes')
  if (depositRes.success) {
    ElNotification({
      title: `${t('成功建立儲值訂單')}`,
      type: 'success',
      duration: 1000
    })
  } else {
    ElNotification({
      title: depositRes.message,
      type: 'error',
      duration: 1000
    })
  }
}
const onMaxAmount = () => {
  if (walletInfo.value) {
    form.value.amount = walletInfo.value.max
  }
}
const walletInfo = ref()
const selectWallet = (event) => {
  const walletType = playerStore?.playerInfo?.wallet.find(
    (item) => item.id === event.target.value
  )
  walletInfo.value = walletList.value.find(
    (item) => item.walletTypeId === walletType.type
  )
}
const walletTypeName = (item) => {
  const type = item.type
  switch (type) {
    case 1:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('期貨錢包')
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
        : t('金融錢包')
    case 5:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('台股錢包')
    case 6:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('港股錢包')
    case 7:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('美股錢包')
    case 8:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('大宗商品期貨錢包')
    case 9:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('加密貨幣錢包')
    case 10:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('秒合約錢包')
    case 11:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('二元期權錢包')
    default:
      return t('其他資產')
  }
}
const depositType = ref('deposit')
const depositList = ref([])
const getRecord = async () => {
  depositType.value = 'record'
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.addEventListener('scroll', handleScroll)
    }
  })
  queryRecords(false)
}
const recordParams = ref({
  playerId: playerStore.playerInfo.id,
  page: 1,
  sortWay: 'desc',
  sortKey: 'createdAt',
  pageSize: 15
})
const isNull = ref(false)
const queryRecords = async (e) => {
  if (loading.value) return
  loading.value = true
  if (e) {
    recordParams.value.page++
  } else {
    recordParams.value.page = 1
  }
  const res = await queryDepositRecords(recordParams.value)
  if (e) {
    depositList.value = depositList.value.concat(res.data.result)
    if (res.data.result.length < 10) {
      isNull.value = true
    }
  } else {
    depositList.value = res.data.result
    isNull.value = false
  }
  loading.value = false
}
const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
const applyStatus = (status) => {
  if (status === 0) {
    return t('待審核')
  } else if (status === 1) {
    return t('通過可匯款')
  } else if (status === 2) {
    return t('用戶已確認轉帳')
  } else if (status === 3) {
    return t('確認完成轉帳')
  } else if (status === 4) {
    return t('駁回充值申請')
  } else if (status === 5) {
    return t('取消充值申請')
  }
}
const depositDetails = ref()
const dialogVisible = ref(false)
const getDetails = (item) => {
  dialogVisible.value = true
  depositDetails.value = item
}
const cancelDeposit = () => {
  ElMessageBox.confirm(t(`确定要取消該筆儲值吗?`), {
    type: 'warning',
    confirmButtonText: t('確定'),
    cancelButtonText: t('取消'),
    draggable: true
  })
    .then(async () => {
      const res = await updateDeposit({
        id: depositDetails.value.id,
        status: 5
      })
      console.log(res, 'resss')

      if (res.success) {
        dialogVisible.value = false
        queryRecords(false)
        ElNotification({
          title: `${t('成功取消儲值訂單')}`,
          type: 'success',
          duration: 1000
        })
      }
    })
    .catch(() => {
      dialogVisible.value = false
    })
}
</script>

<template>
  <div class="deposit">
    <div class="changeType">
      <button
        type="button"
        class="buttonWhite"
        :class="depositType === 'deposit' ? 'active' : ''"
        @click="depositType = 'deposit'"
      >
        {{ $lang('储值申请') }}
      </button>
      <button
        type="button"
        class="buttonWhite"
        :class="depositType === 'record' ? 'active' : ''"
        @click="getRecord"
      >
        {{ $lang('儲值記錄') }}
      </button>
    </div>
    <div v-if="depositType === 'deposit'" style="margin-top: 15px">
      <div class="form-item">
        <h4>
          {{ $lang('選擇錢包') }}
        </h4>
        <select
          v-model="form.walletId"
          class="selectStyle"
          @change="selectWallet"
        >
          <option
            v-for="item in playerStore?.playerInfo.wallet"
            :key="item.id"
            :value="item.id"
          >
            {{ walletTypeName(item) }} ($
            {{ new Intl.NumberFormat('zh-tw').format(item.balance) }})
          </option>
        </select>
      </div>
      <div class="form-item">
        <h4>
          {{ $lang('儲值金額') }}
        </h4>
        <div class="inputamount">
          <input
            v-model="form.amount"
            type="number"
            :placeholder="
              walletInfo ? walletInfo.min + t('USDT起存') : t('請先選擇錢包')
            "
          />
          <div @click="onMaxAmount">{{ $lang('最大') }}</div>
        </div>
      </div>

      <div class="form-item">
        <h4>
          {{ $lang('儲值備注') }}
        </h4>
        <input v-model="form.memo" />
      </div>
      <button type="button" class="form-btn-sec" @click="submit">
        {{ $lang('送出') }}
      </button>
    </div>
    <div
      ref="scrollContainer"
      class="recordBox"
      v-if="depositType === 'record'"
    >
      <table>
        <tr class="recordBox-title">
          <th>{{ $lang('時間') }}</th>
          <th>{{ $lang('狀態') }}</th>
          <th>{{ $lang('金額') }}</th>
        </tr>
        <tr
          v-for="(item, index) in depositList"
          :key="index"
          class="recordBox-toggle"
          @click="getDetails(item)"
        >
          <th>{{ formatDate(item.createdAt) }}</th>
          <th>{{ applyStatus(item.status) }}</th>
          <th>$ {{ new Intl.NumberFormat('zh-TW').format(item.amount) }}</th>
        </tr>
      </table>
    </div>
    <el-dialog v-model="dialogVisible" width="400">
      <div class="depositDialog">
        <div v-if="depositDetails.status === 1" class="address">
          {{ $lang('地址') }}
          <i class="fa-solid fa-angle-right"></i>
          <div class="content">
            {{ depositDetails.depositAddress }}
            <div @click="copy(depositDetails.depositAddress)" class="copyclass">
              <i class="fa-regular fa-clone fa-xs"></i>
            </div>
          </div>
        </div>
        <div class="list">
          <div>{{ $lang('充幣賬戶') }}</div>
          <div>{{ $lang('主錢包') }}</div>
        </div>
        <div class="list">
          <div>{{ $lang('最小充幣額') }}</div>
          <div>{{ walletInfo.min }} USDT</div>
        </div>
        <div class="list">
          <div>{{ $lang('充值到賬時間') }}</div>
          <div>{{ $lang('約1分鐘') }}</div>
        </div>
        <div class="list">
          <div>{{ $lang('可提幣時間') }}</div>
          <div>{{ $lang('約2分鐘') }}</div>
        </div>
        <div class="list">
          <div>{{ $lang('備注') }}</div>
          <div>{{ depositDetails.memo || '--' }}</div>
        </div>
        <div
          class="bottombox"
          v-if="depositDetails.status === 0"
          @click="cancelDeposit"
        >
          {{ $lang('取消儲值') }}
        </div>
      </div>
    </el-dialog>
    <instruction />
  </div>
</template>
<style scoped lang="sass">
.depositDialog
  margin: 30px
  .address
    color: #606266
    .content
      color: #000
      font-size: 20px
      font-weight: 600
      display: flex
      justify-content: space-between
      align-items: center
      .copyclass
        border-radius: 50%
        width: 30px
        height: 30px
        background-color: #f1f1f1
        text-align: center
        cursor: pointer
  .list
    display: flex
    align-items: center
    justify-content: space-between
    margin-top: 10px
    div
      &:first-child
        color: #000
        font-size: 15px

  .bottombox
    margin: 0 auto
    height: 40px
    line-height: 40px
    width: 100px
    text-align: center
    color: #fff
    background-color: #32333a
    border-radius: 6px
    margin-top: 20px
    cursor: pointer
</style>
<style scoped lang="sass">
.recordBox
  width: 100%
  max-height: 400px
  overflow-y: scroll
  padding: 20px 30px
  @media screen and (max-width: 768px)
    padding: 20px 5px 10px 5px
  table
    width: 100%
    border-collapse: separate
    border-spacing: 3px
  .recordBox-title
    background-color: #b8b8b8
    color: #000
    font-size: 16px
.changeType
  border-bottom: 1px solid rgba(0, 0, 0, .12)
  @media screen and (min-width: 768px)
    padding: 15px
    padding-bottom: 0
.buttonWhite
  margin: 20px 0 20px 30px
  // width: 100px
  padding: 0 10px
  height: 40px
  background-color: rgba(0, 0, 0, 0.2)
  border-radius: 5px
  text-align: center
  line-height: 40px
  cursor: pointer
  font-size: 16px
  color: #000
  @media screen and (max-width: 768px)
    width: 135px
.active
  background-color: #0849aabd
  color: #fff
.recordBox-toggle
  padding: 5px 0
  background-color: #fff
  cursor: pointer
  &:hover
    background-color: #e5e5e5
  td
    padding: 5px
    font-size: 15px
    font-weight: bold
    transition: all ease 0.3s
    word-break: break-word
.deposit
  padding: 5px 10px 35px

  .form-item
    width: 100%
    text-align: center
    .inputamount
      display: flex
      justify-content: space-between
      align-items: center
      div
        padding: 4px 12px
        background-color: #32333a
        cursor: pointer
        font-size: 14px
        color: #fff
        border-radius: 6px
      input
        width: 90%
  p
    margin-top: 24px
    margin-bottom: 10px
    text-align: center

  .form-btn-sec
    margin: 30px auto
    display: block


  @media screen and (min-width: 768px)
    padding: 30px 30px 60px

    .form-item
      max-width: 600px
      margin: 0 auto 10px
</style>
