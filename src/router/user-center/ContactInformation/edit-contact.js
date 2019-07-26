const EditContact = resolve => {
  import('@/views/UserCenter/ContactInformation/EditContact').then(module => {
    resolve(module)
  })
}

const editContactRouter = {
  path: '/app/member/account/contact/:contactId',
  name: 'EditContact',
  component: EditContact,
  meta: {
    keepAlive: true
  }
}

export default editContactRouter
