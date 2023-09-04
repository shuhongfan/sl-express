<template>
	<view v-if="tabIndex === 2">
		<view v-if="itemData.length > 0">
			<scroll-view scroll-y="true">
				<!-- 列表内容-->
				<view v-for="(item, index) in itemData" :key="index" class="expressage">
					<view class="checkbox" v-if="isAdmin">
						<view class="checkRadio"><radio :value="String(index)" :class="item.selected === true ? 'active' : ''" :checked="item.selected" @click="checkbox(index)" /></view>
					</view>
					<view class="boxBg" :class="isAdmin ? 'adminActive' : ''">
						<view class="tabList cancelList">
							<view class="item" @click.stop="handleDetails($event, item.id)">
								<view>寄件人：{{ item.name }}</view>
								<view>取件地址：{{ item.address }}</view>
								<view>取消原因：{{ item.cancelReason }}</view>
								<view>原因描述：{{ item.cancelReasonDescription }}</view>
								<text @click.stop="handleOpen($event, item.id)" class="delete"><button class="uni-btn concelBtn">删除</button></text>
							</view>
						</view>
					</view>
				</view>
				<!-- end -->
				<!-- 上拉 -->
				<ReachBottom ref="loadMore"></ReachBottom>
				<!-- end -->
			</scroll-view>
		</view>
		<!-- 空页面 -->
		<view v-else><EmptyPage :emptyData="emptyData"></EmptyPage></view>
		<!-- end -->
	</view>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import { getTimeDate } from '@/utils/index.js';
import { useStore } from 'vuex';
//接口
import { getDeliveryList, getSearch } from '@/pages/api/index.js';
// 下拉提示
import ReachBottom from '@/components/reach-bottom/index.vue';
//空页面
import EmptyPage from '@/components/uni-empty-page/index.vue';
// 获取父组件数据
const props = defineProps({
	tabIndex: {
		type: Number,
		default: 0
	},
	// 是否触发管理按钮
	isAdmin: {
		type: Boolean,
		default: false
	},
	// // 搜索分页
	searchInfo: {
		type: Object,
		default: () => ({})
	}
});
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const emit = defineEmits(''); //子组件向父组件事件传递
const users = store.state.user;
const loadMore = ref(); //定义子组件的ref,可以调取子组件的值
let itemData = ref([]);//列表数据
let reload = ref(false); //数据加载
let pages = ref(0); //总页数
let pageNum = ref(1);//当前页
let selected = reactive(new Map());
const emptyData = ref('暂无数据');//空页面提示
let page = reactive({
	latitude: users.loacation.latitude !== undefined ? users.loacation.latitude : 40.062595,
	longitude: users.loacation.longitude !== undefined ? users.loacation.longitude : 116.372809,
	page: 1,
	pageSize: 10,
	orderDistance: null,
	orderTime: null,
	filterOverTime: null,
	dateTime: getTimeDate(new Date()).veryDayDate,
	taskStatus: 3
});
let searchPage = reactive({
	latitude: users.loacation.latitude !== undefined ? users.loacation.latitude : 40.062595,
	longitude: users.loacation.longitude !== undefined ? users.loacation.longitude : 116.372809,
	page: 1,
	pageSize: 10
});
// 上下拉取
onReachBottom(() => {
	store.commit('user/setIsInput', true); //是否在文本框里输入了文字
	if (pageNum.value >= pages.value) {
		loadMore.value.status = 'noMore';
		return false;
	} else {
		loadMore.value.status = 'loading';
		let times = setTimeout(() => {
			pageNum.value++;
			if (props.searchInfo.keyword) {
				getSearchList();
			} else {
				getList();
			}
		}, 1000); //这里延时一秒在加载方法有个loading效果
	}
});
// 计算是否全选或者单选
watch(users, (newValue, oldValue) => {
	if (users.selectTaskData.size > 0) {
		for (let [key, value] of users.selectTaskData) {
			itemData.value.forEach(element => {
				if (value === element.id) {
					element.selected = true;
				}
			});
		}
	} else {
		itemData.value.forEach(element => {
			element.selected = false;
		});
	}
});
// ------定义方法------
// 获取数据
const getList = async () => {
	reload.value = true;
	// 是否触发了搜索清空
	if (users.isSearchClear) {
		pageNum.value = 1;
		store.commit('user/setSearchClear', false);
	}
	page = {
		...page,
		page: pageNum.value,
		orderDistance: users.orderDistance,
		orderTime: users.orderTime,
		filterOverTime: users.filterOverTime
	};
	// 后端接口调用
	await getDeliveryList(page).then(res => {
		if (res.code === 200) {
			if (res.data) {
				reload.value = false;
				if (users.deliveryData.length === 0) {
					itemData.value = [];
				}
				// 触发tab切换
				// 如果触发了tab切换或者触发了搜索清空
				if (users.istabChange || users.isSearchClear) {
					itemData.value = res.data.items;
					store.commit('user/setIstabChange', false);
				} else {
					itemData.value = itemData.value.concat(res.data.items);
				}
				pages.value = res.data.pages;

				// 存储列表数据
				store.commit('user/setDeliveryData', itemData.value);
				if (Number(res.data.pages) === pageNum.value) {
					loadMore.value.status = 'noMore';
				}
			} else {
				itemData.value = [];
			}
		}
	});
};
// 搜索数据
const getSearchList = async () => {
	reload.value = true;
	let valNum = 0;
	if (!users.isInput) {
		valNum = 1;
		pageNum.value = 1;
		store.commit('user/setIsFiltrate', false);
	}
	searchPage = {
		...searchPage,
		keyword: props.searchInfo.keyword,
		status: props.searchInfo.status,
		taskType: props.searchInfo.taskType,
		page: valNum ? 1 : pageNum.value
	};
	// 后端接口调用
	await getSearch(searchPage).then(res => {
		if (res.code === 200) {
			if (res.data) {
				reload.value = false;
				if (users.deliveryData.length === 0) {
					itemData.value = [];
				}
				if (users.istabChange || !users.isInput) {
					itemData.value = res.data.items;
					store.commit('user/setIstabChange', false);
				} else {
					itemData.value = itemData.value.concat(res.data.items);
				}

				pages.value = res.data.pages;
				// 存储列表数据
				store.commit('user/setDeliveryData', itemData.value);
				if (Number(res.data.pages) === pageNum.value) {
					loadMore.value.status = 'noMore';
				}
			} else {
				itemData.value = [];
			}
			// 有搜索数据的时候隐藏最近查询标题和清除按钮
			if (itemData.value.length > 0) {
				isClear.value = true;
			}
		}
	});
};
const getSelected = array => {
	selected.value = array;
};
// 选项框点击事件，参数是数据的下标
const checkbox = index => {
	emit('checkbox', index);
};
// 删除弹层
const handleOpen = (e, id) => {
	// 阻止事件冒泡
	e.stopPropagation();
	emit('handleOpen', id);
};
// 取消详情页
const handleDetails = (e, id) => {
	// 阻止事件冒泡
	e.stopPropagation();
	// 把任务id用vuex的方法存储，方便其他页面调用
	store.commit('user/setTaskId', id);
	// 由于取件详情地址和派件详情地址样式一致，所以用类型  1取件，2派件区分开
	store.commit('user/setTaskType', 1);
	// 已取件\已取消\去派件\已签收\详情页用的是一个,所以用类型status声明  1:待取件，2:已取件,3:已取消,4:待派件,5:已签收
	// 用vuex保存状态,因为当从详情页返回列表页的时候要显示对应的tab列表项
	store.commit('user/setTaskStatus', 3);
	// 进入详情页
	uni.redirectTo({
		url: '/pages/details/waybill'
	});
};
//把数据、方法暴漏给父组件
defineExpose({
	getList,
	getSearchList
});
</script>
