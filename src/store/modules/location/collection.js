import Api from '@/api/location'
import { toUSD } from '@/utils/currency'

export default {
  namespaced: true,

  state: {
    results: []
  },

  getters: {
    locations: state => {
      return state.results.map(result => {
        result.currencyUSD = toUSD(result.currency)

        return result
      })
    }
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
