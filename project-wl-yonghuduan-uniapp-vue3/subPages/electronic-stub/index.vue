<template>
	<!-- 头部导航栏 -->
	<nav-bar title='电子存根'></nav-bar>
	<view class="electronic-stub">
		<view class="content">
			<view class="code-box">
				<image class="code-url" :src="orderInfo.barCode" />
				<view class="order-num">{{orderInfo.transportOrderId}}</view>
			</view>
			<!-- 运单地点信息 -->
			<view class="address-box">
				<view class="left">
					<view class="send">寄</view>
					<view class="line"></view>
					<view class="get">收</view>
				</view>
				<view class="right">
					<view class="send-people">
						<view class="send-title">
							<view class="send-sub-title">
								{{orderInfo.senderName}}
								<text class="user-phone">{{sendIsOpen?orderInfo.senderPhone:orderInfo.senderPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}}</text>
								<image :src="sendIsOpen?'../../static/zhengkai.png':'../../static/biyan.png'" @click="sendClick"></image>
							</view>
							<view class="send-desc">{{orderInfo.senderAddress}}</view>
						</view>
					</view>
					<view class="line"></view>
					<view class="get-people">
						<view class="send-title">
							<view class="send-sub-title">
								{{orderInfo.receiverName}}
								<text class="user-phone">{{getIsOpen?orderInfo.receiverPhone:orderInfo.receiverPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}}</text>
								<image :src="getIsOpen?'../../static/zhengkai.png':'../../static/biyan.png'" @click="getClick"></image>
							</view>
							<view class="send-desc">{{orderInfo.receiverAddress}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 运单详情 -->
			<view class="order-info">
				<view class="order-item">
					<view class="label">物品</view>
					<view class="value">{{orderInfo.goods}}</view>
				</view>
				<view class="order-item">
					<view class="label">计费重量</view>
					<view class="value">{{orderInfo.goodsWeight}}kg</view>
				</view>
				<view class="order-item">
					<view class="label">数量</view>
					<view class="value">1</view>
				</view>
				<view class="order-item">
					<view class="label">付费方式</view>
					<view class="value">{{orderInfo.paymentMethod}}</view>
				</view>
				<view class="order-item">
					<view class="label">基础运费</view>
					<view class="value">{{orderInfo.amount}}元</view>
				</view>
				<view class="order-item">
					<view class="label">下单时间</view>
					<view class="value">{{orderInfo.createTime}}</view>
				</view>
				<view class="order-item">
					<view class="label">运单号</view>
					<view class="value">{{orderInfo.transportOrderId}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		doOrder,
		getOrderDetail
	} from '@/pages/api/order.js'
	import {
		onLoad
	} from '@dcloudio/uni-app';
	let orderId = ref()
	let orderInfo = reactive({
		estimatedArrivalTime: '',
		receiverName: '',
		receiverAddress: '',
		receiverProvince: '',
		receiverPhone: '',
		senderName: '',
		senderAddress: '',
		senderProvince: '',
		senderPhone: '',
		goods: '',
		goodsWeight: '',
		paymentMethod: '',
		amount: '',
		barCode: '',
		transportOrderId: ''
	})
	let sendIsOpen = ref(false)
	let getIsOpen = ref(false)
	onLoad((options) => {
		orderId.value = options.orderId
		getOrderDetailFunc()
	})
	const getClick = ()=>{
		getIsOpen.value = !getIsOpen.value
	}
	const sendClick = ()=>{
		sendIsOpen.value = !sendIsOpen.value
	}
	//获取订单详情
	const getOrderDetailFunc = () => {
		getOrderDetail(orderId.value).then((res) => {
			const {
				estimatedArrivalTime,
				receiverName,
				senderName,
				receiverProvince,
				receiverCity,
				receiverCounty,
				receiverAddress,
				senderProvince,
				senderCity,
				senderCounty,
				senderAddress,
				orderCargoVOS,
				paymentMethod,
				amount,
				senderPhone,
				receiverPhone,
				createTime,
				barCode,
				transportOrderId
			} = res.data
			orderInfo.estimatedArrivalTime = estimatedArrivalTime
			orderInfo.receiverName = receiverName
			orderInfo.senderName = senderName
			orderInfo.receiverAddress = receiverProvince.name + receiverCity.name + receiverCounty.name +
				receiverAddress
			orderInfo.senderAddress = senderProvince.name + senderCity.name + senderCounty.name + senderAddress
			orderInfo.goods = orderCargoVOS[0].name + (orderCargoVOS[0].goodsType ? ('(' + orderCargoVOS[0]
				.goodsType.name + ')') : '')
			orderInfo.goodsWeight = orderCargoVOS[0].totalWeight
			orderInfo.paymentMethod = paymentMethod === 1 ? '寄付' : '到付'
			orderInfo.amount = amount
			orderInfo.receiverPhone = receiverPhone
			orderInfo.senderPhone = senderPhone
			orderInfo.receiverProvince = receiverProvince.name
			orderInfo.senderProvince = senderProvince.name
			orderInfo.createTime = createTime
			orderInfo.barCode = barCode
			orderInfo.transportOrderId = transportOrderId
		})
	}
</script>

<style src="./index.scss" lang="scss" scoped></style>
