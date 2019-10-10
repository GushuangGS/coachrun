const myOrderRouter = {
  // path: '/app/member/account/orders',
  path: '/render/member/account/dashboard',
  name: 'MyOrders',
  component:()=>import('@/views/UserCenter/MyOrders/MyOrders')
}

export default myOrderRouter
