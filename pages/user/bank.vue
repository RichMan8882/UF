<script lang="ts" setup>
const router = useRouter()
const playerStore = usePlayerStore()
const siteStore = useSiteStore()
const { bankApply } = usePlayerStore()
const pageType = ref('bank')
const bankInfo = ref({
  bankName: siteStore.siteData.depositOptions.bank[0],
  branch: '',
  account: '',
  accountNo: '',
  image: ['', '', '']
})
await useAsyncData(() => {
  if (playerStore.playerInfo.bankInfo !== null) {
    if (playerStore.playerInfo.bankInfo.status === 1) {
      navigateTo('/user/withdraw')
    }
  }
})
// methods
const submitBankApply = async () => {
  console.log(bankInfo)
  if (bankInfo.value.branch === '') {
    return ElMessage.error('請填寫分行')
  }
  if (bankInfo.value.account === '') {
    return ElMessage.error('請填寫戶名')
  }
  if (bankInfo.value.accountNo === '') {
    return ElMessage.error('請填寫帳號')
  }
  if (bankInfo.value.image[0] === '') {
    return ElMessage.error('請上傳身分證正面')
  }
  if (bankInfo.value.image[1] === '') {
    return ElMessage.error('請上傳身分證反面')
  }
  if (bankInfo.value.image[2] === '') {
    return ElMessage.error('請上傳存摺')
  }
  const bankApplyRes = await bankApply(bankInfo.value)
  if (bankApplyRes) {
    await playerStore.fetchInfo()
  }
}
const changeType = async (type) => {
  pageType.value = type
  switch (type) {
    case 'bank':
      bankInfo.value = {
        bankName: siteStore.siteData.depositOptions.bank[0],
        branch: '',
        account: '',
        accountNo: '',
        image: ['', '', '']
      }
      break
    case 'address':
      bankInfo.value = {
        bankName: siteStore.siteData.depositOptions.crypto[0],
        branch: '',
        account: '',
        accountNo: '',
        image: []
      }
      break
  }
}
const updateImage = (data) => {
  // console.log(data)
  if (data.url[0]) {
    bankInfo.value.image[data.index] = data.url[0].url
  } else {
    bankInfo.value.image[data.index] = ''
    console.log(bankInfo.value.image)
  }
}
</script>
<template>
  <div>
    <div class="bank_form">
      <div
        v-if="Object.keys(playerStore.playerInfo.bankInfo || {}).length === 0"
        class="form-bg"
      >
        <!-- <div class="form-bg link-btn-row">
          <a
            class="btn-form-link"
            :class="type === 'bank' ? 'active' : ''"
            @click="changeType('bank')"
            >{{ $lang('銀行') }}</a
          >
          <a
            class="btn-form-link"
            :class="type === 'address' ? 'active' : ''"
            @click="changeType('address')"
            >{{ $lang('錢包地址') }}</a
          >
        </div> -->
        <div v-if="pageType === 'bank'" class="formSection">
          <div class="input-classic">
            <span class="input-title">{{ $lang('銀行') }}</span>
            <select v-model="bankInfo.bankName" name="bName">
              <option
                v-for="item in siteStore.siteData.depositOptions.bank"
                :key="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="input-classic">
            <span class="input-title">{{ $lang('分行') }}</span>
            <input
              v-model="bankInfo.branch"
              v-trim-input
              name="bBranch"
              type="text"
            />
          </div>
          <div class="input-classic">
            <span class="input-title">{{ $lang('銀行帳號') }}</span>
            <input
              v-model="bankInfo.accountNo"
              v-trim-input
              name="bAccount"
              type="text"
              required
            />
          </div>
          <div class="input-classic">
            <span class="input-title">{{ $lang('戶名') }}</span>
            <input
              v-model="bankInfo.account"
              v-trim-input
              name="baName"
              type="text"
              required
            />
          </div>
          <!-- <div class="input-classic">
            <span class="input-title">{{ $lang('上傳檔案') }}</span>
            <input
              id="file"
              type="file"
              onchange="app.checkImg(this)"
              accept="image/png, image/jpeg, image/jpg"
              multiple
            />
          </div> -->
          <div class="input-classic">
            <span class="input-title">{{ $lang('身分證正面') }}</span>
            <pureImgUploader
              :limit="1"
              :index="0"
              @update-image="updateImage"
            ></pureImgUploader>
          </div>
          <div class="input-classic">
            <span class="input-title">{{ $lang('身分證反面') }}</span>
            <pureImgUploader
              :limit="1"
              :index="1"
              @update-image="updateImage"
            ></pureImgUploader>
          </div>
          <div class="input-classic">
            <span class="input-title">{{ $lang('存摺封面照') }}</span>
            <pureImgUploader
              :limit="1"
              :index="2"
              @update-image="updateImage"
            ></pureImgUploader>
          </div>
        </div>
        <!-- <div v-if="type === 'address'">
          <div class="input-classic">
            <span class="input-title">{{ $lang('幣種') }}</span>
            <select name="bName" v-model="bankInfo.bankName">
              <option
                v-for="item in siteStore.siteData.depositOptions.crypto"
                :key="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="input-classic">
            <span class="input-title">{{ $lang('地址') }}</span>
            <input name="bBranch" type="text" v-model="bankInfo.accountNo" />
          </div>
        </div> -->
        <instruction />
        <div class="button-row">
          <button
            type="button"
            class="submit btn-submit"
            data-loading-text="<i class='fa fa-circle-notch fa-spin'></i> Loading..."
            @click="submitBankApply"
          >
            {{ $lang('送出') }}
          </button>
        </div>
      </div>
      <div v-else class="form-bg">
        <div class="input-classic">
          <span class="input-title">{{ $lang('銀行資訊狀態') }}</span>
          <div class="input-text text-center">
            {{ $lang('審核中') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
@import '@/assets/sass/user/model3/coin2.scss'
</style>

<style scoped lang="sass">
.formSection
  margin: 20px 0 0 0
  width: 100%
  height: 58vh
  position: relative
  border-radius: 5px
  font-size: 16px
  overflow-y: auto
  @media screen and (max-width: 768px)
    height: 48vh
  .formContent
    width: 100%
  .input-classic
    .input-title
      margin: 0 10px 10px 0
      width: 80px
</style>

<style scoped lang="sass">
.bank_form
  .form-bg
    padding: 5px 10px 20px
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 20%)
    border-radius: .375rem
    margin-top: 0
    @media screen and (min-width: 768px)
      padding: 30px

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
    margin: 0 auto

    @media screen and (min-width: 768px)
      padding: 6px 16px
      font-size: 16px

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

    select,
    input
      width: 100%
      color: rgba(0, 0, 0, .87)
      padding: 5px
      background-color: rgba(0, 0, 0, 0)
      border-bottom: 1px solid rgba(0, 0, 0, .87)
</style>
