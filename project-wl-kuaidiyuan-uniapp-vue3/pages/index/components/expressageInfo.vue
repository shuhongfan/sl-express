<template>
  <view>
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
          {{ item.name }}
          <text class="num">{{ item.num }}</text>
        </view>
      </view>
    </scroll-view>
    <view class="homeSwiper">
      <view v-if="tabIndex === 0 || tabIndex === 1">
        <view v-if="itemData.length > 0">
          <view
            class="boxBg"
            v-for="(item, index) in itemData.slice(0, 3)"
            :key="index"
            v-if="tabIndex === 0"
          >
            <view class="tabList">
              <view class="item" @click.stop="handleDetail(item.id)">
                <view class="titInfo">
                  {{ item.name }}
                  <text>{{ item.phone }}</text>
                  <icon
                    class="phone"
                    @click.stop="handlePhone($event, item.phone)"
                  ></icon>
                  <icon class="note" @click.stop="handleNote"></icon>
                </view>
                <view class="address">{{ item.address }}</view>
                <view class="distance">{{ item.distance }}公里</view>
                <view class="time"
                  >预约取件时间：{{
                    taskTimeFormat(item.estimatedStartTime)
                  }}
                  至 {{ overTimeFormat(item.estimatedEndTime) }}</view
                >
              </view>
            </view>
          </view>
          <!-- 待派件 -->
          <view
            class="boxBg"
            v-for="(item, index) in itemData.slice(0, 3)"
            :key="index"
            v-if="tabIndex === 1"
          >
            <view class="tabList">
              <view class="item" @click.stop="handleDetail(item.id)">
                <view class="titInfo">
                  {{ item.name }}
                  <text>{{ item.phone }}</text>
                  <icon
                    class="phone"
                    @click.stop="handlePhone($event, item.phone)"
                  ></icon>
                  <icon class="note" @click.stop="handleNote"></icon>
                </view>
                <view class="address">{{ item.address }}</view>
                <view class="address">{{ item.distance }}公里</view>
                <view class="time">运单号：{{ item.transportOrderId }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="moreInfo" v-if="itemData.length > 3" @click="handleMore">
          查看更多
          <icon></icon>
        </view>
      </view>

      <!-- 无数据显示 -->
      <view v-if="itemData.length === 0"
        ><EmptyPage :emptyInfo="emptyInfo"></EmptyPage
      ></view>
      <!-- end -->
    </view>
    <!-- 拨打手机弹层 -->
    <Phone ref="phone" :phoneData="phoneData"></Phone>
    <!-- end -->
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
// 处理事件封装的方法
import { taskTimeFormat, overTimeFormat } from "@/utils/index.js";
//组件
// 无数据
import EmptyPage from "@/components/uni-empty-page/index.vue";
import Phone from "@/components/uni-phone/index.vue";
// 获取父组件值、方法
const props = defineProps({
  itemData: {
    type: Array,
    default: () => [],
  },
  tabBars: {
    type: Array,
    default: () => [],
  },
});
// ------定义变量------
const store = useStore(); //设置、获取数据
let scrollinto = ref("tab0"); //tab切换
let tabIndex = ref(0); //当前tab
const phone = ref();
const emptyInfo = ref("- 空空如也，无运单记录 -");

const emit = defineEmits("getTabIndex");
const phoneData = ref("");

// ------定义方法------
// tab选项卡切换轮播
const changeTab = (index) => {
  // 点击的还是当前数据的时候直接return
  if (tabIndex.value == index) {
    return;
  }
  tabIndex.value = index;
  emit("getTabIndex", index);
  // 滑动
  scrollinto.value = "tab" + index;
};

// 触发选项卡事件
const onChangeSwiperTab = (e) => {
  changeTab(e.detail.current);
};
// 进入详情
const handleDetail = (id) => {
  // 把任务id用vuex的方法存储，方便其他页面调用
  store.commit("user/setTaskId", id);
  store.commit("user/setNewType", null);
  // 进入取件详情页
  if (tabIndex.value === 0) {
    // 由于取件详情地址和派件详情地址样式一致，所以用类型  1取件，2派件区分开
    store.commit("user/setTaskType", 1);
    store.commit("user/setDetailType", 0);
    store.commit("setFootStatus", 1); //修改底部tab当前标签
    uni.redirectTo({
      url: "/pages/details/index",
    });
  } else {
    // 进入派件详情页
    // 由于取件详情地址和派件详情地址样式一致，所以用类型  1取件，2派件区分开
    store.commit("user/setTaskType", 2);
    store.commit("user/setDetailType", 0);
    store.commit("setFootStatus", 3); //修改底部tab当前标签
    uni.redirectTo({
      url: "/pages/details/waybill",
    });
  }
};
// 进入待取件待派件页面
const handleMore = () => {
  if (tabIndex.value === 0) {
    uni.redirectTo({
      url: "/pages/pickup/index",
    });
  } else {
    uni.redirectTo({
      url: "/pages/delivery/index",
    });
  }
};
// 拨打电话弹层
const handlePhone = (e, val) => {
  // 阻止事件冒泡
  e.stopPropagation();
  phoneData.value = val;
  phone.value.dialogOpen();
};
// 发短信
const handleNote = () => {
  uni.showToast({
    title: "程序员哥哥正在实现中",
    duration: 1000,
    icon: "none",
  });
};
</script>

<style src="../index.scss" lang="scss"></style>
