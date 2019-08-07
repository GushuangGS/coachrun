import userCenterRouter from './user-center/user-center'
// import login from './login/login'
const Login = resolve => {
  import('@/views/Login/Login').then(module => {
    resolve(module)
  })
}
const Register = resolve => {
  import('@/views/Login/Register').then(module => {
    resolve(module)
  })
}

const PasswordRetrieval = resolve => {
  import('@/views/UserCenter/ResetPassword/PasswordRetrieval').then(module => {
    resolve(module)
  })
}
const routes = [
  {
    path: '/',
    redirect: '/app/member/account'
  },
  {//登陆
    path:'/app/member/login',
    name:'Login',
    component:Login,
    meta: {
      keepAlive: true
    }
  },
  {//注册
    path:'/app/member/register',
    name:'Register',
    component:Register,
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: '/app/member/account/passwordRetrieval',
  //   name: 'PasswordRetrieval',
  //   component: PasswordRetrieval,
  //   meta: {
  //     keepAlive: true
  //   }
  // },
  userCenterRouter
]

export default routes
