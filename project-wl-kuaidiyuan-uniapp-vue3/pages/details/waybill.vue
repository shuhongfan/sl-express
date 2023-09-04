<!-- 已取件、已签收、已取消详情页 -->
<template>
	<!-- 自定义头部 -->
	<UniNav :title="title" @goBack="goBack"></UniNav>
	<!-- end -->
	<view class="detailBox">
		<!-- 运单号 -->
		<view class="boxBg">
			<view class="tit">
				<text>
					<!-- 当状态是去派送4\签收5的时候显示运单号 -->
					<text v-if="taskStatus === 4 || taskStatus === 5">运单号：{{ detailsData.transportOrderId }}</text>
					<text v-else>订单号：SD{{ detailsData.orderId }}</text>
					<!-- end -->
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
			<view class="wayCon">
				<view class="item">
					物品名称
					<text>{{ detailsData.goodsType }}</text>
				</view>
				<view class="item">
					物品重量
					<text>{{ detailsData.weight }}kg</text>
				</view>
				<view class="item">
					物品体积
					<text>{{ detailsData.volume }}m³</text>
				</view>
				<view class="item">
					总计金额
					<text>{{ detailsData.freight }}元</text>
				</view>
			</view>
			<view class="wayCon remark">
				<view class="item">备注</view>
				<view class="item">
					<text>{{ detailsData.remark ? detailsData.remark : '暂无' }}</text>
				</view>
			</view>
			<view class="wayCon">
				<view class="item">
					付款方式
					<text>{{ detailsData.paymentMethod === 1 ? '寄付' : '到付' }}</text>
				</view>
				<!-- 当状态是已签收5,显示签收人 -->
				<view class="item" v-if="taskStatus === 5">
					签收人
					<text>{{ detailsData.paymentMethod === 1 ? '本人' : '代收' }}</text>
				</view>
				<!-- end -->
			</view>
		</view>
		<!-- end -->
		<!-- 当状态是去派件4的时候显示签收人选择、拒收、签收按钮 -->
		<view class="boxBg" v-if="detailsData.taskType === 2 && detailsData.status === 1">
			<view class="tit">
				<text>签收人</text>
				<view class="goodsSelect" v-if="(isSign && detailsData.paymentMethod == 1) || (isPickUp && detailsData.paymentMethod === 2)">
					<text class="textInfo">{{ detailsData.signRecipient === 1 ? '本人' : '代收' }}</text>
				</view>
				<view class="goodsSelect" @click="handleSignOpen" v-else>
					<text class="textInfo">{{ detailsData.signRecipient === 1 ? '本人' : '代收' }}</text>
					<icon class="nextIcon"></icon>
				</view>
			</view>
		</view>
		<!-- 		{{detailsData.status}}--{{users.isNew}}--{{taskStatus}} -->
		<!-- <view
			class="btnBox subBtnBox"
			v-if="(detailsData.status===1&&!users.isNew)||(taskStatus === 4&&!users.isNew) || (taskStatus === 0 && users.taskType === 2) || (users.detailType === 2 && taskStatus === 4) || (detailsData.status===1&&users.detailType === 2 && taskStatus === 6)"
		>
			<button v-if="(!isSign && !isPickUp) || (isSign && !isPickUp && detailsData.paymentMethod === 2)" class="btn-default uni-sub-btn" @click="handleRejection(detailsData.id)">
				拒收
			</button>
			<button v-if="!isPickUp" class="btn-default" @click="handleSign(detailsData.id)">签收</button>
			<button v-if="isPickUp && detailsData.paymentMethod === 2" class="btn-default uni-mini" @click="handleReceipt">去收款</button>
			<button v-if="isSign && detailsData.paymentMethod == 1" class="btn-default uni-mini btn-forbid">已签收</button>
		</view> -->
		<!-- end -->
		<!-- 当状态是已取件2或者已签收5显示跟踪按钮 ||(taskStatus === 6&&users.taskType===2)-->
		<!-- <view class="btnBox" v-if="(detailsData.status===2&&users.isNew)||(taskStatus === 2&&users.isNew) || taskStatus === 5 || (users.detailType === 2 && taskStatus === 6 &&users.isNew) || (users.detailType === 1 && taskStatus === 6)">
			<button class="btn-default uni-mini" @click="handleOrder">订单跟踪</button>
		</view> -->
		<!-- end -->
		<!-- 付款方式paymentMethod：1寄付，2到付 -->
		<!-- 付款状态paymentStatus：1未付，2已付 -->
		<!-- 签收状态signStatus：1为已签收，2为拒收 -->
		<!-- 任务类型taskType：1为取件任务，2为派件任务 -->
		<!-- 任务状态status：1未取派，2完成，3取消 未派件的情况下显示的按钮 -->
		<!-- 派件 -->
		<view v-if="detailsData.taskType === 2">
			<!-- 未派件未签收-->
			<view class="btnBox subBtnBox" v-if="detailsData.status === 1">
				<button class="btn-default uni-sub-btn" v-if="detailsData.signStatus !== 1" @click="handleRejection(detailsData.id)">拒收</button>
				<button class="btn-default" v-if="detailsData.signStatus !== 1" @click="handleSign(detailsData.id)">签收</button>
			</view>
			<!-- end -->

			<!-- 已经派件未付款或者已经签收 -->

			<view class="btnBox subBtnBox" v-else>
				<!-- 签收后未付款，isPickUp代表未收款进入收款页，返回时候的显示去收款按钮 -->
				<!-- 已签收到的订单付但是未付款 应该显示去收款-->
				<button
					v-if="isPickUp && detailsData.paymentStatus === 1 && detailsData.paymentMethod === 2 && detailsData.signStatus === 1"
					class="btn-default uni-mini"
					@click="handleReceipt"
				>
					去收款
				</button>
				<!-- 签收状态是已签收，显示已签收按钮 -->
				<!-- isSign代表已经点击了签收，进入到了派件成功页，返回的时候要显示已经签收 -->
				<button v-if="isSign && detailsData.signStatus === 1" class="btn-default uni-mini btn-forbid">已签收</button>
				<!-- 当状态是已签收显示跟踪按钮-->
				<!-- 已派件 -->

				<view v-if="detailsData.status === 2" class="btnBox">
					<!-- 未付款、从消息签收提醒 -->
					<button
						v-if="
							(!isPickUp && !isSign && detailsData.paymentMethod === 1) ||
								users.isNew ||
								(!isPickUp && !isSign && detailsData.paymentMethod === 2 && detailsData.paymentStatus === 1) ||
								(!isPickUp && !isSign && detailsData.paymentMethod === 2 && detailsData.paymentStatus === 2 && detailsData.signStatus == 1)
						"
						class="btn-default uni-mini"
						@click="handleOrder"
					>
						订单跟踪
					</button>
				</view>
			</view>
			<!-- end -->
			<!-- end -->
		</view>

		<!-- 取件 -->
		<view v-else>
			<!-- 当状态是已取件显示跟踪按钮-->

			<view class="btnBox" v-if="detailsData.status === 2"><button class="btn-default uni-mini" @click="handleOrder">订单跟踪</button></view>
			<!-- end -->
		</view>
		<!-- 物品名称、付款选择、备注弹层 -->
		<Uppop ref="sign" @getSignType="getSignType" :type="type"></Uppop>
		<!-- end -->
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
// 接口
import { getDetail, rejection, tasksSign, PositionUpload } from '@/pages/api/index.js';
import { positionUploadHandle } from '@/utils/index.js';
// 导入组件
// 导航组件
import UniNav from '@/components/uni-nav/index.vue';
// 地址
import Address from './components/address.vue';
// 付款方式先择、物品名称弹层
import Uppop from './components/uppop.vue';
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user; //vuex获取、储存数据
const taskStatus = users.taskStatus; //获取列表页传过来的取件类型  1:待取件，2:已取件,3:已取消,4:待派件,5:已签收
const emit = defineEmits(''); //子组件向父组件事件传递
const sign = ref(); // 定义ref 获取子组件方法或者值
const taskId = users.taskId;
const title = users.taskStatus === 4 || (taskStatus === 0 && users.taskType === 2) ? '去派件' : '运单详情'; //nav标题
let detailsData = ref({}); //详情数据
let type = ref(0); //物品名称、付款方式、签收人公用一个弹层，根据不同type值来做判断 物品:1,付款方式:2,备注:3,签收人:4

let isPickUp = ref(false); //是否去签收
let isCollect = ref(false); //到付的情况下，是否触发去取件后到，显示按钮为已取件
let isSign = ref(false); //是否已签收
const stopClick = ref(false); //防止连续提交
// ------生命周期------
onMounted(() => {
	getDetails(taskId);
	if (users.isPickUp) {
		isPickUp.value = true;
	} else {
		isPickUp.value = false;
	}
	//
	if (users.isSign) {
		isSign.value = true;
	} else {
		isSign.value = false;
	}
});
// ------定义方法------
// 获取详情
const getDetails = async id => {
	await getDetail(id).then(res => {
		detailsData.value = res.data;
		// 设置当前是到付还是寄付
		store.commit('user/setPaymentMethod', detailsData.value.paymentMethod);
		store.commit('user/setDetailsData', res.data);
	});
};
// 拒收
const handleRejection = async id => {
	if (stopClick.value) {
		return;
	}
	stopClick.value = true;
	// 网络慢的时候添加按钮loading
		let times = 
		setTimeout(()=>{
			uni.showLoading({
				title: 'loading',
			});
		},500)
	await rejection(id)
		.then(res => {
			if (res.code === 200) {
				// 拒收之后上报位置
				positionUploadHandle(true);
				// 操作成功后清除loading
					setTimeout(function () {
						uni.hideLoading();
					}, 500);
					clearTimeout(times)
				let timeId = setTimeout(() => {
					// 如果是从全部派送进入到详情，拒收后要跳转到全部取派的 全部派件tab值为1
					if (taskStatus === 6 && users.detailType === 2) {
						store.commit('user/setTabIndex', 1);
						uni.redirectTo({
							url: '/pages/history/index'
						});
					} else {
						// 如果是派件列表tab是0
						store.commit('user/setTabIndex', 0);
						uni.redirectTo({
							url: '/pages/delivery/index'
						});
					}
				}, 1000);
				uni.showToast({
					title: '用户拒收',
					icon: 'none',
					duration: '1000'
				});
			}
			stopClick.value = false;
		})
		.catch(err => {
			uni.showToast({
				title: err.msg,
				icon: 'none',
				duration: '1000'
			});
		});
};
// 签收
const handleSign = async id => {
	if (stopClick.value) {
		return;
	}
	stopClick.value = true;
	// 网络慢的时候添加按钮loading
		let times = 
		setTimeout(()=>{
			uni.showLoading({
				title: 'loading',
			});
		},500)
	const params = {
		id: id,
		signRecipient: detailsData.value.signRecipient
	};
	// 跳转到签收成功页
	await tasksSign(params).then(res => {
		if (res.code === 200) {
			// 签收之后上报位置
			positionUploadHandle(true);
			// 操作成功后清除loading
					setTimeout(function () {
						uni.hideLoading();
					}, 500);
					clearTimeout(times)
			const type = detailsData.value.paymentMethod; //获取付款类型，根据付款类型来判断是否要进入付款页面

			// 跳转到签收成功页
			uni.redirectTo({
				url: '/pages/pay/index?type=' + type
			});
			store.commit('user/setIsPickUp', true);
			store.commit('user/setIsDelivery', true); //因为取件和派件用的是一个公用页面，所以用isDelivery来判断是不是从派件进到签收成功页面的
		}
		stopClick.value = false;
	});
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
// 获取签收人名称，获取子组件传的值
const getSignType = val => {
	detailsData.value.signRecipient = val;
};
// 签收人
const handleSignOpen = () => {
	type.value = 4;
	sign.value.dialogOpen();
};
// 订单追踪
const handleOrder = () => {
	uni.redirectTo({
		url: '/pages/details/orderMap'
	});
};
// 返回上一页
const goBack = () => {
	store.commit('user/setIsPickUp', false);
	store.commit('user/setIsSign', false);
	store.commit('user/setIsDelivery', false);
	// 根据不同的状态跳转到不同的页面
	// 待取件、已取件、已取消
	if (taskStatus === 1 || taskStatus === 2 || taskStatus === 3) {
		if (taskStatus === 1) {
			// 待取件
			store.commit('user/setTabIndex', 0);
		} else if (taskStatus === 2) {
			// 已取件
			store.commit('user/setTabIndex', 1);
		} else {
			// 已取消
			store.commit('user/setTabIndex', 2);
		}
		// 如果是从搜索列表进来的，返回的时候要返回到搜索列表
		if (users.isSearch) {
			store.commit('user/setIsSearch', false);
			uni.redirectTo({
				url: '/pages/search/index'
			});
		} else {
			// 如果是从待取件、已取件、已取消列表进来的，返回的时候要返回相对应的tab页
			uni.redirectTo({
				url: '/pages/pickup/index'
			});
		}
	} else if ((taskStatus === 5 && users.newType !== 302 && !users.isNew) || (taskStatus === 4 && users.detailType !== 2 && users.newType !== 304)) {
		if (taskStatus === 4) {
			store.commit('user/setTabIndex', 0);
		} else {
			store.commit('user/setTabIndex', 1);
		}
		if (users.isSearch) {
			store.commit('user/setIsSearch', false);
			uni.redirectTo({
				url: '/pages/search/index'
			});
		} else {
			uni.redirectTo({
				url: '/pages/delivery/index'
			});
		}
	} else if (
		((taskStatus === 6 || taskStatus === 4) && users.detailType === 2) ||
		(users.detailType === 1 && users.newType !== 302) ||
		(taskStatus === 6 && users.detailType === 1)
	) {
		// 从历史记录派件进入到详情，返回的时候返回历史记录
		if (taskStatus === 6 && users.detailType === 1) {
			store.commit('user/setTabIndex', 0);
		}
		if (taskStatus === 6 && users.detailType === 2) {
			store.commit('user/setTabIndex', 1);
		}
		uni.redirectTo({
			url: '/pages/history/index'
		});
		// 从派件列表进入详情页
		if (taskStatus === 4 && users.detailType === 2) {
			store.commit('user/setTabIndex', 1);
			if (users.isSearch) {
				store.commit('user/setIsSearch', false);
				uni.redirectTo({
					url: '/pages/search/index'
				});
			} else {
				uni.redirectTo({
					url: '/pages/history/index'
				});
			}
		}
		if (taskStatus === 4 && users.detailType === 1) {
			store.commit('user/setTabIndex', 0);
			uni.redirectTo({
				url: '/pages/delivery/index'
			});
		}
	} else if (users.newType === 301) {
		// 跳转到消息寄件相关
		uni.redirectTo({
			url: '/pages/news/system?title=取件相关&type=301'
		});
	} else if (users.newType === 302) {
		// 跳转到消息寄件相关
		uni.redirectTo({
			url: '/pages/news/system?title=签收提醒&type=302'
		});
	} else if (users.newType === 303) {
		// 跳转到消息快件取消
		uni.redirectTo({
			url: '/pages/news/system?title=快件取消&type=303'
		});
	} else if (users.newType === 304) {
		// 跳转到消息派件相关
		uni.redirectTo({
			url: '/pages/news/system?title=派件相关&type=304'
		});
	} else {
		store.commit('user/setTabIndex', 0);
		uni.redirectTo({
			url: '/pages/delivery/index'
		});
	}
	store.commit('user/setIsNew', false);
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
