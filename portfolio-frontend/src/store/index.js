
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import author from './author'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{},
  mutations:{},
  actions:{},
  modules: {
    auth:auth,
    author:author
  },
  plugins:[
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
