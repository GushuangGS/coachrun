const MyBookings = resolve => {
    import('@/views/UserCenter/MyBookings/MyBookings').then(module => {
      resolve(module)
    })
  }
  
  const myBookingsRouter = {
    // path: '/app/member/account/bookings',
    path: '/render/member/account/booking-list',
    name: 'MyBookings',
    component: MyBookings,
    meta: {
      // keepAlive: true
    }
  }
  
  export default myBookingsRouter
  