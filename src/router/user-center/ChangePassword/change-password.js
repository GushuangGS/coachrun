const ChangePassword = resolve => {
  import('@/views/UserCenter/ChangePassword/ChangePassword').then(module => {
    resolve(module)
  })
}

const changePasswordRouter = {
  // path: '/app/member/account/password',
  path: '/render/user/password',
  name: 'ChangePassword',
  component: ChangePassword,
  meta: {
    keepAlive: true
  }
}

export default changePasswordRouter
