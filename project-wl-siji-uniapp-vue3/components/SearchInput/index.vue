<template>
	<!-- 公用搜索框 -->
	<view class="search">
		<uni-icons class="searchIcon" @click="searchHandle()" type="search"></uni-icons>
		<input v-model="searchKey" class="searchInput" @confirm="searchHandle()" focus placeholder="请输入运单号" />
	</view>
	<!-- end -->
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	itemData: {
		inputKey: String,
		default: 'value'
	}
});

const searchKey = ref('');

const emit = defineEmits(['searchHandle'])
const searchHandle = () => {
	emit('searchHandle', searchKey.value)
}


</script>
<style lang="scss" scoped>
@import url(@/styles/theme.scss);	
.search{
		margin-bottom: 20rpx;
		position: relative;
		.searchIcon{
			position: absolute;
			left: 20rpx;
			top: 18rpx;
		}
		.searchInput{
			background-color: var(--neutral-color-cancel);
			border-radius: 32rpx;
			font-size: var(--font-size-12);
			line-height: 64rpx;
			height: 64rpx;
			padding: 0 20rpx 0 60rpx;
		}
	}
</style>
