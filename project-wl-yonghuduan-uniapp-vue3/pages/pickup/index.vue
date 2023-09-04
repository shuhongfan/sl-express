<!-- 取件页面 -->
<template>
	<view class="pickup">
		<!-- 搜索nav -->
		<SearchPage @handleSearch="handleSearch"></SearchPage>
		<!-- end -->
		<view class="boxTop" :style="{'paddingTop':capsuleBottom +'px'}">
			<!-- tab切换 -->
			<UniTab :tabBars="tabBars" ref="tab" @getTabIndex="getTabIndex" :staticNum="staticNum.data"></UniTab>
		</view>
		<!-- 运单列表 -->
		<OrderList ref='orderListRef' :serchValue="serchValue" @stopRefresh="stopRefreshFunc"></OrderList>
	</view>
	<!-- end -->
</template>

<script setup>
	import {
		ref,
		reactive,
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';

	// 基本数据
	import {
		DeliveryData
	} from '@/utils/commonData.js';
	import {
		getGoodsNum
	} from '@/pages/api/order.js'
	// 导入组件
	// 搜索组件
	import SearchPage from '@/components/uni-search/index.vue';
	// tab切换
	import UniTab from '@/components/uni-tab/index.vue';
	//运单列表
	import OrderList from './components/orderList';
	// 筛选

	const emit = defineEmits(''); //子组件向父组件事件传递
	const tab = ref();
	const tabBars = DeliveryData;
	let tabIndex = ref(0); //当前tab
	let staticNum = reactive({
		data: [0, 0]
	})
	// 存储已选内容， 因为这个列表是增删很频繁的，所以选用map而不是数组，key对应的是数据的下标。至于value存放什么，完全由自己定
	let selected = reactive(new Map());
	let orderListRef = ref() //列表组件引用
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
	let serchValue = ref()//头部搜索栏的关键字
	// ------生命周期------
	onShow(() => {
		getStaticNum()
		orderListRef.value && getTabIndex(tabIndex.value)
	});
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
	// ------定义方法------

	// 搜索
	const handleSearch = (index) => {
		serchValue.value = index.value
		orderListRef.value.indexGetOrderListFunc({
			keyword: index.value
		}) //触发子组件获取列表数据的方法
	};
	// 获取寄件和收件的数量
	const getStaticNum = () => {
		getGoodsNum().then((res) => {
			if(res.code === 200){
				staticNum.data = [res.data['1'],res.data['2']]
			}
		})
	}

	// 获取tab切换当前的index
	const getTabIndex = index => {
		tabIndex.value = index 
		orderListRef.value.indexGetOrderListFunc({
			mailType: index + 1,
		}) //触发子组件获取列表数据的方法
	};
</script>
<style src="../../styles/expressage.scss" lang="scss" scoped></style>
<style src="./index.scss" lang="scss" scoped></style>
