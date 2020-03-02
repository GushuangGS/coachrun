const myBookingsRouter = {
    // path: '/app/member/account/bookings',
    path: '/render/member/account/booking-list',
    name: 'MyBookings',
    meta: { title: "My Bookings" },
    component:()=>import('@/views/UserCenter/MyBookings/MyBookings')
  }
  
  export default myBookingsRouter
  