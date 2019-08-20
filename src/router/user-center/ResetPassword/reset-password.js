const ResetPassword = resolve => {
  import('@/views/UserCenter/ResetPassword/ResetPassword').then(module => {
    resolve(module)
  })
}

const ResetPasswordRouter = {
  // path: '/app/member/account/resetPassword',
  path: '/render/user/resetPassword',
  name: 'ResetPassword',
  component: ResetPassword,
  meta: {
    keepAlive: true
  }
}

export default ResetPasswordRouter