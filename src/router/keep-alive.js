import store from '../store'

let cacheArray = [] // 需要缓存的页面
if (process.env.VUE_APP_ENV !== 'development') { // 开发环境去掉缓存功能，如果使用会造成热更新失效的问题
  cacheArray = []
}
function scrollBehavior(to, from, savedPosition) {
  /* 只有在 include 中的页面 name 才会被缓存 */
  const toName = to.name || ''
  const fromName = from.name || ''
  if (cacheArray.length) {
    if (cacheArray.indexOf(toName) > -1) { // 跳转页面之前判断该页面是否需要缓存，需要缓存则把 name 放到 include 里
      store.commit('app/RESET_NAME', toName)
    } else { // 若该页面不需要缓存，则判断该页面是否是从缓存页面或详情页进入，如果是并且去的不是详情页，则清空缓存页面
      const cachePageName = store.getters.cachePageName
      if ((fromName === cachePageName || fromName.indexOf('Detail') > -1) && toName.indexOf('Detail') === -1) {
        store.commit('app/RESET_NAME', 'keep-alive') // 不能为空字符串，为空字符串同样缓存当前页面
      }
    }
  }
  if (savedPosition) {
    return savedPosition
  } else {
    return {
      x: 0,
      y: 0
    }
  }
}

export default scrollBehavior
