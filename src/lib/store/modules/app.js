/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:04
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-25 10:04:01
 */
import { recursionSet } from '@/common'
const app = {
  state: {
    device: 'desktop',
    clientHeight: '',
    defaultColor: '',
    auth: {
      resources: [],
      roles: [],
      token: '',
      navs: {
        first: [],
        second: [],
        third: [],
        fourth: [],
        fifth: []
      }
    }
  },
  mutations: {
    SET_APP: (state, args) => {
      const { arr, value } = args
      recursionSet(state, arr, value)
    },
    INIT_APP: (state, args) => {
      state = Object.assign(state, args)
    }
  },
  actions: {
    SetApp: ({ commit }, objArgs) => {
      const { key, value } = objArgs
      if (!key || !key.startsWith('app_')) {
        throw new Error('请正确设置参数格式')
      }
      const arr = key.replace('app_', '')
      commit('SET_APP', { arr: arr, value: value })
    },
    InitApp: ({ commit }, objApp) => {
      commit('INIT_APP', objApp)
    }
  },
  getters: {
    device: state => state.device,
    clientHeight: state => state.clientHeight,
    app: state => state
  }
}
export default app
