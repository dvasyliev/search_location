import Vue from 'vue'
import Vuex from 'vuex'

import locations from '@/store/modules/location/collection'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    locations
  }
})
