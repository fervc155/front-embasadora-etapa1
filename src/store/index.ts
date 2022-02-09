import { createStore } from 'vuex'
import Token from '@/config/token';

export default createStore({
  strict: true, // process.env.NODE_ENV !== 'production',
  state: {
    isSidebarMinimized: false,
    tokenData:false,
  },   
  mutations: {
    updateSidebarCollapsedState(state, isSidebarMinimized) {
      state.isSidebarMinimized = isSidebarMinimized
    },
    setTokenDataMutation(state, tokenData) {
      state.tokenData = tokenData
    },
    logout(state) {
      state.tokenData = false;
    }
  },
  actions:{
    setTokenDataAction(context){
      context.commit('setTokenDataMutation');
    }
  }
})
