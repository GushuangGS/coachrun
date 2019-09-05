export default {
    deals:'/promotions/deals',//deals页面
    resetPassword:'/users/reset-password',//reset-password
    changePassword:'/users/change-password',//change-password
    forgotPassword:'/users/forgot-password',//forgot-password
    //credit
    creditList:'/users/credit-cards',//creditList
    creditAdd:'/users/credit-cards',//creditAdd
    creditUpdate:'/users/credit-cards',//creditUpdate
    creditDetail:'/users/credit-cards',// get 
    creditDelete:'/users/credit-cards',// creditDelete
    //contact-info
    contactAdd:'/users/contact-infos',//contactAdd
    contactList:'/users/contact-infos',//contactList
    contactUpdate:'/users/contact-infos',//contactUpdate
    contactDetail:'/users/contact-infos',//contactDetail  
    contactDelete:'/users/contact-infos',//contactDelete 
    //dashboard
    dashboard:'/users/dashboard',//dashboard
    //viewPoint
    viewPoint:'/users/view-point',//viewPoint
    // login
    login:'/users/login',
    register:'/users/register',
    logout:'users/logout',
    //bookings
    // bookingList:'/users/bookings',
    bookingList:'/orders/list',    
    bookingDetail:'/orders/users/:userId/bookings/:orderId',
    bookingReclaim:'/orders/users/:userId/bookings/reclaim',
    //guest-bookings
    guestRequest:'users/guest-bookings/request-reclaim',
    guestSubmit:'users/guest-bookings/submit-reclaim'
  };
  