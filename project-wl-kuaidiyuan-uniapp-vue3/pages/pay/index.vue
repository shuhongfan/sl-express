<!-- 取件成功页 -->
<template>
  <!-- 自定义头部 -->
  <UniNav
    :title="users.isDelivery ? '签收成功' : '取件成功'"
    @goBack="goBack"
  ></UniNav>
  <!-- end -->
  <view class="pickUp">
    <icon></icon>
    <view>{{ users.isDelivery ? "签收成功" : "取件成功" }}</view>
    <view class="btnBox" v-if="users.isDelivery">
      <navigator
        url="/pages/pay/scanPay?pay=true"
        open-type="redirect"
        v-if="type === '2'"
        >去收款</navigator
      >
      <view class="navigator-wrap" v-else @click="handleBack">返回主页</view>
    </view>
    <view class="btnBox" v-else>
      <navigator
        url="/pages/pay/scanPay?pay=true"
        open-type="redirect"
        v-if="type === '1'"
        >去收款</navigator
      >
      <view class="navigator-wrap" v-else @click="handleBack">返回主页</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
const pages = getCurrentPages(); //获取加载的页面，获取当前页面路由信息uniapp 做安卓不支持 vue-router
const currentPage = pages[pages.length - 1].$page.options; //获取当前页面的对象
const type = currentPage.type;
// ------定义方法------
// 返回上一页
const handleBack = () => {
  if (users.isDelivery) {
    if (users.taskStatus === 6 && users.detailType === 2) {
      store.commit("user/setTabIndex", 1);
      uni.redirectTo({
        url: "/pages/history/index",
      });
    } else {
      uni.redirectTo({
        url: "/pages/delivery/index",
      });
    }
  } else {
    if (users.taskStatus === 6) {
      uni.redirectTo({
        url: "/pages/history/index",
      });
    } else {
      uni.redirectTo({
        url: "/pages/pickup/index",
      });
    }
  }
  store.commit("user/setIsPickUp", false);
  store.commit("user/setIsSign", false);
};
// 返回上一页
const goBack = () => {
  if (users.isDelivery) {
    if (users.paymentMethod === 2) {
      store.commit("user/setIsCollect", true);
    } else {
      store.commit("user/setIsSign", true);
    }
    uni.redirectTo({
      url: "/pages/details/waybill",
    });
  } else {
    if (users.paymentMethod === 2) {
      store.commit("user/setIsCollect", true);
    }

    uni.redirectTo({
      url: "/pages/details/index",
    });
  }
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
