import model1_login from '@/assets/document/image/model1/login.png'
import model2_login from '@/assets/document/image/model2/login.png'
import model3_login from '@/assets/document/image/model3/login.png'
import model4_login from '@/assets/document/image/model4/login.png'
import model5_login from '@/assets/document/image/model5/login.png'
import model1_register from '@/assets/document/image/model1/register.png'
import model2_register from '@/assets/document/image/model2/register.png'
import model3_register from '@/assets/document/image/model3/register.png'
import model4_register from '@/assets/document/image/model4/register.png'
import model5_register from '@/assets/document/image/model5/register.png'
import model1_user from '@/assets/document/image/model1/user.png'
import model2_user from '@/assets/document/image/model2/user.png'
import model3_user from '@/assets/document/image/model3/user.png'
import model4_user from '@/assets/document/image/model4/user.png'
import model5_user from '@/assets/document/image/model5/user.png'
import model1_game from '@/assets/document/image/model1/game.png'
import model2_game from '@/assets/document/image/model2/game.png'
import model3_game from '@/assets/document/image/model3/game.png'
import model4_game from '@/assets/document/image/model4/game.png'
import model5_game from '@/assets/document/image/model5/game.png'
import model6_game from '@/assets/document/image/model6/game.png'
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
    title: '登入頁版本',
    tips: [],
    api: [],
    useValue: '',
    srcList: [],
    clickRouter:[
      {
        title:'model1',
        router:'/login/model1',
        srcList:[model1_login]
      },
      {
        title:'model2',
        router:'/login/model2',
        srcList:[model2_login]
      },
      {
        title:'model3',
        router:'/login/model3',
        srcList:[model3_login]
      },
      {
        title:'model4',
        router:'/login/model4',
        srcList:[model4_login]
      },
      {
        title:'model5',
        router:'/login/model5',
        srcList:[model5_login]
      }
    ]
  },
  {
    title: '註冊頁版本',
    tips: [],
    api: [],
    useValue: '',
    srcList: [],
    clickRouter:[
      {
        title:'model1',
        router:'/register/model1',
        srcList:[model1_register]
      },
      {
        title:'model2',
        router:'/register/model2',
        srcList:[model2_register]
      },
      {
        title:'model3',
        router:'/register/model3',
        srcList:[model3_register]
      },
      {
        title:'model4',
        router:'/register/model4',
        srcList:[model4_register]
      },
      {
        title:'model5',
        router:'/register/model5',
        srcList:[model5_register]
      }
    ]
  },
  {
    title: '會員中心版本',
    tips: [],
    api: [],
    useValue: '',
    srcList: [],
    clickRouter:[
      {
        title:'model1',
        router:'/user/model1',
        srcList:[model1_user]
      },
      {
        title:'model2',
        router:'/user/model2/info',
        srcList:[model2_user]
      },
      {
        title:'model3',
        router:'/user/model3',
        srcList:[model3_user]
      },
      {
        title:'model4',
        router:'/user/model4/dashboard',
        srcList:[model4_user]
      },
      {
        title:'model5',
        router:'/user/model5',
        srcList:[model5_user]
      }
    ]
  },
  {
    title: '遊戲中心版本',
    tips: [],
    api: [],
    useValue: '',
    srcList: [],
    clickRouter:[
      {
        title:'model1',
        router:'/game/model1',
        srcList:[model1_game]
      },
      {
        title:'model2',
        router:'/game/model2',
        srcList:[model2_game]
      },
      {
        title:'model3',
        router:'/game/model3',
        srcList:[model3_game]
      },
      {
        title:'model4',
        router:'/game/model4',
        srcList:[model4_game]
      },
      {
        title:'model5',
        router:'/game/model5',
        srcList:[model5_game]
      },
      {
        title:'model6',
        router:'/game/model6',
        srcList:[model6_game]
      }
    ]
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
