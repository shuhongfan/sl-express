<!-- 订单列表 - 已完成、待提货、在途的详情页面中使用 -->
<template>
	<view class="orderCont">
		<view class="search">
			<uni-icons class="searchIcon" @click="search()" type="search"></uni-icons>
			<input type="text" class="searchInput" @input="onKeyInput"  @confirm="search" confirm-type="search"  placeholder="请输入运单号" />
		</view>
		<view class="items">
			<view class="item" v-for="item in itemData">
				<text class="odd">{{item.id}}</text> 
				<text class="piece">{{item.count}} 件</text> 
				<text class="weight">{{item.totalWeight}} kg</text>
			</view>
		</view>
	</view>
</template>
<script setup >	
import { ref } from 'vue'
// 获取父组件值、方法
const props = defineProps({
	itemData: {
		type: Object,
		default: () => {}
	},
	searchHandle: {
		type: Function(),
		default: () => {}
	}
});

const emit = defineEmits(['searchHandle']);

// 订单号
const orderId = ref('')

// 搜索按钮
const search = ()=>{
	if(orderId.value == ''){
		uni.showToast({
			title: '请输入运单号',
			duration: 1000,
			icon: 'none'
		});
		return 
	}
	emit('searchHandle', orderId.value)
}
// 输入值记录到orderId
const onKeyInput = (event) => {
	orderId.value = event.detail.value
}
 
</script>

<style src="../index.scss" lang="scss"></style>
