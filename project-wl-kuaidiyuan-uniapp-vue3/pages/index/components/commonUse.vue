<template>
  <view class="commonUse">
    <view class="hometit">常用功能</view>
    <view class="commonList">
      <view @click="handleChild">
        <icon class="icon delivery"></icon>
        <text>派件扫描</text>
      </view>
      <view @click="handleChild">
        <icon class="icon sign"></icon>
        <text>签收扫描</text>
      </view>
      <view>
        <view @click="handleHistory">
          <icon class="icon history"></icon>
          <text>全部取派</text>
        </view>
      </view>
      <view>
        <view @click="handleNew">
          <icon class="icon new"></icon>
          <text>消息通知</text>
        </view>
      </view>
      <view>
        <navigator url="/pages/freight/index" open-type="redirect">
          <icon class="icon freight"></icon>
          <text>运费查询</text>
        </navigator>
      </view>
      <view>
        <view @click="handleTip">
          <icon class="icon tip"></icon>
          <text>签收提醒</text>
        </view>
      </view>
      <view @click="handleChild">
        <icon class="icon exclusive"></icon>
        <text>专属取寄</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useStore } from "vuex";
// 获取父组件值、方法
const props = defineProps({});
const store = useStore(); //vuex获取储存数据
// 定义方法
const handleChild = () => {
  uni.showToast({
    title: "程序员哥哥正在实现中",
    duration: 1000,
    icon: "none",
  });
};
// 历史派件
const handleHistory = () => {
  store.commit("user/setTabIndex", 0);
  store.commit("user/setNewType", null);

  uni.navigateTo({
    url: "/pages/history/index",
  });
};
// 签收提醒
const handleTip = () => {
  store.commit("user/setTaskStatus", -1);
  uni.navigateTo({
    url: "/pages/news/system?title=签收提醒&type=302",
  });
};
// 消息通知
const handleNew = () => {
  store.commit("user/setTabIndex", 1);
  uni.navigateTo({
    url: "/pages/news/index",
  });
};
</script>

<style src="../index.scss" lang="scss"></style>
