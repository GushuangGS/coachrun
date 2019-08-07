export default {
    deals:'/promotions/users/:userId/deals',//deals页面
    resetPassword:'/users/reset-password',//reset-password
    changePassword:'/users/change-password',//change-password
    //credit
    creditList:'/users/:userId/credit-cards/',//creditList
    creditAdd:'/users/:userId/credit-cards/',//creditAdd
    creditUpdate:'/users/:userId/credit-cards/:ccid',//creditUpdate
    creditDetail:'/users/:userId/credit-cards/:ccid',// get wait
    creditDelete:'/users/:userId/credit-cards/:ccid',// delete wait
    //contact-info
    contactAdd:'/users/:userId/contact-infos',//contactAdd
    contactList:'/users/:userId/contact-infos',//contactList
    contactUpdate:'/users/:userId/contact-infos/:aid',//contactUpdate
    contactDetail:'/users/:userId/contact-infos/:aid',//contactDetail  wait
    contactDelete:'/users/:userId/contact-infos/:aid',//contactDelete 
    //dashboard
    dashboard:'/users/:userId/dashboard',//dashboard
    //viewPoint
    viewPoint:'/users/:userId/view-point',//viewPoint
    // login
    login:'/users/login',
    register:'/users/register'
  };
  