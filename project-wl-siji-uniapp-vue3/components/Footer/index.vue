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

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'Footer',
	components: {},
	// 接收父组件的值
	props: {
		pagePath: {
			type: String,
			required: true
		}
	},
	setup: props => {
		const store = useStore();
		const page = ref('contact');
		const showPage = ref(false);
		const containerHeight = ref(400);
		const currentPage = ref(store.state.footStatus);
		// 底部列表配置   
		const tabbar = ref([
			{
				pagePath: '/pages/index/index',
				iconPath: 'static/sj_test_nor.png',
				selectedIconPath: 'static/sj_test_sel.png',
				text: '任务'
			},
			{
				pagePath: '/pages/message/index',
				iconPath: 'static/sj_mess_nor.png',
				selectedIconPath: 'static/sj_mess_sel.png',
				text: '消息'
			},
			{
				pagePath: '/pages/user/index',
				iconPath: 'static//sj_mine_nor.png',
				selectedIconPath: 'static//sj_mine_sel.png',
				text: '我的'
			}
		]);
		// 切换事件
		const changeTab = (item, index) => {
			if (item.text !== '') {
				currentPage.value = index;
				store.commit('setFootStatus', index)
				uni.redirectTo({
					url: item.pagePath,
					success: e => {},
					fail: () => {}
				});
			}
		};
		return {
			// ------变量------
			page,
			showPage,
			containerHeight,
			currentPage,
			tabbar,
			// ------方法------
			changeTab
		};
	}
};
</script>
<style lang="scss" scoped>
.tabbar {
}
</style>
