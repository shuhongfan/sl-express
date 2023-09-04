<template>
	<!-- 公用卡片 - 框架 -->
	<view class="cardCont">
		<view class="topCont" @click="openHandle()"> 
			<view class="">
				<text class="title">{{title}}</text>
				<text class="label" v-show="label">{{label}}</text>
			</view>
			<view v-if="type == 'redio'" class="redioActionCont">
				<image class="videoIcon"  mode="aspectFit" :src="isOpen ? redioIconTrue : redioIconFalse"></image> <text>是</text>
				<image class="videoIcon"  mode="aspectFit" :src="!isOpen ? redioIconTrue : redioIconFalse"></image> <text>否</text>
			</view>
			<view v-else class="openHandle">
				<image v-show="!isOpen" class="cardsIcon"  mode="aspectFit" src="@/static/sj_add.png"></image>
				<image v-show="isOpen" class="cardsIcon"  mode="aspectFit" src="@/static/sj_red.png"></image>
			</view>
		</view>
		<view class="content" :style="{height: (isOpen?height:0) +'px'}" ref="contEl">
			<view :id="elId" style="padding-top: 20rpx;">
				<slot></slot>
			</view>
		</view>
	</view>
	<!-- end -->
</template>

 <script>
export default {
	data() {
		const elId = `wl_${Math.ceil(Math.random() * 10e5).toString(36)}`
		return {
			redioIconTrue: './../../static/sj_redio_true.png',
			redioIconFalse: './../../static/sj_redio_false.png',
			isOpen: this.open,
			contHt: 'auto',
			height: '',
			elId,
		}
	},
	props: {
		// 列表标题
		title: {
			type: String,
			default: ''
		},
		// 分类  默认加减号 的样式  redio 为单选形式
		type: {
			type: String,
			default: ''
		},
		// 分类为redio的时候 可以设置 对应参数
		redioKey: {
			type: String,
			default: 'redioKey'
		},
		//标题后面的说明文字
		label: {
			type: String,
			default: ''
		},
		// 是否展开
		open: {
			type: Boolean,
			default: false
		},
	},
	
	updated(e) {
		this.$nextTick(() => {
			this.getCollapseHeight()
		})
	},
	methods: {
		// 展开关闭操作
		openHandle(){
			this.isOpen = this.isOpen ? false : true;
			if(this.type == 'redio'){
				let param = {key: this.redioKey, value: Number(this.isOpen) + 1}
				this.$emit('redioChange',param)
			}
		},
		// 获取内部容器的高度
		getCollapseHeight(type, index = 0) {
			const views = uni.createSelectorQuery().in(this)
			views
				.select(`#${this.elId}`)
				.fields({
					size: true
				}, data => {
					// TODO 百度中可能获取不到节点信息 ，需要循环获取
					if (index >= 10) return
					if (!data) {
						index++
						this.getCollapseHeight(false, index)
						return
					}
					// #ifdef APP-NVUE
					this.height = data.height + 1
					// #endif
					// #ifndef APP-NVUE
					this.height = data.height
					// #endif
					this.isheight = true
				})
				.exec()
		}
	},
	mounted() {
		this.getCollapseHeight()
	}
}
</script>
<style lang="scss" scoped>
@import url(@/styles/theme.scss);	
.cardCont{
	padding: 30rpx 40rpx;
	margin: 30rpx 0;
	border-radius: 20rpx;
	background: var(--neutral-color-white);
	.topCont{
		display: flex;
		justify-content: space-between;
		font-weight: 500;
		line-height: 60rpx;
		font-size: 32rpx;
		color: var(--neutral-color-main);
		align-items: center;
		// transition: 500ms;
		// transform: rotate(0deg);
		.title{
			font-weight: 500;
			font-size: 32rpx;
			color: var(--neutral-color-main);
		}
		.label{
			font-weight: 400;
			padding-left: 20rpx;
			font-size:var(--font-size-12);
			color:var(--neutral-color-font);
		}
		.redioActionCont{
			display: flex;
			align-items: center;
			.videoIcon{
				width: 64rpx;
				height: 64rpx;
			}
		}
		.cardsIcon{
			width: 48rpx;
			height: 48rpx;
		}
		.openHandle{
			display: flex;
			align-items: center;
		}
		.open{
			// transition: 500ms;
			transform: rotate(180deg);
		}
	}
	.content{
		overflow: hidden;
		transition-property: height, border-bottom-width;
		transition-duration: 0.3s;
		will-change: height;
	}
}
</style>
