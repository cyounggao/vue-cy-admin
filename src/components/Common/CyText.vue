<template>
	<div class="cy-text" ref="cyText" :style="textStyle" @mouseenter="mouseenter" @mouseleave="mouseleave">{{value}}
	</div>
</template>

<script>
	import { getScrollContainer } from '@/utils/dom'
	export default {
		// 显示文字组件，可以设置最多显示几行，超过后会隐藏并且鼠标hover显示全部信息（需要给组件设置宽度）
		name: 'CyText',
		props: {
			value: {
				type: String,
				default: ''
			},
			row: { //最多显示几行，超过后会...隐藏 为0时不隐藏
				type: [Number, String],
				default: 0
			}
		},
		computed: {
			cyText() {
				return this.$refs.cyText
			},
			scrollWrap() {
				return getScrollContainer(this.$refs.cyText, true)
			}
		},
		data() {
			return {
				isShowHover: false,
				textStyle: {},
				div: null
			}
		},
		watch: {
			'row': function(val) {
				this.init()
			},
			'value': function() {
				this.isShowHover = false
				this.textStyle = {
					cursor: 'text'
				}
				this.$nextTick(() => {
					this.getStyle(this.row - 0)
				})
			}
		},
		mounted() {
			this.init()
		},
		beforeDestroy() {
			
		},
		methods: {
			init() {
				this.div = document.querySelector('.cy-hover')
				if (!this.div && this.row - 0) {
					this.div = document.createElement('div')
					this.div.className = 'cy-hover'
					this.div.style.top = 0
					this.div.style.left = 0
					document.body.append(this.div)
				}
				if (this.div && this.row - 0) {
					this.getStyle(this.row - 0)
				}
			},
			getStyle(val) {
				let lineHeight = getComputedStyle(this.cyText).lineHeight.replace('px', '') - 0 || 20
				let height = getComputedStyle(this.cyText).height.replace('px', '') - 0
				if (height > lineHeight * val) {
					this.isShowHover = true
					this.textStyle = {
						height: `${lineHeight * val}px`,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						webkitLineClamp: val,
						webkitBoxOrient: 'vertical',
						cursor: 'pointer'
					}
				} else {
					this.isShowHover = false
					this.textStyle = {
						cursor: 'text'
					}
				}
			},
			mouseenter(e) {
				if (!this.isShowHover) {
					return
				}
				this.div.innerHTML = this.value
				let box = e.target.getBoundingClientRect()
				let divRect = this.div.getBoundingClientRect()
				let windowHeight = innerHeight || document.documentElement.clientHeight
				let top = ''
				let left = ''
				left = box.left + (box.width - divRect.width) / 2 + 'px'
				if(box.bottom + divRect.height - windowHeight > 10) {
					top = box.top - divRect.height + 'px'
				} else{
					top = box.top + box.height + 'px'
				}
				this.div.style.top = top
				this.div.style.left = left
				this.div.classList.add('active')
				this.scrollWrap.addEventListener('scroll', this.scrollFun)
			},
			mouseleave(e) {
				if (!this.isShowHover) {
					return
				}
				if (e.relatedTarget !== this.div) {
					this.scrollFun()
				}
				this.div.onmouseleave = () => {
					this.scrollFun()
				}
			},
			// 最近的dom滚动时,关闭弹窗
			scrollFun() {
				this.div.style.top = 0
				this.div.style.left = 0
				this.div.classList.remove('active')
				this.scrollWrap.removeEventListener('scroll', this.scrollFun)
			}
		}
	}
</script>

<style scoped lang="scss">
	.cy-text {
		position: relative;
	}
</style>
<style lang="scss">
	.cy-hover {
		position: absolute;
		background-color: $whiteColor;
		color: $fontColor6;
		font-size: 14px;
		line-height: 1.4;
		padding: 6px 10px;
		border-radius: 5px;
		border: 1px solid #eee;
		max-width: 400px;
		transition: opacity 0.3s linear;
		z-index: -1;
		opacity: 0;

		&.active {
			z-index: 1999;
			opacity: 1;
		}
	}
</style>
