const RemindEmailRouter = {
    // path: '/app/member/account/remindEmail',
    path: '/render/user/remindEmail',
    name: 'RemindEmail',
    meta: { title: "Remind Email" },    
    component:()=>import('@/views/UserCenter/ResetPassword/RemindEmail')
  }
  
  export default RemindEmailRouter