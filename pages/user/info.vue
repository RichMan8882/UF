<script lang="ts" setup>
const { t } = useI18n()
const playerStore = usePlayerStore()

const { updatePassword, updateTrasactionPassword } = playerStore
const pwd = ref({
  oPwd: '',
  nPwd: '',
  nPwdConfirm: '',
  showoPwd: false,
  shownPwd: false,
  shownPwdConfirm: false
})
const transactionPwd = ref({
  oPwd: '',
  nPwd: '',
  nPwdConfirm: '',
  showoPwd: false,
  shownPwd: false,
  shownPwdConfirm: false
})
const changePwd = ref(false)
const changenTPwd = ref(false)
// updatePassword()  更新密碼
// updateTrasactionPassword()  更新交易密碼
watch(
  () => pwd.value.nPwdConfirm,
  (val) => {
    if (val) {
      changePwd.value = true
    } else {
      changePwd.value = false
    }
  }
)
watch(
  () => transactionPwd.value.nPwdConfirm,
  (val) => {
    if (val) {
      changenTPwd.value = true
    } else {
      changenTPwd.value = false
    }
  }
)
const sendPasswordChange = async () => {
  console.log('changePwd.value', changePwd.value)
  console.log('changenTPwd.value', changenTPwd.value)
  if (changePwd.value) {
    if (pwd.value.nPwd !== pwd.value.nPwdConfirm) {
      ElNotification({
        title: `${t('密碼不一致')}`,
        type: 'error',
        duration: 1000,
        showClose: false
      })
      return
    }
    const res = await updatePassword({
      password: pwd.value.oPwd,
      newPassword: pwd.value.nPwd
    })
    if (res.success) {
      pwd.value.oPwd = ''
      pwd.value.nPwd = ''
      pwd.value.nPwdConfirm = ''
    }
  }
  if (changenTPwd.value) {
    if (transactionPwd.value.nPwd !== transactionPwd.value.nPwdConfirm) {
      ElNotification({
        title: `${t('交易密碼不一致')}`,
        type: 'error',
        duration: 1000,
        showClose: false
      })
      return
    }
    const res = await updateTrasactionPassword({
      password: transactionPwd.value.oPwd,
      newPassword: transactionPwd.value.nPwd
    })
    if (res.success) {
      transactionPwd.value.oPwd = ''
      transactionPwd.value.nPwd = ''
      transactionPwd.value.nPwdConfirm = ''
    }
  }
}
const hiddenAccountNo = (value) => {
  if (value) {
    if (value.length <= 3) return '***'

    // 计算中间位置
    const middle = Math.floor(value.length / 2)

    // 替换中间三位
    const start = middle - 1
    const end = middle + 2

    // 构建新字符串
    return value.substring(0, start) + '***' + value.substring(end)
  } else {
    return ''
  }
}
</script>
<template>
  <div class="card">
    <div class="sec-form-block">
      <div class="user-title">
        <span>{{ $lang('帳號') }}</span>
        <span>{{ playerStore.playerInfo.account }}</span>
      </div>
      <div class="user-title">
        <span>{{ $lang('姓名') }}</span>
        <span>{{ playerStore.playerInfo.username }}</span>
      </div>
      <div class="user-title">
        <span>{{ $lang('手機號碼') }}</span>
        <span
          >{{ playerStore.playerInfo.countryCode }}
          {{ hiddenAccountNo(playerStore.playerInfo.mobile) }}</span
        >
      </div>
      <div class="user-title">
        <span>{{ $lang('更換密碼') }}</span>
        <div class="user-title-input">
          <input
            v-model="pwd.oPwd"
            v-trim-input
            type="password"
            maxlength="40"
            :placeholder="t('舊密碼')"
          />
          <input
            v-model="pwd.nPwd"
            v-trim-input
            type="password"
            maxlength="40"
            :placeholder="t('新密碼')"
          />
          <input
            v-model="pwd.nPwdConfirm"
            v-trim-input
            type="password"
            maxlength="40"
            :placeholder="t('確認密碼')"
          />
        </div>
      </div>
      <div class="btn-wrap">
        <button type="button" class="submit" @click="sendPasswordChange">
          {{ $lang('送出') }}
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
@import '@/assets/sass/user/model3/coin2.scss'

.card
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26)
  border-radius: .375rem
  background-color: #fff
  padding: 5px 10px

  @media screen and (min-width: 768px)
    padding: 30px

.btn-wrap
  display: flex
  justify-content: center
  align-items: center
  padding: 30px 0

  .submit
    cursor: pointer
    display: inline-block
    border-radius: 4px
    letter-spacing: .5px
    text-align: center
    border-style: none
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 3px 1px -2px rgba(0, 0, 0, .12)
    outline: none
    transition: all ease .2s
    text-shadow: 0 0 10px rgba(0, 0, 0, .5)
    padding: 6px 16px
    font-size: .95rem
    background-color: #6c757d
    font-weight: bold
    color: #fff
    font-size: 13px

    @media screen and (min-width: 768px)
      padding: 6px 16px
      font-size: 16px

.sec-form-block
  .user-title
    padding: 10px 0
    display: flex
    @media screen and (min-width: 768px)
      margin: 0

    span:first-child
      width: 40%
      color: #252525
      font-weight: bold
      font-size: 15px

      @media screen and (min-width: 768px)
        width: 22%

    span:last-child
      width: 60%
      text-align: left
      padding: 5px 10px
      background-color: #eee
      color: #252525
      border: none

      @media screen and (min-width: 768px)
        width: 78%

    .user-title-input
      width: 60%

      @media screen and (min-width: 768px)
        width: 78%

      input
        display: block
        outline: none
        border-bottom: 1px solid #252525
        font-size: 15px
        padding: 2px 3px

        @media screen and (min-width: 768px)
          padding: 5px


        &::placeholder
          color: lighten(#252525, 10)
          font-size: 15px
</style>
