<!-- 我的首页 -->
<template>
	<!-- start -->
	<view class="userContainer">
		<!-- 我的信息 -->
		<view class="topbackground">
			<view class="myInfo">
				<image src="@/static/sj_userIcon.png" class="userIcon" mode=""></image>
				<text class="title">{{userInfo.name}}</text>
				<text>司机编号：{{userInfo.number}}</text>
				<text>手机号：{{userInfo.phone}}</text>
			</view>
		</view>
		<view class="container">
			<!-- 本月任务信息 -->
			<TaskInfo :data="taskData" />
			<!-- end -->
			<!-- 取件状态列表 -->
			<view class="navList">
				<view class="line" @click="goDetails(`/pages/user/carrier?type=carInfo&title=车辆信息`)">
					<text>车辆信息</text>
					<image class="icon" src="../../static/sj_open_rit.png" mode=""></image>
				</view>
				<view class="line" @click="goDetails(`/pages/user/carrier?type=taskData&title=任务数据`)">
					<text>任务数据</text>
					<image class="icon" src="../../static/sj_open_rit.png" mode=""></image>
				</view>
				<view class="line" @click="goDetails(`/pages/user/carrier?type=systmSet&title=系统设置`)">
					<text>系统设置</text>
					<image class="icon" src="../../static/sj_open_rit.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
	<!-- footer -->
	<UniFooter :pagePath="'pages/index/index'"></UniFooter>
	<!-- end -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 导航
import UniNav from '@/components/Nav/index.vue';
// 任务详情组件
import TaskInfo from './components/TaskInfo.vue';
// 底部导航
import UniFooter from '@/components/Footer/index.vue';
// 请求API
import { getTaskData, getUserInfo } from '@/pages/api/user.js';
// ------定义变量------
// 任务数据
const taskData = ref({})
// 车辆详细
const userInfo = ref({})

// 生命周期 - 获取任务、用户数据
onMounted(()=>{
	getUser()
	getTask()
})
// 获取用户信息
async function getUser (){
	await getUserInfo()
	.then(res => {
		if (res.code == 200) {
			userInfo.value = res.data
		} else {
			return uni.showToast({
				title: data.msg,
				duration: 1000,
				icon: 'none'
			});
		}
	})
	.catch(err => {});
}
// 获取任务信息
async function getTask(){
	const date = new Date()
	const params = {
		year: date.getFullYear(),
		month: date.getMonth()+1 < 9 ? `0${date.getMonth()+1}` : date.getMonth()+1
	}
	await getTaskData(params)
	.then(res => {
		if (res.code == 200) {
			taskData.value = res.data
		} else {
			return uni.showToast({
				title: data.msg,
				duration: 1000,
				icon: 'none'
			});
		}
	})
	.catch(err => {});
}
// 去往其他页面
function goDetails(url){
	uni.navigateTo({
		url
	})
}

</script>

<style src="./index.scss" lang="scss" scoped></style>
