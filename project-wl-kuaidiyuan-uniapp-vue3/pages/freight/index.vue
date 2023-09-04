<!-- 运费查询页 -->
<template>
  <!-- 自定义头部 -->
  <view class="navHead"><UniNav :title="title" @goBack="goBack"></UniNav></view>
  <!-- end -->
  <!-- 列表 -->
  <view class="pageBox freightBox">
    <!-- 地址 -->
    <UniAddress ref="address" @handleCity="handleCity"></UniAddress>
    <!-- end -->
    <!-- 重量、体积计算 -->
    <view class="boxBg">
      <GoodsInfo ref="goods"></GoodsInfo>
    </view>

    <!-- end -->
    <!-- 查询按钮 -->
    <view class="btnBox"
      ><button
        class="btn-default"
        :class="isCityId ? '' : 'btn-forbid'"
        @click="handleSubmit"
      >
        立即查询
      </button></view
    >
    <!-- end -->
    <!-- 查询结果 -->
    <Result :baseData="baseData.value" v-if="isShow"></Result>
    <!-- end -->
  </view>
  <!-- end -->
</template>

<script setup>
import { ref, reactive } from "vue";
// 接口 api
import { calculateFreight } from "@/pages/api/freight.js";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
// 地址选择组件
import UniAddress from "./components/address.vue";
// 物品信息组件
import GoodsInfo from "@/components/uni-goods/index.vue";
// 查询结果
import Result from "./components/result.vue";
// ------定义变量------
const title = ref("运费查询");
const isShow = ref(false);//是否显示查询结果
let baseData = reactive({});//储存数据
const goods = ref(); //定义子组件的ref,可以调取子组件的值
const address = ref(); //定义子组件的ref,可以调取子组件的值
const isCityId = ref(false);
// ------定义方法------
// 立即查询
const handleSubmit = async () => {
  // 显示查询结果
  const senderCountyId = address.value.mailCity.areaId; // 寄件id
  const receiverCountyId = address.value.consigneeCity.areaId; // 收件id
  const goodData = goods.value;

  if (!senderCountyId) {
    return uni.showToast({
      title: "请选择寄件城市",
      duration: 1000,
      icon: "none",
    });
  }
  if (!receiverCountyId) {
    return uni.showToast({
      title: "请选择收件城市",
      duration: 1000,
      icon: "none",
    });
  }
  isShow.value = true;
  let data = {
    senderCountyId: senderCountyId,
    receiverCountyId: receiverCountyId,
    volume: goodData.volume === 0 ? 1 : goodData.volume * 1000000,
    weight: goodData.weight,
    measureLong: goodData.measureLong,
    measureWidth: goodData.measureWidth,
    measureHigh: goodData.measureHigh,
  };
  const res = await calculateFreight(data);
  if (res.code === 200) {
    baseData.value = {
      volumeValue: goodData.volume,
      ...res.data,
    };
  } else {
    return uni.showToast({
      title: res.msg,
      duration: 1000,
      icon: "none",
    });
  }
};
// 是否选择了寄件地址和收件地址
const handleCity = (val) => {
  isCityId.value = val;
};

// 返回上一页
const goBack = () => {
  uni.redirectTo({
    url: "/pages/index/index",
  });
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
