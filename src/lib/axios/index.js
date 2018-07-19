/*
 * @Author: limin
 * @Date: 2018-06-25 10:28:18
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-19 00:38:14
 */
import axios from 'axios'
// import { ResInSession } from '@/utils/cache'
import { AppConst } from '@/lib/consts'
import { GetSessionConfigByKey } from '@/lib/prototypes'
// 创建axios实例
const service = axios.create()
// request拦截器
service.interceptors.request.use(config => {
  try {
    const whiteList = new Set(GetSessionConfigByKey(AppConst.Axios.WhiteList.Key))
    config.baseURL = GetSessionConfigByKey(AppConst.Axios.BaseURL.Key)
    config.timeout = GetSessionConfigByKey(AppConst.Axios.Timeout.Key)
    // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token
    const token = GetSessionConfigByKey(AppConst.Auth.Token.Key)
    config.headers['X-Token'] = token
    const resources = GetSessionConfigByKey(AppConst.Auth.Resources.Key)
    console.log(config.url)
    if (!whiteList.has(config.url) && resources && !resources.has(config.url)) {
      console.log(222222222222222)
      // 拦截请求
      return Promise.reject({
        message: `${config.url} 无访问权限，请联管理员`
      })
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 20000) {
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
