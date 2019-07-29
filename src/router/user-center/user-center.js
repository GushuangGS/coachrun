import changePasswordRouter from './ChangePassword/change-password'
import contactListRouter from './ContactInformation/contact-list'
import editContactRouter from './ContactInformation/edit-contact'
import creditListRouter from './Credit/credit-list'
import addCreditRouter from './Credit/add-credit'
import editCreditRouter from './Credit/edit-credit'
import myPointsRouter from './MyPoints/my-points'
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
    contactListRouter,
    editContactRouter,
    creditListRouter,
    addCreditRouter,
    editCreditRouter,
    myPointsRouter
  ]
}

export default userCenterRouter
