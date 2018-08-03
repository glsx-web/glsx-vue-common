/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:28
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-22 23:29:43
 */
import { logout, getInfo } from '@/api/user'
import { SetSessionConfigByKey, RemoveToken, RemoveSessionConfig } from '@/common'
import { AppConst, HeaderConst } from '@lib/consts'
const user = {
  actions: {
    // 获取用户信息
    GetInfo({ dispatch }, token) {
      return new Promise((resolve, reject) => {
        getInfo.req(token).then(response => {
          const { roles, name, avatar } = response.data
          if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
            dispatch('SetApp', { key: AppConst.Auth.Roles.Key, value: roles }, { root: true })
              .then(() => SetSessionConfigByKey(AppConst.Auth.Roles.Key, roles))
            dispatch('SetHeader', { key: HeaderConst.Navbar.User.Name.Key, value: name }, { root: true })
              .then(() => SetSessionConfigByKey(HeaderConst.Navbar.User.Name.Key, name))
            dispatch('SetHeader', { key: HeaderConst.Navbar.User.Avatar.Key, value: avatar }, { root: true })
              .then(() => SetSessionConfigByKey(HeaderConst.Navbar.User.Avatar.Key, avatar))
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {
          throw error
        })
      })
    },

    // 登出
    Logout({ dispatch }, token) {
      return new Promise(resolve => {
        logout.req(token).then(() => {
          RemoveToken()
          RemoveSessionConfig()
          resolve()
        }).catch(error => {
          resolve()
          throw error
        })
      })
    }
  }
}
export default user
