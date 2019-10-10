const ResetPasswordRouter = {
  // path: '/app/member/account/resetPassword',
  path: '/render/user/reset-password',
  name: 'ResetPassword',
  component:()=>import('@/views/UserCenter/ResetPassword/ResetPassword')
}

export default ResetPasswordRouter