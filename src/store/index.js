import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: false,
    cur_post_id: null
  },
  mutations: {
    signedIn(state, status){
      state.signedIn = status;
    },
    cur_post_id(state, id){
      state.cur_post_id = id;
    }
  },
  getters:{
    signedIn(state){
      return state.signedIn;
    },
    cur_post_id(state){
      return state.cur_post_id;
    }
  }
  ,
  actions: {
  },
  modules: {
  }
})
