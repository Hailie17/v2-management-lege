export default {
  namespaced: true, // 命名空间属性 在 Vuex 状态管理库中创建一个独立的命名空间，避免不同模块状态冲突, 使模块之间的耦合度降低
  state: {
    menuData: []
  },
  mutations: {
    // changeCollapse (state){
    //   state.isCollapse = !state.isCollapse
    // }
  }
}
