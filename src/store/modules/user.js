import { getToken, setToken } from '@/utils/auth'

import { login, getUserInfo } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  async login(context, data) {
    const token = await login(data)
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

