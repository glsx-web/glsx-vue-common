/*
 * @Author: limin
 * @Date: 2018-06-25 10:28:09
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-19 20:01:06
 */
import { AppConst } from '@/lib/consts'
import { recursionGet, get, getSession, Consts, recursionSet, setSession, set, removeSession, remove, firstUpperCase } from '@/common'
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
}

const GetConfigByKey = (key) => {
  if (!key) throw new Error('no key')
  const configLocal = get(Consts.LOCAL_CONFIG.KEY)
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

const GetSessionConfigByKey = (key) => {
  if (!key) throw new Error('no key')
  const configSession = getSession(Consts.SESSION_CONFIG.KEY) || {}
  var result = recursionGet(configSession, key)
  return result
}

const SetSessionConfigByKey = (key, value) => {
  if (!key) throw new Error('no key')
  const configSession = getSession(Consts.SESSION_CONFIG.KEY) || {}
  recursionSet(configSession, key, value)
  setSession(Consts.SESSION_CONFIG.KEY, configSession)
}

const SetSessionConfig = (objConfig) => {
  setSession(Consts.SESSION_CONFIG.KEY, objConfig)
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
  setSession(Consts.TOKEN.KEY, token)
}

const GetToken = () => {
  return getSession(Consts.TOKEN.KEY)
}

const RemoveToken = () => {
  removeSession(Consts.TOKEN.KEY)
}

export default {
  install(Vue) {
    Vue.prototype.$Get = get
    Vue.prototype.$Set = set
    Vue.prototype.$set_session = setSession
    Vue.prototype.$get_session = getSession
    Vue.prototype.$Remove = remove
    Vue.prototype.$remove_session = removeSession
    Vue.prototype.$gl_has = GlHas
    Vue.prototype.$get_config = GetConfig
    Vue.prototype.$set_config = SetConfig
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
    Vue.prototype.$fist_uppercase = firstUpperCase
  }
}
export {
  SetConfig,
  GetConfig,
  SetConfigByKey,
  GetConfigByKey,
  GetSessionConfigByKey,
  SetSessionConfigByKey,
  GetSessionConfig,
  SetSessionConfig,
  RemoveSessionConfig,
  RemoveConfig
}
