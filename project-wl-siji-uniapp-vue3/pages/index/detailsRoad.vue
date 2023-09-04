<!-- 在途 - 详情 -->
<template>
  <!-- 详情 -->
  <view class="details">
    <DetailsNav title="任务详情"></DetailsNav>
    <!-- 取件状态列表 -->
    <view class="container">
      <!-- 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度-->
      <scroll-view scroll-y="true" class="swiperH">
        <view class="cont" v-if="Object.keys(itemData).length > 0">
          <!-- 通用卡片组件 - 在途 - 带开关 -->
          <CardCont title="基本信息" :open="true">
            <DetailsBaseInfo :itemData="itemData"></DetailsBaseInfo>
          </CardCont>
          <!-- 司机信息 -->
          <CardCont title="车辆司机信息">
            <view class="carInfo">
              <view class="line">
                <text class="tit">车牌号</text>
                <text class="ritEl">{{ itemData.licensePlate }}</text>
              </view>
              <view class="line">
                <text class="tit">司机姓名</text>
                <text class="ritEl">{{ itemData.driverName }}</text>
              </view>
            </view>
          </CardCont>
          <CardCont title="运输路线">
            <RouteCont :itemData="itemData"></RouteCont>
          </CardCont>
          <!-- 物品信息 -->
          <CardCont title="物品信息" :label="`共计: ${amount}单`">
            <OrderCont
              :itemData="orders"
              @searchHandle="searchHandle"
            ></OrderCont>
          </CardCont>
          <!-- 异常信息 -->
          <CardCont title="异常信息">
            <view v-for="(item, index) in itemData.exception" :key="index">
              <view class="delay">
                <view class="info">
                  <view class="line">
                    <text>上报时间 </text
                    ><text class="desc"> {{ item.exceptionTime }} </text>
                  </view>
                  <view class="line">
                    <text>异常类型 </text
                    ><text class="desc"> {{ item.exceptionType }} </text>
                  </view>
                  <view class="line">
                    <text>继续运输 </text
                    ><text class="desc"> {{ item.processResults }} </text>
                  </view>
                </view>
                <image
                  @click="ExceptionHandle('?id=' + item.exceptionId)"
                  class="goInfoIcon"
                  src="../../static/sj_open_rit.png"
                  mode=""
                ></image>
              </view>
            </view>
          </CardCont>
          <!-- 交货信息 -->
          <CardCont title="交货信息">
            <view class="upPicCont">
              <view class="title">请拍照上传回单凭证</view>
              <uni-file-picker
                v-model="cargoPickUpPicture"
                fileMediatype="image"
                mode="grid"
                limit="3"
                @select="selectA"
              />
            </view>
            <view class="upPicCont">
              <view class="title">请拍照上传货品照片</view>
              <uni-file-picker
                v-model="cargoPicture"
                fileMediatype="image"
                mode="grid"
                limit="3"
                @select="selectB"
              />
            </view>
          </CardCont>
        </view>
        <!-- 无数据显示 -->
        <view v-if="Object.keys(itemData).length === 0">
          <EmptyPage emptyInfo="暂无数据!" />
        </view>
        <!-- end -->
      </scroll-view>
    </view>
    <!-- end -->
  </view>
  <!-- footer -->
  <view class="footCont">
    <view class="footButCan">
      <text class="buttonCancel" @click="ExceptionHandle()">上报异常</text>
    </view>
    <view class="footBut">
      <text v-show="isTake" class="button" @click="takeGoods()">交付</text>
      <text v-show="!isTake" class="buttonDis1">交付</text>
    </view>
  </view>
  <!-- end -->
</template>
<script>
export default {
  mounted() {
    // #ifdef APP-NVUE
    const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
    // #endif
    // #ifndef APP-NVUE
    const eventChannel = this.getOpenerEventChannel();
    // #endif
    eventChannel.emit('acceptDataFromOpenedPage', {
      data: 'data from test page',
    });
    eventChannel.emit('someEvent', {
      data: 'data from test page for someEvent',
    });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage');
  },
};
</script>
<script setup>
import { ref, reactive, onMounted, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { positionUploadHandle } from '@/utils/index.js';
// 导入接口
import {
  GetTaskDetails,
  GetTaskDetailsOrders,
  Deliver,
} from '@/pages/api/index.js';
// 导入组件
import DetailsNav from '@/components/DetailsNav/index.vue';
import EmptyPage from '@/components/EmptyPage/index.vue';
import DetailsBaseInfo from './components/DetailsBaseInfo.vue';
import OrderCont from './components/OrderCont.vue';
import RouteCont from './components/RouteCont.vue';
// 接口调用
import { upload } from '@/pages/api/index.js';
// 主体部分
import CardCont from '@/components/CardCont/index.vue';

// ------定义变量------
const store = useStore(); //vuex获取储存数据
const itemData = ref([]);
const orders = ref([]); // 货物信息列表
const amount = ref(0); // 货物信息总数

const id = ref(''); // 任务Id
const cargoPickUpPicture = ref([]); // 提货凭证
const cargoPicture = ref([]); // 货物照片
const isTake = ref(false);

// ------生命周期------
onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1].$page.options;
  id.value = currentPage.id;
  getDetailsInfo();
  getOrders();
});
// 监听是否可以提货
watchEffect(
  [
    cargoPickUpPicture,
    () => {
      isTake.value = cargoPickUpPicture.length > 0 && cargoPicture.length > 0;
    },
  ],
  [
    cargoPicture,
    () => {
      isTake.value = cargoPickUpPicture.length > 0 && cargoPicture.length > 0;
    },
  ]
);
// ------定义方法------
// 获取任务详情的数据
const getDetailsInfo = async () => {
  // 获取任务详情的数据
  await GetTaskDetails(id.value)
    .then((res) => {
      const { data } = res;
      if (res.code === 200) {
        itemData.value = data;
        getOrders(data.transportTaskId);
      } else {
        return uni.showToast({
          title: res.msg,
          duration: 1000,
          icon: 'none',
        });
      }
    })
    .catch((err) => {});
};
// 获取物品订单信息
const getOrders = async (orderId, transportOrderId = '') => {
  const params = {
    transportOrderId,
    taskId: orderId,
    page: 1,
    pageSize: 100,
  };
  await GetTaskDetailsOrders(params)
    .then((res) => {
      if (res.code === 200) {
        amount.value = res.data.counts ? res.data.counts : 0;
        orders.value = res.data.items;
      } else {
        return uni.showToast({
          title: res.msg,
          duration: 1000,
          icon: 'none',
        });
      }
    })
    .catch((err) => {});
};
// 物品信息搜索
function searchHandle(transportOrderId) {
  getOrders(itemData.value.transportTaskId, transportOrderId);
}
// 上报异常 、异常详情
function ExceptionHandle(src) {
  uni.showToast({
    title: '上报异常暂时接口还在实现中！',
    duration: 1000,
    icon: 'none',
  });
  return false;
  const url = src ? `/pages/index/exception${src}` : '/pages/index/exception';
  uni.navigateTo({ url });
}

// 交付
async function takeGoods() {
  const cargoPickUpPictureStr = cargoPickUpPicture.value
    .map((n) => n.path)
    .join();
  const cargoPictureStr = cargoPicture.value.map((n) => n.path).join();
  const params = {
    id: id.value,
    transportCertificate: cargoPickUpPictureStr,
    deliverPicture: cargoPictureStr,
  };
  // 网络慢的时候添加按钮loading
  let times = setTimeout(() => {
    uni.showLoading({
      title: 'loading',
      mask:true
    });
  }, 500);
  await Deliver(params)
    .then((res) => {
      if (res.code === 200) {
        // 交付之后 上报位置
        positionUploadHandle(true);
        // 操作成功后清除loading
        setTimeout(function () {
          uni.hideLoading();
        }, 500);
        clearTimeout(times);
        uni.showToast({
          title: '提货完成',
          duration: 1000,
          icon: 'none',
        });
        uni.redirectTo({
          url: '/pages/index/index',
        });
      } else {
        return uni.showToast({
          title: res.msg,
          duration: 1000,
          icon: 'none',
        });
      }
    })
    .catch((err) => {});
}
// 图片上传
const imageValue = ref([]);
const upImg = ref(null);
// 文件上传
async function uploadHande(e, type) {
  await upload(e)
    .then((res) => {
      if (res.code === 200) {
        if (res.data) {
          isTake.value = true;
          const name = res.data.split('/')[res.data.split('/').length - 1]; // .at(-1) 新语法APP不支持
          let data = {
            url: res.data,
            name,
            extName: name.split('.')[name.split('.').length - 1],
          };
          if (type == 'cargoPickUpPicture') {
            cargoPickUpPicture.value = [...cargoPickUpPicture.value, data];
          } else {
            cargoPicture.value = [...cargoPicture.value, data];
          }
        }
      } else {
        return uni.showToast({
          title: res.msg,
          duration: 1000,
          icon: 'none',
        });
      }
    })
    .catch((err) => {
      uni.showToast({
        title: '图片上传失败！请联系管理员',
        duration: 1000,
        icon: 'none',
      });
    });
}
// 文件选择并上传 - 回单凭证上传
async function selectA(e) {
  cargoPickUpPicture.value = [];
  const tempFiles = e.tempFiles[0];
  if (
    tempFiles.size < 1024 * 5 * 1024 &&
    (tempFiles.extname == 'png' ||
      tempFiles.extname == 'jpg' ||
      tempFiles.extname == 'jpeg' ||
      tempFiles.extname == 'gif')
  ) {
    uploadHande(e, 'cargoPickUpPicture');
  } else {
    uni.showToast({
      title: '上传图片大小不能超过5M，格式需为jpg、png、gif',
      duration: 2000,
      icon: 'none',
    });
  }
}
// 文件选择并上传 - 货品照片上传
async function selectB(e) {
  cargoPicture.value = [];
  const tempFiles = e.tempFiles[0];
  if (
    tempFiles.size < 1024 * 5 * 1024 &&
    (tempFiles.extname == 'png' ||
      tempFiles.extname == 'jpg' ||
      tempFiles.extname == 'jpeg' ||
      tempFiles.extname == 'gif')
  ) {
    uploadHande(e, 'cargoPicture');
  } else {
    uni.showToast({
      title: '上传图片大小不能超过5M，格式需为jpg、png、gif',
      duration: 2000,
      icon: 'none',
    });
  }
}
</script>
<style src="./index.scss" lang="scss"></style>
<style lang="scss" scoped>
.details {
  height: calc(100vh - 120rpx);
  .swiperH {
    height: calc(100vh - 240rpx);
    padding-bottom: 26rpx;
  }
}
</style>
