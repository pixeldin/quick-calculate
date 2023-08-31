<template>
	<view class="container">
		<view class="header">
			<view class="btn-avatar"></view>
			<view class="nick" style="font-family: pxp-sed-font; font-size: 18px;">奥特曼</view>
			<view style="font-family: pxp-font; font-size: 24px;font-weight: bold;">&nbsp;&nbsp;&nbsp;数学</view>
			<button class="btn-quit" @click="quit"></button>
		</view>
		<view class="select-btns">
			<view class="select-all" @click="selectAll">全选</view>
			<view class="unselect-all" @click="unselectAll">全不选</view>
		</view>
		<!-- 类型列表 -->
		<view class="options">
			<scroll-view scroll-y="true" show-scrollbar="false" class="scroll-Y" :scroll-top="scrollTop"
				@scroll="scroll">
				<view id="demo1" class="scroll-view-item" @click="check">
					<view class="opt-view">
						<text class="opt-head">20以内加减（补数法）</text>
						<text class="opt-ctx">把其中一个数分解成两个数，分解的其中一个数和另一个数相加等于10</text>
					</view>
					<view class="check-icon"></view>
				</view>
				<view id="demo2" class="scroll-view-item" @click="check">
					<view class="opt-view">
						<text class="opt-head">两位数个位和十位是镜像的两个数</text>
						<text class="opt-ctx">互为镜像的两位数相当于任意的一个数字个位+十位的和乘11</text>
					</view>
					<view class="check-icon"></view>
				</view>
				<view id="demo3" class="scroll-view-item" @click="check">
					<view class="opt-view">
						<text class="opt-head">尾数为5的两位数平方</text>
						<text class="opt-ctx">结尾是25，前面两个数是原来数十位x（十位数+1）</text>
					</view>
					<view class="check-icon"></view>
				</view>
				<view id="demo4" class="scroll-view-item" @click="check">
					<view class="opt-view">
						<text class="opt-head">20以内加减（补数法）</text>
						<text class="opt-ctx">把其中一个数分解成两个数，分解的其中一个数和另一个数相加等于10</text>
					</view>
					<view class="check-icon"></view>
				</view>
			</scroll-view>
		</view>
		<!-- 出题模态框 -->
		<view class="modal">
			<view class="modal-content">
				<view class="show-title" style="font-family: pxp-sed-font; font-size: 26px;">出题</view>
				<view class="subNum-row">
					<view style="font-family: pxp-sed-font; font-size: 24px;">题数: (</view>
					<input class="global-input" style="font-family: pxp-sed-font; font-size: 24px;" type="text"
						id="i-subNum" placeholder="100" v-model="subNum"/>
					<view style="font-family: pxp-sed-font; font-size: 26px;">)</view>
				</view>
				<view class="subTime-row">
					<view style="font-family: pxp-sed-font; font-size: 27px;">时间: (</view>
					<picker class="global-input" mode="time" :value="time" start="00:01" end="23:59"
						@change="bindTimeChange">
						<view class="uni-input">{{time}}:00</view>
					</picker>
					<view style="font-family: pxp-sed-font; font-size: 26px;">)</view>
				</view>
				<view class="btn-modal">
					<view class="btn-cancel" @click="cancel"></view>
					<view class="btn-sure" @click="sure"></view>
				</view>
			</view>
		</view>
		<!-- 出题 -->
		<view class="btn-show" @click="show"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				// 注意此处兼容官方插件, 单位是分钟.
				time: '00:30',
				subNum: 100
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
				}),
				// 二级字体
				uni.loadFontFace({
					family: 'pxp-sed-font',
					source: 'url("https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/quick-sum/font/ChillZhuo.ttf")',
					success() {
						console.log('load crazy font ttf success!')
					}
				})
		},
		methods: {
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			quit() {
				console.log('出题页面: click quit')
				uni.navigateTo({
					url: '/pages/enter/login/login'
				});
			},
			selectAll() {
				console.log('出题页面: select-all')
			},
			unselectAll() {
				console.log('出题页面: unselect-all')
			},
			check() {
				console.log('出题页面: check')
			},
			show() {
				// 显示模态框
				this.changeHideStatus('modal', 'block')
				console.log('出题页面: click show')
			},
			cancel() {
				console.log('出题页面: click cancel')
				// 隐藏模态框
				this.changeHideStatus('modal', 'none')
				// 重置设置
				this.time = '00:30'
				this.subNum = 100
			},
			sure() {
				console.log('出题页面: click sure')
				this.changeHideStatus('modal', 'none')
				// 跳转答题页面
				console.log('Ready to 答题... 题目数/时间', this.subNum, this.time)
			},
			bindTimeChange: function(e) {
				this.time = e.detail.value
			},
			changeHideStatus(className, displayValue) {
				var elements = document.querySelectorAll('.' + className);
				for (var i = 0; i < elements.length; i++) {
					elements[i].style.display = displayValue;
				}
			}
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
		/* background-color: #FCEDFA; */
		width: 100%;
		height: 93%;
		position: absolute;
		top: 7%;
		bottom: 0%;
		left: 0;
		right: 0;
		background-image: url('../../static/icon/sub-bg.png');
		background-size: 100% 96%;
		background-repeat: no-repeat;
		font-family: 'pxp-font';
	}

	.header {
		/* font-size: 20px; */
		/* background-color: #8d4057; */
		width: 84%;
		height: 13%;
		margin-top: 5%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.btn-avatar {
		background-image: url('../../static/icon/avatar.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		/* margin-top: 7%; */
		margin-bottom: 1%;
		position: relative;
		left: 13px;
		margin-right: 20px;
		width: 90rpx;
		height: 90rpx;
		border: 2px solid #6B8BD3;
		border-radius: 50px;
	}

	.nick {
		position: absolute;
		top: 12.7%;
		left: 12.2%;
		/* font-weight: bold; */
		color: #6B8BD3;
	}

	.btn-quit {
		background-image: url('../../static/icon/exit.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: relative;
		left: 30px;
		width: 17%;
		height: 28%;
	}

	.select-btns {
		/* border: 1px dashed #d33232; */
		width: 90%;
		height: 3%;
		margin-top: 5%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: row;
	}

	.select-all {
		position: relative;
		left: 55%;
		color: #6B8BD3;
		font-family: pxp-font;
		font-weight: bold;
		/* font-size: 22px; */
	}

	.unselect-all {
		position: relative;
		/* top: -10px; */
		left: 70%;
		color: #6B8BD3;
		/* font-family: pxp-sed-font; */
		font-family: pxp-font;
		font-weight: bold;
		/* font-size: 22px; */
	}

	.options {
		width: 75%;
		height: 47%;
		margin-top: 5%;
		margin-left: 14%;
		/* margin-left: auto; */
		margin-right: auto;
		/* border: 2px dashed #57d399; */
		/* overflow-y: scroll;
		-webkit-overflow-scrolling: touch; */
	}

	.opt-view {
		text-align: left;
		display: flex;
		flex-direction: column;
	}

	.opt-head {
		font-family: pxp-sed-font;
		font-weight: bold;
		margin-left: 7px;
		margin-top: 7px;
		font-size: 22px;
		width: 98%;
		/* 字符超长自动省略 */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.opt-ctx {
		font-family: pxp-sed-font;
		/* font-weight: bold; */
		margin-left: 10px;
		margin-top: 6px;
		font-size: 20px;
		width: 65%;
		height: 70%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.check-icon {
		background-image: url('../../../static/icon/uncheck.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: relative;
		border-radius: 50px;
		/* bottom: 85rpx;
		left: 3%; */
		/* border: 2px solid #5cd30d; */
		left: 86%;
		bottom: 45%;
		width: 45rpx;
		height: 45rpx;
	}

	/* .scroll-view::-webkit-scrollbar {
	  width: 0;
	} */
	.scroll-Y {
		height: 100%;
	}

	.scroll-view-item {
		width: 98%;
		height: 210rpx;
		margin-bottom: 3.6%;
		border: 2px solid #6B8BD3;
		background-color: #FFF;
		/* line-height: 300rpx; */
	}

	.btn-show {
		background-image: url("../../../static/icon/show-sub.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border: none;
		/* position: ; */
		margin-top: 9%;
		margin-left: 20%;
		width: 58%;
		height: 6%;
	}

	/* 弹窗 */
	.modal {
		display: none;
		position: fixed;
		z-index: 999;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		/* overflow: auto; */
	}

	.modal-content {
		background-image: url('../../../static/icon/hint-bg.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border: none;
		margin: 56% auto;
		width: 600rpx;
		height: 690rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.global-input {
		/* 全局输入框右移 */
		padding-left: 12%;
		width: 30%;
		font-weight: bold;
		font-size: 19px;
	}

	.show-title {
		/* border: 3px dashed #3ab2d3; */
		align-items: center;
		justify-content: center;
		margin-top: 27%;
		width: 16%;
		height: 8%;
	}

	.subNum-row {
		/* border: 3px dashed #d30c62; */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 5%;
		width: 80%;
		height: 10%;
	}

	.subTime-row {
		/* border: 3px dashed #48d3b0; */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 80%;
		height: 10%;
		margin-top: 5%;
		z-index: 9999;
	}

	.btn-modal {
		/* border: 1px dashed #d33232; */
		width: 90%;
		height: 13%;
		position: relative;
		top: 8%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn-cancel {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url('../../../static/icon/cancel.png');
		width: 160rpx;
		height: 75rpx;
	}

	.btn-sure {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url('../../../static/icon/btn-sure.png');
		width: 160rpx;
		height: 75rpx;
		margin-left: 40px;
		;
	}
</style>