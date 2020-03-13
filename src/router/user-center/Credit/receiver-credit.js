  const receiverCreditRouter = {
    path: '/render/member/account/credit-card-detail',
    name: 'ReceiverCredit',
    meta: { title: "Add Credit Card" },
    component:()=>import('@/views/UserCenter/Credit/ReceiverCredit')
  }
  
  export default receiverCreditRouter;
  