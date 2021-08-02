<template>
	<div class="img-wrap">
		<el-image :class="imgBg?'black': ''" ref="elIamge" :src="src" :preview-src-list="srcList" fit="contain"
			:z-index="3000" style="display: block;" @load="loadSuccess">
			<div slot="placeholder" class="image-slot">
				<i class="el-icon-loading"></i>
			</div>
			<div slot="error" class="el-image__error">
				<img src="../../assets/images/fail-img.png">
			</div>
		</el-image>
		<div class="icon" v-if="srcList.length">
			<i class="iconfont iconzoomin" @click="clickHandler" />
		</div>
	</div>

</template>

<script>
	export default {
		// 二次封装element-ui 图片组件
		name: 'CyImage',
		props: {
			src: {
				type: String,
				default: ''
			},
			// 图片的尺寸，计算高度需要
			scale: {
				type: Number,
				default: 1.7778
			},
			//图片预览，传true 预览当前图片，传数组预览数组的图片
			preview: {
				type: [Boolean, Array],
				default: false
			}
		},
		data() {
			return {
				detailVisible: false,
				imgBg: false
			}
		},
		computed: {
			srcList() {
				if (this.$isArr(this.preview)) {
					return this.preview
				} else {
					return this.preview ? [this.src] : []
				}
			}
		},
		watch: {
			scale(val) {
				if (val) {
					const width = this.$refs.elIamge.$el.getBoundingClientRect().width || 200
					this.$refs.elIamge.$el.style.height = width * this.scale + 'px'
				}
			}
		},
		mounted() {
			const width = this.$refs.elIamge.$el.getBoundingClientRect().width || 200
			this.$refs.elIamge.$el.style.height = width * this.scale + 'px'
		},
		methods: {
			loadSuccess(e) {
				let img = e.target || {}
				let scale = this.$getScale({
					width: img.naturalWidth,
					height: img.naturalHeight
				})
				if (scale < 1.77 && scale !== this.scale) {
					this.imgBg = true
				}
			},
			clickHandler() {
				this.$refs.elIamge.clickHandler()
			}
		}
	}
</script>

<style scoped lang="scss">
	.img-wrap {
		position: relative;
		border-radius: 5px;
		overflow: hidden;
		.icon{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			border-radius: 5px;
			background-color: transparent;
			transition: all 0.3s linear;
			.iconfont {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: $whiteColor;
				cursor: pointer;
				opacity: 0;
				z-index: -1;
				transition: all 0.3s linear;
				font-size: 24px;
			}
			
			&:hover {
				background-color: rgba(0, 0, 0, 0.3);
			
				.iconfont {
					z-index: 1;
					opacity: 1;
				}
			}
		}
		
	}

	.black {
		::v-deep {
			.el-image__inner {
				background-color: $blackColor;
			}
		}
	}

	::v-deep {
		.el-image__error {
			background: #F2F2F4;

			img {
				width: 45%;
			}
		}
	}
</style>
