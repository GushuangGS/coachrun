const MyPoints = resolve => {
  import('@/views/UserCenter/MyPoints/MyPoints').then(module => {
    resolve(module)
  })
}

const myPointsRouter = {
  // path: '/app/member/account/points',
  path: '/render/member/account/view-point',
  name: 'MyPoints',
  component: MyPoints,
  meta: {
    // keepAlive: true
  }
}

export default myPointsRouter
