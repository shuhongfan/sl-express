<template>
  <view class="infoBox">
    <view class="boxBg">
      <view @click="handlePicup">
        <view class="num">{{ baseData.newPickUpNum }}</view>
        <view>取件任务</view>
      </view>
      <view @click="handleDelivery">
        <view class="num">{{ baseData.newDispatchNum }}</view>
        <view>派件任务</view>
      </view>
      <view @click="handleOvertime">
        <view class="num">{{ baseData.overTimeNum }}</view>
        <view>超时任务</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore(); //设置、获取数据
// 获取父组件值、方法
const props = defineProps({
  baseData: {
    type: Object,
    default: () => ({}),
  },
});
// ------定义方法------
// 进入 待取件列表页
const handlePicup = () => {
  store.commit("user/setTabIndex", 0);
  store.commit("setFootStatus", 1);
  uni.redirectTo({
    url: "/pages/pickup/index",
  });
};
// 进入 待派件列表页
const handleDelivery = () => {
  store.commit("user/setTabIndex", 0);
  store.commit("setFootStatus", 3);
  store.commit("user/setDetailType", 0);
  uni.redirectTo({
    url: "/pages/delivery/index",
  });
};
// 进入 选中超时任务
const handleOvertime = () => {
  store.commit("user/setTabIndex", 0);
  store.commit("setFootStatus", 1);
  store.commit("user/setFilterOverTime", true);
  uni.redirectTo({
    url: "/pages/pickup/index",
  });
};
</script>

<style src="../index.scss" lang="scss"></style>