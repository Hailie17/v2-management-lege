import axios from 'axios'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: 'http://tech.wolfcode.cn:23683',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('authorization-token')
  if (token && !config.url.endsWith('/login') && !config.url.endsWith('/captchaImage')) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  const res_data = res.data
  if (res_data.code !== 200) {
    Message.error(res_data.msg || '网络请求错误')
    return false // 这里的 return 不是为了结束函数，是为了把 return 值传给组件 res
  }
  return res_data
}, err => {
  return Promise.reject(err)
})

export default instance
