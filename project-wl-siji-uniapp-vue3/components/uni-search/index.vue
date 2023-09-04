<template>
	<!-- 公用nav -->
	<view class="navBox">
		<view class="search">
			<!-- 头部自定义导航 -->
			<uni-nav-bar right-text="取消" @clickRight="handleCancel">
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
					<input confirm-type="search" class="nav-bar-input" type="text" v-model="searchVal" placeholder="输入运单号/手机号/姓名查询" @confirm="handleSearch" @input="handleSearch" />
					<view class="scanIcon" @click="handleQr"></view>
				</view>
			</uni-nav-bar>
			<!-- end -->
		</view>
	</view>
	<!-- end -->
</template>

<script setup>
import { ref } from 'vue';
// ------定义变量------
const emit =defineEmits(['handleSearch'])  //子组件向父组件事件传递
const searchVal =ref('')
// -----方法------
// 取消搜索
const handleCancel=()=>{
	searchVal.value = ''
}
// 搜索
const handleSearch=()=>{
	emit('handleSearch',searchVal)
}
// 扫二维码
const handleQr =()=>{

}
</script>
