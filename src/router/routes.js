import userCenterRouter from './user-center/user-center'
// import login from './login/login'
const Login = resolve => {//登陆页面
  import('@/views/Login/Login').then(module => {
    resolve(module)
  })
}
const Register = resolve => {//注册页面
  import('@/views/Login/Register').then(module => {
    resolve(module)
  })
}

const PasswordRetrieval = resolve => {//忘记密码
  import('@/views/UserCenter/ResetPassword/PasswordRetrieval').then(module => {
    resolve(module)
  })
}
const RemindEmail = resolve => {
  import('@/views/UserCenter/ResetPassword/RemindEmail').then(module => {
    resolve(module)
  })
}
const ResetPassword = resolve => {
  import('@/views/UserCenter/ResetPassword/ResetPassword').then(module => {
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
    component:Login
  },
  {//注册
    path:'/app/member/register',
    name:'Register',
    component:Register
  },
  {//发送邮箱
    path: '/app/member/passwordRetrieval',
    name: 'PasswordRetrieval',
    component: PasswordRetrieval,
    meta: {
      keepAlive: true
    }
  },
  {//发送至邮箱提醒
    path: '/app/member/remindEmail',
    name: 'RemindEmail',
    component: RemindEmail,
    meta: {
      keepAlive: true
    }
  },
  {//密码重置页
    path: '/app/member/resetPassword',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      keepAlive: true
    }
  },
  userCenterRouter
]

export default routes;


