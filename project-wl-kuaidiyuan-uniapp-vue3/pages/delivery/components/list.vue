<template>
		<!-- 待派件 -->
		<DealParcel ref="dealparcel" :tabIndex="tabIndex" :isAdmin="isAdmin" @checkbox="checkbox" @getSelected="getSelected" :searchInfo="searchInfo"></DealParcel>
		<!-- end -->
		<!-- 已签收 -->
		<AlreadyParcel ref="already" :tabIndex="tabIndex" :isAdmin="isAdmin" @checkbox="checkbox" :searchInfo="searchInfo"></AlreadyParcel>
		<!-- end -->
	<!-- 提示窗示例 -->
	<UniPopup ref="popup" :tipInfo="tipInfo" @handleClick="handleClick"></UniPopup>
	<!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { getTimeDate } from '@/utils/index.js';
import { useStore } from 'vuex';
//接口
import { getDeliveryList, taskDelete } from '@/pages/api/index.js';
// 导入组件
// 待派件
import DealParcel from './components/dealParcel.vue';
// 已签收
import AlreadyParcel from './components/alreadyParcel.vue';
// 弹层
import UniPopup from '@/components/uni-popup/index.vue';

// 获取父组件数据
const props = defineProps({
	// tab切换数据
	tabBars: {
		type: Object,
		default: () => ({})
	},
	tabIndex: {
		type: Number,
		default: 0
	},
	// 是否触发管理按钮
	isAdmin: {
		type: Boolean,
		default: false
	},
	// 获取当前筛选的距离升序还是降序
	orderDistance: {
		type: Number,
		default: 0
	},
	// 获取当前筛选的时间升序还是降序
	orderTime: {
		type: Number,
		default: 0
	},
	// 获取当前筛选超时
	filterOverTime: {
		type: Number,
		default: 0
	}
});
// ------定义变量------
const emit = defineEmits(''); //子组件向父组件事件传递
const store = useStore(); //设置、获取储存的数据
const users = store.state.user;
let popup = ref();
let dealparcel = ref();
let already = ref();
let cancel = ref();
const tipInfo = ref('确定要删除吗？');
let taskId = ref('');
let scrollH = ref(0); //滚动高度
let searchInfo = reactive({
	keyword:null,
	status:null,
	taskType:null
});
// ------生命周期------
onMounted(() => {
	// 获取屏幕信息
	uni.getSystemInfo({
		success: res => {
			scrollH.value = res.windowHeight;
		}
	});
});
// ------定义方法------
// 获取初始值
const init = () => {
};
// 获取已经选的任务
const getSelected=(array)=>{
	emit('getSelected',array)
}
// 获取待派件列表方法
const dealPList =()=>{
	dealparcel.value.getList()
}
// 搜索待派件列表方法
const dealSearchList = () => {
	dealparcel.value.getSearchList();
};
// 获取已签收列表方法
const alreadList =()=>{
	already.value.getList()
}
// 搜索已签收列表方法
const alreadSearchList = () => {
	already.value.getSearchList();
};
// 确认删除
const handleClick = async () => {
	await taskDelete(taskId.value)
		.then(res => {
			if (res.code === 200) {
				dealparcel.value.getList()
				return uni.showToast({
					title: '删除成功!',
					duration: 1000,
					icon: 'none'
				});
			}
		})
};
//左右滑动tab切换
const onChangeSwiperTab = e => {
	emit('onChangeSwiperTab', e);
};
// 选项框点击事件，参数是数据的下标
const checkbox = index => {
	emit('checkbox', index);
};
// 删除弹层id
const handleOpen = id => {
	popup.value.dialogOpen();
	taskId.value = id;
};

//把数据、方法暴漏给父组件
defineExpose({
	dealPList,
	dealSearchList,
	alreadList,
	alreadSearchList,
	searchInfo
});
</script>
