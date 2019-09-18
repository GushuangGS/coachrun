import changePasswordRouter from './ChangePassword/change-password'
import contactListRouter from './ContactInformation/contact-list'
import creditListRouter from './Credit/credit-list'
import myPointsRouter from './MyPoints/my-points'
import myOrdersRouter from './MyOrders/my-orders'
import myDealsRouter from './MyDeals/my-deals'
import myBookingsRouter from './MyBookings/my-bookings'

import receiverContactRouter from './ContactInformation/receiver-contact'
import receiverCreditRouter from './Credit/receiver-credit'

const UserCenter = resolve => {
  import('@/views/UserCenter/UserCenter').then(module => {
    resolve(module)
  })
}

const userCenterRouter = {
  // path: '/app/member/account',
  path: '',
  // name: 'UserCenter',
  component: UserCenter,
  meta: {
    keepAlive: false,
    auth: true
  },
  children: [
    changePasswordRouter,
    contactListRouter,
    creditListRouter,
    myPointsRouter,
    myOrdersRouter,
    myDealsRouter,
    myBookingsRouter,
    receiverContactRouter,
    receiverCreditRouter
  ]
}

export default userCenterRouter
