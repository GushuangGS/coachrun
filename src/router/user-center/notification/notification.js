const notification = {//notification-center
  path:'/render/member/account/notification-center',
  name:'notification-center',
  component:()=>import('@/views/Notification/notification-center'),
  meta:{
    keepAlive:true
  }
}
export default notification
