<template>
	<!-- 头部导航栏 -->
	<nav-bar title='取消订单'></nav-bar>
	<view class="order-cancel">
		<image class="orderCancel-bg" src='../../static/order-cancel-bg.png'></image>
		<view class="cancel">
			<view class="customerBox">
				<view class="title">客户相关</view>
				<view class="reason-item" v-for='(item,index) in customerReason' :key="index"
					@click="checkbox(item.value)">
					<view class="checkRadio">
						<radio style="transform:scale(0.8)" color="#E44232" :value="String(item.value)"
							:checked="item.value === defaultReason" />
					</view>
					<view class="label">{{item.label}}</view>
				</view>
			</view>

			<view class="senderBox">
				<view class="title">快递员/服务相关</view>
				<view class="reason-item" v-for='(item,index) in senderReason' :key="index"
					@click="checkbox(item.value)">
					<view class="checkRadio">
						<radio style="transform:scale(0.8)" color="#E44232" :value="String(item.value)"
							:checked="item.value === defaultReason" />
					</view>
					<view class="label">{{item.label}}</view>
				</view>
			</view>
		</view>

		<view class="footer">
			<view class="cancel-btn" @click="handleNoCancel">暂不取消</view>
			<view class="confirm-btn" @click="handleConfirmCancel">确定取消</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		cancelOrder
	} from '@/pages/api/order.js'
	const orderId = ref()
	let defaultReason = ref(1)
	onLoad((options) => {
		orderId.value = options.orderId
	})
	const customerReason = reactive([{
			value: 1,
			label: '计划有变，不需要寄了'
		},
		{
			value: 2,
			label: '换个时间再寄'
		},
		{
			value: 3,
			label: '去服务点自寄'
		}
	])

	const senderReason = reactive(
		[{
				value: 4,
				label: '送达时间不能达到我的要求'
			},
			{
				value: 5,
				label: '运费太贵了'
			},
			{
				value: 6,
				label: '快递员未及时取件'
			},
			{
				value: 7,
				label: '快递员不上门'
			},
			{
				value: 8,
				label: '快递员服务态度差'
			}
		])
	//确定取消订单
	const handleConfirmCancel = () => {
		cancelOrder(orderId.value).then((res) => {
				uni.showToast({
					title: '取消成功',
					icon: 'none',
					success: () => {

					},
					duration: 2000
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, 2500)
			}

		).catch(()=>{
			uni.showToast({
				title: '网络异常',
				duration: 2000,
				icon: 'none'
			});
		})
	}
	//暂不取消
	const handleNoCancel = () => {
		uni.navigateBack()
	}
	const checkbox = (value) => {
		defaultReason.value = value
	}
</script>

<style src="./index.scss" lang="scss" scoped></style>
