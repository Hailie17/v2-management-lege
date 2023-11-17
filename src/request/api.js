import instance from '@/request/request'

// 获取验证码
export const getCaptchaCodeApi = () => instance.get('/prod-api/captchaImage')

// 登录
export const LoginApi = (params) => instance.post('/prod-api/login', params)
