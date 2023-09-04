<!-- 首页 -->
<template>
		<view class="homePage">
			<!-- banner图 -->
			<image src='../../static/tupian-banner.png' />
			<!-- 功能列表 -->
			<!-- 寄快递和扫码寄 -->
			<view class="feature-top">
				<view class="jikuaidi" @click="toExpressDelivery">
					<image src='../../static/fe-jikuaidi.png' />
					<view class="des">
						<view class="des-title">寄快递</view>
						<view class="des-dec">1小时上门取件</view>
					</view>
				</view>
				<view class="feature-top-line"></view>
				<view class="saomaji" @click="handleSecondQi">
					<image src='../../static/fe-saomaji.png' />
					<view class="des">
						<view class="des-title">扫码寄</view>
						<view class="des-dec">扫二维码下单</view>
					</view>
				</view>
			</view>
			<!-- 批量寄和礼物寄 -->
			<view class="feature-bottom">
				<view class="piliangji" @click="handleSecondQi">
					<image src='../../static/fe-piliangji.png' />
					<view class="des">
						<view class="des-title">批量寄</view>
						<view class="des-dec">便捷寄多个快递</view>
					</view>
				</view>
				<view class="saomaji" @click="handleSecondQi">
					<image src='../../static/fe-liwuji.png' />
					<view class="des">
						<view class="des-title">礼物寄</view>
						<view class="des-dec">保留神秘寄</view>
					</view>
				</view>
			</view>
			<!-- 运单列表 -->
			<OrderList ref='orderListRef' @stopRefresh="stopRefreshFunc"></OrderList>
		</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onShow,
		onPullDownRefresh,
	} from '@dcloudio/uni-app';
	import {
		handleSecondQi
	} from '@/utils/index.js'
	//运单列表
	import OrderList from './components/orderList';
	import {
		useStore
	} from 'vuex';
	const store = useStore(); //vuex获取、储存数据
	const users = store.state.user
	let orderListRef = ref()
	// ------定义变量------
	onShow(() => {
		// if (users.isToOrderInfo) {
		// 	store.commit('user/setIsToOrderInfo', false)
		// } else {
		// 	orderListRef.value && orderListRef.value.indexGetOrderListFunc()
		// }
		orderListRef.value && orderListRef.value.indexGetOrderListFunc()
	})
	// ------生命周期------
	onPullDownRefresh(() => {
		orderListRef.value.indexGetOrderListFunc()
	});
	//
	const stopRefreshFunc = () => {
		uni.stopPullDownRefresh();
	}
	//跳转到寄快递页面
	const toExpressDelivery = () => {
		uni.navigateTo({
			url: uni.getStorageSync('token') ? '/pages/express-delivery/index' : '/pages/login/index'
		});
	}

</script>
<style src="./index.scss" lang="scss" scoped></style>
