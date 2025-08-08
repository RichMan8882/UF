<script lang="ts" setup>
const siteStore = useSiteStore()
const { queryChatbox } = siteStore
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
      <div class="gw template">
        <div class="form-container small">
          <div class="form-title" @click="navigateTo('/')">
            <!-- {{ $lang('登入') }} {{ siteStore.siteData.title }} -->
            <img :src="siteStore.siteData.logo" alt="" />
          </div>
          <div class="login_form formBlock">
            <div class="form-bg">
              <div class="input-classic">
                <span class="input-title">{{ $lang('用戶帳號') }}</span>
                <input
                  v-model="fetchSigninApi.account"
                  v-trim-input
                  type="text"
                  name="acc"
                  required
                />
              </div>
              <div class="input-classic">
                <span class="input-title">{{ $lang('登入密碼') }}</span>
                <input
                  v-model="fetchSigninApi.password"
                  v-trim-input
                  type="password"
                  name="pwd"
                  required
                  @keyup.enter="setLogin"
                />
              </div>
              <div class="input-classic">
                <span class="input-title">{{ $lang('辨識碼') }}</span>
                <div class="form-flex">
                  <recaptcha @check-hepler="checkHepler"></recaptcha>
                  <input
                    v-model="recaptchaCode"
                    v-trim-input
                    type="text"
                    name="vcode"
                    required
                    @keyup.enter="setLogin"
                  />
                </div>
              </div>
              <div class="info-text span-$lang text-center">
                <span class="zh_TW"
                  >{{ $lang('本頁面受 reCAPTCHA 機制保護，並遵守 Google 的') }}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    >{{ $lang('隱私權政策') }}</a
                  >
                  {{ $lang('及') }}
                  <a href="https://policies.google.com/terms" target="_blank">{{
                    $lang('服務條款')
                  }}</a
                  >。</span
                >
              </div>
              <div class="button-row">
                <a class="btn-cancel" @click="navigateTo('/')">{{
                  $lang('取消')
                }}</a>
                <button
                  class="btn-submit submit"
                  type="button"
                  value=""
                  @click="setLogin"
                >
                  {{ $lang('登入') }}
                </button>
              </div>
            </div>
            <div class="form-sec-bg">
              <div class="info-text text-center span-$lang">
                <i class="fas fa-exclamation-circle"></i>
                <span class="zh_TW"
                  >{{ $lang('請將您用來登入') }}
                  {{ siteStore.siteData.title }}
                  {{
                    $lang(
                      '的手機設定兩步驟驗證，並保持清除瀏覽紀錄，這可以保護您的帳戶安全，使其不致於因為密碼外洩而遭盜用，即使密碼遭盜用，盜用者也無法成功登入您的帳戶。'
                    )
                  }}</span
                >
              </div>
            </div>
            <div class="link-text-block">
              <div class="span-$lang">
                <span class="zh_TW">{{ $lang('還沒有帳號嗎?') }}</span>
                <a
                  class="link-text"
                  style="cursor: pointer"
                  @click="navigateTo('/register')"
                  >{{ $lang('立即申辦') }}</a
                >
              </div>
              <div>
                <a class="link-text" :href="siteStore.chatbox" target="_blank"
                  >{{ $lang('忘記密碼') }}?</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/login/model2/coin2.scss'
.form-block
  min-height: 100dvh
.template
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  .form-title
    img
      width: 150px
      margin: 0 auto
      cursor: pointer
.text-center
  text-align: center
</style>
