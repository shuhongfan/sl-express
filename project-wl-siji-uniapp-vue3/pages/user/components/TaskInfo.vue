<!-- 月度任务信息 -->
<template>
	<view class="teskInfo">
		<view class="title" v-if="title">
			<text> - 本月任务 - </text>
		</view>
		<view class="info">
			<view class="cl" >
				<view class="num">{{data.taskAmounts}}</view>
				<view class="title">任务总量</view>
			</view>
			<view class="cl">
				<view class="num">{{data.completedAmounts}}</view>
				<view class="title">完成任务量</view>
			</view>
			<view class="cl" >
				<view class="num">{{data.transportMileage}}</view>
				<view class="title">运输里程(km)</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 导航
import UniNav from '@/components/Nav/index.vue';

const props = defineProps({
	title: { // 是否展示标题  两个地方用一个有一个没用
		type: Boolean,
		default: true
	},
	data: { // 任务数据
		type: Object,
		default:{}
	}
});
</script>

<style lang="scss" scoped>
	.teskInfo{
		text-align: center;
		position: relative;
		z-index: 1;
		top: -180rpx;
		background: var(--neutral-color-white);
		border-radius: 16rpx;
		padding: 26rpx 48rpx;
		.title{
			padding-bottom: 20rpx;
		}
		.info{
			display: flex;
			text-align: center;
			justify-content: space-between;
			line-height: 48rpx;
			color: var(--neutral-color-main);
			.cl{
				flex: 1;
				.num{
					line-height: 100rpx;
					font-weight: 600;
					font-size: var(--font-size-18);
				}
				.title{
					font-size: var(--font-size-12);
				}
			}
			
		}
	}
</style>