import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// var contactInfo=JSON.parse(localStorage.getItem("contactInfo"))
export default new Vuex.Store({
  state: {
      contactInfo:{}
  },
  mutations: {
    contactInfo(state,data){
      state.contactInfo=data;   
      localStorage.setItem("contactInfo",JSON.stringify(data));
    }
  },
  actions: {
    updateContactInfo(context,data){
      context.commit('contactInfo',data);
    }
  }
})
