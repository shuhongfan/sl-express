<template>
	<!-- 公用 详情Nav -->
	<view class="detailsHead">
		<view class="head">
			<!-- 详情页-返回头部 -->
			<image style="width: 88rpx; height: 88rpx;" src="@/static/sj_back.png" @click="backHandle()" mode=""></image>
			<view class="title">{{title}}</view>
			<!-- end -->
		</view>
	</view>
	<!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
// 获取父组件值、方法
const props = defineProps({
	title: {
		type: String,
		default: ''
	}
});
// ------定义变量------
const searchVal = ref('');
// ------方法------
// 返回上一页
const backHandle = () => {
	uni.navigateBack({
		delta: 1,
	})
}
</script>
<style lang="scss" scoped>
	@import url(@/styles/theme.scss);
	// 导航
	.detailsHead {
		.head{
			padding-top: 10rpx;
			/* #ifdef APP-PLUS */
			padding-top: 44rpx;
			/* #endif */
			background-color: var(--neutral-color-white);
			display: flex;
			justify-content: space-between;
			text-align: center;
			.title{
				flex: 1;
				padding-right:90rpx;
				line-height: 88rpx;
				font-weight: 600;
				font-size: 36rpx;
				color: #2A2929;
			}
		}
	}
</style>
