  const receiverContactRouter = {
    // path: '/app/member/account/addContact',
    path: '/render/member/account/contact-info-detail',
    name: 'ReceiverContact',
    meta: { title: "Add Contact Information" },
    component:()=>import('@/views/UserCenter/ContactInformation/ReceiverContact')
  }
  
  export default receiverContactRouter;
  