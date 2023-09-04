<!-- 基本信息 - 已完成详情、在途详情、待提货详情 -->
<template>
	<view class="">
		<view class="baseInfo">
			<view class="addrCont">
				<view class="startAddr">{{itemData.startAddress}}</view>
				<view class="endAddr">{{itemData.endAddress}}</view>
			</view>
			<view class="carInfo">
				<view class="line"> <text>任务编号</text> <text class="ritEl">{{itemData.transportTaskId}}</text> </view>
				<view class="line"> <text>联系人</text> <text class="ritEl">{{itemData.startHandover}}</text> </view>
				<view class="line"> 
					<text>联系电话</text> 
					<view class="phoneCont">
						<text class="ritEl">{{itemData.startHandoverPhone}}</text> 
						<image @click="callPhone(itemData.startHandoverPhone)" class="phone" src="../../../static/sj_phone.png" mode=""></image>
					</view>
				</view>
				<view class="line"> <text>提货时间</text> <text class="ritEl">{{itemData.planDepartureTime}}</text> </view>
				<view class="line"> <text>预计送达时间</text> <text class="ritEl">{{itemData.planArrivalTime}}</text> </view>
			</view>
		</view>
	</view>
</template>
<script setup >
// 获取父组件值、方法
const props = defineProps({
	itemData: {
		type: Object,
		default: () => {}
	}
});
// 拨打电话
const callPhone = (phone) => {
	uni.makePhoneCall({
		phoneNumber: phone
	});
}
</script>
<style src="../index.scss" lang="scss"></style>
<style lang="scss">
	.phoneCont{
		display: flex;
		align-items: center;
		.phone{
			position: relative;
			padding-left: 10rpx;
			top: -4rpx;
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>
