<template>
	<view class="filtrateBox">
		<view class="item" @click="handleTab(index)" v-for="(item, index) in itemData" :key="index" :class="isActive === index||(item==='超时任务'&&users.filterOverTime) ? 'onHover' : ''">
			<text>{{ item }}</text>
			<icon class="up" :class="isActive === index && isSelect ? 'hover' : ''" v-if="index !== 2"></icon>
			<icon class="down" :class="isActive === index && !isSelect ? 'hover' : ''" v-if="index !== 2"></icon>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
// 获取父组件数据
const props = defineProps({
	tabBars: {
		type: Object,
		default: () => ({})
	}
});
// ------定义变量------
const store = useStore(); //设置、获取储存的数据
const users = store.state.user;
const emit = defineEmits()
const itemData = ref(['距离', '时间', '超时任务']);
let isActive = ref(-1); //当前触发tab样式
let isSelect = ref(); //排序箭头的样式 true:升,false:降
// ------定义方法------

// tab切换
const handleTab = index => {
	isActive.value = index; //当前tab值
	isSelect.value = !isSelect.value; //当前tab 上下箭头选中样式
	store.commit('user/setIsFiltrate',true)
	store.commit('user/setIstabChange',true)
	store.commit('user/setFilterOverTime',false);
	// 距离排序,给后端传的距离排序值  1升序，2降序
	if (index === 0) {
		let val = null
		if (isSelect.value) {
			val = 1;
		} else {
			val = 2;
		}
		
		store.commit('user/setOrderDistance',val)  //储存，方便父组件使用
		store.commit('user/setFilterOverTime',null)  //储存，清除时间排序值
		store.commit('user/setOrderTime',null)  //储存，清除超时值
	} else if (index === 1){
		//时间排序,给后端传的时间排序值  1升序，2降序
		let val = null
		if (isSelect.value) {
			val = 1;
		} else {
			val = 2;
		}
		store.commit('user/setOrderTime',val)  //储存，方便父组件使用
		store.commit('user/setOrderDistance',null)  //储存，清除距离排序值
		store.commit('user/setFilterOverTime',null)  //储存，清除超时值
	}else{
		store.commit('user/setFilterOverTime',true)  //储存，方便父组件使用
		store.commit('user/setOrderTime',null)  //储存，清除时间排序值
		store.commit('user/setOrderDistance',null)  //储存，清除距离排序值
	}
	
	emit('getList')
};
</script>
