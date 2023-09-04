<!-- 任务首页-包含待提货、在途、已完成 -->
<template>
	<view class="">
		<scroll-view scroll-x="true" class="tabScroll" :scroll-into-view="scrollinto"  :scroll-with-animation="true">
			<view v-for="(item, index) in tabBars" :key="index" :id="'tab' + index" class="scroll-row-item" @click="changeTab(index)">
				<view :class="tabIndex == index ? 'scroll-row-item-act' : ''">
					<text class="line"></text>
					{{ item }}
				</view>
			</view>
		</scroll-view>
		<!-- 已完成页面 搜索框 - start -->
		<view class="searchCont" v-if="tabIndex == 2">
			<SearchInput inputKey="orderId" @searchHandle="searchHandle" ></SearchInput>
			<view class="timeSearch">
				<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" rangeSeparator="至" />
				<view v-show="!isSearch" class="searchBut" @click="searchHandle('time')">
					<text class="button  min" >筛选</text>
				</view>
				<view v-show="isSearch" class="searchBut">
					<text class="button buttonDis1 min">筛选</text>
				</view>
			</view>
		</view>
		<!-- 已完成页面 搜索框 - end -->
		<!-- 滑块内容 对应的是顶部选项卡的切换 :current="tabIndex" 设置的是y方向上可以滚动-->
		<view class="container">
			<!-- 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度-->
			<scroll-view scroll-y="true" class="swiperH" :class="{finshSwiperH: tabIndex == 2}"  @scrolltolower="scrolltoupperHandle" :lower-threshold="10">
				<view class="marg" v-if="itemData.length > 0">
					<!-- 通用卡片组件 - 待提货、在途 -->
					<Card v-for="(item, index) in itemData" :data="item" :src="filterUrl(item)" :key="item.id" :type="tabIndex"  />
				</view>
				<!-- 无数据显示 -->
				<view v-if="itemData.length === 0 && !loading">
					<EmptyPage :emptyInfo="emptyInfo" />
				</view>
				<!-- end -->
				<!-- 下拉加载更多Lodding -->
				<view v-if="loading">
					<uni-load-more :status="moreStatus"  />
				</view>
				<!-- end -->
			</scroll-view>
		</view>
	</view>
</template>

<script setup >
import { ref, reactive, onMounted, watchEffect, provide } from 'vue';
import { useStore } from 'vuex';
// 组件
import Card from '@/components/Card/index.vue'
// 取件信息
import EmptyPage from '@/components/EmptyPage/index.vue';
// searchInput
import SearchInput from '@/components/SearchInput/index.vue';

// 获取父组件值、方法
const props = defineProps({
	itemData: {
		type: Array,
		default: () => []
	},
	moreStatus:{
		type: String,
		default: 'loading'
	},
	loading:{
		type: Boolean,
		default: false
	}
});

// ------定义变量------
const scrollinto = ref('tab0'); //tab切换
const store = useStore();
const tabIndex = ref(store.state.taskStatus); //当前tab
const scrollH = ref(0); //滚动高度
const emptyInfo = ref('未找到相关任务');
const tabBars = reactive(['待提货', '在途', '已完成']);
const emit = defineEmits(['setTabIndex','searchSubmit']);
const page = ref();
const pageSize = ref();
const taskId = ref(''); // 任务ID
const isSearch = ref(true) // 搜索是否可点
const range = ref() // 日期选择
const orderId = ref('') // 搜索

// 将对应Id 做provide处理 方便后面使用

provide('taskId', taskId)

// ------生命周期------
onMounted(() => {
	// 获取屏幕信息
	uni.getSystemInfo({
		success: function(res) {
			// 获取元素信息
			let info = uni.createSelectorQuery().select('.swiperH');
			info
				.boundingClientRect(function(data) {
					//data - 各种参数
					scrollH.value = data.height + 140;
				})
				.exec();
		}
	});
});
// 监听日期变更 调试是否可筛选状态
watchEffect(() => {
	if (range.value){
		isSearch.value = false
	}
})
// ------定义方法------

// 卡片点击去往对应详情的url 处理
const filterUrl = (item) => {
	let src = ''
	if (tabIndex.value == 0){
		src = `/pages/index/details?id=${item.id}`
	} else {
		switch (Number(item.status)){
			case 1: // 待提货
				src = `/pages/index/details?id=${item.id}`
				break;
			case 2: // 在途
				src = `/pages/index/detailsRoad?id=${item.id}`
				break;
			case 4: // 已交付
				src = `/pages/index/refister?id=${item.transportTaskId}&time=${item.actualDepartureTime}`
				break;
			case 6: // 已完成（已等级）- 交付之后需要回车等记
				src = `/pages/index/detailsSuccess?id=${item.id}`
				break;
			default: // 3 改派 、5 作废
				src = ``
				break;
		}
	}
	return src
}
// 搜索按钮
function searchHandle(type){
	const params = type == 'time' ? range : type
	emit('searchSubmit', params)
}
// 上拉刷新
function scrolltoupperHandle(){
	emit('setTabIndex', tabIndex.value)
}
// tab选项卡切换轮播
const changeTab = index => {
	// 点击的还是当前数据的时候直接return
	if (tabIndex.value == index) {
		return;
	}
	tabIndex.value = index;
	emit('setTabIndex', index)
	// 滑动
	// scrollinto.value = 'tab' + index;
};
//
function maskClick(time){
	console.log(time)
}
</script>

<style src="../index.scss" lang="scss"></style>
<style lang="scss">
	.searchCont{
		background-color: #fff;
		padding: 0rpx 30rpx 30rpx 30rpx;
		.searchBut{
			width: 180rpx;
			margin-left: 40rpx;
		}
		.timeSearch{
			display: flex;
			padding-top: 20rpx;
		}
		::v-deep .uniui-clear::before{
			display: none;
		}
		::v-deep .uni-input-wrapper{
			background-color: #f4f4f4;
		}
	}
</style>
