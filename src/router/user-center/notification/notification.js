const notification = {//notification-center
  path:'/render/member/account/notification-center',
  name:'NotificationCenter',
  meta: { title: "My Notifications" },
  component:()=>import('@/views/Notification/notification-center'),
  // meta:{
  //   keepAlive:true
  // }
}
export default notification
