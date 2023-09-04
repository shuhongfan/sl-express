<!-- 更改手机号 -->
<template>
	<!-- 登录表单 手机号、验证码 -->
	<view class="loginMain">
		<uni-forms ref="customForm" :rules="customRules" :modelValue="fromInfo">
			<uni-forms-item name="phone">
				<uni-easyinput class="item" v-model="fromInfo.phone" :clearable="false" :placeholder=" step == 1 ? '请输入已绑定手机号' : '请输入新手机号'" />
			</uni-forms-item>
			<uni-forms-item name="verifyCode">
				<uni-easyinput class="item inputW" v-model="fromInfo.verifyCode" :clearable="false" placeholder="请输入验证码" />
				<view class="codeBox">
					<text class="code" v-show="codeInfo.show" @click="getCode">获取验证码</text>
					<text class="code fontCol" v-show="!codeInfo.show">{{ codeInfo.times }}s后重新获取</text>
				</view>
			</uni-forms-item>
		</uni-forms>
		<!-- 按钮 -->
		<view class="btnBox" style="padding-top:100rpx;">
			<text class="button"
			:class="fromInfo.phone.length === 0 || fromInfo.verifyCode.length === 0 ? 'buttonDis1' : 'button'"
			 @click="handleSubmit"
			 >{{step == 1 ? '下一步' : '确定绑定'}}</text>
		</view>
		<!-- end -->
	</view>
	<!-- end -->
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue';
	import { useStore } from 'vuex';
	import { validatePhone, timeCountdown, isPhone } from '@/utils/validate';
	import { getsmsCode, checksmsCode, bindPhone } from '@/pages/api/user.js'
	//vuex获取储存数据
	const store = useStore(); 
	const customForm = ref();
	const isVerifySuccess = ref(false);
	const step = ref(1) // 1 换绑手机 老手机号验证 2 新手机号绑定
	const time = ref(null) // 倒计时对象缓存 在切换下一步时清除用
	
	// 表单数据
	const fromInfo = reactive({
		phone: '', //手机号
		verifyCode: '' // 验证码
	});
	// 验证码倒计时数据
	const codeInfo = reactive({
		show: true,
		timer: null,
		times: 60
	});
	// 表单校验
	const customRules = reactive({
		phone: {
			rules: [
				{
					required: true,
					validateFunction: validatePhone,
					errorMessage: '请输入手机号'
				}
			]
		},
		verifyCode: {
			rules: [
				{
					required: true,
					errorMessage: '请输入验证码'
				}
			]
		}
	});
	// 获取验证码
	const getCode = async () => {
		let phone = fromInfo.phone;
		isVerifySuccess.value = isPhone(phone);
		if (isVerifySuccess.value) {
			time.value = timeCountdown(codeInfo);
			const parent = {
				phone
			};
			// 获取手机验证码
			const {data} = await getsmsCode(parent)
			if(data.code == 0 || data.code == 200){
				uni.showToast({
					title: '验证码已发送成功',
					duration: 1000,
					icon: 'none'
				});
			}else{
				return uni.showToast({
					title: data.msg,
					duration: 1000,
					icon: 'none'
				});
			}
		} else {
			return uni.showToast({
				title: '手机号输入错误！请重新输入',
				duration: 1000,
				icon: 'none'
			});
		}
	};
	// 效验验证码通过进入下一步
	const handleSubmit = async() => {
		// 表单校验
		const valid = await customForm.value.validate();
		if (valid && step.value == 1) {
			// 效验验证码
			checkCode()
		} else {
			// 绑定手机号
			bindPhoneHandle()
		}
		
	};
	
	// 效验验证码
	async function checkCode(){
		// 效验验证码
		await checksmsCode(fromInfo)
			.then(res => {
				if (res.code === 200) {
					// 进入下一步
					step.value = 2
					// 清空输入框
					fromInfo.phone = ''
					fromInfo.verifyCode = ''
					// 还原倒计时
					codeInfo.show = true
					codeInfo.times = 60
				} else {
					return uni.showToast({
						title: data.msg,
						duration: 1000,
						icon: 'none'
					});
					// 密码输入错误！请重新输入
					// 账号输入错误！请重新输入
				}
			})
			.catch(err => {});
	}
	// 绑定手机号
	async function bindPhoneHandle(){
		// 绑定手机号
		await bindPhone(fromInfo)
			.then(res => {
				if (res.code === 200) {
					// 绑定成功 重新登录
					uni.showToast({
						title: '绑定成功请重新登录！',
						duration: 1000,
						icon: 'none'
					});
					setTimeout(()=>{
						goLogin()
					}, 500)
					goLogin()
				} else {
					return uni.showToast({
						title: data.msg,
						duration: 1000,
						icon: 'none'
					});
					// 密码输入错误！请重新输入
					// 账号输入错误！请重新输入
				}
			})
			.catch(err => {});
	}
	// 去手机登录页面
	const goLogin = () => {
		uni.redirectTo({
			url: '/pages/login/user'
		});
	};
</script>

<style lang="scss" scoped>
	.loginMain {
		background-color: #fff;
		
		height: calc(100vh - 90rpx);
		::v-deep .uni-input-input{
			color: var(--neutral-color-main);
		}
		padding: 66rpx;
		.item {
			::v-deep .is-input-border {
				padding: 30rpx 0;
				font-weight: 400;
				font-size: 32rpx;
				line-height: 40rpx;
				color: #797979;
				letter-spacing: 0.36rpx;
				border: 0 none;
				border-bottom: 1px solid var(--neutral-color-background);
				position: relative;
				border-radius: 0;
				.uni-easyinput__placeholder-class {
					font-size: 32rpx;
					color: var(--neutral-color-font);
					letter-spacing: 0.36rpx;
				}
				.uni-easyinput__content-input {
					padding-left: 0 !important;
					font-size: 32rpx;
				}
			}
			::v-deep .is-input-error-border {
				border-bottom: 1px solid var(--essential-color-red);
				margin-bottom: 44rpx;
			}
			::v-deep .content-clear-icon{
				padding: 0;
				font-size: 28rpx !important;
				line-height: 46rpx;
			}
			::v-deep .uniui-eye-filled{
				
				background: url(@/static/icon-close.png) 50% 50% no-repeat;
				background-size: contain;
				&:before{
					color:transparent;
				}
			}
			::v-deep .uniui-eye-slash-filled{
				background: url(@/static/icon-open.png) 50% 50% no-repeat;
				background-size: contain;
				&:before{
					color:transparent;
				}
			}
		}
		::v-deep .uni-forms-item__inner {
			padding-bottom: 0;
		}
		::v-deep .uni-error-message {
			bottom: -10rpx;
		}
		::v-deep .content-clear-icon {
			margin-right: 30rpx;
		}
		.inputW{
			::v-deep .is-input-border{
				padding-right: 166rpx;
			}
		}
		.codeBox {
			position: absolute;
			right: 40rpx;
			top: 34rpx;
			font-size: 28rpx;
			color: #818181;
			border-left: solid 4rpx #f4f4f4;
			padding-left: 20rpx;
		}
	}
</style>