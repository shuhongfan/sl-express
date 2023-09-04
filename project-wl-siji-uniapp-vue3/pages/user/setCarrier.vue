<!-- 系统设置 容器页面  -->
<template>
	<!-- end -->
	<view class="userContainer">
		<DetailsNav :title="title"></DetailsNav>
		<!-- 换绑手机 -->
		<!-- <CarInfo v-if="type == 'phone'" ></CarInfo> -->
		<ChangePhon v-if="type == 'phone'" class="" />
		<!-- 修改密码 -->
		<ChangePass v-if="type == 'pass'" />
		<!-- 消息通知设置-->
		<!-- <SystmSet v-if="type == 'setMessage'" ></SystmSet> -->
		<view v-if="type == 'setMessage'" class="setMessage">
			<view class="desc"> <text>开启后，有新的任务通知你</text> </view>
			<view class="set"> 
				<text>允许给我推送任务通知</text> 
				<switch :checked='isMessage' color="#EF4F3F" @change="switchChange" />
			</view>
		</view>
	</view>	
	<!-- end -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
// 导航
import DetailsNav from '@/components/DetailsNav/index.vue';
import ChangePhon from './components/ChangePhon.vue';
import ChangePass from './components/ChangePass.vue';

// ------定义变量------
const store = useStore(); //vuex获取储存数据
const title = ref('车辆信息')
const type = ref('')
const isMessage = ref(true) // 是否允许消息通知

// 初始化信息
onMounted(() => {
	const pages = getCurrentPages(); 
	const currentPage = pages[pages.length - 1].$page.options;
	type.value = currentPage.type
	title.value = currentPage.title
	isMessage.value = store.state.isMessage
});
// 更改状态
const switchChange = function (e) {
	// 全局报错
	store.commit('setIsMessage', e.detail.value);
	// 更新当前组件状态
	isMessage.value = e.detail.value
}

</script>

<style lang="scss" scoped>
.setMessage{
	padding-top: 40rpx;
	.desc{
		font-weight: 400;
		font-size: 14px;
		color: #818181;
		padding: 20rpx 44rpx;
	}
	.set{
		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		font-weight: 400;
		font-size: 16px;
		padding: 30rpx 44rpx;
		line-height: 64rpx;
		color: #2A2929;
	}
}
</style>

