const changePasswordRouter = {
  // path: '/app/member/account/password',
  path: '/render/member/account/change-password',
  name: 'ChangePassword',
  component:()=>import('@/views/UserCenter/ChangePassword/ChangePassword')
}

export default changePasswordRouter
