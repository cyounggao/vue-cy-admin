import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  getToken, setToken
} from '@/utils/token'

NProgress.configure({
  showSpinner: false
})

function addRoutes(parent, RouterList) {
  RouterList.forEach(item => {
    router.addRoute(parent, item)
  })
}

const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      const indexPath = store.getters.indexPath
      next(indexPath)
      NProgress.done()
    } else {
      const hasMenu = !!store.getters.permissionRoutes.length
      if (hasMenu) {
        next()
      } else {
        try {
          const res = await store.dispatch('permission/generateRoutes')
          addRoutes(router, res)
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.fullPath}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  to.meta.title && (document.title = to.meta.title)
  NProgress.done()
})
