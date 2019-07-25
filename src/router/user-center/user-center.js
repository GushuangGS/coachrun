import changePasswordRouter from './ChangePassword/change-password'
import contactListRouter from './ContactInformation/contact-list'
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
    changePasswordRouter,
    contactListRouter
  ]
}

export default userCenterRouter
