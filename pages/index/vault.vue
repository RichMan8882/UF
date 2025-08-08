<script lang="ts" setup>
const indexContainer = ref(0)
</script>
<template>
  <div class="content">
    <div class="home-hero-section">
      <div class="flex-center">
        <h1
          data-w-id="d3a249d5-63eb-dc19-ac26-4a8ad2d08e66"
          style="
            opacity: 1;
            transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
              rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
            transform-style: preserve-3d;
          "
          class="less-margin"
        >
          Kava
        </h1>
        <h1
          data-w-id="5d8771fc-25de-09f4-9269-b02225e90475"
          style="
            opacity: 1;
            transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
              rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
            transform-style: preserve-3d;
          "
          class="gradient-text more-line-height"
        >
          {{ $lang('Strategic Vault') }}
        </h1>
        <p
          data-w-id="d9b7cc3b-fe03-368d-c361-696dc0e7dbce"
          style="
            opacity: 1;
            transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
              rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
            transform-style: preserve-3d;
          "
          class="para-large home-hero-para vault"
        >
          {{
            $lang(
              'A community owned vault funding rapid growth and security initiatives across the Kava ecosystem'
            )
          }}
        </p>
        <a class="nav-link-wrap vault w-inline-block">{{
          $lang('View on MintScan')
        }}</a>
      </div>
      <div
        id="w-node-_287c3953-e927-f0b7-e773-fb3d470e5315-867e461c"
        class="wrapper vault-stats"
      >
        <div class="w-layout-grid _12-col-grid vault">
          <div
            id="w-node-ee7dce2c-05dd-cd81-90c9-a60782c0cb29-867e461c"
            data-w-id="ee7dce2c-05dd-cd81-90c9-a60782c0cb29"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
            class="vault-card"
          >
            <h4 class="vault-title">{{ $lang('Available Funds') }} (Kava)</h4>
            <h1 class="vault-heading"><strong>560M</strong></h1>
          </div>
          <div
            id="w-node-_8cec2efa-aef7-0816-0fbc-9a7c9124cef2-867e461c"
            data-w-id="8cec2efa-aef7-0816-0fbc-9a7c9124cef2"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
            class="vault-card blue"
          >
            <h4 class="vault-title">{{ $lang('Kava Rise Protocols') }}</h4>
            <h1 class="vault-heading">100+</h1>
          </div>
          <div
            id="w-node-_61028e1a-efb4-5d5b-4492-f22e210b69ee-867e461c"
            data-w-id="61028e1a-efb4-5d5b-4492-f22e210b69ee"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
            class="vault-card green"
          >
            <h4 class="vault-title">{{ $lang('Available Funds') }} (AKT)</h4>
            <h1 class="vault-heading">2.5M</h1>
          </div>
          <div
            id="w-node-e597de3e-fc6b-986e-a4b7-6fbb42f1c870-867e461c"
            data-w-id="e597de3e-fc6b-986e-a4b7-6fbb42f1c870"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
            class="vault-card orange"
          >
            <h4 class="vault-title">
              {{ $lang('Infrastructure') }} &amp;
              {{ $lang('Security Partners') }}
            </h4>
            <h1 class="vault-heading">100+</h1>
          </div>
        </div>
      </div>
      <div class="hero-image-wrapper margin--60px">
        <div class="gradient-top"></div>
        <div class="gradient-sides"></div>
        <img
          src="@/assets/image/home1/KSV.jpg"
          loading="lazy"
          alt=""
          class="hero-image"
        />
      </div>
    </div>

    <div class="section-4 bg-tile-top-lg bg-neutral-700">
      <div
        data-w-id="a552709f-7f45-a872-38e3-38184f2c4bff"
        style="
          opacity: 1;
          transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
            rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
          transform-style: preserve-3d;
        "
        class="container-lg"
      >
        <div class="max-width-xl larger">
          <div class="w-layout-grid row-md">
            <div id="w-node-a552709f-7f45-a872-38e3-38184f2c4c0d-867e461c">
              <div class="margin-bottom margin-base">
                <h2 class="h2-headline">
                  <font _mstmutation="1"
                    >{{ $lang('Programmatic, transparent') }}
                  </font>
                  <br />
                  <span class="gradient-text">{{
                    $lang('on-chain funding')
                  }}</span>
                </h2>
                <p class="margin-top-10px">
                  {{
                    $lang(
                      'The Kava Strategic Vault has fuelled rapid growth on-boarding 70+ protocols to the Kava ecosystem with many more to come This community owned funding mechanism aims to create sustained growth and stability across the Kava ecosystem'
                    )
                  }}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-xl">
        <div
          data-current="Tab 1"
          data-easing="ease"
          data-duration-in="0"
          data-duration-out="0"
          class="tabs-horizontal w-tabs"
        >
          <div
            id="w-node-a552709f-7f45-a872-38e3-38184f2c4c18-867e461c"
            class="tabs-menu-side w-tab-menu"
            role="tablist"
          >
            <a
              id="w-tabs-0-data-w-tab-0"
              data-w-tab="Tab 1"
              class="tabs-menu-side-link w-inline-block w-tab-link"
              role="tab"
              aria-controls="w-tabs-0-data-w-pane-0"
              aria-selected="false"
              style="
                transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                transform-style: preserve-3d;
              "
              tabindex="-1"
              @click="indexContainer = 0"
              ><div
                class="tab-content-2"
                style="
                  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                  transform-style: preserve-3d;
                "
              >
                <div class="accordion-item-wrapper">
                  <div class="w-layout-grid tab-title">
                    <h3
                      id="w-node-a552709f-7f45-a872-38e3-38184f2c4c1e-867e461c"
                    >
                      {{ $lang('Fully Decentralized') }}
                    </h3>
                    <i
                      class="fa-solid fa-chevron-right"
                      style="color: #ffffff"
                    ></i>
                  </div>
                  <div
                    class="accordion-content"
                    style="
                      transform: translate3d(0px, 0px, 0px)
                        scale3d(0.96, 0.96, 1) rotateX(0deg) rotateY(0deg)
                        rotateZ(0deg) skew(0deg, 0deg);
                      transform-style: preserve-3d;
                      opacity: 1;
                      width: 351px;
                    "
                  >
                    <div
                      v-show="indexContainer == 0"
                      class="para-small grey-text"
                    >
                      {{
                        $lang(
                          'Transparent funding owned by the Kava community of stakers'
                        )
                      }}
                    </div>
                  </div>
                </div>
              </div></a
            ><a
              id="w-tabs-0-data-w-tab-1"
              data-w-tab="Tab 2"
              data-w-id="a552709f-7f45-a872-38e3-38184f2c4c25"
              class="tabs-menu-side-link w-inline-block w-tab-link"
              role="tab"
              aria-controls="w-tabs-0-data-w-pane-1"
              aria-selected="false"
              style="
                transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                transform-style: preserve-3d;
              "
              tabindex="-1"
              @click="indexContainer = 1"
              ><div
                class="tab-content-2"
                style="
                  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                  transform-style: preserve-3d;
                "
              >
                <div class="accordion-item-wrapper">
                  <div class="w-layout-grid tab-title">
                    <h3
                      id="w-node-_682e64af-ec09-b686-daac-b115483bc2e9-867e461c"
                    >
                      {{ $lang('Growth Optimized') }}
                    </h3>
                    <i
                      class="fa-solid fa-chevron-right"
                      style="color: #ffffff"
                    ></i>
                  </div>
                  <div
                    class="accordion-content"
                    style="
                      transform: translate3d(0px, 0, 0px) scale3d(0.96, 0.96, 1)
                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)
                        skew(0deg, 0deg);
                      transform-style: preserve-3d;
                      opacity: 1;
                      width: 351px;
                    "
                  >
                    <div
                      v-show="indexContainer == 1"
                      class="para-small grey-text"
                    >
                      {{
                        $lang(
                          '70+ protocols successfully on-boarded over the past 6 months'
                        )
                      }}
                    </div>
                  </div>
                </div>
              </div></a
            ><a
              id="w-tabs-0-data-w-tab-2"
              data-w-tab="Tab 3"
              class="tabs-menu-side-link w-inline-block w-tab-link w--current"
              role="tab"
              aria-controls="w-tabs-0-data-w-pane-2"
              aria-selected="true"
              style="
                transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                transform-style: preserve-3d;
              "
              @click="indexContainer = 2"
              ><div
                class="tab-content-2"
                style="
                  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                  transform-style: preserve-3d;
                "
              >
                <div class="accordion-item-wrapper">
                  <div class="w-layout-grid tab-title">
                    <h3
                      id="w-node-_43432121-5f67-a94f-4ae0-1d6fd2d2d7d9-867e461c"
                    >
                      DAO&nbsp;{{ $lang('Flexibility') }}
                    </h3>
                    <i
                      class="fa-solid fa-chevron-right"
                      style="color: #ffffff"
                    ></i>
                  </div>
                  <div
                    class="accordion-content"
                    style="
                      transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)
                        skew(0deg, 0deg);
                      transform-style: preserve-3d;
                      opacity: 1;
                      width: 351px;
                    "
                  >
                    <div
                      v-show="indexContainer == 2"
                      class="para-small grey-text"
                    >
                      {{ $lang('Advanced Cosmos DAO technology') }}
                    </div>
                  </div>
                </div>
              </div></a
            >
          </div>
          <div class="w-tab-content">
            <div
              v-show="indexContainer == 0"
              id="w-tabs-0-data-w-pane-0"
              data-w-tab="Tab 1"
              class="tab-pane-tab-1-2 w-tab-pane"
              role="tabpanel"
              aria-labelledby="w-tabs-0-data-w-tab-0"
            >
              <div class="tab-content-wrap">
                <h2 class="h2-headline">
                  <font _mstmutation="1">{{
                    $lang('A fully transparent, auditable vault controlled by')
                  }}</font>
                  <span class="gradient-text">
                    {{ $lang('Kava stakers') }}</span
                  >
                </h2>
                <p class="margin-top-10px">
                  {{
                    $lang(
                      'The first fully decentralized vault built on Cosmos The Kava Strategic Vault assures the security and growth of the Kava ecosystem With transparency and auditability, owned by the Kava community'
                    )
                  }}
                </p>
              </div>
            </div>
            <div
              v-show="indexContainer == 1"
              id="w-tabs-0-data-w-pane-1"
              data-w-tab="Tab 2"
              class="tab-pane-tab-1-2 w-tab-pane"
              role="tabpanel"
              aria-labelledby="w-tabs-0-data-w-tab-1"
            >
              <div class="tab-content-wrap">
                <h2>
                  <font _mstmutation="1"
                    >{{ $lang('70+ protocols join') }} </font
                  ><span class="gradient-text">{{ $lang('Kava Rise') }} </span
                  ><font _mstmutation="1">{{ $lang('in') }} 2022</font>
                </h2>
                <p class="margin-top-10px">
                  {{
                    $lang(
                      'Through Kava Rise growth initiatives, Kava has become one of the fastest growing blockchains by TVL and protocols on-boarded'
                    )
                  }}.
                </p>
                <img
                  src="@/assets/image/home1/vaultimgs.svg"
                  loading="lazy"
                  alt=""
                  class="protocols"
                />
              </div>
            </div>
            <div
              v-show="indexContainer == 2"
              id="w-tabs-0-data-w-pane-2"
              data-w-tab="Tab 3"
              class="tab-pane-tab-1-2 w-tab-pane w--tab-active"
              role="tabpanel"
              aria-labelledby="w-tabs-0-data-w-tab-2"
            >
              <div class="tab-content-wrap">
                <h2>
                  <font _mstmutation="1"
                    >{{ $lang('Bringing flexibility and control to') }} </font
                  ><span class="gradient-text">{{ $lang('Cosmos DAOs') }}</span>
                </h2>
                <p class="margin-top-10px">
                  {{
                    $lang(
                      'Kava pioneered the most advanced form of Cosmos DAO&nbsp;technology allowing the community to control funding initiatives'
                    )
                  }}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-4 bg-neutral-800">
      <div class="container">
        <div class="flex-center">
          <h1
            data-w-id="f9ca9e20-231e-97dd-df89-fdf1950a71e7"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
            class="less-margin"
          >
            {{ $lang('Future') }}
          </h1>
          <h1
            data-w-id="d03f7ead-e608-bcfd-2034-480327c4d114"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
            class="less-margin"
          >
            {{ $lang('Vault') }}
          </h1>
          <h1
            data-w-id="f9ca9e20-231e-97dd-df89-fdf1950a71e9"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
            class="gradient-text more-line-height"
          >
            {{ $lang('Initiatives') }}
          </h1>
          <p>{{ $lang('Voted through governance') }}</p>
        </div>
        <div class="margin-bottom margin-2xl">
          <div class="content-centered"></div>
        </div>
        <div class="w-layout-grid integrations-4x">
          <div
            id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc2286-867e461c"
            class="fade-in-on-scroll"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
          >
            <div class="integration-card-2 rounded-xs shadow">
              <div class="w-layout-grid column-base">
                <div
                  id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc2289-867e461c"
                  class="w-layout-grid row-sm items-center"
                >
                  <i
                    class="fa-solid fa-shield-halved"
                    style="margin: 0 15px"
                  ></i>
                  <h6
                    id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc228d-867e461c"
                  >
                    {{ $lang('Smart contract interaction') }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div
            id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc2291-867e461c"
            class="fade-in-on-scroll"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
          >
            <div class="integration-card-2 rounded-xs shadow">
              <div class="w-layout-grid column-base">
                <div
                  id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc2294-867e461c"
                  class="w-layout-grid row-sm items-center"
                >
                  <i class="fa-solid fa-building" style="margin: 0 15px"></i>
                  <h6
                    id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc2298-867e461c"
                  >
                    {{ $lang('Infrastructure improvements') }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div
            id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc229c-867e461c"
            class="fade-in-on-scroll"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
          >
            <div class="integration-card-2 rounded-xs shadow">
              <div class="w-layout-grid column-base">
                <div
                  id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc229f-867e461c"
                  class="w-layout-grid row-sm items-center"
                >
                  <i
                    class="fa-solid fa-chart-column"
                    style="margin: 0 15px"
                  ></i>
                  <h6
                    id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc22a3-867e461c"
                  >
                    {{ $lang('Scaling initiatives') }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div
            id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc22a7-867e461c"
            class="fade-in-on-scroll"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
          >
            <div class="integration-card-2 rounded-xs shadow">
              <div class="w-layout-grid column-base">
                <div
                  id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc22aa-867e461c"
                  class="w-layout-grid row-sm items-center"
                >
                  <i class="fa-solid fa-signature" style="margin: 0 15px"></i>
                  <h6
                    id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc22ae-867e461c"
                  >
                    {{ $lang('Vault Diversification') }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div
            id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc22b2-867e461c"
            class="fade-in-on-scroll"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
          >
            <div class="integration-card-2 rounded-xs shadow">
              <div class="w-layout-grid column-base">
                <div
                  id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc22b5-867e461c"
                  class="w-layout-grid row-sm items-center"
                >
                  <i class="fa-solid fa-code" style="margin: 0 15px"></i>
                  <h6
                    id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc22b9-867e461c"
                  >
                    {{ $lang('STRATEGIC developer funding') }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div
            id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc22bd-867e461c"
            class="fade-in-on-scroll"
            style="
              opacity: 1;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
            "
          >
            <div class="integration-card-2 rounded-xs shadow">
              <div class="w-layout-grid column-base">
                <div
                  id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc22c0-867e461c"
                  class="w-layout-grid row-sm items-center"
                >
                  <i
                    class="fa-solid fa-bitcoin-sign"
                    style="margin: 0 15px"
                  ></i>
                  <h6
                    id="w-node-_44a1a8e0-c547-ad27-be7b-b13fa2fc22c4-867e461c"
                  >
                    {{ $lang('Cross-chain Funding') }}
                  </h6>
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
.content
  color: white
  padding-top: 80px
  background-image: radial-gradient(circle at -18% -42%, rgba(255, 67, 62, 0.4) 28%, rgba(255, 255, 255, 0) 35%)
</style>

<style scoped lang="sass">
.home-hero-section
  padding-top: 50px
  padding-bottom: 50px

.flex-center
  flex-direction: column
  align-items: center
  width: 100%
  display: flex

h1
  color: white
  text-align: center
  letter-spacing: -2.5px
  margin-top: 0
  margin-bottom: 0
  font-family: Neue Montreal, sans-serif
  font-size: 105px
  font-weight: 700
  line-height: 1em
  position: relative

.less-margin
  margin-bottom: -8px

.gradient-text
  background-image: linear-gradient(to right, #ff433e, #ef8534)
  -webkit-text-fill-color: transparent
  -webkit-background-clip: text
  background-clip: text
  font-weight: 700
  position: relative

  &.more-line-height
    line-height: 1.3em

p
  color: #bebebe
  margin-bottom: 0
  font-weight: 500

.para-large
  margin-bottom: 25px
  font-size: 1.5rem
  line-height: 1.3em

  &.home-hero-para
    text-align: center
    max-width: 700px
    margin-top: 15px
    margin-bottom: 15px
    position: relative

    &.vault
      max-width: 580px

a
  color: #ff433e
  text-decoration: none

.w-inline-block
  max-width: 100%
  display: inline-block

.nav-link-wrap
  color: #bebebe
  font-size: 24px
  transition: opacity .3s

.nav-link-item
  grid-column-gap: 8px
  grid-row-gap: 10px
  grid-template-rows: auto
  grid-template-columns: auto
  grid-auto-columns: auto
  grid-auto-flow: column
  justify-content: start
  align-items: center
  font-weight: 400
  display: grid

.nav-link-text-wrap
  grid-column-gap: 6px
  grid-row-gap: 6px
  grid-template-rows: auto
  grid-template-columns: auto
  grid-auto-columns: auto
  grid-auto-flow: column
  justify-content: start
  margin-bottom: 2px
  display: grid

.nav-link-text
  color: #fff
  letter-spacing: -.01em
  font-size: 18px
  font-weight: 500
  line-height: 1.5

  &.vault
    color: #bebebe
    text-transform: uppercase

.wrapper
  justify-content: space-between
  align-items: center
  width: 85%
  max-width: 1280px
  margin-left: auto
  margin-right: auto
  display: flex
  position: relative

  &.vault-stats
    margin-top: 40px
    margin-bottom: 60px

.w-layout-grid
  grid-row-gap: 16px
  grid-column-gap: 16px
  grid-template-rows: auto auto
  // grid-template-columns: 1fr 1fr
  grid-auto-columns: 1fr
  display: grid

._12-col-grid
  grid-template-rows: auto auto auto auto auto auto
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr
  width: 100%

.vault-card
  background-image: linear-gradient(to bottom, #fe6460, #ff433e)
  border-radius: 12px
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  height: 100%
  padding: 40px
  display: flex

#w-node-ee7dce2c-05dd-cd81-90c9-a60782c0cb29-867e461c
  grid-area: span 4 / span 7 / span 4 / span 7
  place-self: auto

h4
  color: white
  margin-top: 0
  margin-bottom: 0
  font-size: 24px
  font-weight: 500
  line-height: 125%

.vault-title
  text-align: center

h1
  color: white
  text-align: center
  letter-spacing: -2.5px
  margin-top: 0
  margin-bottom: 0
  font-family: Neue Montreal, sans-serif
  font-size: 105px
  font-weight: 700
  line-height: 1em
  position: relative

.vault-heading
  padding-top: 1px
  padding-bottom: 1px
  font-weight: bold

.vault-card.blue
  background-image: linear-gradient(to bottom, #6e56ff, #4628ff)

#w-node-_8cec2efa-aef7-0816-0fbc-9a7c9124cef2-867e461c
  grid-area: 1 / 8 / 3 / 12
  place-self: auto

.vault-card.green
  background-image: linear-gradient(to bottom, #ef8534, #feb57d 52%)

#w-node-_61028e1a-efb4-5d5b-4492-f22e210b69ee-867e461c
  grid-area: span 4 / span 5 / span 4 / span 5
  place-self: auto

.vault-card.orange
  background-image: linear-gradient(#3d4f69, #1d2838)

#w-node-e597de3e-fc6b-986e-a4b7-6fbb42f1c870-867e461c
  grid-area: 5 / 3 / 8 / 8
  place-self: auto end

.hero-image-wrapper
  flex-direction: column
  align-items: center
  display: flex

  &.margin--60px
    margin-top: -60px

.gradient-top
  background-image: linear-gradient(#000, #0000)
  width: 100%
  max-width: 100%
  height: 200px
  position: absolute
  z-index: 2

.gradient-sides
  background-image: linear-gradient(to right, #000, #0000005c 8%, #0000 15% 85%, #0000005c 92%, #000)
  width: 100%
  height: 100%
  position: absolute
  z-index: 2


.hero-image
  width: 100%
  max-width: 100%
</style>

<style scoped lang="sass">
.section-4
  width: 100%
  padding-top: 5em
  padding-bottom: 5em
  position: relative
  background-color: black

.container-lg
  margin: 0 auto
  z-index: 5
  width: 100%
  max-width: 64em
  padding-left: 1.25em
  padding-right: 1.25em
  position: relative

.max-width-xl
  width: 100%
  max-width: 50.1em

  &.larger
    max-width: 50.1em

.row-md
  z-index: 5
  grid-column-gap: 1.5em
  grid-row-gap: 1.5em
  grid-template-rows: auto
  grid-template-columns: auto
  grid-auto-columns: auto
  grid-auto-flow: column
  justify-content: start
  display: grid
  position: relative

#w-node-a552709f-7f45-a872-38e3-38184f2c4c0d-867e461c
  grid-area: span 1 / span 1 / span 1 / span 1

.margin-bottom
  margin-top: 0
  margin-left: 0
  margin-right: 0

h2
  color: white
  margin-top: 0
  margin-bottom: 0
  font-family: Neue Montreal, sans-serif
  font-size: 58px
  font-weight: 700
  line-height: 1.3em

.h2-headline
  text-align: left
  font-family: Neue Montreal, sans-serif
  font-weight: 700
  position: relative

.gradient-text
  background-image: linear-gradient(to right, #ff433e, #ef8534)
  -webkit-text-fill-color: transparent
  -webkit-background-clip: text
  background-clip: text
  font-weight: 700
  position: relative

p
  color: #bebebe
  margin-bottom: 0
  font-weight: 500

.margin-top-10px
  margin-top: 10px

.container-xl
  z-index: 5
  width: 100%
  max-width: 72em
  margin-left: auto
  margin-right: auto
  padding-left: 1.25em
  padding-right: 1.25em
  position: relative

.w-tabs
  position: relative

.tabs-horizontal
  grid-column-gap: 2em
  grid-row-gap: 16px
  grid-template-rows: auto
  grid-template-columns: .5fr 1fr
  grid-auto-columns: 1fr
  align-items: center
  margin-top: 4em
  padding-top: 4em
  display: grid

.w-tabs
  &:before, &:after
    content: " "
    grid-area: 1 / 1 / 2 / 2
    display: table

.w-tab-menu
  position: relative

.tabs-menu-side
  grid-column-gap: 1em
  grid-row-gap: 1em
  flex-direction: column
  grid-template-rows: auto
  grid-template-columns: 1fr
  grid-auto-columns: 1fr
  display: grid

#w-node-a552709f-7f45-a872-38e3-38184f2c4c18-867e461c
  grid-area: 1 / 1 / 2 / 2

.w-inline-block
  max-width: 100%
  display: inline-block

.w-tab-link
  vertical-align: top
  text-align: left
  cursor: pointer
  color: #222
  background-color: #ddd
  padding: 9px 30px
  text-decoration: none
  display: inline-block
  position: relative

.tabs-menu-side-link
  background-color: #11151c
  color: #a7b5c4
  border-radius: .5em
  padding: 1.5em
  box-shadow: inset 0 0 0 1px #1e252c

.tab-content-2
  width: 100%
  display: flex

.accordion-item-wrapper
  flex-direction: column
  width: 100%
  display: flex

.tab-title
  grid-column-gap: 1em
  grid-row-gap: 16px
  grid-template-rows: auto
  grid-template-columns: 1fr auto
  align-items: center
  width: 100%
  height: 3em

h3
  color: white
  letter-spacing: -.4px
  margin-top: 0
  margin-bottom: 0
  font-family: Neue Montreal, sans-serif
  font-size: 32px
  font-weight: 500
  line-height: 159%

.w-tab-content
  display: block
  position: relative
  overflow: hidden

.tab-pane-tab-1-2
  width: 100%
  height: 100%

.w--tab-active
  display: block

.w-tab-pane
  // display: none
  position: relative

.tab-content-wrap
  flex-direction: column
  justify-content: center
  align-items: flex-start
  width: 100%
  height: 100%
  padding: 0 2.5em
  display: flex
  position: relative

h2
  color: white
  margin-top: 0
  margin-bottom: 0
  font-family: Neue Montreal, sans-serif
  font-size: 58px
  font-weight: 700
  line-height: 1.3em

.gradient-text
  background-image: linear-gradient(to right, #ff433e, #ef8534)
  -webkit-text-fill-color: transparent
  -webkit-background-clip: text
  background-clip: text
  font-weight: 700
  position: relative

p
  color: #bebebe
  margin-bottom: 0
  font-weight: 500

.margin-top-10px
  margin-top: 10px

.para-small
  &.grey-text
    color: #acacac
    font-size: 15px

  max-width: 860px
  font-size: 16px
  line-height: 1.3em

.accordion-content
  z-index: 2
  text-align: left
  position: relative
  overflow: hidden
</style>

<style scoped lang="sass">
.container
  z-index: 2
  width: 100%
  max-width: 100em
  margin-left: auto
  margin-right: auto
  padding: 4em
  position: relative

  .flex-center
    flex-direction: column
    align-items: center
    width: 100%
    display: flex

  .less-margin
    margin-bottom: -8px

  h1
    color: white
    text-align: center
    letter-spacing: -2.5px
    margin-top: 0
    margin-bottom: 0
    font-family: Neue Montreal, sans-serif
    font-size: 105px
    font-weight: 700
    line-height: 1em
    position: relative

  .gradient-text
    &.more-line-height
      line-height: 1.1em

    background-image: linear-gradient(to right, #ff433e, #ef8534)
    -webkit-text-fill-color: transparent
    -webkit-background-clip: text
    background-clip: text
    font-weight: 700
    position: relative

  p
    color: #bebebe
    margin-bottom: 0
    font-weight: 500

  .w-layout-grid
    grid-row-gap: 16px
    grid-column-gap: 16px
    grid-template-rows: auto auto
    grid-template-columns: 1fr 1fr 1fr
    grid-auto-columns: 1fr
    display: grid

  .integrations-4x
    grid-column-gap: 1em
    grid-row-gap: 1em
    grid-template-rows: auto
    grid-template-columns: 1fr 1fr 1fr
    margin-top: 43px
    margin-bottom: 43px

  .integration-card-2
    background-color: #1e252c
    padding: 1em

    &.rounded-xs.shadow
      border-radius: 12px
      box-shadow: inset 0 0 0 1px #272e35, 0 4px 8px -4px #101720

  .column-base
    z-index: 5
    grid-column-gap: 1em
    grid-row-gap: 1em
    grid-template-rows: auto
    grid-template-columns: 1fr
    grid-auto-columns: 1fr
    justify-items: start
    display: grid
    position: relative

  .row-sm
    grid-column-gap: .5em
    grid-row-gap: .5em
    grid-template-rows: auto
    grid-template-columns: auto
    grid-auto-columns: auto
    grid-auto-flow: column
    justify-content: start
    display: grid

    &.items-center
      align-items: center

  .avatar-md
    object-fit: cover
    border-radius: 9999px
    justify-content: center
    align-items: center
    width: 2.25em
    height: 2.25em
    display: flex

  h6
    color: white
    letter-spacing: 1px
    text-transform: uppercase
    margin-top: 0
    margin-bottom: 0
    font-size: 14px
    font-weight: 500
    line-height: 150%
    font-weight: bold
@media screen and (max-width: 767px)
  .integrations-4x
    grid-template-columns: 1fr !important
  h1
    font-size: 50px !important
  p
    font-size: 16px !important
  h2
    font-size: 32px !important
  ._12-col-grid.vault
    flex-direction: column
    display: flex
  .w-tab-link
    display: block

  .tabs-menu-side-link
    padding-top: 1em
    padding-left: 1em
    padding-right: 1em
    padding-top: .7em
    padding-bottom: .7em
  .tabs-horizontal
    grid-template-columns: 1fr
</style>
