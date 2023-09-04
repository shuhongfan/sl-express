<template>
    <view class="boxBg headTop">
      <view class="headItem">
        <view class="item">
          <text>我的评价</text>
          <view class="star">
            <uni-rate
              :readonly="true"
              allow-half
              :value="4.5"
              active-color="#EF4F3F"
              color="#F4F4F4"
            />
            <text>{{ 4.5 }}</text>
          </view>
        </view>
        <view class="item">
          <text>排班时间</text>
          <text
            v-if="
              (!baseData.startTime || baseData.startTime === '') &&
              (!baseData.endTime || baseData.endTime === '')
            "
            >无</text
          >
          <text v-else
            >{{ overTimeFormat(baseData.startTime) }}-{{
              overTimeFormat(baseData.endTime)
            }}</text
          >
        </view>
      </view>
    </view>
</template>
<script setup>
// 时间处理
import { overTimeFormat } from "@/utils/index.js";
// 获取父组件数据
const props = defineProps({
  baseData: {
    type: Object,
    default: () => ({}),
  },
});
</script>
<style src="./../index.scss" lang="scss" scoped></style>