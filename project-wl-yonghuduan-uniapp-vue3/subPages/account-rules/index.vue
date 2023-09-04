<template>
	<!-- 头部导航栏 -->
	<nav-bar title='计费规则'></nav-bar>
	<view class="account-rules">
		<view class="top">
			<view class="top-item" :key="index" v-for="(item,index) in topList">
				<view class="top-img" ></view>
				<view class="top-title">{{item.title}}</view>
				<view class="top-subTitle">{{item.subTitle}}</view>
			</view>
		</view>
		
		<view class="first-content">
			<view class="title">一、重量计算方法</view>
			<view class="content">
				托寄物的计费重量取体积重量与实际重量两者之间的较大值。体积重量的计算方法为：长(cm)x宽(cm)x高(cm)/轻抛系数。
			</view>
			<view class="content">
				1.神领即日/神领特快：同城、省内件以及经济区域内互寄(京津冀/江浙沪皖/川渝/黑吉辽)，轻抛系数为12000；省外、跨经济区域互寄，轻抛系数为6000。
			</view>
			<view class="content">
				2.神领标快：中国内地大部分流向互寄，轻抛系数为12000;中国内地其他地区与昌都市互寄、华南、华北至西藏流向，轻抛系数为6000。
			</view>
			<view class="content">
				3.神领卡航：轻抛系数为6000。
			</view>
		</view>
		
		<view class="second-content">
			<view class="title">二、计费重量小数点规则</view>
			<view class="content">
				中国内地互寄业务：10kg以下，续重以0.1kg为计重单位；10-100kg,续重以0.5kg为计重单位；100kg及以上，四舍五入取整数。其他范围的重量处理规则详细查询神领官网。
			</view>
		</view>
		
		<view class="third-content">
			<view class="title">三、总运费小数点规则</view>
			<view class="content">
				运费计算结果按四舍五入取整数值。
			</view>
		</view>
		
		<view class="fourth-content">
			<view class="content">
				以上计费规则可能因服务（产品）或所在地区不同而有所差异，详情请与当地神领快递员进行咨询。
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive
	} from 'vue';
	const topList = reactive([
		{
			title:'重量小体积小',
			subTitle:'按重量计费'
		},
		{
			title:'重量小体积大',
			subTitle:'按体积计费'
		},
		{
			title:'重量大体积大',
			subTitle:'重量体积取高计费'
		}
	])
</script>

<style src="./index.scss" lang="scss" scoped></style>