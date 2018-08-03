/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:18
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-09 21:06:33
 */
const errorLog = {
  state: {
    logs: []
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log)
    }
  },
  actions: {
    addErrorLog({ commit }, log) {
      commit('ADD_ERROR_LOG', log)
    }
  },
  getters: {
    errorLogs: state => state.errorLog.logs
  }
}

export default errorLog
