<template>
  <view class="pageBox">
    <!-- tab切换 -->
    <UniTab
      :tabBars="tabBars"
      ref="tab"
      @getTabIndex="getTabIndex"
      class="historyTab"
    ></UniTab>
    <!-- end -->
    <view class="homeSwiper historyboxTop">
      <view v-if="itemData.length > 0">
        <scroll-view scroll-y="true">
          <!-- 取件 -->
          <view v-if="tabIndex === 0"
            ><Pickup :itemData="itemData" @handleOpen="handleOpen"></Pickup
          ></view>
          <!-- end -->
          <!-- 派件 -->
          <view v-else
            ><Delivery :itemData="itemData" @handleOpen="handleOpen"></Delivery
          ></view>
          <!-- end -->
          <!-- 上拉 -->
          <ReachBottom ref="loadMore"></ReachBottom>
          <!-- end -->
        </scroll-view>
        <!-- 空页面 -->
      </view>
      <view v-else><EmptyPage :emptyData="emptyData"></EmptyPage></view>
      <!-- end -->
    </view>
    <!-- end -->
  </view>
  <!-- 提示窗 -->
  <UniPopup
    ref="popup"
    :tipInfo="tipInfo"
    @handleClick="handleClick"
  ></UniPopup>
  <!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { useStore } from "vuex";
import { getTimeDate} from '@/utils/index.js';
// 基本数据
import { HistoryTabData } from "@/utils/commonData.js";
//接口
import { getDeliveryList, taskDelete } from "@/pages/api/index.js";
// tab切换
import UniTab from "@/components/uni-tab/index.vue";
// 弹层
import UniPopup from "@/components/uni-popup/index.vue";
// 下拉提示
import ReachBottom from "@/components/reach-bottom/index.vue";
//空页面
import EmptyPage from "@/components/uni-empty-page/index.vue";
// 取件
import Pickup from "./pickup.vue";
// 派件
import Delivery from "./delivery.vue";

// 获取父组件数据
const props = defineProps({
  // 筛选时间
  dateTime: {
    type: String,
    default: "",
  },
});

// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user;
const emit = defineEmits(""); //子组件向父组件事件传递
let popup = ref();
const tipInfo = ref("确认删除该订单吗？");
const tabBars = HistoryTabData;//tab标签数据
let taskId = ref(""); //任务id
let tabIndex = ref(0); //当前tab
const loadMore = ref(); //定义子组件的ref,可以调取子组件的值
let itemData = ref([]);//列表数据
let reload = ref(false); //是否加载
let pages = ref(0); //总页数
let pageNum = users.isFiltrate ? 1 : ref(1); //存放当前页
const emptyData = ref("暂无数据");
let isPullDown = ref(false); //是否下拉了
let page = reactive({
  latitude: users.loacation.latitude !== undefined ? users.loacation.latitude : 40.062595,
	longitude: users.loacation.longitude !== undefined ? users.loacation.longitude : 116.372809,
  page: 1,
  pageSize: 10,
  taskType: 1,
});
watch(props, (newValue, oldValue) => {
  // 存储清空列表数据
  store.commit("user/setDeliveryData", []);
  getList(newValue.dateTime);
});
// 监听tab切换
watch(tabIndex, (newValue, oldValue) => {
  if (newValue === 0) {
    page.taskType = 1;
  } else {
    page.taskType = 2;
  }
  // 存储清空列表数据
  store.commit("user/setDeliveryData", []);
  // 根据不同的tab值切更新 取件数据
  getList(page.dateTime);
});
// ------生命周期------
onMounted(() => {
  if (users.tabIndex) {
    tabIndex.value = users.tabIndex;
  }
});
// 上下拉取
onReachBottom(() => {
  if (pageNum.value >= Number(pages.value)) {
    loadMore.value.status = "noMore";
    return false;
  } else {
    loadMore.value.status = "loading";
    let times = setTimeout(() => {
      pageNum.value++;
      getList(page.dateTime);
    }, 1000); //这里延时一秒在加载方法有个loading效果
  }
});
// ------定义方法------
// 获取数据
const getList = async (time) => {
  reload.value = true;
  //判断是否进行了距离、时间、超时任务筛选，如果是，当前页设为第一页，上拉的数值设为1，便于第二次上拉
  page = {
    ...page,
    dateTime: (getTimeDate(time)).veryDayDate,
    page: pageNum.value,
  };
  await getDeliveryList(page).then((res) => {
    if (res.code === 200) {
      if (res.data) {
        reload.value = false;
        if (users.deliveryData.length === 0) {
          itemData.value = [];
        }
        if (users.istabChange) {
          itemData.value = res.data.items;
          store.commit("user/setIstabChange", false);
        } else {
          itemData.value = itemData.value.concat(res.data.items);
        }
        pages.value = res.data.pages;
        // 存储列表数据
        store.commit("user/setDeliveryData", itemData.value);
        if (Number(res.data.pages) === pageNum.value) {
          loadMore.value.status = "noMore";
        }
      } else {
        itemData.value = [];
      }
    }
  });
};

// 获取tab切换当前的index
const getTabIndex = (index) => {
  store.commit("user/setTabIndex", 0);
  store.commit("user/setIstabChange", true);
  pageNum.value = 1;
  pages.value = 1;
  tabIndex.value = index;
  itemData.value = [];
  store.commit("user/setDeliveryData", []);
};
// 确认删除
const handleClick = async () => {
  await taskDelete(taskId.value).then((res) => {
    if (res.code === 200) {
      store.commit("user/setDeliveryData", []);
      getList(page.dateTime);
      isPullDown.value = true;
      return uni.showToast({
        title: "删除成功!",
        duration: 1000,
        icon: "none",
      });
    }
  });
};
// 删除弹层
const handleOpen = (id) => {
  popup.value.dialogOpen();
  taskId.value = id;
};
// 触发选项卡事件
const onChangeSwiperTab = (e) => {
  changeTab(e.detail.current);
};
//把数据、方法暴漏给父组件
defineExpose({
  getList,
});
</script>
