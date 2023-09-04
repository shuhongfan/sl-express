<!-- 底部按钮 -->
<template>
	<view class="BtnFooter">
		<view class="btn" :class="isActive?'active':''" @click="handleClick">{{btnText}}</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
	} from 'vue';
	defineProps({
		btnText:{
			type: String,
			default: '确定',
		},
		isActive:{
			type: Boolean,
			default: false,
		}
	})
	const emits = defineEmits(["@confirm"]);
	
	const handleClick = ()=>{
		emits('confirm')
	}
</script>

<style src="./index.scss" lang="scss" scoped></style>