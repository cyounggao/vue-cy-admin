<template>
	<div class="cy-anchor-wrap" ref='cyAnchor'>
		<slot></slot>
		<ul class="cy-anchor-nav" v-if="showBtn">
			<li v-for="(item,index) in cyAnchorNavList" :key="item.name" :class="{active: value === item.name}"
				@click="arrive(item.name)">
				{{item.label}}
			</li>
		</ul>
	</div>
</template>

<script>
	import utils from '@/utils'
	import { getScrollContainer } from '@/utils/dom'
	export default {
		name: 'CyAnchor',
		props: {
			// 当前楼层
			value: {
				type: String,
				default: ''
			},
			// 滚动的元素，不传默认取离元素最近的可以滚动的元素
			scrollDom: {
				type: String,
				default: ''
			},
			showBtn: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				cyAnchorNavList: [], //电梯按钮数据
				cyAnchorNavMap: {}, //电梯楼层高度的映射
				scrollFunDebounceFun: utils.vueDebounce('scrollFun', 100),
				scrollDisabled: false, //禁止滚动函数执行
				valueType: 1  //当前楼层改变的类型，1是组件传递、按钮直达改变，2是通过滚动监听自动改变
			}
		},
		computed: {
			wrap() {
				return this.$refs.cyAnchor
			},
			scrollWrap() {
				if (this.scrollDom) {
					return document.getElementById(this.scrollDom) || 'window'
				} else {
					return getScrollContainer(this.$refs.cyAnchor, true)
				}
			}
		},
		watch: {
			// 监听楼层变化，当为父组件传递，或者按钮直达时，手动滚动到当前楼层
			'value': function(val) {
				this.valueType === 1 && this.scrollDomFun(this.cyAnchorNavMap[val])
			}
		},
		async mounted() {
			await this.init()
			// 如果传了当前楼层，直接到达对应的高度
			if (this.value) {
				this.scrollWrap.scrollTop = this.cyAnchorNavMap[this.value]
			} else { //没有传楼层，则根据当前高度自动获取
				this.getAnchorValue(this.scrollWrap.scrollTop)
			}
			this.scrollWrap.addEventListener('scroll', this.scrollFunDebounce)
		},
		beforeDestroy() {
			this.scrollWrap.removeEventListener('scroll', this.scrollFunDebounce)
		},
		methods: {
			// 初始化，获取电梯按钮数据，获取楼层高度映射
			init() {
				let parentOffsetTop = this.$refs.cyAnchor.offsetTop
				this.cyAnchorNavList = this.$children.map(item => {
					this.cyAnchorNavMap[item.name] = item.$el.offsetTop - parentOffsetTop
					let rect = item.$el.getBoundingClientRect()
					return {
						scrollTop: item.$el.offsetTop - parentOffsetTop,
						bottom: rect.bottom - this.scrollWrap.getBoundingClientRect().top,
						label: item.label,
						name: item.name
					}
				})
			},
			//滚动的函数
			scrollFun(e) {
				this.getAnchorValue(e.target.scrollTop)
			},
			scrollFunDebounce(e) {
				!this.scrollDisabled && this.scrollFunDebounceFun(e)
			},
			// 根据当前高度获取楼层位置，这里根据 当前楼层的底部位置在 滚动可视区域 底部到 0.382比例处 判断，（1 - 0.618 = 0.382）
			getAnchorValue(scrollTop) {
				for (let i = 0; i < this.cyAnchorNavList.length; i++) {
					if (this.cyAnchorNavList[i].bottom - scrollTop >= this.scrollWrap.getBoundingClientRect().height *
						0.382) {
						this.valueType = 2
						this.$emit('input', this.cyAnchorNavList[i].name)
						break
					}
				}
			},
			//直达楼层
			arrive(name) {
				if (name === this.value || this.scrollDisabled) {
					return
				}
				this.valueType = 1
				this.$emit('input', name)
			},
			// 模拟滚动
			scrollDomFun(itemScrollTop) {
				this.scrollDisabled = true //模拟滚动过程中，禁用直达楼层和监听的滚动事件
				let speed = 50
				let scrollTop = this.scrollWrap.scrollTop
				if (itemScrollTop > scrollTop) {
					// 向下滚动
					let timer = setInterval(() => {
						scrollTop += speed
						if (scrollTop < itemScrollTop) {
							this.scrollWrap.scrollTop = scrollTop
						} else {
							this.scrollWrap.scrollTop = itemScrollTop
							clearInterval(timer)
							setTimeout(() => {
								this.scrollDisabled = false
							}, 90)
						}
					}, 10)
				} else {
					// 向上滚动
					let timer = setInterval(() => {
						scrollTop -= speed
						if (scrollTop >= itemScrollTop) {
							this.scrollWrap.scrollTop = scrollTop
						} else {
							this.scrollWrap.scrollTop = itemScrollTop
							clearInterval(timer)
							setTimeout(() => {
								this.scrollDisabled = false
							}, 90)
						}
					}, 10)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cy-anchor-nav {
		position: fixed;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;

		li {
			line-height: 40px;
			height: 40px;
			text-align: center;
			padding: 0 15px;
			background-color: rgba(255, 255, 255, 0.4);
			border-bottom: 1px solid #ccc;
			user-select: none;

			&.active {
				background-color: $mainColor;
				color: $whiteColor;
			}
		}
	}
</style>
