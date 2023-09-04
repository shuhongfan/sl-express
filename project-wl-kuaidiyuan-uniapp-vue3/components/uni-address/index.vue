<template>
	<view class="uniPopup">
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="popup-content">
				<view class="tit">
					<view @click="handleCancel('bottom')">取消</view>
					<view>选择城市</view>
					<view @click="handleComplete">完成</view>
				</view>
				<view class="date-select address">
					<view>
						<picker-view class="picker-view" :value="defaultValue" :indicator-style="indicatorStyle" @change="getProvincesData">
							<!-- 省 -->
							<picker-view-column>
								<view class="item" v-for="(item, index) in provinceData.value" :key="index">
									<text>{{ item.name }}</text>
								</view>
							</picker-view-column>
							<!-- end -->
							<!-- 市 -->
							<picker-view-column>
								<view class="item" v-for="(item, index) in cityData.value" :key="index">
									<text>{{ item.name }}</text>
								</view>
							</picker-view-column>
							<!-- end -->
							<!-- 区 -->
							<picker-view-column>
								<view class="item" v-for="(item, index) in areaData.value" :key="index">
									<text>{{ item.name }}</text>
								</view>
							</picker-view-column>
							<!-- end -->
						</picker-view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
// 接口pai
// 公用接口
import { getProvinces } from '@/pages/api/common.js';
// 获取父组件数据
const props = defineProps({
	type: {
		type: Number,
		default: null
	}
});
// ------定义变量------
const emit = defineEmits('getCity'); //子组件向父组件事件传递
const popup = ref()
const indicatorStyle = ref(`height: 100rpx;`);
let defaultValue = ref([0, 0, 0]); //省市区默认显示
const provinceData = reactive([]); //省
const cityData = reactive([]); //市
const areaData = reactive([]); //区
let cityBase = ref({})

// ------生命周期------
onMounted(() => {
	getProvincesData();
});
// ------定义方法------
// 获取省市区
// 下拉选择省市区
const getProvincesData = async e => {
	let res = await getProvinces();
	if (res.code === 200) {
		provinceData.value = res.data;
		let provincesId = null;
		if (!e) {
			provincesId = provinceData.value[0].id;
		} else {
			defaultValue.value = e.detail.value;
			provincesId = provinceData.value[e.detail.value[0]].id;
		}
		getCity(provincesId); //获取省
	} else {
		return uni.showToast({
			title: res.msg,
			duration: 1000,
			icon: 'none'
		});
	}
};

// // 获取市
const getCity = async id => {
	let res = await getProvinces({ parentId: id });
	if (res.code === 200) {
		cityData.value = res.data;
		const cityId = cityData.value[defaultValue.value[1]].id;
		getArea(cityId);
	} else {
		return uni.showToast({
			title: res.msg,
			duration: 1000,
			icon: 'none'
		});
	}
};
// // 获取区
const getArea = async id => {
	let res = await getProvinces({ parentId: id });
	if (res.code === 200) {
		areaData.value = res.data;
		cityBase.value={
			province:provinceData.value[defaultValue.value[0]].name,
			city:cityData.value[defaultValue.value[1]].name,
			area:areaData.value[defaultValue.value[2]].name,
			areaId:areaData.value[defaultValue.value[2]].id
		}
	} else {
		return uni.showToast({
			title: res.msg,
			duration: 1000,
			icon: 'none'
		});
	}
};
// 打开弹层
const handleOpen = () => {
	popup.value.open('bottom');
};
// 关闭弹层
const handleCancel = ()=>{
	popup.value.close('bottom');
	}
// 完成
const handleComplete = ()=>{
	handleCancel()
	emit('getCity',cityBase.value)
}
// 暴漏给父组件
defineExpose({
	handleOpen
});
</script>
