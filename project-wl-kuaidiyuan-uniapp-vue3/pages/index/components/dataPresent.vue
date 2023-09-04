<template>
  <view class="commonData">
    <view class="hometit">数据展示</view>
    <view class="dataList">
      <view class="todayGet" @click="handlTodayAcquired">
        <view>今日已取</view>
        <view class="num">{{ baseData.completePickUpNum }}</view>
        <view class="rightIcon"></view>
      </view>
      <view class="todaySign" @click="handlTodaySign">
        <view>今日已签</view>
        <view class="num">{{ baseData.signedNum }}</view>
        <view class="rightIcon"></view>
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
// 进入 已取件列表页
const handlTodayAcquired = () => {
  store.commit("user/setTabIndex", 1);
  store.commit("setFootStatus", 1);
  uni.redirectTo({
    url: "/pages/pickup/index",
  });
};
// 进入 已签收列表页
const handlTodaySign = () => {
  store.commit("user/setTabIndex", 1);
  store.commit("setFootStatus", 3);
  uni.redirectTo({
    url: "/pages/delivery/index",
  });
};
</script>

<style src="../index.scss" lang="scss"></style>