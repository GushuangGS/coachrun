import userCenterRouter from './user-center/user-center'

const routes = [
  {
    path: '/',
    redirect: '/app/member/account'
  },
  userCenterRouter
]

export default routes
