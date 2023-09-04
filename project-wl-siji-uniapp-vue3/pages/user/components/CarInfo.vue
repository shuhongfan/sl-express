<!-- 车辆信息 -->
<template>
	<!-- end -->
	<view class="carInfo">
		<image class="carImage" src="@/static/sj_demo_carImg.jpg" mode=""></image>
		<view class="info">
			<view class="line">
				<text class="tit">车辆编号</text><text>{{data.id}}</text>
			</view>
			<view class="line">
				<text class="tit">车辆号牌</text><text>{{data.licensePlate}}</text>
			</view>
			<view class="line">
				<text class="tit">车型</text><text>{{data.truckType}}</text>
			</view>
			<view class="line">
				<text class="tit">载重</text><text>{{data.allowableLoad}}吨</text>
			</view>
		</view>
	</view>	
	<!-- end -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCarInfo } from '@/pages/api/user.js';

// ------定义变量------
const data = ref({});
// 生命周期 获取车辆信息
onMounted(async () => {
	await getCarInfo()
		.then(res => {
			if (res.code == 200) {
				if (res.data == null){
					return false
				}
				data.value = res.data
			} else {
				return uni.showToast({
					title: data.msg,
					duration: 1000,
					icon: 'none'
				});
			}
		})
		.catch(err => {});
})
</script>

<style lang="scss" scoped>
	.carInfo{
		padding: 30rpx;
		.carImage{
			width: 100%;
			border-radius: 16rpx;
		}
		.info{
			background: var(--neutral-color-white);
			border-radius: 20rpx;
			padding:40rpx;
			margin-top: 24rpx;
			font-size: var(--font-size-14);
			.line{
				display: flex;
				justify-content: space-between;
				line-height: 80rpx;
				color: var(--neutral-color-main);
				.tit{
					color: var(--neutral-color-font);
				}
			}
		}
	}
</style>
