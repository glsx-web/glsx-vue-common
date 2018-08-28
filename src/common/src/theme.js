/*
 * @Author: limin
 * @Date: 2018-08-12 12:52:19
 * @Last Modified by: limin
 * @Last Modified time: 2018-08-23 18:28:01
 */
const Theme = (version = '2.4.0', defaultColor = '#409EFF') => {
  this.default_color = defaultColor
  this.color = ''
  this.version = version
  this.chalk = ''
  this.url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
}
const change = (val, oldVal = this.color || this.default_color) => {
  if (typeof val !== 'string' || this.color === val) return
  const themeCluster = getThemeCluster(val.replace('#', ''))
  const originalCluster = getThemeCluster(oldVal.replace('#', ''))
  this.color = val
  const getHandler = (variable, id) => {
    return () => {
      const originalCluster = getThemeCluster(this.default_color.replace('#', ''))
      const newStyle = updateStyle(this[variable], originalCluster, themeCluster)

      let styleTag = document.getElementById(id)
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.setAttribute('id', id)
        document.head.appendChild(styleTag)
      }
      styleTag.innerText = newStyle
    }
  }

  const chalkHandler = getHandler('chalk', 'chalk-style')
  if (!this.chalk) {
    getCSSString(this.url, chalkHandler, 'chalk')
  } else {
    chalkHandler()
  }

  const styles = [...document.querySelectorAll('style')]
    .filter(style => {
      const text = style.innerText
      return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
    })
  styles.forEach(style => {
    const { innerText } = style
    if (typeof innerText !== 'string') return
    style.innerText = updateStyle(innerText, originalCluster, themeCluster)
  })
}

const updateStyle = (style, oldCluster, newCluster) => {
  let newStyle = style
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
  })
  return newStyle
}

const getCSSString = (url, callback, variable) => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
      callback()
    }
  }
  xhr.open('GET', url)
  xhr.send()
}

const getThemeCluster = (theme) => {
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
