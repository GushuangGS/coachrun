const creditListRouter = {
  // path: '/app/member/account/credit',
  path: '/render/member/account/credit-card-list',
  name: 'CreditList',
  meta: { title: "My Credit Cards" },
  component:()=>import('@/views/UserCenter/Credit/CreditList')
}

export default creditListRouter
