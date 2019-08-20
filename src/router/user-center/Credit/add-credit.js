const AddCredit = resolve => {
  import('@/views/UserCenter/Credit/AddCredit').then(module => {
    resolve(module)
  })
}

const addCreditRouter = {
  // path: '/app/member/account/credit/add',
  path: '/render/user/credit/add',
  name: 'AddCredit',
  component: AddCredit,
  meta: {
    keepAlive: true
  }
}

export default addCreditRouter
