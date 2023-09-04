<template>
	<scroll-view scroll-x="true" class="tabScroll" :scroll-into-view="scrollinto" :scroll-with-animation="true">
		<view class="scroll-row">
			<view v-for="(item, index) in tabBars" :key="index" :id="'tab' + index" class="scroll-row-item" @click="changeTab(index)">
				<view :class="tabIndex == index ? 'scroll-row-item-act' : 'scroll-row-item-normal'">
					<text class="line"></text>
					{{item.label}}
					<view class="num">{{staticNum[index]}}</view>
				</view>
			
			</view>
		</view>
	</scroll-view>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
// 获取父组件数据
const props = defineProps({
	tabBars:{
		type:Object,
		default:() => ({})
	},
	staticNum:{
		type:Object
	}
})
// ------定义变量------
const emit = defineEmits(''); //子组件向父组件事件传递
const scrollinto = ref('tab0'); //tab切换
let tabIndex = ref(0); //当前tab
// ------定义方法------
// tab选项卡切换轮播
const changeTab = index => {
	// 点击的还是当前数据的时候直接return
	if (tabIndex.value == index) {
		return;
	}
	tabIndex.value = index;
	emit('getTabIndex',index)
	// 滑动
	scrollinto.value = 'tab' + index;
};
//把数据、方法暴漏给父组件
defineExpose({
	changeTab
});
</script>

<style>
</style>