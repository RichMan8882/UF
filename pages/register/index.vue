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
  socialPlatform: '',
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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
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
  <div>
    <div class="form-block page">
      <div class="gw template">
        <div class="form-container small">
          <div class="white-bg">
            <div class="form-title">
              {{ $lang('註冊') }} {{ siteStore.siteData.title }}
              <!-- {{ $lang('帳號') }} -->
            </div>
            <div class="register_form">
              <div class="form-bg">
                <div v-if="showReferrerInput" class="input-classic">
                  <span class="input-title"
                    >{{ $lang('推薦碼') }} ({{ $lang('選填') }})</span
                  >
                  <input
                    v-model="signupData.referrerCode"
                    v-trim-input
                    type="text"
                    name="pAcc"
                    :readonly="true"
                  />
                </div>
                <div class="input-classic">
                  <span class="input-title">{{ $lang('用戶帳號') }}</span>
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
                  <div class="tips">
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
                <div class="input-classic">
                  <span class="input-title">{{ $lang('登入密碼') }}</span>
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
                  <div class="tips">
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
                      {{
                        $lang(
                          '需混合填入8個(含)以上字元大小寫、數字，不可與用戶帳號金鑰密碼相同'
                        )
                      }}
                      <!-- {{ $lang('需混合使用 3 個字元以上的英文或數字。') }} -->
                    </div>
                    <!-- <div
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
                  </div> -->
                  </div>
                </div>
                <div class="input-classic">
                  <span class="input-title">{{ $lang('登入密碼確認') }}</span>
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
                  <div class="tips">
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
                  class="input-classic"
                >
                  <span class="input-title">{{ $lang('金鑰密碼') }}</span>
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
                  <div class="tips">
                    <div
                      :class="
                        validationStatus.transactionPasswordValid &&
                        !validationStatus.transactionPasswordSameWithPassword
                          ? 'valid-feedback'
                          : 'invalid-feedback'
                      "
                    >
                      <span
                        v-if="
                          validationStatus.transactionPasswordValid &&
                          !validationStatus.transactionPasswordSameWithPassword
                        "
                      >
                        <i class="fas fa-check"></i>
                      </span>
                      {{
                        $lang(
                          '需混合填入8個(含)以上字元大小寫、數字，不可與用戶帳號、登入密碼相同'
                        )
                      }}
                      <!-- {{ $lang('需混合使用 3 個字元以上的英文或數字。') }} -->
                    </div>
                    <!-- <div
                    v-if="signupData.transactionPassword"
                    :class="
                      !validationStatus.transactionPasswordSameWithPassword
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                    "
                  >
                    <span
                      v-if="
                        !validationStatus.transactionPasswordSameWithPassword
                      "
                    >
                      <i class="fas fa-check"></i>
                    </span>
                    {{ $lang('交易密碼不可與登入密碼,帳號相同') }}
                  </div> -->
                  </div>
                </div>
                <!-- <div
                  v-if="siteStore.siteData.transactionPasswordRequired"
                  class="input-classic"
                >
                  <span class="input-title">{{ $lang('金鑰密碼確認') }}</span>
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
                  <div class="tips">
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
                </div> -->
                <div class="input-classic">
                  <span class="input-title">{{ $lang('用戶名稱') }}</span>
                  <input
                    v-model="signupData.username"
                    v-trim-input
                    type="text"
                    class="input_style"
                  />
                  <div class="tips">
                    <div
                      ref="usernameRef"
                      :class="
                        signupData.username
                          ? 'valid-feedback'
                          : 'invalid-feedback'
                      "
                    >
                      <span v-if="signupData.username">
                        <i class="fas fa-check"></i>
                      </span>
                      {{ $lang('必填') }}
                    </div>
                  </div>
                </div>
                <div class="input-classic">
                  <span class="input-title">{{ $lang('手機號碼') }}</span>
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
                  <input
                    v-model="signupData.mobile"
                    v-trim-input
                    type="text"
                    class="input_style"
                    @input="checkPhoneValid"
                  />
                  <div class="tips">
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
                    <div
                      ref="mobileRef"
                      :class="
                        signupData.mobile
                          ? 'valid-feedback'
                          : 'invalid-feedback'
                      "
                    >
                      <span v-if="signupData.mobile">
                        <i class="fas fa-check"></i>
                      </span>
                      {{ $lang('必填') }}
                    </div>
                  </div>
                </div>
                <!-- <div class="input-classic">
                <span class="input-title">{{ $lang('聯絡方式') }}</span>
                <select v-model="signupData.socialPlatform" name="phoneCode">
                  <option
                    v-for="item in siteStore.siteData.socialOptions"
                    :key="item"
                  >
                    {{ item }}
                  </option>
                </select>
                <input
                  v-model="signupData.socialId"
                  v-trim-input
                  type="text"
                  class="input_style"
                />
                <div class="tips">
                  <div
                    ref="socialIdRef"
                    :class="
                      signupData.socialId
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                    "
                  >
                    <span v-if="signupData.socialId">
                      <i class="fas fa-check"></i>
                    </span>
                    {{ $lang('必填') }}
                  </div>
                </div>
              </div> -->
                <!-- <div class="input-classic">
                <span class="input-title">{{ $lang('聯絡方式') }}</span>
                <select v-model="signupData.socialPlatform" name="contactType">
                  <option
                    v-for="item in siteStore.siteData.socialOptions"
                    :key="item"
                  >
                    {{ item }}
                  </option>
                </select>
                <input
                  v-model="signupData.socialId"
                  name="contactInfo"
                  type="text"
                />
              </div> -->
                <div class="input-classic">
                  <span class="input-title b-$t">
                    <b class="zh_TW">{{ $lang('驗證碼') }}</b>
                  </span>
                  <div class="form-flex">
                    <recaptcha @check-hepler="checkHepler"></recaptcha>
                    <input
                      v-model="recaptchaCode"
                      v-trim-input
                      type="text"
                      name="vcode"
                      required
                    />
                  </div>
                </div>
                <div class="submit-info">
                  <label>
                    <input
                      v-model="isChecked"
                      class="submit-check"
                      type="checkbox"
                    />
                    {{
                      $lang(
                        '我已年滿 18 歲，並已閱讀、接受並同意條款和條件、規則、隱私政策、Cookie 政策以及與年齡驗證相關的政策'
                      )
                    }}
                    <a target="_blank">{{ $lang('條款和條件') }}</a>
                  </label>
                </div>
                <div class="info-text span-$t text-center">
                  <span class="zh_TW"
                    >{{
                      $lang('本頁面受 reCAPTCHA 機制保護，並遵守 Google 的')
                    }}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      >{{ $lang('隱私權政策') }}</a
                    >
                    及
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      >{{ $lang('服務條款') }}</a
                    >。</span
                  >
                </div>
                <div class="button-row">
                  <a class="btn-cancel" @click="navigateTo('/login')">{{
                    $lang('取消')
                  }}</a>
                  <button
                    type="button"
                    class="submit btn-submit"
                    data-loading-text="<i class='fa fa-circle-notch fa-spin'></i> Loading......"
                    :class="{ disabled: !isFormValid }"
                    @click="handleRegisterClick"
                  >
                    {{ $lang('送出') }}
                  </button>
                </div>
              </div>
              <div class="form-sec-bg">
                <div class="info-text text-center span-$t">
                  <i class="fas fa-exclamation-circle"></i>
                  <span class="zh_TW"
                    >{{ $lang('請將您用來登入') }}
                    {{ siteStore.siteData.title }}
                    {{
                      $lang(
                        '的手機設定兩步驟驗證，這可以保護您的帳戶安全，使其不致於因為密碼外洩而遭盜用，即使密碼遭盜用，盜用者也無法成功登入您的帳戶。'
                      )
                    }}</span
                  >
                </div>
              </div>
              <div class="link-text-block">
                <div class="span-$t">
                  <span class="zh_TW">{{ $lang('已經註冊過?') }}</span>
                  <a class="link-text" @click="navigateTo('/login')">{{
                    $lang('登入')
                  }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
@import '@/assets/sass/register/model2/coin2.scss'
.form-block
  height: 100dvh
  overflow-y: auto
.form-container
  background-image: url("@/assets/image/rise-middle.jpg")
  background-size: cover
  background-position: center
  background-repeat: no-repeat
  padding: 0 !important
  .white-bg
    background-color: white
    opacity: 0.8
    padding: 30px
</style>
<style scoped lang="sass">
.tips
  width: 100%
  font-size: 12px
  color: red
  text-align: right
</style>
<style scoped lang="sass">
.btn-submit
  &.disabled
    background-color: #ccc
    cursor: not-allowed
    &:hover
      background-color: #ccc
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
