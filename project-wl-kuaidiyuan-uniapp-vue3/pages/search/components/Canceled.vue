<!--已取消-->
<template>
  <view class="expressage" v-if="item.taskType === 1 && item.status === 3">
    <view class="cancelList">
      <view class="item">
        <view>寄件人：{{ item.name }}</view>
        <view>取件地址：{{ item.address }}</view>
        <view>取消原因：{{ item.cancelReason }}</view>
        <view>原因描述：{{ item.cancelReasonDescription }}</view>
      </view>
    </view>
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

</script>

