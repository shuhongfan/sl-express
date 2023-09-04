<!-- 去取件详情页 -->
<template>
	<!-- 自定义头部 -->
	<UniNav :title="title" @goBack="goBack"></UniNav>
	<!-- end -->
	<view class="detailBox">
		<!-- 订单号 -->
		<view class="boxBg">
			<view class="tit">
				<text>
					<text>订单号：SD{{ detailsData.orderId }}</text>

					<icon @click="handleCopy" class="copy"></icon>
				</text>
			</view>
		</view>
		<!-- end -->
		<!-- 取件信息 -->
		<Address :detailsData="detailsData" class="pickupBox"></Address>
		<!-- end -->
		<!-- 物品信息 -->
		<view class="boxBg">
			<view class="tit">
				<text>物品名称</text>
				<view class="goodsSelect" @click="handleGoods" v-if="!isPickUp || (users.paymentMethod === 2 && !isCollect)">
					<text class="textInfo">{{ detailsData.goodsType }}</text>
					<icon class="nextIcon"></icon>
				</view>
				<view class="goodsSelect" v-else>
					<text class="textInfo">{{ detailsData.goodsType }}</text>
				</view>
			</view>
		</view>
		<!-- end -->
		<!-- 计算物品快递费 -->
		<view class="boxBg">
			<GoodsInfo ref="goods" :detailsData="detailsData" @getFreight="getFreight"></GoodsInfo>
			<view class="freight">
				<view>
					总计金额
					<text>
						<text>*</text>
						基础运费+增值服务费
					</text>
				</view>
				<view>
					<view v-if="!isPickUp || (users.paymentMethod === 2 && !isCollect)">
						<input v-if="isFreigthEdit" type="number" v-model="freight" @blur="handleAmount" />
						<text @click="handleFreight" v-else>{{ detailsData.freight }}</text>
						<text>元</text>
					</view>
					<view v-else>
						<text>{{ users.payData.tradingAmount }}</text>
						<text>元</text>
					</view>
				</view>
			</view>
		</view>
		<!-- end -->
		<!-- 付款方式 -->
		<view class="boxBg">
			<view class="tit">
				<text>付款方式</text>
				<view class="goodsSelect" @click="handlePayMethod" v-if="!isPickUp || (users.paymentMethod === 2 && !isCollect)">
					<text class="textInfo">{{ detailsData.paymentMethod === 1 ? '寄付' : '到付' }}</text>
					<icon class="nextIcon"></icon>
				</view>
				<view class="goodsSelect" v-else>
					<text class="textInfo">{{ detailsData.paymentMethod === 1 ? '寄付' : '到付' }}</text>
				</view>
			</view>
		</view>
		<!-- end -->
		<!-- 备注 -->
		<view class="boxBg">
			<view class="tit">
				<text>备注</text>
				<view class="goodsSelect" @click="handleRemark" v-if="!isPickUp || (users.paymentMethod === 2 && !isCollect)">
					<text class="textInfo">{{ detailsData.remark }}</text>
					<icon class="nextIcon"></icon>
				</view>
				<view class="goodsSelect" v-else>
					<text class="textInfo">{{ detailsData.remark }}</text>
				</view>
			</view>
		</view>
		<!-- end -->
		<!-- 身份验证（未验证） -->
		<Authentication ref="card" :detailsData="detailsData"></Authentication>
		<!-- end -->
		<view class="btnBox">
			<button v-if="isPickUp && users.paymentMethod === 1" class="btn-default uni-mini" @click="handleReceipt">去收款</button>
			<button v-if="isCollect && isPickUp && users.paymentMethod === 2" class="btn-default uni-mini btn-forbid">已取件</button>
			<button v-if="!isPickUp || (users.paymentMethod === 2 && !isCollect)" class="btn-default uni-mini" @click="handleSubmit">去取件</button>
		</view>
		<!-- 物品名称、付款选择、备注弹层 -->
		<Uppop ref="method" @getGoodType="getGoodType" @getPayMethod="getPayMethod" @getRemark="getRemark" :detailsData="detailsData" :type="type"></Uppop>
		<!-- end -->
	</view>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
// 接口
import { getDetail, getPickup } from '@/pages/api/index.js';
// 导入组件
// 导航组件
import UniNav from '@/components/uni-nav/index.vue';
// 地址
import Address from './components/address.vue';
// 物品信息
import GoodsInfo from '@/components/uni-goods/index.vue';
// 身份认证
import Authentication from './components/authentication.vue';
// 付款方式先择、物品名称弹层
import Uppop from './components/uppop.vue';
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
// 定义ref 获取子组件方法或者值
const goods = ref(); //
const card = ref(); //
const method = ref(); //
const emit = defineEmits(''); //子组件向父组件事件传递
// 获取列表页传过来的id 有两种方法
// 第一种
// const pages = getCurrentPages(); //获取加载的页面，获取当前页面路由信息uniapp 做安卓不支持 vue-router
// const currentPage = pages[pages.length - 1]; //获取当前页面的对象
// 第二种 用vuexs
const taskId = store.state.user.taskId; //用vuex获取列表页传过来的任务id
const title = ref('去取件'); //nav标题
let type = ref(1); //物品名称和付款方式公用一个弹层，根据不同type值来做判断 物品:1,付款方式:2,备注:3
const detailsData = ref({}); //详情数据
let isFreigthEdit = ref(false);
let freight = ref(0); //金额
let isPickUp = ref(false); //是否去取件
let isCollect = ref(false); //到付的情况下，是否触发去取件后到，显示按钮为已取件
const stopClick = ref(true); //防止连续提交
// 监听修改金额数值，小数点后保留一位
watch(freight, (newValue, oldValue) => {
	const val = Number(newValue);
	// 最大输入99999，最小输入1
	nextTick(() => {
		if (val < 99999 && val > 1) {
			freight.value = parseInt(val * 100) / 100;
		}
		if (val > 99999) {
			freight.value = 99999;
		}
	});
});
// ------生命周期------
onMounted(() => {
	getDetails(taskId);
	//
	if (users.isPickUp) {
		isPickUp.value = true;
	} else {
		isPickUp.value = false;
	}
	//
	if (users.isCollect) {
		isCollect.value = true;
	} else {
		isCollect.value = false;
	}
});
// ------定义方法------
// 获取详情
const getDetails = async id => {
	await getDetail(id).then(res => {
		detailsData.value = res.data;
		freight.value = detailsData.value.freight;
		if (users.paymentMethod) {
			if (users.paymentMethod === 1) {
				detailsData.value.paymentMethod = 1;
			} else {
				detailsData.value.paymentMethod = 2;
			}
		}
		goods.value.weight = Number(detailsData.value.weight);
		goods.value.volume = Number(detailsData.value.volume);
		// 设置当前是到付还是寄付
		store.commit('user/setPaymentMethod', detailsData.value.paymentMethod);
		store.commit('user/setDetailsData', res.data);
	});
};

// 去取件
const handleSubmit = async () => {
	if (stopClick.value) {
		stopClick.value = false;
	// 表单校验
	const cards = card.value;
	const good = goods.value;
	// 未验证的身份证需要做校验
	if (!cards.isValidate && detailsData.value.idCardNoVerify !== 1) {
		stopClick.value = true;
		return uni.showToast({
			title: '请输入正确的身份证',
			duration: 1000,
			icon: 'none'
		});
		
		return false;
	} else {
		// 网络慢的时候添加按钮loading
		let times = 
		setTimeout(()=>{
			uni.showLoading({
				title: 'loading',
			});
		},500)
		const details = detailsData.value;

		// 要提交给后端的参数
		if (freight.value !== 0) {
			details.freight = freight.value;
		}
		const params = {
			amount: good.freightData ? good.freightData : Number(details.freight), //总额
			id: taskId, //任务id
			goodName: details.goodsType, //物品名称
			idCard: details.idCardNoVerify === 1 ? null : cards.idCard, //身份证号
			name: details.idCardNoVerify === 1 ? null : cards.name, //真实姓名
			payMethod: details.paymentMethod, //付款方式
			remark: details.remark, //备注
			volume: Number(good.volume), //体积
			weight: good.weight //重量
		};
		// 存储信息，二维码支付页面要用
		const payData = {
			memo: details.remark,
			productOrderNo: details.orderId,
			tradingAmount: params.amount
		};
		store.commit('user/setPayData', payData);

		await getPickup(params)
			.then(res => {
				if (res.code === 200) {
					// 操作成功后清除loading
					setTimeout(function () {
						uni.hideLoading();
					}, 500);
					clearTimeout(times)
					// TODO先保留次代码，后期需求可能有变更
					// // const type = details.paymentMethod;
					// // 跳转到取件成功页
					// uni.redirectTo({
					// 	url: '/pages/pay/index?type=' + type
					// });
					// store.commit('user/setIsPickUp', true);
				}
				setTimeout(()=>{
					stopClick.value = true;
				},3000)
				
			})
			.catch(err => {
				return uni.showToast({
					title: err.msg,
					duration: 1000,
					icon: 'none'
				});
			});
		const type = details.paymentMethod;

		// // 跳转到取件成功页
		uni.redirectTo({
			url: '/pages/pay/index?type=' + type
		});
		store.commit('user/setIsPickUp', true);
	}
	}
};
// 复制订单号
const handleCopy = () => {
	uni.setClipboardData({
		data: detailsData.value.orderId, // 要保存的内容
		success: function() {
			uni.showToast({
				title: '复制成功',
				icon: 'none'
			});
		}
	});
};
// 是否修改总计金额
const handleFreight = () => {
	isFreigthEdit.value = true;
};
// 获取运费金额
const getFreight = val => {
	detailsData.value.freight = val;
	freight.value = detailsData.value.freight;
};
// 输入金额是否小于1
const handleAmount = () => {
	nextTick(() => {
		if (freight.value < 1) {
			freight.value = 1;
		}
	});
};
// 物品
// 获取物品名称，获取子组件传的值
const getGoodType = val => {
	detailsData.value.goodsType = val;
};
// 物品名称
const handleGoods = () => {
	type.value = 1;
	handleOpen();
};
// 付款方式
// 获取付款方式，获取子组件传的值
const getPayMethod = val => {
	if (val === '寄付') {
		detailsData.value.paymentMethod = 1;
	} else {
		detailsData.value.paymentMethod = 2;
	}
	store.commit('user/setPaymentMethod', detailsData.value.paymentMethod);
};
// 付款方式选择
const handlePayMethod = () => {
	type.value = 2;
	handleOpen();
};
// 备注
// 获取备注内容，获取子组件传的值
const getRemark = val => {
	detailsData.value.remark = val;
};
// 打开弹层写备注
const handleRemark = () => {
	if (users.isBack !== 'collect') {
		type.value = 3;
		handleOpen();
	}
};
// 打开弹层
const handleOpen = () => {
	method.value.dialogOpen();
};
// 返回上一页
const goBack = () => {
	store.commit('user/setPaymentMethod', null);
	store.commit('user/setCardData', null);
	store.commit('user/setIsPickUp', false);
	store.commit('user/setIsCollect', false);
	if (users.newType === 301) {
		uni.redirectTo({
			url: '/pages/news/system?title=取件相关&type=301'
		});
	} else if (users.detailType === 1) {
		// 如果是从历史取派的取件列表进入的，返回的时候进入到历史取派列表
		store.commit('user/setTabIndex', 0);
		uni.redirectTo({
			url: '/pages/history/index'
		});
	} else if (users.isSearch) {
		store.commit('user/setIsSearch', false);
		uni.redirectTo({
			url: '/pages/search/index'
		});
	} else {
		store.commit('user/setTabIndex', 0);
		uni.redirectTo({
			url: '/pages/pickup/index'
		});
	}
};
// 去收款
const handleReceipt = () => {
	store.commit('user/setPayData', {});
	uni.redirectTo({
		url: '/pages/pay/scanPay'
	});
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
