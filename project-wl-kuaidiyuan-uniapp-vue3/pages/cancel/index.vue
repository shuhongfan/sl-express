<!-- 订单取消原因申请 -->
<template>
  <!-- 自定义头部 -->
  <UniNav :title="title" @goBack="goBack"></UniNav>
  <!-- end -->
  <view class="pageBox">
    <view class="boxCon concelBox">
      <view class="tabConList">
        <view class="item">
          <text>寄件人：</text>
          <view>{{ detailsData.senderName }}</view>
        </view>
        <view class="item">
          <text>订单号：</text>
          <view>{{ detailsData.orderId }}</view>
        </view>
        <view class="item">
          <text>寄件人地址：</text>
          <view>{{ detailsData.senderAddress }}</view>
        </view>
      </view>
    </view>
    <view class="boxCon concelBox">
      <view class="tabConList">
        <view class="item" @click="handleCause">
          <text>订单取消原因</text>
          <view class="cause">
            {{ reason }}
            <icon class="nextIcon"></icon>
          </view>
        </view>
        <view class="item">
          <view>
            <textarea
              placeholder="订单取消原因描述："
              :placeholder-class="placeholderClass"
              v-model="reasonDesc"
              @input="monitorInput"
            ></textarea>
          </view>
        </view>
      </view>
    </view>
    <view class="btnBox"
      ><button
        class="btn-default uni-mini"
        @click="handleSubmit"
        :disabled="reason === '' || !reason"
        :class="reason === '' || !reason ? 'disabled' : ''"
      >
        确定
      </button></view
    >
  </view>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
// 设置字符串的长度
import { validateTextLength } from "@/utils/index.js";
// 接口
import { getDetail, taskCancel } from "@/pages/api/index.js";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
const taskId = users.taskId; //用vuex获取列表页传过来的任务id
const title = ref("订单取消原因申请"); //nav标题
let reasonDesc = ref(""); //原因描述
let reason = users.reasonVal.label !== "" ? users.reasonVal.label : ""; //取消原因
const detailsData = ref({}); //详情数据
// ------生命周期------
onMounted(() => {
  // 获取订单取消原因描述
  if (users.reasonDesc !== "") {
    reasonDesc.value = users.reasonDesc;
  }
  // 获取详情
  getDetails(taskId);
});
// ------定义方法------
// 获取详情
const getDetails = async (id) => {
  await getDetail(id).then((res) => {
    detailsData.value = res.data;
  });
};
// 订单取消原因描述控制在100
const monitorInput = () => {
  nextTick(() => {
    let leng = validateTextLength(reasonDesc.value);
    if (leng > 100) {
      reasonDesc.value = reasonDesc.value.substring(0, 100);
    }
  });
};
// 提交原因申请
const handleSubmit = async () => {
  if (reason !== "") {
		// 网络慢的时候添加按钮loading
		let times = 
		setTimeout(()=>{
			uni.showLoading({
				title: 'loading',
			});
		},500)
    const params = {
      id: taskId,
      reason: users.reasonVal.value,
      reasonDesc: reasonDesc.value,
    };
    await taskCancel(params).then((res) => {
      store.commit("user/setTabIndex", 0);
      uni.redirectTo({
        url: "/pages/pickup/index",
      });
      if (res.code === 200) {
				// 操作成功后清除loading
					setTimeout(function () {
						uni.hideLoading();
					}, 500);
					clearTimeout(times)
        goBack();
        return uni.showToast({
          title: "申请成功!",
          duration: 1000,
          icon: "none",
        });
      }
    });
  } else {
    return uni.showToast({
      title: "请选择取消原因!",
      duration: 1000,
      icon: "none",
    });
  }
};
// 取消订单原因选择
const handleCause = () => {
  // 由于要跳转到取消原因页面，跳转后订单原因描述数据会自动销毁，所以先用vuex存起来
  store.commit("user/setReasonDesc", reasonDesc.value);
  // 任务id
  uni.navigateTo({
    url: "/pages/cancel/cause",
  });
};
// 返回上一页
const goBack = () => {
  uni.redirectTo({
    url: "/pages/pickup/index",
  });
};
</script>

<style src="../../styles/expressage.scss" lang="scss" scoped></style>
