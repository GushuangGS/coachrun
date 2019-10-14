import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import VueCookie from 'vue-cookie';

Vue.use(Router)

// export default new Router({
export const router = new Router({
  routes,
  mode: 'history'
})


export default router;

router.beforeEach((to,from,next)=>{
  // console.log(to);
  const name=to.name;
  if (to.matched.some(record => record.meta.auth)){
    // let loginCookie = decodeURI(VueCookie.get('IvyCustomer_LoginCookie'));
    // let token = loginCookie.split('+|+')[2];
    // if(token==undefined){
    //   token = localStorage.getItem('IvyCustomer_LoginToken');
    // }
    // if(token){
    //   next();
    // }else {//没有登录信息
    //   if(name == "MyDeals" || name == "MyPoints" || name=="CreditList" || name=="ChangePassword" 
    //       || name == "ContactList" ||name == "MyBookings" ||name == "MyOrders" ||name == "ReceiverCredit"
    //       || name == "ReceiverContact" || name == "AddGuest"){
    //     next({name: 'Login'});
    //   }
    //   next();
    // }

    let loginCookie = decodeURI(VueCookie.get('IvyCustomer_LoginCookie'));
    let token = loginCookie.split('+|+')[2];
    if (process.env.NODE_ENV == 'development'){
      if(token==undefined){
        token = localStorage.getItem('IvyCustomer_LoginToken');
      }
    }else{
      this.$http.post(this.$api.authorization,{loginCookie:loginCookie})
          .then( res => {
              console.log(res);
          })
    }
    
    if(token){
      next();
    }else {//没有登录信息
      if(name == "MyDeals" || name == "MyPoints" || name=="CreditList" || name=="ChangePassword" 
          || name == "ContactList" ||name == "MyBookings" ||name == "MyOrders" ||name == "ReceiverCredit"
          || name == "ReceiverContact" || name == "AddGuest"){
        next({name: 'Login'});
      }
      next();
    }


  }
  next();
})