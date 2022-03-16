import Vue from 'vue' //引入 Vue
import Vuex from 'vuex' //引入 Vuex
import graph from './modules/graph' //引入 user module

Vue.use(Vuex)
 
const store = new Vuex.Store({
  modules: {
    graph //使用 graph.js 中的 action
  },
  state: {
    count: 1
  },
  mutations: {
    increment (state) { 
      // 变更状态
      state.count++
    }
  }
})
 
export default store