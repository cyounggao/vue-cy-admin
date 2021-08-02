import Cookies from 'js-cookie'

const state = {
  cachePageName: 'keep-alive', // 缓存页面名称
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  pageLoading: false, // 页面加载
  requestCount: 0 // 网络请求计数
}

const mutations = {
  // 修改网络请求计数
  CHANGE_COUNT: (state, newCount) => {
    state.requestCount = newCount
  },
  // 打开页面加载
  OPEN_LOADING: (state) => {
    state.pageLoading = true
  },
  // 关闭页面加载
  CLOSE_LOADING: (state) => {
    state.pageLoading = false
  },
  // 重置缓存组件名称
  RESET_NAME: (state, name) => {
    state.cachePageName = name
  },
  // 添加缓存组件名称
  ADD_NAME: (state, name) => {
    if (state.cachePageName === '') {
      state.cachePageName = name
    } else {
      const arr = state.cachePageName.split(',')
      if (name && typeof name === 'string') {
        if (arr.indexOf(name) <= -1) {
          state.cachePageName = state.cachePageName + ',' + name
        }
      }
    }
  },
  // 删除缓存组件名称
  DEL_NAME: (state, name) => {
    const arr = state.cachePageName.split(',')
    if (name && typeof name === 'string') {
      const i = arr.indexOf(name)
      if (i > -1) {
        arr.splice(i, 1)
        state.cachePageName = arr.join()
      }
    }
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  OPEN_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = withoutAnimation
  }
}

const actions = {
  toggleSideBar({
    commit
  },
  opened
  ) {
    commit('TOGGLE_SIDEBAR', opened)
  },
  closeSideBar({
    commit
  }, {
    withoutAnimation
  }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  openSideBar({
    commit
  }, {
    withoutAnimation
  }) {
    commit('OPEN_SIDEBAR', withoutAnimation)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
