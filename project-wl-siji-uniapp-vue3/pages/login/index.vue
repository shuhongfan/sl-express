<!-- 手机号登录页面 -->
<template>
	<!-- 公用nav -->
	<view class="navBox"><uni-nav-bar title="神领物流" :border="false" /></view>
	<!-- end -->
	<view class="loginBox">
		<view class="tit">
			<text>手机号登录</text>
			<text class="text" @click="goLogin">
				账号登录
				<icon></icon>
			</text>
		</view>
		<!-- 登录表单 手机号、验证码 -->
		<view class="loginMain">
			<uni-forms ref="customForm" :rules="customRules" :modelValue="fromInfo">
				<uni-forms-item name="phone"><uni-easyinput class="item" v-model="fromInfo.phone" placeholder="请输入手机号" /></uni-forms-item>
				<uni-forms-item name="verifyCode">
					<uni-easyinput class="item inputW" v-model="fromInfo.verifyCode" placeholder="请输入验证码" />
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
				 >登 录</text>
			</view>
			<!-- end -->
		</view>
		<!-- end -->
	</view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
// 接口
import { phoneLogins, getUserInfo, getsmsCode } from '../api/user.js';
// 验证
import { validatePhone, timeCountdown, isPhone } from '@/utils/validate';
// ------定义变量------
const store = useStore(); //vuex获取储存数据
const customForm = ref();
const isVerifySuccess = ref(false);
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
// ------生命周期------
onMounted(() => {});
// ------定义方法------
// 获取验证码
const getCode = async () => {
	let p = fromInfo.phone;
	isVerifySuccess.value = isPhone(p);
	if (isVerifySuccess.value) {
		timeCountdown(codeInfo);
		const parent = {
			phone: phone.value
		};
	} else {
		return uni.showToast({
			title: '手机号输入错误！请重新输入',
			duration: 1000,
			icon: 'none'
		});
	}
};
// 登录
const handleSubmit = async() => {
	// 表单校验
	const valid = await customForm.value.validate();
	if (valid) {
		// 登录接口
		await phoneLogins(fromInfo)
			.then(res => {
				if (res.code === 200) {
					store.commit('user/setToken', res.token);
					// 通过vuex获取用户信息
					store.dispatch('user/GetUsersInfo')
					// 跳转到首页
					uni.redirectTo({
						url: '/pages/index/index'
					});
				} else {
					return uni.showToast({
						title: res.data.msg,
						duration: 1000,
						icon: 'none'
					});
					// 密码输入错误！请重新输入
					// 账号输入错误！请重新输入
				}
			})
			.catch(err => {});
	}
};
// 去手机登录页面
const goLogin = () => {
	uni.redirectTo({
		url: '/pages/login/user'
	});
};
</script>
<style src="./index.scss" lang="scss" scoped></style>
