const VUE_APP_ENV = process.env.VUE_APP_ENV
const hostObj = {
  /* 开发环境 */
  development: {
    api: '/op_api'
  },
  /* 测试环境 */
  test: {
    api: '/op_api'
  },
  /* 生产地址 */
  production: {
    api: '/op_api'
  }
}

const host = hostObj[VUE_APP_ENV]

export default host

