const myPointsRouter = {
  // path: '/app/member/account/points',
  path: '/render/member/account/view-point',
  name: 'MyPoints',
  meta: { title: "My Available Points" },
  component:()=>import('@/views/UserCenter/MyPoints/MyPoints')
}

export default myPointsRouter
