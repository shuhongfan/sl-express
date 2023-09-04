<template>
  <!-- 列表内容 -->
  <view v-for="(item, index) in itemData" :key="index" class="expressage">
    <view class="boxBg">
      <view class="tabList">
        <view class="item" @click.stop="handleDetails($event, item)">
          <view v-if="item.status !== 1" class="history">
            <view class="titInfo">订单号：SD{{ item.orderId }}</view>
            <view class="address">寄件人：{{ item.name }}</view>
            <view class="address">取件地址：{{ item.address }}</view>
            <view class="address">取件时间：{{ item.actualEndTime }}</view>
            <view class="time" v-if="item.status === 2"
              >运费：{{ item.amount }}元</view
            >
          </view>
          <view v-else class="history">
            <view class="titInfo">
              <view>
                <text class="name">{{ item.name }}</text>
                {{ item.phone }}
                <!-- TODO拨打电话和发信息小图标，暂时保留 -->
                <!-- <icon class="phone" @click.stop="handlePhone($event, item.phone)"></icon>
								<icon class="note" @click.stop="handleNote"></icon> -->
              </view>
            </view>
            <view class="address">{{ item.address }}</view>
            <view class="address">{{ item.distance }}公里</view>
            <view class="time"
              >预约取件时间：{{ taskTimeFormat(item.estimatedStartTime) }} 至
              {{ overTimeFormat(item.estimatedEndTime) }}</view
            >
          </view>

          <text
            @click.stop="handleDetails($event, item)"
            class="delete"
            v-if="item.status === 1"
            ><button class="uni-btn btn-default">去取件</button></text
          >
          <text
            @click.stop="handleDetails($event, item)"
            class="delete"
            v-else-if="
              item.status === 2 &&
              item.paymentStatus === 1 &&
              item.paymentMethod === 1
            "
            ><button class="uni-btn btn-default">去收款</button></text
          >
          <text @click.stop="handleOpen($event, item.id)" class="delete" v-else
            ><button class="uni-btn concelBtn">删除</button></text
          >
        </view>
      </view>
    </view>
  </view>
  <!-- end -->
</template>

<script setup>
import { onMounted } from "vue";
import { taskTimeFormat, overTimeFormat } from "@/utils/index.js";
import { useStore } from "vuex";
// 获取父组件数据
const props = defineProps({
  // 数据
  itemData: {
    type: Array,
    default: () => [],
  },
  // 当前触发的tab值
  tabIndex: {
    type: Number,
    default: 0,
  },
});
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
const emit = defineEmits(""); //子组件向父组件事件传递
// ------生命周期------
onMounted(() => {});
// ------定义方法------
// 删除弹层
const handleOpen = (e, id) => {
  // 阻止事件冒泡
  e.stopPropagation();
  emit("handleOpen", id);
};
// 去取件详情
const handleDetails = (e, item) => {
  // 阻止事件冒泡
  e.stopPropagation();
  // 把任务id用vuex的方法存储，方便其他页面调用
  store.commit("user/setTaskId", item.id);
  // 由于取件详情地址和派件详情地址样式一致，所以用类型  1取件，2派件区分开
  store.commit("user/setTaskType", 1);
  // 已取件\已取消\去派件\已签收\详情页用的是一个,所以用类型status声明  1:待取件，2:已取件,3:已取消,4:待派件,5:已签收
  // 用vuex保存状态,因为当从详情页返回列表页的时候要显示对应的tab列表项
  store.commit("user/setTaskStatus", 6);
  store.commit("user/setDetailType", 1); //从历史订单他跳入订单详情
  // 如果时带取件进入到去取件页面
  // 进入详情页
  if (item.status === 1) {
    uni.redirectTo({
      url: "/pages/details/index",
    });
  } else if (
    item.status === 2 &&
    item.paymentStatus === 1 &&
    item.paymentMethod === 1
  ) {
    // 未付款进入付款二维码页面
    store.commit("user/setPayData", {});
    uni.redirectTo({
      url: "/pages/pay/scanPay",
    });
  } else {
    // 已经完成的进入订单详情页
    uni.redirectTo({
      url: "/pages/details/waybill",
    });
  }
};
</script>
