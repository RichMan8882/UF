<script lang="ts" setup>
// import
const { t } = useI18n()
const siteStore = useSiteStore()
const PlayerStore = usePlayerStore()
const orderStore = useOrderStore()
const { queryKlines, queryRounds, queryOrder, bet } = useGameStore()
const { getListenkey } = PlayerStore
const { locale } = useI18n()
const lang = locale.value
const { queryInstruction, queryNews } = useSiteStore()
const router = useRouter()
const timeoutId = ref(null)
const hourDegrees = ref(0)
const minuteDegrees = ref(0)
const secondDegrees = ref(0)
// data
const coinBoxChecked = ref(false)
const record = ref({
  title: t('當前委託'),
  type: 'currentOrder',
  search: true
})
const search = ref({
  symbol: '',
  roundNo: '',
  dateRangeStart: '',
  dateRangeEnd: '',
  limit: 60,
  page: 1,
  pageSize: 100
})
const showToolPopup = ref(false)
const symbol = ref('')
const symbolData: any = ref(null)
const availableCurrency: any = ref([])
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const socket: any = ref(null)
const socketConnected = ref(false)
const betData = ref({
  playerId: PlayerStore.playerInfo.id,
  option: [],
  amount: '',
  roundNo: ''
})
const recordList = ref([])
const historyRecordList = ref([])
// 圖表數據值
const nowTimestamp: any = ref(null)
const socketNewPrice: any = ref(null)
const isFirstGet = ref(true)
const createChartData = ref(null)
const socketCurrentRoundCountdown = ref(0)
const news = ref(null)
const rule = ref(null)
const disableBet = ref(false)
const currentSelectSymbolPrice = ref(0)
const playerWalletBalance = computed(() => {
  const findWallet = PlayerStore.playerInfo.wallet.find(
    (wallet: any) => wallet.type === 1
  )
  if (findWallet) {
    return Number(findWallet.balance)
  } else {
    return 0
  }
})
const selectSymbol = (value: any) => {
  symbol.value = value.symbol
  symbolData.value = value.symbolData
  closeWebSocket()
  document.getElementById('coinBox').checked = false
}

// method
const goPopup = async (title: string) => {
  console.log('recordList', recordList)
  record.value.title = title
  showToolPopup.value = true
  search.value.symbol = symbol.value
  // 確認order數據

  if (title === t('當前委託')) {
    orderList.value = socketOrderList.value.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    record.value.type = 'currentOrder'
    record.value.search = true
    return
  }
  if (title === t('歷史倉位')) {
    orderList.value = socketOrderList.value.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    record.value.type = 'historyOrder'
    record.value.search = true
    return
  }
  if (title === t('歷史盤口')) {
    record.value.type = 'historyRecord'
    const response = await queryRounds({
      symbol: symbol.value,
      limit: 60,
      page: 1,
      pageSize: 100
    })
    console.log('queryRounds', response.data.result)
    historyRecordList.value = response.data.result.filter((item: any) => {
      return Number(item.roundNo) < Number(betData.value.roundNo)
    })
    console.log('betData.value.roundNo', betData.value.roundNo)
    console.log('queryRounds', historyRecordList.value)
    record.value.search = true
    return
  }
  if (title === t('瞭解USDT')) {
    record.value.type = 'announcement'
    record.value.search = false
    return
  }
  if (title === t('規則簡介')) {
    record.value.type = 'rule'
    record.value.search = false
  }
}
const closePopup = () => {
  showToolPopup.value = false
}
const connectRecordList = computed(() => {
  const title = record.value.type
  switch (title) {
    case 'currentOrder':
      orderList.value = socketOrderList.value
        .filter((item: any) => item.status === 0)
        .sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        })
      return orderList.value
    case 'historyOrder':
      orderList.value = socketOrderList.value
        .filter((item: any) => item.status === 1)
        .sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        })
      return orderList.value
  }
})
const addBetGameType = (type: string) => {
  if (betData.value.option.includes(type)) {
    betData.value.option = betData.value.option.filter((item) => item !== type)
  } else {
    betData.value.option.push(type)
  }
  console.log(betData.value.option)
}
const checkBetData = () => {
  if (!disableBet.value) {
    disableBet.value = true
    try {
      betData.value.productId = symbolData.value.id
      console.log(betData.value)
      const pairData = symbolData.value
      console.log('pairData', pairData)
      // banned action
      if (pairData.banned) {
        ElNotification({
          message: pairData.notice,
          type: 'error',
          showClose: false
        })
        return
      }
      // banned player
      const bannedPlayer = pairData.bannedPlayers.find(
        (item: any) => item.playerId === PlayerStore.playerInfo?.id
      )
      if (bannedPlayer) {
        if (bannedPlayer.banned) {
          ElNotification({
            message: bannedPlayer.reason,
            type: 'error',
            showClose: false
          })
          return
        }
      }
      if (betData.value.amount === '') {
        ElNotification({
          message: `${t('請輸入下單金額')}`,
          type: 'error',
          showClose: false
        })
        return
      }
      if (betData.value.option.length === 0) {
        ElNotification({
          message: `${t('請選擇參與遊戲模式')}`,
          type: 'error',
          showClose: false
        })
        return
      }
      if (
        parseFloat(betData.value.amount) < symbolData.value.config.minBetAmount
      ) {
        ElNotification({
          message: ` ${t('最低交易金額為')} $ ${symbolData.value.config.minBetAmount}`,
          type: 'error',
          showClose: false
        })
        return
      }
      if (
        parseFloat(betData.value.amount) > symbolData.value.config.maxBetAmount
      ) {
        ElNotification({
          message: `${t('最高交易金額為')} $ ${symbolData.value.config.maxBetAmount}`,
          type: 'error',
          showClose: false
        })
        return
      }
      setTimeout(
        async () => {
          betData.value.amount = betData.value.amount.toString()
          const response = await bet(betData.value)
          console.log('bet response', response)
          if (response.success) {
            ElMessageBox.alert(
              `
               <p style="margin:0 0 8px 0"> ${t('交易期別')}: ${response.data.roundNo} </p>
               <p style="margin:0 0 8px 0"> ${t('交易金額')}: ${response.data.amount} </p>
               <p style="margin:0 0 8px 0"> ${t('交易期別')}: ${gameOptionNameList(
                 response.data.option
               )} </p>
               <p style="margin:0 0 8px 0"> ${t('時間')}: ${formatDate(
                 response.data.openAt
               )} </p>
             `,
              `${t('下單成功')}`,
              {
                confirmButtonText: `${t('確認')}`,
                center: true,
                dangerouslyUseHTMLString: true
              }
            )
          } else {
            // ElNotification({
            //   title: response.message,
            //   type: 'error',
            //   showClose: false
            // })
          }
          clearBetData()
          await PlayerStore.fetchInfo()
        },
        bannedPlayer ? (bannedPlayer.delay + 1) * 1000 : 1000
      )
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        disableBet.value = false
      }, 3000)
    }
  }
}
const gameOptionOdd = (type: number) => {
  switch (type) {
    case 0:
      return symbolData.value
        ? symbolData.value.config.option[0].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 1:
      return symbolData.value
        ? symbolData.value.config.option[1].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 2:
      return symbolData.value
        ? symbolData.value.config.option[2].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 3:
      return symbolData.value
        ? symbolData.value.config.option[3].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 4:
      return symbolData.value
        ? symbolData.value.config.option[4].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 5:
      return symbolData.value
        ? symbolData.value.config.option[5].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 6:
      return symbolData.value
        ? symbolData.value.config.option[6].odds * 100 + '%'
        : 0.1 * 100 + '%'
    default:
      return ''
  }
}

const showOption = (type: number) => {
  switch (type) {
    case 0:
      return symbolData.value ? symbolData.value.config.option[0].isOpen : false
    case 1:
      return symbolData.value ? symbolData.value.config.option[1].isOpen : false
    case 2:
      return symbolData.value ? symbolData.value.config.option[2].isOpen : false
    case 3:
      return symbolData.value ? symbolData.value.config.option[3].isOpen : false
    case 4:
      return symbolData.value ? symbolData.value.config.option[4].isOpen : false
    case 5:
      return symbolData.value ? symbolData.value.config.option[5].isOpen : false
    case 6:
      return symbolData.value ? symbolData.value.config.option[6].isOpen : false
    default:
      return true
  }
}

const clearBetData = () => {
  betData.value = {
    playerId: PlayerStore.playerInfo.id,
    productId: '',
    option: [],
    amount: '',
    roundNo: ''
  }
  document.getElementById('game-1').checked = false
  document.getElementById('game-2').checked = false
  document.getElementById('game-3').checked = false
  document.getElementById('game-4').checked = false
  document.getElementById('game-5').checked = false
  document.getElementById('game-6').checked = false
  document.getElementById('game-7').checked = false
}

const initMilliseconds = (timestamp: any) => {
  const newDate = new Date(timestamp)
  newDate.setMilliseconds(0)
  return newDate.getTime()
}

const randomVolume = () => {
  return parseFloat((Math.random() * 100 + 1).toFixed(2))
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const gameOptionNameList = (list: Array) => {
  const result = []
  list.forEach((item) => {
    result.push(gameOptionName(item))
  })
  return result.join(', ')
}
const gameOptionName = (type: Number) => {
  switch (type) {
    case 0:
      return `${t('高')}`
    case 1:
      return `${t('低')}`
    case 2:
      return `${t('單')}`
    case 3:
      return `${t('雙')}`
    case 4:
      return `${t('看漲')}`
    case 5:
      return `${t('看跌')}`
    case 6:
      return `${t('反指標')}`
    default:
      return ''
  }
}
const gameResultName = (type: Number) => {
  // 0 : 高、1 : 低、2 : 單、3 : 雙、4 : 漲、5 : 看跌 6 : 合
  switch (type) {
    case 0:
      return `${t('高')}`
    case 1:
      return `${t('反指標')}`
    case 2:
      return `${t('單')}`
    case 3:
      return `${t('雙')}`
    case 4:
      return `${t('看漲')}`
    case 5:
      return `${t('看跌')}`
    case 6:
      return `${t('和')}`
    default:
      return `${t('未知')}`
  }
}
const getChartData = async (timestamp: any) => {
  // 取得遠端資料
  // 取 3 分鐘的資料
  const now = new Date(nowTimestamp.value)
  now.setSeconds(0, 0)
  now.setMinutes(now.getMinutes() - 3)
  const startTime = now.getTime()
  const endTime = timestamp
  // const data = {
  //   symbol: symbol.value,
  //   interval: '1',
  //   startTime,
  //   endTime
  // }
  // console.log(symbolData.value)
  const data = {
    productId: symbolData.value.id
  }
  const klineData = await queryKlines(data)
  if (klineData.success) {
    isFirstGet.value = false // 第一次獲取開關關閉
    const { result } = klineData.data
    // console.log('klines', result)
    const newKLines = Object.entries(result).map(([timestamp, value]) => {
      const volume = randomVolume()
      const turnover = Number(value.close) * volume
      return {
        timestamp: Number(timestamp) * 1000,
        open: Number(value.open),
        close: Number(value.close),
        high: Number(value.high),
        low: Number(value.low),
        volume,
        turnover
      }
    })
    createChartData.value = { newKLines, time: timestamp }
    console.log('createChartData.value', createChartData.value)
  }
}

const searchOrder = async () => {
  const startDate = new Date(search.value.dateRangeStart)
  search.value.dateRangeStart = startDate.getTime()
  const endDate = new Date(search.value.dateRangeEnd)
  search.value.dateRangeEnd = endDate.getTime()
  console.log('searchOrder', search.value)
  if (!search.value.dateRangeStart) {
    delete search.value.dateRangeStart
  }
  if (!search.value.dateRangeEnd) {
    delete search.value.dateRangeEnd
  }
  if (record.value.type !== 'historyRecord') {
    const response = await queryOrder(search.value)
    if (response.success) {
      orderList.value = response.data.result
    } else {
      ElNotification({
        message: response.message,
        type: 'error'
      })
    }
  } else {
    // 搜尋盤口
    const response = await queryRounds(search.value)
    if (response.success) {
      historyRecordList.value = response.data.result
    } else {
      ElNotification({
        message: response.message,
        type: 'error'
      })
    }
  }
  search.value.dateRangeStart = ''
  search.value.dateRangeEnd = ''
  search.value.roundNo = ''
}

const pickerOptions = {
  daterange: {
    maxTime: '', // 最大日期
    minTime: '', // 最小日期
    max: 30 // 限制范围 30天
  }
}
const disabledDate = (time) => {
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
  return time.getTime() < threeMonthsAgo.getTime()
}

const productList: any = ref([])

const orderList: any = ref([])
const socketOrderList: any = ref([])
const ogOrderList: any = ref(null)
// ctyptoData
const reconnected = ref(true)
const closeWebSocket = async () => {
  if (socket.value) {
    socket.value.close()
  }
}

const sendMessage = (msg: any) => {
  // send message to server
  socket.value.send(JSON.stringify(msg))
}

// 連接 socket
const startConnectWebSocket = async () => {
  const getListenkeyRes = await getListenkey()
  console.log('getListenkeyRes', getListenkeyRes)
  const runtimeConfig = useRuntimeConfig()
  const { SOCKETBASE } = runtimeConfig.public
  socket.value = new WebSocket(
    `${SOCKETBASE}/${getListenkeyRes.data.listenkey}`
  )
  socket.value.onopen = (event) => {
    // console.log('Connected to socket', event)
    socketConnected.value = true
    sendMessage({
      op: 'subscribe',
      channel: ['kline', 'order', 'product']
    })
  }
  socket.value.onmessage = async (e) => {
    const message = JSON.parse(e.data)
    // console.log('收到來自 socket 的訊息', message);
    const { event, data } = message
    switch (event) {
      case 'PRODUCT_UPDATE': {
        // console.log('PRODUCT_UPDATE', data)
        productList.value = data.result
        if (symbolData.value === null) {
          symbol.value = productList.value[0].symbol
          symbolData.value = productList.value[0]
        }
        break
      }
      case 'ORDER_UPDATE': {
        // console.log('ORDER_UPDATE', data)
        socketOrderList.value = data.result
      }
      case 'KLINE_UPDATE': {
        // console.log('KLINE_UPDATE', data)
        if (productList.value.length > 0) {
          productList.value.forEach((item: any) => {
            const findSystemPrice = data.result.find(
              (socketData: any) => socketData.symbol === item.symbol
            )
            // console.log('findSystemPrice', findSystemPrice)

            const currency = availableCurrency.value.find(
              (currency: any) => currency.symbol === item.symbol
            )
            if (currency) {
              currency.price.push({
                open: parseFloat(
                  currency.price[currency.price.length - 1].close
                ),
                close: findSystemPrice.price
                  ? parseFloat(findSystemPrice.price.close)
                  : 0
              })
            } else {
              availableCurrency.value.push({
                symbol: item.symbol,
                price: [
                  {
                    open: findSystemPrice.price
                      ? parseFloat(findSystemPrice.price.open)
                      : 0,
                    close: findSystemPrice.price
                      ? parseFloat(findSystemPrice.price.close)
                      : 0
                  }
                ],
                symbolData: item
              })
            }
          })
        }

        // 圖表列表數據
        const { timestamp: correctTimestamp } = message
        const lastTimestamp = Math.floor(nowTimestamp.value / 1000)
        if (lastTimestamp !== Math.floor(correctTimestamp / 1000)) {
          const timestamp = initMilliseconds(correctTimestamp)
          nowTimestamp.value = timestamp
          const symbolData = data.result.find(
            (item) => item.symbol === symbol.value
          )
          // console.log('symbol.value', symbol.value)
          // console.log('symbolData', symbolData)
          // 已選擇數據整理
          if (symbolData) {
            const { price } = symbolData
            // 數據整理
            let newPrice = Object.entries(price).reduce((acc, [key, value]) => {
              acc[key] = parseFloat(value)
              return acc
            }, {})
            const volume = randomVolume()
            const turnover = newPrice.close * volume
            newPrice = {
              timestamp,
              ...newPrice,
              turnover,
              volume
            }
            socketNewPrice.value = newPrice

            // 第一次取得所有數據 & 產生空資料
            if (isFirstGet.value) getChartData(timestamp)

            // currentSelectSymbolPrice
            currentSelectSymbolPrice.value = price.close
          }
        }
        break
      }
      case 'SERVER_TIME': {
        const {
          currentRoundId,
          currentRoundCountdown,
          allowBetRoundId,
          allowBetRoundCountdown
        } = data
        betData.value.roundNo = allowBetRoundId
        socketCurrentRoundCountdown.value = allowBetRoundCountdown
        // console.log(data);
        if (currentRoundCountdown === 59) {
          await PlayerStore.fetchInfo()
          // const queryOrderRes = await orderStore.queryOrder({
          //   pair: symbol.value
          // })
          // recordList.value = queryOrderRes.data.result
        }
        break
      }
      default:
        break
    }
  }
  socket.value.onclose = async () => {
    console.log('Disconnected from socket')
    isFirstGet.value = true
    socketConnected.value = false
    if (reconnected) {
      await startConnectWebSocket()
      console.log('reconnected to socket')
    }
  }

  socket.value.onerror = (error) => {
    socketConnected.value = false
    console.error('WebSocket error:', error)
  }
}
// 更新時鐘的函數
const updateClock = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  hourDegrees.value = (hours % 12) * 30 + minutes * 0.5
  minuteDegrees.value = minutes * 6
  secondDegrees.value = seconds * 6
}

// 初次呼叫更新時鐘
updateClock()

// 定義一些狀態變數和函數
const currentTime = ref('')
const countdown60 = ref(60)
const countdown70 = ref(70)
const inputValue = ref(50)
const counting = ref({
  ers: 33.71,
  sers: 3.3,
  ber: 400,
  es: 70
})

const updateCountingNumber = (value, min, max, fixed) => {
  counting.value[value] = parseFloat(
    (Math.random() * (max - min) + min).toFixed(fixed)
  )
}

// 更新當前時間的函數
const updateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}

// 更新 60 秒倒數計時的函數
const updateCountdown60 = () => {
  if (countdown60.value > 0) {
    countdown60.value--
  } else {
    countdown60.value = 60
  }
}

// 更新 70 秒倒數計時的函數
const updateCountdown70 = () => {
  if (countdown70.value > 0) {
    countdown70.value--
  } else {
    countdown70.value = 70
  }
}

const ersTimer = ref('')
const sersTimer = ref('')
const berTimer = ref('')
const esTimer = ref('')

// 組件掛載時設置計時器並更新時間和倒數計時
await onMounted(async () => {
  await startConnectWebSocket()

  const pair = symbol.value
  const type = 'game'
  const path = 'game'
  /** await Promise then  */
  // 開始加載數據（此處沒有使用 await，因此主線程不會被阻塞）
  const queryInstructionPromise = queryInstruction(lang, type)
  const queryNewsPromise = queryNews(lang, path)
  // 使用 .then() 方法處理異步任務結果
  queryInstructionPromise
    .then((queryInstructionRes) => {
      // 處理響應結果
      rule.value = queryInstructionRes.data
    })
    .catch((error) => {
      console.error('Error loading instruction data:', error)
    })

  queryNewsPromise
    .then((queryNewsRes) => {
      // 處理響應結果
      news.value = queryNewsRes.data
    })
    .catch((error) => {
      console.error('Error loading news data:', error)
    })
  /** await Promise then  */

  const resetTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId.value)
    }
    timeoutId.value = setTimeout(
      () => {
        navigateTo('/user')
      },
      siteStore.siteData?.gameCenterOutInterval
        ? siteStore.siteData?.gameCenterOutInterval * 60 * 1000
        : 5 * 60 * 1000
    ) // 5 分钟
  }
  window.onload = resetTimer
  window.onmousemove = resetTimer
  window.onmousedown = resetTimer
  window.ontouchstart = resetTimer
  window.onclick = resetTimer
  window.onscroll = resetTimer
  window.onkeypress = resetTimer

  updateTime()

  ersTimer.value = setInterval(
    () => updateCountingNumber('ers', 30, 50, 2),
    1000
  )
  sersTimer.value = setInterval(
    () => updateCountingNumber('sers', 3, 8, 1),
    1000
  )
  berTimer.value = setInterval(
    () => updateCountingNumber('ber', 400, 600, 1),
    1000
  )
  esTimer.value = setInterval(() => updateCountingNumber('es', 70, 90, 1), 1000)
})

// 組件卸載時清除計時器
onUnmounted(() => {})

onBeforeUnmount(() => {
  clearInterval(ersTimer)
  clearInterval(sersTimer)
  clearInterval(berTimer)
  clearInterval(esTimer)
  reconnected.value = false
  // console.log('closeWebSocket', reconnected.value)
  closeWebSocket()
})

// 處理加法按鈕事件的函數
const addToInput = (value) => {
  betData.value.amount = value
}

const cryptoSelect = ref(false)
const openCryptoSelect = () => {
  cryptoSelect.value = !cryptoSelect.value
}
const cryptoName = (crypto) => {
  switch (crypto.symbol) {
    case 'BTCUSDT':
      return '太陽能'
    case 'WFEURUSD':
      return '風能'
    case 'WFGBPUSD':
      return '地熱能'
    case 'WFUSDTWD':
      return '海洋能'
    default:
      return crypto.label || crypto.name || crypto.symbol
  }
}
// action methods
const symbolChange = (symbol: string) => {
  switch (symbol) {
    case 'BTCUSDT':
      return '太陽能'
    case 'WFEURUSD':
      return '風能'
    case 'WFGBPUSD':
      return '地熱能'
    case 'WFUSDTWD':
      return '海洋能'
    default:
      return ''
  }
}
const betFormatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'k'
  } else {
    return num.toString()
  }
}
const betAmountsList = computed(() => {
  if (symbolData.value) {
    return symbolData.value.config.betAmount
  } else {
    return []
  }
})

const checkSymbolTV = (value) => {
  switch (value) {
    case 'COZCA0':
      return true
    case 'COZSA0':
      return true
    case 'COZWA0':
      return true
    case 'LEAHD3M':
      return false
    case 'LECAD3M':
      return false
    case 'LENID3M':
      return false
    case 'LEPBD3M':
      return false
    case 'LESND3M':
      return false
    case 'LEZSD3M':
      return false
    case 'NECLA0':
      return true
    case 'NEHOA0':
      return true
    case 'NENGA0':
      return true
    case 'NENGA0':
      return true
    case 'WFAUDUSD':
      return true
    case 'WFEURGBP':
      return true
    case 'WFEURUSD':
      return true
    case 'WFGBPJPY':
      return true
    case 'WFGBPUSD':
      return true
    case 'WFUSDCAD':
      return true
    case 'WFUSDCNY':
      return true
    case 'WFUSDHKD':
      return true
    case 'WFUSDJPY':
      return true
    case 'WFUSDTWD':
      return true
    default:
      return true
  }
}
</script>

<template>
  <div id="Base_Member" class="page">
    <div class="head">
      <div class="logo" @click="navigateTo(`/`)">
        <img :src="siteStore.siteData.logo" />
        <!-- <div class="title">{{ siteStore.siteData.gameName }}</div> -->
      </div>
      <div class="userInfo">
        <div class="name">{{ PlayerStore.playerInfo.username }}</div>
        <div class="wallet"></div>
        <b> {{ new Intl.NumberFormat('zh-TW').format(playerWalletBalance) }}</b>
      </div>
    </div>
    <div class="body">
      <input
        id="coinBox"
        type="checkbox"
        hidden="hidden"
        :checked="coinBoxChecked"
      />
      <div class="bodyLeft">
        <div class="leftItem" @click="goPopup(t('當前委託'))">
          <i class="fas fa-clipboard-list"></i>
          <div>{{ $lang('當前委託') }}</div>
        </div>
        <div class="leftItem" @click="goPopup(t('歷史倉位'))">
          <i class="fas fa-history"></i>
          <div>{{ $lang('歷史倉位') }}</div>
        </div>
        <!-- <div class="leftItem" @click="goPopup(t('歷史盤口'))">
          <i class="fas fa-award"></i>
          <div>{{ $lang('歷史盤口') }}</div>
        </div> -->
        <div class="leftItem" @click="goPopup(t('瞭解USDT'))">
          <i class="fas fa-bullhorn"></i>
          <div>{{ $lang('瞭解USDT') }}</div>
        </div>
        <div class="leftItem" @click="goPopup(t('規則簡介'))">
          <i class="fas fa-question-circle"></i>
          <div>{{ $lang('規則簡介') }}</div>
        </div>
        <label for="coinBox" class="leftItem rankBtn"
          ><i class="fas fa-chart-bar"></i>
          <div>{{ $lang('交易類別') }}</div></label
        >
      </div>
      <div id="TempPage" class="tempPage">
        <div class="chartSection">
          <div v-if="checkSymbolTV(symbol)" class="chart">
            <gameChart
              :symbol="symbol"
              :symbol-data="symbolData"
              :socket-new-price="socketNewPrice"
              :create-chart-data="createChartData"
              :now-timestamp="nowTimestamp"
              :socket-current-round-countdown="socketCurrentRoundCountdown"
              :round-no="betData.roundNo"
            ></gameChart>
          </div>
          <div v-if="checkSymbolTV(symbol)" class="k-line-box">
            <gameTvWidgetGe :symbol="symbol" />
          </div>
          <gameChart
            v-else
            :symbol="symbol"
            :symbol-data="symbolData"
            :socket-new-price="socketNewPrice"
            :create-chart-data="createChartData"
            :now-timestamp="nowTimestamp"
            :socket-current-round-countdown="socketCurrentRoundCountdown"
            :round-no="betData.roundNo"
          ></gameChart>
        </div>
        <div class="controlBlock">
          <div class="containerRow">
            <div data-event="1" data-inputrow="" class="centerRow">
              <input
                id="game-1"
                name="game-1"
                type="checkbox"
                hidden="hidden"
                class="gameType"
              />
              <input
                id="game-2"
                name="game-2"
                type="checkbox"
                hidden="hidden"
                class="gameType"
              />
              <input
                id="game-3"
                name="game-3"
                type="checkbox"
                hidden="hidden"
                class="gameType"
              />
              <input
                id="game-4"
                name="game-4"
                type="checkbox"
                hidden="hidden"
                class="gameType"
              />
              <input
                id="game-5"
                name="game-5"
                type="checkbox"
                hidden="hidden"
                class="gameType"
              />
              <input
                id="game-6"
                name="game-6"
                type="checkbox"
                hidden="hidden"
                class="gameType"
              />
              <input
                id="game-7"
                name="game-7"
                type="checkbox"
                hidden="hidden"
                class="gameType"
              />
              <div style="margin-left: 20px">
                {{ $lang('交易時間') }}: {{ betData.roundNo }}
              </div>
              <div style="margin-left: 20px">
                {{ $lang('買入倒計時') }}: {{ socketCurrentRoundCountdown }}s
              </div>
              <div class="leftBox">
                <label
                  v-if="showOption(0)"
                  for="game-1"
                  class=""
                  @click="addBetGameType(0)"
                  ><span>{{ $lang('高') }}</span>
                  <span class="odds">{{ gameOptionOdd(0) }}</span></label
                >
                <label
                  v-if="showOption(2)"
                  for="game-3"
                  class=""
                  @click="addBetGameType(2)"
                  ><span>{{ $lang('單') }}</span>
                  <span class="odds">{{ gameOptionOdd(2) }}</span></label
                >
                <label
                  v-if="showOption(1)"
                  for="game-2"
                  class=""
                  @click="addBetGameType(1)"
                  ><span>{{ $lang('低') }}</span>
                  <span class="odds">{{ gameOptionOdd(1) }}</span></label
                >
                <label
                  v-if="showOption(3)"
                  for="game-4"
                  class=""
                  @click="addBetGameType(3)"
                  ><span>{{ $lang('雙') }}</span>
                  <span class="odds">{{ gameOptionOdd(3) }}</span></label
                >
                <label
                  v-if="showOption(4)"
                  for="game-5"
                  class=""
                  @click="addBetGameType(4)"
                  ><span>{{ $lang('看漲') }}</span>
                  <span class="odds">{{ gameOptionOdd(4) }}</span></label
                >
                <label
                  v-if="showOption(5)"
                  for="game-6"
                  class=""
                  @click="addBetGameType(5)"
                  ><span>{{ $lang('看跌') }}</span>
                  <span class="odds">{{ gameOptionOdd(5) }}</span></label
                >
              </div>
              <div class="rightBox">
                <label
                  v-if="showOption(6)"
                  for="game-7"
                  class=""
                  @click="addBetGameType(6)"
                  ><span>{{ $lang('反指標') }}</span>
                  <span class="odds">{{ gameOptionOdd(6) }}</span></label
                >
              </div>
            </div>
            <div class="bottomRow">
              <div class="totalBox">
                <label for="keyInput" class="inputBox"
                  ><span>{{ $lang('自行輸入金額') }}</span>
                  <div class="outerBtn hidden">
                    <i class="far fa-caret-square-up"></i>
                  </div>
                  <input
                    id="keyInput"
                    v-model="betData.amount"
                    v-trim-input
                    type="text"
                    name="totalView"
                    autocomplete="off"
                    data-min="1"
                    data-max="5000000"
                  />
                  <a class="mobileQuickSelect">
                    <input id="mobileQuickSelect" type="checkbox" hidden />
                    <label for="mobileQuickSelect">
                      <i class="fa-solid fa-caret-up"></i>
                    </label>
                    <div class="mobileQuickSelectPopup">
                      <label for="mobileQuickSelect">
                        <div class="selectContent">
                          <!-- <a @click="betData.amount = '100'">100</a>
                          <a @click="betData.amount = '1000'">1k</a>
                          <a @click="betData.amount = '10000'">10k</a>
                          <a @click="betData.amount = '1000000'">1M</a>
                          <a @click="betData.amount = '10000000'">10M</a> -->
                          <a
                            v-for="item in betAmountsList"
                            @click="betData.amount = `${Number(item)}`"
                          >
                            {{ betFormatNumber(item) }}
                          </a>
                        </div>
                      </label>
                    </div>
                  </a>
                </label>
                <div data-quickselect="" class="quickSelect">
                  <!-- <span @click="betData.amount = '100'">100</span>
                  <span @click="betData.amount = '500'">500</span>
                  <span @click="betData.amount = '800'">800</span> -->
                  <span
                    v-for="item in betAmountsList"
                    @click="betData.amount = `${Number(item)}`"
                    >{{ betFormatNumber(item) }}</span
                  >
                </div>
              </div>
              <div class="btnBlock">
                <button type="button" class="reBtn" @click="clearBetData()">
                  {{ $lang('取消') }}
                </button>
                <button
                  type="button"
                  class="checkBtn"
                  :disabled="disableBet"
                  @click="checkBetData()"
                >
                  {{ $lang('確定') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bodyRight">
        <input
          id="rightTab1"
          type="radio"
          name="bodyRightTab"
          hidden="hidden"
          :checked="true"
        />
        <input
          id="rightTab2"
          type="radio"
          name="bodyRightTab"
          hidden="hidden"
        />
        <div class="title">{{ $lang('交易類別') }}</div>
        <div class="rightTabRow">
          <label for="rightTab1" class="leftBorder">{{ $lang('即時') }}</label>
          <label for="rightTab2">{{ $lang('收盤') }}</label>
        </div>
        <div class="rightItemRow">
          <div class="rightItemList">
            <a
              v-for="item in availableCurrency"
              :key="item.symbol"
              class="rightItem"
              :class="{ active: symbol === item.symbol }"
              @click="selectSymbol(item)"
              ><span class="itemImg">
                <img :src="item.symbolData.icon" />
              </span>
              <span data-itemname="" class="itemName">{{
                item.symbolData.label ||
                item.symbolData.name ||
                item.symbolData.symbol
              }}</span>
              <span
                :data-type="
                  item.price[item.price.length - 1].close >
                  item.price[item.price.length - 1].open
                    ? 'up'
                    : 'down'
                "
                class="itemInfo"
                ><b class="now">{{
                  item.price[item.price.length - 1].close
                }}</b>
                <b class="last">{{
                  item.price[item.price.length - 1].close
                }}</b>
                <i class="fa-solid fa-angles-up"></i></span
            ></a>
          </div>
        </div>
      </div>
      <div v-if="showToolPopup" class="popup">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{ record.title }}</h2>
            <button type="button" data-dismiss="modal" @click="closePopup">
              {{ $lang('關閉') }}
            </button>
          </div>
          <div class="modal-body modal-body-sp">
            <div data-type="1" class="log">
              <div
                v-if="record.type !== 'announcement' && record.type !== 'rule'"
                class="searchRow"
              >
                <div class="coinSelect">
                  <select
                    v-model="search.symbol"
                    name="coin"
                    @change="searchOrder"
                  >
                    <option
                      v-for="item in availableCurrency"
                      :key="item.symbol"
                      :value="item.symbol"
                    >
                      {{
                        item.symbolData.label ||
                        item.symbolData.name ||
                        item.symbolData.symbol
                      }}
                    </option>
                  </select>
                </div>
                <label for="inputSearch" class="inputDate"
                  ><i class="fas fa-search"></i>
                  <input
                    id="inputSearch"
                    v-model="search.roundNo"
                    v-trim-input
                    type="text"
                    name="number"
                    :placeholder="`${$lang('請輸入交易時間')}`"
                /></label>
                <label for="dateStart" class="inputDate"
                  ><i class="fas fa-calendar-alt"></i>
                  <el-date-picker
                    v-model="search.dateRangeStart"
                    type="datetime"
                    :placeholder="`${$lang('起始時間')}`"
                    :default-time="defaultTime"
                    :disabled-date="disabledDate"
                  >
                  </el-date-picker>
                </label>
                <label for="dateEnd" class="inputDate"
                  ><i class="fas fa-calendar-alt"></i>
                  <el-date-picker
                    v-model="search.dateRangeEnd"
                    type="datetime"
                    :placeholder="`${$lang('結束時間')}`"
                    :default-time="defaultTime"
                    :disabled-date="disabledDate"
                  >
                  </el-date-picker>
                </label>
                <button type="button" class="searchBtn" @click="searchOrder">
                  {{ $lang('搜尋') }}
                </button>
              </div>
              <div class="dataBlock">
                <!-- currentOrder -->
                <div v-if="record.type === 'currentOrder'" class="modal-1">
                  <table>
                    <thead>
                      <tr>
                        <th>{{ $lang('時間/幣種') }}</th>
                        <th>{{ $lang('投注內容') }}</th>
                        <th>{{ $lang('投注金額') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in connectRecordList"
                        :key="index"
                      >
                        <td>
                          <div>{{ formatDate(item.createdAt) }}</div>
                          <div>
                            {{ item.label || item.name || item.symbol }}
                          </div>
                        </td>
                        <td>
                          <div>
                            {{ $lang('交易時間') }}:
                            <span>{{ item.roundNo }}</span>
                          </div>
                          <div>
                            {{ $lang('賠率') }}:
                            <span>{{ item.odds }}</span>
                          </div>
                          <div v-if="item.option.length > 0">
                            {{ $lang('內容') }}:
                            <span
                              v-for="optionItem in item.option"
                              :key="optionItem"
                              class="gameOptionSpan"
                              >{{ gameOptionName(optionItem) }}</span
                            >
                          </div>
                          <div v-else>
                            {{ $lang('內容') }}:
                            <span class="gameOptionSpan">
                              {{ gameOptionName(item.option) }}</span
                            >
                          </div>
                          <div>
                            {{ $lang('匯率') }}:
                            <span>{{
                              new Intl.NumberFormat('zh-TW', {
                                minimumFractionDigits: 4,
                                maximumFractionDigits: 6
                              }).format(
                                Number(item.originalRoundData.openPrice)
                              )
                            }}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            {{ $lang('金額') }}:
                            <span>
                              {{
                                new Intl.NumberFormat('zh-TW').format(
                                  Number(item.amount)
                                )
                              }}</span
                            >
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- historyOrder -->
                <div v-if="record.type === 'historyOrder'" class="modal-1">
                  <table>
                    <thead>
                      <tr>
                        <th>{{ $lang('時間/幣種') }}</th>
                        <th>{{ $lang('投注內容') }}</th>
                        <th>{{ $lang('投注金額') }}</th>
                        <th style="text-align: center">{{ $lang('輸贏') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in connectRecordList"
                        :key="index"
                      >
                        <td>
                          <div>{{ formatDate(item.createdAt) }}</div>
                          <div>
                            {{ item.label || item.name || item.symbol }}
                          </div>
                        </td>
                        <td>
                          <div>
                            {{ $lang('交易時間') }}:
                            <span>{{ item.roundNo }}</span>
                          </div>
                          <div>
                            {{ $lang('賠率') }}:
                            <span>{{ item.odds }}</span>
                          </div>
                          <div v-if="item.option.length > 0">
                            {{ $lang('內容') }}:
                            <span
                              v-for="optionItem in item.option"
                              :key="optionItem"
                              class="gameOptionSpan"
                              >{{ gameOptionName(optionItem) }}</span
                            >
                          </div>
                          <div v-else>
                            {{ $lang('內容') }}:
                            <span class="gameOptionSpan">
                              {{ gameOptionName(item.option) }}</span
                            >
                          </div>
                          <div>
                            {{ $lang('匯率') }}:
                            <span>{{
                              new Intl.NumberFormat('zh-TW', {
                                minimumFractionDigits: 4,
                                maximumFractionDigits: 6
                              }).format(Number(item.openPrice))
                            }}</span>
                          </div>
                          <div>
                            {{ $lang('結束') }}:
                            <span>{{
                              new Intl.NumberFormat('zh-TW', {
                                minimumFractionDigits: 4,
                                maximumFractionDigits: 6
                              }).format(Number(item.roundInfo.closePrice))
                            }}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>
                              {{
                                new Intl.NumberFormat('zh-TW').format(
                                  Number(item.amount)
                                )
                              }}</span
                            >
                          </div>
                        </td>
                        <td>
                          <div style="text-align: center">
                            <span>{{ item.profit }}</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="record.type === 'historyRecord'" class="modal-1">
                  <table>
                    <thead>
                      <tr>
                        <th>{{ $lang('交易時間/類別') }}</th>
                        <th>{{ $lang('盤口') }}</th>
                        <th>{{ $lang('結果') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in historyRecordList"
                        :key="index"
                      >
                        <td>
                          <div>{{ item.roundNo }}</div>
                          <div>
                            {{ item.label || item.name || item.symbol }}
                          </div>
                        </td>
                        <td>
                          <div>
                            {{
                              new Intl.NumberFormat('zh-TW', {
                                minimumFractionDigits: 4,
                                maximumFractionDigits: 6
                              }).format(Number(item.closePrice))
                            }}
                          </div>
                        </td>
                        <td class="gameResultName">
                          <div
                            v-for="resultItem in item.result"
                            :key="resultItem"
                            class="gameResultNameItem"
                          >
                            {{ gameResultName(resultItem) }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="record.type === 'announcement'" class="modal-3">
                  <label
                    v-for="(item, index) in news.result"
                    :key="index"
                    class="bulItem"
                  >
                    <input :id="item.title" type="checkbox" />
                    <div class="title">
                      <span class="titleBox">{{ item.title }}</span>
                    </div>
                    <div class="content" v-html="item.content"></div>
                  </label>
                </div>
                <div v-if="record.type === 'rule'" class="modal-4">
                  <div v-for="(item, index) in rule.result" :key="index">
                    <div v-html="item.content"></div>
                  </div>
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
@import '@/assets/sass/game/model1/TempPage.min.css'
.page
  position: relative
  width: 100dvw
  height: 100dvh
</style>

<style scoped lang="sass">
.head
  background-color: #191f2d
  height: 80px
  width: 100%
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: flex-start
  padding: 0 15px
  border-bottom: 1px solid #363c4e
  .logo
    margin-right: auto
    font-size: 28px
    color: var(--font-color-1)
    display: flex
    flex-flow: row nowrap
    align-items: center
    font-weight: 700
    img
      height: 50px
      display: block
      margin-right: 10px
    .title
      color: #8c8f96
      font-size: 28px
      font-weight: 700
  .userInfo
    color: #f9761e
    font-weight: 400
    font-size: 14px
    text-align: right
</style>

<style scoped lang="sass">
.body
  display: flex
  flex-flow: row nowrap
  align-items: flex-start
  justify-content: flex-start
  height: 100dvh
  width: 100%
  #coinBox:checked ~ .bodyRight
    -webkit-transform: translateX(0)
    transform: translateX(0)
</style>

<style scoped lang="sass">
.bodyLeft
  min-width: 115px
  padding: 20px 0 0 0
  height: calc(100% - 80px)
  background-color: #191f2d
  border-right: 1px solid #363c4e
  @media screen and (max-width: 1024px)
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    flex: 1 1 100%
    -ms-flex: 1 1 100%
    height: 80px
    border-top: 1px solid #363c4e
    border-right: 0
    overflow-y: hidden
    display: flex
    flex-flow: row nowrap
    align-items: center
    justify-content: center
    z-index: 3
    padding-top: 5px
  .leftItem
    text-align: center
    color: #fff
    font-size: 13px
    padding: 10px
    display: block
    cursor: pointer
    transition: all .3s ease
    font-weight: 700
    margin-bottom: 0
    cursor: pointer
    &:hover
      background-color: #ffffff0d
    @media screen and (max-width: 1024px)
      font-size: 12px
    svg
      font-size: 200%
      margin-bottom: 10px
  .rankBtn
    display: none
    @media screen and (max-width: 1024px)
      display: block
</style>

<style scoped lang="sass">
.bodyRight
  width: 300px
  background-color: #21293c
  height: 100%
  border-left: 1px solid #363c4e
  @media screen and (max-width: 1024px)
    flex: 0 0 270px
    position: fixed
    right: 0
    top: 80px
    z-index: 3
    height: calc(100% - 80px - 80px)
    transform: translateX(100%)
    transition: all .3s ease
  .title
    padding: 10px 20px
    font-size: 18px
    color: #e8e8e8
    font-weight: 700
  .rightTabRow
    display: flex
    flex-flow: row wrap
    align-items: center
    width: 100%
    position: relative
  .rightTabRow::after
    content: " "
    width: 50%
    display: inline-block
    height: 2px
    background-color: #f9761e
    -webkit-transition: all ease .2s
    transition: all ease .2s
  label
    width: 50%
    text-align: center
    padding: 10px 5px
    color: #fff
    font-weight: 700
    font-size: 15px
    cursor: pointer
  .leftBorder
    border-right: 1px solid #363c4e
  #rightTab2:checked ~ .rightTabRow::after
    -webkit-transform: translateX(100%)
    transform: translateX(100%)
  #rightTab1:checked ~ .rightItemRow .rightItemList .rightItem .itemInfo .last
    display: none
  #rightTab2:checked ~ .rightItemRow .rightItemList .rightItem .itemInfo .now
    display: none
  #rightTab2:checked ~ .rightItemRow .rightItemList .rightItem .itemInfo svg
    display: none
</style>

<style scoped lang="sass">
.tempPage
  height: 100%
  width: calc(100vw - 380px)
  // background-image: url(@/assets/gameImage/bg-img.jpg)
  background-position: 50%
  background-size: cover
  background-repeat: no-repeat
  color: #fff
  position: relative
  z-index: 1
  @media screen and (max-width: 1024px)
    flex: 1 1 auto
</style>

<style scoped lang="sass">
.rightItemRow
  margin-top: 10px
  overflow-y: auto
  height: calc(100% - 109px)
  .rightItemList
    padding: 0 0 30px 0
  .rightItem
    display: flex
    flex-flow: row nowrap
    align-items: center
    width: 100%
    padding: 10px 15px
    transition: all .2s ease
    cursor: pointer
    &:hover
      background-color: #ffffff0d
    .itemImg
      background-position: 100% 10.81081%
      width: 30px
      height: 30px
      border-radius: 50%
      // background-image: url(@/assets/gameImage/item.png)
      background-size: 100% auto
      background-repeat: no-repeat
      display: inline-block
    .itemName
      color: #fff
      font-size: 14px
      margin-right: auto
      padding-left: 10px
      font-weight: 700
    .itemInfo
      color: #fff
      svg
        margin: 0 0 0 5px
    .itemInfo[data-type]
      color: #fff
    .itemInfo[data-type="up"] *:not(.last)
      color: #2cac40
      -webkit-animation: colorUp 1s ease-in infinite forwards
      animation: colorUp 1s ease-in infinite forwards
    .itemInfo[data-type="up"] i::before
      content: "\f102"
    .itemInfo[data-type="down"] *:not(.last)
      color: #db4931
      -webkit-animation: colorDown 1s ease-in infinite forwards
      animation: colorDown 1s ease-in infinite forwards
    .itemInfo[data-type="down"] svg
        transform: rotate(180deg)
    @keyframes colorUp
      0%,40%
        color: #db4931
      100%
        color: white
    @keyframes colorDown
      0%,40%
        color: #2cac40
      100%
        color: white
  .rightItem.active
    background-color: #ffffff0d
</style>

<style scoped lang="sass">
.controlBlock
  height: 125px
  width: 100%
  padding: 10px 0
  .containerRow
    display: flex
    align-items: stretch
    height: 100%
    max-width: 992px
    padding: 0 10px
    width: 100%
    margin: 0 auto
    flex-flow: row wrap
    align-content: flex-start
</style>

<style scoped lang="sass">
.centerRow
  width: calc(55% - 8px)
  margin-right: 8px
  display: flex
  flex-flow: row wrap
  align-items: stretch
  height: 100%
.centerRow[data-event="1"] .leftBox
  flex: 1 1 70%
.centerRow .leftBox
  display: flex
  flex-flow: row wrap
  align-content: flex-start
  align-items: center
  height: 100%
.centerRow[data-event="1"] .leftBox label
  width: calc(50% - 4px)
  height: calc(50% - 4px)
.centerRow .leftBox label[for=game-1]
  background-color: #2cac40
.centerRow .leftBox label
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: space-between
  color: #fff
  font-size: 17px
  font-weight: 700
  padding: 0 10px
  border-radius: 3px
  cursor: pointer
  margin-bottom: 0
.centerRow[data-event="1"] .leftBox label:last-of-type
  margin-top: 8px
.centerRow[data-event="1"] .leftBox label:nth-last-of-type(2)
  margin-top: 8px
.centerRow .leftBox label[for=game-2]
  background-color: #db4931
.centerRow .leftBox label:nth-of-type(2)
  margin-left: auto
.centerRow .leftBox label[for=game-3]
  background-color: #7d8189
.leftBox label:nth-of-type(4)
  margin-left: auto
.centerRow .leftBox label[for=game-4]
  background-color: #7d8189
.centerRow[data-event="1"] .rightBox label
  flex: 1 1 calc(50% - 8px)
.centerRow label[for=game-7]
  background-color: #1166c7
  height: 100%
.centerRow[data-event="1"] .rightBox
  padding-left: 8px
.centerRow .rightBox label
  margin-bottom: 0
  justify-content: center
  color: #fff
  font-size: 16px
  font-weight: 700
  cursor: pointer
  border-radius: 3px
  display: flex
  flex-flow: row wrap
  align-items: center
  align-content: center
  padding: 0 10px
.bottomRow
  width: 45%
  height: 100%
  display: flex
  flex-flow: row nowrap
  align-items: center
  position: relative
.bottomRow .totalBox
  width: 70%
  height: 100%
.bottomRow .inputBox
  width: 100%
  background-color: #3f475e
  border-radius: 3px
  padding: 5px 15px
  color: #fff
  height: calc(70% - 5px)
  margin-bottom: 5px
  cursor: pointer
  display: flex
  flex-flow: row nowrap
  align-items: flex-end
  position: relative
.bottomRow .inputBox span
  display: block
  width: 100%
  font-weight: 700
  font-size: 16px
  position: absolute
  left: 15px
  top: 5px
  pointer-events: none
  opacity: .3
.bottomRow .inputBox input
  background-color: transparent
  border: 0
  text-align: center
  width: 100%
  color: #fff
  font-size: 20px
  font-weight: 700
  outline: none
  cursor: pointer
.bottomRow .quickSelect
  height: 30%
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: space-between
.bottomRow .quickSelect span
  width: calc(33.3334% - 3.3334px)
  height: 100%
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: center
  font-size: 16px
  font-weight: 700
  background-color: #3f475e
  cursor: pointer
  transition: all .2s ease
.bottomRow .btnBlock
  width: calc(30% - 8px)
  margin-left: 8px
  height: 100%
.bottomRow .reBtn
  width: 100%
  outline: 0
  height: calc(50% - 2.5px)
  font-weight: 700
  font-size: 18px
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: center
  background-color: transparent
  transition: all .15s ease
  cursor: pointer
  white-space: nowrap
  border: 4px solid #d25540
  border-radius: 3px
  color: #de7b6b
  margin-bottom: 5px
.bottomRow .checkBtn
  width: 100%
  outline: 0
  height: calc(50% - 2.5px)
  font-weight: 700
  font-size: 18px
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: center
  background-color: transparent
  transition: all .15s ease
  cursor: pointer
  white-space: nowrap
  border: 4px solid #5baf46
  border-radius: 3px
  color: #5baf46
@media screen and (max-width: 1024px)
  .centerRow
    width: 100%
    margin-right: 0
    height: 60%
  .bottomRow
    height: calc(40% - 4px)
    margin-top: 4px
    width: 100%
  .controlBlock
    position: fixed
    bottom: calc(var(--head-height) + 20px)
    left: 0
    height: auto
</style>

<style scoped lang="sass">
.chartSection
  width: 100%
  height: calc(100% - 210px)
  @media screen and (max-width: 1024px)
    height: calc(100% - 310px)
  @media screen and (max-width: 768px)
    height: calc(100% - 270px)
</style>

<style scoped>
.popup {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.15s linear;
  padding: 0 40px;
}
.dataBody {
  padding: 10px 0;
}
.gameOptionSpan {
  padding: 0 5px;
}
.inputDate :deep(.el-input__prefix) {
  display: none;
}
.inputDate input {
  padding: 5px;
  margin: 0 1px;
}
.inputDate svg {
  margin: 0 5px 0 0;
  color: #fff;
}
.bulItem input[type='checkbox'] {
  display: none;
}
.bulItem .content {
  display: none;
}
.bulItem input[type='checkbox']:checked ~ .content {
  display: block;
}
.gameResultName {
  display: flex;
}
.gameResultNameItem {
  padding: 0 5px;
  font-size: 16px;
}
@media screen and (max-width: 768px) {
  .popup {
    padding: 0 10px;
    height: 92%;
  }
}
input {
  margin: 0;
}
</style>

<style>
.el-input__wrapper {
  background-color: #00000000;
  border: 1px solid #00000000;
  box-shadow: none;
}
</style>

<style>
.chart {
  height: 60%;
}
.k-line-box {
  height: 40%;
  width: 100%;
  overflow: hidden;
}

.k-line-box .tradingview-widget-container {
  height: 100%;
  width: 100%;
}

.k-line-box #tradingview_a45bd {
  height: 100%;
}

@media screen and (max-width: 992px) {
  .k-line-box {
    width: 100%;
    height: 40%;
    max-width: 100%;
  }
}
</style>

<style scoped lang="sass">
label
  margin: 0
.mobileQuickSelect
  position: relative
  display: none
  @media screen and (max-width: 768px)
    display: block
    font-size: 12px
    color: #fff
    text-align: center
    padding: 0 0 8px 0
    svg
      font-size: 20px
  input[type='checkbox']:checked ~ .mobileQuickSelectPopup
    display: block
  input[type='checkbox']:checked ~ label svg
    transform: rotate(180deg)
  .mobileQuickSelectPopup
    position: absolute
    width: 230px
    background-color: #323e61
    top: -60px
    left: -205px
    display: none
    .selectContent
      width: 100%
      display: flex
      justify-content: flex-start
      align-items: center
      padding: 0 5px 0
      flex-wrap: wrap
      label
        margin: 0
      a
        width: 50px
        margin: 3px 0
</style>
