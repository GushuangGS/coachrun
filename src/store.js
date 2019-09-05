import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// var contactInfo=JSON.parse(localStorage.getItem("contactInfo"))
export default new Vuex.Store({
  state: {
      // contactInfo:{},
      // creditInfo:{},
      isLogin:false,//默认没有登录
      loginName:sessionStorage.getItem('loginName') || '',
      userName:'',
      sendEmail:'',
      // contactName:'',
      // creditName:''
  },
  mutations: {
    // contactInfo(state,data){//编辑
    //   state.contactInfo=data;   
    //   localStorage.setItem("contactInfo",JSON.stringify(data));
    // },
    // creditInfo(state,data){//编辑信用卡
    //   state.creditInfo=data;   
    //   localStorage.setItem("creditInfo",JSON.stringify(data));
    // },
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
    userName(state,data){
      state.userName = data;
    },
    sendEmail(state,data){
      state.sendEmail = data;
    },
    // contactName(state,data){//编辑或添加信息
    //   state.contactName = data;
    //   // localStorage.setItem("contactName",data);
    // },
    // creditName(state,data){//编辑或添加信息
    //   state.creditName = data;
    //   // localStorage.setItem("creditName",data);
    // }
  },
  actions: {
    // updateContactInfo(context,data){
    //   context.commit('contactInfo',data);
    // },
    // updateCreditInfo(context,data){
    //   context.commit('creditInfo',data);
    // },
    updateLoginName(context,data){
      context.commit('loginName',data);
    },
    updateUserName(context,data){
      context.commit('userName',data);
    },
    updateSendEmail(context,data){
      context.commit('sendEmail',data);
    },
    // updateContactName(context,data){
    //   context.commit('contactName',data);
    // },
    // updateCreditName(context,data){
    //   context.commit('creditName',data);
    // }
  }
})
