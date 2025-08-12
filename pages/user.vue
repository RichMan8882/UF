<script setup lang="ts">
const router = useRouter()
const siteStore = useSiteStore()
const { signout } = useAuthStore()
const { queryChatbox } = siteStore
const PlayerStore = usePlayerStore()
const ticketStore = useTicketStore()
const { queryTicket } = ticketStore
const intervalId = ref(null)
const { t } = useI18n()

const isDashboard = computed(() => {
  return router.currentRoute.value.name === 'user'
})

const checkPath = (link) => {
  if (router.currentRoute.value.fullPath === `/user/${link}`) {
    return 'active'
  } else {
    return ''
  }
}
const unreadMessage = () => {
  const list = []
  ticketStore.tickets.forEach((item) => {
    if (
      item.thread.find((message) => message.role !== 0 && message.read === null)
    ) {
      list.push(item)
    }
  })
  return list.length
}
onMounted(async () => {
  if (siteStore.siteData?.smsVerify === 1) {
    if (!PlayerStore.playerInfo?.smsVerify) {
      return navigateTo('/user/smsVerify')
    }
  }
  const queryChatboxPromise = queryChatbox()
  queryChatboxPromise
    .then((queryChatboxRes) => {
      // 處理響應結果
      console.log('queryChatboxRes', queryChatboxRes.data)
    })
    .catch((error) => {
      console.error('Error loading queryChatboxRes data:', error)
    })

  console.log('setInterval queryTicket')
  const queryTicket_INTERVAL = 3 * 1000
  intervalId.value = setInterval(async () => {
    const queryTicketPromise = queryTicket()
    queryTicketPromise
      .then((queryTicketRes) => {
        // 處理響應結果
        if (!queryTicketRes) {
          clearInterval(intervalId.value)
          intervalId.value = null
        }
      })
      .catch((error) => {
        console.error('Error loading queryTicketRes data:', error)
      })
  }, queryTicket_INTERVAL)
})
onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
})
const gameWindowOpen = () => {
  const { isLogin } = useAuthStore()
  if (isLogin()) {
    if (siteStore.siteData?.smsVerify === 1) {
      if (!PlayerStore.playerInfo?.smsVerify) {
        return navigateTo('/user/smsVerify')
      } else {
        window.open(`${window.location.origin}/game`, '_blank')
      }
    } else {
      window.open(`${window.location.origin}/game`, '_blank')
    }
  } else {
    navigateTo('/login')
  }
}
watch(
  () => router.currentRoute.value.name,
  () => {
    if (siteStore.siteData?.smsVerify === 1) {
      if (!PlayerStore.playerInfo?.smsVerify) {
        return router.push('/user/smsVerify')
      }
    }
  }
)
const pledgeSocketStore = usePledgeSocketStore()

await onMounted(async () => {
  // 判斷gameType 是否有 5 pledge type
  if (siteStore.siteData?.gameType?.find((item: any) => item === 5)) {
    await pledgeSocketStore.startConnectWebSocket()
  }
})
onBeforeUnmount(() => {
  // 判斷gameType 是否有 5 pledge type
  if (siteStore.siteData?.gameType?.find((item: any) => item === 5)) {
    pledgeSocketStore.closeWebSocket()
  }
})
const walletName = (type) => {
  switch (type) {
    case 1:
      return siteStore.siteData.mainWalletType === type
        ? t('資產總攬(電子錢包)')
        : t('美元資產(電子錢包)')
    case 2:
      return siteStore.siteData.mainWalletType === type
        ? t('資產總攬(電子錢包)')
        : t('電力資產(電子錢包)')
    case 3:
      return siteStore.siteData.mainWalletType === type
        ? t('資產總攬(電子錢包)')
        : t('商城資產(電子錢包)')
    case 4:
      return siteStore.siteData.mainWalletType === type
        ? t('資產總攬(電子錢包)')
        : t('質押資產(電子錢包)')
    default:
      return t('其他資產')
  }
}
</script>
<template>
  <div class="page">
    <div class="containers">
      <div class="header">
        <div class="header-sec">
          <button
            type="button"
            class="header-logout"
            @click="navigateTo('/user')"
          >
            {{ $lang('資產管理') }}
          </button>
          <!-- <div class="header-info">
            <span> $ {{ PlayerStore.playerInfo?.balance }} </span>
          </div> -->
        </div>
        <div class="header-info">
          <span
            v-for="(item, index) in PlayerStore.playerInfo?.wallet"
            :key="index"
          >
            {{ walletName(item.type) }} $
            {{ new Intl.NumberFormat('zh-tw').format(item.balance) }}
          </span>
        </div>
        <div class="header-main">
          <div class="header-info accbg">
            <span>
              {{ PlayerStore.playerInfo?.account }}
            </span>
          </div>

          <button type="button" class="header-logout" @click="signout">
            {{ $lang('登出') }}
          </button>
        </div>
      </div>

      <div class="main shadow">
        <router-view />
      </div>

      <div v-if="isDashboard" class="tip shadow">
        <span>
          <i class="fa-solid fa-circle-info"></i>
        </span>

        <p>
          {{
            $lang('平台系統會不定時更新及優化，如有無法登入情形請洽客服聯繫')
          }}
          <br />
          {{
            $lang(
              '嚴禁使用第三方套利程式，否則會依中華民國刑法第360條以及台灣洗錢法第2條辦理實施法律訴訟追討賠償，請勿以身試法。'
            )
          }}
        </p>
      </div>

      <div class="back">
        <button type="button" class="back-btn" @click="navigateTo('/')">
          {{ $lang('回首頁') }}
        </button>
      </div>
    </div>
    <video
      class="login-video"
      src="https://telegra.ph/file/41782785ac0d23abf1b01.mp4"
      autoplay
      muted
      playsinline
      loop
    />
  </div>
</template>

<style lang="sass">
.form-btn-sec
  cursor: pointer
  display: inline-block
  border-radius: 4px
  letter-spacing: .5px
  text-align: center
  border-style: none
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 3px 1px -2px rgba(0, 0, 0, .12)
  outline: none
  transition: all ease .2s
  text-shadow: 0 0 10px rgba(0, 0, 0, .5)
  padding: 6px 16px
  background-color: #6c757d
  font-weight: bold
  color: #fff
  font-size: 13px

  @media screen and (min-width: 768px)
    font-size: 15px

.form-item
  margin-bottom: 10px

  h4
    font-size: 15px
    font-weight: bold

  input
    padding: 5px 10px
    color: #000
    font-size: 14px
    margin-top: 0
    width: 100%

    &.disabled
      background-color: rgba(0, 0, 0, 0.2)
      pointer-events: none
</style>

<style scoped lang="sass">
.page
  background-color: #fff
  position: relative
  width: 100dvw
  height: 100dvh
  overflow-y: auto
  overflow-x: hidden
  padding: 16px 0
.containers
  width: 100%
  padding-right: 15px
  padding-left: 15px
  margin-right: auto
  margin-left: auto
  max-width: 1000px
  height: 100%

  @media (min-width: 768px)
    display: flex
    flex-direction: column
    justify-content: center

.shadow
  box-shadow: 0 0 10px rgba(0, 0, 0, .2)
</style>

<style scoped lang="sass">
.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 24px
  position: relative
  z-index: 50

  &-sec
    display: flex

    .header-logout
      margin-right: 20px

  &-main
    display: flex
    align-items: center

    .header-info
      margin-right: 20px
    .accbg
      background-color: #fff
      span
        background-color: #32333a
        color: white


  &-logout
    background-color: #32333a
    padding: .25rem .75rem
    border-radius: 5px
    color: #fff
    padding: .4rem

    @media (min-width: 768px)
      padding: 4px 12px

  &-info
    padding: .3rem
    background-color: #f4f4f7
    border-radius: 5px
    // display: flex

    span
      font-size: .9rem
      padding: 5px 10px
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26)
      border-radius: .375rem
      background-color: #fff
      color: rgba(0, 0, 0, .54)
      display: block
</style>

<style scoped lang="sass">
.main
  position: relative
  z-index: 50
  max-height: 80vh
  overflow-y: auto
  overflow-x: hidden
  border-radius: 6px
  background-color: #f4f4f7

.tip
  position: relative
  z-index: 50
  padding: .3rem
  background-color: #f4f4f7
  border-radius: 4px
  margin-top: 16px
  display: flex
  justify-content: center
  align-items: center
  color: #212529

  span
    padding: 0 16px
    font-size: 22px

  p
    padding: 8px

.back
  position: relative
  z-index: 50
  padding: .3rem
  background-color: #f4f4f7
  display: inline-block
  border-radius: 4px
  margin-top: 32px
  margin-bottom: 24px

  &-btn
    font-size: 1rem
    padding: 6px 16px
    background-color: #198754
    color: #fff
    cursor: pointer
    border-radius: 4px
    letter-spacing: .5px
    text-align: center
    border-style: none
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 3px 1px -2px rgba(0, 0, 0, .12)
    outline: none
    transition: all ease .2s
    text-shadow: 0 0 10px rgba(0, 0, 0, .5)

    &:hover
      background-color: lighten(#198754, 15)

  @media (min-width: 768px)
    padding: 16px

    &-btn
      width: 100%
</style>

<style scoped lang="sass">
.login-video
  position: absolute
  bottom: 0
  right: 0
  max-width: 100%
  margin-left: auto
  object-fit: contain

@media screen and (min-width: 768px)
  .login-video
    max-width: 600px
    right: 0
</style>
