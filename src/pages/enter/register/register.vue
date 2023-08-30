<template>
	<view class="container">
		<view class="header">
			<button class="btn-cancel" @click="returnCancel"></button>
			<view class="btn-avatar"></view>
			<button class="btn-save" @click="sure"></button>
		</view>
		<view class="job-list">
			<view class="nick-row">
				<view>&nbsp;&nbsp;&nbsp;名称 ：（</view>
				<input class="global-input" style="font-family: pxp-sed-font; font-size: 24px;" type="text"
					id="username" placeholder="  奥特曼" />
				<view>）</view>
			</view>
			<view class="sex-row">
				<view>&nbsp;性别 ：&nbsp;</view>
				<!-- <uni-section class="global-input" title="" type="line"> -->
				<view class="global-input">
					<uni-data-checkbox :localdata="sex"></uni-data-checkbox>
				</view>
				<!-- </uni-section> -->
				<!-- <input class="" type="checkbox" id="sex-man" placeholder="" /> -->
				<!-- <view>男</view>
				<input class="" type="checkbox" id="sex-woman" placeholder="" />
				<view>女</view> -->
			</view>
			<view class="user-row">
				<view>&nbsp;&nbsp;用户名 ：（</view>
				<input class="global-input" style="font-family: pxp-sed-font; font-size: 24px;" type="text"
					id="username" placeholder="" />
				<view>）</view>
			</view>
			<view class="pwd-row">
				<view>&nbsp;&nbsp;&nbsp;密码 ：（</view>
				<input class="global-input" style="font-family: pxp-sed-font;" type="password" id="pwd" />
				<view>）</view>
			</view>
			<view class="rep-pwd-row">
				<view>重复密码 ：（</view>
				<input class="global-input" style="font-family: pxp-sed-font;" type="password" id="username"
					placeholder="" />
				<view>）</view>
			</view>
			<view class="country-row">
				<view>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;国家 ：（</view>
				<picker class="global-input" @change="bindPickerChange" :value="index" :range="nation">
					<view class="uni-input" style="font-family: pxp-sed-font; font-size: 26px;">
						&nbsp;&nbsp;{{nation[index]}}</view>
				</picker>
				<view>▼）</view>
			</view>
			<view class="city-row">
				<view>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;城市 ：（</view>
				<picker class="global-input" @change="bindCityPickerChange" :value="cindex" :range="city">
					<view class="uni-input" style="font-family: pxp-sed-font; font-size: 26px;">
						&nbsp;&nbsp;{{city[cindex]}}</view>
				</picker>
				<view>▼）</view>
			</view>
			<view class="birth-row">
				<view>&nbsp;&nbsp&nbsp;&nbsp;&nbsp生日 ：（</view>
				<picker class="global-input" mode="date" :value="date" :start="startDate" :end="endDate"
					@change="bindDateChange">
					<view class="uni-input">&nbsp;{{date}}</view>
				</picker>
				<view>▼）</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				sex: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],
				date: currentDate,
				index: 0,
				nation: ['中国', '美国', '加拿大', '日本', '冰岛'],
				cindex: 0,
				city: ['北京',
					'上海',
					'广州',
					'深圳',
					'天津',
					'成都',
					'南京',
					'重庆',
					'武汉',
					'西安'
				],
			}
		},
		onLoad() {
			// 加载字体
			uni.loadFontFace({
					family: 'pxp-font',
					source: 'url("https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/quick-sum/font/cus-font.ttf")',
					// source: 'url("https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/quick-sum/font/ChillZhuo.ttf")',
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
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			bindCityPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				this.cindex = e.detail.value
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			returnCancel() {
				console.log('click cancel')
				uni.navigateTo({
					url: '/pages/enter/login/login'
				});
			},
			sure() {
				console.log('click sure')
				uni.navigateTo({
					url: '/pages/enter/login/login'
				});
			}
		}
	}
</script>


<style lang="scss">
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
		background-image: url('../../static/icon/sub-bg.png');
		background-size: 100% 98%;
		/* background-color: #FCEDFA; */
		background-repeat: no-repeat;
		font-family: pxp-font, Arial, Helvetica, sans-serif;
		/* font-family: Arial, Helvetica, sans-serif; */
		font-size: 18px;
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

	.btn-cancel {
		background-image: url('../../../static/icon/cancel.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 20%;
		height: 45%;
	}

	.btn-avatar {
		background-image: url('../../../static/icon/avatar.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		/* margin-top: 7%; */
		margin-bottom: 1%;
		width: 90rpx;
		height: 90rpx;
		border: 2px solid #6B8BD3;
		border-radius: 50px;
	}

	.btn-save {
		background-image: url('../../../static/icon/btn-sure.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 20%;
		height: 45%;
	}

	.job-list {
		/* background-color: #550000; */
		// border: 3px dashed #70d3b5;
		width: 100%;
		height: 70%;
		margin-top: 64rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.global-input {
		/* 全局输入框右移 */
		padding-left: 13px;
		width: 37%;
		font-weight: bold;
		font-size: 19px;
	}

	.nick-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: #df22a3; */
		// border: 3px dashed #d30c62;
		height: 7%;
		width: 90%;
		margin-top: 1rpx;
	}

	.sex-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		// border: 3px dashed #a2d348;
		height: 7%;
		margin-top: 2rpx;
		width: 90%;
	}

	.pwd-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: #b9df81; */
		// border: 3px dashed #d30c62;
		height: 7%;
		width: 80%;
		margin-top: 16rpx;
	}

	.user-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: #df22a3; */
		// border: 3px dashed #d30c62;
		height: 7%;
		width: 88%;
		margin-top: 13rpx;
	}

	.rep-pwd-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: #b9df81; */
		// border: 3px dashed #d30c62;
		margin-top: 15rpx;
		height: 7%;
		width: 80%;
	}

	.country-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: #b9df81; */
		// border: 3px dashed #d30c62;
		margin-top: 19rpx;
		height: 7%;
		width: 80%;
	}

	.city-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: #b9df81; */
		// border: 3px dashed #d30c62;
		margin-top: 13rpx;
		height: 7%;
		width: 80%;
	}

	.birth-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: #b9df81; */
		// border: 3px dashed #d30c62;
		margin-top: 13rpx;
		height: 7%;
		width: 80%;
	}
</style>