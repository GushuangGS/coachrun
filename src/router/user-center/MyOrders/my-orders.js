const myOrderRouter = {
  // path: '/app/member/account/orders',
  path: '/render/member/account/dashboard',
  name: 'MyOrders',
  meta: { title: "Dashboard" },
  component:()=>import('@/views/UserCenter/MyOrders/MyOrders')
}

export default myOrderRouter
