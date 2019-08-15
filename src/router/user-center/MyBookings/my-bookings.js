const MyBookings = resolve => {
    import('@/views/UserCenter/MyBookings/MyBookings').then(module => {
      resolve(module)
    })
  }
  
  const myBookingsRouter = {
    path: '/app/member/account/bookings',
    name: 'MyBookings',
    component: MyBookings,
    meta: {
      // keepAlive: true
    }
  }
  
  export default myBookingsRouter
  