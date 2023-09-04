<template>
	<!-- 头部导航栏 -->
	<nav-bar title='下单成功' :handleToLink="handleToLink" src="../../static/order-success-goBack.png"></nav-bar>
	<view class="order-success">
		<!-- 头部 -->
		<view class="header">
			<view class="title">
				<view class="success-img"></view>
				<text>下单成功！</text>
			</view>
			<view class="send-time">
				<text>快递员上门时间 </text>
				<text v-if="orderInfo.estimatedStartTime">{{handleTimeToStrTime(orderInfo.estimatedStartTime)}}</text>
			</view>
			<view class="tips">根据国家法律规定，如没有实名认证，寄件需出示身份证</view>
		</view>
		<!-- 运单信息 -->
		<view class="orderBox">
			<view class="order-detail">
				<view class="left">
					<view class="send">寄</view>
					<view class="line" :class="{active:twoLine>=2}"></view>
					<view class="get">收</view>
				</view>
				<view class="right">
					<view class="send-people">
						<view class="send-title">
							<view class="send-sub-title">
								{{orderInfo.senderName}}
								<text>{{orderInfo.senderPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}}</text>
							</view>
							<view class="send-desc">{{orderInfo.senderAddress}}</view>
						</view>
					</view>
					<view class="line"></view>
					<view class="get-people">
						<view class="send-title">
							<view class="send-sub-title">
								{{orderInfo.receiverName}}
								<text>{{orderInfo.receiverPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}}</text>
							</view>
							<view class="send-desc">{{orderInfo.receiverAddress}}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="price-detail">
				<view class="goods">
					<view class="label">物品</view>
					<view class="value">{{orderInfo.goods}}</view>
				</view>
				<view class="weight">
					<view class="label">计费重量</view>
					<view class="value">{{orderInfo.goodsWeight}}kg</view>
				</view>
				<view class="payType">
					<view class="label">付费方式</view>
					<view class="value">{{orderInfo.paymentMethod}}</view>
				</view>
				<view class="base-price">
					<view class="label">基础运费</view>
					<view class="value">{{orderInfo.amount}}元</view>
				</view>
			</view>

			<view class="all-account">
				预估总价：
				<text>¥{{orderInfo.amount}}</text>
			</view>
		</view>

		<!-- 功能区域 -->
		<view class="feature">
			<view class="order-info" @click="handleToOrderInfo">
				<view class="img-box">
					<image src='../../static/btn-dingdanxiangqing.png'/>
				</view>
				
				<view class="title">订单详情</view>
			</view>
			<view class="order-share" @click="handleSecondQi">
				<view class="img-box">
					<image src='../../static/btn-fenxiang.png' />
				</view>
				
				<view class="title">分享</view>
			</view>
			<view class="order-again" @click="handleSecondQi">
				<view class="img-box">
					<image src='../../static/btn-zaijiyijian.png'/>
				</view>
				
				<view class="title">再寄一件</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		computed,
		nextTick
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		doOrder,
		getOrderDetail
	} from '@/pages/api/order.js'
	import {
		handleTimeToStrTime
	} from '@/utils/index.js'
	const orderId = ref()
	const twoLine = ref()
	const orderInfo = reactive({
		estimatedStartTime: '',
		receiverName: '',
		receiverAddress: '',
		receiverPhone:'',
		senderName: '',
		senderAddress: '',
		senderPhone:'',
		goods: '',
		goodsWeight: '',
		paymentMethod:'',
		amount:''
	})
	onMounted(()=>{
	

	})
	onLoad((options) => {
		orderId.value = options.orderId
		getOrderDetailFun()
	})
	const handleToLink = ()=>{
		uni.switchTab({
			url: '/pages/index/index'
		});
	}
	//跳转到订单详情页面
	const handleToOrderInfo = (event,id) => {
		uni.navigateTo({
			url: '/subPages/order-info/index?orderId=' + orderId.value
		});
	}
	const handleSecondQi = ()=>{
		uni.showToast({
			title: "程序员哥哥正在实现中",
			icon: "none",
			duration: 1000,
		});
	}
	//获取订单详情
	const getOrderDetailFun = () => {
		getOrderDetail(orderId.value).then((res) => {
			const {
				estimatedStartTime,
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
				receiverPhone
			} = res.data
			orderInfo.estimatedStartTime = estimatedStartTime
			orderInfo.receiverName = receiverName
			orderInfo.senderName = senderName
			orderInfo.receiverAddress = receiverProvince.name + receiverCity.name + receiverCounty.name +
				receiverAddress
			orderInfo.senderAddress = senderProvince.name + senderCity.name + senderCounty.name + senderAddress
			orderInfo.goods = orderCargoVOS[0].name + (orderCargoVOS[0].goodsType ? ('(' + orderCargoVOS[0]
				.goodsType.name + ')') : '')
			orderInfo.goodsWeight = orderCargoVOS[0].totalWeight
			orderInfo.paymentMethod = paymentMethod === 1?'寄付':'到付'
			orderInfo.amount = amount
			orderInfo.receiverPhone = receiverPhone
			orderInfo.senderPhone = senderPhone
			nextTick(()=>{
				//用来获取详细地址有几行，从而适配寄和收之间竖线的高度
				uni.createSelectorQuery().select('.send-desc').boundingClientRect(res => {
				    let height = res.height;
				    let line = height / 15 
					twoLine.value = line
				}).exec();
			})
			
		})
	}
</script>

<style src="./index.scss" lang="scss" scoped></style>
