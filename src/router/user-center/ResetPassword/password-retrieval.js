const PasswordRetrievalRouter = {
    // path: '/app/member/account/passwordRetrieval',
    path: '/render/user/forgot-password',
    name: 'PasswordRetrieval',
    meta: { title: "Password Retrieval" },    
    component:()=>import('@/views/UserCenter/ResetPassword/PasswordRetrieval')
  }
  
  export default PasswordRetrievalRouter