<!-- 首页 -->
<template>
	<view class="navFrame">
		<!-- nav -->
		<UniNav :newVal="newVal" @goBack="goBack"></UniNav>
		<!-- 订单信息 -->
		<OrderInfo :baseData="baseData"></OrderInfo>
		<!-- end -->
	</view>
	<!-- end -->
	<view class="homePageBox" :class="!orderData.value ? 'noOrder' : ''">
		<view class="boxPad">
			<!-- 订单提示 -->
			<OrderTip :orderData="orderData.value"></OrderTip>
			<!-- end -->
			<!-- 常用功能 -->
			<CommonUse></CommonUse>
			<!-- end -->
			<!-- 数据展示 -->
			<DataPresentation :baseData="baseData"></DataPresentation>
			<!-- end -->
		</view>
		<!-- 取件状态列表 -->
		<ExpressageInfo :itemData="itemData.value" :tabBars="tabBars" @getTabIndex="getTabIndex"></ExpressageInfo>
		<!-- end -->
	</view>
	<!-- footer -->
	<UniFooter :pagePath="'pages/index/index'"></UniFooter>
	<!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { getTimeDate, positionsUploadInit } from '@/utils/index.js';
// 静态数据
import { tabBars } from '@/utils/commonData.js'
// 导入接口
import { getHomeInfo, getHomeData, getDeliveryList} from '@/pages/api/index.js';
// 导入组件
// 导航
import UniNav from '@/components/uni-home-nav/index.vue';
// 底部导航
import UniFooter from '@/components/uni-footer/index.vue';
// 订单信息
import OrderInfo from './components/orderInfo.vue';
// 订单消息提示
import OrderTip from './components/orderTip.vue';
// 常用功能
import CommonUse from './components/commonUse.vue';
// 数据展示
import DataPresentation from './components/dataPresent.vue';
// 取件信息
import ExpressageInfo from './components/expressageInfo.vue';
// ------定义变量------
const store = useStore(); //vuex获取储存数据
const users = store.state.user;
const newVal = ref(Number(null)); //消息
const orderData = reactive({}); //首页相关默认信息
const itemData = reactive([]);
const noPickupTaskList = reactive([]); //取件列表数据
const noDispatchTaskList = reactive([]); //派件列表数据
const locationData = ref({});
let baseData = ref({});
let page = reactive({
	latitude: users.loacation.latitude !== undefined ? users.loacation.latitude : 40.062595,
	longitude: users.loacation.longitude !== undefined ? users.loacation.longitude : 116.372809,
	page: 1,
	pageSize: 10,
	dateTime: getTimeDate(new Date()).veryDayDate,
	taskStatus: 1
});
// ------生命周期------
onMounted(() => {
	// 上报位置 进入首页立即上报
	positionsUploadInit()
	init();
});
// ------定义方法------
// 获取初始值
const init = () => {
	getNewData();
	getHomeBase();
	getList();
};
// 获取相关消息
const getNewData = async () => {
	await getHomeInfo().then(res => {
		if (res.code === 200) {
			orderData.value = res.data;
			newVal.value = res.data.newsNum;
		}
	});
};
// 获取相关任务、取件、派件、今日已取、已签
const getList = async () => {
	await getDeliveryList(page).then(res => {
		if (res.code === 200) {
			if (res.data) {
				itemData.value = res.data.items;
			}
		}
	});
};
// 获取相关任务、取件、派件、今日已取、已签
const getHomeBase = async () => {
	const locition = {
		longitude: 116.344015,
		latitude: 40.060607
	};
	await getHomeData(locition).then(res => {
		if (res.code === 200) {
			baseData.value = res.data;
		}
	});
};
// 列表tab当前切换的index
const getTabIndex = val => {
	itemData.value = [];
	if (val === 0) {
		page.taskStatus = 1;
	} else {
		page.taskStatus = 4;
	}
	getList();
};

// 获取当前位置
const getLocation = () => {
	uni.getLocation({
		type: 'gcj02',
		success: res => {}
	});
};
// 返回上一页
const goBack = () => {
	uni.redirectTo({
		url: '/pages/index/index'
	});
};
</script>
<style src="./index.scss" lang="scss" scoped></style>
<style lang="scss">
body {
	background: #fff;
}
</style>
