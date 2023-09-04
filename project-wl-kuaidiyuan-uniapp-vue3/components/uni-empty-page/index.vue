<template>
	<view class="emptyBox" v-if="emptyInfo!==''">{{emptyInfo}}</view>
	<view class="empty" v-else><view class="image" :class="emptyImage"></view>{{emptyData}}</view>
</template>

<script setup>
	// 获取父组件值、方法
	const props = defineProps({
		emptyInfo:{
			type:String,
			default: '',
		},
		emptyData:{
			type:String,
			default: '',
		},
		emptyImage:{
			type:String,
			default: '',
		}
	})
</script>

<style src="../../styles/common.scss" lang="scss" scoped></style>