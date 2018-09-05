/*
 * @Author: limin
 * @Date: 2018-08-12 12:52:19
 * @Last Modified by: limin
 * @Last Modified time: 2018-09-01 14:29:09
 */
const Theme = (version = '2.4.0', defaultColor = '#409EFF') => {
  this.default_color = defaultColor
  this.color = ''
  this.version = version
  this.chalk = ''
  this.url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
  this.originalCluster = getThemeCluster(defaultColor)
}
const change = (val, oldVal = this.default_color) => {
  if (typeof val !== 'string') return
  const themeCluster = getThemeCluster(val)
  // const originalCluster = getThemeCluster(oldVal)
  const styleTag = document.getElementById('chalk-style')
  const getHandler = (variable, id) => {
    return () => {
      // const originalCluster = getThemeCluster(this.default_color)
      // const styleTag = document.getElementById(id)
      const chalk = styleTag.innerText
      // const originalCluster = getThemeCluster(this.color)
      const newStyle = updateStyle(chalk, this.originalCluster, themeCluster)
      // if (!styleTag) {
      //   styleTag = document.createElement('style')
      //   styleTag.setAttribute('id', id)
      //   document.head.appendChild(styleTag)
      // }
      styleTag.innerText = newStyle
    }
  }

  const chalkHandler = getHandler('chalk', 'chalk-style')
  if (!styleTag) {
    // getCSSString(this.url, chalkHandler, 'chalk')
    const styles = [...document.querySelectorAll('style')]
    styles.forEach(style => {
      const { innerText } = style
      if (typeof innerText === 'string' && new RegExp(oldVal, 'i').test(innerText) && !/Chalk Variables/.test(innerText)) {
        // this.chalk += innerText.replace(/@font-face{[^}]+}/, '')
        style.innerText = updateStyle(innerText, this.originalCluster, themeCluster)
        style.setAttribute('id', 'chalk-style')
      }
    })
  } else {
    chalkHandler()
  }
  this.originalCluster = themeCluster
  // const styles = [...document.querySelectorAll('style')]
  //   .filter(style => {
  //     const text = style.innerText
  //     return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
  //   })
  // styles.forEach(style => {
  //   const { innerText } = style
  //   if (typeof innerText === 'string' && new RegExp(oldVal, 'i').test(innerText) && !/Chalk Variables/.test(innerText)) {
  //     this.chalk += innerText
  //     style.innerText = updateStyle(innerText, originalCluster, themeCluster)
  //   }
  //   // if (typeof innerText !== 'string') return
  //   // style.innerText = updateStyle(innerText, originalCluster, themeCluster)
  // })
}

const updateStyle = (style, oldCluster, newCluster) => {
  let newStyle = style
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
  })
  return newStyle
}

// const getCSSString = (url, callback, variable) => {
//   const xhr = new XMLHttpRequest()
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
//       callback()
//     }
//   }
//   xhr.open('GET', url)
//   xhr.send()
// }

const getThemeCluster = (theme) => {
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

  const shadeColor = (color, shade) => {
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
