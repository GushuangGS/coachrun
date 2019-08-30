const MyDeals = resolve => {
  import('@/views/UserCenter/MyDeals/MyDeals').then(module => {
    resolve(module)
  })
}

const myDealsRouter = {
  // path: '/app/member/account/deals',
  path: '/render/member/account/deals',
  name: 'MyDeals',
  component: MyDeals,
  meta: {
    // keepAlive: true
  }
}

export default myDealsRouter
