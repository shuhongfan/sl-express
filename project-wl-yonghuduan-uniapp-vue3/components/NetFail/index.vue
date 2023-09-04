<template>
	<view class="net-fail">
		<image src='../../static/net-fail.png' class="net-fail-image"/>
		<p class="tips">请检查网络</p>
		<div class="btn" @click="handleTo">重新加载</div>
	</view>
</template>

<script setup>
	// 获取父组件值、方法
	const props = defineProps({
		handleToRefresh: { //用于自定义跳转
			type: Function
		}
	})
	//重新加载
	const handleTo = () => {
		props.handleToRefresh()
	}
</script>

<style src="./index.scss" lang="scss" scoped></style>
