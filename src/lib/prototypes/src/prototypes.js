/*
 * @Author: limin
 * @Date: 2018-06-25 10:28:09
 * @Last Modified by: limin
 * @Last Modified time: 2018-09-30 10:25:43
 */
import { setSession, getSession, removeSession, get, set, remove } from '@/common/src/storage'
import * as Consts from '@/common/src/const'
import Penpal from '@/common/src/penpal'
import Theme from '@/common/src/theme'
import { AppConst } from '@/lib/consts'
import GlAxios from '@/lib/axios'
import { recursionGet, recursionSet, firstUpperCase, merge, deepClone, dropWhile, debounce, colorToRgb } from '@/common/src/functions'

const GlHas = (res) => {
  let aRes = []
  let has = true
  // 提取权限数组
  if (Array.isArray(res)) {
    res.forEach((e) => {
      aRes = aRes.concat(e)
    })
  } else {
    aRes = aRes.concat(res)
  }
  const resources = GetSessionConfigByKey(AppConst.Auth.Resources.Key)
  // 校验权限
  aRes.forEach((p) => {
    if (!resources.has(p)) {
      has = false
      return false
    }
  })
  return has
}
const SetConfigByKey = (key, value) => {
  if (!key) throw new Error('no key')
  const configLocal = get(Consts.LOCAL_CONFIG.KEY) || {}
  recursionSet(configLocal, key, value)
  set(Consts.LOCAL_CONFIG.KEY, configLocal)
  return configLocal
}

const GetConfigByKey = (key) => {
  if (!key) throw new Error('no key')
  const configLocal = get(Consts.LOCAL_CONFIG.KEY)
  if (!configLocal) return null
  return recursionGet(configLocal, key)
}

const GetConfig = () => {
  return get(Consts.LOCAL_CONFIG.KEY)
}

const SetConfig = (objConfig) => {
  const configLocal = get(Consts.LOCAL_CONFIG.KEY)
  const cfg = Object.assign({}, objConfig, configLocal)
  set(Consts.LOCAL_CONFIG.KEY, cfg)
  return cfg
}

const CoverConfig = (objConfig) => {
  set(Consts.LOCAL_CONFIG.KEY, objConfig)
}

const GetSessionConfigByKey = (key) => {
  if (!key) throw new Error('no key')
  const configSession = getSession(Consts.SESSION_CONFIG.KEY) || {}
  if (!configSession) return null
  var result = recursionGet(configSession, key)
  return result
}

const SetSessionConfigByKey = (key, value) => {
  if (!key) throw new Error('no key')
  const configSession = getSession(Consts.SESSION_CONFIG.KEY) || {}
  recursionSet(configSession, key, value)
  setSession(Consts.SESSION_CONFIG.KEY, configSession)
  return configSession
}

const SetSessionConfig = (objConfig) => {
  setSession(Consts.SESSION_CONFIG.KEY, objConfig)
}

const SetCommonConfig = (objConfig) => {
  setSession(Consts.COMMON_COFIG.KEY, objConfig)
}
const GetCommonConfig = () => {
  return getSession(Consts.COMMON_COFIG.KEY)
}

const GetSessionConfig = () => {
  return getSession(Consts.SESSION_CONFIG.KEY)
}

const RemoveSessionConfig = () => {
  removeSession(Consts.SESSION_CONFIG.KEY)
}

const RemoveConfig = () => {
  remove(Consts.LOCAL_CONFIG.KEY)
}

const SetToken = (token) => {
  SetConfigByKey(AppConst.Auth.Token.KEY, token)
}

const GetToken = () => {
  return GetConfigByKey(AppConst.Auth.Token.KEY)
}

const RemoveToken = () => {
  removeSession(AppConst.Auth.Token.KEY)
}
const RemoveAuth = (config = get(Consts.LOCAL_CONFIG.KEY)) => {
  delete config.app.auth
  delete config.app.axios
  set(Consts.LOCAL_CONFIG.KEY, config)
  return config
}
const ClientHeight = () => {
  return document.height || document.body.offsetHeight
}
/**
 * 根据父id 获取菜单列表
 * @param {*} aResources 权限资源
 * @param {*} pid  父id
 */
const GetMenus = (aResources = GetSessionConfigByKey(AppConst.Auth.Resources.Key), parentId, parentName) => {
  var result = []
  var temp
  for (var key in aResources) {
    if (aResources[key][parentName || 'parentId'] === parentId) {
      result.push(aResources[key])
      temp = GetMenus(aResources, aResources[key].id)
      if (temp.length > 0) {
        aResources[key].children = temp
      }
    }
  }
  return result
}
export default {
  install(Vue) {
    Vue.prototype.$Get = get
    Vue.prototype.$Set = set
    Vue.prototype.$set_session = setSession
    Vue.prototype.$get_session = getSession
    Vue.prototype.$Remove = remove
    Vue.prototype.$remove_session = removeSession
    Vue.prototype.$remove_auth = RemoveAuth
    Vue.prototype.$gl_has = GlHas
    Vue.prototype.$get_config = GetConfig
    Vue.prototype.$set_config = SetConfig
    Vue.prototype.$cover_config = CoverConfig
    Vue.prototype.$get_session_config = GetSessionConfig
    Vue.prototype.$set_session_config = SetSessionConfig
    Vue.prototype.$remove_session_config = RemoveSessionConfig
    Vue.prototype.$get_config_by_key = GetConfigByKey
    Vue.prototype.$set_config_by_key = SetConfigByKey
    Vue.prototype.$get_session_config_by_key = GetSessionConfigByKey
    Vue.prototype.$set_session_config_by_key = SetSessionConfigByKey
    Vue.prototype.$remove_session_config = RemoveSessionConfig
    Vue.prototype.$remove_config = RemoveConfig
    Vue.prototype.$set_token = SetToken
    Vue.prototype.$get_token = GetToken
    Vue.prototype.$remove_token = RemoveToken
    Vue.prototype.$recursion_get = recursionGet
    Vue.prototype.$recursion_set = recursionSet
    Vue.prototype.$first_uppercase = firstUpperCase
    Vue.prototype.$get_menus = GetMenus
    Vue.prototype.$Penpal = Penpal
    Vue.prototype.$Theme = Theme
    Vue.prototype.$merge = merge
    Vue.prototype.$deep_clone = deepClone
    Vue.prototype.$drop_while = dropWhile
    Vue.prototype.$debounce = debounce
    Vue.prototype.$color_to_rgb = colorToRgb
    Vue.prototype.$client_height = ClientHeight
    Vue.prototype.$http = GlAxios
  }
}
export {
  SetConfig,
  GetConfig,
  GetToken,
  RemoveToken,
  SetConfigByKey,
  GetConfigByKey,
  GetSessionConfigByKey,
  SetSessionConfigByKey,
  GetSessionConfig,
  SetSessionConfig,
  SetCommonConfig,
  GetCommonConfig,
  RemoveSessionConfig,
  RemoveConfig,
  GetMenus,
  Penpal
}
