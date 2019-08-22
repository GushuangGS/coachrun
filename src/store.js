import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// var contactInfo=JSON.parse(localStorage.getItem("contactInfo"))
export default new Vuex.Store({
  state: {
      contactInfo:{},
      creditInfo:{},
      isLogin:false,//默认没有登录
      loginName:sessionStorage.getItem('loginName') || '',
      sendEmail:''
  },
  mutations: {
    contactInfo(state,data){//编辑
      state.contactInfo=data;   
      localStorage.setItem("contactInfo",JSON.stringify(data));
    },
    creditInfo(state,data){//编辑信用卡
      state.creditInfo=data;   
      localStorage.setItem("creditInfo",JSON.stringify(data));
    },
    login(state){
      state.isLogin = true;
    },
    logout(state){
      state.isLogin = false;
    },
    loginName(state,data){
      sessionStorage.setItem('loginName', data);
      state.loginName = data;
    },
    sendEmail(state,data){
      state.sendEmail = data;
    }
  },
  actions: {
    updateContactInfo(context,data){
      context.commit('contactInfo',data);
    },
    updateCreditInfo(context,data){
      context.commit('creditInfo',data);
    },
    updateLoginName(context,data){
      context.commit('loginName',data);
    },
    updateSendEmail(context,data){
      context.commit('sendEmail',data);
    }
  }
})
