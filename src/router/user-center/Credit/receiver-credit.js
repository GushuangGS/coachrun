const ReceiverCredit = resolve => {
    import('@/views/UserCenter/Credit/ReceiverCredit').then(module => {
      resolve(module)
    })
  }
  
  const receiverCreditRouter = {
    path: '/render/user/receiverCredit',
    name: 'ReceiverCredit',
    component: ReceiverCredit
  }
  
  export default receiverCreditRouter;
  