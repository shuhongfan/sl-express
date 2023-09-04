<!-- 专属二维码页 -->
<template>
  <!-- 自定义头部 -->
  <UniNav :title="title" @goBack="goBack"></UniNav>
  <!-- end -->
  <view class="pageBox qrCode">
    <view class="boxBg">
      <view class="qrHead">
        <view class="head"></view>
        <view class="info">
          <view class="tit">神领快递员-张全蛋</view>
          <view class="star">
            <uni-rate
              :readonly="true"
              allow-half
              :value="4.5"
              active-color="#EF4F3F"
              color="#F4F4F4"
            />
            <text>4.7</text>
          </view>
        </view>
      </view>
      <view class="img"><image src="../../static/scanPay.png"></image></view>
      <view>扫码快速下单</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
// 导入接口
import { getUserScope } from "@/pages/api/my.js";
// ------定义变量------
const title = ref("专属二维码"); //nav标题

// ------生命周期------
onMounted(() => {});
// ------定义方法------

// 返回上一页
const goBack = () => {
  uni.redirectTo({
    url: "/pages/my/index",
  });
};
</script>
<style src="./index.scss" lang="scss" scoped></style>
