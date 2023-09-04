<template>
  <view class="orderTip" v-if="orderData" @click="handleLink">
    <view class="btn">消息通知</view>
    <view>{{ orderData.recentMsg }}</view>
    <view>
      {{ orderData.minutes === 0 ? 1 : orderData.minutes }}分钟前
      <icon class="iconNext"></icon>
    </view>
  </view>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore(); //vuex获取、储存数据
// 获取父组件值、方法
const props = defineProps({
  orderData: Object,
  default: () => ({}),
});
// ------定义方法------
const handleLink = () => {
  const type = props.orderData.contentType;
  store.commit("user/setTaskStatus", -1);
  if (type === 300) {
    uni.redirectTo({
      url: "/pages/news/index",
    });
  } else if (type === 301) {
    uni.redirectTo({
      url: "/pages/news/system?title=取件相关&type=301",
    });
  } else if (type === 302) {
    uni.redirectTo({
      url: "/pages/news/system?title=签收提醒&type=302",
    });
  } else if (type === 303) {
    uni.redirectTo({
      url: "/pages/news/system?title=快件取消&type=303",
    });
  } else {
    uni.redirectTo({
      url: "/pages/news/system?title=派件相关&type=304",
    });
  }
};
</script>

<style src="../index.scss" lang="scss"></style>
