import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
// import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from './plugins/en.js'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import api from './configs/api'


// 引入font-awesome图标字体
import 'font-awesome/css/font-awesome.min.css'
import './common/css/index.css'

Vue.use(BootstrapVue);
Vue.use(ElementUI,{ locale });

Vue.config.productionTip = false;

//配置axios 挂载到实例化对象上
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://192.168.20.7:3000/mock/27/api';
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
