<template>
  <div>
    <div class="breadcrumb-container" flex="align:center">
      <breadcrumb />
    </div>
    <section class="app-main" flex="dir:column">
      <keep-alive :include="cachePageName">
        <router-view :key="key" />
      </keep-alive>
      <template v-if="pageLoading">
        <loading />
      </template>
    </section>
  </div>
</template>

<script>
import Loading from './Loading'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Loading,
    Breadcrumb
  },
  data() {
    return {

    }
  },
  computed: {
    key() {
      return this.$route.path
    },
    pageLoading() {
      return this.$store.getters.pageLoading
    },
    cachePageName() {
      return this.$store.getters.cachePageName
    }
  }
}
</script>

<style lang="scss">
	// fix css style bug in open el-dialog
	.breadcrumb-container {
		background-color: $mainBg;
		height: $headerHeight;
	}

	.app-main {
		width: 100%;
		position: relative;
	}

</style>
