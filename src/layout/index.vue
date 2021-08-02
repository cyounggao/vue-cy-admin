<template>
	<div :class="classObj" class="app-wrapper">
		<div class="fixed-header">
			<navbar />
		</div>
		<sidebar class="sidebar-container" />
		<app-main class="main-container" />
	</div>
</template>

<script>
	import {
		Navbar,
		Sidebar,
		AppMain
	} from './components'

	export default {
		name: 'Layout',
		components: {
			Navbar,
			Sidebar,
			AppMain
		},
		computed: {
			sidebar() {
				return this.$store.state.app.sidebar
			},
			classObj() {
				return {
					hideSidebar: !this.sidebar.opened,
					openSidebar: this.sidebar.opened,
					withoutAnimation: this.sidebar.withoutAnimation
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/mixin.scss";
	@import "~@/styles/variables.scss";

	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;
	}

	.fixed-header {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1003;
		width: 100%;
		transition: width 0.28s;
	}
</style>
