/*
 * @Author: limin
 * @Date: 2018-08-12 12:52:19
 * @Last Modified by: limin
 * @Last Modified time: 2018-11-14 15:16:10
 */
const Theme = function(version = '2.4.1', defaultColor = '#409EFF') {
  this.default_color = defaultColor
  this.color = ''
  this.version = version
  this.url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
  // this.css = require('../../../static/theme-chalk.txt')
  appendStyle(this.url)
}
const change = function(val, oldVal = this.default_color) {
  if (typeof val !== 'string' || val === oldVal) return
  const _this = this
  var styleTag = document.getElementById('chalk-style')
  const getHandler = function(variable, id) {
    return function() {
      const themeCluster = getThemeCluster(val)
      const originalCluster = getThemeCluster(oldVal)
      const chalk = styleTag.innerText
      const newStyle = updateStyle(chalk, originalCluster, themeCluster)
      styleTag.innerText = newStyle
      _this.default_color = val
    }
  }
  const chalkHandler = getHandler('chalk', 'chalk-style')
  // if (!styleTag) {
  //   // getCSSString(this.css).then(css => {
  //   styleTag = document.createElement('style')
  //   styleTag.innerText = this.css
  //   styleTag.setAttribute('id', 'chalk-style')
  //   document.head.appendChild(styleTag)
  //   chalkHandler()
  //   // })
  // } else {
  var i = setInterval(function() {
    styleTag = document.getElementById('chalk-style')
    if (styleTag) {
      clearInterval(i)
      chalkHandler()
    }
  }, 100)
}
// const appendStyle = function(css) {
//   var styleTag = document.createElement('style')
//   styleTag.innerText = css
//   styleTag.setAttribute('id', 'chalk-style')
//   document.head.appendChild(styleTag)
// }
const updateStyle = function(style, oldCluster, newCluster) {
  let newStyle = style
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
  })
  return newStyle
}

const appendStyle = function(url, call) {
  var styleTag = document.getElementById('chalk-style')
  if (!styleTag) {
    getCSSString(url).then(css => {
      styleTag = document.createElement('style')
      styleTag.innerText = css
      styleTag.setAttribute('id', 'chalk-style')
      document.head.appendChild(styleTag)
      call && call()
    })
  }
  call && call()
}

const getCSSString = function(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const css = xhr.responseText.replace(/@font-face{[^}]+}/, '')
        resolve(css)
      }
    }
    xhr.open('GET', url)
    xhr.send()
  })
}

const getThemeCluster = function(theme) {
  theme = theme.replace('#', '')
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    if (tint === 0) { // when primary color is in its rgb space
      return [red, green, blue].join(',')
    } else {
      red += Math.round(tint * (255 - red))
      green += Math.round(tint * (255 - green))
      blue += Math.round(tint * (255 - blue))

      red = red.toString(16)
      green = green.toString(16)
      blue = blue.toString(16)

      return `#${red}${green}${blue}`
    }
  }

  const shadeColor = function(color, shade) {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)

    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)

    return `#${red}${green}${blue}`
  }
  const clusters = [theme]
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
  }
  clusters.push(shadeColor(theme, 0.1))
  return clusters
}
Theme.prototype.change = change
export default Theme
