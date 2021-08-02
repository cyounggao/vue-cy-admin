import Vue from 'vue'
import Router from 'vue-router'
import scrollBehavior from './keep-alive.js'
import Layout from '@/layout'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [
{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/home/login'),
  hidden: true
},
{
  path: '/',
  redirect: '/login',
  hidden: true
},
{
  path: '/error',
  component: () => import('@/views/404'),
  hidden: true
}
]

export const errorRoutes = [{
  path: '*',
  redirect: '/error',
  hidden: true
}]

const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior: scrollBehavior,
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
