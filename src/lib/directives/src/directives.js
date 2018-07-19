/*
 * @Author: limin
 * @Date: 2018-06-25 10:28:04
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-18 23:34:18
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
  Vue.directive('drag', // 自定义指令
    { bind: function(el, binding) {
      const oDiv = el // 当前元素
      oDiv.onmousedown = function(e) {
      // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - oDiv.offsetLeft
        document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
          const l = e.clientX - disX
          // 将此时的位置传出去
          document.body.style.cursor = 'e-resize'
          binding.value({ x: e.pageX, y: e.pageY, left: l })
          e.preventDefault()
          return false
        }
        document.onmouseup = function(e) {
          document.onmousemove = null
          document.onmouseup = null
          document.body.style.cursor = 'default'
        }
      }
    }
    }
  )
}
export default directives
