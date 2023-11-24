import { GetUserInfoApi } from '@/request/api'

export default {
  namespaced: true, // 命名空间属性 在 Vuex 状态管理库中创建一个独立的命名空间，避免不同模块状态冲突, 使模块之间的耦合度降低
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {
      user: null,
      permissions: null,
      roles: null
    }
  },
  mutations: {
    changeUserInfo (state, playload) {
      state.userInfo = playload
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  },
  actions: {
    async asyncChangeUserInfo ({ commit }, playload) {
      const getUserInfoRes = await GetUserInfoApi()
      if (!getUserInfoRes) return
      commit('changeUserInfo', {
        user: getUserInfoRes.user,
        permissions: getUserInfoRes.permissions,
        roles: getUserInfoRes.roles
      })
    }
  }
}
