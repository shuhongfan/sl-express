
<!-- 单选按钮组件 - 回车登记页面使用 -->
<template>
	<view class="refisterCards">
		<view class="title">
			{{data.title}}
		</view>
		<view class="items">
			<view class="item" v-for="(item, index) in data.data" :key="index" @click="activeHandel(item, index)">
				<view :class="{buttonDel: true, buttonAct: actVal == item}">
					<text>{{item}}</text>
				</view>
			</view>
			<!-- 布局填充用 -->
			<view v-if="data.data.length % 3 == 1 || data.data.length % 3 == 2" class="item"></view>
			<view v-if="data.data.length % 3 == 1" class="item"></view>
		</view>
	</view>
</template>
<script setup >
	import {ref} from 'vue'
// 获取父组件值、方法
const props = defineProps({
	// 展示源数据
	data: {
		type: Object,
		default: () => {}
	}, 
	// 设置默认值
	value: {
		type: String,
		default: ''
	},
	// 选择数据的key
	choiceKey: {
		type: String,
		default: ''
	}
});

const emit = defineEmits(['choiceHandel'])

// 标记选择项
let actVal = ref(props.value)

// 点击选中
function activeHandel(val, index){
	actVal.value = val
	const param = {key: props.choiceKey, value:index+1, keyInt:val}
	emit('choiceHandel', param)
}
</script>

<style lang="scss">
	.refisterCards{
		.title{
			color: #2A2929;
			margin-bottom: 30rpx;
		}
		.items{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.item{
				width: 29.5%;
				padding-bottom: 30rpx;
			}
		}
	}
</style>

