/*
 * @Author: limin
 * @Date: 2018-06-23 11:13:44
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-18 03:41:33
 */
export function isObject(val) {
  return val !== null && typeof val === 'object'
}
export function set(key, val, type = 'localStorage') {
  if (isObject(val)) window[type].setItem(key, JSON.stringify(val))
  else window[type].setItem(key, val)
}
export function get(key, type = 'localStorage') {
  var val = window[type].getItem(key)
  try {
    const value = JSON.parse(val)
    return (value)
  } catch (e) {
    throw e
  }
}
export function remove(key, type = 'localStorage') {
  window[type].removeItem(key)
}
export function setSession(key, val) {
  set(key, val, 'sessionStorage')
}
export function getSession(key) {
  return get(key, 'sessionStorage')
}
export function removeSession(key) {
  remove(key, 'sessionStorage')
}
// 默认30minute
export function setExpire(key, val, ex = 1.8e6) {
  set(key, { v: val, t: Date.now() + ex })
}
export function getExpire(key) {
  var obj = get(key)
  if (obj.t > Date.now()) return obj.v
  else return false
}
