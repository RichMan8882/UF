<script lang="ts" setup>
import {
  topSliderImages,
  bottomSliderImages,
  endSliderImages
} from '@/assets/index_ab.js'
const siteStore = useSiteStore()
const { queryChatbox } = siteStore
const { locale } = useI18n()
const lang = locale.value
onMounted(async () => {
  queryChatbox()
  const queryNewsRes = await siteStore.queryNews(lang, 'user')
  news.value = queryNewsRes.data.result
})
const wrapperList = [
  { title: 'Staked KAVA', text: '120M' },
  { title: 'Active validators', text: '100' },
  { title: 'Bridged Asset TXS', text: '$2.5B+' },
  { title: 'Assets on-chain', text: '$625M+' },
  { title: 'Average TX fee', text: '$0.0001' }
]
const news = ref([])
const swiperIndex = ref(0)
</script>
<template>
  <div>
    <div class="sliderContainer">
      <div class="mainSlider">
        <div class="content">
          <img
            class="himg"
            src="https://upload.comethike.com/uploads/1754811384579.png"
            alt=""
          />
          <div class="tab">
            <div class="notice">
              <div class="notice-title">
                <svg
                  class="notice_notice-icon__JFUNz"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.16 1.6001C11.9 1.6001 11.66 1.6801 11.44 1.8201L4.64 6.3201C4.36 6.5001 4.02 6.6201 3.68 6.6201H2.32C1.58 6.6001 1 7.1801 1 7.9001V11.8601C1 12.5801 1.58 13.1601 2.3 13.1601H3.66C4 13.1601 4.34 13.2601 4.62 13.4601L11.44 17.9601C11.66 18.1001 11.9 18.1801 12.16 18.1801C12.88 18.1801 13.46 17.6001 13.46 16.8801V2.9001C13.48 2.1801 12.88 1.6001 12.16 1.6001ZM2 11.8601V7.9001C2 7.7401 2.14 7.6001 2.3 7.6001H3.6V12.1601H2.3C2.14 12.1601 2 12.0201 2 11.8601ZM12.46 16.8601C12.46 17.0401 12.3 17.1601 12.16 17.1601C12.1 17.1601 12.04 17.1401 12 17.1001L5.18 12.6201C5.02 12.5201 4.86 12.4201 4.68 12.3601V7.4001C4.86 7.3401 5.02 7.2401 5.18 7.1401L12 2.6401C12.06 2.6001 12.1 2.5801 12.16 2.5801C12.3 2.5801 12.46 2.7001 12.46 2.8801V16.8601ZM15.58 7.5401C15.36 7.3601 15.04 7.4001 14.88 7.6201C14.7 7.8401 14.74 8.1601 14.96 8.3201C15.5 8.7601 15.82 9.4201 15.82 10.1201C15.82 10.8001 15.52 11.4401 15 11.8801C14.78 12.0601 14.76 12.3801 14.94 12.5801C15.04 12.7001 15.18 12.7601 15.32 12.7601C15.44 12.7601 15.54 12.7201 15.64 12.6401C16.4 12.0201 16.82 11.0801 16.82 10.1001C16.82 9.1201 16.38 8.1801 15.58 7.5401Z"
                    stroke-width="0.4"
                  ></path>
                  <path
                    d="M16.9403 5.30024C16.7203 5.14024 16.4003 5.20024 16.2403 5.44024C16.0803 5.66024 16.1403 5.98024 16.3803 6.14024C17.6803 7.02024 18.4603 8.48024 18.4603 10.0402C18.4603 11.7002 17.6203 13.2002 16.2003 14.0602C15.9603 14.2002 15.8803 14.5202 16.0403 14.7402C16.1403 14.9002 16.3003 14.9802 16.4603 14.9802C16.5403 14.9802 16.6403 14.9602 16.7203 14.9002C18.4403 13.8602 19.4603 12.0402 19.4603 10.0202C19.4403 8.14024 18.5003 6.38024 16.9403 5.30024Z"
                    stroke-width="0.4"
                  ></path>
                </svg>
                <div class="line">|</div>
                <van-swipe
                  style="height: 26px"
                  vertical
                  :autoplay="4000"
                  :show-indicators="false"
                >
                  <van-swipe-item
                    v-for="(item, index) in news"
                    :key="index"
                    @click="
                      navigateTo('/user/news?title=' + item.title + '&type=2')
                    "
                    ><div class="notice-text">
                      {{ item.title }}
                    </div></van-swipe-item
                  >
                </van-swipe>
              </div>
              <div class="more">
                {{ $lang('查看更多') }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.46967 2.46967C4.76256 2.17678 5.23744 2.17678 5.53033 2.46967L9.53033 6.46967C9.82322 6.76256 9.82322 7.23744 9.53033 7.53033L5.53033 11.5303C5.23744 11.8232 4.76256 11.8232 4.46967 11.5303C4.17678 11.2374 4.17678 10.7626 4.46967 10.4697L7.93934 7L4.46967 3.53033C4.17678 3.23744 4.17678 2.76256 4.46967 2.46967Z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="activitytb">
              <div class="tabs list1">
                <div class="tabstext">
                  {{ $lang('值得信賴') }}
                </div>
              </div>
              <div class="tabs list2">
                <div class="tabstext">Surprise</div>
                <div class="tabstext">
                  {{ $lang('驚喜費率') }}
                </div>
              </div>
              <div class="tabs list3">
                <div class="tabstext">
                  {{ $lang('貨幣交易') }}
                </div>
              </div>
              <div class="tabs list4">
                <div
                  class="tabstext"
                  style="font-size: 10px; color: #999; font-weight: 400"
                >
                  {{ $lang('謹防虛假宣傳') }}
                </div>
                <div class="tabstext">{{ $lang('官方') }}</div>
                <div class="tabstext">
                  {{ $lang('驗證通道') }}
                </div>
              </div>
            </div>
            <van-swipe
              class="my-swipe"
              :autoplay="3000"
              :show-indicators="false"
              @change="(index) => (swiperIndex = index)"
            >
              <van-swipe-item>
                <div class="tabs list1">
                  <div class="tabstext">
                    {{ $lang('值得信賴') }}
                  </div>
                </div>
              </van-swipe-item>
              <van-swipe-item>
                <div class="tabs list2">
                  <div class="tabstext">Surprise</div>
                  <div class="tabstext">
                    {{ $lang('驚喜費率') }}
                  </div>
                </div>
              </van-swipe-item>
              <van-swipe-item>
                <div class="tabs list3">
                  <div class="tabstext">
                    {{ $lang('貨幣交易') }}
                  </div>
                </div>
              </van-swipe-item>
              <van-swipe-item>
                <div class="tabs list4">
                  <div
                    class="tabstext"
                    style="font-size: 10px; color: #999; font-weight: 400"
                  >
                    {{ $lang('謹防虛假宣傳') }}
                  </div>
                  <div class="tabstext">{{ $lang('官方') }}</div>
                  <div class="tabstext">
                    {{ $lang('驗證通道') }}
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
            <div class="dian">
              <div
                v-for="item in 4"
                :key="item"
                :class="swiperIndex === item - 1 ? 'active' : ''"
                class="item"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="stats-wrapper">
        <div v-for="item in 3" :key="item" class="stats-wrapper-item">
          <div
            v-for="(item, index) in wrapperList"
            :key="index"
            class="stats-wrapper-list"
          >
            <div class="stats-wrapper-title">{{ item.title }}</div>
            <div class="stats-wrapper-text">{{ item.text }}</div>
          </div>
        </div>
        <div class="fade-out-block"></div>
        <div class="fade-out-block fade-right"></div>
      </div>
      <div class="sliderMain">
        <div class="sliderBox">
          <div class="slider">
            <div class="slideTrack">
              <div
                v-for="(image, index) in topSliderImages"
                :key="'first-' + index"
                class="slide"
              >
                <img :src="image.src" :alt="image.alt" />
              </div>
              <div
                v-for="(image, index) in topSliderImages"
                :key="'second-' + index"
                class="slide"
              >
                <img :src="image.src" :alt="image.alt" />
              </div>
            </div>
          </div>
        </div>
        <div class="sliderBox">
          <div class="slider">
            <div class="slideTrack reverse">
              <div
                v-for="(image, index) in bottomSliderImages"
                :key="'first-' + index"
                class="slide"
              >
                <img :src="image.src" :alt="image.alt" />
              </div>
              <div
                v-for="(image, index) in bottomSliderImages"
                :key="'second-' + index"
                class="slide"
              >
                <img :src="image.src" :alt="image.alt" />
              </div>
            </div>
          </div>
        </div>
        <div class="sliderBox">
          <div class="slider">
            <div class="slideTrack">
              <div
                v-for="(image, index) in endSliderImages"
                :key="'first-' + index"
                class="slide"
              >
                <img :src="image.src" :alt="image.alt" />
              </div>
              <div
                v-for="(image, index) in endSliderImages"
                :key="'second-' + index"
                class="slide"
              >
                <img :src="image.src" :alt="image.alt" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TvMarketDataKava />
    </div>
    <div class="whycontent">
      <div class="title">{{ $lang('為什麼選擇GTL？') }}</div>
      <div class="list">
        <div class="left">
          <div class="item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="31"
              viewBox="0 0 17 31"
              fill="none"
            >
              <path
                d="M0 0.37439H4.2499V4.65798H0V0.37439ZM4.2499 4.65798H8.50021V8.94156H4.2499V4.65798ZM8.50021 8.94156H12.7501V13.2251H8.50021V8.94156ZM12.7501 13.2247H17V17.5087H12.7501V13.2247ZM8.50021 17.5087H12.7501V21.7919H8.50021V17.5087ZM4.2499 21.7919H8.50021V26.0759H4.2499V21.7919ZM0 26.343V30.6261H4.2499V26.0751H0V26.3426V26.343Z"
                fill="url(#paint0_linear_27070_6232)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_27070_6232"
                  x1="8.5"
                  y1="0.37439"
                  x2="8.5"
                  y2="30.6261"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9DFBA"></stop>
                  <stop offset="1" stop-color="#AF8354"></stop>
                </linearGradient>
              </defs>
            </svg>
            {{ $lang('安全可靠的交易平臺') }}
          </div>
          <div class="text">
            {{ $lang('行業領先安全技術和財務穩定性確保您的資產安全有保障。') }}
          </div>
        </div>
        <div class="right">
          <video autoplay loop src="@/assets/image/home1/1.mp4"></video>
        </div>
      </div>
      <div class="list list-2">
        <div class="left">
          <div class="item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="31"
              viewBox="0 0 17 31"
              fill="none"
            >
              <path
                d="M0 0.37439H4.2499V4.65798H0V0.37439ZM4.2499 4.65798H8.50021V8.94156H4.2499V4.65798ZM8.50021 8.94156H12.7501V13.2251H8.50021V8.94156ZM12.7501 13.2247H17V17.5087H12.7501V13.2247ZM8.50021 17.5087H12.7501V21.7919H8.50021V17.5087ZM4.2499 21.7919H8.50021V26.0759H4.2499V21.7919ZM0 26.343V30.6261H4.2499V26.0751H0V26.3426V26.343Z"
                fill="url(#paint0_linear_27070_6232)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_27070_6232"
                  x1="8.5"
                  y1="0.37439"
                  x2="8.5"
                  y2="30.6261"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9DFBA"></stop>
                  <stop offset="1" stop-color="#AF8354"></stop>
                </linearGradient>
              </defs>
            </svg>
            {{ $lang('生態合作夥伴') }}
          </div>
          <div class="text">
            {{
              $lang(
                'GTL生態合作夥伴即刻獲得多類型戰略支持，共享GTL平臺的生態價值與數位貨幣時代紅利'
              )
            }}
          </div>
        </div>
        <div class="right">
          <video autoplay loop src="@/assets/image/home1/2.mp4"></video>
        </div>
      </div>
      <div class="list">
        <div class="left">
          <div class="item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="31"
              viewBox="0 0 17 31"
              fill="none"
            >
              <path
                d="M0 0.37439H4.2499V4.65798H0V0.37439ZM4.2499 4.65798H8.50021V8.94156H4.2499V4.65798ZM8.50021 8.94156H12.7501V13.2251H8.50021V8.94156ZM12.7501 13.2247H17V17.5087H12.7501V13.2247ZM8.50021 17.5087H12.7501V21.7919H8.50021V17.5087ZM4.2499 21.7919H8.50021V26.0759H4.2499V21.7919ZM0 26.343V30.6261H4.2499V26.0751H0V26.3426V26.343Z"
                fill="url(#paint0_linear_27070_6232)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_27070_6232"
                  x1="8.5"
                  y1="0.37439"
                  x2="8.5"
                  y2="30.6261"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9DFBA"></stop>
                  <stop offset="1" stop-color="#AF8354"></stop>
                </linearGradient>
              </defs>
            </svg>
            {{ $lang('一站式交易服務') }}
          </div>
          <div class="text">
            {{
              $lang(
                'GTL為全球數十個國家，1,000,000+用戶7x24小時提供多語言、高品質服務！'
              )
            }}
          </div>
        </div>
        <div class="right">
          <video autoplay loop src="@/assets/image/home1/3.mp4"></video>
        </div>
      </div>
    </div>
    <div class="news-section">
      <div class="w-layout-grid journal-section-grid">
        <div
          id="w-node-dd46d2f5-bad4-d4f7-d00a-252a4d572ceb-ac7e4544"
          class="overflow-hidden-2"
        >
          <h2
            data-w-id="049f0474-3ca0-c33f-ba9d-ae0133c6c76a"
            class="h2-60-px white"
          >
            {{ $lang('News') }}
          </h2>
          <a
            data-w-id="7ce69de6-1760-55b0-3b75-4c11feffbb8f"
            class="button text-left w-button"
            >{{ $lang('View All') }}</a
          >
        </div>
        <div class="relative-block">
          <h6
            data-w-id="95c9d495-1b96-7279-6b6a-4a3324593a09"
            class="subheading"
          >
            {{ $lang('latest') }}
          </h6>
          <div class="w-dyn-list">
            <div role="list" class="w-dyn-items">
              <div role="listitem" class="w-dyn-item">
                <a
                  data-w-id="e629c73b-8ff2-7ff9-dbb4-c312e79969c4"
                  class="list-item-horizontal show-tooltip w-inline-block"
                  ><div class="date-right-space fade-in-1st">
                    {{ $lang('Jan 20 2024') }}
                  </div>
                  <div class="fade-in-2nd">
                    {{
                      $lang(
                        `A Roadmap to Revolutionizing Lending: Kava Lends Strategic Vision for 2024`
                      )
                    }}
                  </div>
                  <div
                    class="line-top-absolute"
                    style="width: 100%; height: 1px"
                  ></div
                ></a>
              </div>
              <div role="listitem" class="w-dyn-item">
                <a
                  data-w-id="e629c73b-8ff2-7ff9-dbb4-c312e79969c4"
                  class="list-item-horizontal show-tooltip w-inline-block"
                  ><div class="date-right-space fade-in-1st">
                    {{ $lang('March 20, 2024') }}
                  </div>
                  <div class="fade-in-2nd">
                    {{
                      $lang(
                        'Bitgo Officially Launches Wrapped Bitcoin (WBTC) on Kava'
                      )
                    }}
                  </div>
                  <div
                    class="line-top-absolute"
                    style="width: 100%; height: 1px"
                  ></div
                ></a>
              </div>
              <div role="listitem" class="w-dyn-item">
                <a
                  data-w-id="e629c73b-8ff2-7ff9-dbb4-c312e79969c4"
                  class="list-item-horizontal show-tooltip w-inline-block"
                  ><div class="date-right-space fade-in-1st">
                    {{ $lang('March 18, 2024') }}
                  </div>
                  <div class="fade-in-2nd">
                    {{
                      $lang(
                        'Binance Officially Supports Kava EVM – including support for native USDT on Kava'
                      )
                    }}
                  </div>
                  <div
                    class="line-top-absolute"
                    style="width: 100%; height: 1px"
                  ></div
                ></a>
              </div>
              <div role="listitem" class="w-dyn-item">
                <a
                  data-w-id="e629c73b-8ff2-7ff9-dbb4-c312e79969c4"
                  class="list-item-horizontal show-tooltip w-inline-block"
                  ><div class="date-right-space fade-in-1st">
                    {{ $lang('Nov 14, 2023') }}
                  </div>
                  <div class="fade-in-2nd">
                    {{ $lang('Kava 15: Kava Zero Inflation') }}
                  </div>
                  <div
                    class="line-top-absolute"
                    style="width: 100%; height: 1px"
                  ></div
                ></a>
              </div>
            </div>
          </div>
          <div
            class="line-bottom-absolute"
            style="width: 100%; height: 1px"
          ></div>
        </div>
      </div>
    </div>
    <div class="safe-section">
      <div class="title">{{ $lang('三大舉措守護資產安全') }}</div>
      <div class="text">
        {{ $lang('即時幫您監控資產風險，平台原因造成損失快速全賠') }}
      </div>
      <div class="list">
        <div class="item">
          <img src="@/assets/image/home1/guard-icon.png" />
          <div class="item-title">{{ $lang('1 億美元守護基金') }}</div>
          <div class="item-text">{{ $lang('平台異常極速響應，全額保障') }}</div>
        </div>
        <div class="item">
          <img src="@/assets/image/home1/coin-icon.png" />
          <div class="item-title">{{ $lang('儲備金率超 100%') }}</div>
          <div class="item-text">{{ $lang('實時鏈上驗證，資產隨時可查') }}</div>
        </div>
        <div class="item">
          <img src="@/assets/image/home1/lock-icon.png" />
          <div class="item-title">{{ $lang('合約保險基金') }}</div>
          <div class="item-text">
            {{ $lang('市場異常波動期間，為交易提供保障') }}
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="digital">
      <div class="items">
        <div class="bigText">8.4K+</div>
        <div class="remark">歷史巔峰 TPS</div>
      </div>
      <div class="items">
        <div class="bigText">250萬+</div>
        <div class="remark">每月活躍用戶數</div>
      </div>
      <div class="items">
        <div class="bigText">551M+</div>
        <div class="remark">交易</div>
      </div>
      <div class="items">
        <div class="bigText">400</div>
        <div class="remark">節點總數</div>
      </div>
      <div class="items">
        <div class="bigText">131</div>
        <div class="remark">驗證節點</div>
      </div>
    </div>
    <div class="join">
      <div class="text">立即加入{{ siteStore.siteData.title }}並開始交易</div>
      <div class="button" @click="navigateTo('/user/info')">立即開始</div>
    </div> -->
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
  background-color: rgb(13, 20, 24)
  .header
    width: 100%
    height: 80px
  .sliderContainer
    width: 100%
    box-sizing: border-box
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
h1
  z-index: 50
  color: white
  text-align: center
  letter-spacing: -2.5px
  margin-top: 0
  margin-bottom: 0
  font-family: Neue Montreal, sans-serif
  font-size: 9ch
  font-weight: 700
  line-height: 1em
  position: relative
  font-size: 105px


.gradient-text
  background-image: linear-gradient(to right, #ff433e, #ef8534)
  -webkit-text-fill-color: transparent
  -webkit-background-clip: text
  background-clip: text
  font-weight: 700
  position: relative
  font-size: 105px

.para-large
  margin-bottom: 25px
  font-size: 1.5rem
  line-height: 1.3em
  color: #bebebe

  &.home-hero-para
    z-index: 50
    text-align: center
    max-width: 700px
    margin-top: 15px
    margin-bottom: 15px
    position: relative

.w-layout-grid
  grid-row-gap: 16px
  grid-column-gap: 16px
  grid-template-rows: auto auto
  grid-template-columns: 1fr 1fr
  grid-auto-columns: 1fr
  display: grid
  @media screen and (max-width: 1000px)
    display: block


.grid-3-col
  text-align: center
  grid-template-rows: auto
  grid-template-columns: 1fr 1fr 1fr
  width: 100%

  &.sidechain-features
    grid-template-columns: 1fr 1fr 1fr
    margin-top: 25px
    margin-bottom: 40px
    @media screen and (max-width: 1000px)
      grid-template-columns: 1fr

.features-cards
  background-image: linear-gradient(#1d2838, #1d28384d)
  border-radius: 12px
  flex-direction: column
  justify-content: center
  align-items: center
  // max-width: 400px
  height: 100%
  margin-right: 40px
  padding: 30px
  display: flex
  overflow: hidden
  color: white
  // @media screen and (max-width: 1000px)
  //     width: 70% !important
  //     margin: 0 auto


  &.no-margin
    background-image: linear-gradient(#1d2838, #1d28384d)
    justify-content: flex-start
    height: auto
    max-height: 400px
    margin-right: 0
    padding-top: 35px
    padding-bottom: 35px
    @media screen and (max-width: 1000px)
      width: 70% !important
      margin: 0 auto
      margin-bottom: 30px
    @media screen and (max-width: 500px)
      width: 100% !important
      margin: 0 auto
      margin-bottom: 30px


.features-card-icon
  margin-bottom: 26px

.feature-icon
  height: 50px

.featues-card-heading
  margin-bottom: 8px
  font-weight: 500
  font-size: 24px

.code-decoration
  z-index: 1
  opacity: .15
  width: 140px
  position: absolute
  inset: 0% auto 0% 0%

  &.horz-glyphs
    opacity: .1
    width: 500px
    height: 200px
    top: 5%
</style>
<style scoped lang="sass">
.whycontent
  width: 100%
  max-width: 1200px
  margin: 0 auto
  @media screen and (max-width: 768px)
    padding: 20px
    text-align: center
  .title
    background: linear-gradient(0deg, #af8354, #f9dfba)
    -webkit-text-fill-color: transparent
    background-clip: text
    text-align: center
    font-size: 40px
    @media screen and (max-width: 768px)
      font-size: 28px
  .list-2
    flex-direction: row-reverse
    @media screen and (max-width: 768px)
      flex-direction: row
  .list
    display: flex
    justify-content: space-between
    align-items: center
    @media screen and (max-width: 768px)
      flex-wrap: wrap
      flex-direction: column-reverse
      .right
        margin: 0 auto
    .left
      color: #fff
      height: auto
      flex-shrink: 0
      width: 50%
      @media screen and (max-width: 768px)
        width: 100%
      .item
        display: flex
        align-items: center
        font-size: 32px
        @media screen and (max-width: 768px)
          font-size: 16px
          justify-content: center
        svg
          margin-right: 20px
          @media screen and (max-width: 768px)
            width: 10px
            margin-right: 10px
      .text
        font-size: 22px
        color: #818181
        margin-top: 20px
        @media screen and (max-width: 768px)
          font-size: 14px
    video
      width: 260px
      @media screen and (max-width: 768px)
        margin: 20px auto
        width: 160px
</style>
<style scoped lang="sass">
.news-section
  z-index: 10
  flex-direction: column
  align-items: flex-start
  width: 100%
  padding: 100px
  display: block
  position: relative

@media screen and (max-width: 991px)
  .news-section
    padding: 50px

.w-layout-grid
  grid-row-gap: 16px
  grid-column-gap: 16px
  grid-template-rows: auto auto
  grid-template-columns: 1fr 1fr
  grid-auto-columns: 1fr
  display: grid

.journal-section-grid
  grid-column-gap: 10px
  grid-row-gap: 10px
  grid-template-rows: auto
  grid-template-columns: .5fr 1fr
  margin-top: 25px
  margin-bottom: 25px
  @media screen and (max-width: 991px)
    grid-template-columns: 1fr

.overflow-hidden-2
  position: relative
  overflow: hidden

#w-node-dd46d2f5-bad4-d4f7-d00a-252a4d572ceb-ac7e4544
  align-self: start

.white
  color: #fff

.h2-60-px
  z-index: 50
  color: white
  letter-spacing: -1.2px
  font-size: 60px
  font-weight: 500
  position: relative

  &.white
    margin-top: 0

@media screen and (max-width: 991px)
  .h2-60-px
    font-size: 57px

.w-button
  color: #fff
  line-height: inherit
  cursor: pointer
  background-color: #3898ec
  border: 0
  border-radius: 0
  padding: 9px 15px
  text-decoration: none
  display: inline-block

.button
  z-index: 999
  background-color: #ff433e
  background-image: linear-gradient(to right, #ff433e, #ff7847)
  text-align: center
  border-radius: 50px
  min-width: 150px
  padding: 20px 40px
  font-weight: 600
  line-height: 120%
  transition: opacity .3s
  position: relative

  &.text-left
    text-align: left
    background-color: #0000
    background-image: none
    padding-left: 0
    transition-property: all
    transition-duration: .3s

.relative-block
  position: relative

h6
  color: white
  letter-spacing: 1px
  text-transform: uppercase
  margin-top: 0
  margin-bottom: 0
  font-size: 14px
  font-weight: 500
  line-height: 150%

.subheading
  color: white
  margin-bottom: 16px
  font-weight: 500

.line-bottom-absolute
  background-color: #1d1d1f
  width: 100%
  height: 1px
  position: absolute
  inset: auto auto 0% 0%

a
  color: #ff433e
  text-decoration: none

.w-inline-block
  max-width: 100%
  display: inline-block

.list-item-horizontal
  z-index: 10
  grid-template-rows: auto
  grid-template-columns: 1fr 1fr
  grid-auto-columns: 1fr
  align-items: center
  width: 100%
  padding-top: 40px
  padding-bottom: 40px
  display: flex
  position: relative

.date-right-space.fade-in-1st
  background-image: linear-gradient(to right, #ff433e, #ef8534)
  -webkit-text-fill-color: transparent
  -webkit-background-clip: text
  background-clip: text
  margin-right: 30px
  font-size: 18px

.fade-in-2nd
  color: white
  font-size: 18px

.line-top-absolute
  background-color: #1d1d1f
  width: 100%
  height: 1px
  position: absolute
  inset: 0% auto auto 0%
</style>
<style scoped lang="sass">
.safe-section
  width: 100%
  max-width: 1200px
  margin: 50px auto
  color: #fff
  text-align: center
  .title
    font-size: 36px
    font-weight: 600
    @media screen and (max-width: 768px)
      font-size: 26px
  .text
    color: #6e7583
    font-size: 20px
    margin-top: 12px
    @media screen and (max-width: 768px)
      font-size: 16px
  .list
    display: flex
    margin-top: 40px
    @media screen and (max-width: 768px)
      flex-wrap: wrap
      padding: 20px
    .item
      width: 33.333%
      border-radius: 10px
      background: linear-gradient(180deg, #141821, #0a0a0e)
      padding: 44px 24px 54px
      cursor: pointer
      margin: 0 5px
      @media screen and (max-width: 768px)
        width: 100%
        margin: 20px auto
        max-width: 400px
      &:hover
        box-shadow: 0px 0px 15px 5px #020d22
      .item-title
        font-size: 20px
        margin: 30px 0 12px
      .item-text
        font-size: 14px
        color: #6e7583
      img
        margin: 0 auto
        width: 120px
</style>
<style scoped lang="sass">
.header
  width: 100%
  position: fixed
  top: 0
  z-index: 5
  opacity: 0.9
  background-color: rgba(0, 30, 41, 0.7)
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
    z-index: 5
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
  // min-height: 80dvh
  // background-image: url('@/assets/image/index_ab/mainSlider.jpg')
  // background-image: radial-gradient(circle at -25% -50%, #ff433e66 30%, #fff0 37%)

  .content
    width: 100%
    height: 100%
    text-align: center
    .himg
      width: 87%
      max-width: 1364px
      margin: 0 auto
      margin-top: -170px
      @media screen and (max-width: 1508px)
        margin-top: -130px
      @media screen and (max-width: 1308px)
        margin-top: -90px
      @media screen and (max-width: 1108px)
        margin-top: -50px
      @media screen and (max-width: 908px)
        margin-top: 0
      @media screen and (max-width: 768px)
        width: 100%
    .tab
      width: 1200px
      margin: 0 auto
      @media screen and (max-width: 1200px)
        width: 100%
        margin-right: 24px
        padding: 0 50px
      @media screen and (max-width: 768px)
        padding: 20px

      .notice
        display: flex
        justify-content: space-between
        height: 1.625rem
        margin: 12px 16px
        margin-top: -60px
        border-radius: 4px
        display: flex
        align-items: center
        color: #b4b4b4
        @media screen and (max-width: 1200px)
          margin-top: 0px
        .notice-title
          font-size: 18px
          color: #b4b4b4
          padding-right: 10px
          margin-right: 10px
          height: 1.375rem
          display: flex
          align-items: center
          margin-left: 15px
          .notice_notice-icon__JFUNz
            fill: #fff
            stroke: #fff
          .line
            font-size: 12px
            margin: 0 8px 0 10px
            color: #515151
        .notice-text
          height: 1.625rem
          line-height: 1.625rem
          font-size: 14px
          text-align: left
          cursor: pointer
        .more
          font-size: 14px
          display: flex
          align-items: center
          color: #b4b4b4
          cursor: pointer
          transition: 0.3s color
          svg
            width: 14px
            fill: #b4b4b4
          &:hover
            color: #fff !important
            svg
              fill: #fff
      .activitytb
        display: flex
        justify-content: space-between
        margin-top: 20px
        margin-bottom: 70px
        @media screen and (max-width: 1168px)
          flex-wrap: wrap
        @media (max-width: 768px)
          display: none
      .list1
        background-image: url('@/assets/image/home1/indextab3.jpg')
      .list2
        background-image: url('@/assets/image/home1/indextab4.jpg')
      .list3
        background-image: url('@/assets/image/home1/indextab1.jpg')
      .list4
        background-image: url('@/assets/image/home1/indextab2.jpg')
      .tabs
        background-size: 100% 100%
        background-position: center
        width: 305px
        height: 141px
        border-radius: 4px
        margin: 0 10px
        display: flex
        justify-content: center
        flex-direction: column
        align-items: flex-start
        transition: all .3s
        @media screen and (max-width: 1168px)
          width: 47%
          margin-bottom: 20px
          height: 200px
        @media screen and (max-width: 768px)
          width: 100%
          height: 190px
        &:hover
          transform: scale(1.05)
          box-shadow: 2px 10px 15px 8px #282017
        .tabstext
          color: #fff
          font-size: 20px
          font-weight: 600
          margin-left: 15px
          max-width: 60%
          text-align: left
      .my-swipe
        margin: 10px 0
        width: 100%
        display: none
        @media (max-width: 768px)
          display: block
        .van-swipe-item
          color: #fff
          height: 200px
          font-size: 20px
          text-align: center
          width: 100%
          flex-shrink: 0
      .dian
        display: none
        justify-content: center
        align-content: center
        @media screen and (max-width: 768px)
          display: flex
        .item
          width: 4px
          height: 4px
          background-color: #818181
          border-radius: 50%
          margin: 0 2px
          opacity: 0.5
          transition: all 0.5s
        .active
          background-color: #fff
          background: linear-gradient(90deg, #f9dfba, #af8354)
          opacity: 1
          width: 12px
          border-radius: 10px
.stats-wrapper
  width: 100%
  background-color: #11151c
  height: 120px
  // position: absolute
  // top: 900px
  margin-bottom: 10px
  z-index: 55
  display: flex
  align-items: center
  flex-wrap: nowrap
  color: #fff
  .stats-wrapper-item
    display: flex
    animation: scroll-wrapper 15s linear infinite
    .stats-wrapper-list
      width: 190px
      text-align: center
      .stats-wrapper-text
        font-size: 32px
        font-weight: bold
        line-height: 159%
  .fade-out-block
    position: absolute
    z-index: 50
    background-image: linear-gradient(to right, #11151c 61%, #fff0 79%)
    width: 200px
    min-width: 200px
    height: 120px
    min-height: 120px
    @media screen and (max-width: 768px)
      width: 50px
      min-width: 50px
  .fade-right
    background-image: linear-gradient(270deg, #11151c 61%, #fff0 79%)
    inset: 0% 0% 0% auto
@keyframes scroll-wrapper
  from
    transform: translateX(0)
  to
    transform: translateX(-100%)
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
  background-image: radial-gradient(circle at -25% -50%, #ff433e66 30%, #fff0 37%) !important

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
  .sliderMain
    background-color: #11151c
    padding: 5% 10%
    overflow: hidden
    box-sizing: border-box
    width: 100%

  .sliderBox
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    margin-bottom: 25px
    .slider
      // width: 100%
      height: 82px
      position: relative
      overflow: hidden
      // &:before,, &:after
      //   content: ""
      //   width: 82px
      //   height: 82px
      //   position: absolute
      //   z-index: 2
      &:before
        top: 0
        left: 0
      &:after
        top: 0
        right: 0
      .slideTrack
        width: calc(200px * 24)
        display: flex
        animation: scroll 50s linear infinite
        @keyframes scroll
          0%
            transform: translateX(0)
          100%
            transform: translateX(calc(-82px * 13))
        .slide
          width: 82px
          height: 82px
          border-radius: 50%
          background-image: linear-gradient(#1d2838, #1d283880)
          display: flex
          justify-content: center
          align-items: center
          margin: 0 20px

          img
            width: 56px
            height: 56px
            // padding: 12px
            // border: 1px solid #82959b
            border-radius: 50%
      .reverse
        animation: scrollReverse 50s linear infinite
        @keyframes scrollReverse
          0%
            transform: translateX(calc(-82px * 13))
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
@media screen and (max-width: 767px)
  .integrations-4x
    grid-template-columns: 1fr !important
  h1
    font-size: 50px !important
  p
    font-size: 16px !important
  h2
    font-size: 32px !important
</style>
<style scoped lang="sass">
.conveyer-belt
  animation: conveyer 3s linear infinite
.conveyer-belthid
  animation: conveyer2 3s linear infinite
@keyframes conveyer
  from
    transform: matrix(0.4842599928379059,0,0,0.4842599928379059,0,-160.00039672851562)
  to
    transform: matrix(0.4842599928379059,0,0,0.4842599928379059,700,-160.00039672851562)
@keyframes conveyer2
  from
    transform: matrix(0.4842599928379059,0,0,0.4842599928379059,-700,-160.00039672851562)
  to
    transform: matrix(0.4842599928379059,0,0,0.4842599928379059,0,-160.00039672851562)
</style>
