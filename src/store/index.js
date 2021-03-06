import Vuex from 'vuex'
import Vue from 'vue'
import mainStore from './mainStore'
import accountStore from './accountStore'
import authStore from './authStore'
import transactionStore from './transactionStore'
import pkidStore from './pkidStore'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    mainStore,
    accountStore,
    authStore,
    transactionStore,
    pkidStore
  }
})
