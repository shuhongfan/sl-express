<!--完成未付款-->
<template>
  <view class="item" v-if="item.taskType === 2 && item.status === 2">
    <view class="titInfo">运单号：{{ item.transportOrderId }}</view>
    <view class="address">收件人：{{ item.name }}</view>
    <view class="address">派件地址：{{ item.address }}</view>
    <view class="address">签收时间：{{ item.taskTime }}</view>
    <view class="time" v-if="item.amount > 0 && item.status === 2"
      >运费：{{ item.amount }}元</view
    >
    <text
      @click.stop="handleDetails($event, item)"
      class="delete"
      v-if="
        item.status === 2 &&
        item.paymentStatus === 1 &&
        item.paymentMethod === 2
      "
    >
      <button class="uni-btn btn-default">去收款</button>
    </text>
  </view>
</template>
<script setup>
// 获取父组件数据
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(""); //子组件向父组件事件传递
//进入待取件详情
const handleDetails = (e, item) => {
  emit("handleDetails", e, item);
};
</script>

