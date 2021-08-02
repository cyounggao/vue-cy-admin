<template>
	<div class="container">
		<cy-loading color="#f90" style="height: 60px;"></cy-loading>
		<cy-anchor v-model="anchor">
			<cy-anchor-item label="文章一" name="1" class="anchor-item">
					<cy-text value="四大皆空很快就客户的时刻活动时间开放后即可恢复几十块的富滇银行覅打开了房间就看了圣诞节还是得开了房" style="width: 150px;" row="2"></cy-text>
					<cy-text value="四大皆空很快就客户的时刻活动时间开放后即可恢复几十块的富滇银行覅打开了房间就看了圣诞节还是得开了房" style="width: 150px;" row="2"></cy-text>
			</cy-anchor-item>
			<cy-anchor-item label="文章二" name="2" class="anchor-item">
				<cy-text value="四大皆空很快就客户的时刻活动时间开放后即可恢复几十块的富滇银行覅打开了房间就看了圣诞节还是得开了房" style="width: 150px;" row="2"></cy-text>
			</cy-anchor-item>
			<cy-anchor-item label="文章三" name="3" class="anchor-item">
			</cy-anchor-item>
			<cy-anchor-item label="文章四" name="4" class="anchor-item">
			</cy-anchor-item>
		</cy-anchor>
	</div>
</template>

<script>
	export default {
		name: 'Anchor',
		data() {
			return {
				anchor: '1'
			}
		},
	}
</script>

<style scoped lang="scss">
	.anchor-item {
		margin-bottom: 15px;
		background-color: #fff;
		height: 600px;
		.text{
			padding: 20px;
		}
	}
</style>
