const ReceiverCredit = resolve => {
    import('@/views/UserCenter/Credit/ReceiverCredit').then(module => {
      resolve(module)
    })
  }
  
  const receiverCreditRouter = {
    path: '/render/member/account/credit-card-detail',
    name: 'ReceiverCredit',
    component: ReceiverCredit
  }
  
  export default receiverCreditRouter;
  