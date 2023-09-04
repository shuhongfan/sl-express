<!--身份证验证-->
<template>
  <view class="boxBg">
    <view class="tit">
      <text v-if="detailsData.idCardNoVerify === 0 && !flag">
        身份验证（未验证）
        <icon class="iconTip"></icon>
      </text>
      <text v-else-if="detailsData.idCardNoVerify === 1 || flag">
        身份验证（验证通过）
		<!-- TODO 先保留-->
        <!-- <icon class="iconTip"></icon> -->
      </text>
      <text v-else>
        身份验证（验证未通过）
        <icon class="iconTip"></icon>
      </text>
    </view>
    <view class="identityBox" v-if="detailsData.idCardNoVerify !== 1 && !flag">
      <view>
        <uni-forms ref="customForm">
          <uni-forms-item name="name"
            ><uni-easyinput
              class="item"
              v-model="name"
              placeholder="请输入真实姓名"
          /></uni-forms-item>
          <uni-forms-item name="idCard"
            ><uni-easyinput
              class="item"
              v-model="idCard"
              placeholder="请输入身份证号码"
              @blur="handleIdcard"
          /></uni-forms-item>
        </uni-forms>
        <button class="uni-btn concelBtn" @click="handleCheck">验证</button>
      </view>
    </view>
    <view class="identitySuccee" v-else>
      <view class="text" v-if="name !== ''">{{ name }}</view>
      <view class="text">{{
        idCard !== "" ? idCard : detailsData.idCardNo
      }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
// 验证
import { validateIdentityCard } from "@/utils/validate";
// 接口
import { idCardCheck } from "@/pages/api/index.js";
// 获取父组件数据
const props = defineProps({
  detailsData: {
    type: Object,
    default: () => ({}),
  },
});
// ------定义变量------
const customForm = ref();
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
// 表单数据
let idCard = ref(""); //身份证号
let name = ref(""); //身份证号
let isValidate = ref(false); //输入身份证是否验证成功
let flag = ref(null); //是否校验成功
// ------定义方法------
onMounted(() => {
  if (users.cardData) {
    name.value = users.cardData.name;
    name.idCard = users.cardData.idCard;
    flag.value = true;
  }
});
// 身份校验
const handleIdcard = () => {
  const validate = validateIdentityCard(idCard.value);
  if (validate) {
    isValidate.value = true;
  } else {
    return uni.showToast({
      title: validate,
      duration: 1000,
      icon: "none",
    });
  }
};
// 验证身份号
const handleCheck = async () => {
  const params = {
    name: name.value,
    idCard: idCard.value,
  };
  store.commit("user/setCardData", params);
  await idCardCheck(params)
    .then((res) => {
      if (res.code === 200) {
        flag.value = res.data.flag;
        return uni.showToast({
          title: "验证成功",
          duration: 1000,
          icon: "none",
        });
      }
    })
};
// 暴漏给父组件
defineExpose({
  customForm,
  idCard,
  name,
  isValidate,
});
</script>