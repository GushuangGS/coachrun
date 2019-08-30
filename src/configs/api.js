export default {
    deals:'/promotions/identity/deals',//deals页面
    resetPassword:'/users/reset-password',//reset-password
    changePassword:'/users/identity/change-password',//change-password
    forgotPassword:'/users/forgot-password',//forgot-password
    //credit
    creditList:'/users/identity/credit-cards',//creditList
    creditAdd:'/users/identity/credit-cards',//creditAdd
    creditUpdate:'/users/identity/credit-cards',//creditUpdate
    creditDetail:'/users/identity/credit-cards/:ccid',// get wait
    creditDelete:'/users/identity/credit-cards',// creditDelete
    //contact-info
    contactAdd:'/users/identity/contact-infos',//contactAdd
    contactList:'/users/identity/contact-infos',//contactList
    contactUpdate:'/users/identity/contact-infos',//contactUpdate
    contactDetail:'/users/identity/contact-infos/:aid',//contactDetail  wait
    contactDelete:'/users/identity/contact-infos',//contactDelete 
    //dashboard
    dashboard:'/users/identity/dashboard',//dashboard
    //viewPoint
    viewPoint:'/users/identity/view-point',//viewPoint
    // login
    login:'/users/login',
    register:'/users/register',
    logout:'users/logout',
    //bookings
    // bookingList:'/users/identity/bookings',
    bookingList:'/orders/list',    
    bookingDetail:'/orders/users/:userId/bookings/:orderId',
    bookingReclaim:'/orders/users/:userId/bookings/reclaim'
  };
  