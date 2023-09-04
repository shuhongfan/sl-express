<!--收寄地址-->
<template>
  <view class="boxBg">
    <view class="addressCon">
      <view class="item" @click="handleDate(1)">
        <view class="sendIcon">寄</view>
        <view class="address">
          <view :class="mailCity.province ? 'active' : ''">
            <view v-if="!mailCity.province">请选择寄件城市</view>
            <view v-else>
              <text>{{ mailCity.province }}</text>
              <text>{{ mailCity.city }}</text>
              <text>{{ mailCity.area }}</text>
            </view>
          </view>
          <icon class="nextIcon"></icon>
        </view>
        <view class="line"></view>
      </view>
      <view class="item" @click="handleDate(2)">
        <view class="receiveIcon">收</view>
        <view class="address">
          <view :class="consigneeCity.province ? 'active' : ''">
            <view v-if="!consigneeCity.province">请选择收件城市</view>
            <view v-else>
              <text>{{ consigneeCity.province }}</text>
              <text>{{ consigneeCity.city }}</text>
              <text>{{ consigneeCity.area }}</text>
            </view>
          </view>
          <icon class="nextIcon"></icon>
        </view>
      </view>
    </view>
    <CityPopup ref="city" :type="type" @getCity="getCity"></CityPopup>
  </view>
</template>

<script setup>
import { ref } from "vue";
// 接口pai
// 导入组件
// 城市弹层
import CityPopup from "@/components/uni-address/index.vue";
// ------定义变量------
const city = ref(); //定义子组件ref，获取子组件方法
const emit = defineEmits();
let type = ref(null); //触发的寄件还是收件：type=1 寄件;type=2 收件
let mailCity = ref({}); //寄件数据
let consigneeCity = ref({}); //收件数据
// ------定义方法------
// 地址弹层弹层
const handleDate = (val) => {
  // type代表触发的寄件还是收件：type=1 寄件;type=2 收件
  type.value = val;
  city.value.handleOpen();
};
// 获取区县
const getCity = (obj) => {
  if (type.value === 1) {
    mailCity.value = obj;
  } else {
    consigneeCity.value = obj;
  }
  if (mailCity.value.areaId && consigneeCity.value.areaId) {
    emit("handleCity", true);
  }
};
//把数据、方法暴漏给父组件
defineExpose({
  mailCity,
  consigneeCity,
});
</script>

<style></style>
