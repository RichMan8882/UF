<script lang="ts" setup>
const store = useSiteStore()
const { queryNews } = store
const { locale } = useI18n()
const lang = locale.value
const siteStore = useSiteStore()
const activitiesPerPage = ref(5)
const currentPage = ref(1)
const router = useRouter()
await useAsyncData(async () => {
  const path = 'user'
  await queryNews(lang, path)
})
const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const totalPages = computed(() => {
  console.log(store.news.total)
  return Math.ceil(store.news.total / activitiesPerPage.value)
})
const displayedActivities = computed(() => {
  const start = (currentPage.value - 1) * activitiesPerPage.value
  return store.news.result.slice(start, start + activitiesPerPage.value)
})
</script>

<template>
  <div class="news">
    <div class="news-title">
      <span>{{ $lang('網站公告') }}</span>
    </div>

    <ul class="pagination">
      <li :class="{ disabled: currentPage === 1 }" @click="previousPage">
        <a>« {{ $lang('上一頁') }}</a>
      </li>
      <li :class="{ disabled: currentPage === totalPages }" @click="nextPage">
        <a>{{ $lang('下一頁') }} »</a>
      </li>
    </ul>
    <div class="card">
      <div v-for="item in displayedActivities" :key="item.title" class="Item">
        <div class="itemTitle" style="cursor: pointer">
          <div class="image"><img :src="item.image" /></div>
        </div>
        <div class="itemContent">
          {{ item.title }}
          <br />
          <div class="html" v-html="item.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/user/model3/coin2.scss'

.pagination
  display: flex
  align-items: center
  padding: 24px 0

  li
    padding: 0px
  a
    padding: 8px
    background-color: #fff
    margin: 0 4px
    cursor: pointer
    transition: all 300ms

    &:hover
      background-color: darken(#fff, 10)

.news
  padding: 20px

  @media screen and (max-width: 768px)
    padding: 10px

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


.card
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26)
  border-radius: .375rem
  background-color: #fff
  padding: 16px

  @media screen and (min-width: 768px)
    padding: 30px

  p
    padding: 15px
    font-size: 15px

    @media screen and (min-width: 768px)
      font-size: 16px
      padding: 0
</style>
