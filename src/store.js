import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// var contactInfo=JSON.parse(localStorage.getItem("contactInfo"))
export default new Vuex.Store({
  state: {
      contactInfo:{},
      creditInfo:{}
  },
  mutations: {
    contactInfo(state,data){//编辑
      state.contactInfo=data;   
      localStorage.setItem("contactInfo",JSON.stringify(data));
    },
    creditInfo(state,data){//编辑信用卡
      state.creditInfo=data;   
      localStorage.setItem("creditInfo",JSON.stringify(data));
    }
  },
  actions: {
    updateContactInfo(context,data){
      context.commit('contactInfo',data);
    },
    updateCreditInfo(context,data){
      context.commit('creditInfo',data);
    }
  }
})
