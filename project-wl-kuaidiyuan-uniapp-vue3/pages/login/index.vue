<!-- 手机短信登录页 -->
<template>
  <view class="loginBox">
    <view class="tit">
      <text>手机号登录</text>
      <text class="text" @click="goLogin">
        账号登录
        <icon></icon>
      </text>
    </view>
    <!-- 登录表单 手机号、验证码 -->
    <view class="loginMain">
      <uni-forms ref="customForm" :rules="customRules" :modelValue="fromInfo">
        <uni-forms-item name="phone"
          ><uni-easyinput
            class="item"
            v-model="fromInfo.phone"
            placeholder="请输入手机号"
        /></uni-forms-item>
        <uni-forms-item name="verifyCode">
          <uni-easyinput
            class="item inputW"
            v-model="fromInfo.verifyCode"
            placeholder="请输入验证码"
          />
          <view class="codeBox">
            <text class="code" v-show="codeInfo.show" @click="getCode"
              >获取验证码</text
            >
            <text class="code fontCol" v-show="!codeInfo.show"
              >{{ codeInfo.times }}s后重新获取</text
            >
          </view>
        </uni-forms-item>
      </uni-forms>
      <!-- 按钮 -->
      <view class="btnBox">
        <button
          class="btn-default"
          :disabled="
            fromInfo.phone.length === 0 || fromInfo.verifyCode.length === 0
          "
          :class="
            fromInfo.phone.length === 0 || fromInfo.verifyCode.length === 0
              ? 'disabled'
              : ''
          "
          type="primary"
          @click="handleSubmit"
        >
          登录
        </button>
      </view>
      <!-- end -->
    </view>
    <!-- end -->
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
// 接口
import { phoneLogins, getsmsCode } from "../api/user.js";
// 验证
import { validatePhone, timeCountdown, isPhone } from "@/utils/validate";
// ------定义变量------
const store = useStore(); //vuex获取储存数据
const customForm = ref();
let isVerifySuccess = ref(false);
// 表单数据
let fromInfo = reactive({
  phone: "", //手机号
  verifyCode: "", // 验证码
});
// 验证码倒计时数据
let codeInfo = reactive({
  show: true,
  timer: null,
  times: 60,
});
// 表单校验
const customRules = reactive({
  phone: {
    rules: [
      {
        required: true,
        validateFunction: validatePhone,
        errorMessage: "请输入手机号",
      },
    ],
  },
  verifyCode: {
    rules: [
      {
        required: true,
        errorMessage: "请输入验证码",
      },
    ],
  },
});
// ------生命周期------
onMounted(() => {});
// ------定义方法------
// 获取验证码
const getCode = async () => {
  let p = fromInfo.phone;

  isVerifySuccess.value = isPhone(p);

  if (isVerifySuccess.value) {
    timeCountdown(codeInfo);
    const parent = {
      phone: phone.value,
    };
	// TODO暂时保留
    // 获取手机验证码
    // const {data} = await getsmsCode(parent)
    // if(data.code===0){

    // }else{
    // 	return uni.showToast({
    // 		title: data.msg,
    // 		duration: 1000,
    // 		icon: 'none'
    // 	});
    // }
  } else {
    return uni.showToast({
      title: "手机号输入错误！请重新输入",
      duration: 1000,
      icon: "none",
    });
  }
};
// 登录
const handleSubmit = async () => {
  // 表单校验
  const valid = await customForm.value.validate();
  if (valid) {
    // 登录接口
    await phoneLogins(fromInfo).then((res) => {
      if (res.code === 0) {
        store.commit("user/setToken", res.token);
        // 通过vuex获取用户信息
        store.dispatch("user/GetUsersInfo");
        // 跳转到首页
        uni.redirectTo({
          url: "/pages/index/index",
        });
      } else {
        return uni.showToast({
          title: res.msg,
          duration: 1000,
          icon: "none",
        });
      }
    });
  }
};
// 去手机登录页面
const goLogin = () => {
  uni.redirectTo({
    url: "/pages/login/user",
  });
};
</script>
<style src="./index.scss" lang="scss" scoped></style>
