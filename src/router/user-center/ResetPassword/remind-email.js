const RemindEmail = resolve => {
    import('@/views/UserCenter/ResetPassword/RemindEmail').then(module => {
      resolve(module)
    })
  }
  
  const RemindEmailRouter = {
    // path: '/app/member/account/remindEmail',
    path: '/render/user/remindEmail',
    name: 'RemindEmail',
    component: RemindEmail,
    meta: {
      keepAlive: true
    }
  }
  
  export default RemindEmailRouter