const myDealsRouter = {
  // path: '/app/member/account/deals',
  path: '/render/member/account/deals',
  name: 'MyDeals',
  meta: { title: "My Deals" },
  component:()=>import('@/views/UserCenter/MyDeals/MyDeals')
}

export default myDealsRouter
