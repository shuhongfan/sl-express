<!-- 首页搜索页 -->
<template>
  <!-- 搜索nav -->
  <SearchPage
    ref="search"
    @handleSearch="handleSearch"
    @handleBlur="handleBlur"
    @clearSearchData="clearSearchData"
    @goBack="goBack"
    :isShowCancel="isShowCancel"
  ></SearchPage>
  <!-- end -->
  <view class="searchTop">
    <view class="pageBox">
      <!-- 最近查找 -->
      <view class="recentBox" v-if="!isClear">
        <view class="tit">
          <text>最近查找</text>
          <icon @click="handleClear"></icon>
        </view>

        <view class="recentList">
          <view
            class="item"
            v-for="(item, index) in listDataes.value"
            :key="index"
            @click="handleTransportOrderId(item)"
            >{{ item }}</view
          >
          <view class="iconUp" v-if="!showDisplay">
            <view
              @click="showDisplay = !showDisplay"
              v-if="itemDataRecent.length > 10"
              ><image
                class="icon_img"
                src="../../static/open.png"
                mode=""
              ></image
            ></view>
          </view>
        </view>
      </view>
      <!-- end -->
      <!-- 搜索列表 -->
      <scroll-view scroll-y="true" class="swiperH" v-if="itemData.length > 0">
        <view class="serachList">
          <view class="">
            <view class="tabList">
              <view
                class="boxBg"
                v-for="(item, index) in itemData"
                :key="index"
                @click.stop="handleDetails($event, item)"
              >
                <!-- 待取件 -->
                <StayPicup
                  :item="item"
                  @handleDetails="handleDetails"
                ></StayPicup>
                <!-- end -->
                <!-- 已取件 -->
                <AlreadyPicUp
                  :item="item"
                  @handleDetails="handleDetails"
                ></AlreadyPicUp>
                <!-- end -->
                <!-- 取件取消 -->
                <Canceled :item="item"></Canceled>
                <!-- end -->
                <!-- 已签收 -->
                <SignFor :item="item" @handleDetails="handleDetails"></SignFor>
                <!-- end -->
                <!-- 已经完成到付未付款 -->
                <Accomplish
                  :item="item"
                  @handleDetails="handleDetails"
                ></Accomplish>
                <!-- end -->
              </view>
            </view>
          </view>
        </view>
        <ReachBottom ref="loadMore"></ReachBottom>
      </scroll-view>
      <!-- end -->
      <!-- 无数据 -->
      <view v-if="itemData.length === 0 && isClear"
        ><EmptyPage :emptyData="emptyData"></EmptyPage
      ></view>
      <!-- end -->
    </view>

    <!-- 提示窗示例 -->
    <UniPopup
      ref="popups"
      :tipInfo="tipInfo"
      @handleClick="clearData"
    ></UniPopup>
    <!-- end -->
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, computed, onUnmounted } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { useStore } from "vuex";
// 接口
import {
  getSearch,
  getRecentSearch,
  setMarkRecent,
  clearRecentSearch,
} from "@/pages/api/index.js";
// 导入组件
// 搜索组件
import SearchPage from "@/components/uni-search/index.vue";
// 暂无搜索内容
import EmptyPage from "@/components/uni-empty-page/index.vue";
// 弹层
import UniPopup from "@/components/uni-popup/index.vue";
// 下拉提示
import ReachBottom from "@/components/reach-bottom/index.vue";
//
// 待取件
import StayPicUp from "./components/StayPicUp.vue";
// 已取件
import AlreadyPicUp from "./components/AlreadyPicUp.vue";
//已取消
import Canceled from "./components/Canceled.vue";
// 已签收
import SignFor from "./components/SignFor.vue";
// 完成未付款
import Accomplish from "./components/Accomplish.vue";
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
const search = ref(); //定义搜索框的ref
let showDisplay = ref(false); //最近查找更多触发，触发之后按钮隐藏
let isClear = ref(false); //触发清除按钮
const tipInfo = ref("确定要全部清空吗？");
let popups = ref();
let isShowCancel = ref(true);
const loadMore = ref(); //定义子组件的ref,可以调取子组件的值
let reload = ref(false);
let pages = ref(0); //总页数
let pageNum = ref(1); //存放当前页
const itemData = ref([]); //数据
const itemDataRecent = reactive([]); //近期数据
const emptyData = ref("没有找到相关内容");
let keyword = ref(""); //当前的搜索对象
let isInput = ref(false); //是否触发了输入框
let page = reactive({
  latitude:
    users.loacation.latitude !== undefined
      ? users.loacation.latitude
      : 40.062595,
  longitude:
    users.loacation.longitude !== undefined
      ? users.loacation.longitude
      : 116.372809,
  page: 1,
  pageSize: 10,
});
// 计算数据
const listDataes = computed(() => {
  let testList = [];
  if (showDisplay.value === false) {
    if (itemDataRecent.length > 10) {
      for (var i = 0; i < 10; i++) {
        testList.push(itemDataRecent[i]);
      }
    } else {
      testList = itemDataRecent;
    }
    return testList;
  } else {
    return itemDataRecent;
  }
});
// 上下拉取
onReachBottom(() => {
  isInput.value = true;
  if (pageNum.value >= Number(pages.value)) {
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
// 离开此页面
onUnmounted(() => {
  itemData.value = [];
  isInput.value = false;
});
// ------生命周期------
onMounted(() => {
  init();
  if (users.searchText !== "") {
    keyword.value = users.searchText;
    search.value.searchVal = users.searchText;
    getList();
  }
});
// 获取初始值
const init = () => {
  getRecent(); //近期搜索数据
};
// ------定义方法------
// 获取数据
const getList = async () => {
  reload.value = true;
  page = {
    ...page,
    page: pageNum.value,
    keyword: keyword.value,
  };
  // 后端接口调用
  await getSearch(page).then((res) => {
    if (res.code === 200) {
      if (res.data) {
        reload.value = false;
        if (!isInput.value) {
          itemData.value = res.data.items;
        } else {
          itemData.value = itemData.value.concat(res.data.items);
        }

        pages.value = res.data.pages;
        if (Number(res.data.pages) === pageNum.value) {
          loadMore.value.status = "noMore";
        }
      } else {
        itemData.value = [];
      }
      // 有搜索数据的时候隐藏最近查询标题和清除按钮
      if (itemData.value.length > 0) {
        isClear.value = true;
      }
    }
  });
};
// 显示最近查找
const getRecent = async () => {
  await getRecentSearch().then((res) => {
    if (res.code === 200) {
      itemDataRecent.value = res.data;
      // 没数据的时候隐藏最近查询标题和清除按钮
      if (itemDataRecent.value.length === 0) {
        isClear.value = true;
      }
    }
  });
};
// 搜索框搜索
const handleSearch = (val) => {
  if (val.value.trim().length > 0) {
    isInput.value = false;
    keyword = val;
    getList();
  }
};
// input焦点
const handleBlur = () => {
  isInput.value = true;
};
// 清除最近查找
const handleClear = () => {
  popups.value.dialogOpen();
};
// 点击关闭按钮之后页面为显示最近查找页
const clearSearchData = () => {
  itemData.value = []; //清空搜索列表
  // 设置搜索的内容，从详情页返回搜索页的时候显示默认搜索的内容
  isClear.value = false;
  store.commit("user/setSearchText", "");
  getRecent();
};
// 清空
const clearData = async (val) => {
  isClear.value = val;
  await clearRecentSearch().then(() => {
    if (res.code === 200) {
      uni.showToast({
        title: "清除成功",
        icon: "none",
      });
    }
  });
};
// 标记为最近查找
const setRecent = async (id) => {
  await setMarkRecent(id);
  itemData.value = []; //清空搜索列表
};
// 取件详情页
const handleDetails = (e, item) => {
  // 阻止事件冒泡
  e.stopPropagation();
  // 把任务id用vuex的方法存储，方便其他页面调用
  store.commit("user/setTaskId", item.id);
  // // 由于取件详情地址和派件详情地址样式一致，所以用类型  1取件，2派件区分开
  // store.commit('user/setTaskType', 1);
  // 设置是否由搜索页进的详情页，方便详情页返回
  store.commit("user/setIsSearch", true);
  // 设置搜索的内容，从详情页返回搜索页的时候显示默认搜索的内容
  store.commit("user/setSearchText", search.value.searchVal);

  // 如果有运单号标记为最近查询记录
  if (item.transportOrderId) {
    setRecent(item.transportOrderId);
  }
  // 取件
  if (item.taskType === 1) {
    // 待取件
    if (item.status === 1) {
      uni.redirectTo({
        url: "/pages/details/index",
      });
      return false;
    } else if (item.status === 2) {
      // 如果是已取件
      // 未付款的状态进入二维码付款页面
      if (item.paymentStatus === 1 && item.paymentMethod === 1) {
        store.commit("user/setDetailType", 2);
        store.commit("user/setTaskStatus", 3);
        store.commit("user/setPayData", {});
        uni.redirectTo({
          url: "/pages/pay/scanPay",
        });
        return false;
      } else {
        // 已取件
        store.commit("user/setTaskStatus", 2);
      }
    } else {
      // 取消的订单
      store.commit("user/setTaskStatus", 3);
    }
    // 如果是已付款或者是到付,取消的订单,进入运单详情页
    uni.redirectTo({
      url: "/pages/details/waybill",
    });
  } else {
    // 派件
    // 待派件
    if (item.status === 1) {
      store.commit("user/setTaskStatus", 4);
    } else if (item.status === 2) {
      // 如果是已取件
      // 未付款的状态进入二维码付款页面
      if (item.paymentStatus === 1 && item.paymentMethod === 2) {
        store.commit("user/setPayData", {});
        uni.redirectTo({
          url: "/pages/pay/scanPay",
        });
        return false;
      } else {
        store.commit("user/setTaskStatus", 5);
        uni.redirectTo({
          url: "/pages/details/waybill",
        });
      }
    }
    // 如果是去派件\已付款或者是寄付,进入运单详情页
    uni.redirectTo({
      url: "/pages/details/waybill",
    });
  }
};
// 根据最近查找的运单id搜索
const handleTransportOrderId = (val) => {
  // 给搜索对象赋值
  keyword.value = val;
  // 把值赋给子组件的搜索框
  search.value.searchVal = val;
  getList();
};
// 回首页
const goBack = () => {
  uni.redirectTo({
    url: "/pages/index/index",
  });
};
</script>
<style src="./../../styles/expressage.scss" lang="scss" scoped></style>
<style src="./index.scss" lang="scss" scoped></style>
<style lang="scss">
body {
  background-color: #fff;
}
</style>
