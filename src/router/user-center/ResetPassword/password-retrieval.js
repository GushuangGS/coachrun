const PasswordRetrieval = resolve => {
    import('@/views/UserCenter/ResetPassword/PasswordRetrieval').then(module => {
      resolve(module)
    })
  }
  
  const PasswordRetrievalRouter = {
    // path: '/app/member/account/passwordRetrieval',
    path: '/render/user/forgot-password',
    name: 'PasswordRetrieval',
    component: PasswordRetrieval,
    meta: {
      keepAlive: true
    }
  }
  
  export default PasswordRetrievalRouter