import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Cookies from 'js-cookie'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_DOMAIN;

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
    let loginCookie = decodeURI(Cookies.get('IvyCustomer_LoginCookie'));
    let token = loginCookie.split('+|+')[2];
    if(token==undefined){
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

//     let loginCookie = decodeURI(Cookies.get('IvyCustomer_LoginCookie'));
//     let token = loginCookie.split('+|+')[2];
//     if(token==undefined){
//       token = localStorage.getItem('IvyCustomer_LoginToken');
//     }
    
//     if(token){
//       if(process.env.NODE_ENV != 'development'){
//         axios.post('api/users/authorization',{loginCookie:loginCookie})
//           .then( res => {
//               console.log(res);
//               if(res.data.code==401){
//                 next({name: 'Login'});
//               }
//           })
//       }
//       next();
//     }else {//没有登录信息
//       if(name == "MyDeals" || name == "MyPoints" || name=="CreditList" || name=="ChangePassword" 
//           || name == "ContactList" ||name == "MyBookings" ||name == "MyOrders" ||name == "ReceiverCredit"
//           || name == "ReceiverContact" || name == "AddGuest"){
//         next({name: 'Login'});
//       }
//       next();
//     }


  }
  next();
})