/*
 * @Author: limin
 * @Date: 2018-06-25 10:28:04
 * @Last Modified by: limin
 * @Last Modified time: 2018-08-15 17:39:54
 */
const directives = {}
directives.install = Vue => {
// 权限指令
  Vue.directive('gl-if', {
    bind: (el, binding) => {
      if (!Vue.prototype.$gl_has(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
export default directives
