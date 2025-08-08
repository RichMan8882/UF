<script lang="ts" setup>
const { isLogin } = useAuthStore()
const props = defineProps({
  content: [Array]
})
const show = ref(true)

const togglePopup = () => {
  show.value = !show.value
}

// login
const { signin } = useAuthStore()
const fetchSigninApi = ref({
  account: 'qwe01',
  password: '0000'
})
const setLogin = async () => {
  const res = await signin(fetchSigninApi.value)
  console.log('login successful', res)
}
const clickNavigateTo = (value: any) => {
  show.value = false
  navigateTo(value)
}

const homeList = ref([
  {
    id: 1,
    link: 'https://xd-ae2.pages.dev',
    site: 'XD'
  },
  {
    id: 2,
    link: 'https://cc-dlw.pages.dev/',
    site: 'CC'
  },
  {
    id: 3,
    link: 'https://fp-dt0.pages.dev/',
    site: 'FP'
  },
  {
    id: 4,
    link: 'https://ab-8r0.pages.dev/',
    site: 'AB'
  },
  {
    id: 5,
    link: 'https://sh-ees.pages.dev/',
    site: 'SH'
  },
  {
    id: 6,
    link: 'https://fx-5et.pages.dev/',
    site: 'FX'
  },
  {
    id: 7,
    link: 'https://on-f52.pages.dev/',
    site: 'ON'
  },
  {
    id: 8,
    link: 'https://si-5ui.pages.dev/',
    site: 'SI'
  },
  {
    id: 9,
    link: 'https://ss-975.pages.dev/',
    site: 'SS'
  },
  {
    id: 10,
    link: 'https://ai-f8n.pages.dev/',
    site: 'AI'
  },
  {
    id: 11,
    link: 'https://bu-9vd.pages.dev/',
    site: 'BU'
  },
  {
    id: 12,
    link: 'https://zw-1wc.pages.dev/',
    site: 'ZW'
  },
  {
    id: 13,
    link: 'https://gf-6yh.pages.dev',
    site: 'GF'
  },
  {
    id: 14,
    link: 'https://gf-6yh.pages.dev',
    site: 'GF'
  },
  {
    id: 15,
    link: 'https://gf-6yh.pages.dev',
    site: 'GF'
  },
  {
    id: 16,
    link: 'https://lo-4sq.pages.dev/',
    site: 'LO'
  },
  {
    id: 17,
    link: 'https://rc-897.pages.dev',
    site: 'RC'
  },
  {
    id: 18,
    link: 'https://rc-897.pages.dev',
    site: 'RC'
  },
  {
    id: 19,
    link: 'https://fy-3ay.pages.dev',
    site: 'FY'
  }
])
const emit = defineEmits(['changeiframe'])
const changeiframe = (item: any) => {
  emit('changeiframe', item)
  show.value = false
}

await onMounted(async () => {
  if (!isLogin()) {
    await setLogin()
  }
})
</script>

<template>
  <div class="popupIcon">
    <div @click="togglePopup" class="icon">
      <i class="fa-solid fa-laptop-code"></i>
    </div>
    <div class="content" v-if="show">
      <!-- pageItem -->
      <div class="pageItem">
        <div class="title">H</div>
        <div class="pageSection">
          <div
            class="pageStyleItem"
            @click="changeiframe(item)"
            v-for="(item, index) in homeList"
            :key="index"
          >
            {{ item.id }}
          </div>
        </div>
      </div>
      <!-- pageItem -->
      <div class="pageItem">
        <div class="title">R</div>
        <div class="styleItem" @click="clickNavigateTo('/register/model1')">
          1
        </div>
        <div class="styleItem" @click="clickNavigateTo('/register/model2')">
          2
        </div>
        <div class="styleItem" @click="clickNavigateTo('/register/model3')">
          3
        </div>
        <div class="styleItem" @click="clickNavigateTo('/register/model4')">
          4
        </div>
        <div class="styleItem" @click="clickNavigateTo('/register/model5')">
          5
        </div>
        <div class="styleItem" @click="clickNavigateTo('/register/model6')">
          6
        </div>
      </div>
      <!-- pageItem -->
      <div class="pageItem">
        <div class="title">L</div>
        <div class="styleItem" @click="clickNavigateTo('/login/model1')">1</div>
        <div class="styleItem" @click="clickNavigateTo('/login/model2')">2</div>
        <div class="styleItem" @click="clickNavigateTo('/login/model3')">3</div>
        <div class="styleItem" @click="clickNavigateTo('/login/model4')">4</div>
        <div class="styleItem" @click="clickNavigateTo('/login/model5')">5</div>
      </div>
      <!-- pageItem -->
      <div class="pageItem">
        <div class="title">U</div>
        <div class="styleItem" @click="clickNavigateTo('/user/model1')">1</div>
        <div class="styleItem" @click="clickNavigateTo('/user/model2')">2</div>
        <div class="styleItem" @click="clickNavigateTo('/user/model3')">3</div>
        <div
          class="styleItem"
          @click="clickNavigateTo('/user/model4/dashboard')"
        >
          4
        </div>
        <div class="styleItem" @click="clickNavigateTo('/user/model5')">5</div>
      </div>
      <!-- pageItem -->
      <div class="pageItem">
        <div class="title">G</div>
        <div class="styleItem" @click="clickNavigateTo('/game/model1')">1</div>
        <div class="styleItem" @click="clickNavigateTo('/game/model2')">2</div>
        <div class="styleItem" @click="clickNavigateTo('/game/model3')">3</div>
        <div class="styleItem" @click="clickNavigateTo('/game/model4')">4</div>
        <div class="styleItem" @click="clickNavigateTo('/game/model5')">5</div>
        <div class="styleItem" @click="clickNavigateTo('/game/model6')">6</div>
        <div class="styleItem" @click="clickNavigateTo('/game/model7')">7</div>
        <div class="styleItem" @click="clickNavigateTo('/game/model8')">8</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.popupIcon
  position: fixed
  bottom: 20px
  right: 20px
  background-color: #fff
  height: 40px
  width: 40px
  border-radius: 50%
  font-size: 24px
  cursor: pointer
  z-index: 999
  .icon
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>

<style scoped lang="sass">
.content
  position: absolute
  height: 90dvh
  background-color: #fff
  width: 400px
  top: -90.5dvh
  right: 0
  padding: 20px
  overflow-y: auto
  border-radius: 10px
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)
  user-select: text
  -moz-user-select: text
  -webkit-user-select: text
  -ms-user-select: text
  @media screen and (max-width: 768px)
    width: 100dvw
    height: 90dvh
    right: -20px
</style>

<style scoped lang="sass">
.pageItem
  margin: 20px 0
  .title
    font-size: 20px
    margin: 0 0 10px 0
  .styleItem
    cursor: pointer
    font-size: 18px
    margin: 10px 0
    padding: 5px 10px
    background-color: #f1f1f1
    text-align: center
    border-radius: 5px
</style>

<style scoped lang="sass">
.pageSection
  max-height: 400px
  overflow-y: auto
  display: flex
  flex-wrap: wrap
  justify-content: flex-start
  width: 100%
  .pageStyleItem
    width: 20%
    cursor: pointer
    font-size: 18px
    margin: 10px 0
    padding: 5px 10px
    background-color: #f1f1f1
    text-align: center
    border-radius: 5px
    margin: 0 10px 10px 0
</style>
