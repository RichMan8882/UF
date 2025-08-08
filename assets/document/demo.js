const documentContent = () => {
  return [
  {
    title: '',
    tips: [],
    api: [],
    useValue: '',
    srcList: [],
    clickRouter:[]
  },
  {
    title: '登入Btn',
    tips: ['accessTokenCookie有值時，登入btn皆要變為會員中心'],
    api: [
      'login按鈕 -> navigateTo("/login")',
      '會員中心按鈕 -> navigateTo("/user/info")'
    ],
    useValue: 'accessTokenCookie',
    srcList: [],
  },
  {
    title: '所有標題需雙向綁定',
    tips: ['任何有顯示到標題的樣式皆需綁定'],
    api: [],
    useValue: '{{ siteStore.siteData.title }}',
    srcList: [],
  },
  {
    title: '所有logo需雙向綁定',
    tips: ['任何有顯示到logo的樣式皆需綁定'],
    api: [],
    useValue: ':src=siteStore.siteData.logo',
    srcList: [],
  },
  {
    title: '所有copyRight需雙向綁定',
    tips: ['任何有顯示到copyRight的樣式皆需綁定'],
    api: [],
    useValue: '{{ siteStore.siteData.copyRight }}',
    srcList: [],
  }
]
};

export default documentContent;
