<!-- 已完成 - 详情 -->
<template>
	<!-- 详情 -->
	<view class="details">
		<DetailsNav title="任务详情"></DetailsNav>
		<!-- 取件状态列表 -->
		<view class="container">
			<!-- 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度-->
			<scroll-view scroll-y="true" class="successSwiperH">
				<view class="cont" v-if="Object.keys(itemData).length > 0">
					<!-- 通用卡片组件 - 待提货 - 带开关 -->
					<CardCont title="基本信息" :open="true">
						<DetailsBaseInfo :itemData="itemData"></DetailsBaseInfo>
					</CardCont>
					<CardCont title="车辆司机信息">
						<view class="carInfo">
							<view class="line"> <text class="tit">车牌号</text> <text class="ritEl">{{itemData.licensePlate}}</text>
							</view>
							<view class="line"> <text class="tit">司机姓名</text> <text class="ritEl">{{itemData.driverName}}</text>
							</view>
						</view>
					</CardCont>
					<CardCont title="运输路线">
						<RouteCont :itemData="itemData" type="route"></RouteCont>
					</CardCont>
					<CardCont title="物品信息" :label="`共计: ${amount}单`">
						<OrderCont :itemData="orders" @searchHandle="searchHandle"></OrderCont>
					</CardCont>
					<CardCont title="提货凭证">
						<view class="upPicCont">
							<div class="tit">回单凭证</div>
							<view class="upPicContImg">
								<img class="image" v-for="item in itemData.cargoPickUpPicture" :src="item" alt="" srcset="">
							</view>
						</view>
						<view class="upPicCont">
							<div class="tit">提货照片</div>
							<view class="upPicContImg">
								<img class="image" v-for="item in itemData.cargoPicture" :src="item" alt="" srcset="">
							</view>
						</view>
					</CardCont>
					<CardCont title="交货信息">
						<view class="upPicCont">
							<div class="tit">回单凭证</div>
							<view class="upPicContImg">
								<img class="image" v-for="item in itemData.deliverPicture" :src="item" alt="" srcset="">
							</view>
						</view>
						<view class="upPicCont">
							<div class="tit">货品照片</div>
							<view class="upPicContImg">
								<img class="image" v-for="item in itemData.transportCertificate" :src="item" alt="" srcset="">
							</view>
						</view>
					</CardCont>
					<CardCont title="异常信息">
						
					</CardCont>
				</view>
				<!-- 无数据显示 -->
				<view v-if="Object.keys(itemData).length === 0">
					<EmptyPage emptyInfo="暂无数据!" />
				</view>
				<!-- end -->
			</scroll-view>
		</view>
		<!-- end -->
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onUpdated,
		watch,
		watchEffect,
		computed,
		inject
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	// 导入接口
	import {
		GetTaskDetails,
		GetTaskDetailsOrders,
		TakeDelivery
	} from '@/pages/api/index.js';

	// 导入组件
	import DetailsNav from '@/components/DetailsNav/index.vue'
	import EmptyPage from '@/components/EmptyPage/index.vue'
	import DetailsBaseInfo from './components/DetailsBaseInfo.vue'
	import OrderCont from './components/OrderCont.vue'
	import RouteCont from './components/RouteCont.vue'

	// 主体部分
	import CardCont from '@/components/CardCont/index.vue';
	// 接口调用
	import {
		upload
	} from '@/pages/api/index.js'

	// ------定义变量------
	const store = useStore(); //vuex获取储存数据

	const itemData = ref({});
	const orders = ref([]); // 货物信息列表  
	const amount = ref(0); // 货物信息总数

	const id = ref('') // 任务Id
	const cargoPickUpPicture = ref([]) // 提货凭证
	const cargoPicture = ref([]) // 货物照片
	const isTake = ref(true) // 是否可提货
	const taskId = ref('')

	// ------生命周期------
	onMounted(() => {
		const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1].$page.options;
		id.value = currentPage.id;
		getDetailsInfo();
	});

	

	// ------定义方法------
	// 获取任务详情的数据
	const getDetailsInfo = async () => {
		// 获取任务详情的数据
		await GetTaskDetails(id.value)
			.then(res => {
				const {
					data
				} = res
				if (res.code === 200) {
					itemData.value = data
					getOrders(data.transportTaskId)
				} else {
					return uni.showToast({
						title: res.msg,
						duration: 1000,
						icon: 'none'
					});
				}
			})
			.catch(err => {});
	};
// 获取物品订单信息
	const getOrders = async (orderId, transportOrderId='' ) => {
		const params = {
			transportOrderId,
			taskId: orderId,
			page: 1,
			pageSize: 100
		}
		await GetTaskDetailsOrders(params)
			.then(res => {
				if (res.code === 200) {
					amount.value = res.data.counts ? res.data.counts : 0
					orders.value = res.data.items
				} else {
					return uni.showToast({
						title: res.msg,
						duration: 1000,
						icon: 'none'
					});
				}
			})
			.catch(err => {});
	}

	// 物品信息搜索
	function searchHandle(transportOrderId) {
		getOrders(itemData.value.transportTaskId, transportOrderId)
	}
</script>
<style src="./index.scss" lang="scss"></style>
<style lang="scss" scoped>
	.details {
		.successSwiperH {
			height: calc(100vh - 160rpx);
			padding-bottom: 26rpx;
		}
	}
</style>
