<template>
	<!-- 公用nav -->
	<view class="navBox" >
		<view class="search ">
			<!-- 头部自定义导航 -->
			<view class="uni-navbar" :style="{'paddingTop':capsuleTop +'px'}">
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
					<input
						confirm-type="search"
						class="nav-bar-input"
						type="text"
						v-model="searchVal"
						placeholder="请输入快递单号"
						@confirm="handleSearch"
						@input="handleSearch"
					/>
					<icon type="clear" size="14" v-if="searchVal" @click="handleCancel"></icon>
				</view>
				</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
const props = defineProps({
	isShowCancel:{
		type:Boolean,
		default: false
	}
})
// ------定义变量------
const emit = defineEmits('handleSearch'); //子组件向父组件事件传递
const searchVal = ref('');
//胶囊顶部距离头部的距离
	let capsuleTop = ref()
// -----方法------
	onLoad(() => {
		uni.getSystemInfo({
			success: (res) => {
				capsuleTop.value = uni.getMenuButtonBoundingClientRect().top

			}
		})
	})
// 取消搜索
const handleCancel = () => {
	searchVal.value = '';
	emit('handleSearch', searchVal);
};
// 搜索
const handleSearch = (e) => {
	searchVal.value =e.detail.value
	emit('handleSearch', searchVal);
};
// 扫二维码
const handleQr = () => {};
</script>
<style src="./index.scss" lang="scss" scoped></style>