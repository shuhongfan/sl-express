<template>
	<view class="goodsInfo-box">
		<!-- 头部导航栏 -->
		<nav-bar title='物品信息'></nav-bar>
		<view class="goods-info" :class="{isAll:isShow}">
			<!-- 物品名称搜索组件 -->
			<GoodsSeach :isShowOther="isShowOther" @getGoodsInfo="getGoodsInfo"></GoodsSeach>
			<!-- 预估重量 -->
			<WeightAndVolume v-if="!isShow" @getWeight="getWeight" @getVolume="getVolume"></WeightAndVolume>
			<!-- 底部 -->
			<view class="footer" v-if="!isShow">
				<view class="btn" :class="isActive?'active':''" @click="confirm">确定</view>
			</view>
		</view>
	</view>

</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		computed
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	import GoodsSeach from './components/goodsSearch.vue'
	import WeightAndVolume from './components/weightAndVolume.vue'
	const weight = ref(1)
	const volume = ref('')
	const goods = reactive({
		info: {}
	})
	const store = useStore(); //vuex获取、储存数据
	const users = store.state.user
	const isShow = ref(false)
	let isAlways = ref()
	onMounted(() => {
		goods.info = users.goodsInfo
	})
	const isActive = computed(() => {
		return Boolean(users.goodsInfo.name)
	})
	const isShowOther = (flag, type) => {
		if (type === 'always') {
			isAlways.value = true
		}
		isShow.value = type === 'always' ? true : flag
	}
	//子组件传出来填写的重量的值
	const getWeight = (value, ) => {
		weight.value = value
		store.commit('user/setWeight', value)
	}
	//子组件传出来填写的体积的值
	const getVolume = (value, long, width, height) => {
		volume.value = value
		store.commit('user/setLong', long)
		store.commit('user/setWidth', width)
		store.commit('user/setHeight', height)
		store.commit('user/setVolume', value)
	}
	//子组件传出来填写的物品的值
	const getGoodsInfo = (value) => {
		goods.info = value
		store.commit('user/setGoodsInfo', value)
	}

	const confirm = () => {
		if (!goods.info.name) {
			return uni.showToast({
				title: '请选择物品',
				duration: 1000,
				icon: 'none'
			})
		}
		uni.redirectTo({
			url: '/pages/express-delivery/index?isFromGoods=true'
		});
	}
</script>

<style src="./components/weightAndVolume.scss" lang="scss"></style>
<style lang="scss" src='./components/goodsSearch.scss'></style>
<style lang="scss" src='./index.scss'></style>
