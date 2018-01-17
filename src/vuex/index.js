//组装模块并导出 store

import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as actions from './actions'
import state from './states'
Vue.use(Vuex);

/*注意结构的时候名称*/
export default new Vuex.Store({
  state,
  mutations,
  actions
})
