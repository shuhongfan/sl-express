<!-- 物品类型弹窗页面 -->
<template>
	<view class="goodsSearch">
		<!-- 头部 -->
		<view class="searchBox-title">
			<view class="title">
				物品名称
				<view class="label"></view>
			</view>
			<view class="stopSend" @click="openForbidGoodsDialog">
				禁寄物品
				<view class="gantanhao"></view>
			</view>
		</view>
		<!-- 搜索框 -->
		<view class="seachBox" v-if="!isSelectedGoods">
			<uni-search-bar :cancelButton='isFocus && searchValue?"none":"auto"' :focus="isFocus" placeholder="请输入搜索内容"
				v-model="searchValue" @blur="blur" @focus="focus" @input="input" @cancel="cancel" @clear="clear">
				<template v-slot:searchIcon>
					<view class="search-icon"></view>
				</template>
			</uni-search-bar>
			<view class="search-btn" @click="userDefined" v-if="searchValue && isFocus">确定</view>
		</view>

		<!-- 最近寄件 -->
		<view class="recent-send-goods" v-if='!isSelectedGoods && recentSendList.data.length && !isInput'>
			<view class="title">最近寄件</view>
			<view class="recent-send-list">
				<view class="recent-send-item" v-for="(item,index) in recentSendList.data" :key='index'
					@click="handleClick(item)">
					{{item.name}}{{item.goodsType?'('+item.goodsType.name+')':''}}
				</view>
			</view>
		</view>
		<!-- 选择的物品 -->
		<view class="selected-goods" v-if="isSelectedGoods">
			<view class="goods" @click.prevent="handleSelectedGoods">
				<image src='../../../static/shanchu-after.png' @click.stop="handleCancelGood"></image>
				{{goods.info.name}}{{goods.info.goodsType?'('+goods.info.goodsType.name+')':""}}
			</view>


		</view>

		<!-- 热门寄件 -->
		<view class="hot-send-goods" v-if='!isSelectedGoods && !isInput && isFocus'>
			<view class="title">热门寄件</view>
			<view class="recent-send-list">
				<view class="recent-send-item" v-for="(item,index) in hotSendList.data" :key='index'
					@click="handleClick(item)">
					{{item.name}}{{item.goodsType?'('+item.goodsType.name+')':''}}
				</view>
			</view>
		</view>

		<!-- 模糊查询出的列表 -->
		<view class="search-list" v-if="isInput">
			<view class="seatch-list-item" @click="handleClick(item)" v-for="(item,index) in dimSearchList.data"
				:key="index">
				<view class="label">{{item.name}}</view>
				<view class="classify">{{item.name}}{{item.goodsType?'('+item.goodsType.name+')':''}}</view>
			</view>
		</view>

		<!-- 禁寄物品弹窗 -->
		<uni-popup ref="popup" type="bottom" :safe-area="false">
			<view class="title">禁止寄递物品目录</view>
			<view class="content">
				1.枪支(含仿制品、主要零部件)弹药。
			</view>
			<view class="content">
				2．管制器具。如匕首、三棱刮刀、带有自锁装置的弹簧刀(跳刀)、弩、催泪器等。
			</view>
			<view class="content">
				3.爆炸物品。如炸药、雷管、导火索、烟花、鞭炮、摔炮、拉炮、砸炮等。
			</view>
			<view class="content">
				4.压缩和液化气体及其容器。如氢气、甲烷、乙烷、乙炔、打火机、氯气、压缩氧气、氮气等。
			</view>
			<view class="content">
				5.易燃液体。如汽油、柴油、煤油、桐油、丙酮、乙醚、油漆、生漆、苯、酒精、松香油等。
			</view>
			<view class="content">
				6.易燃固体、自燃物质、遇水易燃物质。如红磷、硫磺、固体酒精、火柴、活性炭等。
			</view>
			<view class="content">
				7.氧化剂和过氧化物。如高锰酸盐、高氯酸盐、氧化氢、双氧水等。
			</view>
			<view class="content">
				8.毒性物质。如砷、砒霜、汞化物、铊化物、氰化物、硒粉、苯酚、汞、剧毒农药等。
			</view>
			<view class="content">
				9.生化制品、传染性、感染性物质。如病菌、炭疽、寄生虫、排泄物、医疗废弃物、尸骨、动物器官等。
			</view>
			<view class="content">
				10.放射性物质。如铀、钴、镭、钚等。
			</view>

			<view class="btn" @click="closeForbidGoodsDialog">知道了</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
	} from 'vue';
	import {
		usualGoodsList,
		goodsList
	} from '@/pages/api/order.js'
	import {
		useStore
	} from 'vuex';
	const store = useStore(); //vuex获取、储存数据
	const users = store.state.user
	const emits = defineEmits(["@getGoodsInfo"]);
	const props = defineProps({
		isShowOther: {
			type: Function,
			required: true
		},
	})
	const goods = reactive({
		info: {}
	})
	const isSelectedGoods = ref(false) //是否选择了物品
	const popup = ref()
	const searchValue = ref('')
	const isFocus = ref(false) //是否搜索框为聚焦状态
	const isInput = ref(false) //是否搜索框为输入状态
	const isUpload = ref(true) //是否输入框加载完毕
	//模糊查询出的列表数据
	const dimSearchList = reactive({
		data: []
	})
	//热门寄件物品
	const hotSendList = reactive({
		data: []
	})

	const recentSendList = reactive({
		data: [],
	})

	onMounted(() => {
		getData()
	})

	const getData = () => {
		usualGoodsList({
			name: ''
		}).then((res) => {
			if (res.data) {
				hotSendList.data = res.data.slice(0, 6)
			}
		}).catch((err) => {
			uni.showToast({
				title: '网络异常',
				duration: 2000,
				icon: 'none'
			});
		})
		isSelectedGoods.value = users.goodsInfo.name
		if (isSelectedGoods.value) goods.info = users.goodsInfo

		goodsList().then((res) => {
			if (res.data) {
				recentSendList.data = res.data.slice(0, 5)
			}
		}).catch((err) => {
			uni.showToast({
				title: '网络异常',
				duration: 2000,
				icon: 'none'
			});
		})
	}
	const handleSelectedGoods = () => {
		searchValue.value = goods.info.name
		isFocus.value = true
		isInput.value = true
		isSelectedGoods.value = false
		dimSearch(searchValue.value)
		props.isShowOther(true, 'always')
	}
	//模糊查询列表数据
	const dimSearch = (key) => {
		if (!isUpload.value) return
		isUpload.value = false
		usualGoodsList({
			name: key
		}).then((res) => {
			dimSearchList.data = res.data
			isUpload.value = true
		})
	}

	const input = (e) => {
		isFocus.value = e ? true : false
		isInput.value = Boolean(e)
		if (!isUpload.value) return
		searchValue.value = e
		dimSearch(e)
		props.isShowOther(e ? true : false)
	}
	const cancel = () => {
		isInput.value = false
		props.isShowOther(false)
	}
	const clear = () => {
		props.isShowOther(true)
	}
	const blur = () => {
		console.log('blur')
	}
	const focus = () => {
		isFocus.value = true
		props.isShowOther(true)
	}

	//用户自定义的物品
	const userDefined = () => {
		goods.info = {
			name: searchValue.value
		}
		isSelectedGoods.value = Boolean(searchValue.value)
		props.isShowOther(false)
		emits('getGoodsInfo', {
			name: searchValue.value
		})
		isFocus.value = false
	}
	//取消物品选择
	const handleCancelGood = () => {
		goods.info = {}
		store.commit('user/setGoodsInfo', {})
		emits('getGoodsInfo', {})
		isSelectedGoods.value = false
		searchValue.value = ''
		isFocus.value = false
		isInput.value = false
	}

	//点击标签物品
	const handleClick = (item) => {
		searchValue.value = item.value
		isFocus.value = true
		goods.info = item
		isSelectedGoods.value = true
		isInput.value = false
		props.isShowOther(false)
		emits('getGoodsInfo', item)
	}

	//打开禁寄物品弹窗
	const openForbidGoodsDialog = () => {
		popup.value.open('bottom');
	}

	//关闭禁寄物品弹窗
	const closeForbidGoodsDialog = () => {
		popup.value.close();
	}
</script>

<style lang="scss" scoped src='./goodsSearch.scss'></style>
