<script lang="ts" setup>
const store = useSiteStore()
const { queryCampaign } = store
const { locale } = useI18n()
const lang = locale.value
const siteStore = useSiteStore()
const activitiesPerPage = ref(5)
const currentPage = ref(1)
const router = useRouter()
await useAsyncData(async () => {
  await queryCampaign(lang)
})
const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const totalPages = computed(() => {
  return Math.ceil(store.campaign.total / activitiesPerPage.value)
})
const displayedActivities = computed(() => {
  const start = (currentPage.value - 1) * activitiesPerPage.value
  return store.campaign.result.slice(start, start + activitiesPerPage.value)
})
</script>

<template>
  <div class="pages">
    <div class="activity-title">
      <i class="fas fa-gift"></i>
      <span>{{ $lang('優惠活動') }}</span>
    </div>

    <ul class="pagination">
      <li :class="{ disabled: currentPage === 1 }" @click="previousPage">
        <a>« {{ $lang('上一頁') }}</a>
      </li>
      <li :class="{ disabled: currentPage === totalPages }" @click="nextPage">
        <a>{{ $lang('下一頁') }} »</a>
      </li>
    </ul>

    <div class="post">
      <div v-for="item in displayedActivities" :key="item.title" class="Item">
        <input :id="item.title" type="checkbox" />
        <label :for="item.title">
          <div class="itemTitle" style="cursor: pointer">
            <div class="image"><img :src="item.image" /></div>
          </div>
          <div class="itemContent">
            {{ item.title }}
            <br />
            <div class="html" v-html="item.content"></div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/user/model3/coin2.scss'

.pages
  padding: 20px
  @media screen and (max-width: 768px)
    padding: 10px

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
</style>

<style scoped lang="sass">
.activity-title
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
.post
  margin: 10px 0
  .Item
    position: relative
    background-color: #fff
    margin: 10px 0
    width: 100%
    .itemContent
      display: none
      padding: 10px 5px 20px 5px
    input[type="checkbox"]
      display: none
    label
      width: 100%
    input[type="checkbox"]:checked ~ label .itemContent
      display: block
    .itemTitle
      width: 100%
      .image
        width: 100%
        img
          width: 100%
          max-height: 400px
          object-fit: cover
          border-radius: 5px
          margin: 0 0 10px 0
</style>
