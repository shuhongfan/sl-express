<template>
	<view class="orderList" :style="{'paddingTop':capsuleBottom +'px'}">
		<view v-if="!isLogin" class="notLogin">
			<view class="toLogin-btn" @click="toLogin">登录/注册</view>
			<view class="tips">登录后可查看快递信息</view>
		</view>

		<view v-else>
			<view v-if="!allOrderList.data.length && isLogin" class="empty-data">
				<image src="../../../static/emptyData.png"></image>
				<view class="tips">{{serchValue?'没有搜索到相关条件的运单':'暂无数据'}}</view>
			</view>
			<scroll-view v-else class="scrollView" scroll-y lower-threshold="30" @scrolltolower="LoadMoreCustomers">
				<view class="order-item" v-for="(item,index) in allOrderList.data" :key="index"
					@click='handleToOrderInfo(event,item.id,item.transportOrderId)'>
					<view class="orderNumber">
						{{[23000,22000,230011].includes(item.status)?'订':'运'}}单号：{{[23000,22000,230011].includes(item.status)?item.id:item.transportOrderId}}
						<image src="../../../static/pickUp-copy.png" class="copy"
							@click.stop="handleCopy([23000,22000,230011].includes(item.status)?item.id:item.transportOrderId)">
						</image>
					</view>

					<view class="area-to-area">
						<view class="sendBox">
							<view class="sendArea">{{item.senderCity.name}}</view>
							<view class="sendName">{{item.senderName}}</view>
						</view>
						<view class="order-status">
							<view class="status">
								{{showOrderStatus(item.status)}}
							</view>
							<view class="arrow" :class="
								  [[21000,23000,23001,23005,23008].includes(item.status)?'green-arrow':'',
							      [23009,23010].includes(item.status)?'red-arrow':'',
								  [230011,22000].includes(item.status)?'gray-arrow':'']
							"></view>
						</view>
						<view class="getBox">
							<view class="getArea">{{item.receiverCity.name}}</view>
							<view class="getName">{{item.receiverName}}</view>

						</view>

					</view>
					<view class="order-detail">
						<!-- 已取件运输信息 -->
						<view v-if="item.status ===23001 && item.transportOrderPointVOS" class="detail-item">
							<text>已取件：</text>{{ item.transportOrderPointVOS.length>0?item.transportOrderPointVOS[item.transportOrderPointVOS.length-1].info:''}}
						</view>
						<!-- 运输中信息 -->
						<view v-if="[23005,23008].includes(item.status) && item.transportOrderPointVOS"
							class="detail-item">
							<text>运送中：</text>{{item.transportOrderPointVOS.length>0?item.transportOrderPointVOS[item.transportOrderPointVOS.length-1].info:''}}
						</view>
						<!-- 已签收 -->
						<view v-if="item.status ===23009 && item.transportOrderPointVOS" class="detail-item">
							<text>已签收：</text>{{item.transportOrderPointVOS.length>0?item.transportOrderPointVOS[item.transportOrderPointVOS.length-1].info:''}}
						</view>
						<!-- 已拒收 -->
						<view v-if="item.status ===23010 && item.transportOrderPointVOS" class="detail-item">
							<text>已拒收：</text>{{item.transportOrderPointVOS.length>0?item.transportOrderPointVOS[item.transportOrderPointVOS.length-1].info:''}}
						</view>
						<!-- 预计上门时间 -->
						<view v-if="item.status ===23000 " class="detail-item">
							<text>预计上门时间：</text>{{item.estimatedStartTime}}
						</view>
						<!-- 取消时间 -->
						<view v-if="item.status ===230011 " class="detail-item"><text>取消时间：</text>{{item.updated}}
						</view>
						<!-- 预计送达时间 -->
						<view v-if="[23001,23005,23008,23010].includes(item.status) " class="detail-item">
							<text>预计送达时间：</text>{{item.estimatedArrivalTime}}
						</view>
						<!-- 已关闭时间 -->
						<view v-if="item.status ===22000 " class="detail-item"><text>关闭时间：</text>{{item.updated}}</view>
						<!-- 签收时间 -->
						<view v-if="item.status ===23009 " class="detail-item"><text>签收时间：</text>{{item.updated}}</view>
					</view>
					<!-- 功能按钮区域 -->
					<view class="btn-box">
						<view class="btn-list" @click.stop="handleSecondQi">
							<view class="btn" v-if="[23000,23001,23005,23008,23010].includes(item.status)">分享</view>
							<view class="btn" v-if='item.status===23000' @click.stop="handleOrderCancel(item.id)">取消寄件
							</view>
							<view class="btn" v-if="[22000,230011,23009].includes(item.status)"
								@click.stop="handleOrderDelete(item.id)">删除</view>
						</view>
					</view>
					<view class="paymentStatus"
						v-if="item.paymentStatus && [23001,23005,23008,23009,23010].includes(item.status)">
						<image
							:src="item.paymentStatus===1?'../../../static/daizhifu.png':'../../../static/yizhifu.png'">
						</image>
					</view>
				</view>
				<!-- 加载底部 -->
				<uni-load-more :status="status" v-if="!isShowMore && isLogin && allOrderList.data.length" />
			</scroll-view>
		</view>

		<!-- 删除确认对话框 -->
		<uni-popup ref="popup" type="dialog" class='address-popup'>
			<uni-popup-dialog mode="base" :content="'确定是否删除此条订单？'" :animation='false' :before-close="true"
				@close="close" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>

	</view>

</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
	} from 'vue';
	import {
		getOrderList,
		deleteOrder
	} from '@/pages/api/order.js'
	import {
		onLoad,
		onShow,
	} from '@dcloudio/uni-app';
	import {
		handleSecondQi
	} from '@/utils/index.js'
	import {
		useStore
	} from 'vuex';
	// 获取父组件数据
	const props = defineProps({
		serchValue: {
			type: String
		}
	})
	const store = useStore(); //vuex获取、储存数据
	const users = store.state.user
	const emits = defineEmits(["@stopRefresh"]);
	let pageInfo = reactive({
		page: 1,
		pageSize: 10,
		mailType: 1
	})
	let status = ref('more') //加载状态     
	let isShowMore = ref(false) //是否显示更多
	let allOrderList = reactive({
		data: []
	})
	let orderId = ref()
	let isLogin = ref('')
	let popup = ref(null)
	//胶囊底部距离头部的距离
	let capsuleBottom = ref()
	// let height = ref('570rpx')
	//关闭删除确认提示框
	const close = () => {
		popup.value.close()
		orderId.value = ''
	}
	onLoad(() => {
		uni.getSystemInfo({
			success: (res) => {
				capsuleBottom.value = uni.getMenuButtonBoundingClientRect().bottom + 52
			}
		})
	})
	onShow(() => {
		isLogin.value = uni.getStorageSync('token')
		allOrderList.data = users.indexList
	})
	onMounted(() => {
		getOrderListFunc()
	})
	//复制
	const handleCopy = (value) => {
		uni.setClipboardData({
			data: value,
			showToast: false,
			success: () => {
				uni.hideToast(); // 隐藏弹出提示
				uni.hideKeyboard(); //  隐藏软键盘
				uni.showToast({
					title: '复制成功',
					icon: 'success',
					duration: 1000
				})

			}
		});
	}
	//确认删除订单
	const confirm = () => {
		popup.value.close()
		deleteOrder(orderId.value).then((res) => {
			pageInfo.page = 1
			pageInfo.pageSize = 10
			getOrderListFunc()
			uni.showToast({
				title: '删除成功',
				icon: 'success',
				duration: 1000
			})
		}).catch((err) => {
			uni.showToast({
				title: '网络异常',
				duration: 2000,
				icon: 'none'
			});
		})
	}
	//删除订单
	const handleOrderDelete = (id) => {
		orderId.value = id
		popup.value.open()
	}
	//跳转到取消订单页面
	const handleOrderCancel = (id) => {
		uni.navigateTo({
			url: '/subPages/order-cancel/index?orderId=' + id
		})
	}
	const toLogin = () => {
		uni.navigateTo({
			url: '/pages/login/index'
		})
	}
	const getOrderListFunc = (flag) => {
		status.value = 'loading'
		getOrderList(pageInfo).then((res) => {
			console.log(res, '接受到了resovle')
			if (res.data) {
				console.log(res.data.items && res.data.items.length, 'res.data.items && res.data.items.length')
				status.value = (res.data.items && res.data.items.length) < 10 ? 'no-more' : 'more'
				if (flag === 'topPull') {
					allOrderList.data = allOrderList.data.concat(res.data.items ? res.data.items : [])
				} else {
					allOrderList.data = res.data.items ? res.data.items : []
				}
			}
			store.commit('user/setIndexList', allOrderList.data)
			emits('stopRefresh')
		})
	}

	//根据状态去显示对应的运单状态文案
	const showOrderStatus = (status) => {
		switch (status) {
			case 21000:
				return '待支付';
			case 23000:
				return '待取件';
			case 230011:
				return '已取消';
			case 23001:
				return '已取件';
			case 23005:
				return '运送中';
			case 22000:
				return '已关闭';
			case 23008:
				return '派送中';
			case 23009:
				return '已签收';
			case 23010:
				return '已拒收';
		}
	}
	//跳转到订单详情页面
	const handleToOrderInfo = (event, id, transportOrderId) => {
		uni.navigateTo({
			url: '/subPages/order-info/index?orderId=' + id + '&transportOrderId=' + transportOrderId
		});
		store.commit('user/setIsToOrderInfo', true)
	}

	//下拉加载更多
	const LoadMoreCustomers = () => {
		if (status.value === 'no-more') {
			return
		}
		pageInfo.page = pageInfo.page + 1
		getOrderListFunc('topPull')
	}
	//
	const indexGetOrderListFunc = (params) => {
		pageInfo.page = 1
		pageInfo = Object.assign({}, pageInfo, params)
		getOrderListFunc()
	}
	// 暴漏给父组件
	defineExpose({
		indexGetOrderListFunc,
		LoadMoreCustomers
	});
</script>

<style src="./orderList.scss" lang="scss" scoped></style>
