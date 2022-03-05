<template>
	<div class="container">
		<cy-table :api="getData">
			<el-table-column label="测试1">111</el-table-column>
			<el-table-column label="测试2">222</el-table-column>
			<el-table-column label="测试3">333</el-table-column>
		</cy-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getData() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						let data = {
							code: 0,
							data: {
								list: [{},{}],
								total: 11
							}
						}
						resolve(data)
					}, 1500)
				})
			}
		}
	}
</script>

<style>
</style>
