<!-- 历史取派页 -->
<template>
  <!-- 自定义头部 -->
  <UniNav :title="title" @goBack="goBack"></UniNav>
  <!-- end -->
  <!-- 搜索nav -->
  <view class="history">
    <view class="navBox">
      <view class="search">
        <view class="uni-navbar">
          <view class="input-view">
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
                placeholder="输入四位或完整运单号/手机号、姓名"
                @confirm="handleSearch"
                @tap="handleSearch"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- end -->
  <view>
    <!-- 日期选择 -->
    <TateSelete @getDateTime="getDateTime"></TateSelete>
    <!-- end -->
    <!-- 取件派件列表 -->
    <TabList :dateTime="dateTime" ref="list"></TabList>
    <!-- end -->
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
// 日期选择
import TateSelete from "./commponents/date.vue";
// 列表
import TabList from "./commponents/index.vue";
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
let list = ref();
let itemData = reactive([]); //列表数据
const title = ref("全部取派"); //nav标题
let dateTime = ref(""); //存放日期
const searchVal = ref(""); //搜索内容
// ------生命周期------
// ------定义方法------
// 获取筛选的时间
const getDateTime = (val) => {
  dateTime.value = val;
};
// 跳转到搜索页面
const handleSearch = (e) => {
  // 跳转到搜索页面
  uni.redirectTo({
    url: "/pages/search/index",
  });
};
// 返回上一页
const goBack = () => {
  if (users.taskStatus === -1) {
    uni.redirectTo({
      url: "/pages/my/index",
    });
  } else {
    uni.redirectTo({
      url: "/pages/index/index",
    });
  }

  store.commit("user/setTabIndex", 0);
  store.commit("user/setTaskStatus", 0);
  store.commit("user/setTimeData", null);
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
