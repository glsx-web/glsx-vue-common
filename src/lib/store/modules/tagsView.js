/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:23
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-12 10:06:06
 */
const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.fullPath === view.fullPath)) return
      state.visitedViews.push(Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      }))
      if (view.meta.keepAlive) {
        state.cachedViews.push(view.name)
      }
    },
    VISITED_VIEWS: (state, view) => {
      if (view.meta.keepAlive) {
        state.cachedViews.push(view.name)
      } else {
        for (const i of state.cachedViews) {
          if (i === view.name) {
            const index = state.cachedViews.indexOf(i)
            state.cachedViews.splice(index, 1)
            break
          }
        }
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.fullPath === view.fullPath) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.fullPath === view.fullPath) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          break
        }
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
      state.cachedViews = []
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    saveKeepStatus({ commit, state }, view) {
      commit('VISITED_VIEWS', view)
    }
  },
  getters: {
    visitedViews: state => state.visitedViews,
    cachedViews: state => state.cachedViews
  }
}

export default tagsView
