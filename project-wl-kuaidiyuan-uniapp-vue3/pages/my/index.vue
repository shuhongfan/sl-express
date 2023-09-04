<!-- 我的页面 -->
<template>
  <view class="navFrame">
    <!-- 我的基本信息 -->
    <BaseInfo :baseData="baseData"></BaseInfo>
    <!-- end -->
    <!-- 我的评价、排班时间 -->
    <Evaluate :baseData="baseData"></Evaluate>
    <!-- end -->
    <!-- 历史取派、作业范围 -->
    <HistoryScope></HistoryScope>
    <!-- end -->
  </view>
  <!-- 退出按钮 -->
  <view class="footBtn">
    <view class="btnBox"
      ><button class="btn-default" @click="handleOut">退出登录</button></view
    >
  </view>
  <!-- end -->
  <!-- footer -->
  <UniFooter :pagePath="'pages/my/index'"></UniFooter>
  <!-- end -->
</template>

<script setup>
import { useStore } from "vuex";
// 时间处理
import { overTimeFormat } from "@/utils/index.js";
// 导入组件
// 底部导航
import UniFooter from "@/components/uni-footer/index.vue";
// 基本信息
import BaseInfo from "./commponents/BaseInfo.vue"
// 我的评价、排班时间
import Evaluate from "./commponents/Evaluate.vue"
// 历史取派、作业范围
import HistoryScope from "./commponents/HistoryScope.vue"
// ------定义变量------
const store = useStore(); //vuex获取储存数据
let baseData = uni.getStorageSync("userInfo"); //获取登录时保存的用户信息
// 退出
const handleOut = () => {
  // 移除指定 token
  uni.removeStorageSync("token");
  // 清理本地数据缓存
  // uni.clearStorage();
  // 移出当前的tab触发事件index值，再次登录后底部菜单会默认选中首页
  store.commit("setFootStatus", 0);
  uni.redirectTo({
    url: "/pages/login/user",
  });
};
</script>
<style src="./index.scss" lang="scss" scoped></style>
