<template>
	<view class="container">

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// 加载字体
			uni.loadFontFace({
				family: 'pxp-font',
				// source: 'url("https://sungd.github.io/Pacifico.ttf")',
				source: 'url("https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/quick-sum/font/cus-font.ttf")',
				success() {
					console.log('load crazy font ttf success!')
				}
			})
		},
		methods: {

		}
	}
</script>

<style>
	html,
	body {
		height: 100%;
		width: 100%;
		margin: 0;
	}

	body {
		background-image: url('../../static/icon/bg-blue.png');
		background-size: 100%, 100%;
		background-repeat: no-repeat;
	}

	.container {
		width: 100%;
		height: 93%;
		position: absolute;
		top: 7%;
		bottom: 0%;
		left: 0;
		right: 0;
		/* margin: 0; */
		background-image: url('../../static/icon/sub-bg.png');
		background-size: 100% 98%;
		/* background-color: #FCEDFA; */
		background-repeat: no-repeat;

	}
</style>