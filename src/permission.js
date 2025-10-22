import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const whiteList = ['/login', '/404']

// 前置守卫
router.beforeEach(async(to, from, next) => {
  // 进度条
  nprogress.start()
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 判断是否访问登录页
      // 跳转主页
      next('/')
      nprogress.done()
    } else {
      // 判断是否已经获取过用户资料
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 不存在token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nprogress.done()
    }
  }
})

// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
