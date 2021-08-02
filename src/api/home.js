import request from '@/utils/request'
// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
    noLoad: true
  })
}