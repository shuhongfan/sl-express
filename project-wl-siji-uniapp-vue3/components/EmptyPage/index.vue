<template>
	<view class="emptyBox">
		<image src="../../static/sj_nodata.png" class="emptyImage" mode=""></image>
		<view><text>{{emptyInfo}}</text></view>
	</view>
</template>

<script setup>
	// 获取父组件值、方法
	const props = defineProps({
		emptyInfo:{
			type:String,
			default: '',
		}
	})
</script>


<style>
	@import url('@/styles/theme.scss');
	.emptyBox{
		padding: 288rpx 0 80rpx;
		text-align: center;
		color: var(--neutral-color-font);
		font-size: var(--font-size-12);
	}
	.emptyImage {
	  width: 400rpx !important;
	  height: 240rpx !important;
	}
</style>