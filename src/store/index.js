import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

import permission from './modules/permission'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    permission: permission
  }

})
