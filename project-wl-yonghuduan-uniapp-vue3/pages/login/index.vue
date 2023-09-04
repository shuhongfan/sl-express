<!-- 手机短信登录页 -->
<template>
	<view class="loginBox">
		<!-- 头部导航栏 -->
		<NavBar title='登录'></NavBar>
		<view class="logo-box">
			<image src='../../static/userLogo.png'></image>
		</view>

		<view class="open-dialog" @click="handleOpen">微信登录</view>

		<!-- 服务条款及隐私政策弹窗 -->
		<uni-popup ref="popup" type="bottom" :safe-area="false">
			<view class="header">
				<view class="title">服务条款及隐私政策</view>
				<image src='../../static/guanbi.png' @click="handleClose"></image>
			</view>
			<view class="content">
				<view>
					在您注册成为神领快递会员的过程中您需要通过点击同意的形式在线签署<text>《神领快递服务条款》</text>、<text>《神领快递隐私政策</text>》请您务必仔细阅读充分理解条款内容后再点击同意尤其是以粗体并下划线标识的条款因为这些条款可能会明确您应履行的义务或对您的权利有所限制。
				</view>
				<view class="tips">
					请您注意：如果您不同意上述服务条款隐私政策或其中任何约定请您停止注册
				</view>
			</view>
			<view class="footer">
				<button class="cancel-btn btn" @click="handleClose">不同意</button>
				<button class="agree-btn btn" open-type="getPhoneNumber"
					@getphonenumber="decryptPhoneNumber">同意</button>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
	} from 'vue';
	// 接口
	import {
		login
	} from '../api/login.js';
	import NavBar from '@/components/Navbar/index.vue'
	import {
		useStore
	} from 'vuex';
	// ------定义变量-----
	const popup = ref();
	const store = useStore(); //vuex获取、储存数据
	const handleOpen = () => {
		popup.value.open()
	}
	// 跳转到首页
	const decryptPhoneNumber = (e) => {
		handleClose()
		
		console.log('fff')
		wx.login({
			success(res) {
				//允许授权
				if (e.detail.errMsg === 'getPhoneNumber:ok' && e.target.errMsg === 'getPhoneNumber:ok') {
					if (!store.state.user.isLoginSuccess) return uni.showToast({
						title: '请勿重复登录',
						duration: 2000,
						icon: 'none'
					});
					store.commit('user/setIsLoginSuccess', false)
					login({
						code: res.code,
						phoneCode: e.detail.code
					}).then((res) => {
						console.log(res,'----------------')
						//将token存到缓存中，后续在统一请求头上加上token（短令牌）
						uni.setStorageSync('token', res.data.accessToken);
						//长令牌
						uni.setStorageSync('refreshToken', res.data.refreshToken);
						//登录成功后跳转到首页
						uni.switchTab({
							url: '/pages/index/index'
						});
						store.commit('user/setIsLoginSuccess', true)
					}).catch((err) => {
						console.log(err,'==================')
						uni.showToast({
							title: '网络异常',
							duration: 2000,
							icon: 'none'
						});
						store.commit('user/setIsLoginSuccess', true)
					})
				} else {
					console.log(err,'++++++++++++')
					uni.redirectTo({
						url: '/pages/login/index'
					});
				}

			},
		})
	}

	const handleClose = () => {
		popup.value.close()
	}
</script>
<style src="./index.scss" lang="scss" scoped></style>
