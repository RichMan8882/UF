<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const referrerCodeCookiee = useCookie('referrerCode') as any
const siteStore = useSiteStore()
const signupData = ref({
  account: '',
  password: '',
  transactionPassword: '',
  username: '',
  referrerCode: '',
  countryCode: siteStore.siteData.localsOptions[0],
  mobile: '',
  socialPlatform: siteStore.siteData.socialOptions[0],
  socialId: '',
  additionalInfo: {}
})
const additionalInfo1Value = ref('Line')
const showReferrerInput = ref(false)
const verifyPassword = ref('')
const verifyTransactionPassword = ref('')
const isChecked = ref(true)
const recaptchaCode = ref('')
const recaptchaCheckFunction = ref(null)
const passwordEyes = ref(false)
const tPasswordEyes = ref(false)
const { signup } = useAuthStore()
const validationStatus = reactive({
  accountValid: false,
  passwordValid: false,
  passwordSame: true,
  transactionPasswordValid: false,
  transactionPasswordSameWithPassword: false,
  transactionPasswordSame: true,
  phoneValid: false
})
const passwordSameRef = ref(null)
const transactionPasswordRef = ref(null)
const transactionPasswordSameRef = ref(null)
const usernameRef = ref(null)
const mobileRef = ref(null)
const socialIdRef = ref(null)
const isFormValid = computed(() => {
  console.log('passwordSameRef.value', passwordSameRef.value)
  console.log(
    'transactionPasswordSameRef.value',
    transactionPasswordSameRef.value
  )

  // 如果有額外欄位資訊，則需要添加額外驗證
  let isValid = validationStatus.accountValid && validationStatus.passwordValid

  if (passwordSameRef.value !== null) {
    isValid = isValid && validationStatus.passwordSame
  }

  if (transactionPasswordRef.value !== null) {
    isValid =
      isValid &&
      validationStatus.transactionPasswordValid &&
      !validationStatus.transactionPasswordSameWithPassword
  }
  if (transactionPasswordSameRef.value !== null) {
    isValid =
      isValid &&
      validationStatus.transactionPasswordSame &&
      !validationStatus.transactionPasswordSameWithPassword
  }
  if (usernameRef.value !== null) {
    isValid = isValid && signupData.value.username
  }
  if (mobileRef.value !== null) {
    isValid = isValid && signupData.value.mobile
  }
  if (signupData.value.mobile) {
    isValid = isValid && validationStatus.phoneValid
  }
  if (socialIdRef.value !== null) {
    isValid = isValid && signupData.value.socialId
  }

  console.log('isFormValid:', isValid) // 添加日志
  return isValid
})

const validateAccount = () => {
  const regex = /^[a-zA-Z0-9]{4,20}$/
  validationStatus.accountValid = regex.test(signupData.value.account)
  checkTransactionPasswordSameWithPassword()
}

const checkPasswordRequired = () => {
  // const passwordRegex = /^.{3,}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/
  validationStatus.passwordValid =
    passwordRegex.test(signupData.value.password) &&
    signupData.value.password !== signupData.value.account
  if (verifyPassword.value) {
    checkPasswordSame()
  }
  if (signupData.value.transactionPassword) {
    checkTransactionPasswordSameWithPassword()
  }
}

const checkPasswordSame = () => {
  validationStatus.passwordSame =
    signupData.value.password === verifyPassword.value
}

const checkTransactionPasswordRequired = () => {
  // const passwordRegex = /^.{3,}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/
  validationStatus.transactionPasswordValid = passwordRegex.test(
    signupData.value.transactionPassword
  )
  checkTransactionPasswordSameWithPassword()
  if (verifyTransactionPassword.value) {
    checkTransactionPasswordSame()
  }
}

const checkTransactionPasswordSameWithPassword = () => {
  validationStatus.transactionPasswordSameWithPassword =
    signupData.value.transactionPassword === signupData.value.password ||
    signupData.value.transactionPassword === signupData.value.account
}

const checkTransactionPasswordSame = () => {
  validationStatus.transactionPasswordSame =
    signupData.value.transactionPassword === verifyTransactionPassword.value
}

const showPhoneValid = computed(() => {
  if (signupData.value.countryCode == '+886') {
    return true
  } else {
    return false
  }
})

const checkPhoneValid = () => {
  const regex = /^09\d{8}$/
  if (signupData.value.countryCode == '+886') {
    validationStatus.phoneValid = regex.test(signupData.value.mobile)
  } else {
    validationStatus.phoneValid = !!signupData.value.mobile
  }
}

const checkHepler = async (data) => {
  recaptchaCheckFunction.value = data
}
// methods
const showPassword = (type: boolean) => {
  passwordEyes.value = type
}
const showTranscationPassword = (type: boolean) => {
  tPasswordEyes.value = type
}

const handleRegisterClick = () => {
  console.log('Button clicked, isFormValid:', isFormValid.value)
  if (isFormValid.value) {
    goRegister()
  }
}

const goRegister = async () => {
  console.log('goRegister')
  if (!isChecked.value) {
    ElNotification({
      title: `${t('請勾選同意條款')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  const recaptchaCheck = await recaptchaCheckFunction.value.validate(
    recaptchaCode.value
  )
  if (!recaptchaCheck) {
    ElMessage({
      message: `${t('驗證碼錯誤')}`,
      type: 'error',
      showClose: false
    })
  } else {
    const signupRes = await signup(signupData.value)
    console.log('signupRes', signupRes)
    if (signupRes.success) {
      referrerCodeCookiee.value = ''
      navigateTo('/')
    }
  }
}

const { isLogin } = useAuthStore()
await useAsyncData(async () => {
  if (!router.currentRoute.value.name.includes('model')) {
    if (isLogin()) {
      navigateTo('/')
    }
  }
  if (router.currentRoute.value.query.referrer) {
    signupData.value.referrerCode = router.currentRoute.value.query.referrer
  } else if (referrerCodeCookiee.value) {
    signupData.value.referrerCode = referrerCodeCookiee.value
  }
})

await onMounted(() => {
  showReferrerInput.value = !!(
    router.currentRoute.value.query.referrer || referrerCodeCookiee.value
  )
})
</script>

<template>
  <div class="page">
    <div class="backgroundSection">
      <!-- <video
        autoplay="autoplay"
        muted="muted"
        playsinline=""
        loop="loop"
        src="@/assets/image/bg-img2.mp4"
        class="backgroundVideo"
      ></video> -->
    </div>
    <div class="pageContent">
      <div class="title">
        <div>{{ $lang('註冊') }}</div>
      </div>
      <div class="formSection">
        <div class="content">
          <div
            v-if="showReferrerInput || siteStore.siteData.referrerCodeRequired"
            class="form_input"
          >
            <div class="inputTitle">
              {{ $lang('推薦碼') }}
            </div>
            <div class="inputIten">
              <input
                v-model="signupData.referrerCode"
                v-trim-input
                type="text"
                class="input_style"
                :readonly="router.currentRoute.value.query.referrer"
              />
            </div>
          </div>
          <div class="form_input">
            <div class="inputTitle">
              {{ $lang('帳號') }}
            </div>
            <div class="inputIten">
              <input
                v-model="signupData.account"
                v-trim-input
                type="text"
                class="input_style"
                @input="validateAccount"
                @copy.prevent
                @paste.prevent
                @contextmenu.prevent
              />
            </div>
            <div class="tipsLeft"></div>
            <div class="tipsRight">
              <div
                :class="
                  validationStatus.accountValid
                    ? 'valid-feedback'
                    : 'invalid-feedback'
                "
              >
                <span v-if="validationStatus.accountValid">
                  <i class="fas fa-check"></i>
                </span>
                {{ $lang('需使用4-20位英文或數字') }}
              </div>
            </div>
          </div>
          <div class="form_input">
            <div class="inputTitle">
              {{ $lang('登入密碼') }}
            </div>
            <div class="inputIten padding_Right_more">
              <input
                v-model="signupData.password"
                v-trim-input
                :type="passwordEyes ? 'text' : 'password'"
                class="input_style"
                @input="checkPasswordRequired"
                @copy.prevent
                @paste.prevent
                @contextmenu.prevent
              />
              <div
                v-if="!passwordEyes"
                class="eyes"
                @click="showPassword(true)"
              >
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="showPassword(false)">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
            <div class="tipsLeft"></div>
            <div class="tipsRight">
              <div
                :class="
                  validationStatus.passwordValid
                    ? 'valid-feedback'
                    : 'invalid-feedback'
                "
              >
                <span v-if="validationStatus.passwordValid">
                  <i class="fas fa-check"></i>
                </span>
                {{ $lang('需混合使用 3 個字元以上的大小寫英文或數字') }}
                <!-- {{ $lang('需混合使用 3 個字元以上的英文或數字。') }} -->
              </div>
              <div
                v-if="signupData.password"
                :class="
                  signupData.password !== signupData.account
                    ? 'valid-feedback'
                    : 'invalid-feedback'
                "
              >
                <span v-if="signupData.password !== signupData.account">
                  <i class="fas fa-check"></i>
                </span>
                {{ $lang('登入密碼不可與帳號相同') }}
              </div>
            </div>
          </div>
          <div class="form_input">
            <div class="inputTitle">
              {{ $lang('確認登入密碼') }}
            </div>
            <div class="inputIten padding_Right_more">
              <input
                ref="passwordSameRef"
                v-model="verifyPassword"
                v-trim-input
                :type="passwordEyes ? 'text' : 'password'"
                class="input_style"
                @input="checkPasswordSame"
                @copy.prevent
                @paste.prevent
                @contextmenu.prevent
              />
              <div
                v-if="!passwordEyes"
                class="eyes"
                @click="showPassword(true)"
              >
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="showPassword(false)">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
            <div class="tipsLeft"></div>
            <div class="tipsRight">
              <div v-if="verifyPassword">
                <div
                  v-if="validationStatus.passwordSame"
                  class="valid-feedback"
                >
                  <i class="fas fa-check"></i> {{ $lang('確認相同') }}
                </div>
                <div v-else class="invalid-feedback">
                  <i class="fas fa-times"></i>
                  {{ $lang('與登入密碼不相同') }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="siteStore.siteData.transactionPasswordRequired"
            class="form_input"
          >
            <div class="inputTitle">
              {{ $lang('交易密碼') }}
            </div>
            <div class="inputIten padding_Right_more">
              <input
                ref="transactionPasswordRef"
                v-model="signupData.transactionPassword"
                v-trim-input
                :type="tPasswordEyes ? 'text' : 'password'"
                class="input_style"
                @input="checkTransactionPasswordRequired"
                @copy.prevent
                @paste.prevent
                @contextmenu.prevent
              />
              <div
                v-if="!tPasswordEyes"
                class="eyes"
                @click="showTranscationPassword(true)"
              >
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="showTranscationPassword(false)">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
            <div class="tipsLeft"></div>
            <div class="tipsRight">
              <div
                :class="
                  validationStatus.transactionPasswordValid
                    ? 'valid-feedback'
                    : 'invalid-feedback'
                "
              >
                <span v-if="validationStatus.transactionPasswordValid">
                  <i class="fas fa-check"></i>
                </span>
                {{ $lang('需混合使用 3 個字元以上的大小寫英文或數字') }}
                <!-- {{ $lang('需混合使用 3 個字元以上的英文或數字。') }} -->
              </div>
              <div
                v-if="signupData.transactionPassword"
                :class="
                  !validationStatus.transactionPasswordSameWithPassword
                    ? 'valid-feedback'
                    : 'invalid-feedback'
                "
              >
                <span
                  v-if="!validationStatus.transactionPasswordSameWithPassword"
                >
                  <i class="fas fa-check"></i>
                </span>
                {{ $lang('交易密碼不可與登入密碼,帳號相同') }}
              </div>
            </div>
          </div>
          <div
            v-if="siteStore.siteData.transactionPasswordRequired"
            class="form_input"
          >
            <div class="inputTitle">
              {{ $lang('確認交易密碼') }}
            </div>
            <div class="inputIten padding_Right_more">
              <input
                ref="transactionPasswordSameRef"
                v-model="verifyTransactionPassword"
                v-trim-input
                :type="tPasswordEyes ? 'text' : 'password'"
                class="input_style"
                @input="checkTransactionPasswordSame"
                @copy.prevent
                @paste.prevent
                @contextmenu.prevent
              />
              <div
                v-if="!tPasswordEyes"
                class="eyes"
                @click="showTranscationPassword(true)"
              >
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="showTranscationPassword(false)">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
            <div class="tipsLeft"></div>
            <div class="tipsRight">
              <div v-if="verifyTransactionPassword">
                <div
                  v-if="validationStatus.transactionPasswordSame"
                  class="valid-feedback"
                >
                  <i class="fas fa-check"></i> {{ $lang('確認相同') }}
                </div>
                <div v-else class="invalid-feedback">
                  <i class="fas fa-times"></i>
                  {{ $lang('與交易密碼不相同') }}
                </div>
              </div>
            </div>
          </div>
          <div class="form_input">
            <div class="inputTitle">
              {{ $lang('姓名') }}
            </div>
            <div class="inputIten">
              <input
                v-model="signupData.username"
                v-trim-input
                type="text"
                class="input_style"
              />
            </div>
            <div class="tipsLeft"></div>
            <div class="tipsRight">
              <div
                ref="usernameRef"
                :class="
                  signupData.username ? 'valid-feedback' : 'invalid-feedback'
                "
              >
                <span v-if="signupData.username">
                  <i class="fas fa-check"></i>
                </span>
                {{ $lang('必填') }}
              </div>
            </div>
          </div>
          <div class="form_input">
            <div class="inputTitle">
              {{ $lang('手機號碼') }}
            </div>
            <div class="inputIten">
              <select
                v-model="signupData.countryCode"
                name="phoneCode"
                @change="checkPhoneValid"
              >
                <option
                  v-for="item in siteStore.siteData.localsOptions"
                  :key="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="form_input">
            <div class="inputTitle empty"></div>
            <div class="inputIten">
              <input
                v-model="signupData.mobile"
                v-trim-input
                type="text"
                class="input_style"
                @input="checkPhoneValid"
              />
            </div>
            <div class="tipsLeft"></div>
            <div class="tipsRight">
              <div
                v-if="showPhoneValid"
                :class="
                  validationStatus.phoneValid
                    ? 'valid-feedback'
                    : 'invalid-feedback'
                "
              >
                <span v-if="validationStatus.phoneValid">
                  <i class="fas fa-check"></i>
                </span>
                {{ $lang('手機號碼開頭須為09，共10碼') }}
              </div>
              <!-- <div
                :class="
                  signupData.mobile ? 'valid-feedback' : 'invalid-feedback'
                "
                ref="mobileRef"
              >
                <span v-if="signupData.mobile">
                  <i class="fas fa-check"></i>
                </span>
                {{ $lang('必填') }}
              </div> -->
            </div>
          </div>
          <div class="form_input">
            <div class="inputTitle">
              {{ $lang('聯絡方式') }}
            </div>
            <div class="inputIten">
              <select v-model="signupData.socialPlatform" name="phoneCode">
                <option
                  v-for="item in siteStore.siteData.socialOptions"
                  :key="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="form_input">
            <div class="inputTitle empty"></div>
            <div class="inputIten">
              <input
                v-model="signupData.socialId"
                v-trim-input
                type="text"
                class="input_style"
              />
            </div>
            <div class="tipsLeft"></div>
            <div class="tipsRight">
              <div
                ref="socialIdRef"
                :class="
                  signupData.socialId ? 'valid-feedback' : 'invalid-feedback'
                "
              >
                <span v-if="signupData.socialId">
                  <i class="fas fa-check"></i>
                </span>
                {{ $lang('必填') }}
              </div>
            </div>
          </div>
          <div class="form_input">
            <div class="inputTitle">
              {{ $lang('驗證碼') }}
            </div>
            <div class="inputIten flexStyle">
              <recaptcha @check-hepler="checkHepler"></recaptcha>
              <input
                v-model="recaptchaCode"
                v-trim-input
                type="text"
                :placeholder="t('驗證碼')"
                class="input_style"
              />
            </div>
          </div>
          <div class="form_input">
            <div class="inputCheck">
              <input v-model="isChecked" class="submit-check" type="checkbox" />
            </div>
            <div class="text">
              {{
                $lang(
                  '我已年滿 18 歲，並已閱讀、接受並同意條款和條件、規則、隱私政策、Cookie 政策以及與年齡驗證相關的政策條款和條件'
                )
              }}
            </div>
          </div>
          <div class="actionSection">
            <div class="buttonWhite" @click="navigateTo('/login')">
              {{ $lang('取消註冊') }}
            </div>
            <div
              class="buttonFill"
              :class="{ disabled: !isFormValid }"
              @click="handleRegisterClick"
            >
              {{ $lang('立即創建') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.page
  position: relative
  width: 100vw
  height: 100vh
  background-color: #08001a
</style>

<style scoped lang="sass">
.backgroundSection
  position: relative
  .backgroundVideo
    width: 100vw
    height: 100vh
    object-fit: cover
</style>

<style scoped lang="sass">
.pageContent
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  max-width: 900px
  width: 100%
  padding: 30px
  background-color: #d1d1d1
  border-radius: 10px
  max-height: 70vh
  overflow: hidden
  @media screen and (max-width: 768px)
    width: 95vw
    padding: 2px
    max-height: 80vh
</style>

<style scoped lang="sass">
.title
  padding: 20px 0
  text-align: center
  border-bottom: 1px solid #00000057
  font-size: 24px
  font-weight: 500
  @media screen and (max-width: 768px)
    padding: 10px 0
    font-size: 20px
.formSection
  padding: 20px 0
  @media screen and (max-width: 768px)
    padding: 10px 0 20px 0
  .content
    border-radius: 10px
    background-color: #afafaf
    border: solid 1px #fff
    overflow-y: auto
    max-height: calc(70vh - 200px)
    padding: 0 60px
    @media screen and (max-width: 768px)
      background-color: #afafaf00
      border: solid 1px #fff0
      max-height: calc(90vh - 200px)
      padding: 0 10px
</style>

<style scoped lang="sass">
.form_input
  width: 100%
  border-radius: 5px
  margin: 20px auto
  font-size: 16px
  overflow: hidden
  position: relative
  display: block
  display: flex
  justify-content: center
  align-items: center
  flex-wrap: wrap
  .inputTitle
    background-color: #fff
    border-radius: 5px
    width: 30%
    display: block
    text-align: center
    margin: 0 10px 0 0
    font-size: 16px
    padding: 5px 0
    @media screen and (max-width: 768px)
      width: 32%
      font-size: 14px
  .empty
    background-color: #fff0
  .inputIten
    border-radius: 5px
    position: relative
    width: 60%
    background-color: #e2efff
    padding: 5px 15px
    .input_style
      border-radius: 5px
      border: none
      background-color: #e2efff
      height: 100%
      width: 100%
    input
      width: 100%
      height: 100%
      border: none
      background-color: #e2efff
      font-size: 16px
      outline: none
      &::placeholder
        color: #000
      @media screen and (max-width: 768px)
        font-size: 14px
    select
      width: 100%
      border: none
      background-color: #e2efff
      outline: none
    .eyes
      position: absolute
      right: 5px
      top: 50%
      transform: translateY(-50%)
      z-index: 99
      cursor: pointer
  .padding_Right_more
    padding: 5px 25px 5px 15px
  .flexStyle
    display: flex
    justify-content: flex-start
    align-items: center
    input
      margin: 5px 0 5px 10px
  .tipsLeft
    width: 30%
    @media screen and (max-width: 768px)
      width: 32%
  .tipsRight
    width: 60%
    display: block
    text-align: center
    font-size: 12px
    padding: 2px 0
    color: #cf0000
    text-align: right
    @media screen and (max-width: 768px)
      width: 60%
      font-size: 10px
  .fullFlex
    width: 100%
  .inputCheck
    width: 5%
    @media screen and (max-width: 768px)
     width: 10%
  .text
    width: 85%
    @media screen and (max-width: 768px)
     width: 80%
     font-size: 12px
</style>

<style scoped lang="sass">
.actionSection
  display: flex
  justify-content: space-around
  align-items: center
  padding: 0 0 20px 0
  .buttonWhite
    width: 300px
    height: 40px
    background-color: #fff
    border-radius: 5px
    text-align: center
    line-height: 40px
    cursor: pointer
    font-size: 16px
    color: #000
    &:hover
      background-color: #f1f1f1
    @media screen and (max-width: 768px)
      width: 135px
  .buttonFill
    width: 300px
    height: 40px
    background-color: #5e5269
    border-radius: 5px
    text-align: center
    line-height: 40px
    cursor: pointer
    font-size: 16px
    color: #fff
    &:hover
      background-color: #3e82a9
    @media screen and (max-width: 768px)
      width: 135px
    &.disabled
      background-color: #ccc
      cursor: not-allowed
      &:hover
        background-color: #ccc
</style>

<style scoped lang="sass">
.valid-feedback
  width: 100%
  color: green
  text-align: right
  font-size: 12px
  @media screen and (max-width: 768px)
    font-size: 10px

.invalid-feedback
  width: 100%
  color: #cf0000
  text-align: right
  font-size: 12px
  @media screen and (max-width: 768px)
    font-size: 10px
</style>
