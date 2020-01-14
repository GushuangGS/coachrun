import changePasswordRouter from './ChangePassword/change-password'
import contactListRouter from './ContactInformation/contact-list'
import creditListRouter from './Credit/credit-list'
import myPointsRouter from './MyPoints/my-points'
import myOrdersRouter from './MyOrders/my-orders'
import myDealsRouter from './MyDeals/my-deals'
import myBookingsRouter from './MyBookings/my-bookings'
import notificationCenter from './notification/notification'
import receiverContactRouter from './ContactInformation/receiver-contact'
import receiverCreditRouter from './Credit/receiver-credit'
import frequentListRouter from './FrequentTraveller/frequent-traveller'


// const UserCenter = resolve => {
//   import('@/views/UserCenter/UserCenter').then(module => {
//     resolve(module)
//   })
// }

const userCenterRouter = {
  // path: '/app/member/account',
  path: '',
  // name: 'UserCenter',
  component:()=>import('@/views/UserCenter/UserCenter'),
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
    receiverCreditRouter,
    notificationCenter,
    frequentListRouter
  ]
}

export default userCenterRouter
