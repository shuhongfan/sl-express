<template>
  <!-- 待取件 -->
  <DealParcel
    ref="dealparcel"
    :tabIndex="tabIndex"
    :isAdmin="isAdmin"
    @checkbox="checkbox"
    @getSelected="getSelected"
    :searchInfo="searchInfo"
  ></DealParcel>
  <!-- end -->
  <!-- 已取件 -->
  <AlreadyParcel
    ref="already"
    :tabIndex="tabIndex"
    :isAdmin="isAdmin"
    @checkbox="checkbox"
    :searchInfo="searchInfo"
  ></AlreadyParcel>
  <!-- end -->
  <!-- 已取消 -->
  <CancelParcel
    :tabIndex="tabIndex"
    ref="cancel"
    :isAdmin="isAdmin"
    @checkbox="checkbox"
    @handleOpen="handleOpen"
    :searchInfo="searchInfo"
  ></CancelParcel>
  <!-- end -->
  <!-- 提示窗 -->
  <UniPopup
    ref="popup"
    :tipInfo="tipInfo"
    @handleClick="handleClick"
  ></UniPopup>
  <!-- end -->
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
//接口
import { taskDelete } from "@/pages/api/index.js";
// 导入组件
// 待取件
import DealParcel from "./components/dealParcel.vue";
// 已取件
import AlreadyParcel from "./components/alreadyParcel.vue";
// 已取消
import CancelParcel from "./components/cancelParcel.vue";
// 弹层
import UniPopup from "@/components/uni-popup/index.vue";

// 获取父组件数据
const props = defineProps({
  // tab切换数据
  tabBars: {
    type: Array,
    default: () => [],
  },
  tabIndex: {
    type: Number,
    default: 0,
  },
  // 是否触发管理按钮
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // 获取当前筛选的距离升序还是降序
  orderDistance: {
    type: Number,
    default: 0,
  },
  // 获取当前筛选的时间升序还是降序
  orderTime: {
    type: Number,
    default: 0,
  },
  // 获取当前筛选超时
  filterOverTime: {
    type: Number,
    default: 0,
  },
});
// ------定义变量------
const emit = defineEmits(""); //子组件向父组件事件传递
const store = useStore(); //设置、获取储存的数据
const users = store.state.user;
let popup = ref();
let dealparcel = ref();
let already = ref();
let cancel = ref();
const tipInfo = ref("确定要删除吗？");
let taskId = ref("");
let searchInfo = reactive({
  keyword: null,
  status: null,
  taskType: null,
});
// ------生命周期------
// ------定义方法------
// 获取已经选的任务
const getSelected = (array) => {
  emit("getSelected", array);
};
// 获取待取件列表方法
const dealPList = () => {
  dealparcel.value.getList();
};
// 搜索待取件列表方法
const dealSearchList = () => {
  dealparcel.value.getSearchList();
};
// 获取已取件列表方法
const alreadList = () => {
  already.value.getList();
};
// 搜索已取件列表方法
const alreadSearchList = () => {
  already.value.getSearchList();
};
// 获取取消件列表方法
const cancelList = () => {
  cancel.value.getList();
};
// 搜索取消件列表方法
const cancelSearchList = () => {
  cancel.value.getSearchList();
};
// 确认删除
const handleClick = async () => {
  await taskDelete(taskId.value).then((res) => {
    if (res.code === 200) {
      store.commit("user/setDeliveryData", []);
      cancel.value.getList();
      store.commit("user/setIsDelete", true);
      return uni.showToast({
        title: "删除成功!",
        duration: 1000,
        icon: "none",
      });
    }
  });
};
//左右滑动tab切换
const onChangeSwiperTab = (e) => {
  emit("onChangeSwiperTab", e);
};
// 选项框点击事件，参数是数据的下标
const checkbox = (index) => {
  emit("checkbox", index);
};
// 删除弹层id
const handleOpen = (id) => {
  popup.value.dialogOpen();
  taskId.value = id;
};

//把数据、方法暴漏给父组件
defineExpose({
  dealPList,
  dealSearchList,
  alreadList,
  alreadSearchList,
  cancelList,
  cancelSearchList,
  searchInfo,
});
</script>
