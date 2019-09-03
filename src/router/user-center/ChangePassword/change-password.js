const ChangePassword = resolve => {
  import('@/views/UserCenter/ChangePassword/ChangePassword').then(module => {
    resolve(module)
  })
}

const changePasswordRouter = {
  // path: '/app/member/account/password',
  path: '/render/member/account/change-password',
  name: 'ChangePassword',
  component: ChangePassword,
  meta: {
    // keepAlive: true
  }
}

export default changePasswordRouter
