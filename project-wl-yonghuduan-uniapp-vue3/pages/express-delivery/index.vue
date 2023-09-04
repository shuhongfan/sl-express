<template>
	<!-- 头部导航栏 -->
	<nav-bar title='寄快递' :handleToLink="handleToLink"></nav-bar>
	<view class="express-delivery" v-if="netStatus">
		<!-- 寄件人，收件人信息填写（地址簿） -->
		<view class="address-box">
			<view class="left">
				<view class="send">寄</view>
				<view class="line" :class="{active:twoLine>=2}"></view>
				<view class="get">收</view>
			</view>
			<view class="right">
				<view class="send-people">
					<view class="send-title" @click="toSendAddressInfo">
						<view class="send-sub-title">
							{{senderInfo.name?senderInfo.name:'寄件人信息'}}
							<text
								v-if="senderInfo.phone">{{senderInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}}</text>
						</view>
						<view class="send-desc">
							{{senderInfo.address?senderInfo.areaLabel+senderInfo.address:'去填写'}}
						</view>
					</view>

					<view class="address-enter" @click="handleToAddress('send')">地址簿</view>
				</view>
				<view class="line"></view>
				<view class="get-people">
					<view class="send-title" @click="toGetAddressInfo">
						<view class="send-sub-title">
							{{geterInfo.name?geterInfo.name:'收件人信息'}}
							<text
								v-if="geterInfo.phone">{{geterInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}}</text>
						</view>
						<view class="send-desc">
							{{geterInfo.address?geterInfo.areaLabel+geterInfo.address:'去填写'}}
						</view>
					</view>

					<view class="address-enter" @click="handleToAddress('get')">地址簿</view>
				</view>
			</view>
		</view>

		<!-- 寄件其他信息填写 -->
		<view class="send-form">
			<view class="tab-box" :class="activeIndex===1?'active':''">
				<view class="tab-item" :class="activeIndex===index?'active':'isNotActive'"
					v-for='(item,index) in tabList' @click="changeTab(index)" :key='index'>
					{{item}}
				</view>
			</view>
			<view class="form-box">
				<view class="toDoor" v-if='activeIndex === 0'>
					<!-- 期望上门时间 -->
					<view class="form-getTime" @click='handleGetTime'>
						<view class="left">
							<view class="label">期望上门时间</view>
							<view class="required"></view>
						</view>
						<view class="right">
							<view class="value" :class="toDoorTimeLabel?'active':''">
								{{toDoorTimeLabel?toDoorTimeLabel:'请选择'}}
							</view>
							<icon class="nextIcon"></icon>
						</view>
					</view>
					<!-- 物品信息 -->
					<view class="goods-info" @click='handleToGoodsInfo'>
						<view class="left">
							<view class="label">物品信息</view>
							<view class="required"></view>
						</view>
						<view class="right">
							<view class="value" :class="goods.goodsName?'active':''">
								{{goods.goodsName?(goods.goodsName + ', '+ (goods.weight+'公斤') + (goods.volume?', '+(dealWithVolume(goods.volume/1000000)+'m³'):'')):'请选择'}}
							</view>
							<icon class="nextIcon"></icon>
						</view>
					</view>
					<!-- 付款方式 -->
					<view class="pay-type" @click='handleToPayType'>
						<view class="left">
							<view class="label">付款方式</view>
						</view>
						<view class="right">
							<view class="value" :class="payMethod?'active':''">
								{{payMethod ===1?'寄付':payMethod ===2?'到付':'请选择'}}
							</view>
							<icon class="nextIcon"></icon>
						</view>
					</view>
				</view>
				<!-- 网点自寄 -->
				<view class="branch-send" v-else>
					网点自寄
				</view>
			</view>
		</view>
		<!-- 期待上门时间弹窗 -->
		<GetTimePicker ref='timePicker' @getTime="getTime"></GetTimePicker>

		<!-- 付款方式弹窗 -->
		<PayTypeDialog ref='payType' @getPayType="getPayType"></PayTypeDialog>

		<!-- 底部 -->
		<view class="footer" :class="{active:isSeachPriceDetail}">
			<view class="left">
				<view class="left-top" @click="searchPriceDetail">
					<view class="all-account">
						预估总价
						<view class="price">￥{{feightPrice.expense}}</view>
					</view>
					<view class="price-detail">
						明细
						<view class="arrow"></view>
					</view>
				</view>
				<view class="left-bottom">
					<view class="active"></view>
					<view class="content">阅读并同意《电子运单契约条款》</view>
				</view>
			</view>
			<view class="right">
				<view class="btn" :class="isCanSubmit?'active':''" @click="order">下单</view>

			</view>
		</view>
		<!-- 运费明细弹窗 -->
		<uni-popup ref="priceDetail" type="bottom" class="priceDetail">
			<view class="header">
				<view class="header-title">运费预估</view>
				<view class="close" @click="handleCancel"></view>
			</view>
			<view class="title">
				实际费用请以快递员揽收为准，
				<view class="title-red" @click="openAccountRulesDialog">了解计费规则</view>
			</view>
			<view class="base-price">
				<view class="left">基础运费</view>
				<view class="right">￥{{feightPrice.expense}}</view>
			</view>
			<view class="price-rule">首重（1.0kg）{{feightPrice.firstWeight}}元，续重{{feightPrice.continuousWeight}}元/kg</view>
			<view class="billing-weight">
				<view class="left">计费重量</view>
				<view class="right">（含包装）{{feightPrice.weight}}kg</view>
			</view>
			<view class="line"></view>
			<view class="add-service">
				<view class="left">增值服务</view>
				<view class="right">¥0</view>
			</view>
			<view class="setTimeout-send">
				<view class="left">礼物定时派送</view>
				<view class="right">¥0</view>
			</view>
		</uni-popup>
	</view>
	<!-- 断网显示的页面 -->
	<net-fail v-else :handleToRefresh="handleToRefresh"></net-fail>
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
	} from '@dcloudio/uni-app';
	import {
		getAddressInfoDetail,
		defaultAddress
	} from '@/pages/api/address.js'
	import {
		doOrder,
		getEstimatePrice
	} from '@/pages/api/order.js'
	import GetTimePicker from './components/getTimePicker.vue';
	import PayTypeDialog from './components/payType.vue';
	import {
		handleSecondQi,
	} from '@/utils/index.js'
	import {
		useStore
	} from 'vuex';
	const twoLine = ref()
	const store = useStore(); //vuex获取、储存数据
	const users = store.state.user
	const isCanSubmit = computed(() => {

		return (geterInfo.name && senderInfo.name && goods.goodsName && payMethod.value && toDoorTimeLabel.value)
	})

	const timePicker = ref() //期望上门时间组件的引用
	const payType = ref() //付款方式弹窗组件的引用
	const priceDetail = ref()//运费弹窗明细组件的引用
	const isSeachPriceDetail = ref(false)
	const toDoorTime = ref('') //预计上门时间
	const toDoorTimeLabel = ref('今天 一小时内')
	const payMethod = ref(1) //付款方式
	const type = ref('') //判断是从寄件地址返回的还是收件地址
	const feightPrice = reactive({
		expense: '', //运费
		weight: '', //计算重量
		firstWeight: '', //首重价格
		continuousWeight: '' //续重价格
	})
	const isFromGoods = ref(false)
	const stopClick = ref(false)
	const goods = reactive({
		weight: 1,
		volume: 1,
		goodsName: '',
		goodsType: ''
	})
	const sendAddress = ref('')
	const senderInfo = reactive({
		name: '',
		phone: '',
		address: '',
		areaLabel: '',
	}) //寄件人信息
	const geterInfo = reactive({
		name: '',
		phone: '',
		address: '',
		areaLabel: '',
	}) //收件人信息
	let netStatus = ref(true)
	//tab常量
	const tabList = reactive(['上门取件',
		'网点自寄'
	])
	//当前
	let activeIndex = ref(0)
	//打开计费规则弹窗
	const openAccountRulesDialog = () => {
		uni.navigateTo({
			url: '/subPages/account-rules/index'
		});
	}
	onMounted(() => {
		feightPrice.expense = users.expense
		feightPrice.weight = users.computeWeight
		feightPrice.firstWeight = users.firstWeight
		feightPrice.continuousWeight = users.continuousWeight
	})
	onLoad((options) => {
		console.log(options,'options')
		if (options.type === 'send') {
			sendAddress.value = options.id
			uni.setStorageSync('sendId', options.id)
		} else if (options.type === 'get') {
			uni.setStorageSync('getId', options.id)
		}
		//用于解决点击地址薄选择了非默认地址回来之后被默认地址覆盖的问题
		if(!options.id){
			getDefaultAddress()
		}
		
		//用于解决页面跳转回来数据缺失问题
		if (uni.getStorageSync('sendId')) {
			searchAddressDetail(uni.getStorageSync('sendId'), 'send')
		}
		if (uni.getStorageSync('getId')) {
			searchAddressDetail(uni.getStorageSync('getId'), 'get')
		}
		type.value = options.type
		goods.volume = users.volume
		goods.weight = users.weight
		goods.goodsName = users.goodsInfo.name
		goods.goodsType = users.goodsInfo.goodsType ? users.goodsInfo.goodsType.id : ''
		toDoorTimeLabel.value = users.toDoorTimeLabel || '今天 一小时内'
		toDoorTime.value = users.toDoorTime
		payMethod.value = users.payMethod
		isFromGoods.value = options.isFromGoods
		//必须寄件收件人地址和物品信息都选择了才能计算运费
		//这里不能将逻辑提前，应该置于赋值后面
		if (uni.getStorageSync('getId') && (uni.getStorageSync('sendId') || sendAddress.value) && users.goodsInfo
			.name) {
				console.log(666)
			calcFreight()
		}
	})
	const handleToRefresh = ()=>{
		uni.redirectTo({
			url:'/pages/express-delivery/index'
		})
	}
	//处理体积如果是超过小数点后四位则保留四位小数，其他情况直接展示
	const dealWithVolume = (value) => {
		let dot = String(value).indexOf(".");
		if (dot != -1) {
			let dotCnt = String(value).substring(dot + 1, value.length);
			if (dotCnt.length > 4) {
				value = value.toFixed(4);
				return value
			} else {
				return value
			}
		} else {
			return value
		}
	}
	const getDefaultAddress = () => {
		if (!type.value && !isFromGoods.value) {
			defaultAddress().then((res) => {
				if (res.data) {
					sendAddress.value = res.data.id
					senderInfo.name = res.data.name
					senderInfo.phone = res.data.phoneNumber
					senderInfo.address = res.data.address
					senderInfo.areaLabel = res.data.province.name + ' ' + res.data.city.name + ' ' + res.data
						.county.name
					uni.setStorageSync('sendId', res.data.id)
					netStatus.value = true
					nextTick(()=>{
						//用来获取详细地址有几行，从而适配寄和收之间竖线的高度
						uni.createSelectorQuery().select('.send-desc').boundingClientRect(res => {
						    let height = res.height;
						    let line = height / 15 
							twoLine.value = line
						}).exec();
					})
				}
			}).catch((err) => {
				uni.showToast({
					title: '网络异常',
					duration: 2000,
					icon: 'none'
				});
				netStatus.value = false
			})
		}

	}
	//查询地址簿详情，并赋值
	const searchAddressDetail = (id, type) => {
		getAddressInfoDetail(id).then((res) => {
			const {
				name,
				phoneNumber,
				address,
				city,
				county,
				province,
			} = res.data
			if (type === 'send') {
				senderInfo.name = name
				senderInfo.phone = phoneNumber
				senderInfo.address = address
				senderInfo.areaLabel = province.name + ' ' + city.name + ' ' + county.name
			} else {
				geterInfo.name = name
				geterInfo.phone = phoneNumber
				geterInfo.address = address
				geterInfo.areaLabel = province.name + ' ' + city.name + ' ' + county.name
			}
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

	// 切换tab
	const changeTab = (index) => {
		if (index === 1) {
			return handleSecondQi()
		}
		activeIndex.value = index
	}

	//打开选择期望上门时间弹窗
	const handleGetTime = () => {
		timePicker.value.handleOpen()
	}
	//打开付款方式弹窗
	const handleToPayType = () => {
		payType.value.handleOpen()
	}
	const clearCurrentPageData = () => {
		store.commit('user/setGoodsInfo', {})
		store.commit('user/setVolume', '')
		store.commit('user/setExpense', 0)
		store.commit('user/setComputeWeight', 0)
		store.commit('user/setFirstWeight', 0)
		store.commit('user/setContinuousWeight', 0)
		store.commit('user/setToDoorTimeLabel', '')
		store.commit('user/setToDoorTime', String(new Date().getFullYear()) + '-' + String(new Date().getMonth() + 1) +
			'-' +
			new Date().getDate() + ' ' + String(new Date().getHours() + 1) + ':' + String(Number(new Date()
				.getMinutes()) < 10 ? '0' + Number(new Date().getMinutes()) : Number(new Date()
				.getMinutes())) + ':00')
		store.commit('user/setWeight', 1)
		store.commit('user/setPayMethod', 1)
	}

	const handleToLink = () => {
		clearCurrentPageData()
		uni.removeStorageSync('getId');
		uni.removeStorageSync('sendId');
		uni.switchTab({
			url: '/pages/index/index'
		});
	}

	//跳转到物品信息页面
	const handleToGoodsInfo = () => {
		uni.navigateTo({
			url: '/pages/goodsInfo/index'
		});
	}

	//跳转地址簿
	const handleToAddress = (type) => {
		uni.navigateTo({
			url: '/pages/address/index?type=' + type + '&isFromAddress=false'
		});
	}

	//查看运费明细
	const searchPriceDetail = () => {
		priceDetail.value.open('bottom')
		isSeachPriceDetail.value = true
	}

	//关闭运费明细弹窗
	const handleCancel = () => {
		priceDetail.value.close()
		isSeachPriceDetail.value = false
	}
	
	//重置期望上门时间为最新时间
	const resetPickUpTime = ()=>{
		if(toDoorTimeLabel.value === '今天 一小时内'){
			store.commit('user/setToDoorTime', toDoorTime.value)
		}
	}

	//下单
	const order = () => {
		if (!isCanSubmit.value) {
			return
		}
		if (stopClick.value) {
			return
		}
		stopClick.value = true
		console.log(goods,'下单')
		doOrder({
			goodNum: 1,
			goodsName: goods.goodsName,
			goodsType: goods.goodsType,
			payMethod: payMethod.value,
			pickUpTime:toDoorTimeLabel.value==='今天 一小时内'?String(new Date().getFullYear()) + '-' + String(new Date().getMonth() + 1) + '-' +
			new Date().getDate() + ' ' + String(new Date().getHours() + 1) + ':' + String(Number(new Date()
				.getMinutes()) < 10 ? '0' + Number(new Date().getMinutes()) : Number(new Date()
				.getMinutes())) + ':00': users.toDoorTime,
			totalVolume: goods.volume ,
			totalWeight: goods.weight,
			receiptAddress: uni.getStorageSync('getId'),
			sendAddress: sendAddress.value || uni.getStorageSync('sendId'),
			pickupType: 0 //0上门取件，1网点自寄
		}).then((res) => {
			console.log(res,'resss')
			if (res.code !== 200) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none',
					duration: 1000
				})
			} else {

				uni.redirectTo({
					url: '/subPages/order-success/index?orderId=' + res.data.id
				});
				uni.removeStorageSync('getId');
				uni.removeStorageSync('sendId');
				clearCurrentPageData()
			}
			stopClick.value = false
		}).catch((err)=>{
			stopClick.value = false
			console.log(err,'err')
		})

	}

	//跳转到寄件人地址信息填写页面
	const toSendAddressInfo = () => {
		if (sendAddress.value || uni.getStorageSync('sendId')) {
			uni.navigateTo({
				url: '/subPages/address-info/index?type=send&editOrAdd=edit' + '&id=' +
					uni.getStorageSync(
						'sendId')
			});
		} else {
			uni.navigateTo({
				url: '/subPages/address-info/index?type=send&editOrAdd=add'
			});
		}

	}

	//跳转到收件人地址信息填写页面
	const toGetAddressInfo = () => {
		if (uni.getStorageSync('getId')) {
			uni.navigateTo({
				url: '/subPages/address-info/index?type=get&editOrAdd=edit' + '&id=' + uni.getStorageSync(
					'getId')
			});
		} else {
			uni.navigateTo({
				url: '/subPages/address-info/index?type=get&editOrAdd=add'
			});
		}
	}
	//获取期望上门时间数据
	const getTime = (value) => {

		toDoorTimeLabel.value = value.selectedDayLabel + ' ' + value.selectedTimeLabel
		toDoorTime.value = String(new Date().getFullYear()) + '-' + String(new Date().getMonth() + 1) + '-' + (
			new Date().getDate() + value.selectedDay + ' ' + String((value.selectedTime === 1 ? new Date()
				.getHours() + 1 : value.selectedTime) + ':00:00'))
		store.commit('user/setToDoorTimeLabel', toDoorTimeLabel.value)
		store.commit('user/setToDoorTime', toDoorTime.value)
	}
	//获取付款方式数据
	const getPayType = (value) => {
		payMethod.value = value
		store.commit('user/setPayMethod', value)
	}
	//计算运费
	const calcFreight = () => {
		console.log(goods,'计算运费')
		getEstimatePrice({
			goodNum: 1,
			goodsName: goods.goodsName,
			goodsType: goods.goodsType,
			payMethod: payMethod.value,
			pickUpTime: toDoorTime.value,
			totalVolume: goods.volume ,
			totalWeight: goods.weight,
			receiptAddress: uni.getStorageSync('getId'),
			sendAddress: uni.getStorageSync('sendId'),
			pickupType: 0 //0上门取件，1网点自寄
		}).then((res) => {
			if (res.code == 200) {
				store.commit('user/setExpense', res.data.expense)
				store.commit('user/setComputeWeight', res.data.computeWeight)
				store.commit('user/setFirstWeight', res.data.firstWeight)
				store.commit('user/setContinuousWeight', res.data.continuousWeight)
				feightPrice.expense = res.data.expense
				feightPrice.weight = res.data.computeWeight
				feightPrice.firstWeight = res.data.firstWeight
				feightPrice.continuousWeight = res.data.continuousWeight
			} else {
				uni.showToast({
					title: res.msg,
					duration: 1000,
					icon: 'none'
				});
			}
		})
	}
</script>
<style src='./components/getTimePicker.scss' lang="scss"></style>
<style src='./components/payType.scss' lang="scss"></style>
<style src="./index.scss" lang="scss"></style>
