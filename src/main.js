import Vue from 'vue'
import App from './App.vue'
// import router from './router/router'
import {router} from './router/router'
import store from './store'
// import './configs/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from './configs/en.js'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import api from './configs/api'
import VueCookie from 'vue-cookie';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css' //引入css
// 引入font-awesome图标字体
import 'font-awesome/css/font-awesome.min.css'
import './styles/css/index.css'


Vue.use(BootstrapVue);
Vue.use(ElementUI,{ locale });
Vue.use(VueCookie);
Vue.use(VuePhoneNumberInput);
Vue.use(eleCalendar);

Vue.config.productionTip = false;

//配置axios 挂载到实例化对象上
Vue.prototype.$http = axios;
// axios.defaults.baseURL = 'http://192.168.20.7:3000/mock/27/api';
// axios.defaults.baseURL = 'http://sandbox.gotobus.com/api';
// axios.defaults.baseURL = 'http://testwww.coachrun.com/api';
axios.defaults.baseURL = 'http://testwww.coachrun.com/';
Vue.prototype.$api = api;

import { Message } from 'element-ui';

const tip = msg =>{
    Message({
      message: msg,
      type: 'warning',
      showClose: true,
      center: true
    });
}

const errorHandle = (status, msg) => {//code判断
  // 状态码判断
  switch (status) {
      case 500:
          tip(msg);
          break;
      case 401:
          tip('Your login has expired. Please log in again to continue.');
          sessionStorage.removeItem('IvyCustomer_LoginToken');
          sessionStorage.removeItem("loginName");
          store.commit('logout');
          store.commit('loginName','');
          // store.commit('loginSuccess', null);
          setTimeout(() => {
              // router.replace({name: 'Login',query:{redirect: location.href}});
              router.replace({name: 'Login'});
          }, 1000);
          break;
      default:
  }
}

// -------------------loading--------------------
let loading;//定义loading变量
function startLoading() {//使用Element loading-start 方法
  loading = Vue.prototype.$loading({
      lock: true,
      text: 'loading……',
      // background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {//使用Element loading-close 方法
  loading.close();
}
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
}
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
      endLoading();
  }
}
//http request 拦截器
axios.interceptors.request.use(
  config => {
      
      // var token = '';
      let apiKey = "7:1350154:0:1";
      // let apiKey = "1:0:0:1";
      let loginCookie = decodeURI(VueCookie.get('IvyCustomer_LoginCookie'));
      let token = loginCookie.split('+|+')[2];
      if(token==undefined){
        // token = sessionStorage.getItem('IvyCustomer_LoginToken');
        token = localStorage.getItem('IvyCustomer_LoginToken');
      }
      config.data = JSON.stringify(config.data);
      config.headers['Content-Type'] ='application/json';
      // console.log(config.url.indexOf('api')!=-1);
      // console.log(config);
      // console.log(config.url);
      if(config.url.indexOf('api')!=-1){
        config.headers['X-Api-Key'] = btoa(apiKey);
        config.headers['Authorization'] = token;
      }
      showFullScreenLoading();
      return config;
  },
  error => {
    return Promise.reject(err);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response);
      //当返回信息为未登录或者登录失效的时候重定向为登录页面
      if(response.data.code == '200'){
          // tryHideFullScreenLoading();
      }else{
          errorHandle(response.data.code,response.data.msg);
      }
      tryHideFullScreenLoading();
      return response;
  },
  error => {
      return Promise.reject(error);
  }
)
// ---------------------------------------

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
