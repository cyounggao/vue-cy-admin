const util = {
  install(Vue) {
    Object.keys(util).forEach(key => {
      if (key !== 'install') {
        Vue.prototype[`$${key}`] = util[key]
      }
    })
  },
  // 16进制转汉字
  utf8to16(str) {
    str = unescape(str)
    var out, i, len, c
    var char2, char3
    out = ''
    len = str.length
    i = 0
    while (i < len) {
      c = str.charCodeAt(i++)
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          out += str.charAt(i - 1)
          break
        case 12:
        case 13:
          char2 = str.charCodeAt(i++)
          out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
          break
        case 14:
          char2 = str.charCodeAt(i++)
          char3 = str.charCodeAt(i++)
          out += String.fromCharCode(
            ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
          )
          break
      }
    }

    return out
  },
  // 判断是否为对象
  isObj(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  },
  // 判断是否为数组
  isArr(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  },
  // 数组转映射对象（后端需要同时要传label和code）
  arrToObj(arr, label = 'label', code = 'code') {
    const obj = {}
    arr.forEach(item => {
      obj[item[code]] = item[label]
    })
    return obj
  },
  /**
	 *  函数防抖
	 *  param fnName  函数名
	 *  param time  延迟时间
	 *  return: 处理后的执行函数
	 */
  vueDebounce(fnName, time) {
    let timeout = null
    return function() {
      const _arguments = arguments
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(() => {
        timeout = null
        this[fnName].apply(this, _arguments)
      }, time)
    }
  },
  // 判读是否为空对象
  isEmptyObject(obj) {
    for (const key in obj) {
      return false
    }
    return true
  },
  // 字符串首字符转为大写
  firstToUpper(str) {
    if (str.length) {
      return str.replace(str[0], str[0].toUpperCase())
    }
    return str
  }
}
export default util
