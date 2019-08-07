const PasswordRetrieval = resolve => {
    import('@/views/UserCenter/ResetPassword/PasswordRetrieval').then(module => {
      resolve(module)
    })
  }
  
  const PasswordRetrievalRouter = {
    path: '/app/member/account/passwordRetrieval',
    name: 'PasswordRetrieval',
    component: PasswordRetrieval,
    meta: {
      keepAlive: true
    }
  }
  
  export default PasswordRetrievalRouter