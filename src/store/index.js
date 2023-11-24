import Vue from 'vue'
import Vuex from 'vuex'
import navCollapse from './navCollapse'
import userMenuData from './userMenuData'
import userInfo from '@/store/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    navCollapse,
    userMenuData,
    userInfo
  }
})
