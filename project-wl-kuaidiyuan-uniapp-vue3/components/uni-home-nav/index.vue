<template>
	<!-- 公用nav -->
	<view class="navBox">
		<view class="nav-bg">
			<!-- 头部自定义导航 -->
			<view class="headBg"></view>
			<uni-nav-bar>
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
					<input confirm-type="search" class="nav-bar-input" type="text" v-model="searchVal" placeholder="输入四位或完整运单号/手机号、姓名" @confirm="handleSearch" @tap="handleSearch"/>
				</view>
				<view slot="right">
					<view class="rightText">
						<view @click="handleNew">
							<uni-badge class="uni-badge-left-margin" :class="newVal > 9 ? 'big' : ''" :text="newVal" absolute="rightTop" size="small">
								<view class="box"><text class="box-text"></text></view>
							</uni-badge>
							<view class="newInfo">消息</view>
						</view>
					</view>
				</view>
			</uni-nav-bar>
			<!-- end -->
		</view>
	</view>
	<!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
// 获取父组件值、方法
const props = defineProps({
	newVal: {
		type: Number,
		default: ''
	}
});
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
const searchVal = ref('');
// ------方法------
const handleSearch = e => {
	// 跳转到搜索页面
	uni.redirectTo({
		url: '/pages/search/index'
	});
};
// 去消息页
const handleNew = e => {
	store.commit('user/setTaskStatus',null)
	store.commit('user/setDetailType', 0);
	uni.redirectTo({
		url: '/pages/news/index'
	});
};
</script>
<style lang="scss" scoped>
@import url(@/styles/theme.scss);
// 导航
.nav-bg {
	::v-deep .uni-navbar__header-btns-left,
	::v-deep .uni-navbar__header-btns-right {
		display: none !important;
	}
	// 重置首页搜索图标样式
	::v-deep .uni-icons {
		background: url(@/static/search.png) 50% 50% no-repeat;
		background-size: contain;
	}
	// 重置首页搜索placeholder样式
	::v-deep .uni-input-placeholder {
		color: #f9c5c0;
	}
	// 重置首页搜索input样式
	::v-deep .uni-input-input {
		background: rgba(250, 250, 250, 0.24);
		color: #f9c5c0;
	}
	.uni-badge-absolute {
		margin-left: 40px;
	}
	.rightText {
		text-align: center;
		padding-left: 18rpx;
	}
	.box {
		width: 34rpx;
		height: 34rpx;
		background: url(@/static/icon012.png) no-repeat;
		background-size: contain;
	}

	.box-text {
		text-align: center;
		color: var(--neutral-color-white);
		font-size: 12px;
	}
	::v-deep .uni-badge--error {
		background: var(--neutral-color-white);

		font-size: 18rpx;
		color: #f25c4d;
		left: 18rpx !important;
		top: -3px !important;
		width: 26rpx !important;
		height: 26rpx;
		line-height: 26rpx;
		border-radius: 50%;
	}
	.big {
		::v-deep .uni-badge--error {
			width: 44rpx !important;
			border-radius: 11rpx;
		}
	}
	.newInfo {
		color: var(--neutral-color-white);
		font-size: 20rpx;
		line-height: 20rpx;
	}
}
</style>
