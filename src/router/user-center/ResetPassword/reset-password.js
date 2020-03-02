const ResetPasswordRouter = {
  // path: '/app/member/account/resetPassword',
  path: '/render/user/reset-password',
  name: 'ResetPassword',
  meta: { title: "Reset Password" },    
  component:()=>import('@/views/UserCenter/ResetPassword/ResetPassword')
}

export default ResetPasswordRouter