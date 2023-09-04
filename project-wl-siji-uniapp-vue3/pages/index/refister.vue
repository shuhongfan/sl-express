<!-- 回车登记 -->
<template>
	<view>
	<!-- 详情 -->
	<view class="refister">
		<DetailsNav title="回车登记"></DetailsNav>
		<view class="container">
			<!-- 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度-->
			<scroll-view scroll-y="true" class="swiperH">
				<view class="boxBg">
				    <view class="infoCard">
				    	<view class="line">
				    		<text>出车时间</text> 
							<text>{{startTime}}</text>
				    	</view>
						<view class="line">
							<text>回车时间</text> 
							<uni-datetime-picker type="datetime" v-model="params.endTime" :clear-icon="false" @change="changeLog" />
						</view>
				    </view>
					<!-- 通用卡片组件 - 待提货 - 带开关 -->
					<CardCont title="车辆违章" type="redio" redioKey="isBreakRules" @redioChange = "redioChange">
						<refisterCards :data="breakRulesType" :value="breakRulesType.data[0]" choiceKey="breakRulesType" @choiceHandel = "choiceHandel" />
						<refisterCards :data="penaltyAmount" :value="penaltyAmount.data[0]" choiceKey="penaltyAmount" @choiceHandel = "choiceHandel" />
						<refisterCards :data="deductPoints" :value="deductPoints.data[0]" choiceKey="deductPoints" @choiceHandel = "choiceHandel" />
					</CardCont>
					<CardCont title="车辆故障" type="redio" redioKey="isFault" @redioChange = "redioChange">
						<!-- 车辆是否可用 -->
						<refisterCards :data="isAvailable" :value="isAvailable.data[0]" choiceKey="isAvailable" @choiceHandel = "choiceHandel" />
						<!-- 故障类型 -->
						<refisterCards :data="faultType" :value="faultType.data[0]" choiceKey="faultType" @choiceHandel = "choiceHandel" />
						<TextArea placeholder="请简单描述故障"></TextArea>
						<ImageUpload title="请拍照"  @uploadImage="uploadImage" tit='faultImages'></ImageUpload>
					</CardCont>
					<CardCont title="车辆事故" type="redio" redioKey="isAccident" @redioChange = "redioChange">
						<refisterCards :data="accidentType" :value="accidentType.data[0]" choiceKey="accidentType" @choiceHandel = "choiceHandel" />
						<TextArea placeholder="请简单描述故障"></TextArea>
						<ImageUpload title="请拍照" @uploadImage="uploadImage" tit='accidentImages'></ImageUpload>
					</CardCont>
				</view>
			</scroll-view>
		</view>
		<!-- end -->
	</view>
	<!-- footer -->
	<view class="footCont">
		<view class="footBut">
			<text class="button" v-show="params.endTime != '' && (params.endTime).length == 19 " @click="submit()">交车</text>
			<text class="button buttonDis1" v-show="params.endTime  == '' || (params.endTime).length < 19" >交车</text>
		</view>
	</view>
	<!-- end -->
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted, onUpdated, watch, watchEffect, computed, inject } from 'vue';
	// 导入接口
	import { TruckRegistration } from '@/pages/api/index.js';
	// 导入组件
	import DetailsNav from '@/components/DetailsNav/index.vue'
	import CardCont from '@/components/CardCont/index.vue';
	import refisterCards from './components/refisterCards.vue'
	import ImageUpload from '@/components/ImageUpload/index.vue'
	import TextArea from '@/components/TextArea/index.vue'
	

	// ------定义变量------
	const startTime = ref('')
	const breakRulesType = {
		title: '违章类型',
		data: ['闯红灯', '无证驾驶', '超载', '酒后驾驶', '超速驾驶']
	}
	
	const penaltyAmount = {
		title: '罚款金额',
		data: ['0元', '100元', '200元', '300元', '500元', '1000元', '2000元']
	}
	
	const deductPoints = {
		title: '扣分',
		data: ['0分', '1分', '2分', '3分', '6分', '12分']
	}
	const isAvailable = {
		title: '车辆是否可用',
		data: ['是', '否']
	}
	const faultType = {
		title: '故障类型',
		data: ['启动困难', '不着车', '漏油', '漏水', '照明失灵', '有异响', '排烟异常', '温度异常', '其他']
	}
	
	const accidentType = {
		title: '事故类型',
		data: ['直行事故', '追尾事故', '超车事故', '左转弯事故',  '右转弯事故', '弯道事故', '坡道事故', '会车事故', '其他']
	}
	
    let params = reactive({
		id: '',
		startTime: '', //出车时间
		endTime: '',	//回车时间	
		isBreakRules: false,	//违章
		breakRulesType: 1,	//违章类型	
		penaltyAmount: 1, //罚款金额	
		deductPoints: 1,	//扣分	
		isFault: false,	//是否有故障
		isAvailable: true,	//车辆是否可用
		faultType: 1,	//故障类型	
		faultImages: '',	//故障图片	
		isAccident: false,	 // 是否有事故
		accidentType: 1,
		accidentImages: '' // 事故图片
	})

	// ------生命周期------
	onMounted(() => {
		const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1].$page.options;
		startTime.value = currentPage.time;
		params.startTime = currentPage.time;
		params.id = currentPage.id
	});

	// ------定义方法------
	// 回车登级-交车数据提交
	async function submit() {
		// 网络慢的时候添加按钮loading
		let times = 
		setTimeout(()=>{
			uni.showLoading({
				title: 'loading',
				mask:true
			});
		},500)
        await TruckRegistration(params)
		.then(res => {
				if (res.code === 200) {
					// 操作成功后清除loading
					setTimeout(function () {
						uni.hideLoading();
					}, 500);
					clearTimeout(times)
					uni.showToast({
						title: '回车登记数据提交成功！',
						duration: 1000,
						icon: 'none'
					});
					uni.navigateTo({
						url: '/pages/index/index'
					})
				} else {
					return uni.showToast({
						title: res.msg,
						duration: 1000,
						icon: 'none'
					});
				}
			})
			.catch(err => {});
	}
	// 是否打开相关的违章、故障、事故并赋值到params
	function redioChange(item){
		params[item.key] = item.value == 2 ? true : false
	}
	
	// 图片上传
	const uploadImage = (item) => {
		if (item.key == 'accidentImages'){
			params.accidentImages = params.accidentImages == '' ? item.value : params.accidentImages + ',' + item.value
		} else {
			params.faultImages = params.faultImages == '' ? item.value : params.faultImages + ',' + item.value
		}
	}
	// 回车时间
	function changeLog(e){
		if (e.length < 19){
			uni.showToast({
				title: '请选择回车时间(包含日期及时间)',
				duration: 3000,
				icon: 'none'
			});
		}
	}
	
	// 选择违章的数据
	function choiceHandel(item){
		if (item.key == 'isAvailable'){
			params[item.key] = item.value == 1 ? true : false
		} else {
			params[item.key] = item.value
		}
	}
</script>
<style src="./index.scss" lang="scss"></style>
<style lang="scss">
	.refister .container{
		padding-top: 30rpx;
		font-size: var(--font-size-14);
		.infoCard{
			background: #FFFFFF;
			border-radius: 20rpx;
			padding:0 30rpx;
			.line{
				display: flex;
				justify-content: space-between;
				line-height: 60rpx;
				border-bottom: solid 2rpx #EEEEEE;
				padding: 20rpx 0;
				.desc{
					color: #818181;
				}
			}
			.line:last-child{
				border: none;
			}
		}
		::v-deep .uni-input-placeholder{
			text-align: right;
		}
	}
	
</style>
