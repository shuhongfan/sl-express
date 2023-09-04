<template>
	<uni-load-more :status="status" :content-text="contentText" />
</template>

<script setup>
import { ref } from 'vue';
// ------定义变量------
let status = ref('noMore'); //loading 的状态 more(加载前)/loading(加载中)/noMore(没有更多数据)
const contentText = ref({   //加载状态说明
	contentdown: '上拉加载更多',
	contentrefresh: '加载中...',
	contentnomore: '- 没有更多了 -'
});

//把数据、方法暴漏给父组件
defineExpose({
	status,
	contentText
});

</script>
