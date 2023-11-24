import instance from '@/request/request'

// 获取验证码
export const getCaptchaCodeApi = () => instance.get('/prod-api/captchaImage')

// 登录
export const LoginApi = (params) => instance.post('/prod-api/login', params)

// 获取路由信息
export const GetRoutersApi = () => instance.get('/prod-api/getRouters')

// 获取用户信息
export const GetUserInfoApi = () => instance.get('/prod-api/getInfo')
