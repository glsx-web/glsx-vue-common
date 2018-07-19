/*
 * @Author: limin
 * @Date: 2018-06-23 11:57:23
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-18 23:27:01
 */
import { setSession, getSession, removeSession, get, set, remove } from './src/storage'
import * as Consts from './src/const'
import {
  SetConfig,
  GetConfig,
  SetConfigByKey,
  GetConfigByKey,
  GetSessionConfigByKey,
  SetSessionConfigByKey,
  GetSessionConfig,
  SetSessionConfig,
  RemoveSessionConfig,
  RemoveConfig } from '@/lib/prototypes'
/**
 * 给对象  key包含的属性赋值 key 描述一个对象属性
 * 如 对象为obj
 * 即 obj.prop1.prop2.prop3 = value
 */
const recursionSet = (obj, key, value) => {
  var arr = key.split('_')
  if (arr.length > 1) {
    var p = arr.shift()
    obj[p] = obj[p] || {}
    recursionSet(obj[p], arr.join('_'), value)
  } else {
    obj[arr[0]] = value
  }
}
const recursionGet = (obj, key) => {
  var arrKeys = key.split('_')
  var result = ''
  if (arrKeys.length > 1) {
    var p = arrKeys.shift()
    return recursionGet(obj[p] || {}, arrKeys.join('_'))
  } else {
    result = obj[arrKeys[0]]
    return result
  }
}
const firstUpperCase = (str) => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
// const setConfig = function(obj, parent, callback) {
//   for (var o in obj) {
//     if (isJson(obj[o])) {
//       setConfig(obj[o], parent + '_' + o)
//     } else {
//       callback && callback(parent + '_' + o, obj[o])
//     }
//   }
// }
// const isJson = function(obj) {
//   var isjson = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length
//   return isjson
// }
export {
  setSession,
  getSession,
  removeSession,
  remove,
  get,
  set,
  Consts,
  recursionGet,
  recursionSet,
  firstUpperCase,
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
