<template>
    <view class="boxBg">
      <view class="headItem">
        <view class="item" @click="handleHistory">
          <text>全部取派</text>
          <text><icon class="nextIcon"></icon></text>
        </view>
        <navigator url="/pages/my/map" open-type="redirect">
          <view class="item">
            <text>作业范围</text>
            <text><icon class="nextIcon"></icon></text>
          </view>
        </navigator>
      </view>
    </view>
</template>
<script setup>
import { useStore } from "vuex";
const store = useStore(); //vuex获取储存数据
// ------定义方法------
// 历史派件
const handleHistory = () => {
  store.commit("user/setTabIndex", 0);
  store.commit("user/setTaskStatus", -1);
  uni.navigateTo({
    url: "/pages/history/index",
  });
};
</script>
<style src="./../index.scss" lang="scss" scoped></style>