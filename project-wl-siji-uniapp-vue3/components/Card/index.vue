<template>
	<!-- 公用卡片 -->
	<view class="card" @click="goDetailsSucc()">
		<view class="topCont"> <text>任务编号：{{item.transportTaskId}}</text> <text v-if="item.isDelay == 1 && type == 0" class="label">已延期</text> </view>
		<view class="addrCont">
			<view class="startAddr">{{item.startAddress}}</view>
			<view class="endAddr">{{item.endAddress}}</view>
		</view>
		<view class="botCont" v-show="type == 0">
			<view class="timeCont">
				<view class="tit"> <text>提货时间</text> </view>
				<view class="time"> <text>{{item.planDepartureTime}}</text> </view>
			</view>
			<view class="ButCont"> 
				<text class="butRed" v-if="item.enablePickUp" @click="goDetails(item)" >提货</text>
				<text class="butRed butDis" v-else >提货</text>
			</view>
		</view>
		<view class="botCont" v-show="type == 1">
			<view class="timeCont">
				<view class="tit"> <text>预计到达时间 </text> </view>
				<view class="time"> <text>{{item.planArrivalTime}}</text> </view>
			</view>
			<view class="ButCont" v-if="item.status <= 3 "> <text class="butRed" @click="goDetails(item)" >交付</text> </view>
			<view class="ButCont" v-if="item.status == 4 "> <text class="butRed" @click="goDetails(item)" >回车登记</text> </view>
		</view>
		<view class="botCont " v-show="type == 2">
			<view class="timeCont finish">
				<view class="tit"> <text>交货时间</text> </view>
				<view class="time"> <text>{{item.actualArrivalTime}}</text> </view>
			</view>
		</view>
	</view>
	<!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
// 获取父组件值、方法
const props = defineProps({
	data: {
		type: Object,
		default: () => {}
	},
	type: {
		type: Number,
		default: 0
	},
	src:{
		type: String,
		default: ''
	}
});

const item = ref({...props.data})

// 去往详情页
function goDetails(item){
	if(props.src){
		uni.navigateTo({
			url: props.src,
			success: function(res) {
			    // 通过eventChannel向被打开页面传送数据
				res.eventChannel.emit('acceptDataFromOpenerPage', { data: item })
			}
		});
	}
}
// 已完成详情 
function goDetailsSucc(){
	if (props.src && props.type == 2){
		uni.navigateTo({
			url: props.src,
			// success: function(res) {
			//     // 通过eventChannel向被打开页面传送数据
			// 	res.eventChannel.emit('acceptDataFromOpenerPage', { data: item })
			// }
		});
	}
}
</script>
<style lang="scss" scoped>
@import url(@/styles/theme.scss);	
.card{
		padding: 30rpx 40rpx;
		margin: 30rpx 0;
		border-radius: 20rpx;
		background: var(--neutral-color-white);
		.topCont{
			display: flex;
			justify-content: space-between;
			font-weight: 500;
			line-height: 60rpx;
			font-size: 32rpx;
			color: #2A2929;
			margin-bottom: 20rpx;
			.label{
				display: inline-block;
				padding: 16rpx 10rpx 12rpx 10rpx;
				border: 2rpx solid #EF4F3F;
				border-radius: 6rpx;
				font-weight: 400;
				font-size: 28rpx;
				line-height: 28rpx;
				color: #EF4F3F;
				letter-spacing: 0.32rpx;
			}
		}
		.addrCont{
			font-weight: 400;
			font-size: 28rpx;
			color: #818181;
			letter-spacing: 0.32rpx;
			padding-bottom: 40rpx;
			margin-bottom: 20rpx;
			border-bottom:  1px solid #EEEEEE;
			position: relative;
			&:before{
				position: absolute;
				left: 18rpx;
				color:var(--neutral-color-white);
				text-align: center;
				content: '';
				display: inline-block;
				width: 0px;
				height: 56%;
				border-left: dashed 2px #D9D9D9;
				border-radius: 11px;
			}
			.startAddr{
				padding-left: 66rpx;
				position: relative;
				margin-bottom: 20rpx;
				line-height: 44rpx;
				&:before{
					position: absolute;
					font-size: 22rpx;
					left: 0;
					color:var(--neutral-color-white);
					text-align: center;
					content: '起';
					display: inline-block;
					width: 22px;
					height: 22px;
					background: #2A2929;
					border-radius: 11px;
				}
			}
			.endAddr{
				padding-left: 66rpx;
				position: relative;
				line-height: 44rpx;
				// height: 44rpx;
				// overflow: hidden;
				&:before{
					font-size: 22rpx;
					position: absolute;
					left: 0;
					color: var(--neutral-color-white);
					text-align: center;
					content: '止';
					display: inline-block;
					width: 22px;
					height: 22px;
					background: #EF4F3F;
					border-radius: 11px;
				}
			}
		}
		.botCont{
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.timeCont{
				.tit{
					font-weight: 400;
					font-size: 28rpx;
					margin-bottom: 20rpx;
					color: #818181;
				}
				.time{
					font-size: 28rpx;
					color: #2A2929;
				}
			}
			.finish{
				display: flex;
				align-items: center;
				.tit{
					margin-bottom: 0;
					margin-right: 18rpx;
				}
			}
			.butRed, .butDis{
				display: inline-block;
				min-width: 80px;
				line-height: 32px;
				background: #EF4F3F;
				border-radius: 16px;
				font-size: var(--font-size-14);
				text-align: center;
				color: var(--neutral-color-white)
			}
			.butDis{
				background: #DEDEDE;
			}
			.butAsh{
				display: inline-block;
				min-width: 80px;
				line-height: 32px;
				background: #EF4F3F;
				border-radius: 16px;
				text-align: center;
				color: var(--neutral-color-white)
			}
		}
	}
</style>
