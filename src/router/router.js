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
    // const display = VueCookie.get('display');
    // const display = sessionStorage.getItem('display');
    // const token = sessionStorage.getItem('IvyCustomer_LoginToken');
    let loginCookie = decodeURI(VueCookie.get('IvyCustomer_LoginCookie'));
    let token = loginCookie.split('+|+')[2];
    if(token==undefined){
      // token = sessionStorage.getItem('IvyCustomer_LoginToken');
      token = localStorage.getItem('IvyCustomer_LoginToken');
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