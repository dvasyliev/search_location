import Api from '@/api/location'

export default {
  namespaced: true,
  state: {
    results: []
  },

  mutations: {
    'SET_LOCATIONS'(state, payload) {
      state.results = payload
    },

    'UPDATE_LOCATION'(state, payload) {
      state.results = state.results.map(result => {
        return result.id === payload.id ? payload : result
      })
    }
  },

  actions: {
    fetchAllLocations({ commit }, params) {
      return Api.fetchAll(params)
        .then(response => commit('SET_LOCATIONS', response))
        .catch(console.error)
    },

    updateLocation({ commit }, data) {
      commit('UPDATE_LOCATION', data)
    }
  }
}
