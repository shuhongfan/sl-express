<!-- 公告 -->
<template>
		<!-- 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度-->
		<scroll-view scroll-y="true" @scrolltolower="lower">
			<view v-if="itemData.length > 0">
				<view class="boxCon">
					<view class="tabConList">
						<view class="item" v-for="(item, index) in itemData" :key="index">
							<view @click="handleClick(item)">
								<view class="text" :class="item.isRead===0 ? 'active' : ''">
									<icon></icon>
									{{ item.title }}
								</view>
								<text class="time">{{ item.created }}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 暂时先不做，后期做 -->
				<!-- <ReachBottom v-if="loading" :loadingText="loadingText"></ReachBottom> -->
			</view>

			<!-- 无数据显示 -->
			<view v-else>
				<EmptyPage :emptyInfo="emptyData"></EmptyPage>
			</view>
			<!-- end -->
		</scroll-view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { taskTimeFormat } from '@/utils/index.js';
// 接口api
import { getNewList, msgRead } from '@/pages/api/news.js';
// 导入组件
//空页面
import EmptyPage from '@/components/EmptyPage/index.vue';
// 下拉提示
import ReachBottom from '@/components/reach-bottom/index.vue';
// ------定义变量------
let loadingText = ref('');
let loading = ref(false);
let itemData = ref([]); //列表数据
const emptyData = '暂无数据'
// 获取父组件数据
const props = defineProps({
	scrollH: {
		type: Number,
		default: 0
	}
});
// ------定义变量------
const emit = defineEmits(['handleSearch']); //子组件向父组件事件传递
// ------生命周期------
onMounted(() => {
	init();
});
// ------定义方法------
const init = () => {
	getList();
};
// 请求参数
const params = ref({
	contentType: '200',
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
const dataAdd = () => {
	this.loadingText = '没有更多了';
	this.loading = true;
};
// 下拉加载
const lower = () => {
	loadingText.value = '数据加载中...';
	loading.value = true;
	dataAdd();
};
// 标记已读
const handleClick = async item => {
	await msgRead(item.id)
};
//把数据、方法暴漏给父组件
defineExpose({
	getList
});
</script>
<style>
	
</style>
