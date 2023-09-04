<!-- 订单取消原因选择 -->
<template>
  <!-- 自定义头部 -->
  <UniNav :title="title" @goBack="goBack"></UniNav>
  <!-- end -->
  <view class="pageBox">
    <view class="boxCon concelBox">
      <view class="tabConList conCenter">
        <view
          class="item"
          v-for="(item, index) in baseData"
          :key="index"
          @click="handleClick(item)"
        >
          <view>{{ item.label }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
// 导入公用数据
import { cancelData } from "@/utils/commonData.js";
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const title = ref("订单取消原因"); //nav标题
const baseData = reactive(cancelData);
// ------定义方法------
const handleClick = (item) => {
  let isRedistribute = false;
  if (item.value === 8) {
    isRedistribute = true;
  }
  // vuex储存数据
  store.commit("user/setReasonVal", item);
  store.commit("user/setRedistribute", isRedistribute);
  uni.redirectTo({
    url: "/pages/cancel/index",
  });
};
// 返回上一页
const goBack = () => {
  uni.redirectTo({
    url: "/pages/cancel/index",
  });
};
</script>

<style src="../../styles/expressage.scss" lang="scss" scoped></style>
