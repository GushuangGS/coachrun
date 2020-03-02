  const receiverCreditRouter = {
    path: '/render/member/account/credit-card-detail',
    name: 'ReceiverCredit',
    meta: { title: "Receiver Credit" },
    component:()=>import('@/views/UserCenter/Credit/ReceiverCredit')
  }
  
  export default receiverCreditRouter;
  