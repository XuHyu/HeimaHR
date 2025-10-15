import axios from 'axios'

// store/getters.js中存在获取token方法
import store from '@/store'
import { Message } from 'element-ui'

// 创建axios实例
// baseURL 基地址
// timeOut 超时时间
const service = axios.create({
  baseURL: '/api',
  timeOut: 10000
})

// interceptors 拦截器
//     request 请求拦截器
//     response 响应拦截器
// use方法 1成功 2失败
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, (error) => {
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})

export default service
