const MyOrders = resolve => {
  import('@/views/UserCenter/MyOrders/MyOrders').then(module => {
    resolve(module)
  })
}

const myOrderRouter = {
  // path: '/app/member/account/orders',
  path: '/render/member/dashboard',
  name: 'MyOrders',
  component: MyOrders,
  meta: {
    // keepAlive: true
  }
}

export default myOrderRouter
