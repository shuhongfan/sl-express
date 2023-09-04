<!-- 付款方式弹窗 -->
<template>
	<view class="payType">
		<uni-popup ref="popup" type="bottom" :safe-area="false">
			<view class="headers">
				<view class="header-title">付款方式</view>
				<view class="close" @click="handleCancel"></view>
			</view>
			<view class="contents">
				<view class="content-item" v-for="(item,index) in list" :key="index" @click="handleChangePayType(item)">
					<view class="left-content">
						<view class="title">{{item.title}}</view>
						<view class="subTitle">{{item.subTitle}}</view>
					</view>
					<view class="right-content">
						<view class="checkbox" :class="{active:item.value===payType}"></view>
					</view>
				</view>
			</view>
			<view class="footers" @click="handleCancel">
				<view class="btn">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
	} from 'vue';
	const emits = defineEmits(["@getPayType"]);
	const popup = ref()
	const payType = ref(1)
	const list = reactive([
		{
			title:'寄付',
			subTitle:'快递员取件时，寄方可在线支付、扫快递员收款码进行支付',
			value:1
		},
		{
			title:'到付',
			subTitle:'快递签收后，收方可通过扫快递员收款码进行支付',
			value:2
		}
	])
	//选择付款方式
	const handleChangePayType =(item)=>{
		payType.value = item.value
	}
	// 打开弹层
	const handleOpen = () => {
		popup.value.open('bottom');

	};
	// 关闭弹层
	const handleCancel = () => {
		popup.value.close('bottom');
		emits('getPayType',payType.value)
	}
	// 暴漏给父组件
	defineExpose({
		handleOpen
	});
</script>

<style lang="scss" src='./payType.scss' scoped></style>



