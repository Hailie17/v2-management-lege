import instance from '@/request/request'

// 获取验证码
export const getCaptchaCodeApi = () => instance.get('/prod-api/captchaImage')

// 登录
export const LoginApi = (params) => instance.post('/prod-api/login', params)

// 获取路由信息
export const GetRoutersApi = () => instance.get('/prod-api/getRouters')

// 获取用户信息
export const GetUserInfoApi = () => instance.get('/prod-api/getInfo')

// 客户管理 - 获取客户列表
export const GetCustomerListApi = (params) => instance.get('/prod-api/customer', { params })

// 客户管理 - 获取客户来访列表
export const GetCustomerVisitListApi = (params) => instance.get('/prod-api/customer/visit', { params })
