<template>
	<view class="container">
		<view class="header">
			<view class="conter-text">
				<text class="app-title">BBENG速算</text>
			</view>
		</view>
		<view class="tab-bts">
			<button :class="{'tab-button': true, 'active': activeTab === 1}" @click="switchTab(1)">用户名</button>
			<button :class="{'tab-button': true, 'active': activeTab === 2}" @click="switchTab(2)">验证码</button>
		</view>
		<view class="tab-content">
			<view v-show="activeTab === 1" class="job-list">
				<view class="user-row">
					<view>用户名：（</view>
					<input class="global-input" type="text" id="username" placeholder="手机号/用户名" />
					<view>）</view>
				</view>
				<view class="pwd-row">
					<view>&nbsp; 密码：（</view>
					<input class="global-input" type="password" id="pwd" />
					<view>）</view>
				</view>
			</view>
			<view v-show="activeTab === 2" class="job-list">
				<view class="phone-vfy-row">
					<view>手机号：（</view>
					<input type="text" class="global-input" placeholder="15093820979" />
					<view>）</view>
					<view class="send-text">发送</view>
				</view>
				<view class="code-row">
					<input type="text" class="code-box input-box" placeholder="1">
					<input type="text" class="code-box input-box" placeholder="1">
					<input type="text" class="code-box input-box" placeholder="1">
					<input type="text" class="code-box input-box" placeholder="1">
				</view>
			</view>
		</view>
		<!-- 注册 -->
		<view class="regit-row">
			<button class="btn-register"></button>
		</view>
		<!-- 登录+微信 -->
		<view class="footer">
			<button class="btn-login"></button>
			<button class="btn-wechat"></button>
			<view>微信</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 1
			}
		},
		onLoad() {
			// 加载字体
			uni.loadFontFace({
				family: 'pxp-font',
				// source: 'url("https://sungd.github.io/Pacifico.ttf")',
				source: 'url("https://mp-40dc0c3b-8c88-46a3-943c-80a76525110e.cdn.bspapp.com/quick-sum/font/cus-font.ttf")',
				success() {
					console.log('login load crazy font ttf success!')
				}
			})
		},
		methods: {
			switchTab(tabIndex) {
				// :jobList="todoList" :ddList="ddList" :Tyear="Tyear" :Tmonth="Tmonth" :Tday="Tday" :TWeek="TWeek"
				// this.selectKey = this.Tyear + '/' + this.Tmonth + '/' + this.Tday;
				this.activeTab = tabIndex;
				if (tabIndex === 1) {
					console.log('======= switchTab, user Login', tabIndex)
					// this.getDayJob(this.Tyear, this.Tmonth, this.Tday, true);
				} else {
					// this.getDayJob(this.Tyear, this.Tmonth, this.Tday, false);
					console.log('======= switchTab, user verify', tabIndex)
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
		background-size: 100% 100%;		
		background-repeat: no-repeat;
		font-family: 'pxp-font';
	}

	.header {
		/* background-color: #8d4057; */
		/* display: flex;
		justify-content: space-between;
		align-items: center; */
		width: 50%;
		height: 30px;
		margin-top: 27%;
		margin-left: auto;
		margin-right: auto;		
	}

	.conter-text {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.app-title {
		font-weight: bold;
		/* width: 100%; */
		font-size: 26px;
		/* align-items: center; */
		/* color: #b46274; */
		padding: 0 0px;
	}

	.tab-bts {		
		display: flex;
		justify-content: center;
		align-items: center;
		width: 55%;
		height: 4%;
		margin-left: auto;
		margin-right: auto;
		border-radius: 0px;		
		margin-top: 8%;
	}

	.tab-button {
		color: #7296df;
		font-size: 12px;
		margin-right: 4%;
		/* left: 10px; */
		/* font-weight: bolder; */
		flex: 1;
		border-radius: 0px;
		border: 1px solid #6B8BD3;
		/* padding: 10px 20px; */
		/* border: none; */
		outline: none;
		background-color: transparent;
		/* cursor: pointer; */
	}

	.tab-button.active {
		font-size: 12px;
		background-color: #7296df;
		color: #ffffff;
		border: 1px solid #6B8BD3;
		border-radius: 0px;
		outline: none;
		/* border-radius: 10px; */
	}

	.tab-content {
		/* background-color: #75b97d; */
		width: 100%;
		height: 21%;
		margin-top: 6%;
		margin-left: auto;
		margin-right: auto;		
		/* display: flex; */
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 19px;
	}

	.job-list {
		/* background-color: #550000; */
		width: 100%;
		height: 100%;
		margin-top: 3%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.global-input {
		/* 全局输入框右移 */
		padding-left: 13px;
		width: 37%;
		font-size: 19px;
	}

	.user-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: #df22a3; */
		height: 40%;
		width: 88%;
	}

	.pwd-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: #b9df81; */
		height: 42%;
		width: 80%;
	}

	.phone-vfy-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: #b9df81; */
		height: 42%;
		width: 88%;
	}

	.send-text {
		color: #6B8BD3;
		/* font-weight: bold; */
	}

	.code-row {
		/* background-color: #dfa4d4; */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 72%;
	}

	.code-box {
		background-image: url("../../../static/icon/input-code.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		margin-right: 20px;	
		padding-left: 20px;
		/* padding-right: 20px; */
		margin-top: 10px;
		padding-top: 6px;
		padding-bottom: 6px;
		width: 20px;
		height: 39px;
	}
	
	.regit-row {
		/* background-color: #9adfb6; */
		width: 100%;
		height: 7%;
		margin-top: 8%;
	}
	.btn-register{
		background-image: url("../../../static/icon/regit.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		width: 45px;
		height: 30px;
		position: relative;
		top: 6%;
		left: 30%;
	}
	
	/* 登录+微信 */
	.footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* background-color: #21bcdf; */
		margin-top: 1%;
		height: 23%;
		width: 100%;
	}
	.btn-login{
		background-image: url("../../../static/icon/login.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border: none;
		width: 54%;
		height: 27%;
	}
	.btn-wechat{
		background-image: url("../../../static/icon/wechat.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		margin-top: 7%;
		margin-bottom: 1%;
		width: 12%;
		height: 25%;
		border: none;
		border-radius: 50px;
	}
	
</style>