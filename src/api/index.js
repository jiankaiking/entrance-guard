/*
*
*  请求拦截
*
*/

import { Message } from 'element-ui'
import axios from 'axios'
import qs from 'qs'

import store from '../store'

const service = axios.create({
  //  baseURL: 'http://192.168.0.110:8701',   //请求api
  // baseURL: '/sellerManagement',   //请求api
  baseURL: '/api', // 请求api
  timeout: 50000, // 请求超时时间
  withCredentials: true // 允许携带cookie
})

// 请求拦截
service.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers['Authorization'] = store.state.token
  }

  config.method === 'post' ? config.data = qs.stringify({ ...config.data }) : config.params = { ...config.data }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(
  response => {
    if (!response.data.success) {
      // 登录过期
      if (response.data.code === 401 || response.data.code === 403) {
        sessionStorage.clear()
        window.location.reload()
      } else if (response.data.code !== 407) {
        // console.log(response)
        Message.error(response.data.msg)
      }
    }
    return response.data
  },
  error => {
    // 响应错误提示
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)'
          break
        case 403:
          error.message = '拒绝访问(403)'
          break
        case 404:
          error.message = '请求出错(404)'
          break
        case 408:
          error.message = '请求超时(408)'
          break
        case 500:
          error.message = '服务器错误(500)'
          break
        case 502:
          error.message = '网络错误(502)'
          break

        case 504:
          error.message = '网络超时(504)'
          break
        default:
          error.message = `连接出错(${error.response.status})!`
      }
    } else {
      error.message = '连接服务器失败!'
    }
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service

