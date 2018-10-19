/*
 * @Author: limin
 * @Date: 2018-06-25 10:28:18
 * @Last Modified by: limin
 * @Last Modified time: 2018-10-19 10:31:26
 */
import axios from 'axios'
// import { ResInSession } from '@/utils/cache'
import { GetCommonConfig } from '@/lib/prototypes'
axios.defaults.withCredentials = true
import qs from 'qs'
// 创建axios实例
const service = axios.create({
  // baseURL: GetSessionConfigByKey(AppConst.Axios.BaseURL.Key),
  // timeout: GetSessionConfigByKey(AppConst.Axios.Timeout.Key)
})
// request拦截器
service.interceptors.request.use(config => {
  try {
    const { whiteList, baseURL, timeout } = configFactory().axios
    config.baseURL = baseURL
    config.timeout = timeout
    config.transformRequest = [function(data) {
      if (config.requestType === 'jsonString') {
        return JSON.stringify(data)
      }
      return qs.stringify(data)
    }]
    // const resources = GetConfigByKey(AppConst.Auth.Resources.Key) //TODO URL鉴权
    if (!whiteList.some(url => url === config.url)) {
      // 拦截请求
      return Promise.reject({
        message: `${config.url} 无访问权限，请联管理员`
      })
    }
  } catch (error) {
    return Promise.reject(error)
  }
  return config
}, error => {
  return Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const { result } = configFactory().axios
    const res = response.data
    const code = res[result.code_key || 'returnCode'] // 返回值状态码
    if (+code !== +result.code_success_value) { // 比对配置的成功状态码与返回状态码 如果不成功 则读取配置的错误信息映射
      const cmm = result.code_message_map
      const msg = res[result.message_key || 'message'] || cmm[code] || '返回错误'
      return Promise.reject(msg)
    } else { // 成功 则返回成功消息体
      return res[result.data_key || 'data']
    }
  },
  error => {
    return Promise.reject(error)
  }
)
let config
function configFactory() {
  let cfg
  if (config) {
    cfg = config
  } else {
    cfg = GetCommonConfig()
  }
  return cfg
}
export default service
