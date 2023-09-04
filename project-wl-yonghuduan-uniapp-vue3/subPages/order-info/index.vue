<template>
	<view class="order-box">
		<!-- 头部导航栏 -->
		<nav-bar title='订单详情'></nav-bar>
		<view class="map-box" v-if="[23001,23005,23008,23009,23010].includes(orderStatus)">
			<!-- include-points在微信开发者工具无法正常显示，在真机可以 -->
			<map :include-points="covers.data.filter(item=>item.latitude)" scale="6"
				style="width: 100%; height: 780rpx;" :polyline="polyline.data" :markers="covers.data">
				<cover-view slot="callout">
					<block v-for="(item,index) in covers.data" :key="index">
						<cover-view v-if="[1,2].includes(item.id)" class="customCallout" :marker-id="item.id">
							<cover-view class="content">
								{{item.title}}
							</cover-view>
							<cover-view class="areaContent">
								{{item.areaName}}
							</cover-view>
						</cover-view>
						<cover-view v-else-if="[3].includes(item.id)" class="customCallout" :marker-id="item.id">
							<cover-view class="courier">
								快递员上门中
							</cover-view>
						</cover-view>
					</block>

				</cover-view>
			</map>
		</view>

		<view class="order-info" v-if="netStatus">
			<view class="order-header">
				<view class="header-bg">
					<view class="order-num">
						{{[23000,22000,230011].includes(orderStatus)?'订':'运'}}单号：{{[23000,22000,230011].includes(orderStatus)?orderInfo.id:orderInfo.transportOrderId}}
						<image src="../../../static/orderInfo-copy.png" class="copy"
							@click.stop="handleCopy([23000,22000,230011].includes(orderStatus)?orderInfo.id:orderInfo.transportOrderId)">
						</image>
					</view>
					<view class="toElectronicStub" @click="handleToElectronicStub"
						v-if="[23001,23005,23008,23009,23010].includes(orderStatus)">
						电子存根
						<uni-icons type="right" size="15" color="white"></uni-icons>
					</view>
				</view>
				<view class="order-status">
					<view class="status">
						<view class="status-label">
							{{showOrderStatus(orderStatus)}}
						</view>
						<view class="status-tips">
							<view class="time" v-if="[230011,22000,23009,23010].includes(orderStatus)">
								{{
									(orderStatus===230011?'取消':orderStatus===22000?'关闭':orderStatus===23009?'签收':'拒签')
								}}时间:
								{{handleTimeToStrTime(orderInfo.updated) }}
							</view>
							<view class="timeing" v-else>
								{{orderInfo.estimatedStartTime?
									orderStatus === 23000?
										'预计'+handleTimeToStrTime(orderInfo.estimatedStartTime)+'前上门'
									:'预计'+handleTimeToStrTime(orderInfo.estimatedArrivalTime)+'前送达'
								:''}}
							</view>
						</view>
					</view>
					<view class="line"></view>
					<view class="area">
						<view class="start-area">
							{{orderInfo.senderProvince}}
						</view>
						<view class="arrow" :class="
							  [[21000,23000,23001,23005,23008].includes(orderStatus)?'green-arrow':'',
						      [23009,23010].includes(orderStatus)?'red-arrow':'',
							  [230011,22000].includes(orderStatus)?'gray-arrow':'']
						"></view>
						<view class="end-area">
							{{orderInfo.receiverProvince}}
						</view>
					</view>
				</view>
			</view>
			<!-- 物流信息 -->
			<view class="logistics-info">
				<!-- 待取件，已取消，已关闭物流信息展示 -->
				<view class="only-orderInfo" v-if='[23000,230011,22000].includes(orderStatus)' :style="scrollHeight">
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
				</view>
				<!-- 已取件，运送中，派送中，已签收，已拒收物流信息展示 -->
				<scroll-view scroll-y :style="scrollHeight" v-else>
					<view class="logistics-orderInfo">
						<view class="logistics-orderInfo-item" :class="[index===0?'active':'']" :key="index"
							v-for='(item,index) in logisticsInfo.data'>
							<view class="logistics-orderInfo-left">
								<view class="circle gray" v-if="['已拒收','已签收','已取件'].includes(item.status)">
									{{item.status==='已拒收'?'拒':item.status==='已签收'?'签':'取'}}
								</view>

								<view class="circle gray"
									v-else-if="index ===0 &&['运送中','派送中'].includes(item.status) || index>0 && logisticsInfo.data[index-1].status !=='运送中'">
									<image
										:src="item.status==='派送中'?'../../static/paisong.png':'../../static/yunshuzhong.png'">
									</image>
								</view>

								<view class="point" v-else-if="index>0 && logisticsInfo.data[index-1].status==='运送中'">
								</view>

								<view class="line" v-if='!(index === logisticsInfo.data.length - 1)'
									:class="item.status==='运送中'?'short':''"></view>
							</view>
							<view class="logistics-orderInfo-right">
								<view class="status"
									v-if='!(index>0 && logisticsInfo.data[index-1].status==="运送中" &&item.status==="运送中")'>
									{{item.status}}
								</view>
								<view class="time">{{item.created}}</view>
								<view class="desc" :class="index === 0 || item.status === 23010?'active':''"
									v-html="strInit(item.info)">
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

			</view>
			<view class="BtnFooter" v-if="[23000].includes(orderStatus)">
				<view class="waiting-box" v-if='orderStatus === 23000'>
					<view class="cancel-order-btn btn" @click="handleOrderCancel">取消订单</view>
					<view class="share-btn btn" @click="handleSecondQi">分享</view>
				</view>
				<!-- <view class="pay-box" v-if='[23001,23008].includes(orderStatus)'>
					<view class="pay-btn btn" @click="handlePay">
						支付运费：{{orderInfo.amount}}
					</view>
				</view> -->
			</view>
		</view>
		<!-- 断网显示的页面 -->
		<net-fail v-else :handleToRefresh="handleToRefresh"></net-fail>
	</view>

</template>

<script setup>
	import {
		ref,
		reactive,
		nextTick
	} from 'vue';
	import {
		getOrderDetail,
		payOrder,
		getOrderLine
	} from '@/pages/api/order.js'
	import {
		onLoad,
	} from '@dcloudio/uni-app';
	import {
		handleSecondQi,
		handleTimeToStrTime
	} from '@/utils/index.js'
	import {
		useStore
	} from 'vuex';
	const twoLine = ref()
	let scrollHeight = ref('')
	const store = useStore(); //vuex获取、储存数据
	const orderStatus = ref()
	const orderId = ref()
	const orderInfo = reactive({
		estimatedStartTime: '',
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
		transportOrderId: '',
		id: ''
	})
	const netStatus = ref(true)
	let transportOrderId = ref('') //运单号
	let haveDriveredLine = reactive([]) //已经走过的路线
	let notHaveDriveredLine = reactive([]) //未走过的路线
	let points = reactive([])
	let carLocation = reactive({
		data: {
			lng: '',
			lat: ''
		}
	})
	let polyline = reactive({
		data: []
	})
	//地图上的标记点
	let covers = reactive({
		data: []
	})

	onLoad((options) => {
		orderId.value = options.orderId
		transportOrderId.value = options.transportOrderId
		getOrderDetailFunc(options.transportOrderId)
		uni.getSystemInfo({
			success: (res) => {
				scrollHeight.value = 'height:' + (res.screenHeight - 290) + 'px'
			}
		})
	})
	//获取订单轨迹
	const getOrderLineFunc = () => {
		getOrderLine(transportOrderId.value).then((res) => {
			if (res.data.lastPoint) {
				carLocation.data = {
					longitude: res.data.lastPoint.lng,
					latitude: res.data.lastPoint.lat
				}
			}

			points = res.data.pointList.map((item) => {
				return {
					longitude: item.lng,
					latitude: item.lat
				}
			})
			if (res.data.status === 1) {
				// 没有上报的坐标点，规划路线均为虚线
				notHaveDriveredLine = points
				polyline.data = [{
					points: points,
					color: "#000000",
					width: 5,
					dottedLine: true
				}]
				covers.data = [
					//起始
					{
						id: 2,
						latitude: points[0].latitude,
						longitude: points[0].longitude,
						iconPath: '../../static/startPoint.png',
						height: 18,
						width: 18,
						customCallout: {
							anchorY: 0,
							anchorX: 0,
							display: "ALWAYS"
						},
						title: '始发地',
						areaName: orderInfo.senderProvince
					},
					//终点
					{
						id: 1,
						latitude: points[points.length - 1].latitude,
						longitude: points[points.length - 1].longitude,
						iconPath: '../../static/endPoint.png',
						height: 18,
						width: 18,
						customCallout: {
							anchorY: 0,
							anchorX: 0,
							display: "ALWAYS"
						},
						title: '目的地',
						areaName: orderInfo.receiverProvince
					},
				]
			} else if (res.data.status === 2) {
				// 有上报的坐标点，并且是在运输状态,显示小车
				findPoint()
				covers.data = [
					//起始
					{
						id: 2,
						latitude: points[0].latitude,
						longitude: points[0].longitude,
						iconPath: '../../static/startPoint.png',
						height: 18,
						width: 18,
						customCallout: {
							anchorY: 0,
							anchorX: 0,
							display: "ALWAYS"
						},
						title: '始发地',
						areaName: orderInfo.senderProvince
					},
					//终点
					{
						id: 1,
						latitude: points[points.length - 1].latitude,
						longitude: points[points.length - 1].longitude,
						iconPath: '../../static/endPoint.png',
						height: 18,
						width: 18,
						customCallout: {
							anchorY: 0,
							anchorX: 0,
							display: "ALWAYS"
						},
						title: '目的地',
						areaName: orderInfo.receiverProvince
					},
					//小车
					{
						id: 4,
						latitude: res.data.lastPoint ? res.data.lastPoint.lat : '',
						longitude: res.data.lastPoint ? res.data.lastPoint.lng : '',
						iconPath: '../../static/carPoint.png',
						height: 40,
						width: 40,
					}
				]
			} else if (res.data.status === 3) {
				// 有上报的坐标点，并且是在派件状态,显示快递员
				findPoint()
				covers.data = [
					//终点
					{
						id: 1,
						latitude: points[points.length - 1].latitude,
						longitude: points[points.length - 1].longitude,
						iconPath: '../../static/endPoint.png',
						height: 18,
						width: 18,
						customCallout: {
							anchorY: 0,
							anchorX: 0,
							display: "ALWAYS"
						},
						title: '目的地',
						areaName: orderInfo.receiverProvince
					},
					//快递员
					{
						id: 3,
						latitude: res.data.lastPoint ? res.data.lastPoint.lat : '',
						longitude: res.data.lastPoint ? res.data.lastPoint.lng : '',
						iconPath: '../../static/courierPoint.png',
						height: 40,
						width: 40,
						customCallout: {
							anchorY: 0,
							anchorX: 0,
							display: "ALWAYS"
						},
					}
				]
			} else {
				// 整个流程结束，规划路线均为实线
				haveDriveredLine = points
				polyline.data = [{
					points: points,
					color: "#E25433",
					width: 5,
				}]
				covers.data = [
					//起始
					{
						id: 2,
						latitude: points[0].latitude,
						longitude: points[0].longitude,
						iconPath: '../../static/startPoint.png',
						height: 18,
						width: 18,
						customCallout: {
							anchorY: 0,
							anchorX: 0,
							display: "ALWAYS"
						},
						title: '始发地',
						areaName: orderInfo.senderProvince
					},
					//终点
					{
						id: 1,
						latitude: points[points.length - 1].latitude,
						longitude: points[points.length - 1].longitude,
						iconPath: '../../static/endPoint.png',
						height: 18,
						width: 18,
						customCallout: {
							anchorY: 0,
							anchorX: 0,
							display: "ALWAYS"
						},
						title: '目的地',
						areaName: orderInfo.receiverProvince
					},
				]
			}
		})
	}

	// 根据一个坐标点找出数组中离该坐标点最近的点
	const findPoint = () => {
		const distanceList = []
		let pointIndex = null
		points.map((item) => {
			distanceList.push(GetDistance(item.latitude, item.longitude, carLocation.data.latitude, carLocation
				.data
				.longitude))
		})
		const minNum = Math.min(...distanceList)
		pointIndex = distanceList.indexOf(minNum)
		haveDriveredLine = [{
			points: points.slice(0, pointIndex),
			color: "#E25433",
			width: 5,
		}]
		notHaveDriveredLine = [{
			points: points.slice(pointIndex, points.length - 1),
			color: "#000",
			width: 5,
			dottedLine: true
		}]
		polyline.data = [haveDriveredLine[0], notHaveDriveredLine[0]]
	}

	// 计算两个坐标点之间的距离
	const GetDistance = (lat1, lng1, lat2, lng2) => {
		var radLat1 = lat1 * Math.PI / 180.0
		var radLat2 = lat2 * Math.PI / 180.0
		var a = radLat1 - radLat2
		var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
			Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
		s = s * 6378.137 // EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000
		return s
	}

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
	const handleToRefresh = () => {
		getOrderDetailFunc()
	}
	//跳转到取消订单页面
	const handleOrderCancel = () => {
		uni.navigateTo({
			url: '/subPages/order-cancel/index?orderId=' + orderId.value
		})
	}
	//将后端传来的字符串中的数字变为红色
	const strInit = (value) => {
		let strText = value
		let replaceText = []
		for (let i = 0; i <= 10; i++) {
			replaceText.push('' + i)
		}
		// 转换成html形式解析
		for (let i = 0; i < replaceText.length; i++) {
			var replaceString = '<span style="color: red;">' + replaceText[i] + "</span>"
			strText = strText.replace(RegExp(replaceText[i], 'g'), replaceString)
		}
		// 这里再把这个红色替换成你想要的颜色
		// 由于在循环体里面数字会被替换，所以用了一个单词（red）来当成初始色
		strText = strText.replace(RegExp('red', 'g'), '#E63E32')
		return strText
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
	const logisticsInfo = reactive({
		data: []
	})
	//进入电子存根页面
	const handleToElectronicStub = () => {
		uni.navigateTo({
			url: '/subPages/electronic-stub/index?orderId=' + orderId.value
		});
	}
	//获取订单详情
	const getOrderDetailFunc = (params) => {
		getOrderDetail(orderId.value).then((res) => {
				orderStatus.value = res.data.status
				const {
					estimatedArrivalTime,
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
					receiverPhone,
					transportOrderId,
					updated,
					transportOrderPointVOS,
					id
				} = res.data
				orderInfo.estimatedStartTime = estimatedStartTime
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
				orderInfo.receiverProvince = receiverCity.name
				orderInfo.senderProvince = senderCity.name
				orderInfo.transportOrderId = transportOrderId
				orderInfo.updated = updated
				orderInfo.id = id
				logisticsInfo.data = transportOrderPointVOS.reverse()
				if ([23000, 230011, 22000].includes(orderStatus.value)) {
					nextTick(() => {
						//用来获取详细地址有几行，从而适配寄和收之间竖线的高度
						uni.createSelectorQuery().select('.send-desc').boundingClientRect(res => {
							let height = res.height;
							let line = height / 15
							twoLine.value = line
						}).exec();
					})
				}

				if (params && params !== 'null') getOrderLineFunc()

			})
			.catch((err) => {
				uni.showToast({
					title: '网络异常',
					duration: 2000,
					icon: 'none'
				});
				netStatus.value = false
			})
	}
	//支付
	const handlePay = () => {
		payOrder({
			enterpriseId: 1561414331,
			tradingAmount: orderInfo.amount,
			payMethod: 2,
			productOrderNo: orderId.value
		}).then((res) => {
			const params = JSON.parse(res.data.placeOrderJson)
			uni.requestPayment({
				timeStamp: String(params.timeStamp),
				nonceStr: params.nonceStr,
				package: params.package,
				paySign: params.paySign,
				signType: "RSA",
			})
		})
	}
</script>

<style src="./index.scss" lang="scss" scoped></style>
