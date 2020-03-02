const changePasswordRouter = {
  // path: '/app/member/account/password',
  path: '/render/member/account/change-password',
  name: 'ChangePassword',
  meta: { title: "Change Password" },
  component:()=>import('@/views/UserCenter/ChangePassword/ChangePassword')
}

export default changePasswordRouter
