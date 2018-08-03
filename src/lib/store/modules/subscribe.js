/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:04
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-25 10:38:11
 */
import { GlCommon } from 'glsx-vue-common'
const { recursionSet } = GlCommon
const subscribe = {
  state: {
    subLoaded: false,
    resources: [],
    roles: [], // TODO CONFIRM?
    token: '',
    baseUrl: '', // TODO CONFIRM?
    whiteList: '',
    timeout: ''
  },
  mutations: {
    SET_SUBSCRIBE: (state, args) => {
      const { arr, value } = args
      recursionSet(state, arr, value)
    }
  },
  actions: {
    SetSubscribe: ({ commit }, objArgs) => {
      const { key, value } = objArgs
      if (!key || !key.startsWith('subscribe_')) {
        throw new Error('请正确设置参数格式')
      }
      const arr = key.replace('subscribe_', '')
      commit('SET_SUBSCRIBE', { arr: arr, value: value })
    }
  },
  getters: {
    subscribe: state => state
  }
}
export default subscribe
