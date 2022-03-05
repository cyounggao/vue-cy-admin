import {
  constantRoutes,
  errorRoutes
} from '@/router'
import Layout from '@/layout'
import utils from '@/utils'
import menu from '@/config/menu'

// let menuMap = {}
export function generaMenu(routes, data, parent) {
  data.forEach((item, index) => {
    if (!item.filePath) {
      throw new Error('菜单文件路径不能为空')
    }
    const nameArr = item.filePath.split('/')
    const menu = {
      path: parent + item.path,
      hidden: !item.show,
			alwaysShow: item.alwaysShow,
      children: [],
      name: utils.firstToUpper(nameArr[nameArr.length - 1]),
      meta: {
        title: item.title,
        icon: item.icon,
				notAllowed: item.notAllowed
      }
    }
    if (!item.show) {
      menu.meta.activeMenu = menu.name.split('Detail')[0]
    }
    const result = hasChildrenMenu(item.children)
    if (result === 1) { // 如果有子菜单时, 重定向到第一个子菜单，继续递归子菜单
      if (parent === '') { // 只有当前为一级菜单时，才加载Layout组件，其他菜单直接重定向
        menu.component = Layout
      }
      menu.redirect = `${parent}${item.path}${item.children[0].path}`
      generaMenu(menu.children, item.children, parent + item.path)
    } 
		// else if (result === 1) {
  //     menu.component = loadView(item.filePath)
		// 	menu.redirect = `${parent}${item.path}${item.children[0].path}`
  //     generaMenu(menu.children, item.children, parent + item.path)
  //   } 
		else {
      // 没有子菜单时，直接加载页面组件
      menu.component = loadView(item.filePath)
    }
		// menuMap[parent + item.path] = menu
    routes.push(menu)
  })
}
/**
	* 判断是否有子菜单
	* return 0: 没有子菜单
	* return 1: 有子菜单
	*/
function hasChildrenMenu(children) {
  if (children && children.length) {
		return 1
  }
  return 0
}

function loadView(filePath) {
	return (resolve) => require([`@/views${filePath}`], resolve)
}

const state = {
  routes: [],
  indexPath: '/demo'
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes).concat(errorRoutes)
  },
  RESET_ROUTES: (state) => {
    state.routes = []
  },
  SET_INDEX_PATH: (state, indexPath) => {
    state.indexPath = indexPath
  }
}

const actions = {
  generateRoutes({
    commit
  }) {
    return new Promise(resolve => {
      const loadMenuData = menu
      const routes = []
      generaMenu(routes, loadMenuData, '')
			// menuMap['/eCommerceAnalysis/goodsVideo'].meta.notAllowed = true
      commit('SET_ROUTES', routes)
      // routes.length && commit('SET_INDEX_PATH', routes[0].path)
      resolve(routes.concat(errorRoutes))
      // 后端接口返回
      // getAuthMenu().then(res => {
      // 	loadMenuData = [...res.data]
      // 	let routes = []
      // 	generaMenu(routes, loadMenuData, "")
      // 	commit('SET_ROUTES', routes)
      // 	resolve(routes)
      // }).catch(error => {
      // 	console.log(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
