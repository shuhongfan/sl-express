<template>
	<!-- 头部导航栏 -->
	<image class="goBack" :src='src' @click="handleTo" :style="{'top':capsuleTop+9+'px'}"></image>
	<view class="authentication-success">
		<image src='../../static/shiming-success.png'></image>
		<view class="tips">本人寄件时仅需出示有效身份证件共查阅确认即可，无需再次采集</view>
		<view class="info">
			<image src='../../static/shiming-success-bg.png' class="bg"></image>
			<view class="info-top">
				<view class="info-person">
					<image class="headUrl" src='../../static/head.png'></image>
					<view class="info-box">
						<view class="name">{{name}}</view>
						<view class="identify-num">{{idCard}}</view>
					</view>
				</view>
				<image src='../../static/shiming-success-img.png' class="success"></image>
			</view>
			<view class="info-title">
				<image src='../../static/anquan.png'></image>
				<view>神领速运保障您的信息安全</view>
			</view>
		</view>
		<view class="btn" @click="handleDelete">删除认证信息</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" cancelColor="red" cancelText="取消" confirmText="确定" title="确定删除实名信息吗？" content="删除后，寄件时需出示身份证件供
快递员重新采集身份信息" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
	} from 'vue';
	import {getRealNameStatusApi} from '@/pages/api/my.js'
	import {
		onLoad,
	} from '@dcloudio/uni-app';
	let src = ref('../../static/idcard-goback.png')
	let idCard = ref('')
	let name = ref('')
	let alertDialog = ref('')
	//胶囊顶部距离头部的距离
	let capsuleTop = ref()
	onLoad((options)=>{
		idCard.value = options.idCard || ''
		name.value = options.name
		uni.getSystemInfo({
			success: (res) => {
				capsuleTop.value = uni.getMenuButtonBoundingClientRect().top
			}
		})
	})
	const handleTo = ()=>{
		uni.navigateBack()
	}
	const handleDelete = () => {
		alertDialog.value.open()
	}
	const dialogConfirm =()=>{
		getRealNameStatusApi({
			flag:0
		}).then((res)=>{
			if (res.code !== 200) {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 1000
				})
			} else {
				uni.showToast({
					title: '删除成功',
					icon: 'none',
					duration: 1000,
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/my/index'
					})
				}, 2000)
			
			}
		})
		.catch(()=>{
			uni.showToast({
				title: '网络异常',
				duration: 2000,
				icon: 'none'
			});
		})
	}
	const dialogClose = ()=>{
		alertDialog.value.close()
	}
</script>

<style src="./index.scss" lang="scss" scoped></style>
