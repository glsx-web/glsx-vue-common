/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:04
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-22 23:26:50
 */
import { recursionSet } from '@/common'
const header = {
  state: {
    'visible': '',
    'height': 60,
    'navbar': {
      'visible': '',
      'itemsArray': '',
      'height': 60,
      'user': {
        'visible': '',
        'avatar': {
          'visible': '',
          'value': ''
        },
        'name': {
          'visible': '',
          'value': ''
        }
      },
      'screenfull': {
        'visible': '',
        'i18n': 'navbar.screenfull',
        'value': ''
      },
      'logout': {
        'visible': '',
        'i18n': 'navbar.logOut',
        'value': ''
      },
      'language': {
        'visible': '',
        'i18n': 'navbar.language',
        'value': ''
      },
      'settings': {
        'visible': '',
        'i18n': 'navbar.settings',
        'value': ''
      },
      'theme': {
        'visible': '',
        'i18n': 'navbar.theme',
        'value': '',
        'preDefineColors': [
          '#409EFF',
          '#FF0000'
        ]
      }
    },
    'tagsView': {
      'visible': '',
      'height': '',
      'activeColor': ''
    }
  },
  mutations: {
    SET_HEADER: (state, args) => {
      const { arr, value } = args
      recursionSet(state, arr, value)
    },
    INIT_HEADER: (state, args) => {
      state = Object.assign(state, args)
    }
  },
  actions: {
    SetHeader: ({ commit }, objArgs) => {
      const { key, value } = objArgs
      if (!key || !key.startsWith('header_')) {
        throw new Error('请正确设置参数格式')
      }
      const arr = key.replace('header_', '')
      commit('SET_HEADER', { arr: arr, value: value })
    },
    InitHeader: ({ commit }, objHeader) => {
      commit('INIT_HEADER', objHeader)
    }
  },
  getters: {
    header: state => state
  }
}

export default header
