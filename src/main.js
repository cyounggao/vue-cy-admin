import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/iconfont.css'
import './permission.js' // 权限
import ElementUI from 'element-ui'
import '@/assets/theme/index.css'
import directive from '@/directives'
import util from '@/utils'
import filter from '@/filters'
import component from '@/components/Common'
import '@/styles/index.scss'
Vue.use(ElementUI)
Vue.use(directive)
Vue.use(util)
Vue.use(filter)
Vue.use(component)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
