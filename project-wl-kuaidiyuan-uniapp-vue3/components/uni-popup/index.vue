<template>
	<uni-popup ref="message" type="dialog" class="commDialog">
		<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确认" title=" " :content="tipInfo" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
import { ref } from 'vue';
// 获取父组件数据
const props = defineProps({
	tipInfo: {
		type: String,
		default: ''
	}
});
// ------定义变量------
const emit =defineEmits()  //子组件向父组件事件传递
const message =ref()
// ------定义方法------
// 确认清除弹层
const dialogConfirm = () => {
	emit('handleClick',true)
};
// 打开弹层
const dialogOpen = () => {
	message.value.open();
};
// 关闭弹层
const dialogClose = () => {
	message.value.close();
};
// 向父组件暴露方法
defineExpose({
	dialogOpen
})
</script>
