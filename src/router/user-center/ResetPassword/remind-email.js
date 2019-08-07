const RemindEmail = resolve => {
    import('@/views/UserCenter/ResetPassword/RemindEmail').then(module => {
      resolve(module)
    })
  }
  
  const RemindEmailRouter = {
    path: '/app/member/account/remindEmail',
    name: 'RemindEmail',
    component: RemindEmail,
    meta: {
      keepAlive: true
    }
  }
  
  export default RemindEmailRouter