<template>
    <view class="nav-bg mnav-bg">
      <view class="headBg"></view>
      <view class="header">
        <view class="headBox">
          <view class="head"
            ><icon v-if="baseData.avatar === ''"></icon
            ><image :src="baseData.avatar" v-else></image
          ></view>
          <view class="info">
            <view class="tit">{{ baseData.name }}</view>
            <view>{{ baseData.account }}</view>
            <view class="address">
              <icon></icon>
              {{ baseData.agencyName ? baseData.agencyName : "暂无" }}
            </view>
          </view>
        </view>
        <view class="QR" @click="handleQr"
          ><image src="../../../static/qr.png"></image
        ></view>
      </view>
    </view>
</template>
<script setup>
// 获取父组件数据
const props = defineProps({
  baseData: {
    type: Object,
    default: () => ({}),
  },
});
// ------定义方法------
// 二维码暂时不做
const handleQr = () => {
  // TODO暂时保留
  // uni.navigateTo({
  // 	url:'/pages/my/qrCode'
  // })
  uni.showToast({
    title: "程序员哥哥正在实现中",
    duration: 1000,
    icon: "none",
  });
};
</script>
<style src="./../index.scss" lang="scss" scoped></style>