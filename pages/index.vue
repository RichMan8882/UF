<script lang="ts" setup>
import fakeImage from '@/assets/image/index_ab/fakeImg.png'
// import { topSliderImages, bottomSliderImages } from '@/assets/index_ab.js'
const accessTokenCookiee = useCookie('accessToken', {
  expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000) // 1 week from now
})
const router = useRouter()
const { isLogin, signout } = useAuthStore()
const { t } = useI18n()

const isPopupSwitchChecked = ref()
const siteStore = useSiteStore()
const { queryChatbox } = siteStore
onMounted(() => {
  queryChatbox()
})
const pageRef = ref(null)
const handleScroll = (value) => {
  if (
    value == '/privacy' ||
    value == '/risk' ||
    value == '/vault' ||
    value == '/services' ||
    value == '/problem'
  ) {
    pageRef.value && pageRef.value.scrollIntoView()
  }
}
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
const switchClick = () => {
  const popupSwitch = document.getElementById('popupSwitch') as HTMLInputElement
  if (popupSwitch.checked) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const menuClick = (link: string) => {
  if (link.includes('http')) {
    window.open(link)
  } else if (link === 'openChatBox') {
    openChatBox()
  } else {
    navigateTo(link)
  }
}

const linkClick = (link: string) => {
  if (link.includes('http')) {
    window.open(link)
  } else if (link === 'openChatBox') {
    openChatBox()
  } else {
    navigateTo(link)
    handleScroll(link)
  }
}

const menuList = computed(() => {
  if (isLogin()) {
    return [
      {
        name: t('聯絡我方'),
        link: '/user/message'
      },
      {
        name: t('近期活動'),
        link: '/user/activity'
      },
      {
        name: t('貨幣合約'),
        link: '/game'
      },
      {
        name: t('資產提現'),
        link: '/user/withdraw'
      },
      {
        name: t('平台公告'),
        link: '/user/news'
      },
      {
        name: t('用戶協議'),
        link: '/vault'
      },
      {
        name: t('風險聲明'),
        link: '/risk'
      },
      {
        name: t('隱私權政策'),
        link: '/privacy'
      }
    ]
  } else {
    return [
      {
        name: t('聯絡我方'),
        link: '/user/message'
      },
      {
        name: t('近期活動'),
        link: '/user/activity'
      },
      {
        name: t('貨幣合約'),
        link: '/game'
      },
      {
        name: t('立即申辦'),
        link: '/register'
      },
      {
        name: t('用戶協議'),
        link: '/vault'
      },
      {
        name: t('風險聲明'),
        link: '/risk'
      },
      {
        name: t('隱私權政策'),
        link: '/privacy'
      }
    ]
  }
})

const languageList = ref([
  {
    name: '繁體中文',
    value: 'zh_TW'
  },
  // {
  //   name: '简体中文',
  //   value: 'zh_CN'
  // },
  {
    name: 'English',
    value: 'en_US'
  }
  // {
  //   name: '日本語',
  //   value: 'ja_JP'
  // }
])
const { locale } = useI18n()
const changeLang = (value) => {
  locale.value = value
}
const activityList = ref([
  {
    date: '2024年9月5日至6日',
    link: '/user/activity',
    image: fakeImage
  }
])

const footerList = ref([
  {
    title: t('關於我們'),
    items: [
      {
        name: t('用戶協議'),
        link: '/vault'
      },
      {
        name: t('常見問題'),
        link: '/problem'
      }
    ]
  },
  {
    title: t('最新消息'),
    items: [{ name: t('近期活動'), link: '/user/activity' }]
  },
  {
    title: t('支援中心'),
    items: [
      { name: t('隱私權政策'), link: '/privacy' },
      { name: t('風險聲明'), link: '/risk' }
    ]
  },
  {
    title: t('聯絡我方'),
    items: [{ name: t('聯絡我們'), link: '/user/message' }]
  }
])
</script>
<template>
  <div class="page">
    <div ref="pageRef" class="home">
      <div class="header">
        <input
          id="popupSwitch"
          v-model="isPopupSwitchChecked"
          type="checkbox"
          @change="switchClick()"
        />
        <div class="nav">
          <input id="languageSwitch" type="checkbox" />
          <div class="logo" @click="navigateTo('/')">
            <img :src="siteStore.siteData.logo" alt="" />
          </div>
          <div class="navbar">
            <div class="menu">
              <div
                v-for="(menuItems, index) in menuList"
                :key="index"
                class="menuItems"
                @click="menuClick(menuItems.link)"
              >
                {{ menuItems.name }}
              </div>
            </div>
            <div class="functionButton">
              <div class="btn-login" @click="navigateTo('/user')">
                {{ $lang('用戶中心') }}
              </div>
              <div
                v-if="!accessTokenCookiee"
                class="login"
                @click="navigateTo('/login')"
              >
                {{ $lang('登入') }}
              </div>
              <div v-else class="login" @click="signout">
                {{ $lang('登出') }}
              </div>
              <!--<div class="register" @click="navigateTo('/register')">註冊</div>-->
              <div class="language">
                <label for="languageSwitch" class="languageSwitch"
                  ><i class="fas fa-globe"></i
                ></label>
                <div class="languageMenu">
                  <label
                    v-for="(languageItems, index) in languageList"
                    :key="index"
                    for="languageSwitch"
                    class="items"
                    @click="changeLang(languageItems.value)"
                    >{{ languageItems.name }}</label
                  >
                </div>
              </div>
              <div class="mobileSwitch">
                <label for="popupSwitch">
                  <div v-if="!isPopupSwitchChecked" class="button">
                    <i class="fas fa-bars"></i>
                  </div>
                  <div v-if="isPopupSwitchChecked" class="button">
                    <i class="fas fa-times close-button"></i>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="popupMenu">
          <input id="mobileLanguageSwitch" type="checkbox" />
          <div class="menuList">
            <div class="menuItems">
              <label class="flexBox" for="mobileLanguageSwitch">
                {{ $lang('區域語言') }}
                <div class="icon"><i class="fa-solid fa-chevron-up"></i></div>
              </label>
              <div class="languageMenu">
                <label
                  v-for="(languageItems, index) in languageList"
                  :key="index"
                  for="mobileLanguageSwitch"
                  class="items"
                  @click="changeLang(languageItems.value)"
                  >{{ languageItems.name }}</label
                >
              </div>
            </div>
            <label
              v-for="(menuItems, index) in menuList"
              :key="index"
              for="popupSwitch"
              class="menuItems"
              @click="menuClick(menuItems.link)"
            >
              {{ menuItems.name }}
            </label>
          </div>
        </div>
      </div>
      <router-view />
      <div class="footer">
        <div class="containers">
          <div class="footerMenu">
            <div
              v-for="(footerItems, index) in footerList"
              :key="index"
              class="footerList"
            >
              <div class="title">{{ footerItems.title }}</div>
              <div
                v-for="(items, itemsIndex) in footerItems.items"
                :key="itemsIndex"
                class="items"
              >
                <div class="link" @click="linkClick(items.link)">
                  {{ items.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="text">
            <div class="textBox font16px">
              {{ $lang('線上文字客服：週一至週日') }}(10:00am ~ 22:00pm)
            </div>
            <div class="textBox">{{ siteStore.siteData.copyRight }}</div>
            <div class="textBox">
              {{ $lang(`建議使用`) }}Chrome 74.0.3729.169，Firefox
              67.0.1，Safari 5.1.10{{
                $lang(
                  `或相容瀏覽器並具有1024 x 768（或更高）解析度的螢幕，以獲得最佳瀏覽體驗。`
                )
              }}
            </div>
            <div class="textBox">
              {{
                $lang(
                  `免責聲明：此為高波動性投資產品！加密貨幣交易並非適合任何人！請確保您知道其中的風險。`
                )
              }}
              {{ siteStore.siteData.title
              }}{{
                $lang(
                  `不會對加密貨幣交易提供任何建議與意見，且非為金融顧問，其所提供的任何服務皆基於公司運作。`
                )
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.page
  width: 100dvw
  height: 100dvh
  overflow-y: auto
</style>

<style scoped lang="sass">
.home
  width: 100%
  position: relative
  box-sizing: border-box
  background-color: #0a0a0a
  overflow: hidden
  // background-color: rgb(13, 20, 24)

  .header
    width: 100%
    height: 80px
  .sliderContainer
    width: 100%
    box-sizing: border-box
    padding-top: 80px
    background-image: radial-gradient(circle at -3% -50%, rgba(255, 67, 62, 0.4) 26%, rgba(255, 255, 255, 0) 42%)

  .activity
    width: 100%
    box-sizing: border-box
  .digital
    max-width: 1200px
    width: 100%
    box-sizing: border-box
  .join
    width: 100%
    box-sizing: border-box
  .footer
    width: 100%
    box-sizing: border-box
</style>

<style scoped lang="sass">
.header
  width: 100%
  position: absolute
  top: 0
  z-index: 5
  opacity: 0.9
  // background-color: rgba(0, 30, 41, 0.7)
  input
    display: none
  .nav
    width: 100%
    height: 100%
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    padding: 0 24px
    input
      display: none
    .logo
      width: 60px
      height: auto
      cursor: pointer
      @media screen and (max-width: 900px)
        width: 80px
      img
        width: 100%
        height: auto
    .navbar
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      flex-wrap: nowrap
      padding-left: 12px
      @media screen and (max-width: 900px)
        justify-content: flex-end
      .menu
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        @media screen and (max-width: 900px)
          display: none
        .menuItems
          padding: 8px
          font-size: 14px
          font-weight: bold
          text-wrap: nowrap
          color: #fff
          border-bottom: 1px solid transparent
          cursor: pointer
          transition: 0.1s
          &:hover
            border-color: #f5821f
      .functionButton
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        .btn-login
          min-width: 100px
          padding: 5px 16px
          margin: .5em
          font-size: 14px
          letter-spacing: .15px
          white-space: normal
          transition: all .5s ease-in-out
          text-align: center
          font-weight: bold
          cursor: pointer
          max-width: 130px
          background-color: #262f37
          border: 1px solid #262f37
          color: #fff
          display: flex
          align-items: center
          justify-content: center
          flex-flow: row nowrap
          border-radius: 50px
        .login
          min-width: 60px
          margin: 7px
          padding: 3px 10px
          font-size: 16px
          font-weight: bold
          text-align: center
          color: #fff
          border: 1px solid #fff
          border-radius: 20px
          background-color: transparent
          background-image: linear-gradient(to right, #ff433e, #ef8534)
          border: none
          cursor: pointer
          transition: 0.3s
          &:hover
            background-color: rgba(115, 160, 179, 0.2)
        .register
          min-width: 60px
          margin: 7px
          padding: 3px 10px
          font-size: 16px
          font-weight: bold
          text-align: center
          color: #fff
          border: 1px solid #f5821f
          border-radius: 20px
          background-color: #f5821f
          cursor: pointer
          transition: 0.3s
          &:hover
            background-color: #d36e17
          @media screen and (max-width: 900px)
            display: none
        .language
          margin: 7px
          position: relative
          @media screen and (max-width: 900px)
            display: none
          .languageSwitch
            font-size: 16px
            color: #fff
            cursor: pointer
          .languageMenu
            min-width: 10rem
            display: none
            flex-direction: column
            justify-content: center
            align-items: center
            position: absolute
            top: 36px
            right: -4px
            background-color: #fff
            border: 1px solid #fff
            border-radius: 10px
            .items
              width: 100%
              padding: 5px
              font-size: 16px
              text-align: center
              color: #000
              cursor: pointer
              transition: 0.2s
              &:hover
                background-color: rgba(115, 160, 179, 0.2)
        .mobileSwitch
          display: none
          margin: 7px
          @media screen and (max-width: 900px)
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
          .button
            font-size: 32px
            color: #fff
            cursor: pointer
  .popupMenu
    width: 100%
    display: none
    position: fixed
    z-index: 55
    background-color: #091a1f
    input
      display: none
    .menuList
      width: 100%
      padding: 24px
      .menuItems
        width: 100%
        display: flex
        flex-direction: column
        justify-content: flex-start
        align-items: flex-start
        padding: 8px
        font-size: 20px
        font-weight: bold
        text-wrap: nowrap
        color: #fff
        cursor: pointer
        .flexBox
          width: 100%
          display: flex
          flex-direction: row
          justify-content: space-between
          align-items: center
          .icon
            font-size: 20px
            color: #fff
            cursor: pointer
            transition: 0.3s
            transform: rotate(180deg)
        .languageMenu
          width: 100%
          display: none
          flex-direction: column
          justify-content: flex-start
          align-items: flex-start
          margin: 8px
          .items
            width: 100%
            margin: 4px 0
            padding-left: 12px
            font-size: 16px
            font-weight: normal
            color: #fff
            cursor: pointer
            transition: 0.2s
            &:hover
              background-color: rgba(115, 160, 179, 0.2)
</style>

<style scoped lang="sass">
.mainSlider
  width: 100dvw
  min-height: 100dvh
  //background-image: url('@/assets/image/index_ab/mainSlider.jpg')
  .content
    width: 100%
    height: 100%
    display: flex
    justify-content: space-around
    align-items: center
    flex-wrap: wrap
    .title
      width: 100%
      padding: 50px 0
      font-size: 130px
      font-weight: bold
      color: transparent
      background: linear-gradient(90deg, #c97e64, #d8a679 11.46%, #97d9d7 33.33%, #e99e52)
      -webkit-background-clip: text
      background-clip: text
      border-bottom: 0.2px solid #82959b
      text-align: center
      @media screen and (max-width: 768px)
        font-size: 40px
    .left
      position: relative
      width: 50%
      text-align: center
      min-height: 50dvh
      @media screen and (max-width: 768px)
        width: 100%
      img
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        width: 60%
    .right
      width: 50%
      text-align: center
      @media screen and (max-width: 768px)
        width: 100%
</style>

<style scoped lang="sass">
#languageSwitch:checked ~ .navbar .functionButton .language .languageMenu,
#mobileLanguageSwitch:checked ~ .menuList .menuItems .languageMenu,
#popupSwitch:checked ~ .popupMenu
  display: flex
#mobileLanguageSwitch:checked ~ .menuList .menuItems .flexBox .icon
  transform: rotate(360deg)
</style>

<style scoped lang="sass">
.sliderContainer
  width: 100%
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: flex-start
  padding: 80px 0
  .text
    max-width: 1200px
    width: 100%
    margin: 0 auto
    margin-bottom: 40px
    padding: 0 96px
    @media screen and (max-width: 768px)
      padding: 0 24px
      margin-bottom: 20px
    .subTitle
      width: 100%
      margin: 16px 0
      font-size: 18px
      color: #82959b
      line-height: 26px
      letter-spacing: .15em
      @media screen and (max-width: 768px)
        font-size: 16px
    .title
      width: 100%
      margin: 40px 0
      font-size: 52px
      font-weight: bold
      color: transparent
      background: linear-gradient(90deg,#c97e64,#d8a679 11.46%,#97d9d7 33.33%,#e99e52)
      -webkit-background-clip: text
      background-clip: text
      @media screen and (max-width: 768px)
        margin: 20px 0
        font-size: 32px
      .colorText
        color: #fff
  .sliderBox
    width: 100%
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    .slider
      width: 100%
      height: 240px
      position: relative
      overflow: hidden
      &:before,, &:after
        content: ""
        width: 400px
        height: 240px
        position: absolute
        z-index: 2
      &:before
        top: 0
        left: 0
      &:after
        top: 0
        right: 0
      .slideTrack
        width: calc(400px * 24)
        display: flex
        animation: scroll 80s linear infinite
        @keyframes scroll
          0%
            transform: translateX(0)
          100%
            transform: translateX(calc(-400px * 12))
        .slide
          width: 400px
          height: 240px
          img
            width: 400px
            height: 240px
            padding: 12px
            border: 1px solid #82959b
      .reverse
        animation: scrollReverse 80s linear infinite
        @keyframes scrollReverse
          0%
            transform: translateX(calc(-400px * 12))
          100%
            transform: translateX(0)
</style>

<style scoped lang="sass">
.activity
  width: 100%
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  margin: 80px 0
  .title
    width: 100%
    font-size: 28px
    text-align: center
    color: #82959b
    line-height: 26px
    letter-spacing: .15em
    @media screen and (max-width: 768px)
      font-size: 16px
  .card
    max-width: 1200px
    width: 100%
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: stretch
    margin: 40px auto
    padding: 0 96px
    @media screen and (max-width: 768px)
      flex-direction: column-reverse
      margin: 20px auto
      padding: 0 24px
    .info
      width: 50%
      display: flex
      flex-direction: column
      justify-content: flex-start
      align-items: flex-start
      @media screen and (max-width: 768px)
        width: 100%
      .date
        width: 100%
        font-size: 24px
        color: #82959b
        line-height: 26px
        letter-spacing: .15em
        @media screen and (max-width: 768px)
          font-size: 18px
          margin: 20px 0
      .button
        margin-top: auto
        padding: 12px 32px
        font-size: 18px
        color: #000
        background-color: #fff
        line-height: 26px
        cursor: pointer
        box-shadow: 4px 4px 0 -1px #051419, 4px 4px 0 0 #82959b
        transition: 0.3s
        &:hover
          background-color: #5bfffc
    .image
      width: 50%
      @media screen and (max-width: 768px)
        width: 100%
      img
        width: 100%
        height: auto
</style>

<style scoped lang="sass">
.digital
  width: 100%
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  flex-wrap: wrap
  margin: 80px auto
  @media screen and (max-width: 768px)
    flex-direction: column
    margin: 40px auto
  .items
    width: 50%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    margin: 20px 0
    @media screen and (max-width: 768px)
      width: 100%
      align-items: flex-start
      padding: 0 24px
      margin: 12px 0
    .bigText
      margin: 24px 0
      font-size: 100px
      font-weight: bold
      color: transparent
      background: linear-gradient(90deg, #c97e64, #d8a679 11.46%, #97d9d7 33.33%, #e99e52)
      -webkit-background-clip: text
      @media screen and (max-width: 768px)
        font-size: 64px
        margin: 16px 0
    .remark
      margin: 16px 0
      font-size: 18px
      color: #82959b
      line-height: 26px
      @media screen and (max-width: 768px)
        margin: 0
</style>

<style scoped lang="sass">
.join
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 40px 0
  background-color: #d0e0e4
  .text
    width: 100%
    margin-bottom: 32px
    font-size: 32px
    font-weight: 500
    text-align: center
    @media screen and (max-width: 768px)
      font-size: 24px
  .button
    width: 216px
    display: block
    margin: 0 auto
    padding: 15px 45px
    color: #fff
    text-align: center
    font-weight: bold
    background: #bf7676
    border-radius: 4px
    border: 2px solid #bf7676
    cursor: pointer
    transition: all ease .3s
    &:hover
      background-color: #cf9999
      border-color: #cf9999
</style>

<style scoped lang="sass">
.footer
  width: 100%
  padding: 0 40px
  background-color: #0d1418
  @media screen and (max-width: 768px)
    padding: 0 24px
  .containers
    max-width: 1200px
    width: 100%
    margin: 0 auto
    .footerMenu
      width: 100%
      display: flex
      flex-direction: row
      justify-content: center
      align-items: flex-start
      flex-wrap: wrap
      padding: 40px 0
      @media screen and (max-width: 768px)
        padding: 20px 0
      .footerList
        width: 12%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        @media screen and (max-width: 768px)
          width: 50%
          margin: 20px 0
          align-items: flex-start
        .title
          margin-bottom: 12px
          font-size: 18px
          font-weight: bold
          color: #fff
        .items
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          @media screen and (max-width: 768px)
          align-items: flex-start
          .link
            margin: 8px 0
            font-size: 16px
            font-weight: 300
            color: #fff
            cursor: pointer
    .text
      width: 100%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      padding-bottom: 40px
      @media screen and (max-width: 768px)
        align-items: flex-start
      .textBox
        margin: 4px 0
        font-size: 12px
        font-weight: bolder
        color: #fff
      .font16px
        font-size: 16px !important
</style>
