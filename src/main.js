import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'
import BootstrapVue from 'bootstrap-vue'

// 引入font-awesome图标字体
import 'font-awesome/css/font-awesome.min.css'
import './common/css/index.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
