export default {
    deals:'api/promotions/deals',//deals页面
    resetPassword:'api/users/reset-password',//reset-password
    changePassword:'api/users/change-password',//change-password
    forgotPassword:'api/users/forgot-password',//forgot-password
    //credit
    creditList:'api/users/credit-cards',//creditList
    creditAdd:'api/users/credit-cards',//creditAdd
    creditUpdate:'api/users/credit-cards',//creditUpdate
    creditDetail:'api/users/credit-cards',// get 
    creditDelete:'api/users/credit-cards',// creditDelete
    //contact-info
    contactAdd:'api/users/contact-infos',//contactAdd
    contactList:'api/users/contact-infos',//contactList
    contactUpdate:'api/users/contact-infos',//contactUpdate
    contactDetail:'api/users/contact-infos',//contactDetail  
    contactDelete:'api/users/contact-infos',//contactDelete 
    //dashboard
    dashboard:'api/users/dashboard',//dashboard
    //viewPoint
    viewPoint:'api/users/view-point',//viewPoint
    // login
    login:'api/users/login',
    register:'api/users/register',
    logout:'api/users/logout',
    //bookings
    // bookingList:'/users/bookings',
    bookingList:'api/orders/list',    
    bookingDetail:'api/orders/users/:userId/bookings/:orderId',
    bookingReclaim:'api/orders/users/:userId/bookings/reclaim',
    //guest-bookings
    guestRequest:'api/users/guest-bookings/request-reclaim',
    guestSubmit:'api/users/guest-bookings/submit-reclaim',
    //authorization
    authorization:'api/users/authorization',
    //loginWithProvider
    loginWithProvider:'api/users/login-with-provider',
    //travellerList
    travellerList:'api/users/traveller-infos'
  };
  