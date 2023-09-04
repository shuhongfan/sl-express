<!-- 消息列表页 -->
<template>
  <!-- 自定义头部 -->
  <view class="navHead">
    <UniNav :title="title" @goBack="goBack"></UniNav>
  </view>
  <!-- end -->

  <!-- 列表 -->
  <view class="pageBox newBox">
    <!-- 搜索列表 -->
    <scroll-view
      scroll-x="true"
      class="tabScroll"
      :scroll-into-view="scrollinto"
      :scroll-with-animation="true"
    >
      <view
        v-for="(item, index) in tabBars"
        :key="index"
        :id="'tab' + index"
        class="scroll-row-item"
        @click="changeTab(index)"
      >
        <view :class="tabIndex == index ? 'scroll-row-item-act' : ''">
          <text class="line"></text>
          {{ item }}
        </view>
      </view>
    </scroll-view>
    <view class="homeSwiper">
      <!-- 公告 -->
      <Announcement ref="announcement" :tabIndex="tabIndex"></Announcement>
      <!-- end -->
      <!-- 系统通知 -->
      <Notification
        ref="notificat"
        @getTabIndex="getTabIndex"
        :tabIndex="tabIndex"
      ></Notification>
      <!-- end -->
    </view>
    <!-- end -->
  </view>
  <!-- end -->
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
// 公告列表
import Announcement from "./components/announcement.vue";
// 系统通知
import Notification from "./components/notification.vue";
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
const announcement = ref(); //定义ref
const notificat = ref();
const title = ref("消息"); //nav标题
const tabBars = reactive(["公告", "系统通知"]);
let scrollinto = ref("tab0"); //tab切换
let tabIndex = users.tabIndex === 1 ? ref(1) : ref(0); //当前tab
// ------定义方法------
// tab选项卡切换轮播
const changeTab = (index) => {
  // 点击的还是当前数据的时候直接return
  if (tabIndex.value == index) {
    return;
  }
  // 触发tab切换接口
  if (index === 0) {
    // 当前tab值为0刷新公告列表
    // announcement.value.getList()
  } else {
    // 当前tab值为1刷新系统通知
    notificat.value.getOjb();
  }
  tabIndex.value = index;
  store.commit("user/setTabIndex", index);
  // 滑动
  scrollinto.value = "tab" + index;
};

// 触发选项卡事件
const onChangeSwiperTab = (e) => {
  changeTab(e.detail.current);
};
// 获取子组件传来的tabindex
const getTabIndex = (val) => {
  tabIndex.value = val;
};
// 返回上一页
const goBack = () => {
  uni.redirectTo({
    url: "/pages/index/index",
  });
  store.commit("user/setNewType", null);
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
