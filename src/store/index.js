import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: {},
    etherAddress: ''
  },
  mutations: {
    editWeb3 (state, payload) {
      state.web3 = payload
    },
    editEtherAddress (state, payload) {
      state.etherAddress = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
