<!-- 引导页 -->
<template>
  <view class="starPage">
    <view class="page"> </view>
  </view>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "StarPage",
  setup: (props) => {
    onMounted(() => {
      const times = setTimeout(() => {
        uni.redirectTo({
          url: "/pages/login/user",
        });
        clearTimeout(times);
      }, 3000);
    });
    return {};
  },
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
