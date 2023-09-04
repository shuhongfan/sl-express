<!--重量体积查询结果-->
<template>
  <view class="boxBg result">
    <view>计费重量：{{ baseData.weight }} kg</view>
    <view>计费体积：{{ baseData.volumeValue }} m³</view>
    <view
      >首重（1.0kg）{{ baseData.firstWeight }}元，续重{{
        baseData.continuousWeight
      }}元/kg</view
    >
    <view class="price"><text>￥</text>{{ baseData.freight }}</view>
  </view>
</template>

<script setup>
// 获取父组件数据
const props = defineProps({
  baseData: {
    type: Object,
    default: () => ({}),
  },
});
</script>