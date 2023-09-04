<!--取派地址-->
<template>
  <view class="boxBg">
    <view class="addressCon">
      <view class="item">
        <view class="sendIcon">{{ taskType === 1 ? "取" : "派" }}</view>
        <view class="addressInfo">
          <view
            ><text class="name">{{ detailsData.senderName }}</text
            >{{ detailsData.senderPhone }}</view
          >
          <view>{{ detailsData.senderAddress }}</view>
        </view>
      </view>
      <view class="item">
        <view class="receiveIcon">{{ taskType === 1 ? "派" : "收" }}</view>
        <view class="addressInfo">
          <view
            ><text class="name">{{ detailsData.receiverName }}</text
            >{{ detailsData.receiverPhone }}</view
          >
          <view>{{ detailsData.receiverAddress }}</view>
        </view>
      </view>
      <view class="line"></view>
    </view>
  </view>
</template>

<script setup>
import { useStore } from "vuex";
// 获取父组件数据
const props = defineProps({
  detailsData: {
    type: Object,
    default: () => ({}),
  },
});
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user; //vuex获取、储存数据
let taskType = users.taskType;
</script>

<style>
</style>