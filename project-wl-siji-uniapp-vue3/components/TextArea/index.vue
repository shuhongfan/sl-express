<template>
	<!-- 公用卡片 -->
	<textarea class="textInput" placeholder-style="color:#818181" :placeholder="placeholder"/>
	<!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
// 获取父组件值、方法
const props = defineProps({
	placeholder:{
		type: String,
		default: ''
	}
});


onMounted(()=>{
})

</script>
<style lang="scss" scoped>
@import url(@/styles/theme.scss);	
.textInput{
	font-size: var(--font-size-14);
	background-color: var(--neutral-color-cancel);
	width: 100%;
	border-radius: 20rpx;
	padding: 30rpx;
	box-sizing: border-box;
}
</style>
