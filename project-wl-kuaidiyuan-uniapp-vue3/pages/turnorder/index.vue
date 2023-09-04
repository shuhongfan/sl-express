<!-- 转单页 -->
<template>
  <!-- 搜索nav -->
  <view class="navBox">
    <view class="search">
      <!-- 头部自定义导航 -->
      <view class="uni-navbar">
        <view class="input-view">
          <uni-icons
            class="input-uni-icon"
            type="search"
            size="18"
            color="#999"
          />
          <input
            confirm-type="search"
            class="nav-bar-input"
            type="text"
            v-model="searchVal"
            placeholder="请输入快递员账号查询"
            @input="handleSearch"
          />
          <!-- 先保留，后期可能要加次功能 -->
          <!-- <view class="scanIcon" @click="handleQr"></view> -->
        </view>
        <view class="concelBox" @click="handleCancel" v-if="isShowCancel"
          >取消</view
        >
      </view>
      <!-- end -->
    </view>
  </view>
  <!-- end -->
  <view class="boxTop">
    <view class="btnBox turnBox" v-if="itemData.length > 0">
      <scroll-view scroll-y="true">
        <view
          class="boxBg"
          v-for="(item, index) in itemData"
          :key="index"
          @click="handleOpen(item.userId)"
        >
          <view class="turnItem">
            <view class="item">
              <view>{{ item.employeeNumber }}</view>
              <view>{{ item.name }}</view>
            </view>
          </view>
        </view>
        <ReachBottom ref="loadMore"></ReachBottom>
      </scroll-view>
    </view>
    <view v-else
      ><EmptyPage :emptyData="emptyData" :emptyImage="'emptyImage'"></EmptyPage
    ></view>
    <!-- 提示窗示例 -->
    <UniPopup
      ref="popup"
      :tipInfo="tipInfo"
      @handleClick="handleClick"
    ></UniPopup>
    <!-- end -->
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { useStore } from "vuex";
// 接口api
import { getSameAgency, transferBatch } from "@/pages/api/index.js";
// 导入组件
// 下拉提示
import ReachBottom from "@/components/reach-bottom/index.vue";
// 弹层
import UniPopup from "@/components/uni-popup/index.vue";
//空页面
import EmptyPage from "@/components/uni-empty-page/index.vue";
// ------定义变量------
const store = useStore(); //设置、获取数据
const users = store.state.user;
const loadMore = ref(); //定义子组件的ref,可以调取子组件的值
let popup = ref(); //定义ref
let isShowCancel = ref(true);
const tipInfo = ref("确定要转单吗？"); //转单提示语
let reload = ref(false);
let pages = ref(0); //总页数
let pageNum = ref(1);
const emptyData = ref("暂无排班内快递员");
const anotherCourierId = ref(""); //快递员id
const searchVal = ref(""); //搜索内容
let page = reactive({
  keyword: "",
  page: 1,
  pageSize: 10,
});
let itemData = ref([]); //列表数据
// 上下拉取
onReachBottom(() => {
  if (pageNum.value >= pages.value) {
    loadMore.value.status = "noMore";
    return false;
  } else {
    loadMore.value.status = "loading";
    let times = setTimeout(() => {
      pageNum.value++;
      getList();
    }, 1000); //这里延时一秒在加载方法有个loading效果
  }
});
// ------生命周期------
// ------定义方法------
// 获取数据
const getList = async () => {
  reload.value = true;
  await getSameAgency(page).then((res) => {
    if (res.code === 200) {
      if (res.data) {
        reload.value = false;
        if (res.data.items) {
          itemData.value = itemData.value.concat(res.data.items);
          pages.value = res.data.pages;
          if (Number(pages.value) === pageNum.value) {
            loadMore.value.status = "noMore";
          }
        }
      } else {
        itemData.value = null;
      }
    }
  });
};
// 转单弹层
const handleOpen = (id) => {
  anotherCourierId.value = id;
  // 打开确认转单弹层
  popup.value.dialogOpen();
};
// 确认转单
const handleClick = async () => {
  // 获取已经选择的任务id
  let ids = [];
  for (const [key, value] of users.selectTaskData) {
    ids.push(value);
  }
  let params = {
    anotherCourierId: anotherCourierId.value,
    idList: ids,
  };
  await transferBatch(params).then((res) => {
    if (res.code === 200) {
      uni.navigateTo({
        url: "/pages/pickup/index",
      });
      return uni.showToast({
        title: "转单成功!",
        duration: 1000,
        icon: "none",
      });
    }
  });
};
const handleSearch = () => {
  page.keyword = searchVal.value;
  itemData.value = [];
  getList();
};
// 取消搜索
const handleCancel = () => {
  searchVal.value = "";
  store.commit("user/setIsDelivery", false);
  store.commit("user/setTabIndex", 0);
  clearData();
  if (users.isDelivery) {
    uni.redirectTo({
      url: "/pages/delivery/index",
    });
  } else {
    uni.redirectTo({
      url: "/pages/pickup/index",
    });
  }
};
// 返回上一页
const goBack = () => {
  clearData();
  uni.redirectTo({
    url: "/pages/delivery/index",
  });
};
// 清空数据
const clearData = () => {
  // 存储列表数据
  store.commit("user/setDeliveryData", []);
  // 总页数清空
  store.commit("user/setPages", 0);
  store.commit("user/setSelectTaskData", new Map());
};
</script>

<style src="../../styles/expressage.scss" lang="scss" scoped></style>
