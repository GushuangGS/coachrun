const ContactList = resolve => {
  import('@/views/UserCenter/ContactInformation/ContactList').then(module => {
    resolve(module)
  })
}

const contactListRouter = {
  // path: '/app/member/account/contact',
  path: '/render/user/contact',
  name: 'ContactList',
  component: ContactList,
  meta: {
    // keepAlive: true
  }
}

export default contactListRouter
