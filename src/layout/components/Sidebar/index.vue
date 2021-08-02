<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-openeds="defaultOpeneds"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.writeColor"
        :text-color="variables.fontColor6"
        :active-text-color="variables.mainColor"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
     <div class="hamburger">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'
import variables from '@/styles/variables.scss'

export default {
  components: {
    SidebarItem,
    Hamburger
  },
  data() {
    return {
     
    }
  },
  computed: {
    ...mapGetters([
      'permissionRoutes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const {
        meta,
        path
      } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    defaultOpeneds() {
      const Routes = this.$store.getters.permissionRoutes
      return Routes.filter(item => { return !item.hidden }).map(item => { return item.path })
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style scoped lang="scss">
	.hamburger {
		height: $headerHeight;
		line-height: $headerHeight;
		border-top: 1px solid #F0F0F0;
	}

	.base-menu {
		border-top: 1px solid $borderColor;
		padding-top: 20px;
	}
</style>
