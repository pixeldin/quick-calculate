<template>
	<view class="container">
		<view class="drawer">
			<view class="draw-header">
				<button class="btn-clear" @click="clearCanvas"></button>
				<button class="btn-identify" @click="identify"></button>
			</view>
			<!-- <view class="title">识别结果：{{ res }}</view> -->
			<canvas class="draw-canvas" canvas-id="draw-canvas" @touchstart="touchstart" @touchmove="touchmove"
				@touchend="touchend"></canvas>
			<view class="draw-footer">
				<button class="btn-last" @click="lastSub"></button>
				<button class="btn-next" @click="nextSub"></button>
			</view>
		</view>
	</view>
</template>

<script lang="js">
	import {
		getNumber,
		ocrRaw
	} from "@/models/number"

	var x = -10;
	var y = -10;
	export default {
		data() {
			return {
				ctx: '', // 绘图图像
				tempPoints: [], // 每一笔路径点集合
				finalPoints: [], // 所有路径点集合
				res: '' //路径点集合
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

			this.ctx = uni.createCanvasContext("draw-canvas", this); //创建绘图对象

			//设置画笔样式
			this.ctx.lineWidth = 3;
			this.ctx.lineCap = "round"
			this.ctx.lineJoin = "round"
		},
		methods: {
			touchstart: function(e) {
				let x = e.changedTouches[0].x;
				let y = e.changedTouches[0].y;

				let startPoint = {
					x: Math.round(x),
					y: Math.round(y),
					action: "down"
				};
				this.tempPoints.push(startPoint);
				this.finalPoints.push(startPoint);

				this.ctx.beginPath();
			},

			//触摸移动，获取到路径点
			touchmove: function(e) {
				let x = e.changedTouches[0].x;
				let y = e.changedTouches[0].y;

				let movePoint = {
					x: Math.round(x),
					y: Math.round(y),
					action: "move"
				};
				this.tempPoints.push(movePoint); //存点
				this.finalPoints.push(movePoint); //存点

				let len = this.tempPoints.length;
				if (len >= 2) {
					this.draw(); //绘制路径
				}
			},

			// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
			touchend: function(e) {
				this.tempPoints = [];

				let x = e.changedTouches[0].x;
				let y = e.changedTouches[0].y;
				let endPoint = {
					x: Math.round(x),
					y: Math.round(y),
					action: "up"
				};

				this.finalPoints.push(endPoint); //存点
			},

			/* ***********************************************
			#   绘制笔迹
			#	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
			#	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
			#	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
			************************************************ */
			draw: function() {
				let point1 = this.tempPoints[0]
				let point2 = this.tempPoints[1]

				this.tempPoints.shift()

				this.ctx.moveTo(point1.x, point1.y)
				this.ctx.lineTo(point2.x, point2.y)
				this.ctx.stroke()
				this.ctx.draw(true)
			},

			//清空画布
			clearCanvas: function() {
				let that = this;
				uni.getSystemInfo({
					success: function(res) {
						let canvasw = res.windowWidth;
						let canvash = res.windowHeight;
						that.ctx.clearRect(0, 0, canvasw, canvash);
						that.ctx.draw(true);
					},
				})
				that.res = ''
				that.finalPoints = []
			},

			//完成绘画并保存到本地
			identify: function() {
				console.log(this.finalPoints)
				this.res = ocrRaw(this.finalPoints)
				console.log('================识别数字结果: ',this.res)
				//
				// uni.request({
				//   url: 'http://localhost:8081/hw2reco/number', //仅为示例，并非真实接口地址。
				//   method: 'POST',
				//   data: JSON.stringify(this.finalPoints),
				//   header: {
				//     'Content-Type': 'application/json;charset=UTF-8'
				//   },
				//   success: (res) => {
				//     this.res = res.data.data.number;
				//   }
				// });
			},			
			lastSub() {
				console.log('click lastSub')
			},			
			nextSub() {
				console.log('click nextSub')
			},
			// this.changeHideStatus('job-tools', 'none')
			changeHideStatus(className, displayValue) {
				var elements = document.querySelectorAll('.' + className);
				for (var i = 0; i < elements.length; i++) {
					elements[i].style.display = displayValue;
				}
			}			
		},
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

	/* 画板 */
	.drawer {
		display: none;
		position: absolute;
		width: 100%;
		height: 25%;
		border-top: 2px solid #6B8BD3;
		background-color: #F3F3FF;
		bottom: 0%;
	}

	.title {
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		font-family: 'pxp-font';
	}

	.draw-canvas {		
		position: absolute;
		left: 6%;
		top: 25%;
		padding-top: 15%;
		/* display: flex;
		justify-content: center; */
		width: 88%;
		height: 40px;		 
		background-color: #88ec9f;
	}

	.draw-header {
		display: flex;
		position: relative;
		justify-content: center;
	}

	.btn-clear {
		background-image: url('../../static/icon/clean-red.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 58px;
		height: 28px;
		top: 10px;
		right: 16%;
		border: none;
		/* font-size: 20px; */
		font-family: 'pxp-font';
	}

	.btn-identify {
		font-family: 'pxp-font';
		background-size: cover;
		background-repeat: no-repeat;
		width: 58px;
		height: 28px;
		top: 10px;
		left: 16%;
		border: none;
		background-image: url('../../static/icon/sure-green.png');
		/* background-size: 100% 100%; */
		background-repeat: no-repeat;
	}

	.draw-footer {
		display: flex;
		position: absolute;
		justify-content: center;
		bottom: 10px;
		width: 100%;
		height: 30px;
		/* background-color: #ff3737; */
		/* margin-bottom: 10px; */
	}
	.btn-last {
		background-image: url('../../static/icon/last-sub.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 58px;
		height: 28px;
		/* margin-top: 32%; */
		right: 16%;
		border: none;
		/* font-size: 20px; */
		font-family: 'pxp-font';
	}	
	.btn-next {		
		background-image: url('../../static/icon/next-sub.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 58px;
		height: 28px;
		/* margin-top: 32%; */
		left: 16%;
		border: none;
		/* background-size: 100% 100%; */
		background-repeat: no-repeat;
	}

	/* 画板 */
</style>