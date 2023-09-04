<!-- 系统通知 -->
<template>
		<!-- 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度-->
		<scroll-view scroll-y="true" class="scrollSet">
			<!-- 列表 -->
			<view class=" newBox">
				<scroll-view scroll-y="true" :style="{ height: scrollH + 'px' }" v-if="itemData.length>0">
					<view class="systemList">
						<view class="boxBg item" v-for="(item, index) in itemData" :key="index">
							<view class="tit" :class="item.isRead === 0 ? 'active' : ''">
								您有一个新的运输任务
								<icon></icon>
							</view>
							<view class="address" v-html="item.content"></view>
							<view class="time">
								<text> {{item.created}}</text>
								<button class="uni-btn redBtn" @click="handleDetail(item)">查看详情</button>
							</view>
						</view>
					</view>
					<view style="height: 50rpx;">
						<!-- 下面的加载更多有问题 先占位 -->
					</view>
				</scroll-view>
				<view v-else><EmptyPage :emptyData="emptyData"></EmptyPage></view>
			</view>
		</scroll-view>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import { taskTimeFormat } from '@/utils/index.js';
// 接口 api
import { getNewList, msgRead, msgAllRead } from '@/pages/api/news.js';
// 导入组件
//空页面
import EmptyPage from '@/components/EmptyPage/index.vue';
// 下拉提示
import ReachBottom from '@/components/reach-bottom/index.vue';
// ------定义变量------
const pages = getCurrentPages(); //获取加载的页面，获取当前页面路由信息uniapp 做安卓不支持 vue-router
const currentPage = pages[pages.length - 1].$page.options; //获取当前页面的对象
const title = currentPage.title; //nav标题
const type = currentPage.type; //当前派件类型
const loadMore = ref(); //定义子组件的ref,可以调取子组件的值
const emptyData = ref('暂无消息');
const rithtText = ref('全部已读');
let pageNumber = ref(1);
let pageSize = ref(10);
let totalPage = ref(0);
let reload = ref(false);
let scrollH = ref(null); //滚动高度
let currentPageData = ref([]);
let itemData = ref([]);
let ids = ref([])
// 监听上拉触底事件
onReachBottom(() => {
	totalPage.value = Math.ceil(itemData.value.length / pageSize.value); //计算总页数
	totalPage.value = totalPage.value == 0 ? 1 : totalPage.value;
	if (pageNumber.value >= totalPage.value) {
		loadMore.value.status= 'noMore';
		
		return false;
	} else {
		loadMore.value.status = 'loading';
		let times = setTimeout(() => {
			pageNumber.value++;
			let begin = (pageNumber.value - 1) * pageSize.value;
			let end = pageNumber.value * pageSize.value;
			currentPageData.value = [...currentPageData.value, ...itemData.value.slice(begin, end)];
		}, 1000); //因为接口没做分页，所以做了数据分页处理，这里延时一秒在加载方法有个loading效果
	}
});

// ------生命周期------
onMounted(() => {
	getList();
});

// ------定义方法------
const params = ref({
	contentType: '201',
	page: 1, 
	pageSize: 10
})
// 获取系统通知列表
const getList = async () => {
	await getNewList(params.value)
	.then(res => {
		if (res.code === 200) {
			itemData.value = res.data.items;
		}
	})
	.catch(err => {
		return uni.showToast({
			title: err.msg,
			duration: 1000,
			icon: 'none'
		});
	});
};
// 进入详情，标记已读
const handleDetail = async item => {
	await msgRead(item.id)
		.then(res => {
			uni.navigateTo({
				url: '/pages/message/details?obj=' + JSON.stringify(item)
			});
		})
		.catch(err => {
			
			return uni.showToast({
				title: err.msg,
				duration: 1000,
				icon: 'none'
			});
		});
};
// 全部已读 - 功能暂未实现
const handleAll = async () => {
	itemData.value.map(val => {
		if(val.isRead===0){
			ids.value.push(val.id);
		}
	});
	await msgAllRead(ids.value)
		.then(res => {
			getList(type)
		})
		.catch(err => {
			return uni.showToast({
				title: err.msg,
				duration: 1000,
				icon: 'none'
			});
		});
};
// 返回上一页
const goBack = () => {
	uni.redirectTo({
		url: '/pages/news/index?tabIndex=1'
	});
};
</script>

<style src="./../index.scss" lang="scss"></style>
