import request from '@/utils/request'

export function getCaptcha(){
  return request({
    url: '/api/captcha',
    method: 'get',
  })
}
