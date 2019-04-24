/* eslint-disable no-param-reassign */
import markdown from '../../../public/slide.md'

const marp = {
  namespaced: true,
  state: {
    markdown,
    index: 0,
    pages: undefined,
  },
  mutations: {
    updateIndex(state, index) {
      state.index = index
    },
    updatePages(state, pages) {
      state.pages = pages
    },
  },
  actions: {
    next: {
      root: true,
      handler: ({ state, dispatch }) =>
        dispatch('slideTo', state.index + 1, { root: true }),
    },
    prev: {
      root: true,
      handler: ({ state, dispatch }) =>
        dispatch('slideTo', state.index - 1, { root: true }),
    },
    first: {
      root: true,
      handler: ({ dispatch }) => dispatch('slideTo', 0, { root: true }),
    },
    last: {
      root: true,
      handler: ({ state, dispatch }) =>
        dispatch('slideTo', state.pages - 1, { root: true }),
    },
    slideTo: {
      root: true,
      handler: ({ state, commit }, to) => {
        const { index, pages } = state
        const idx = Math.min(
          Math.max(0, to),
          pages != null ? pages - 1 : Number.POSITIVE_INFINITY
        )

        if (index !== idx) commit('updateIndex', idx)
      },
    },
    updatePages({ state, commit, dispatch }, pages) {
      const pageNumber = Number.parseInt(pages, 10)
      if (state.pages !== pageNumber) commit('updatePages', pageNumber)

      // Normalize slide index
      dispatch('slideTo', state.index, { root: true })
    },
  },
}

export default marp
