import requset from '@/utils/request'

export function login(data) {
  return requset({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return requset({
    url: '/sys/profile'
  })
}

export function updatePassword(data) {
  return requset({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}
