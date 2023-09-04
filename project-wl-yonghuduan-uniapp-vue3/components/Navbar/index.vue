<!-- 头部导航组件 -->
<template>
	<view class="NavBar" :style="{'height':all}">
		<view class="title" :style="{'paddingTop':capsuleTop+'px',height:capsuleHeight+'px'}">
			{{title}}
			<image :src='src' @click="handleTo" class="navbar-image"></image>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		nextTick,
		watch,
		computed
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	// 获取父组件值、方法
	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		handleToLink:{//用于自定义跳转
			type:Function
		},
		src:{
			type: String,
			default: '../../static/goBack.png',
		}
	})
	//设备栏高度
	let deviceNavHeight = ref()
	//胶囊顶部距离头部的距离
	let capsuleTop = ref()
	//胶囊底部距离头部的距离
	let capsuleBottom = ref()
	//导航栏高度
	let all = ref()
	//胶囊高度
	let capsuleHeight = ref()
	onLoad(() => {
		uni.getSystemInfo({
			success: (res) => {
				deviceNavHeight.value = res.statusBarHeight
				capsuleTop.value = uni.getMenuButtonBoundingClientRect().top
				capsuleBottom.value = uni.getMenuButtonBoundingClientRect().bottom
				all.value = (capsuleTop.value + capsuleBottom.value - deviceNavHeight.value) + 'px'
				capsuleHeight.value = uni.getMenuButtonBoundingClientRect().height
			}
		})
	})

	//头部导航跳转
	const handleTo = () => {
		if(props.handleToLink){
			props.handleToLink()
		}else{
			uni.navigateBack()
		}
		
	}
</script>

<style src="./index.scss" lang="scss" scoped></style>
