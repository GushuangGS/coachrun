import Vue from 'vue'
import Vuex from 'vuex'
// *表示把某个文件的导出全都加载到一个对象上。as表示起名或者换名。
// 把'./actions'这个文件的导出全部导入到一个对象上，并起名为actions
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
