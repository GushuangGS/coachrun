import Vue from 'vue'
import App from './App.vue'
import {router} from './router/router'
import store from './store'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from './configs/en.js'
import './plugins/element.js'
import axios from 'axios'
import api from './configs/api'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css' //引入css
// 引入font-awesome图标字体
import 'font-awesome/css/font-awesome.min.css'
import './styles/css/index.css'
import './styles/common.css'

import * as firebase from "firebase/app";
import "firebase/auth";

import Cookies from 'js-cookie'
window.Cookies = Cookies
import BScroll from 'better-scroll'
window.BScroll =BScroll
import notification from 'ivy-notification-button'
Vue.use(notification)

import notificationPc from 'ivy-notification-desktop'
import 'ivy-notification-desktop/lib/ivyNotificationDesktop.css'
Vue.use(notificationPc)

// ---------fir-coachrun.firebaseapp.com-------auth.coachrun.com-----
var firebaseConfig = {
  apiKey: "AIzaSyBBcB6htx6yN66aYrzE8yNgaqwcntPZX2c",
  authDomain: "auth.coachrun.com"
}
firebase.initializeApp(firebaseConfig)
Vue.prototype.firebase = firebase;
// ---------------

import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

import VueMatomo from 'vue-matomo'
Vue.use(VueMatomo,{
  host: 'https://owa.taketours.com/piwik',
  siteId: 34,
  trackerFileName: 'piwik',
  router: router
})

import './plugins/busStation.js'

// Vue.use(ElementUI,{ locale });
Vue.use(VuePhoneNumberInput);
Vue.use(eleCalendar);

Vue.config.productionTip = false;

//配置axios 挂载到实例化对象上
window.axios = axios;
Vue.prototype.$http = axios;
// axios.defaults.baseURL = 'http://192.168.20.7:3000/mock/27/api';

// axios.defaults.baseURL = 'http://sandbox.gotobus.com/api';
// axios.defaults.baseURL = 'http://testwww.coachrun.com/';
axios.defaults.baseURL = process.env.VUE_APP_API_DOMAIN;
Vue.prototype.$api = api;



import { Message } from 'element-ui';

const tip = msg =>{
    Message({
      message: msg,
      type: 'warning',
      center: true
    });
}

const errorHandle = (status, msg) => {//code判断
  // 状态码判断
  switch (status) {
      case 500:
          // tip(msg);
          break;
      case 401:
          let localHref = location.href
          if(localHref.indexOf('logout') != -1){
            localHref = '';
          }
          if(msg.indexOf('logout')==-1){
            tip('Your login has expired. Please log in again to continue.');
          }
          if (process.env.NODE_ENV == 'development'){
            localStorage.removeItem('IvyCustomer_LoginToken');
            localStorage.removeItem("loginName");
          }
          var domain=document.domain.split('.')
          document.cookie=`IvyCustomer_LoginCookie=;domain=.${domain[1]}.${domain[2]};path=/`
          store.commit('logout');
          store.commit("notifiyBtnHide");
          setTimeout(() => {
              router.replace({name: 'Login',query:{pageUrl:localHref}});
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
      background: 'rgba(255, 255, 255, 0.97)'
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
let loginLoadTime = false;
axios.interceptors.request.use(
  config => {
      console.log(config)
      loginLoadTime = config.url.indexOf('api/users/login')!=-1?true:false;
      let apiKey = "7:1350154:0:1";
      // let apiKey = "1:0:0:1";
      // console.log(Cookies.get('IvyCustomer_LoginCookie'))
      let loginCookie = null;
      let ivyCookie = Cookies.get('IvyCustomer_LoginCookie');
      let token = null;
      //null%2B%7C%undefined2B%2B%7C%2Bundefined
      if(ivyCookie !=undefined && ivyCookie !=null&& ivyCookie!=''){
        if(ivyCookie.indexOf('undefined') ==-1 && ivyCookie.indexOf('null') ==-1) {
          loginCookie = decodeURI(Cookies.get('IvyCustomer_LoginCookie'));
          token = loginCookie.split('+|+')[2];
          if(process.env.NODE_ENV == 'development'){
            if(token){
              token = localStorage.getItem('IvyCustomer_LoginToken');
            }
          }
        }
      }
      // let loginCookie = decodeURI(Cookies.get('IvyCustomer_LoginCookie'));
      // let token = loginCookie.split('+|+')[2];
      // if(token){
      //   token = localStorage.getItem('IvyCustomer_LoginToken');
      // }
      config.data = JSON.stringify(config.data);
      config.headers['Content-Type'] ='application/json';
      // console.log(config.url.indexOf('login')==-1);
      if(config.url.indexOf('api')!=-1){
        config.headers['X-Api-Key'] = btoa(apiKey);
        if(token != null){
          config.headers['Authorization'] = token;
        }
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
          errorHandle(response.data.code,response.config.url);
      }
      if(loginLoadTime){
        setTimeout(()=>{
          tryHideFullScreenLoading();
        },2000)
      }else{
        tryHideFullScreenLoading();
      }
      return response;
  },
  error => {
      return Promise.reject(error);
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
