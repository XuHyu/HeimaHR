import requset from '@/utils/request'

export function login(data) {
  return requset({
    url: '/sys/login',
    method: 'post',
    data
  })
}
