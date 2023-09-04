<!--待取件-->
<template>
  <view
    class="item"
    v-if="(item.taskType === 1 || item.taskType === 2) && item.status === 1"
  >
    <view class="titInfo">
      {{ item.name }}
      <text>{{ item.phone }}</text>
    </view>
    <view class="address">{{ item.address }}</view>
    <view class="distance">{{ item.distance }}公里</view>
    <view class="time" v-if="item.taskType === 1"
      >预约取件时间：{{ taskTimeFormat(item.estimatedStartTime) }} 至
      {{ overTimeFormat(item.estimatedEndTime) }}</view
    >
    <view class="time" v-else>运单号：{{ item.transportOrderId }}</view>
    <text
      @click.stop="handleDetails($event, item)"
      class="delete"
      v-if="
        ((item.taskType === 1 && item.paymentMethod === 1) ||
          (item.taskType === 2 && item.paymentMethod === 2)) &&
        item.status === 2 &&
        item.paymentStatus === 1
      "
    >
      <button class="uni-btn btn-default">去收款</button>
    </text>
  </view>
</template>
<script setup>
import { taskTimeFormat, overTimeFormat } from '@/utils/index.js';
// 获取父组件数据
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(''); //子组件向父组件事件传递
//进入待取件详情
const handleDetails = (e, item) => {
  emit("handleDetails", e, item);
};
</script>

