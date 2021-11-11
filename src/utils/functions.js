export function randomHexColor () { //随机生成十六进制颜色
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)
}

export function randomInt (min, max) {
  return parseInt(min + Math.random() * (max - min))
}

export function strip_tags (html) {
  let div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent || div.innerText || '')
}

export function parseResult (data) {
  let result = []
  for (let index in data) {
    if (!data.hasOwnProperty(index)) {
      continue
    }
    let item = data[index]
    if (Array.isArray(item) || typeof item === 'object') {
      result[index] = parseResult(item)
    } else {
      if (typeof index === 'string' && index.substring(index.length - 3) === '_at') {
        result[index] = parseTime(new Date(item))
      } else {
        result[index] = item
      }
    }

  }
  return result
}

export function parseTime (date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  let second = date.getSeconds()
  second = second < 10 ? '0' + second : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}
