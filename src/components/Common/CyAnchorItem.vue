<template>
	<div class="cy-anchor-item">
		<slot name="title">
			<div class="cy-anchor-item-title">
				{{label}}
			</div>
		</slot>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'CyAnchorItem',
	props: {
		// 楼层标题
		label: {
			type: String,
			default: ''
		},
		// 楼层名
		name: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			
		}
	},
	created() {
		
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
	.cy-anchor-item-title{
		line-height: 50px;
		font-size: 16px;
		padding-left: 15px;
		background-color: #eee;
	}
</style>
