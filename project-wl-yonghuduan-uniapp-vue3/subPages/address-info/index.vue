<template>
	<!-- 头部导航栏 -->
	<nav-bar :title='title' :handleToLink="handleToLink"></nav-bar>
	<view class="address-info">
		<!-- 实名认证 -->
		<view v-if="type !== 'get' && editOrAdd!=='add'" class="approve-tips"
			:class="isRealNameAuth?'isRealNameAuth':''">
			<view class="circle"></view>
			<view class="content" :class="[type === 'get'?'active':'']">
				{{
					!isRealNameAuth?'根据国家法律法规要求，寄件人名称须与实名信息一致。您可以在下单前认证或现场出示证件':'根据国家法律法规要求，寄件人名称须与实名信息一致。'
				}}

			</view>
			<view class="btn" @click="handleTorealName" v-if="!isRealNameAuth && type!=='get'">实名认证</view>
		</view>
		<!-- 地址信息 -->
		<view class="address-box">
			<view class="title">
				<view class="address-title" v-if="type === 'address'">联系人信息</view>
				<view class="send-get-title" v-else>
					<view class="send" v-if="type==='send'">寄</view>
					<view class="get" v-else-if="type==='get'">收</view>
					<view class="subTitle">
						{{type==='send'?'寄':'收'}}件人信息
					</view>
					<view class="toAddress" @click="toAddress">
						地址簿
					</view>
				</view>
			</view>
			<!-- 姓名，电话 -->
			<view class="name-number">
				<input placeholder-class="phcolor" class="uni-input" :class="formName!==''?'active':''" placeholder="姓名"
					@input="handleFormName" :value="formName" maxlength="10" />
				<input placeholder-class="phcolor" class="uni-input" type='number' :class="formPhone!==''?'active':''"
					placeholder="电话" @input="handleFormPhone" :value="formPhone" />
			</view>
			<!-- 城市/地区 -->
			<view class="city-area" @click="handledSelectArea">
				<view class="label" :class="areaLabel!=='城市/地区'?'active':''">{{areaLabel}}</view>
				<view class="arrow"></view>
			</view>
			<!-- 详细地址 -->
			<view class="address-detail">
				<input placeholder-class="phcolor" class="uni-input" :class="formAddressInfo!==''?'active':''"
					placeholder="详细地址（例如：**街**号）" :value="formAddressInfo" @input="handleFormAddressInfo"
					maxlength="33" />
			</view>
			<!-- 底部按钮区域 -->
			<view class="footer">
				<view class="save-address" @click="handleSaveToAddress">
					<view class="checkbox" :class="{active:isFromAddress?isDefaultAddress:isSaveToAddress}"></view>
					<view class="label"> {{isFromAddress?'设为默认寄件地址':'保存到地址簿'}}</view>
				</view>
				<view class="reset-btn" @click="reset" :class="isReset?'active':''">清空</view>
			</view>
		</view>
		<BtnFooter btnText='确定' :isActive="isConfirm" @confirm="submit"></BtnFooter>
		<!-- 选择省市区弹窗 -->
		<SelectArea ref='selectArea' @getAreaData="getAreaData" :provinceId="provinceId" :cityId="cityId"
			:countyId="countyId" :editOrAdd="editOrAdd"></SelectArea>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		computed
		// onLoad
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import BtnFooter from '@/components/BtnFooter/index.vue'
	import SelectArea from './components/selectArea.vue'
	import {
		addAddress,
		getAddressInfoDetail,
		editAddress
	} from '@/pages/api/address.js'
	import {
		getUserInfo,
	} from '@/pages/api/my.js';

	const formName = ref('')
	const formPhone = ref('')
	const formAddressInfo = ref('')
	let provinceId = ref('')
	let cityId = ref('')
	let countyId = ref('')
	let title = ref('') //导航栏标题
	const isSaveToAddress = ref(false) //是否保存到地址簿
	const isDefaultAddress = ref(false) //是否设置为默认地址
	const isFromAddress = ref() //是否来自地址簿
	const selectArea = ref()
	const type = ref('send') //寄件人，收件人，地址簿
	const addressType = ref() //寄件，收件
	const editOrAdd = ref()
	const id = ref('') //查询地址详情的id
	const isConfirm = computed(() => {
		return (Boolean(formName.value) && Boolean(formPhone.value) && Boolean(formAddressInfo.value) && areaLabel
			.value !== '城市/地区')
	}) //是否可以提交确定
	const isReset = computed(() => {
		return Boolean(formName.value) || Boolean(formPhone.value) || Boolean(formAddressInfo.value) || Boolean(
			provinceId.value)
	})
	const areaLabel = ref('城市/地区') //省市区选择的值
	const isRealNameAuth = ref(true) //用户是否进行了实名认证
	onLoad((options) => {
		if (options.id) {
			getAddressInfo(options.id)
		}
		editOrAdd.value = options.editOrAdd
		id.value = options.id || ''
		type.value = options.type
		isFromAddress.value = options.isFromAddress
		title.value = options.type === 'address' ? '编辑地址' : options.type === 'send' ? '寄件人地址填写' : '收件人地址填写'
		isDefaultAddress.value = options.isDefault === '0' ? false : true
	})
	onMounted(() => {
		if (editOrAdd.value === 'add') {
			selectArea.value.getList()
		}
		isRealName()
	})
	//跳转到地址簿
	const toAddress = () => {
		uni.navigateTo({
			url: '/pages/address/index?type=' + type.value
		})
	}
	//跳转到实名认证
	const handleTorealName = () => {
		uni.navigateTo({
			url: '/subPages/realName-authentication/index'
		});
	}
	//获取用户是否实名认证了
	const isRealName = () => {
		getUserInfo().then((res) => {
			if (res) {
				isRealNameAuth.value = Boolean(res.data.idCardNoVerify)
			}

		})
	}
	//查询地址簿详情
	const getAddressInfo = async (id) => {
		await getAddressInfoDetail(id).then((res) => {
			const {
				name,
				phoneNumber,
				address,
				city,
				county,
				province,
				isShow,
				isDefault
			} = res.data
			formName.value = name
			formPhone.value = phoneNumber
			formAddressInfo.value = address
			areaLabel.value = province.name + ' ' + city.name + ' ' + county.name
			provinceId.value = province.id
			cityId.value = city.id
			countyId.value = county.id
			isSaveToAddress.value = isShow
			isDefaultAddress.value = isDefault
		})
		selectArea.value.getList()
	}

	//是否保存到地址簿、是否设置为默认地址
	const handleSaveToAddress = () => {
		if (isFromAddress.value) {
			isDefaultAddress.value = !isDefaultAddress.value
		} else {
			isSaveToAddress.value = !isSaveToAddress.value
		}

	}

	//打开选择省市区弹窗
	const handledSelectArea = () => {
		selectArea.value.handleOpen()
	}
	//处理姓名表单输入
	const handleFormName = (event) => {
		formName.value = event.detail.value
	}
	//处理电话表单输入
	const handleFormPhone = (event) => {
		formPhone.value = event.detail.value
	}
	//处理详细地址表单输入
	const handleFormAddressInfo = (event) => {
		formAddressInfo.value = event.detail.value
	}
	//获取省市区组件的值
	const getAreaData = (value) => {
		provinceId.value = value.province.id
		cityId.value = value.city.id
		countyId.value = value.area.id
		areaLabel.value = value.province.name + ' ' + value.city.name + ' ' + value.area.name
	}
	//重置表单
	const reset = () => {
		formAddressInfo.value = ''
		formName.value = ''
		formPhone.value = ''
		areaLabel.value = '城市/地区'
	}
	const handleToLink = () => {
		uni.navigateBack()
	}
	//提交表单
	const submit = () => {
		console.log()
		if (!isConfirm.value) {
			uni.showToast({
				title: '请将信息填写完整',
				icon: 'none'
			})
		} else if (!(/^1[3456789]\d{9}$/.test(formPhone.value))) {
			uni.showToast({
				title: '请填写正确的手机号码格式',
				icon: 'none'
			})
		} else if (formName.value.length < 2) {
			uni.showToast({
				title: '姓名字数长度为2-10',
				icon: 'none'
			})
		} else {
			if (editOrAdd.value === 'add' && !id.value) {
				addAddress({
					name: formName.value,
					phoneNumber: formPhone.value,
					address: formAddressInfo.value,
					provinceId: provinceId.value,
					cityId: cityId.value,
					countyId: countyId.value,
					type: type.value === 'send' ? 1 : 2,
					isShow: isFromAddress.value ? 1 : isSaveToAddress.value ? 1 : 0,
					isDefault: isDefaultAddress.value ? 1 : 0
				}).then((res) => {
					uni.showToast({
						title: '操作成功',
						icon: 'success'
					})
					if (isFromAddress.value === 'true') {
						uni.redirectTo({
							url: '/pages/address/index'
						})
					} else {
						uni.redirectTo({
							url: '/pages/express-delivery/index?id=' + res.data.id + '&type=' + type
								.value
						})
					}
				})
			} else if (editOrAdd.value === 'edit' && id.value) {
				editAddress({
					name: formName.value,
					phoneNumber: formPhone.value,
					address: formAddressInfo.value,
					provinceId: provinceId.value,
					cityId: cityId.value,
					countyId: countyId.value,
					type: addressType.value,
					isShow: isFromAddress.value ? 1 : isSaveToAddress.value ? 1 : 0,
					id: id.value,
					isDefault: isDefaultAddress.value ? 1 : 0
				}).then((res) => {
					uni.showToast({
						title: '操作成功',
						icon: 'success'
					})
					if (isFromAddress.value === 'true') {
						uni.redirectTo({
							url: '/pages/address/index'
						})
					} else {
						uni.redirectTo({
							url: '/pages/express-delivery/index?id=' + res.data.id + '&type=' + type
								.value
						})
					}
				})
			}
		}
	}
</script>

<style src="./index.scss" lang="scss" scoped></style>
<style src="./components/selectArea.scss" lang="scss"></style>
