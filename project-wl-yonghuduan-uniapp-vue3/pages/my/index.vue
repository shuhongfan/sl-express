<!-- 我的页面 -->
<template>
	<view class="my">
		<!-- banner图 -->
		<view class="banner">
			<!-- 头像用户名 -->
			<view class="headBox" @click="toLogin">
				<image :src="avatarUrl" />
				<view class="userName">{{nickName}}</view>
			</view>
		</view>
		<!-- 地址簿，实名认证，专属快递员 -->
		<view class="list-top">
			<view class="list-item" @click="handleToAddress">
				<view class="left">
					<image class="icon" src='../../static/my-address.png' />
					<view class="label">地址簿</view>
				</view>

				<image class="arrow" src='../../static/icon15.png' />
			</view>
			<view class="list-item" @click="handleTorealName">
				<view class="left">
					<image class="icon" src='../../static/my-name.png' />
					<view class="label">实名认证</view>
				</view>

				<image class="arrow" src='../../static/icon15.png' />
			</view>
			<view class="list-item" @click="handleSecondQi">
				<view class="left">
					<image class="icon" src='../../static/my-send.png' />
					<view class="label">专属快递员</view>
				</view>

				<image class="arrow" src='../../static/icon15.png' />
			</view>
		</view>

		<view class="list-bottom" v-if="token">
			<picker mode="selector" @change="changeSex" :value="sex" :range="sexList">
				<view class="list-item sex">
					<view class="label">性别</view>
					<view class="item-value">{{sex?'男':'女'}}</view>
					<image class="arrow" src='../../static/icon15.png' />
				</view>
			</picker>
			<view class="line"></view>
			<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="getDateChange">
				<view class="list-item">
					<view class="label">生日</view>
					<view class="item-value">{{birthday}}</view>
					<image class="arrow" src='../../static/icon15.png' />
				</view>
			</picker>
		</view>

		<view class="logout" @click="handleLogout" v-if="token">退出登录</view>
	</view>
	<!-- end -->
</template>

<script setup>
	import {
		ref,
		reactive,
	} from 'vue';
	import {
		getUserInfo,
		updateUserInfo
	} from '@/pages/api/my.js';
	import {
		onShow,
	} from '@dcloudio/uni-app';
	import {
		handleSecondQi
	} from '@/utils/index.js'
	const token = ref()
	const sexList = reactive(['女', '男'])
	let nickName = ref('')
	let avatarUrl = ref('')
	let startDate = ref()
	let endDate = ref()
	let idCard = ref('')
	let name = ref('')
	let sex = ref(1)
	let birthday = ref('1995-09-01')
	const isRealNameAuth = ref(false)
	onShow(() => {
		startDate.value = getDate('start')
		endDate.value = getDate('end')
		nickName.value = uni.getStorageSync('nickName') || '神领用户'
		avatarUrl.value = uni.getStorageSync('avatarUrl') || '../../static/defaultHeadImg.png'
		token.value = uni.getStorageSync('token')
		baseUserInfo()
	})
	//退出登录
	const handleLogout = () => {
		uni.removeStorageSync('token');
		uni.removeStorageSync('nickName');
		uni.removeStorageSync('avatarUrl');
		uni.switchTab({
			url: '/pages/index/index'
		});
	}
	const baseUserInfo = () => {
		getUserInfo().then((res) => {
			if (res) {
				isRealNameAuth.value = Boolean(res.data.idCardNoVerify)
				idCard.value = res.data.idCardNo || ''
				name.value = res.data.name
				sex.value = res.data.sex
				birthday.value = res.data.birthday
				nickName.value = res.data.phone
				uni.setStorageSync('nickName', res.data.phone);
			}

		})
	}
	const getDate = (type) => {
		const date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate()
		if (type === "start") {
			year = year - 60
		} else {
			year = year + 2
		}
		month = month > 9 ? month : "0" + month
		day = day > 9 ? day : '0' + day
		return `${year}-${month}-${day}`

	}
	const toLogin = () => {
		if (uni.getStorageSync('token')) {
			getUserInfoFunc()
		} else {
			uni.navigateTo({
				url: '/pages/login/index'
			});
		}
	}
	//跳转到地址簿
	const handleToAddress = () => {
		uni.navigateTo({
			url: uni.getStorageSync('token') ? '/pages/address/index?type=address&isFromAddress=true' :
				'/pages/login/index'
		});
	}
	//跳转到实名认证页面
	const handleTorealName = () => {
		if (!uni.getStorageSync('token')) {
			return uni.navigateTo({
				url: '/pages/login/index'
			});

		}
		if (isRealNameAuth.value) {
			uni.navigateTo({
				url: '/subPages/authentication-success/index?name=' + name.value + '&idCard=' + idCard.value
			});
		} else {
			uni.navigateTo({
				url: '/subPages/realName-authentication/index'
			});
		}
	}

	const getDateChange = (e) => {
		updateUserInfo({
			birthday: e.detail.value
		}).then((res) => {
			baseUserInfo()
		}).catch((err) => {
			uni.showToast({
				title: '网络异常',
				duration: 2000,
				icon: 'none'
			});
		})
	}

	const changeSex = (e) => {
		updateUserInfo({
			sex: Number(e.detail.value)
		}).then((res) => {
			baseUserInfo()
		}).catch((err) => {
			uni.showToast({
				title: '网络异常',
				duration: 2000,
				icon: 'none'
			});
		})
	}
</script>
<style src="./index.scss" lang="scss" scoped></style>
