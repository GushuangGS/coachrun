import changePasswordRouter from './ChangePassword/change-password'
import contactListRouter from './ContactInformation/contact-list'
import editContactRouter from './ContactInformation/edit-contact'
import addContactRouter from './ContactInformation/add-contact'
import creditListRouter from './Credit/credit-list'
import addCreditRouter from './Credit/add-credit'
import editCreditRouter from './Credit/edit-credit'
import myPointsRouter from './MyPoints/my-points'
import myOrdersRouter from './MyOrders/my-orders'
import myDealsRouter from './MyDeals/my-deals'
// import resetPasswordRouter from './ResetPassword/reset-password'
// import remindEmailRouter from './ResetPassword/remind-email'
// import passwordRetrievalRouter from './ResetPassword/password-retrieval'
import myBookingsRouter from './MyBookings/my-bookings'


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
    keepAlive: false,
    auth: true
  },
  children: [
    changePasswordRouter,
    contactListRouter,
    editContactRouter,
    addContactRouter,
    creditListRouter,
    addCreditRouter,
    editCreditRouter,
    myPointsRouter,
    myOrdersRouter,
    myDealsRouter,
    myBookingsRouter
  ]
}

export default userCenterRouter
