const contactListRouter = {
  // path: '/app/member/account/contact',
  path: '/render/member/account/contact-info-list',
  name: 'ContactList',
  meta: { title: "My Contact Information" },
  component:()=>import('@/views/UserCenter/ContactInformation/ContactList')
}

export default contactListRouter
