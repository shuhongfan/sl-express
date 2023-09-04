<template>
	<view class="dateBox uniPopup">
		<view class="item">
			<!-- 由于需求改动，这块日期展示效果先不用 -->
			<!-- <view class="date" @change="handleDate">
				<icon class="dateIcon"></icon>
				<text>{{ getNow(dates) }}</text>
				<icon class="next"></icon>
			</view> -->
			<uni-datetime-picker type="date" :clear-icon="false" @change="handleDate">
				<view class="date">
					<icon class="dateIcon"></icon>
					<text>{{ dates }}</text>
					<icon class="next"></icon>
				</view>
			</uni-datetime-picker>
		</view>
		<view class="item" :class="isTmClick ? 'red' : ''" @click="hanleDay(0)">
			<text :class="!isToday ? 'gray' : ''">明天</text>
		</view>
		<view class="item" :class="isAtClick ? 'red' : ''" @click="hanleDay(1)">
			<text :class="!isToday ? 'gray' : ''">后天</text>
		</view>
		<!-- 由于需求改动，这块日期展示效果先不用 -->
		<!-- <view class="datePopupBox">
			<uni-popup ref="popup" type="bottom" background-color="#fff">
				<view class="popup-content">
					<view class="tit">
						<view @click="handleCancel('bottom')">取消</view>
						<view>选择开始日期</view>
						<view @click="handleComplete">完成</view>
					</view>
					<view class="date-select">
						<picker-view class="picker-view" :value="defaultValue" :indicator-style="indicatorStyle" @change="bindChange">
							<picker-view-column>
								<view class="item" v-for="(item, index) in monthData.value" :key="index">
									<text @click="handleGetNow(index)">{{ getNow(item) }}</text>
								</view>
							</picker-view-column>
						</picker-view>
					</view>
				</view>
			</uni-popup>
		</view> -->
	</view>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
// 获取封装好的方法
import { getTate, getNow, getDay, afterTomorrowDay, tomorrowDay, getMonthDay } from '@/utils/index.js';
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
const emit = defineEmits();
const popup = ref(); //定义弹层ref
let dates = ref(); //当前日期
let isPreExceed = ref(false); //触发前一天是否超过30天
let isNextExceed = ref(false); //触发后一天是否超过30天
const monthData = reactive([]); //时间数组
const indicatorStyle = ref(`height: 100rpx;`);
let defaultValue = ref([0]); //时间默认选择为数组第一个值
let times = ref(null); //触发的事件选择
let dateTime = ref(null); //时间选择筛选
// let isTomorrow = ref(false); //是否触发了明天、后台按钮，用来判断日期弹层是否要显示当前日期，如果触发了今天、后天，那么弹层显示的时候应该显示当前的日期
// 监听触发前一天、后一天按钮，向前后者向后超过当前日期30天的日期，按钮置灰
let isToday = ref(true); //如果是当天，明天后天可以触发
// let dayArr = reactive(['明天', '后天']);
let isActive = ref(null); //定义明后天的当前样式
const isTmClick = ref(false); //触发明天
const isAtClick = ref(false);//触发后天
watch(dates, (newValue, oldValue) => {
	isToday.value = getNow(newValue) === getNow(new Date());
	const obj = getMonthDay(newValue);
	// 前一天按钮置灰
	if (obj.timeNow === obj.timeStar) {
		isPreExceed.value = true;
	}
	// 后一天按钮置灰
	if (obj.timeNow === obj.timeEnd) {
		isNextExceed.value = true;
	}
	// 弹层选择的时间和当前时间显示一致
	monthData.value.map((val, index) => {
		if (getTate(obj.timeNow) === val) {
			defaultValue.value = [index];
		}
	});
	// 传递当前筛选的时间
	if (users.timeData) {
		emit('getDateTime', getTate(users.timeData));
		dates.value = users.timeData;
	} else {
		emit('getDateTime', getTate(obj.timeNow));
	}
});
// ------生命周期------
onMounted(() => {
	dates.value = getTate(new Date()); //获取当前日期
	monthData.value = getDay(); //获取当月的所有日期
});
// ------定义方法------

// 触发今天、明天
const hanleDay = index => {
	if (isToday.value) {
		if (index === 0) {
			isAtClick.value = false
			isTmClick.value =!isTmClick.value
			store.commit('user/setTimeData', tomorrowDay());
			emit('getDateTime', getTate(tomorrowDay()));
			if (!isTmClick.value) {
				store.commit('user/setTimeData', getTate(new Date()));
				emit('getDateTime', getTate(getTate(new Date())));
			}
			// isTomorrow.value = true;
		} else {
			isTmClick.value = false
			isAtClick.value =!isAtClick.value
			store.commit('user/setTimeData', afterTomorrowDay());
			emit('getDateTime', getTate(afterTomorrowDay()));
			if (!isAtClick.value) {
				store.commit('user/setTimeData', getTate(new Date()));
				emit('getDateTime', getTate(getTate(new Date())));
			}
			// isTomorrow.value = true;
		}
	}
};
// 时间弹层
const handleDate = type => {
	times.value = type;
	handleComplete();
	// // 由于需求改动，以日历形式展现，以下先不用
	// if (isTomorrow.value) {
	// 	monthData.value.map((val, index) => {
	// 		if (getTate(new Date()) === val) {
	// 			defaultValue.value = [index];
	// 		}
	// 	});
	// }
	// isTomorrow.value = false;
	// popup.value.open(type);
};
// // 由于需求改动，以日历形式展现，以下先不用
// // 选择时间
// const bindChange = e => {
// 	// 时间筛选
// 	times.value = monthData.value[e.detail.value[0]];
// };
// 完成
const handleComplete = () => {
	// 清除明后天当前样式
	isActive.value = null;
	if (times.value === dates.value) {
		isToday.value = true;
	} else {
		isToday.value = false;
	}
	if (times.value !== null) {
		dates.value = times.value;
		store.commit('user/setTimeData', times.value);

		handleCancel();
	} else {
		uni.showToast({
			title: '请选择日期',
			icon: 'none'
		});
	}
};
// // 由于需求改动，以日历形式展现，以下先不用
// const handleGetNow = num => {
// 	times.value = monthData.value[num];
// };
// 关闭弹层
const handleCancel = () => {
	popup.value.close();
};
</script>
