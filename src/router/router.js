import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Cookies from 'js-cookie'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_DOMAIN;

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
          || name == "ReceiverContact" || name == "AddGuest" || name == "FrequentList"){
        next({name: 'Login'});
      }
      next();
    }
  }
  
  if(to.name=='ReceiverContact'){
      if(to.fullPath.indexOf('aid')==-1){
        to.meta.title = 'Add Contact Information';
      }else{
        to.meta.title = 'Edit Contact Information';
      }
  }

  if(to.name=='ReceiverCredit'){
    if(to.fullPath.indexOf('ccid')==-1){
      to.meta.title = 'Add Credit Card';
    }else{
      to.meta.title = 'Edit Credit Card';
    }
  }
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title;
  }
  next();
})