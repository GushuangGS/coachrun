const AddContact = resolve => {
    import('@/views/UserCenter/ContactInformation/AddContact').then(module => {
      resolve(module)
    })
  }
  
  const addContactRouter = {
    path: '/app/member/account/addContact',
    name: 'AddContact',
    component: AddContact,
    meta: {
      keepAlive: true
    }
  }
  
  export default addContactRouter
  