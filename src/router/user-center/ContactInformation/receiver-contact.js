const ReceiverContact = resolve => {
    import('@/views/UserCenter/ContactInformation/ReceiverContact').then(module => {
      resolve(module)
    })
  }
  
  const receiverContactRouter = {
    // path: '/app/member/account/addContact',
    path: '/render/member/contact-info-detail',
    name: 'ReceiverContact',
    component: ReceiverContact
  }
  
  export default receiverContactRouter;
  