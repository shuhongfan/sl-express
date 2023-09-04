<template>
	<!-- 公用nav -->
	<view class="navBox">
		<view class="nav-bg">
			<!-- 头部自定义导航 -->
			<text>任务</text>
			<!-- end -->
		</view>
	</view>
	<!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
// 获取父组件值、方法
const props = defineProps({
	newVal: {
		type: String,
		default: ''
	}
});
// ------定义变量------
const searchVal = ref('');
// ------方法------
const handleSearch = e => {
	// 跳转到搜索页面
	uni.navigateTo({
		url: '/pages/search/index'
	});
};
</script>
<style lang="scss" scoped>
	@import url(@/styles/theme.scss);
	// 导航
	.nav-bg {
		background-image: linear-gradient(205deg, #f25c4d 2%, #e52d21 100%, #e52d21 100%);
		line-height: 80rpx;
		text-align: center;
		color:var(--neutral-color-white);
		::v-deep .uni-navbar__header-btns-left,
		::v-deep .uni-navbar__header-btns-right {
			display: none !important;
		}
		// 重置首页搜索图标样式
		::v-deep .uni-icons {
			background: url(@/static/search.png) 50% 50% no-repeat;
			background-size: contain;
		}
		// 重置首页搜索placeholder样式
		::v-deep .uni-input-placeholder {
			color: #f9c5c0;
		}
		// 重置首页搜索input样式
		::v-deep .uni-input-input {
			background: rgba(250, 250, 250, 0.24);
			color: #f9c5c0;
		}
		.uni-badge-absolute {
			margin-left: 40px;
		}
		.rightText {
			text-align: center;
			padding-left: 28rpx;
		}
		.box {
			width: 34rpx;
			height: 34rpx;
			// background: url(@/static/icon012.png) no-repeat;
			background-size: contain;
		}
	
		.box-text {
			text-align: center;
			color: var(--neutral-color-white);
			font-size: 12px;
		}
		::v-deep .uni-badge--error {
			height: 24rpx;
			line-height: 24rpx;
			background: var(--neutral-color-white);
			border-radius: 11rpx;
			font-size: 18rpx;
			color: #f25c4d;
			right: -18px !important;
			top: -3px !important;
		}
		.newInfo {
			color: var(--neutral-color-white);
			font-size: 20rpx;
			line-height: 20rpx;
		}
	}
</style>
