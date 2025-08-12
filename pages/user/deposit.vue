<script setup>
const router = useRouter()
const playerStore = usePlayerStore()
const siteStore = useSiteStore()
await useAsyncData(() => {
  // if (siteStore.siteData.smsVerify === 2) {
  //   if (!playerStore.playerInfo.smsVerify) {
  //     return navigateTo('/user/smsVerify')
  //   }
  // }
  // if (siteStore.siteData.bankVerify === 0) {
  //   if (!playerStore.playerInfo.bankInfo) {
  //     return navigateTo('/user/bank')
  //   }
  // }
})
onMounted(async () => {
  const queryChatboxPromise = siteStore.queryChatbox()
  queryChatboxPromise
    .then((queryChatboxRes) => {
      // 處理響應結果
      console.log('queryChatboxRes', queryChatboxRes.data)
    })
    .catch((error) => {
      console.error('Error loading queryChatboxRes data:', error)
    })
})
// methods
const openChatBox = () => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  if (urlPattern.test(siteStore.chatbox)) {
    window.open(siteStore.chatbox, '_blank')
  }
}
</script>

<template>
  <div class="deposit">
    <div class="form-item">
      <h4>
        {{ $lang('儲值請聯繫客服，將會有專人為您處理') }}
      </h4>
      <!-- <input
        class="disabled"
        type="text"
        :value="PlayerStore?.playerInfo?.balance || 0"
      /> -->
    </div>
    <!-- <div class="form-item">
      <h4>
        {{ $lang('USDT錢包地址') }}
      </h4>
      <input
        class="disabled"
        type="text"
        :value="PlayerStore?.additionalInfo?.USDT錢包地址 || '-'"
      />
    </div>
    <div class="form-item">
      <h4>
        {{ $lang('USDT錢包總額') }}
      </h4>
      <input
        class="disabled"
        type="text"
        :value="PlayerStore?.playerInfo?.balance || 0"
      />
    </div> -->

    <instruction />

    <button type="button" class="form-btn-sec" @click="openChatBox">
      {{ $lang('聯繫客服') }}
    </button>
  </div>
</template>

<style scoped lang="sass">
.deposit
  padding: 5px 10px 35px

  .form-item
    width: 100%
    text-align: center

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
