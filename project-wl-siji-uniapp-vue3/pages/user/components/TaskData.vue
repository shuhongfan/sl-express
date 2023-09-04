<!-- 车辆信息 -->
<template>
	<view class="taskData">
		<!-- 日历模块 - 使用uni的日历重写 - start -->
		<Calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @monthSwitch="monthSwitch" >
			<!-- 任务栏数据展示 -->
			<view class="taskCont">
				<TaskInfo :title="false" :data="taskData" class="task" />
			</view>
		</Calendar>
		<!-- 日历模块 - start -->
	</view>	
</template>

<script setup>
// 模块、接口导入
import { ref,reactive, onMounted } from 'vue';
import TaskInfo from './TaskInfo.vue'
import Calendar from './Calendar/components/uni-calendar/uni-calendar.vue'
// 请求API
import { getTaskData } from '@/pages/api/user.js';
// ------定义变量------
// 日历的展示数据
const info = reactive({
	lunar: true,
	range: true,
	insert: false,
	selected: []
})
const taskData = ref({})
// 生命周期
onMounted(()=>{
	const date = getDate(new Date())   
	getTask({year: date.year, month: date.month});
    // 配置任务日历展示订单数量的数据处理 - 等日历展示处理后添加数据
	setTimeout(() => {
		info.date = getDate(new Date(),-30).fullDate
		info.startDate = getDate(new Date(),-60).fullDate
		info.endDate =  getDate(new Date(),30).fullDate
		info.selected = info.selected
	}, 1000)
})
// 获取任务数据
async function getTask(params){
	await getTaskData(params)
	.then(res => {
		if (res.code == 200) {
			const { data } = res
			// 任务数据赋值
			taskData.value = data
			// 日历中任务数量显示数据处理
			info.selected = data.dailyMileage.map((n)=>{
				if (getDate(n.dateTime).fullDate !=  getDate(new Date()).fullDate){
					return {date: getDate(n.dateTime).fullDate, info: n.mileage}
				}
			}).filter(n => n != undefined)
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

// 通过左右箭头(和确认)改变月份 从新请求数据
function monthSwitch(e) {
	getTask(e)
}
// 日期处理
function getDate(date, AddDayCount = 0) {
	if (!date) {
		date = new Date()
	}
	if (typeof date !== 'object') {
		date = date.replace(/-/g, '/')
	}
	const dd = new Date(date)
    // 获取AddDayCount天后的日期
	dd.setDate(dd.getDate() + AddDayCount) 
	const y = dd.getFullYear()
	// 获取当前月份的日期，不足10补0
	const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 
	// 获取当前几号，不足10补0
	const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() 
	return {
		fullDate: y + '-' + m + '-' + d,
		year: y,
		month: m,
		date: d,
		day: dd.getDay()
	}
}
</script>

<style lang="scss" >
	.taskCont{
		position: relative;
		margin-bottom: 40rpx;
		.task{
			top: 0;
			border-radius: 0;
		}
	}
</style>