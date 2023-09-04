<template>
	<!-- 头部导航栏 -->
	<nav-bar title='实名认证'></nav-bar>
	<view class="realName-authentication">
		<view class="tips">当前仅支持持有中国内地居民身份证的用户进行线上实名认证</view>
		<view class="content">
			根据《邮件快件实名收寄管理办法》等相关法律法规的要求，为了更好地向您提供邮件快件的收寄件服务，需您提供真实的身份信息。后续您本人寄件时仅需出示有效身份证件供查阅确认即可，无需再次采集。
		</view>
		<view class="form">
			<view class="name-item">
				<view class="label">姓名</view>
				<view class="input-box">
					<input @input="clearInputName" :value="nameInputValue" placeholder-class="phcolor" class="uni-input" :placeholder="namePlaceholder" />
					<image class="uni-icon" src='../../static/shanchu.png' v-if="showClearIconName"
						@click="clearIconName" />
				</view>
			</view>
			<view class="identify-item">
				<view class="label">身份证号</view>
				<view class="input-box">
					<input @input="clearInput" :value="inputClearValue" placeholder-class="phcolor" class="uni-input" :placeholder="idcardPlaceholder" />
					<image class="uni-icon" src='../../static/shanchu.png' v-if="showClearIcon" @click="clearIcon" />
				</view>

			</view>
		</view>
		<view class="footer">
			<view class="btn" :class="isCanAuth?'active':''" @click="doAuth">开始认证</view>
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
		validateIdentityCard
	} from '@/utils/validate.js'
	import {
		getRealNameStatusApi
	} from '@/pages/api/my.js'
	let namePlaceholder = ref('请填写')
	let idcardPlaceholder = ref('请填写')
	let showClearIconName = ref(false)
	let showClearIcon = ref(false)
	let nameInputValue = ref('')
	let inputClearValue = ref('')
	//是否可以开始认证
	const isCanAuth = computed(() => {
		return validateIdentityCard(inputClearValue.value) && nameInputValue.value
	})
	//聚焦时清空占位字
	const clearNamePlaceholder = ()=>{
		namePlaceholder.value = ''
		if(!nameInputValue.value){
			idcardPlaceholder.value ='请填写'
		}
	}
	const clearIdcardPlaceholder = ()=>{
		idcardPlaceholder.value = ''
		if(!inputClearValue.value){
			namePlaceholder.value ='请填写'
		}
	}
	const clearInput = (event) => {
		inputClearValue.value = event.detail.value;
		if (event.detail.value.length > 0) {
			showClearIcon.value = true;
		} else {
			showClearIcon.value = false;
			idcardPlaceholder.value = '请填写'
		}
	}

	const clearInputName = (event) => {
		nameInputValue.value = event.detail.value;
		if (event.detail.value.length > 0) {
			showClearIconName.value = true;
		} else {
			showClearIconName.value = false;
			namePlaceholder.value = '请填写'
		}
	}

	const clearIconName = () => {
		nameInputValue.value = '';
		showClearIconName.value = false;
		namePlaceholder.value = '请填写'
		if(!inputClearValue.value){
			idcardPlaceholder.value = '请填写'
		}
	}

	const clearIcon = () => {
		inputClearValue.value = '';
		showClearIcon.value = false;
		idcardPlaceholder.value = '请填写'
		if(!nameInputValue.value){
			namePlaceholder.value = '请填写'
		}
	}

	//开始身份认证
	const doAuth = () => {
		if (!isCanAuth.value) {
			return uni.showToast({
				title: '信息填写不完整',
				icon: 'none',
				duration: 1000
			})
		}
		getRealNameStatusApi({
			flag: 1,
			idCard: inputClearValue.value,
			name: nameInputValue.value
		}).then((res) => {
			if (res.code !== 200) {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 1000
				})
			} else {

				uni.showToast({
					title: '认证成功',
					icon: 'none',
					duration: 1000,
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/my/index'
					})
				}, 2000)

			}
		}).catch(()=>{
			uni.showToast({
				title: '网络异常',
				duration: 2000,
				icon: 'none'
			});
		})
	}
</script>

<style src="./index.scss" lang="scss" scoped></style>
