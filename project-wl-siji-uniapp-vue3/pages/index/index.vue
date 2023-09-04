<!-- 待提货-首页 -->
<template>
	<!-- end -->
	<view class="pageBox">
		<!-- 取件状态列表 -->
		<ItemList :itemData="itemData.value" @setTabIndex="setTabIndex" @searchSubmit="searchHandle" :loadding="loading" :moreStatus="moreStatus" />
		<!-- end -->
	</view>
	<!-- footer -->
	<UniFooter :pagePath="'pages/index/index'"></UniFooter>
	<!-- end -->
</template>
<script>
export default {
	name: 'list',
	// 上拉刷新
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
	}
};
</script>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
// 导入接口
import { GetTasksList, GetTaskDetails, PositionUpload } from '@/pages/api/index.js';
import { positionsUploadInit } from '@/utils/index.js';
// 导入组件
// 底部导航
import UniFooter from '@/components/Footer/index.vue';
// 主体部分
import ItemList from './components/ItemList.vue';

// ------定义变量------
const store = useStore(); //vuex获取储存数据
const itemData = reactive([]);
const tabIndex = ref(store.state.taskStatus); //当前tab
const moreStatus = ref('loading'); //加载更多状态 loading  more noMore
const loading = ref(false); // 是否展示加载更多
const date = new Date();
const year = date.getFullYear();
const month = computed(() => {
	const mt = date.getMonth();
	if (mt > 0 && mt < 10) {
		return '0' + mt;
	} else if (mt == 0) {
		return 12;
	} else {
		return mt;
	}
});
const month1 = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
const params = reactive({
	status: tabIndex != 2 ? tabIndex.value + 1 : 4,
	transportTaskId: '', // 运单号 非必传

	page: 1,
	pageSize: 10
});
const pages = ref(0); // 总页数
// ------生命周期------
onMounted(() => {
	// 上报位置 进入首页立即上报
	positionsUploadInit();
	getNewData();
});
// ------定义方法------
const isSendRequest = ref(false); // 是否继续发送请求

// 获取任务列表
const getNewData = async type => {
	if (isSendRequest.value) {
		return;
	}
	loading.value = true;
	let infoParams = {};
	if (store.state.taskStatus === 2) {
		infoParams = {
			...params,
			startTime: month.value == 12 ? `${year - 1}-${month.value}-${day}` : `${year}-${month.value}-${day}`,
			endTime: `${year}-${month1}-${day}`
		};
	} else {
		infoParams = {
			...params
		};
	}
	await GetTasksList(infoParams)
		.then(res => {
			if (res.code == 200) {
				const { data } = res;
				// 搜索数据处理
				if (type && type == 'search') {
					params.page = 1;
					params.pageSize = 10;
					itemData.value = data.items ? data.items : [];
				} else {
					// items == null 会报错 把他处理掉
					const items = data.items == null ? [] : data.items;
					// 从第一页请求 清空之前的数据
					params.page == 1 ? (itemData.value = undefined) : null;
					// 下拉数据合并
					itemData.value = itemData.value ? [...itemData.value, ...items] : items;
					// 如果 当前页面的数据已经全部数据了 那么停止拿数据
					if (data.counts == 0) {
						isSendRequest.value = true;
					}
				}

				loading.value = false;
				counts.value = data.pages;
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

// 切换 1待提货、2在途、4已完成
const setTabIndex = index => {
	const tab = store.state.taskStatus;
	store.commit('setTaskStatus', index);
	// 下拉加载和切换的时候处理分页参数
	params.page = tab == index ? params.page + 1 : 1;
	params.status = index != 2 ? index + 1 : 6;
	isSendRequest.value = false;
	getNewData();
};

// 已完成搜索
const searchHandle = val => {
	// 已完成列表提交搜索
	if (typeof val == 'string') {
		params.transportTaskId = val;
	} else {
		params.startTime = val.value[0];
		params.endTime = val.value[1];
	}

	getNewData('search');
};
</script>
<style src="./index.scss" lang="scss"></style>
