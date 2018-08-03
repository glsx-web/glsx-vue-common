/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:14
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-22 23:28:03
 */
import { AppConst } from '@/lib/consts'

const permission = {
  state: {
    routers: []
    // addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { routers, routes, roles } = data
        const routesSet = new Set(routes)
        const rolesSet = new Set(roles)
        const filetrRouters = rolesSet.has(AppConst.Auth.Admin.Key) ? routers : routerFilter(routers, routesSet)
        commit('SET_ROUTERS', filetrRouters)
        resolve()
      })
    }
  },
  getters: {
    routers: state => state.routers
    // addRouters: state => state.addRouters
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routerMap
 * @param routes
 */
function routerFilter(routerMap, routes) {
  const filetrRouters = routerMap.filter(route => {
    if (hasPermission(routes, route)) {
      if (route.children && route.children.length) {
        route.children = routerFilter(route.children, routes)
      }
      return true
    }
    return false
  })
  return filetrRouters
}
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param routes
 * @param route
 */
function hasPermission(routes, route) {
  return route.meta && route.meta.permission && routes.has(route.meta.permission)
}

export default permission
