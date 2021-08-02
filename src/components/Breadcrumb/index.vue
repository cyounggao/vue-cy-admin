<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <span
        v-if="item.redirect==='noRedirect'||index==levelList.length-1"
        class="no-redirect"
      >{{ item.meta.title }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null,
      routerMap: {}
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getRouterMap()
  },
  methods: {
    getRouterMap() {
      this.$router.getRoutes().forEach(item => {
        item.name && (this.routerMap[item.name] = item)
      })
      this.getBreadcrumb()
    },
    getBreadcrumb() {
      // only show routes with meta.title
      this.levelList = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta
        .breadcrumb !== false)
      const last = this.levelList[this.levelList.length - 1]
      if (last) {
        if (last.name.indexOf('Detail') > -1) {
				  const route = this.routerMap[last.name.split('Detail')[0]]
				  route && (this.levelList.splice(this.levelList.length - 1, 0, route))
        }
      }
      if (this.levelList.length === 1) {
      	this.levelList = [{
      		path: '/',
      		meta: {
      			title: '首页'
      		}
      	}].concat(this.levelList)
      }
      // this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const {
        params
      } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const {
        redirect,
        path
      } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
	.app-breadcrumb.el-breadcrumb {
		display: inline-block;
		font-size: 14px;
		margin-left: 15px;

		.no-redirect {
			color: $fontColor;
			cursor: text;
		}

	}
</style>
