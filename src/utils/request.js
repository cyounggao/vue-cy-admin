import axios from 'axios'
import store from '../store'
import qs from 'qs'
import utils from '../utils'
import config from '../config/index.js'
import {
  Message, MessageBox
} from 'element-ui'
import {
  getToken
} from './token.js'

let lock = false
const service = axios.create({
  baseURL: config.api, // url = base url + request url
  withCredentials: true, // 是否在跨域请求时发送Cookie
  timeout: 300000 // 超时时间
})
// 发请求之前
/**
 * config参数
 * noLoad: 请求是否不显示加载框，默认显示
 * formData: post时参数是否用form-data形式传，默认json形式
 * method: 请求方式，默认post
 * data: 请求的参数
 * seq： axios串联时的先后顺序，f:第一个(执行完毕后计数不减1) / m:中间的 / l:最后一个(执行前计数不加1),默认m
 * download:  开启文件下载
 */
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = getToken()
    config.method = config.method || 'post'
    config.seq = config.seq || 'm'
    if (config.download) {
      config.responseType = 'blob'
    }
    if (config.method === 'get') {
      // get请求，对于参数为数组时要序列化成 id: [1,2] / id=1&id=2 形式
      config.params = qs.stringify(config.data, {
        indices: false
      })
      config.paramsSerializer = function(params) {
        return params
      }
    } else if (config.method === 'post' && config.formData) {
      // form-data形式传参要序列化
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = qs.stringify(config.data)
    }
    if (
      (config.seq === 'm' || config.seq === 'f') &&
      !config.noLoad
    ) {
      store.commit('app/CHANGE_COUNT', store.getters.requestCount + 1)
      if (store.getters.requestCount > 0) {
        store.commit('app/OPEN_LOADING')
      }
    }
    return config
  },
  error => {
		console.log(error)
    return Promise.reject(error)
  }
)
// 请求完成
service.interceptors.response.use(
  response => {
    if (
      (response.config.seq === 'm' ||
        response.config.seq === 'l') &&
      !response.config.noLoad
    ) {
      store.commit('app/CHANGE_COUNT', store.getters.requestCount - 1)
      if (store.getters.requestCount === 0) {
        store.commit('app/CLOSE_LOADING')
      }
    }
    const res = response.data
    if (response.config.download) {
      const temp = response.headers['content-disposition'].split(';')[1].split('filename=')[1]
      const filename = utils.utf8to16(temp)
      const userAgent = navigator.userAgent
      if (userAgent.indexOf('Edge') === -1 && userAgent.indexOf('Trident') === -1) { // 非ie下载
        const url = URL.createObjectURL(res)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href) // 释放URL 对象
        document.body.removeChild(link)
      } else {
        navigator.msSaveBlob(res, filename)
      }
      return res
    } else {
      if (res.code === 0) {
        return res
      } else {
        Message.error({
          message: res.msg || '网络开小差了',
          duration: 1.5 * 1000
        })
        return Promise.reject(res)
      }
    }
  },
  error => {
		console.log(error)
    store.commit('app/CHANGE_COUNT', 0)
    store.commit('app/CLOSE_LOADING')
    const res = error.response || { data: {}}
    if (res.data.code === 403) {
      if (!lock) {
        lock = true
        MessageBox.confirm('您的登录态已失效，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            lock = false
            location.reload()
          })
        }).catch(() => {
					lock = false
				})
      }
    } else {
      Message.error({
        message: res.data.msg || '网络开小差了',
        duration: 2 * 1000
      })
    }
    return Promise.reject(res)
  }
)

export default service
