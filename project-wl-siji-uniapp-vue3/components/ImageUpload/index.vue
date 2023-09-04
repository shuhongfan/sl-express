<template>
	<!-- 公用卡片 -->
	<view class="upPicCont">
		<view class="title">{{title}}</view>
		<uni-file-picker 
		v-model="cargoPicture" 
		fileMediatype="image" 
		mode="grid" 
		limit="3"
		@select="select" ></uni-file-picker>
	</view>
	<!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
	upload
} from '@/pages/api/index.js'

const cargoPicture = ref([])

const emit = defineEmits(['uploadImage'])

// 获取父组件值、方法
const props = defineProps({
	title:{
		type: String,
		default: '请拍照上传货品照片'
	}, 
	tit:{
		type: String,
		default: ''
	}
});
// 图片上传 - 请求
async function uploadHande(e){
	await upload(e).then(res => {
		if (res.code === 200 && res.data) {
			emit('uploadImage', {key: props.tit, value: res.data})
		} else {
			return uni.showToast({
				title: res.msg,
				duration: 1000,
				icon: 'none'
			});
		}
	}).catch(err => {
		uni.showToast({
			title: '图片上传失败！请联系管理员',
			duration: 1000,
			icon: 'none'
		});
	});
}

// 图片上传
async function select(e){
	cargoPicture.value = []
	const tempFiles = e.tempFiles[0]
	if (tempFiles.size < 1024 * 5 && (tempFiles.extname == 'png' || tempFiles.extname == 'jpg' || tempFiles.extname == 'jpeg' || tempFiles.extname == 'gif')) {
		uploadHande(e)
	} else {
		uni.showToast({
			title: '上传图片大小不能超过5M，格式需为jpg、png、gif',
			duration: 2000,
			icon: 'none'
		});
	}
}

onMounted(()=>{
})

</script>
<style lang="scss" scoped>
@import url(@/styles/theme.scss);	
.upPicCont{
	margin-bottom: 32rpx;
	padding-top: 30rpx;
	.title{
		font-weight: 400;
		font-size: var(--font-size-14);
		color: var(--neutral-color-font);
		margin-bottom: 32rpx;
	}
	.file-picker__box-content{
		border:none;
		background: var(--neutral-color-cancel);
	}
}
</style>
