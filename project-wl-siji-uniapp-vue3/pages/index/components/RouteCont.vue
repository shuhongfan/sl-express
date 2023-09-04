<!-- 运算路线 -->
<template>
	<view class="routeItem" >
		<view class="routeLine"> 
			<view class="routePoint">
				<view class="tit"> <text>{{itemData.startProvince}}</text> </view>
				<view class=""> <text>{{itemData.startCity}}</text> </view> 
			</view> 
			<view class="route">
				<view class="line" style="">
					<image class="LineImg" src="../../../static/sj_route_line.png" mode=""></image>
				</view> 
			</view> 
			<view class="routePoint">
				<view class="tit"> <text>{{itemData.endProvince}}</text> </view>
				<view class=""> <text>{{itemData.endCity}}</text> </view> 
			</view> 
		</view>
		<view class="navigat" v-if="type == 'navigation'">
			<image class="naviIcon" src="../../../static/sj_navigation.png" mode=""></image>
			<view class="" @click="() => openMap(itemData.startAddress,itemData.endAddress, '开始导航')">
				<text>开始导航</text>
			</view>
		</view>
	</view>	
</template>
<script setup >
import { openMap } from '@/utils/index.js'	
// 获取父组件值、方法
const props = defineProps({
	type: {
		type: String,
		default: 'navigation'
	},
	itemData: {
		type: Object,
		default: () => {}
	}
});
</script>

<style src="../index.scss" lang="scss"></style>
