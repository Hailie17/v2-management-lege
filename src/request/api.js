import instance from '@/request/request'

export const getCaptchaCodeApi = () => instance.get('/prod-api/captchaImage')
