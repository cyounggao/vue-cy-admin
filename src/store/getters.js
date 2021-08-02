const getters = {
  requestCount: state => state.app.requestCount,
  sidebar: state => state.app.sidebar,
  cachePageName: state => state.app.cachePageName,
  pageLoading: state => state.app.pageLoading,
  permissionRoutes: state => state.permission.routes,
  indexPath: state => state.permission.indexPath,
  userinfo: state => state.user.userinfo,
  token: state => state.user.token
}
export default getters
