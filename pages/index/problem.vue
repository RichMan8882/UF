<script lang="ts" setup></script>

<template>
  <div class="content">
    <div class="wrapper privacy-policy">
      <h1 class="align-left">{{ $lang('常見問題') }}</h1>
      <h2>{{ $lang('建立帳戶') }}</h2>
      <div class="terms-of-use align-left">
        <ul>
          <h3><strong>Q：</strong>{{ $lang('怎麼進行帳戶驗證呢?') }}</h3>
          <li>
            <strong>A：</strong
            >{{
              $lang(
                '投資者可在登入交易所後,點選「用戶中心」-「實名認證」,依照提示所需提交的相關證明資料進行驗證作業。'
              )
            }}
          </li>
          <h3>
            <strong>Q：</strong
            >{{ $lang('需要提供什麼證明文件完成身份驗證呢?') }}
          </h3>
          <li>
            <strong>A：</strong
            >{{
              $lang(
                '在網上建立帳戶後,依照監管要求,投資者需要提交相關證明文件完成身份驗證作業程序請參閱下列證明文件類型:'
              )
            }}
            1、{{
              $lang(
                '身分證件證件必需可辨認、不反光，並清晰地顯示的姓名全名，出生日期，如有不完整意或者是反光系統將自動退件。'
              )
            }}
          </li>
        </ul>
      </div>
      <h2>{{ $lang('提款疑問') }}</h2>
      <div class="terms-of-use align-left">
        <h3><strong>Q：</strong>{{ $lang('能夠透過哪些途徑來提款呢?') }}</h3>
        <p>
          A：{{
            $lang(
              '依據投資者的存款記錄和我們的平台政策,投資者大致上可透過下列方法收到款項:'
            )
          }}
        </p>
        <p>
          1、{{
            $lang('銀行卡 : GMT+8 當日16:00前提交的提款申請將會在當日收到款項;')
          }}
        </p>
        <p>
          2、{{
            $lang('銀行帳户 : GMT+8 當日16:00前提交的提款申請將會在當日收款項;')
          }}
        </p>
        <p>
          {{
            $lang(
              '請注意 : 台灣顧客在台灣時間15:00前提交的提款申請將會在當日收到款項;'
            )
          }}
        </p>
        <p>
          {{ $lang('而在當日其餘時間的提款申請將會順延至下一個交易日辦理。‍') }}
        </p>
        <h3>
          <strong>Q：</strong>{{ $lang('如果還沒有收到款項應該怎麼做呢?') }}
        </h3>
        <p>
          A：{{
            $lang(
              '當我們完成處理投資者的提款申請後,提取的狀態將會顯示為「已完成」，而在狀態變更的當日，資金將會匯入投資者連結的銀行帳戶或銀行卡內；'
            )
          }}
        </p>
        <p>
          {{
            $lang(
              '具體時間因不同銀行而異，如果投資者仍未收到款項，請投資者與客服人員洽詢跟進。'
            )
          }}
        </p>
      </div>
      <h2>{{ $lang('費用疑問') }}</h2>
      <div class="terms-of-use align-left">
        <h3><strong>Q：</strong>{{ $lang('存款時會被收取任何手續費嗎?') }}</h3>
        <p>
          A：{{
            $lang(
              '我們不會收取投資者在存款時的任何費用，在基礎貨幣不同的個別情況下，支付通道或中轉銀行可能會隨投資者所選的支付方式而採用不同的匯率標準。投資者可登入自己的交易帳號，點選「置入資產」查閱細則並聯絡我們選擇自己心儀的支付方式'
            )
          }}
        </p>
        <h3>
          <strong>Q：</strong>{{ $lang('我在提款時被收取任何的手續費嗎?') }}
        </h3>
        <p>
          A：{{
            $lang(
              '一般來講，我們不會收取投資者任何的提款費用，但需要注意在下列的特殊情況除外:'
            )
          }}
        </p>
        <div class="terms-of-use align-left">
          <ul>
            <li>
              1、{{
                $lang(
                  '單筆提款金額少於300美金或超過當日免費申請提款的最大次數限額(三次)，每筆超過免費提款次數限額的提款申請將會被統收取2美金的行政費用；'
                )
              }}
            </li>
            <li>
              2、{{
                $lang(
                  '投資者存款金額的50%(累計)未曾用於建倉交易或在最近一次存款後未曾進行任何的建倉交易，在這種情況下，提款時將會被統一收取提款金額1%的行政費用;'
                )
              }}
            </li>
            <li>
              3、{{
                $lang(
                  '我們恕不接納使用第三方名義的存款行為,在發現非本我們將會退還所存入之款項並品全部類別行政費用；'
                )
              }}
            </li>
          </ul>
        </div>
        <p>{{ $lang('如欲了解更多,請與客服人員洽詢以獲取進一步協助。') }}</p>
        <h3>
          <strong>Q：</strong>{{ $lang('使用平台會被收取任何的手續費嗎?') }}
        </h3>
        <p>
          A：{{
            $lang(
              '我們是全面性免佣金的交易平台，我們只收取極低點差作為交易費用。依據投資者的實際情況，投資者或需支付額外產生的費用,例如：隔夜利息。'
            )
          }}
        </p>
      </div>
      <h2>{{ $lang('交易術語疑問') }}</h2>
      <div class="terms-of-use align-left">
        <h3>
          <strong>Q：</strong
          >{{ $lang('什麼是點差呢?點差費又是怎麼收取的呢?') }}
        </h3>
        <p>
          A：{{
            $lang(
              '點差就是買入價跟賣出價之間的差值。點差是交易者的成本,僅在建倉時進行一次性的收取，平倉不會收取任何費用。點差的計算公式為:(做多價一做空價)x契約規格x交易口數'
            )
          }}
        </p>
        <h3><strong>Q：</strong>{{ $lang('為什麼點差是浮動的呢?') }}</h3>
        <p>
          A：{{
            $lang(
              '我們採取的是浮動點差,點差會隨著整個市場的流動性和行情波動而變化。實際收取的點差將會視乎投資者交易的產品而定,具體來講依照交易平台顯示的實時點差為準。'
            )
          }}
        </p>
        <h3><strong>Q：</strong>{{ $lang('什麼是止盈單和止損單呢?') }}</h3>
        <p>A：</p>
        <div class="terms-of-use align-left">
          <ul>
            <li>
              1、{{
                $lang(
                  '止盈單:止盈單可幫助投資者鎖定利潤。在投資者預設一個止盈單後,如市場價格達到投資者設定的觸發價格時,止盈單將會成為市價單,並以當時可執行的最優市場價格成交;'
                )
              }}
            </li>
            <li>
              2、{{
                $lang(
                  '止損單:止部單可幫助投資者減少損失。在投資者預設一個止損單後,如市場價格達到投資者設定的觸發價格時,止損單將會成為市價單,並以當時可執行的最後市場價格成交。'
                )
              }}
            </li>
          </ul>
        </div>
        <p>
          {{
            $lang(
              '請注意:任何訂單(包括止盈、止損等)均可能因為市場狀況的波動,受跳空的影響,而未必在預定的價格執行。如遇此情況,訂單會依照市場下一個最有利的價格執行。此外,投資者可在訂單被執行之前的交易時間內,隨時更改或取消各種訂單的設置,唯需符合我們對設置訂單的要求。'
            )
          }}
        </p>
      </div>
      <h2>{{ $lang('資金安全規範') }}</h2>
      <div class="terms-of-use align-left">
        <h3>
          <strong>Q：</strong
          >{{ $lang('存入帳戶內的資金會被用作交易以外的用途嗎?') }}
        </h3>
        <p>
          A：{{
            $lang(
              '不會。所有投資者的存款依照監管法規,在必要時單獨存在放在信託帳戶當中。'
            )
          }}
        </p>
        <p>
          {{
            $lang(
              '當我們在投資者款項帳戶提存資金或作出任何支付時嚴格遵守監管法規中關於顧客款項的規章。詳情可閱覽我們的隱私聲明。'
            )
          }}
        </p>
        <h3><strong>Q：</strong>{{ $lang('合法嗎?') }}</h3>
        <p>
          A：{{
            $lang(
              '我們完全符合相關公司法與金融監管法律規範,經相關監管機構授權並受嚴格監管的金融服務提供商。'
            )
          }}
        </p>
        <p>
          {{
            $lang(
              '我們依照監管方的嚴格要求為投資者的資金安全提供全面及完善的保障。'
            )
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.content
  padding-top: 80px
  background-image: radial-gradient(circle at 23% -51%, rgba(255, 67, 62, 0.4) 33%, rgba(255, 255, 255, 0) 40%)
  color: #bebebe
  font-family: Neue Montreal, sans-serif
  font-size: 18px
  line-height: 155%
.wrapper
  justify-content: space-between
  align-items: center
  width: 85%
  max-width: 1280px
  margin-left: auto
  margin-right: auto
  display: flex
  position: relative

  &.privacy-policy
    text-align: left
    flex-direction: column
    justify-content: center
    align-items: flex-start
    padding-top: 75px

h1
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

.align-left
  text-align: left
  flex-direction: column
  align-items: flex-start
  display: flex
  text-align: left
  flex-direction: column
  align-items: flex-start
  display: flex
  margin-bottom: 20px

.terms-of-use p
  color: #7a8386
  margin-top: 16px

h2
  color: white
  margin-top: 0
  margin-bottom: 0
  font-family: Neue Montreal, sans-serif
  font-size: 5ch
  font-weight: 700
  line-height: 1.3em

h3
  color: white
  letter-spacing: -.4px
  margin-top: 0
  margin-bottom: 0
  font-family: Neue Montreal, sans-serif
  font-size: 32px
  font-weight: 500
  line-height: 159%

ul, ol
  // margin-top: 20px
  // margin-bottom: 40px
  padding-left: 40px

.terms-of-use li
  color: #7a8386
  margin-top: 10px
  padding-bottom: 10px
  font-size: 16px
  list-style-type: disc
@media screen and (max-width: 479px)
  h1
    letter-spacing: -2px
    font-size: 50px

  h2
    font-size: 32px

  h3
    font-size: 27px
</style>
