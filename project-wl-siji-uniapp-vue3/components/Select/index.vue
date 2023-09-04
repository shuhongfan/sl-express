<template>
	<!-- 下拉组件 -->
	<view class="select" >
		<view class="selHead" @click="toggle('bottom')"> 请选择 </view>
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="title">
					<span>选择类型</span>
					<image @click="close()" class="colse" src="@/static/sj_clone.png" mode=""></image>
				</view>
				<view class="options" v-for="(item, index) in options" @click="selectHandle(item.value)">
					<text>{{item.title}}</text>
					<view class="redioActionCont">
						<image class="videoIcon"  mode="aspectFit" :src="value  == item.value ? redioIconTrue : redioIconFalse"></image> 
					</view>
				</view>
				<view  class="butCont">
					<text @click="selectSubmit" class="button" style="width: 59%;">确定</text>	
				</view>
			</view>
		</uni-popup>
		
	</view>
	<!-- end -->
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
	data (){
		return {
			redioIconTrue: './../../static/sj_redio_true.png',
			redioIconFalse: './../../static/sj_redio_false.png',
			// value: 0
		}
	},
	props:{
		options: {
			type: Array,
			default:  []
		}, 
		value: {
			type: String || Number,
			default:  "1"
		}
	},
	methods:{
		 toggle(type) {
			this.type = type
			// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
			this.$refs.popup.open(type)
		},
		selectHandle(value){
			console.log(value)
			// this.close()                                                                                                                                                    
		},
		selectSubmit(){
			
		},
		change(){
			// this.close()
		},
		// 关闭弹层
		close() {
			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
			this.$refs.popup.close()
		},
	}
}
</script>
<style lang="scss" scoped>
@import url(@/styles/theme.scss);	
.select{
	.title{
		display: flex;
		padding: 40rpx;
		justify-content: space-between;
		align-items: center;
		font-weight: 500;
		font-size:var(--font-size-16);
		color: var(--neutral-color-main);
		letter-spacing: 0;
		line-height: 42rpx;
		border-bottom: solid 2rpx var(--neutral-color-background);
		.colse{
			width: 26rpx;
			height: 26rpx;
		}
	}
	.options{
		display: flex;
		justify-content: space-between;
		line-height: 120rpx;
		padding:0 40rpx;
		color: var(--neutral-color-main);
		border-bottom: solid 2rpx var(--neutral-color-background);
	}
	.butCont{
		padding: 40rpx 0;
		display: flex;
		justify-content: center;
	}
	.redioActionCont{
		display: flex;
		align-items: center;
		.videoIcon{
			width: 64rpx;
			height: 64rpx;
		}
	}
}
</style>
