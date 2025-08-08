<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const playerStore = usePlayerStore()
const siteStore = useSiteStore()
const isButtonDisabled = ref(false)
const countdown = ref(30)
const smsCode = ref('')
const { send, verify } = useOtpStore()
await useAsyncData(async () => {
  if (playerStore.playerInfo.smsVerify) {
    navigateTo('/user/info')
  }
})
// methods
const getPhoneCode = async () => {
  const res = await send({
    mobile: playerStore.playerInfo.mobile,
    countryCode: playerStore.playerInfo.countryCode
  })
  if (res.success) {
    ElNotification({
      title: `${t('簡訊已發送')}`,
      type: 'success',
      duration: 1000,
      showClose: false
    })
    isButtonDisabled.value = true
    const interval = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(interval)
        isButtonDisabled.value = false
        countdown.value = 30
      }
    }, 1000)
  }
}
const verifySmsCode = async () => {
  const res = await verify({
    code: smsCode.value
  })
  if (res.success) {
    ElNotification({
      title: `${t('簡訊驗證成功')}`,
      type: 'success',
      duration: 1000,
      showClose: false
    })
    router.push('/user/info')
  }
}
</script>

<template>
  <div class="card">
    <div class="sms-title">
      <span>
        <i class="fas fa-wallet"></i>
      </span>
      {{ $lang('請驗證電話號碼') }}
    </div>
    <button
      type="button"
      :class="isButtonDisabled ? 'buttonWhGreen btbDisabled' : 'buttonWhGreen'"
      :disabled="isButtonDisabled"
      @click="getPhoneCode"
    >
      <div v-if="!isButtonDisabled">
        <i class="fas fa-envelope"></i>
      </div>
      <div v-else>{{ countdown }}</div>
      <div>{{ $lang('發送驗證碼') }}</div>
    </button>
    <div class="verify_form">
      <div class="input-classic">
        <span class="input-title"> {{ $lang('手機號碼') }}</span>
        <div class="input-text">
          {{ playerStore.playerInfo.countryCode }}
          {{ playerStore.playerInfo.mobile }}
        </div>
      </div>
      <div class="input-classic">
        <span class="input-title">{{ $lang('簡訊驗證碼') }}</span>
        <input v-trim-input v-model="smsCode" name="code" type="text" />
      </div>
      <a :href="siteStore.chatbox" class="not-found" target="_blank"
        >{{ $t('收不到驗證碼') }}?</a
      >
    </div>
    <button type="button" class="submit btn-submit" @click="verifySmsCode">
      {{ $lang('送出') }}
    </button>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/user/model3/coin2.scss'
.pages
  @media screen and (max-width: 768px)
    padding: 10px
</style>

<style scoped lang="sass">
.router
  width: 100%
  height: 35px
  position: relative
  border-radius: 5px
  font-size: 16px
  background-color: #afafaf
  color: #fff
  display: flex
  align-items: center
  justify-content: flex-start
  border: 1px solid #fff
  svg
    padding: 0 20px 0 10px
  .home
    cursor: pointer
</style>

<style scoped lang="sass">
.card
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26)
  border-radius: .375rem
  background-color: #fff
  padding: 5px 10px

  @media screen and (min-width: 768px)
    padding: 30px

.sms-title
  font-weight: bold
  padding: 12px 15px
  font-size: 18px
  margin-bottom: 6px
  background-color: #32333a
  color: #fff
  border-radius: 6px
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26)

.input-classic
  display: flex
  flex-wrap: nowrap
  margin-bottom: 25px

  @media screen and (min-width: 768px)
    width: 100%
    max-width: 100%
    margin-left: 0
    margin-right: 0

  span.input-title
    color: #252525
    font-weight: bold
    font-size: 15px
    width: 35%


  .input-text
    background-color: rgba(0, 0, 0, 0.2)
    font-size: 15px
    padding: 5px 10px
    width: 100%

  select,
  input
    width: 100%
    color: rgba(0, 0, 0, .87)
    padding: 5px
    background-color: rgba(0, 0, 0, 0)
    border-bottom: 1px solid rgba(0, 0, 0, .87)

.btn-submit.submit
  cursor: pointer
  display: block
  border-radius: 4px
  letter-spacing: .5px
  text-align: center
  border-style: none
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 3px 1px -2px rgba(0, 0, 0, .12)
  outline: none
  text-shadow: 0 0 10px rgba(0, 0, 0, .5)
  padding: 6px 16px
  font-size: 13px
  background-color: #6c757d
  font-weight: bold
  color: #fff
  margin: 0 auto 30px
  transition: all 0.3s
  &:hover
    opacity: 0.8
.not-found
  cursor: pointer
  display: block
  border-radius: 4px
  letter-spacing: .5px
  text-align: center
  border-style: none
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 3px 1px -2px rgba(0, 0, 0, .12)
  outline: none
  text-shadow: 0 0 10px rgba(0, 0, 0, .5)
  padding: 6px 16px
  font-size: 14px
  background-color: rgb(203, 79, 79)
  font-weight: bold
  color: #fff
  width: 150px
  margin-bottom: 40px
  margin-top: 20px
  transition: all 0.3s
  &:hover
    opacity: 0.8
.verify_form
  max-width: 500px
  width: 100%
  margin: 0 auto
</style>

<style scoped lang="sass">
.buttonWhGreen
  margin: 60px auto 60px auto
  width: 220px
  height: 40px
  background-color: #0849aabd
  border-radius: 5px
  text-align: center
  line-height: 40px
  cursor: pointer
  font-size: 16px
  color: #fff
  display: flex
  justify-content: center
  align-items: center
  &:hover
    background-color: #40b768
  @media screen and (max-width: 768px)
    width: 135px
  svg
    padding: 0 10px 0 0
.btbDisabled
  background-color: #51765d
  color: #b9b9b9
  cursor: not-allowed
</style>
