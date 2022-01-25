
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import editor from './editor'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{},
  mutations:{},
  actions:{},
  modules: {
    auth:auth,
    editor: editor
  },
  plugins:[
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
