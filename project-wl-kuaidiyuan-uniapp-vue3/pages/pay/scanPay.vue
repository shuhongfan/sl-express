<!-- 扫码支付页 -->
<template>
  <!-- 自定义头部 -->
  <UniNav :title="title" @goBack="goBack"></UniNav>
  <!-- end -->
  <view class="pageBox scanPay">
    <view class="boxBg srCan">
      <view class="qr-box" v-if="qrShow"><canvas canvas-id="qrcode" /></view>
      <image :src="qrCodeImg" v-else></image>
      <view class="text">
        <text>¥</text>
        {{ detailsData.freight }}
      </view>
      <view>支付运费</view>
    </view>
    <view class="boxBg payBox" v-for="(item, index) in PayWayData" :key="index">
      <view class="item">
        <view>
          <icon></icon>
          {{ item.label }}
        </view>
        <view>
          <view class="checkRadio"
            ><radio
              :value="String(index)"
              :class="index === current ? 'active' : ''"
              :checked="index === current"
              @click="checkbox(index)"
          /></view>
        </view>
      </view>
    </view>
  </view>
  <!-- 支付成功弹层 -->
  <Uppop ref="uppop"></Uppop>
  <!-- end -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import uQRCode from "@/utils/uqrcode.js"; //引入uqrcode.js
// 获取数据
import { PayWayData } from "@/utils/commonData.js";
// 接口
import { getQrCode, paySucceed, getDetail } from "@/pages/api/index.js";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
import Uppop from "./components/uppop.vue";
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
const uppop = ref();
const title = ref("扫码支付"); //nav标题
const pages = getCurrentPages(); //获取加载的页面，获取当前页面路由信息uniapp 做安卓不支持 vue-router
const currentPage = pages[pages.length - 1]; //获取当前页面的对象
const type = currentPage.$page.options.type;
const pay = currentPage.$page.options.pay;
let isLeftText = true; //是否显示左侧文字
let current = ref(0); //当前触发付款方式的值
let qrCodeImg = ref("");
let times = ref(null);
let detailsData = ref({}); //详情数据
let qrShow = ref(false); //二维码支付有两种情况：一种是后端返回的base64图片，另一种是后端返回的二维码地址，需要前端来做处理

onMounted(() => {
  getDetails();
  // 10秒钟监听一下付款状态是否付款
  times.value = setInterval(() => {
    getPaySucceed();
  }, 10000);
});
// ------定义方法------
const getPaySucceed = async () => {
  await paySucceed(users.detailsData.orderId).then((res) => {
    if (res.code === 200) {
      // 如果付款成功，弹出付款成功弹层
      if (res.data) {
        // 清除定时器
        clearInterval(times.value);
        uppop.value.dialogOpen();
      }
    }
  });
};
// 获取订单详情
const getDetails = async () => {
  await getDetail(users.taskId).then((res) => {
    detailsData.value = res.data;
    store.commit("user/setDetailsData", detailsData.value);
    getCode(res.data);
  });
};
// 获取支付二维码
const getCode = async (obj) => {
  let data = users.payData;
  let params = {};
  if (data.tradingAmount) {
    params = {
      memo: data.memo ? data.memo : "备注",
      payMethod: current.value === 0 ? 2 : 1,
      productOrderNo: data.productOrderNo,
      tradingAmount: data.tradingAmount,
    };
  } else {
    params = {
      memo: obj.remark ? obj.remark : "备注",
      payMethod: current.value === 0 ? 2 : 1,
      productOrderNo: obj.orderId,
      tradingAmount: obj.freight,
    };
  }
  // 网络慢的时候添加按钮loading
		let times = 
		setTimeout(()=>{
			uni.showLoading({
				title: 'loading',
			});
		},500)
  // 调用接口
  await getQrCode(params).then((res) => {
		// 操作成功后清除loading
					uni.hideLoading();
					clearTimeout(times)
    const data = res.data;
    const str = data.qrCode.slice(0, 10);
    // 以base图片显示二维码
    if (str === "data:image") {
      qrCodeImg.value = data.qrCode.replace(/[\r\n]/g, "");
    } else {
      // 后端直接返回的二维码地址，需要前端处理一下返回的二维码地址
      qrCodeFun(data.qrCode);
    }
  });
};
// 处理后端返回的地址生成二维码
const qrCodeFun = (valUrl) => {
  qrShow.value = true;
  uQRCode.make({
    canvasId: "qrcode", //放置在哪个标签中，将ID设置为相同
    componentInstance: this,
    text: valUrl, //valUrl为存放要传输的数据的变量
    size: 200, //大小左右都为200 ！注意要和容器大小一致
    margin: 0, //不改变大小添加白色边框
    backgroundColor: "#ffffff",
    foregroundColor: "#000000",
    fileType: "jpg",
    errorCorrectLevel: uQRCode.errorCorrectLevel.H,
    success: (res) => {},
  });
};
// 选项框点击事件，参数是数据的下标
const checkbox = (index) => {
  current.value = index;
  getCode(detailsData.value);
};
// 返回上一页
const goBack = () => {
  // 清除定时器
  clearInterval(times.value);
  // 返回派件详情
  // 派件返回
  if (users.isDelivery) {
    if (users.detailType === 2 && users.taskStatus === 6) {
      // 如果时从历史取派的取件列表进入的，返回的时候进入到历史取派列表
      store.commit("user/setTabIndex", 1);
      uni.redirectTo({
        url: "/pages/history/index",
      });
    } else if (users.detailType === 0 && users.taskStatus === 5) {
      // 如果是派件列表进入的，返回的时候进入到派件列表
      store.commit("user/setTabIndex", 1);
      uni.redirectTo({
        url: "/pages/delivery/index",
      });
    } else if (users.isPickUp && users.paymentMethod === 2 && !pay) {
      // 如果时从派件列表进入的，返回的时候进入到派件列表
      uni.redirectTo({
        url: "/pages/details/waybill",
      });
    } else {
      uni.redirectTo({
        url: "/pages/pay/index?type=" + users.paymentMethod,
      });
      pay = false;
    }
  } else {
    // 取件返回
    if (users.detailType === 1 && users.taskStatus === 6) {
      // 如果是从历史取派的取件列表进入的，返回的时候进入到历史取派列表取件
      store.commit("user/setTabIndex", 0);
      uni.redirectTo({
        url: "/pages/history/index",
      });
    } else if (
      users.detailType === 2 &&
      users.taskStatus === 3 &&
      !users.isSearch
    ) {
      // 如果是从取件列表进入的，返回的时候进入到取件列表的已取件
      store.commit("user/setTabIndex", 1);
      uni.redirectTo({
        url: "/pages/pickup/index",
      });
    } else if (users.isPickUp && users.paymentMethod === 1 && !pay) {
      // 如果时从取件列表进入的，返回的时候进入到取件列表
      // 返回详情
      uni.redirectTo({
        url: "/pages/details/index",
      });
    } else if (users.isSearch) {
      store.commit("user/setIsSearch", false);
      uni.redirectTo({
        url: "/pages/search/index",
      });
    } else {
      uni.redirectTo({
        url: "/pages/pay/index?type=" + users.paymentMethod,
      });
      pay = false;
    }
  }
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
