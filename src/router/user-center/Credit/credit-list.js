const CreditList = resolve => {
  import('@/views/UserCenter/Credit/CreditList').then(module => {
    resolve(module)
  })
}

const creditListRouter = {
  // path: '/app/member/account/credit',
  path: '/render/user/credit',
  name: 'CreditList',
  component: CreditList,
  meta: {
    // keepAlive: true
  }
}

export default creditListRouter
