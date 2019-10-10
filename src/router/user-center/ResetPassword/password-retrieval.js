const PasswordRetrievalRouter = {
    // path: '/app/member/account/passwordRetrieval',
    path: '/render/user/forgot-password',
    name: 'PasswordRetrieval',
    component:()=>import('@/views/UserCenter/ResetPassword/PasswordRetrieval')
  }
  
  export default PasswordRetrievalRouter