<template>
	<div class="container">
		<cy-anchor v-model="anchor">
			<cy-anchor-item label="文章一" name="1" class="anchor-item">
				<div class="text">
					<cy-text
						value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
					 >
					</cy-text>
				</div>
			</cy-anchor-item>
			<cy-anchor-item label="文章二" name="2" class="anchor-item" style="height: 400px;">
				<div class="text">
					<cy-text
						value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
						row="2">
					</cy-text>
				</div>
			</cy-anchor-item>
			<cy-anchor-item label="文章三" name="3" class="anchor-item" style="height: 500px;">
				<div class="text">
					<cy-text
						value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
						row="3">
					</cy-text>
				</div>
			</cy-anchor-item>
			<cy-anchor-item label="文章四" name="4" class="anchor-item" style="height: 600px;">
				<div class="text">
					<cy-text
						value="Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。"
						row="4">
					</cy-text>
				</div>
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
		height: 300px;

		.text {
			padding: 20px;
			width: 600px;
		}
	}
</style>
