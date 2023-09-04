<template>
	<view class="container">
		<view class="debug" @click="debug">
			耗时:{{timeRef}}
		</view>
		<view class="header">
			<view class="a-btn-avatar"></view>
			<view style="font-family: pxp-sed-font; font-size: 24px;position: relative;	right: 50px;">奥特曼</view>
			<view class="a-btn-quit" @click="quit"></view>
		</view>
		<!-- 总览: 题目, 倒计时 -->
		<view class="summary">
			<!-- <view style="font-family: pxp-sed-font; font-size: 24px;">奥特曼</view> -->
			<view style="font-family: pxp-sed-font; font-size: 24px;">题目数 : {{sunCount}}</view>
			<view class="cd" style="font-family: pxp-sed-font; font-weight: bold; font-size: 25px;">倒计时 :
				{{ countDown.hours }}:{{ countDown.minutes }}:{{ countDown.seconds }}
			</view>
		</view>
		<view class="ret-summary">
			<!-- <view style="font-family: pxp-sed-font; font-size: 24px;">奥特曼</view> -->
			<view class="cd" style="font-family: pxp-sed-font; font-weight: bold; font-size: 25px;">耗时 :
				{{timeRef}}
			</view>
			<view class="ret-circle"
				:style="{ backgroundImage: perfect() ? '' : 'url(../../../static/icon/circle.png)' }">
				<view class="score-text">{{scorePercent}}分</view>
			</view>
		</view>
		<!-- 答题结果 -->
		<view class="report">
			<view style="font-family: pxp-sed-font; font-size: 20px;">题目数 : {{sunCount}}</view>
			<view style="font-family: pxp-sed-font; font-size: 20px;">正确 : {{trueIndex.length}}</view>
			<view style="font-family: pxp-sed-font; font-size: 20px;">错误 : {{sunCount - trueIndex.length}}</view>
		</view>
		<!-- 答题区 -->
		<view class="answer" id="myElement">
			<scroll-view scroll-y="true" show-scrollbar="false" class="scroll-Y" :scroll-top="scrollTop"
				@scroll="scroll">
				<view class="scroll-view-item" v-for="(row, rowIndex) in groupedQuesList" :key="rowIndex">
					<view class="ques-row">
						<view v-for="(item, itemIndex) in row" :key="itemIndex" @click="focus(rowIndex * 2 + itemIndex)"
							class="ques-view">
							<view class="a-bef">
								{{getExpressionPrefix(item.opt)}}=
							</view>
							<!-- 结果 -->
							<view class="at-ans">{{inputValues[rowIndex * 2 + itemIndex]}}</view>
							<view class="at-ans tof"
								:style="{ backgroundImage: trueIndex.includes(rowIndex * 2 + itemIndex) ? 'url(../../../static/icon/true.png)' : 'url(../../../static/icon/false.png)' }">
							</view>
							<!-- <view style="font-family: 'Courier New', Courier, monospace;">
									Just debug {{ JSON.stringify(item) }}
							</view> -->
							<view class="at-ans hint"
								:style="{ backgroundImage: trueIndex.includes(rowIndex * 2 + itemIndex) ? '' : 'url(../../../static/icon/hint.png)' }"
								@click="showHint(rowIndex * 2 + itemIndex, item.desc, item.rule)">&nbsp;</view>
							<!-- 填空 -->
							<view class="bf-ans">&nbsp;(</view>
							<input :focus="(rowIndex * 2 + itemIndex) === focusIndex"
								class="a-global-input bf-ans uni-input"
								style="font-family: pxp-sed-font; font-size: 20px;" type="text"
								:id="getRowInputId(rowIndex, itemIndex)" placeholder="" inputmode="none"
								v-model="inputValues[rowIndex * 2 + itemIndex]" />
							<view class="bf-ans">)</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 画板 -->
		<view class="drawer" @click="checkFocus">
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
		<!-- 提示信息弹窗 -->
		<view>
			<uni-popup ref="a_message" type="message">
				<uni-popup-message style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" :type="msgType"
					:message="messageText" :duration="3000"></uni-popup-message>
			</uni-popup>
		</view>
		<view class="sure" @click="quit">
		</view>
		<!-- 提示模态框 -->
		<view class="a-modal">
			<view class="a-modal-content">
				<view class="close-modal" @click="closeModal"></view>
				<view class="a-show-title">讲解</view>
				<view class="a-desc-row">
					<view style="font-family: pxp-sed-font; font-size: 22px;">{{hintDesc}}</view>
				</view>
				<view class="a-div-row">
					<view style="font-family: pxp-sed-font; font-size: 23px;">所以最终答案就是：</view>
				</view>
				<view class="a-rule">
					<view style="font-family: pxp-sed-font; font-size: 25px;">{{hintRule}}</view>
				</view>				
			</view>
		</view>
	</view>

</template>

<script lang="js">
	// 翻页
	//turn.js
	// import turn from '../../static/js/turn.min.js'
	import {
		getNumber,
		ocrRaw
	} from "@/models/number"

	import store from '@/static/js/store.js'

	var x = -10;
	var y = -10;
	export default {
		data() {
			return {
				ctx: '', // 绘图图像
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				tempPoints: [], // 每一笔路径点集合
				finalPoints: [], // 所有路径点集合
				res: '', //路径点集合
				sunCount: 0,
				as_duration: 0, // 倒计时时间，单位为分钟
				using_time: 0, // 所用时间,   单位秒
				timeRef: '',
				countDown: {
					hours: '--',
					minutes: '--',
					seconds: '--'
				},
				// 题目
				quesList: [],
				focusIndex: -1,
				lastFocus: -1,
				// 答题内容
				inputValues: [],
				// 答对题目下标
				trueIndex: [],
				// 错题提示
				hintDesc: '把其中一个数分解成两个数，分解的其中一个数和另一个数相加等于xx',
				hintRule: '5+（2+8）= 15',
				// 分数百分比
				scorePercent: '',
				currentFocus: null,
				tipFocus: false,
				timer: null,
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: ''
			}
		},
		onLoad() {
			// debug 加载调试设置 
			// store.loadDebugSetting()
			console.log('Pxp answer--------- onLoad from store.js---------', store.subList)
			// 加载题目设置
			console.log('answer page onload, setting:', store.setting)
			this.sunCount = store.setting.subNumber
			this.as_duration = store.setting.duration * 60
			// 加载题目
			this.quesList = store.getRandomQuestions()


			console.log('============= 初始化题目: ', this.quesList)
			// 初始化答案
			this.initEmptyAnswer()
			this.sunCount = this.quesList.length
			// 加载字体
			uni.loadFontFace({
					family: 'pxp-font',
					source: 'url("../../static/cus-font.ttf")',
					// source: 'url("https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/quick-sum/font/cus-font.ttf")',
					success() {
						console.log('load crazy font ttf success!')
					}
				}),
				// 二级字体
				uni.loadFontFace({
					family: 'pxp-sed-font',
					source: 'url("../../static//ChillZhuo.ttf")',
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
		mounted() {
			this.startCountdown();
		},
		computed: {
			groupedQuesList() {
				const groupSize = 2; // 每行显示的 .ques-view 数量
				const result = [];
				for (let i = 0; i < this.quesList.length; i += groupSize) {
					result.push(this.quesList.slice(i, i + groupSize));
				}
				return result;
			}
		},
		methods: {
			debug() {
				console.log('.........click debug.........');
				// this.stopCountdown()
				this.score()
				// 过半滚动
			},
			initEmptyAnswer() {
				for (var i = 0; i < this.quesList.length; i++) {
					this.inputValues.push('');
				}
			},
			getCorrectIndexes(inputValues, quesList) {
				const correctIndexes = [];

				for (const i in inputValues) {
					const answer = inputValues[i];

					if (quesList && quesList[i] && quesList[i].opt) {
						const opt = quesList[i].opt;
						const equalIndex = opt.indexOf('=');

						if (equalIndex !== -1 && opt.slice(equalIndex + 1).trim() === answer) {
							correctIndexes.push(parseInt(i));
						}
					}
				}

				return correctIndexes;
			},
			// 时间格式化
			formatTime(seconds) {
				const hours = Math.floor(seconds / 3600);
				const minutes = Math.floor((seconds % 3600) / 60);
				const remainingSeconds = seconds % 60;

				const formattedHours = String(hours).padStart(2, '0');
				const formattedMinutes = String(minutes).padStart(2, '0');
				const formattedSeconds = String(remainingSeconds).padStart(2, '0');

				return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
			},
			// 显示分数
			score() {
				// 隐藏填空, 显示结果
				this.changeHideStatus('at-ans', 'block')
				this.changeHideStatus('bf-ans', 'none')
				// 隐藏画板
				this.changeHideStatus('drawer', 'none')
				this.changeHideStatus('sure', 'block')
				console.log('judge for score...')
				// 显示确定				
				// 打分
				console.log('答题情况:', this.inputValues)
				console.log('题目情况:', this.quesList)
				this.trueIndex = this.getCorrectIndexes(this.inputValues, this.quesList)
				var ratio;
				var sp;

				if (this.quesList.length > 0) {
					ratio = this.trueIndex.length / this.quesList.length;
					sp = Math.round(ratio * 100);
				} else {
					sp = 0;
				}
				console.log('答对题目:', this.trueIndex, '百分比: ', sp)
				this.scorePercent = `${sp}`
				// // 计分
				// if this.quesList.length === 0 {
				// 	this.percentage = `0`
				// } else {
				// 	var rnum = this.trueIndex.length
				// 	var ratio = rnum / (this.quesList.length)
				// 	var sp = Math.round(ratio * 100)

				// 	this.percentage = `${sp}`
				// }


				// 停止倒计时
				this.stopCountdown()
				this.changeHideStatus('summary', 'none')
				this.changeHideStatus('ret-summary', 'flex')
				this.timeRef = this.formatTime(this.using_time)


				// display: flex;
				this.changeHideStatus('report', 'flex')
				/* 注意显示分数时候把答题区域高度调低5%*/
				const element = document.getElementById('myElement');
				if (element) {
					element.style.height = '40%';
				}
				// this.$refs.myElement.style.height = '40%';
			},
			perfect() {
				if (this.scorePercent === '100') {
					return true
				}
				console.log('完美分数判断: ', this.scorePercent)
				return false
			},
			showHint(idx, desc, rule) {
				console.log('展示提示: ', desc, '题目下标：', idx);
				this.hintDesc = desc
				// this.hintRule = ruleArrray[idx]
				if (rule === '' ) {
				  this.hintRule = "规则不可用，请动用你的脑筋想想为什么！";
				} else {
				  // 处理空指针或数组越界的情况，可以设置默认值或触发错误处理逻辑
				  this.hintRule = rule;
				}
				this.changeHideStatus('a-modal', 'block')
			},
			closeModal() {
				this.changeHideStatus('a-modal', 'none')
			},
			quit() {
				console.log('click quit');
				uni.navigateTo({
					url: '/pages/index/question/question'
				});
			},
			// messageToggle(type) {
			// 	this.msgType = type
			// 	this.messageText = `你的答题已结束。`
			// 	this.$refs.a_message.open()
			// },
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			// 聚焦
			focus(idx) {
				console.log('点击题目: idx:', `input-${idx}`);
				// 清除画板
				this.clearCanvas()
				this.focusIndex = idx;
				this.lastFocus = idx;
			},
			// 提取公式前缀
			getExpressionPrefix(expression) {
				// 提取表达式的前缀部分
				const parts = expression.split("=");
				const expressionPrefix = parts[0].trim();
				return expressionPrefix;
			},
			getRowInputId(rowIndex, itemIndex) {
				const gid = rowIndex * 2 + itemIndex
				return `input-${gid}`;
			},
			// 结束倒计时
			stopCountdown() {
				this.timeRef = this.formatTime(this.using_time)
				clearInterval(this.timer);
				console.log('倒计时时间到, 耗时:', this.using_time);
			},
			// 倒计时
			startCountdown() {
				this.timer = setInterval(() => {
					if (this.as_duration > 0) {
						this.as_duration--;
						this.using_time++;
						let hours = parseInt(this.as_duration / 3600, 10);
						let minutes = parseInt((this.as_duration % 3600) / 60, 10);
						let seconds = this.as_duration % 60;

						hours = String(hours).padStart(2, '0');
						minutes = String(minutes).padStart(2, '0');
						seconds = String(seconds).padStart(2, '0');

						this.countDown = {
							hours,
							minutes,
							seconds
						}; // 更新 countDown 数据
					} else {
						// this.messageToggle('error');
						console.log('倒计时时间到！');
						clearInterval(this.timer);
						// 自动打分
						this.score()
					}
				}, 1000);
			},
			checkFocus() {
				console.log('从答题idx:', this.lastFocus, '转换点击画板区域');
				this.focusIndex = this.lastFocus
			},
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
				console.log('================识别数字结果: ', this.res, '最近下标lastFocus: ', this.lastFocus)
				// 更新当前输入框的值
				this.inputValues[this.lastFocus] = this.res

				// 如果是最后一题,则提交
				if (this.lastFocus === (this.quesList.length - 1)) {
					console.log('最后一题, 下标:', this.lastFocus)
					// 延迟一秒进入打分						
					this.score()
				}

			},
			lastSub() {
				console.log('click lastSub')
				if (this.focusIndex > 0) {
					this.focusIndex--
					// 清除画板
					this.clearCanvas()
				}
				if (this.lastFocus > 0) {
					this.lastFocus--
					// 清除画板
					this.clearCanvas()
				}
			},
			nextSub() {
				console.log('click nextSub')
				if (this.focusIndex > this.sunCount) {
					this.focusIndex++
					// 清除画板
					this.clearCanvas()
				}
				if (this.lastFocus < this.sunCount) {
					this.lastFocus++
					// 清除画板
					this.clearCanvas()
				}
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

	.debug {
		display: none;
		background-image: url('../../../static/icon/circle.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		top: -4%;
		left: 40%;
	}

	.a-btn-avatar {
		background-image: url('../../../static/icon/avatar.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		/* margin-top: 7%; */
		margin-bottom: 1%;
		position: relative;
		right: 50px;
		margin-right: 20px;
		width: 90rpx;
		height: 90rpx;
		border: 2px solid #6B8BD3;
		border-radius: 50px;
	}

	.a-btn-quit {
		background-image: url('../../../static/icon/exit.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: relative;
		left: 50px;
		width: 17%;
		height: 28%;
	}

	/* 总览 */
	.summary {
		/* background-color: #368d41; */
		/* border: 2px dashed #aa00ff; */
		width: 82%;
		height: 5%;
		margin-top: 2%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.ret-summary {
		/* border: 2px dashed #aa00ff; */
		width: 82%;
		height: 5%;
		padding-top: 3%;
		margin-top: 2%;
		margin-left: auto;
		margin-right: auto;
		/* display: flex; */
		display: none;
		flex-direction: row;
		/* justify-content: center;
		align-items: center; */
	}

	.ret-circle {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		/* background-position: 0rpx -15rpx; */
		width: 120rpx;
		height: 100rpx;
		position: relative;
		left: 30%;
		bottom: 41%;
		color: red;
	}

	.score-text {
		font-family: pxp-sed-font;
		font-size: 24px;
		font-weight: bold;
		padding-top: 21%;
		padding-left: 12%;
		/* background-position: 0rpx -15rpx; */
	}

	.report {
		/* border: 2px dashed #9cfbff; */
		margin-left: auto;
		margin-right: auto;
		width: 82%;
		height: 5%;
		/* opacity: 0; */
		display: none;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 40px;
	}

	.answer {
		/* border: 2px dashed #ff9580; */
		width: 82%;
		height: 45%;
		margin-top: 2%;
		margin-left: auto;
		margin-right: auto;
	}

	.scroll-Y {
		height: 100%;
	}

	.scroll-view-item {
		width: 98%;
		height: 8%;
		margin-bottom: 3.6%;
		/* border: 1px solid #6B8BD3; */
		/* line-height: 300rpx; */
	}

	.ques-row {
		/* border: 1px dashed #85d391; */
		width: 100%;
		height: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.ques-view {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* justify-content: center; */
		/* background-color: #df22a3; */
		/* border: 3px dashed #d30c62; */
		height: 87%;
		width: 100%;
		margin-top: 0rpx;
	}

	/* 公式头 */
	.a-bef {
		/* border-top: 1px solid #41d33a; */
		/* background-color: #fafa00; */
		height: 100%;		
		width: 58%;
		font-family: 'pxp-sed-font';
		font-size: 19px;
		text-align: right;
	}

	/* 填空 */
	.a-global-input {
		/* border-top: 1px solid #d32d1e; */
		padding-left: 3%;
		right: 30%;
		width: 24%;
		/* font-weight: bold; */
		font-size: 18px;
	}

	.bf-ans {
		display: block;
	}

	.at-ans {
		display: none;
		font-family: 'pxp-sed-font';
		padding-right: 1%;
		/* right: 30%; */
		width: 7%;
		/* font-weight: bold; */
		font-size: 22px;
	}

	/* 对错图标 */
	.tof {
		background-image: url('../../../static/icon/true.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		border-radius: 50px;
		/* padding-left: 8%; */
		/* bottom: 85rpx;
		left: 3%; */
		/* border: 2px solid #5cd30d; */
		/* 		position: relative;
		margin-left: 80%;
		margin-top: -80rpx; */
		margin-left: 15px;
		width: 45rpx;
		height: 45rpx;
	}

	.hint {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		border-radius: 50px;
		margin-left: 1px;
		width: 30rpx;
		height: 30rpx;
	}

	/* 倒计时 */
	.cd {
		position: relative;
		color: #D7555E;
		left: 20px;
	}

	/* 画板 */
	.drawer {
		/* display: none; */
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
		width: 85%;
		height: 40px;
		/* background-color: #88ec9f; */
		background-image: url('../../static/icon/note.png');
		background-size: cover;
		background-repeat: no-repeat;
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

	.sure {
		display: none;
		background-image: url("../../static/icon/btn-sure2.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border: none;
		/* position: ; */
		margin-top: 12%;
		/* margin-left: 20%; */
		margin-left: auto;
		margin-right: auto;
		width: 59%;
		height: 5.5%;
	}
	/* 提示模态框 */
	.a-modal {
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
	
	.a-modal-content {
		background-image: url('../../../static/icon/hint-bg.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border: none;
		margin: 66% auto;
		width: 600rpx;
		height: 690rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.close-modal {
		background-image: url('../../../static/icon/close.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border: none;
		position: relative;
		top: 50px;
		left: 110px;
		width: 45rpx;
		height: 45rpx;
	}
	
	.a-show-title {
		/* border: 3px dashed #3ab2d3; */
		color: #6B8BD3;
		font-weight: bold;
		align-items: center;
		justify-content: center;
		margin-top: 14%;
		margin-bottom: 5%;
		font-family: 'pxp-sed-font';
		font-size: 30px;
		width: 20%;
		height: 8%;
	}
	
	.a-desc-row {
		/* border: 3px dashed #d30c62; */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 8%;
		width: 80%;
		height: 10%;
	}
	.a-div-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: left;
		font-weight: bold;
		margin-top: 10%;
		width: 80%;
		height: 10%;
	}
	.a-rule {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 7%;
		width: 91%;
		height: 10%;
	}
</style>