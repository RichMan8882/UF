<script lang="ts" setup>
const siteStore = useSiteStore()
const { queryChatbox } = siteStore
const { t } = useI18n()
const { signin } = useAuthStore()
const passwordEyes = ref(false)
const recaptchaCode = ref('')
const recaptchaCheckFunction = ref(null)

const fetchSigninApi = ref({
  account: '',
  password: ''
})
const showPassword = (type: boolean) => {
  passwordEyes.value = type
}

const setLogin = async () => {
  if (!fetchSigninApi.value.account) {
    ElMessage({
      message: t('請輸入帳號'),
      type: 'error'
    })
    return
  }
  if (!fetchSigninApi.value.password) {
    ElMessage({
      message: t('請輸入密碼'),
      type: 'error'
    })
    return
  }
  const recaptchaCheck = await recaptchaCheckFunction.value.validate(
    recaptchaCode.value
  )
  if (!recaptchaCheck) {
    ElMessage({
      message: t('驗證碼錯誤'),
      type: 'error'
    })
  } else {
    const res = await signin(fetchSigninApi.value)
    if (res.success) {
      navigateTo('/')
    }
  }
}
const checkHepler = async (data) => {
  recaptchaCheckFunction.value = data
}
await useAsyncData(async () => {
  if (!router.currentRoute.value.name.inCludes('model')) {
    if (isLogin()) {
      navigateTo('/')
    }
  }
})
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
</script>
<template>
  <div>
    <div class="form-block page">
      <video
        class="login-video"
        src="https://telegra.ph/file/41782785ac0d23abf1b01.mp4"
        autoplay
        muted
        playsinline
        loop
      />
      <div class="gw template">
        <div class="form-container small">
          <div class="form-title">
            {{ $lang('登入') }}
          </div>
          <div class="login_form formBlock">
            <div class="form-bg">
              <div class="input-classic">
                <input
                  v-model="fetchSigninApi.account"
                  v-trim-input
                  type="text"
                  name="acc"
                  required
                />
                <span
                  class="input-title"
                  :class="{
                    active: fetchSigninApi.account
                  }"
                  >{{ $lang('帳號') }}</span
                >
              </div>
              <div class="input-classic">
                <input
                  v-model="fetchSigninApi.password"
                  v-trim-input
                  type="password"
                  name="pwd"
                  required
                  @keyup.enter="setLogin"
                />
                <span
                  class="input-title"
                  :class="{
                    active: fetchSigninApi.password
                  }"
                  >{{ $lang('密碼') }}</span
                >
              </div>
              <div class="input-classic">
                <div class="form-flex">
                  <input
                    v-model="recaptchaCode"
                    v-trim-input
                    type="text"
                    name="vcode"
                    required
                    @keyup.enter="setLogin"
                  />
                  <span
                    class="input-title"
                    :class="{
                      active: recaptchaCode
                    }"
                    >{{ $lang('驗證碼') }}</span
                  >
                  <recaptcha @check-hepler="checkHepler"></recaptcha>
                </div>
              </div>
              <div class="button-row">
                <button
                  class="btn-submit submit"
                  type="button"
                  value=""
                  @click="setLogin"
                >
                  {{ $lang('登入') }}
                </button>
              </div>
              <div class="button-container">
                <button
                  class="btn-register"
                  type="button"
                  @click="navigateTo('/register')"
                >
                  {{ $lang('註冊') }}
                </button>
                <button class="btn-forgot" type="button">
                  {{ $lang('忘記密碼?') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
html,
body,
body *
  font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", "Microsoft Jheng Hei", "PingFang", "蘋方", "微軟正黑體", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important

.only-pc
  display: none

@media screen and (min-width: 768px)
  .only-mobile
    display: none !important

  .only-pc
    display: flex
</style>

<style scoped lang="sass">
@import '@/assets/sass/login/model3/coin2.scss'
.form-block
  position: relative
  min-height: 100dvh
  background-color: #fff
.template
  position: absolute
  top: 30%
  left: 50%
  transform: translate(-50%, -50%)
  max-width: 1000px
  padding: 0 20px

  .form-container
    background-color: #f4f4f7
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px
    padding: 24px
    min-height: auto

  .form-title
    padding: 12px 15px
    font-size: 18px
    margin-bottom: .25rem
    z-index: 2
    margin-top: 0
    color: #fff
    font-weight: bold
    background-color: #303031 !important
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26)
    border-radius: .375rem
    background-color: #fff
    text-align: left

  .form-bg
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26)
    border-radius: .375rem
    background-color: #fff
    padding: 5px 10px
    overflow: hidden
    position: relative
    display: flex
    flex-direction: column
    min-width: 0
    word-wrap: break-word
    background-color: #fff
    background-clip: border-box
    border: 1px solid rgba(0, 0, 0, 0.125)
    border-radius: .375rem
    margin-top: 5px
    margin-bottom: 3px

  .btn-submit
    width: 100%
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)
    background-color: #08aa54
    color: rgba(255, 255, 255, 0.84)
    padding: 12px 30px
    border-radius: 2px
    font-size: 14px
    font-weight: 500
    outline: 0
    border: 0

  .button-container
    display: flex
    justify-content: space-between
    gap: 10px
    padding: 10px 0

  .btn-register
    flex: 1
    padding: 12px 30px
    border-radius: 2px
    font-size: 14px
    font-weight: 500
    outline: 0
    border: 0
    cursor: pointer
    display: inline-block
    border-radius: 4px
    letter-spacing: .5px
    text-align: center
    border-style: none
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 3px 1px -2px rgba(0, 0, 0, .12)
    outline: none
    text-shadow: 0 0 10px rgba(0, 0, 0, .5)
    padding: 6px 16px
    font-size: .95rem
    background-color: #6c757d
    font-weight: bold
    color: #fff

  .btn-forgot
    flex: 1
    cursor: pointer
    border-radius: 4px
    letter-spacing: .5px
    text-align: center
    border-style: none
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 3px 1px -2px rgba(0, 0, 0, .12)
    outline: none
    text-shadow: 0 0 10px rgba(0, 0, 0, .5)
    padding: 12px 30px
    font-size: .95rem
    background-color: #414141
    font-weight: bold
    color: #fff

  .input-classic
    .input-title
      position: absolute
      left: 0
      top: 50%
      transform: translateY(-50%)
      font-size: 15px
      letter-spacing: .5px
      padding-left: 10px
      font-weight: 400
      color: #252525
      pointer-events: none
      transition: all .3s

      &.active
        padding-left: 5px
        margin-top: -15px
        font-size: 12px

    input
      background-color: rgba(48, 48, 49, .1)
      border: none
      padding: 20px 10px 5px
      border-radius: 4px
      outline: none
      color: #252525
      width: 100%
      margin-left: 0 !important

      &:focus
        ~ .input-title
          padding-left: 5px
          margin-top: -15px
          font-size: 12px

    .form-flex
      align-items: stretch

.text-center
  text-align: center
</style>

<style scoped lang="sass">
@media screen and (min-width: 768px)
  .template
    top: 40%

    .form-container
      background-color: #f4f4f7
      box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px
      padding: 30px
      max-width: 53.33333%
      width: 53.33333%
      min-height: auto

    .form-title
      padding: 22px 26px
      margin-bottom: 30px
      font-size: 20px

    .form-bg
      padding: 30px
      border-radius: .25rem
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
