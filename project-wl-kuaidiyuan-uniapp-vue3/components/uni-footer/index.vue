<template>
	<!-- 公用底部 -->
	<view class="footBox">
		<view class="uni-tabbar">
			<view class="tabbar-item" :class="currentPage === index ? 'active' : ''" v-for="(item, index) in tabbar" :key="index" @tap="changeTab(item, index)">
				<view v-if="true" class="uni-tabbar__bd">
					<view class="uni-tabbar__icon" v-if="item.pagePath !== ''">
						<img v-if="currentPage === index" class="item-img" :src="item.selectedIconPath" />
						<img v-else class="item-img" :src="item.iconPath" />
					</view>
					<view v-else class="qrCode"><img :src="item.iconPath" /></view>
				</view>
				<view class="uni-tabbar__label" v-if="item.text !== ''">{{ item.text }}</view>
			</view>
		</view>
	</view>
	<!-- end -->
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
// 获取父组件值、方法
const props = defineProps({
	pagePath: {
		type: String,
		default: ''
	}
});
// ------定义变量------
const store = useStore();//vuex获取储存数据
const currentPage = ref(store.state.footStatus);  //获取储存的当前tab状态
let tabbar = ref([
	{
		pagePath: '/pages/index/index',
		iconPath: 'static/home.png',
		selectedIconPath: 'static/homeActive.png',
		text: '首页'
	},
	{
		pagePath: '/pages/pickup/index',
		iconPath: 'static/collect.png',
		selectedIconPath: 'static/collectActive.png',
		text: '取件'
	},
	{
		pagePath: '',
		iconPath: 'static/qrcode.png',
		selectedIconPath: 'static/qrcode.png',
		text: ''
	},
	{
		pagePath: '/pages/delivery/index',
		iconPath: 'static/delivery.png',
		selectedIconPath: 'static/deliveryActive.png',
		text: '派件'
	},
	{
		pagePath: '/pages/my/index',
		iconPath: 'static/user.png',
		selectedIconPath: 'static/userActive.png',
		text: '我的'
	}
]);
// ------方法------
// 触发tab事件
const changeTab = (item, index) => {
	store.commit('user/setFilterOverTime',null);
	if (item.text !== '') {
		currentPage.value = index;
		store.commit('setFootStatus', index);
		// 因为取件、派件数据列表存在了vuex里面，切换tab时为了避免有沉余的数据，所以触发tab的时候先清空下数据
		store.commit('user/setDeliveryData', []);
		store.commit('user/setTabIndex', 0);
		store.commit('user/setTaskStatus', 0);
		store.commit('user/setDetailType', 0);
		
		store.commit('user/setNewType',null)
		// 页面跳转
		uni.redirectTo({
			url: item.pagePath,
			success: e => {},
			fail: () => {}
		});
	}else{
		uni.showToast({
			title: '程序员哥哥正在实现中',
			duration: 1000,
			icon: 'none'
		});
	}
};
</script>
