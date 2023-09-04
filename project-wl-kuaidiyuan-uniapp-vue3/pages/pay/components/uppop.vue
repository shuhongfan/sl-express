<template>
  <uni-popup
    ref="uppop"
    type="center"
    :animation="false"
    class="comPop"
    :mask-click="false"
  >
    <view class="con">用户已支付！</view>
    <view><button @click="goList">返回主页</button></view>
  </uni-popup>
</template>

<script setup>
import { ref } from "vue";
// 获取父组件数据
const props = defineProps({
  tipInfo: {
    type: String,
    default: "",
  },
});
// ------定义变量------
const emit = defineEmits(); //子组件向父组件事件传递
const uppop = ref();
// ------定义方法------
// 打开弹层
const dialogOpen = () => {
  uppop.value.open();
};
// 关闭弹层
const dialogClose = () => {
  uppop.value.close();
};
// 返回任务列表页
const goList = () => {
  uni.navigateTo({
    url: "/pages/pickup/index",
  });
};
// 向父组件暴露方法
defineExpose({
  dialogOpen,
});
</script>
