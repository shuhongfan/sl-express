<!-- 公告详情页 -->
<template>
  <!-- 自定义头部 -->
  <view class="navHead"><UniNav :title="title" @goBack="goBack"></UniNav></view>
  <!-- end -->
  <!-- 列表 -->
  <view class="pageBox newDetail">
    <view class="tit">{{ objData.title }}</view>
    <view class="time">{{ taskTimeFormat(objData.created) }}</view>
    <view v-if="objData.firstContent" class="first">{{
      objData.firstContent
    }}</view>
    <view>{{ objData.content }}</view>
  </view>
  <!-- end -->
</template>

<script setup>
import { ref } from "vue";
import { taskTimeFormat } from "@/utils/index.js";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";

// ------定义变量------
const title = ref("详情"); //nav标题
const pages = getCurrentPages(); //获取加载的页面，获取当前页面路由信息uniapp 做安卓不支持 vue-router
const currentPage = pages[pages.length - 1]; //获取当前页面的对象
let objData = ref(JSON.parse(currentPage.$page.options.obj)); //基本数据 获取列表页传过来的详情页，此页没有详情接口
// ------定义方法------

// 返回上一页
const goBack = () => {
  uni.redirectTo({
    url: "/pages/news/index",
  });
};
</script>
<style lang="scss" scoped>
body,
uni-page-body,
uni-page-head,
.uni-page-head {
  background-color: #fff !important;
}
.pageBox {
  box-shadow: inset 0 22rpx 22rpx 0 rgba(162, 162, 162, 0.06);
}
.newDetail {
  padding: 60rpx 32rpx;
  color: var(--neutral-color-font);
  line-height: 48rpx;
  font-size: var(--font-size-13);
  .tit {
    line-height: 60rpx;
    font-size: var(--font-size-16);
    color: var(--neutral-color-main);
    font-weight: 600;
  }
  .time {
    font-size: var(--font-size-12);
    padding: 4rpx 0 28rpx;
  }
  .first {
    padding: 15rpx 0 40rpx;
  }
}
</style>
