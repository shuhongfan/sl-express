<!-- 账号登录页 -->
<template>
	<view class="logo">神领快递员</view>
	<view class="loginBox">
		<view class="tit">
			<text>账号登录</text>
			<!-- 一期不做,暂时隐藏 -->
			<!-- <text class="text" @click="goLogin">
				手机号登录
				<icon></icon>
			</text> -->
		</view>
		<!-- 登录表单 -->
		<view class="loginMain">
			<uni-forms ref="customForm" :rules="customRules" :modelValue="fromInfo">
				<uni-forms-item name="account"><uni-easyinput class="item" v-model="fromInfo.account" placeholder="请输入账号" /></uni-forms-item>
				<uni-forms-item name="password" class="pwdBox">
					<uni-easyinput class="item" type="password" v-model="fromInfo.password" placeholder="请输入密码" />
					<text class="clearIcon" v-if="fromInfo.password.length > 0" @click="handlePwd"></text>
				</uni-forms-item>
			</uni-forms>
			<!-- 按钮 -->
			<view class="btnBox">
				<button
					class="btn-default"
					:disabled="fromInfo.account.length === 0 || fromInfo.password.length === 0"
					:class="fromInfo.account.length === 0 || fromInfo.password.length === 0 ? 'disabled' : ''"
					type="primary"
					@click="handleSubmit"
				>
					登录
				</button>
			</view>
			<!-- end -->
			<!-- 更新请求Url - 教学需求 -->
			<view class="setUrl" @click="inputDialogToggle">配置请求url</view>
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="配置URL" :value="baseURL" placeholder="请输入baseURL" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
			<!-- 更新请求Url - 教学需求 -->
		</view>
		<!-- end -->
	</view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import storage from '@/utils/storage.js';
// 接口
import { userLogins } from '../api/user.js';
// 导入接口
import { getHomeInfo } from '@/pages/api/index.js';
// ------定义变量------
const store = useStore(); //vuex获取储存数据
let showPassword = ref(false); //控制密码右侧图标显示隐藏
const customForm = ref(); //表单校验
// 表单数据
let fromInfo = reactive({
	account: 'blkdy001', //账号
	password: '123456' // 密码
});
// 表单校验
const customRules = reactive({
	account: {
		rules: [
			{
				required: true,
				errorMessage: '请输入手机号'
			}
		]
	},
	password: {
		rules: [
			{
				required: true,
				errorMessage: '请输入验证码'
			}
		]
	}
});
// ------声明周期------
onMounted(() => {
	// 进入登录页面配置默认的请求url
	// uni.setStorageSync('baseUrl', 'http://slwl-geteway-t.itheima.net/courier');
	// 处理定时上报位置的定时器
	clearInterval(uni.getStorageSync('positions').timer);
	uni.setStorageSync('positions', null);
});
// ------定义方法------
// 登录
const handleSubmit = async () => {
	// // 表单校验
	const valid = await customForm.value.validate();
	if (valid) {
		// 登录接口
		// 网络慢的时候添加按钮loading
		let times = 
		setTimeout(()=>{
			uni.showLoading({
				title: 'loading',
			});
		},500)
		await userLogins(fromInfo)
			.then(async res => {
				if (res.code === 200) {
					// 操作成功后清除loading
					setTimeout(function () {
						uni.hideLoading();
					}, 500);
					clearTimeout(times)
					// 存储token
					uni.setStorageSync('token', res.data.token);
					store.commit('user/setToken', res.data.token);
					// // 通过vuex获取用户信息
					store.dispatch('user/GetUsersInfo');
					await getHomeInfo().then(res => {
						if (res.code === 200) {
							// 跳转到首页
							uni.redirectTo({
								url: '/pages/index/index'
							});
						}
					});
				} else {
					uni.showToast({
						title: res.msg,
						duration: 1000,
						icon: 'none'
					});
				}
			})
			.catch(err => {
				// uni.showToast({
				// 	title: err.msg,
				// 	duration: 15000,
				// 	icon: 'none'
				// });
			});
	}
};
// 去手机登录页面
const goLogin = () => {
	uni.redirectTo({
		url: '/pages/login/index'
	});
};
// 设置密码
const handlePwd = () => {
	fromInfo.password = '';
};
// 打开设置Url窗口
const baseURL = ref(uni.getStorageSync('baseUrl'));
const inputDialog = ref(null);
const inputDialogToggle = () => {
	inputDialog.value.open();
};
// 报错配置的Url
const dialogInputConfirm = val => {
	baseURL.value = val;
	uni.setStorageSync('baseUrl', val);
};
</script>

<style src="./index.scss" lang="scss"></style>
