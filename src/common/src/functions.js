/**
 * 给对象  key包含的属性赋值 key 描述一个对象属性
 * 如 对象为obj
 * 即 obj.prop1.prop2.prop3 = value
 */
export const recursionSet = (obj, key, value) => {
  var arr = key.split('_')
  if (arr.length > 1) {
    var p = arr.shift()
    obj[p] = obj[p] || {}
    recursionSet(obj[p], arr.join('_'), value)
  } else {
    obj[arr[0]] = value
  }
}
export const recursionGet = (obj, key) => {
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
export const firstUpperCase = (str) => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())

export function debounce(func, wait, immediate) {
  let timeout
  return function() {
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export const merge = (def, obj) => {
  if (!obj) {
    return def
  } else if (!def) {
    return obj
  }
  for (var i in obj) {
    // if its an object
    if (obj[i] != null && obj[i].constructor === Object) {
      def[i] = merge(def[i], obj[i])
    } else if (obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) { // if its an array, simple values need to be joined. Object values need to be remerged.
      if (obj[i][0].constructor === Object) { // test to see if the first element is an object or not so we know the type of array we're dealing with.
        var newobjs = []
        var objids = {} // create an index of all the existing object IDs for quick access. There is no way to know how many items will be in the arrays.
        for (let x = 0, l = def[i].length; x < l; x++) {
          objids[def[i][x].id] = x
        }
        // now walk through the objects in the new array
        // if the ID exists, then merge the objects.
        // if the ID does not exist, push to the end of the def array
        for (let x = 0, l = obj[i].length; x < l; x++) {
          var newobj = obj[i][x]
          if (objids[newobj.id] !== undefined) {
            def[i][x] = merge(def[i][x], newobj)
          } else {
            newobjs.push(newobj)
          }
        }

        for (var x = 0, l = newobjs.length; x < l; x++) {
          def[i].push(newobjs[x])
        }
      } else {
        for (let x = 0; x < obj[i].length; x++) {
          var idxObj = obj[i][x]
          if (def[i].indexOf(idxObj) === -1) {
            def[i].push(idxObj)
          }
        }
      }
    } else {
      def[i] = obj[i]
    }
  }
  return def
}

export const deepClone = (obj) => {
  // Handle the 3 simple types, and null or undefined or function
  if (obj == null || typeof obj !== 'object') return obj
  // Handle Date
  if (obj instanceof Date) {
    const copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }
  // Handle Array or Object
  if (obj instanceof Array | obj instanceof Object) {
    const copy = (obj instanceof Array) ? [] : {}
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) { copy[attr] = deepClone(obj[attr]) }
    }
    return copy
  }
  throw new Error("Unable to clone obj! Its type isn't supported.")
}

export const dropWhile = (array, [key, value]) => {
  for (var i = 0, j = array.length; i < j; i++) {
    if (array[i][key] === value) {
      array.splice(i, 1)
      break
    }
  }
  return array
}
