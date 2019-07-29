const EditCredit = resolve => {
  import('@/views/UserCenter/Credit/EditCredit').then(module => {
    resolve(module)
  })
}

const editCreditRouter = {
  path: '/app/member/account/credit/edit',
  name: 'EditCredit',
  component: EditCredit,
  meta: {
    keepAlive: true
  }
}

export default editCreditRouter
