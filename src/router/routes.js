import userCenterRouter from './user-center/user-center'
// import login from './login/login'
const routes = [
  // {
  //   path: '/',
  //   redirect: '/app/member/account'
  // },
  {
    path: '*',
    redirect:  { name: 'MyOrders' },
  },
  {//登陆
    path:'/render/user/login',
    name:'Login',
    meta: { title: "Login" },    
    component:()=>import('@/views/Login/Login')
  },
  {//退出
    path:'/render/user/logout',
    name:'Logout',
    meta: { title: "Logout" },    
    component:()=>import('@/views/Login/Login')
  },
  {//注册
    path:'/render/user/register',
    name:'Register',
    meta: { title: "Register" },    
    component:()=>import('@/views/Login/Register')
  },
  {//发送邮箱
    path: '/render/user/forgot-password',
    name: 'PasswordRetrieval',
    meta: { title: "Password Retrieval" },    
    component:()=>import('@/views/UserCenter/ResetPassword/PasswordRetrieval')
  },
  // {//发送至邮箱提醒
  //   path: '/render/user/forgot-password/after',
  //   name: 'RemindEmail',
  //   component: RemindEmail,
  //   meta: {
  //     keepAlive: true
  //   }
  // },
  // {//密码重置页
  //   path: '/render/user/reset-password',
  //   name: 'ResetPassword',
  //   component: ResetPassword,
  //   meta: {
  //     keepAlive: true
  //   }
  // },
  {//添加订单
    path: '/render/member/guest-booking-reclaim',
    name: 'AddGuest',
    meta: { title: "Add Guest" },    
    component:()=>import('@/views/UserCenter/AddGuest/AddGuest')
  },
  {//bus-station
    path:'/bus-stations',
    name:'BusStation',
    meta: { title: "Bus Station" },    
    component:()=>import('@/views/BusStation'),
    meta:{
      keepAlive:true
    }
  },
  userCenterRouter
]

export default routes;


