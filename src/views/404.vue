<template>
	<div class="home">
		<header>
			<div class="header-wrap w1200" flex="justify:between align:center">
				<div class="left">
					<a href="/">
						<img src="../assets/logo.png" width="100%">
						<!-- <img src="../assets/images/img-beta.png" class="beta" alt=""> -->
					</a>
				</div>
				<div>
				
				</div>
			</div>
		</header>
		<section>
			<p class="error">404</p>
			<p class="tips">页面找不到了，请返回首页</p>
			<p class="btn">
				<el-button size="medium" style="border-color: #FFFFFF;" @click="goBack">返回</el-button>
				<el-button size="medium" type="primary" style="margin-left: 15px;" @click="goHome">去首页</el-button>
			</p>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'Page404',
		methods: {
			goBack() {
				history.go(-1)
			},
			goHome() {
				this.$router.push('/')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.error{
		font-size: 120px;
		color: $mainColor;
		padding: 50px 0;
	}
	.w1200 {
		width: 1200px;
		min-width: 1200px;
		margin: 0 auto;
	}
	.home {
		height: 100vh;
		background: #F2F2F4;
		display: flex;
		flex-direction: column;
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: $whiteColor;
		z-index: 1;

		.header-wrap {
			height: 100%;
			font-size: 20px;
			position: relative;
		}

		.left {
			img {
				height: 30px;
				width: auto;
				padding-right: 45px;
			}

			.beta {
				width: 36px;
				height: auto;
				position: absolute;
				left: 104px;
				top: 10px;
			}
		}
	}
	section{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		img{
			width: 794px;
			margin-top: 160px;
		}
		.tips{
			color: $fontColor6;
			line-height: 1;
			font-size: 16px;
			margin-top: 68px;
		}
		.btn{
			margin-top: 40px;
			::v-deep{
				.el-button {
					width: 140px;
				}
			}
		}
	}
	footer{
		background-color: $whiteColor;
	}
	.footer-wrap {
		padding: 40px 0 70px;
		position: relative;

		img {
			margin-bottom: 20px;
		}

		.beta {
			width: 36px;
			height: auto;
			position: absolute;
			left: 136px;
			top: 38px;
		}

		.right {
			display: inline-block;
			margin-left: 100px;
			vertical-align: top;

			p {
				margin-bottom: 5px;
			}
		}

		p {
			&.desc {
				font-size: 12px;
				margin-bottom: 0;

				i {
					font-size: 12px;
					margin-right: 5px;
				}

				a {
					color: $fontColor6;
				}
			}
		}
	}
</style>
