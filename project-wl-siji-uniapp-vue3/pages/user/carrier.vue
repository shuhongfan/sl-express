<!-- 我的-主页 -->
<template>
	<!-- end -->
	<view class="userContainer">
		<DetailsNav :title="title"></DetailsNav>
		<!-- 车辆信息 -->
		<CarInfo v-if="type == 'carInfo'" ></CarInfo>
		<!-- 任务数据 -->
		<TaskData v-if="type == 'taskData'" ></TaskData>
		<!-- 系统设置-->
		<SystmSet v-if="type == 'systmSet'" ></SystmSet>
	</view>	
	<!-- end -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 导航
import DetailsNav from '@/components/DetailsNav/index.vue';
import CarInfo from './components/CarInfo.vue';
import TaskData from './components/TaskData.vue';
import SystmSet from './components/SystmSet.vue';

// ------定义变量------
const title = ref('车辆信息')
const type = ref('')
// 生命周期中的一些 初始化信息
onMounted(() => {
	const pages = getCurrentPages(); 
	const currentPage = pages[pages.length - 1].$page.options;
	type.value = currentPage.type;
	title.value = currentPage.title;
});

</script>

<style lang="scss" scoped>
	.carInfo{
		
	}
</style>

