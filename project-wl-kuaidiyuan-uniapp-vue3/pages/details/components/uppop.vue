<template>
  <view class="uniPopup detailPopup">
    <uni-popup ref="popup" type="bottom">
      <view class="tit">
        <text>{{
          type === 1
            ? "物品名称"
            : type === 2
            ? "付款方式"
            : type === 3
            ? "备注"
            : "签收人"
        }}</text>
        <icon @click="dialogClose">关闭</icon>
      </view>
      <view class="popupContent">
        <!-- 物品名称 -->
        <view v-if="type === 1">
          <view class="goodBox">
            <view
              v-for="(item, index) in GoodsData"
              :key="index"
              class="item"
              :class="index === isActive ? 'active' : ''"
              @click="handleActive(index, item)"
            >
              <text>{{ item.label }}</text>
            </view>
          </view>
          <view v-if="isShowGoodInfo" class="other">
            <textarea
              v-model="otherData"
              placeholder="请输入物品信息"
              @input="monitorInput"
              :maxlength="goodMaxLength"
            ></textarea>
            <text class="numText" :class="goodNumVal === 0 ? 'tip' : ''"
              >{{ goodNumVal }}/10</text
            >
          </view>
        </view>
        <!-- end -->
        <!-- 付款方式 -->
        <view v-else-if="type === 2">
          <view
            class="typeItem"
            v-for="(item, index) in PayMethodData"
            :key="index"
            @click="checkbox(index)"
          >
            <text>{{ item.label }}</text>
            <view class="checkRadio"
              ><radio
                :value="String(index)"
                :class="index === current ? 'active' : ''"
                :checked="index === current"
            /></view>
          </view>
        </view>
        <!-- end -->
        <!-- 备注 -->
        <view v-else-if="type === 3" class="remark">
          <textarea
            v-model="remark"
            placeholder="补充说明"
            @input="textInput"
            :maxlength="remarkMaxLength"
          ></textarea>
          <text class="numText" :class="remarkNumVal === 0 ? 'tip' : ''"
            >{{ remarkNumVal }}/30</text
          >
        </view>
        <!-- end -->
        <!-- 签收人 -->
        <view v-else>
          <view
            class="typeItem"
            v-for="(item, index) in SignData"
            :key="index"
            @click="checkbox(index)"
          >
            <text>{{ item.label }}</text>
            <view class="checkRadio"
              ><radio
                :value="String(index)"
                :class="index === current ? 'active' : ''"
                :checked="index === current"
            /></view>
          </view>
        </view>
        <!-- end -->
      </view>
      <view class="btnBox"
        ><button class="btn-default uni-mini" @click="handleSubmit">
          确定
        </button></view
      >
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";
import { validateTextLength } from "@/utils/index.js";
// 基本数据
import { PayMethodData, GoodsData, SignData } from "@/utils/commonData.js";
// 获取父组件数据
const props = defineProps({
  detailsData: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: Number,
    default: 0,
  },
});
watch(props, (newValue, olcValue) => {
  if (newValue !== undefined) {
    remark.value = newValue.detailsData.remark;
    if (newValue.type === 2) {
      if (newValue.detailsData.paymentMethod === 1) {
        current.value = 0;
      } else {
        current.value = 1;
      }
    }
  }
});
// ------定义变量------
// 定义ref 获取子组件方法或者值
const popup = ref();
const emit = defineEmits(); //子组件向父组件事件传递
let current = ref(0); //当前触发付款方式的值
let isActive = ref(0); //当前触发物品名称的值
let otherData = ref(""); //自定义其他物品信息
let goodNumVal = ref(0); //其他自定义的字节数控制值
let remarkNumVal = ref(0); //备注字节数控制值
let remark = ref(""); //备注
let goodMaxLength = ref(10);
let remarkMaxLength = ref(30);
let isShowGoodInfo = ref(false); //控制其他文本域的显示/隐藏
// ------定义方法------
// 确定
const handleSubmit = () => {
  // type=1 物品名称 type=2 付款方式 type=3 备注
  if (props.type === 1) {
    let val = null;
    if (isShowGoodInfo.value) {
      if (otherData.value === "") {
        return uni.showToast({
          title: "请输入物品信息",
          duration: 1000,
          icon: "none",
        });
      }
      val = otherData.value;
    } else {
      val = GoodsData[isActive.value].label;
    }
    emit("getGoodType", val);
  } else if (props.type === 2) {
    emit("getPayMethod", PayMethodData[current.value].label);
  } else if (props.type === 3) {
    emit("getRemark", remark.value);
  } else {
    emit("getSignType", SignData[current.value].value);
  }
  dialogClose();
};
// 选项框点击事件，参数是数据的下标
const checkbox = (index) => {
  current.value = index;
};
// 选择物品
const handleActive = (index, item) => {
  if (item.label === "其他") {
    isShowGoodInfo.value = true;
  } else {
    isShowGoodInfo.value = false;
  }
  isActive.value = index;
};
// 打开弹层
const dialogOpen = () => {
  popup.value.open();
};
// 关闭弹层
const dialogClose = () => {
  popup.value.close();
};
// 其他自定义的名称控制10个字符
const monitorInput = () => {
  nextTick(() => {
    let leng = validateTextLength(otherData.value);
    if (leng >= 10) {
      goodMaxLength.value = leng;
    } else {
      goodMaxLength.value = 20;
    }
    goodNumVal.value = Math.floor(leng);
  });
};
// 备注控制50个字符
const textInput = () => {
  nextTick(() => {
    let leng = validateTextLength(remark.value);
    if (leng >= 30) {
      remarkMaxLength.value = leng;
    } else {
      remarkMaxLength.value = 60;
    }
    remarkNumVal.value = Math.floor(leng);
  });
};
// 向父组件暴露方法
defineExpose({
  dialogOpen,
  current,
});
</script>
