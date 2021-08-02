<template>
  <div class="sidebar-logo-container">
    <router-link key="expand" class="sidebar-logo-link" :to="indexPath">
      <img v-if="logo" :src="logo" class="sidebar-logo">
      <h1 class="sidebar-title">{{ title }} </h1>
    </router-link>
  </div>
</template>

<script>
import setting from '/settings.js'
import {
	  mapGetters
} from 'vuex'
export default {
  name: 'SidebarLogo',
	computed: {
		...mapGetters(['indexPath'])
	},
  data() {
    return {
      title: setting.title,
      logo: require('../../assets/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>

	.sidebar-logo-container {
		position: relative;
		height: $headerHeight;
		line-height: $headerHeight;
		text-align: center;
		overflow: hidden;

		& .sidebar-logo-link {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			& .sidebar-logo {
				width: auto;
				height: 30px;
			}

			& .sidebar-title {
				display: inline-block;
				color: $fontColor6;
				font-size: 16px;
				font-weight: normal;
				line-height: 20px;
				padding-left: 15px;
			}
		}

		&.collapse {
			.sidebar-logo {
				margin-right: 0px;
			}
		}
	}
</style>
