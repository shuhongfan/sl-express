<!-- 重量和体积 -->
<template>
	<view class="weightAndVolume">
		<!-- 重量 -->
		<view class="weight-box">
			<view class="weight-box-title">预估重量</view>
			<!-- <uni-number-box  max="9999" min="1"  :value="weight" @change="changeWeight" /> -->
			<view class="number-box">
				<view class="minus-btn" :class="isLessThan ? 'active' : ''" @click="handleMinus">-</view>
				<input class="uni-input" type="digit" maxlength="4" v-model="weight" @blur="handleWeigthBlur"/>
				<view class="add-btn" :class="isExceed ? 'active' : ''" @click="handleAdd">+</view>
			</view>
			<view class="unit">kg</view>
		</view>
		<!-- 体积 -->
		<view class="volume-box">
			<view class="volume-box-title">总体积</view>
			<view class="isVolumeInfo">
				<view class="isVolumeInfo-title">补充体积预估费用更准确</view>
				<switch color="#1DC779" style="transform:scale(0.7)" @change="switchChange" :checked="isVolumeInfo" />
			</view>
		</view>
		<!-- 体积输入框 -->
		<view class="isVolumeInfo-title-box" v-if='isVolumeInfo'>
			<uni-number-box />
			<view class="number-box">
				<view class="minus-btn" :class="isLessThanVolume ? 'active' : ''" @click="handleVolumeMinus">-</view>
				<input class="uni-input" type="digit"  maxlength="6" v-model="volume" @blur="handleVolume" />
				<view class="add-btn" :class="isExceedVolume ? 'active' : ''" @click="handleVolumeAdd">+</view>
			</view>
			<view class="unit">m³</view>
		</view>
		<!-- 长宽高输入框 -->
		<view class="long-width-height" v-if="isVolumeInfo">
			<view class="long">
				<input class="uni-input" type="digit" :value="long" maxlength="3" placeholder="长 cm"
					@input="longFun" />
			</view>
			<view class="cheng">*</view>
			<view class="width">
				<input class="uni-input" type="digit" :value="width" maxlength="3" placeholder="宽 cm"
					@input="widthFun" />
			</view>
			<view class="cheng">*</view>
			<view class="height">
				<input class="uni-input" type="digit" :value="height" maxlength="3" placeholder="高 cm"
					@input="heightFun" />
			</view>
		</view>
		<view class="accounting-rules">
			注：实际质量与体积以收派员确定为准，物品在包装后重量可能会增加，重量体积大时会体积重量收费，
			<text class="red" @click="openAccountRulesDialog">了解计费规则</text>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	const emits = defineEmits(["@getWeight", '@getVolume']);
	let isLessThan = ref(true); //判断重量是否小于0.1
	let isExceed = ref(false); //判断重量是否大于9999
	let isLessThanVolume = ref(true); //判断体积是否小于0.0001m³
	let isExceedVolume = ref(false); //判断体积是否大于99m³
	const weight = ref(1) //重量
	const volume = ref(0) //体积
	const long = ref() //长
	const width = ref() //宽
	const height = ref() //高
	const isVolumeInfo = ref(false)
	const store = useStore(); //vuex获取、储存数据
	const users = store.state.user
	onMounted(() => {
		weight.value = users.weight
		width.value = users.width
		height.value = users.height
		long.value = users.long
		volume.value = users.volume ? (Number(users.volume) / 1000000) : 0
		isVolumeInfo.value = users.width && users.long && users.height
	})
	// 减重量
	const handleMinus = () => {
		// 重量减去1
		if (weight.value > 1) {
			weight.value--;
			isExceed.value = false; //右侧加号去除置灰
			weight.value = weight.value.toFixed(1);
		}
		if (weight.value <= 1) {

			isLessThan.value = true; //左侧减号置灰
			if (weight.value <= 0.1) {
				weight.value = 0.1
			}
		}
		emits('getWeight', weight.value)
	};

	// 加重量
	const handleAdd = () => {
		// 重量加1
		if (weight.value < 9999) {
			++weight.value;
			isLessThan.value = false; //左侧减号去除置灰
		}
		if (weight.value === 9999) {
			isExceed.value = true; //右侧加号置灰
		}
		if (weight.value <= 1) {
			// weight.value = 1;
			isLessThan.value = true; //左侧减号置灰
		}
		emits('getWeight', weight.value)
	};

	//触发重量输入如果输入0，自动判断为1kg,最小可输入值为0.1kg,最大值为9999kg
	const handleWeigthBlur = e => {
		let value = e.detail.value;
		if (value < 0.1) {
			value = 1;
			isLessThan.value = true; //左侧减号置灰
		} else {
			if (value >= 0.1 && value <= 1) {
				isLessThan.value = true;
			} else {
				isLessThan.value = false; //左侧减号去除置灰
			}

			if (value >= 9999) {
				isExceed.value = true; //右侧加号置灰
				value = 9999;
				uni.showToast({
					title: '重量最大可不能超过9999kg',
					duration: 1000,
					icon: 'none'
				});
			} else {
				isExceed.value = false; //右侧加号去除置灰
			}
		}
		weight.value = value
		emits('getWeight', weight.value)
	};


	// 体积
	const handleVolume = e => {
		let value = Number(e.detail.value);
		if (value < 0.0001) {
			isLessThanVolume.value = true;
			value = 0;
		} else {
			isLessThanVolume.value = false;
			if (value >= 999) {
				isExceedVolume.value = true; //右侧加号置灰
				value = 999;
				uni.showToast({
					title: '体积最大可不能超过999m³',
					duration: 1000,
					icon: 'none'
				});
			} else {
				value = Number(e.detail.value);
				isExceedVolume.value = false; //右侧加号去除置灰
			}

		}
		volume.value = value
		emits('getVolume', (volume.value) * 1000000, long.value, width.value, height.value)
	};
	// 减体积
	const handleVolumeMinus = () => {
		// 体积减去1
		if (volume.value > 1) {
			volume.value--;
			isExceedVolume.value = false; //右侧加号去除置灰
			volume.value = volume.value.toFixed(1);
		}
		// 体积
		if (volume.value <= 1) {

			isLessThanVolume.value = true; //左侧减号置灰
			if (weight.value <= 0.0001) {
				weight.value = 0.0001
			}
		}
		emits('getVolume', (volume.value) * 1000000, long.value, width.value, height.value)

	};
	// 加体积
	const handleVolumeAdd = () => {
		// 体积加1
		if (volume.value < 999) {
			++volume.value;
			isLessThanVolume.value = false; //左侧减号去除置灰
		}
		if (volume.value === 999) {
			isExceedVolume.value = true; //右侧加号置灰
		}
		emits('getVolume', (volume.value) * 1000000, long.value, width.value, height.value)
	};


	//是否显示具体体积
	const switchChange = (e) => {
		isVolumeInfo.value = e.detail.value
	}
	//修改长度
	const longFun = (e) => {
		long.value = e.detail.value
		let valueFun = (Number(long.value) * Number(width.value) * Number(height.value)) / 1000000
		volume.value = valueFun < 0.0001 ? 0.0001 : valueFun
		emits('getVolume', ((volume.value) * 1000000), e.detail.value, width.value, height.value)
	}
	//修改宽度
	const widthFun = (e) => {
		width.value = e.detail.value
		let valueFun = (Number(long.value) * Number(width.value) * Number(height.value)) / 1000000
		volume.value = valueFun < 0.0001 ? 0.0001 : valueFun
		emits('getVolume', (volume.value) * 1000000, long.value, e.detail.value, height.value)
	}
	//修改高度
	const heightFun = (e) => {
		height.value = e.detail.value
		let valueFun = (Number(long.value) * Number(width.value) * Number(height.value)) / 1000000
		volume.value = valueFun < 0.0001 ? 0.0001 : valueFun
		emits('getVolume', (volume.value) * 1000000, long.value, width.value, e.detail.value)
	}

	//打开计费规则弹窗
	const openAccountRulesDialog = () => {
		uni.navigateTo({
			url: '/subPages/account-rules/index'
		});
	}
</script>

<style src="./weightAndVolume.scss" lang="scss" scoped></style>
