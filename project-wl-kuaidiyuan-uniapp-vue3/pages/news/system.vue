<!-- 系统通知列表页 取件相关、签收提醒、快件取消 -->
<template>
  <!-- 自定义头部 -->
  <view class="navHead">
    <UniNav
      :title="title"
      @goBack="goBack"
      @handleAll="handleAll"
      :rithtText="rithtText"
    ></UniNav>
  </view>
  <!-- end -->
  <!-- 列表 -->
  <view class="pageBox newBox">
    <scroll-view
      scroll-y="true"
      :style="{ height: scrollH + 'px' }"
      v-if="itemData.length > 0"
    >
      <view class="systemList">
        <view class="boxBg item" v-for="(item, index) in itemData" :key="index">
          <view class="tit" :class="item.isRead === 0 ? 'active' : ''">
            <icon></icon>
            <text v-if="title === '取件相关'">您有一个新的取件订单</text>
            <text v-else-if="title === '派件相关'">您有一个新的派件订单</text>
            <text v-else-if="title === '签收提醒'">您有一个派件已签收</text>
            <text v-else>您有一个快件已取消</text>
          </view>
          <view class="address">{{ item.content }}</view>
          <view class="time">
            <text>{{ taskTimeFormat(item.created) }}</text>
            <button class="uni-btn redBtn" @click="handleDetail(item)">
              查看详情
            </button>
          </view>
        </view>
      </view>
      <ReachBottom ref="loadMore"></ReachBottom>
    </scroll-view>
    <view v-else><EmptyPage :emptyData="emptyData"></EmptyPage></view>
  </view>
  <!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { taskTimeFormat } from "@/utils/index.js";
import { useStore } from "vuex";
// 接口 api
import { getMessagesList, msgRead, msgAllRead } from "@/pages/api/news.js";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
//空页面
import EmptyPage from "@/components/uni-empty-page/index.vue";
// 下拉提示
import ReachBottom from "@/components/reach-bottom/index.vue";
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
const pages = getCurrentPages(); //获取加载的页面，获取当前页面路由信息uniapp 做安卓不支持 vue-router
const currentPage = pages[pages.length - 1].$page.options; //获取当前页面的对象
const title = currentPage.title; //nav标题
const type = currentPage.type; //当前派件类型
const loadMore = ref(); //定义子组件的ref,可以调取子组件的值
const emptyData = ref("暂无消息");
const rithtText = ref("全部已读");
let pageNumber = ref(1);

let totals = ref(0); //总页数
let pageNum = ref(1); //存放当前页
let page = reactive({
  contentType: type,
  page: 1,
  pageSize: 10,
});
let reload = ref(false);
let scrollH = ref(null); //滚动高度
let isReadAll = ref(false); //是否已全读
let itemData = ref([]);
let ids = ref([]);
// 上下拉取
onReachBottom(() => {
  if (pageNum.value >= Number(totals.value)) {
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
onMounted(() => {
  // // 调用接口
  getList();
  // 获取屏幕信息
  uni.getSystemInfo({
    success: (res) => {
      scrollH.value = res.windowHeight - uni.upx2px();
    },
  });
});
//
// ------定义方法------
// 获取列表
const getList = async () => {
  reload.value = true;
  page = {
    ...page,
    page: pageNum.value,
  };
  await getMessagesList(page).then((res) => {
    if (res.code === 200) {
      if (res.data) {
        reload.value = false;
        itemData.value = itemData.value.concat(res.data.items);
        itemData.value.map((val) => {
          if (val.isRead === 0) {
            ids.value.push(val.id);
          }
        });

        totals.value = res.data.pages;
        // 存储列表数据
        if (Number(res.data.pages) === pageNum.value) {
          loadMore.value.status = "noMore";
        }
      } else {
        itemData.value = [];
      }
    }
  });
};
// 进入详情，标记已读
const handleDetail = async (item) => {
  // 把任务id用vuex的方法存储，方便其他页面调用
  store.commit("user/setTaskId", item.relevantId);
  store.commit("user/setTabIndex", 0);
  ids.value = [];
  ids.value.push(item.id);
  // 进入详情前先调用已读信息接口
  await msgRead(item.id).then((res) => {});

  if (title === "取件相关") {
    // 方便从详情跳回列表页
    store.commit("user/setNewType", 301);
    if (item.status === 1) {
      uni.navigateTo({
        url: "/pages/details/index",
      });
    } else {
      uni.navigateTo({
        url: "/pages/details/waybill",
      });
      store.commit("user/setIsNew", true);
    }
  } else if (title === "派件相关") {
    if (item.status === 2) {
      store.commit("user/setTaskStatus", 5);
      store.commit("user/setIsNew", true);
    } else {
      store.commit("user/setTaskStatus", 4);
    }
    store.commit("user/setNewType", 304);
    uni.navigateTo({
      url: "/pages/details/waybill",
    });
  } else if (title === "签收提醒") {
    store.commit("user/setTaskStatus", 5);
    store.commit("user/setNewType", 302);
    uni.navigateTo({
      url: "/pages/details/waybill",
    });
    store.commit("user/setIsNew", true);
  } else {
    store.commit("user/setTaskStatus", null);
    store.commit("user/setNewType", 303);
    uni.navigateTo({
      url: "/pages/details/waybill",
    });
  }
};
// 全部已读
const handleAll = async () => {
  let contentType = null;
  if (title === "取件相关") {
    contentType = 301;
  } else if (title === "派件相关") {
    contentType = 304;
  } else if (title === "签收提醒") {
    contentType = 302;
  } else {
    contentType = 303;
  }
  await msgAllRead(contentType)
    .then((res) => {
      itemData.value = [];
      pageNum.value = 1;
      getList();
    })
    .catch((err) => {
      isReadAll.value = true;
      return uni.showToast({
        title: err.msg,
        duration: 1000,
        icon: "none",
      });
    });
};
// 返回上一页
const goBack = () => {
  store.commit("user/setTabIndex", 1);
  if (users.taskStatus === -1) {
    uni.redirectTo({
      url: "/pages/index/index",
    });
  } else {
    uni.redirectTo({
      url: "/pages/news/index",
    });
  }
  store.commit("user/setTaskStatus", 0);
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
