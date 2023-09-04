<template>
  <view class="container phoneCon">
    <uni-popup ref="popup" type="bottom" class="popupBox">
      <view class="popup-content">
        <view>{{ phoneData }}</view>
        <view @click="call">呼叫</view>
      </view>
      <view @click="closePopup" class="closePopup">取消</view>
    </uni-popup>
  </view>
</template>
<script setup>
import { ref } from "vue";
import { call } from "@/utils/index.js";

// 获取父组件数据
const props = defineProps({
  // 是否触发管理按钮
  phoneData: {
    type: String,
    default: "",
  },
});
const popup = ref();
// //TODO 电话号码拨打
// 			const call = () =>{
// 				// 暂时关闭打电话
// 				// call(this.phoneData)
// 			}
// 			// 打开弹层
const dialogOpen = () => {
  popup.value.open();
};
// 关闭弹层
const closePopup = () => {
  popup.value.close();
};
// 			//把数据、方法暴漏给父组件
defineExpose({ dialogOpen });
</script>
