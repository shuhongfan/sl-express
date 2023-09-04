<template>
	<view class="selectArea">
		<uni-popup ref="popup" type="bottom">
			<view class="header">
				<view class="header-title">选择省市区</view>
				<view class="close" @click="handleCancel"></view>
			</view>
			<!-- 搜索框 -->
			<!-- 	<view class="seachBox">
				<uni-search-bar placeholder="请输入城市/区县/街道名称搜索" cancelButton="none" @confirm="search" :focus="true"
					v-model="searchValue" @blur="blur" @focus="focus" @input="input">
					<template v-slot:searchIcon>
						<view class="search-icon"></view>
					</template>
				</uni-search-bar>
			</view> -->
			<!-- 热门城市 -->
			<view class="hot-city">
				<view class="title">热门城市</view>
				<view class="city-box">
					<view class="city-item" :class="index===hotCityIndex?'active':''" v-for="(item,index) in cityList" :key="index"
						@click="handleHotCityClick(item,index)">
						{{item.label}}
					</view>
				</view>
			</view>
			<!-- 省市区三级联动 -->
			<view class="province-city-area">
				<view class="label-box">
					<view class="label">省份</view>
					<view class="label">城市</view>
					<view class="label">区县</view>
				</view>
				<picker-view :value="areaIndex.data" :indicator-style="`height: 50px;`" @change="bindChange"
					@pickstart="handlePickStart" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item,index) in province.data" :key="index">{{item.name}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in city.data" :key="index">{{item.name}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in area.data" :key="index">{{item.name}}</view>
					</picker-view-column>
				</picker-view>
			</view>
			<!-- 底部 -->
			<view class="footer">
				<view class="btn" @click="confirm">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		nextTick,
		computed,
		watch
	} from 'vue';
	import {
		getArea
	} from '@/pages/api/order.js'
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	const emits = defineEmits(["@getAreaData"]);
	const popup = ref()
	let props = defineProps({
		provinceId: {
			type: String,
			default: '',
		},
		cityId: {
			type: String,
			default: '',
		},
		countyId: {
			type: String,
			default: '',
		}
	})
	//省数据
	let province = reactive({
		data: []
	})
	let selectedProvince = reactive({
		data: {
			name: '北京市',
			id: '1'
		}
	})
	//市数据
	const city = reactive({
		data: []
	})
	let selectedCity = reactive({
		data: {
			name: '直辖市',
			id: '2'
		}
	})
	//区域数据
	const area = reactive({
		data: []
	})
	let selectedArea = reactive({
		data: {
			name: '东城区',
			id: '3'
		}
	})
	//记录三级联动每项的index以及默认展示
	let areaIndex = reactive({
		data: [0, 0, 0]
	})
	
	//记录热门城市选中的索引
	let hotCityIndex = ref('')

	const cityList = reactive([{
			label: '北京',
			provinceId: "1",
			cityId: "2",
			countyId: "3"
		},
		{
			label: '上海',
			provinceId: "161792",
			cityId: "161793",
			countyId: "161794"
		},
		{
			label: '广州',
			provinceId: "483250",
			cityId: "483251",
			countyId: "483252"
		},
		{
			label: '深圳',
			provinceId: "483250",
			cityId: "487721",
			countyId: "487722"
		}
	])
	//负责记录组件中选中的三级对应的id
	let placeIdItem = reactive({
		provinceId: '',
		cityId: '',
		countyId: ''
	})
	//区分热门城市点击还是滑动三级组件
	let chooseType = ref('select')

	// 监听后台获取的详情
	watch(props, (newValue, oldValue) => {
		placeIdItem.provinceId = newValue.provinceId
		placeIdItem.cityId = newValue.cityId
		placeIdItem.countyId = newValue.countyId
	})

	const handleHotCityClick = (item,index) => {
		placeIdItem.provinceId = item.provinceId
		placeIdItem.cityId = item.cityId
		placeIdItem.countyId = item.countyId
		getAreaInfo('', province)
		getAreaInfo(placeIdItem.provinceId, city)
		getAreaInfo(placeIdItem.cityId, area)
		chooseType.value = 'click'
		hotCityIndex.value = index
	}

	const getList = () => {
		getAreaInfo('', province)
		getAreaInfo(placeIdItem.provinceId || 1, city)
		getAreaInfo(placeIdItem.cityId || 2, area)
	}

	//获取省市区
	const getAreaInfo = (parentId, type) => {
		getArea({
			parentId
		}).then((res) => {
			type.data = res.data
			if (type === province) {
				//用于解决响应式状态变更但是dom不更新的问题
				nextTick(() => {
					selectedProvince.data = res.data.filter(item => item.id == placeIdItem.provinceId)[0]|| res.data[0] 
					areaIndex.data[0] = res.data.findIndex(item => item.id == placeIdItem.provinceId)
				})
			} else if (type === city) {
				nextTick(() => {
					selectedCity.data = res.data.filter(item => item.id == placeIdItem.cityId)[0]|| res.data[0]
					areaIndex.data[1] = res.data.findIndex(item => item.id == placeIdItem.cityId)
				})
			} else if (type === area) {
				nextTick(() => {
					selectedArea.data = res.data.filter(item => item.id == placeIdItem.countyId)[0]|| res.data[0]
					areaIndex.data[2] = res.data.findIndex(item => item.id == placeIdItem.countyId)
				})
			}
		})
	}

	const handlePickStart = () => {
		chooseType.value = 'select'
	}

	//选择省市区
	const bindChange = (event) => {
		
		if(chooseType.value ==='click') return
		//二级地址获取
		if (areaIndex.data[0] !== event.detail.value[0]) {
			getAreaInfo(province.data[event.detail.value[0]].id, city)
			getAreaInfo(Number(province.data[event.detail.value[0]].id) + 1, area)
			selectedProvince.data = province.data[event.detail.value[0]]
		} else if (areaIndex.data[1] !== event.detail.value[1]) {
			//三级地址获取
			getAreaInfo(city.data[event.detail.value[1]].id, area)
			selectedCity.data = city.data[event.detail.value[1]]
		} else {
			selectedArea.data = area.data[event.detail.value[2]]
		}
		areaIndex.data = event.detail.value
		hotCityIndex.value = ''
	}

	// 打开弹层
	const handleOpen = () => {
		popup.value.open('bottom');
	};
	// 关闭弹层
	const handleCancel = () => {
		popup.value.close('bottom');
	}

	//确认选择省市区
	const confirm = () => {
		handleCancel()
		emits("getAreaData", {
			province: selectedProvince.data,
			city: selectedCity.data,
			area: selectedArea.data
		})
	}
	// 暴漏给父组件
	defineExpose({
		handleOpen,
		getList
	});
</script>

<style src="./selectArea.scss" lang="scss" scoped></style>
