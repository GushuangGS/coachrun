import changePasswordRouter from './ChangePassword/change-password'
const UserCenter = resolve => {
  import('@/views/UserCenter/UserCenter').then(module => {
    resolve(module)
  })
}

const userCenterRouter = {
  path: '/app/member/account',
  name: 'UserCenter',
  component: UserCenter,
  meta: {
    keepAlive: false
  },
  children: [
    changePasswordRouter
  ]
}

export default userCenterRouter
