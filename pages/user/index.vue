<script lang="ts" setup>
const siteStore = useSiteStore()
const { t } = useI18n()

const { queryChatbox } = siteStore

const dashboardList = ref([
  {
    title: t('開始交易'),
    path: '/game',
    icon: '<i class="fa-brands fa-500px"></i>'
  },
  {
    title: t('質押'),
    path: '/user/pledge',
    icon: '<i class="fas fa-coins"></i>'
  },
  {
    title: t('充幣'),
    path: '/user/deposit',
    icon: '<i class="fa-solid fa-circle-dollar-to-slot"></i>'
  },
  {
    title: t('優惠活動'),
    path: '/user/activity',
    icon: '<i class="fa-solid fa-gifts"></i>'
  },
  {
    title: t('提幣管理'),
    path: '/user/withdraw',
    icon: '<i class="fa-solid fa-handshake-angle"></i>'
  },
  {
    title: t('提領紀錄'),
    path: '/user/record',
    icon: '<i class="fa-solid fa-file-invoice"></i>'
  },
  {
    title: t('會員資訊'),
    path: '/user/info',
    icon: '<i class="fa-solid fa-gears"></i>'
  },
  {
    title: t('留言咨詢'),
    path: '/user/message',
    icon: '<i class="fa-brands fa-facebook-messenger"></i>'
  },
  {
    title: t('公告'),
    path: '/user/news',
    icon: '<i class="fa-solid fa-bullhorn"></i>'
  }
])

onMounted(async () => {
  const queryChatboxPromise = queryChatbox()
  queryChatboxPromise
    .then((queryChatboxRes) => {
      // 處理響應結果
      console.log('queryChatboxRes', queryChatboxRes.data)
    })
    .catch((error) => {
      console.error('Error loading queryChatboxRes data:', error)
    })
})

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

const handleNavigateTo = (path) => {
  if (path === 'customer') {
    openChatBox()
    return
  }
  navigateTo(path)
}

const filterPledge = computed(() => {
  return dashboardList.value.filter(
    (item) =>
      item.path !== '/user/pledge' ||
      siteStore.siteData?.gameType?.find((item: any) => item === 5)
  )
})
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-title">
      {{ $lang('常用功能') }}
    </div>

    <ul class="dashboard-list">
      <li
        v-for="item in filterPledge"
        :key="item.title"
        class="dashboard-list-item shadow"
        @click="handleNavigateTo(item.path)"
      >
        <span v-html="item.icon"></span>
        <h4>{{ item.title }}</h4>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="sass">
.shadow
  box-shadow: 0 0 10px rgba(0, 0, 0, .2)

.dashboard
  padding: 24px

  &-title
    font-weight: bold
    padding: 12px 15px
    font-size: 18px
    margin-bottom: 6px
    background-color: #32333a
    color: #fff
    border-radius: 6px
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26)

    @media (min-width: 768px)
      padding: 22px 26px
      font-size: 20px
      margin-bottom: 16px

  &-list
    display: flex
    flex-wrap: wrap

    @media (min-width: 768px)
      margin-bottom: 24px

    &-item
      cursor: pointer
      margin: 5px
      padding: 10px
      width: calc(33.3334% - 10px)
      border-radius: .375rem
      background-color: #fff
      transition: all 250ms
      color: black

      &:hover
        background-color: #f2f2f2
        transform: translateY(-2px)
        box-shadow: 0 2px 5px 3px rgba(36, 36, 36, .555)

      span
        color: rgba(0, 0, 0, .54)
        font-size: 2.5rem
        margin-bottom: 10px
        display: flex
        justify-content: center

      h4
        text-align: center
        font-size: 1rem

      @media (min-width: 768px)
        width: calc(25% - 1rem)
        margin: .5rem
</style>
