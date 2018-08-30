/*
 * @Author: limin
 * @Date: 2018-06-25 10:28:18
 * @Last Modified by: limin
 * @Last Modified time: 2018-08-30 04:06:26
 */
import axios from 'axios'
// import { ResInSession } from '@/utils/cache'
import { AppConst } from '@/lib/consts'
import { GetSessionConfigByKey } from '@/lib/prototypes'
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
    const whiteList = GetSessionConfigByKey(AppConst.Axios.WhiteList.Key)
    config.baseURL = GetSessionConfigByKey(AppConst.Axios.BaseURL.Key)
    config.timeout = GetSessionConfigByKey(AppConst.Axios.Timeout.Key)
    config.transformRequest = [function(data) {
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
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (+res.returnCode !== 0) {
      // Message({
      //   message: res.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }
      // ).then(() => {
      //     // store.dispatch('FedLogOut').then(() => {
      //     //   location.reload()// 为了重新实例化vue-router对象 避免bug
      //     // })
      //   })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
