import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import marp from './modules/marp'

Vue.use(Vuex)

const persistedState = (opts = {}) =>
  createPersistedState({
    key: 'marp',
    paths: ['marp.index'],
    ...opts,
  })

const reloadFromStorage = persistedState({ subscriber: () => () => {} })

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: { marp },
  mutations: {
    reload() {
      reloadFromStorage(this)
    },
  },
  actions: {
    reload({ commit }, storageEvent) {
      if (storageEvent && storageEvent.key === '@@') return
      commit('reload')
    },
  },
  plugins: [persistedState()],
})
