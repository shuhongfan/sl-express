<!-- 消息页面 -->
<template>
	<!-- 自定义头部 -->
	<view class="navHead"></view>
	<!-- end -->

	<!-- 列表 -->
	<view class="pageBox newBox">
		<!-- 搜索列表 -->
		<scroll-view scroll-x="true" class="tabScroll" :scroll-into-view="scrollinto" :scroll-with-animation="true">
			<view v-for="(item, index) in tabBars" :key="index" :id="'tab' + index" class="scroll-row-item" >
				<view :class="tabIndex == index ? 'scroll-row-item-act' : ''" @click="changeTab(index)">
					<text class="line"></text>
					{{ item }}
				</view>
			</view>
		</scroll-view>
		<!--  滑块内容 对应的是顶部选项卡的切换 :current="tabIndex"  设置的是y方向上可以滚动-->
		<view class="homeSwiper">
				<!-- 公告 -->
				<Announcement v-show="tabIndex == 0" ref="announcement"></Announcement>
				<!-- end -->
				<!-- 系统通知 -->
				<Notification v-show="tabIndex == 1" ref="notificat" @getTabIndex="getTabIndex"></Notification>
				<!-- end -->
			<!-- </swiper> -->
		</view>
		<!-- end -->
	</view>
	<!-- footer -->
	<UniFooter :pagePath="'pages/index/index'" ></UniFooter>
	<!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import {taskTimeFormat} from '@/utils/index.js';
// 导入组件
// 导航组件
//空页面
import EmptyPage from '@/components/EmptyPage/index.vue';
// 下拉提示
import ReachBottom from '@/components/reach-bottom/index.vue'
// 公告列表
import Announcement from './components/announcement.vue';
// 系统通知
import Notification from './components/notification.vue';
// 底部导航
import UniFooter from '@/components/Footer/index.vue';
// ------定义变量------
const announcement = ref()//定义ref
const notificat = ref()
const title = ref('消息'); //nav标题
const emptyInfo = ref('- 没有找到相关内容 -');
const tabBars = reactive(['公告', '系统通知']);
let scrollinto = ref('tab0'); //tab切换
let tabIndex = ref(1); //当前tab
let scrollH = ref(0); //滚动高度

// ------生命周期------
onMounted(() => {
	// init()
	// 获取屏幕信息
	uni.getSystemInfo({
		success: res => {
			scrollH.value = res.windowHeight - uni.upx2px(630);
		}
	});
});
// ------定义方法------
const init = () => {
	getList()
};

// tab选项卡切换轮播
const changeTab = index => {
	// 点击的还是当前数据的时候直接return
	if (tabIndex.value == index) {
		return;
	}
	// 触发tab切换接口
	if(index===0){
		announcement.value.getList()
	}else{
		// notificat.value.getOjb()
	}
	tabIndex.value = index;
	// 滑动
	scrollinto.value = 'tab' + index;
};

// 触发选项卡事件
const onChangeSwiperTab = e => {
	changeTab(e.detail.current);
};
// 获取子组件传来的tabindex
const getTabIndex =(val)=>{
	tabIndex.value = val
}
// 返回上一页
const goBack = () => {
	uni.redirectTo({
		url: '/pages/index/index'
	});
};
</script>

<style src="./index.scss" lang="scss"></style>
