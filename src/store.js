import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// var contactInfo=JSON.parse(localStorage.getItem("contactInfo"))
export default new Vuex.Store({
  state: {
      isLogin:false,//默认没有登录
      loginName:localStorage.getItem('loginName') || '',
      userName:'',
      sendEmail:'',
      notifiyBtn:false,
      showUserName:'',//编辑contact-info更改first-name
  },
  mutations: {
    login(state){
      state.isLogin = true;
      // console.log(state)
    },
    logout(state){
      state.isLogin = false;
    },
    loginName(state,data){
      localStorage.setItem('loginName', data);
      state.loginName = data;
    },
    userName(state,data){
      state.userName = data;
    },
    sendEmail(state,data){
      state.sendEmail = data;
    },
    notifiyBtnShow(state){
      state.notifiyBtn = true;
    },
    notifiyBtnHide(state){
      state.notifiyBtn = false;
    },
    showUserName(state,data){
      state.showUserName = data;
    }
  },
  actions: {
    updateLoginName(context,data){
      context.commit('loginName',data);
    },
    updateUserName(context,data){
      context.commit('userName',data);
    },
    updateSendEmail(context,data){
      context.commit('sendEmail',data);
    },
    updateShowUserName(context,data){
      context.commit('showUserName',data);
    }
  }
})
