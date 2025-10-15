import { getToken, setToken } from '@/utils/auth'

const state = {
  token: getToken()
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  }
}

const actions = {
  login(context, data) {
    console.log(data)
    context.commit('setToken', '123456')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

