<!-- 派件页面 -->
<template>
  <!-- 搜索nav -->
  <SearchPage
    @handleSearch="handleSearch"
    ref="search"
    @clearSearchData="clearSearchData"
  ></SearchPage>
  <!-- end -->
  <view>
    <!-- tab切换 -->
    <UniTab
      :tabBars="tabBars"
      ref="tab"
      @getTabIndex="getTabIndex"
      class="pickupTab"
    ></UniTab>
    <!-- end -->
    <!-- 筛选 -->
    <ListFiltrate
      v-if="tabIndex === 0"
      @getList="getList"
      class="pickupFilrate"
    ></ListFiltrate>
    <!-- end -->
    <!-- 取件状态列表 -->
    <view
      :class="tabIndex === 0 ? 'pickupBoxTop' : 'pickupTop'"
      style="padding: 0 0 200rpx 0"
    >
      <TabList
        :tabBars="tabBars"
        :tabIndex="tabIndex"
        :isAdmin="isAdmin"
        @onChangeSwiperTab="onChangeSwiperTab"
        @checkbox="checkbox"
        ref="list"
      ></TabList>
    </view>
    <!-- end -->
  </view>
  <!-- 底部管理 单选\转单\打印\删除 -->
  <!-- 派件后期会加功能,所以这块代码先不删除 -->
  <ExpressageFoot
    ref="expressageFoot"
    @getAdmin="getAdmin"
    :isAdmin="isAdmin"
    :isDelivery="isDelivery"
    :selected="selected"
    :tabIndex="tabIndex"
    @allSelect="allSelect"
    @handleClick="handleClick"
  ></ExpressageFoot>
  <!-- end -->
  <!-- footer -->
  <UniFooter :pagePath="'pages/delivery/index'"></UniFooter>
  <!-- end -->
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";

// 基本数据
import { PickUpData } from "@/utils/commonData.js";
// 接口api
import { taskBatchDelete } from "@/pages/api/index.js";
// 导入组件
// 导航
// 搜索组件
import SearchPage from "@/components/uni-search/index.vue";
// 底部导航
import UniFooter from "@/components/uni-footer/index.vue";
// tab切换
import UniTab from "@/components/uni-tab/index.vue";
// 筛选
import ListFiltrate from "@/components/uni-list-filtrate/index.vue";
// 底部管理全选组件
import ExpressageFoot from "@/components/uni-expressage-foot/index.vue";
// list
import TabList from "./components/list.vue";
// ------定义变量------
const store = useStore();
const users = store.state.user;
const emit = defineEmits(""); //子组件向父组件事件传递
const tab = ref();
const list = ref();
const search = ref(); //定义搜索ref
const expressageFoot = ref();
const tabBars = PickUpData;
let tabIndex = ref(0); //当前tab
let isDelivery = ref(true);
let isAdmin = ref(false); //是否触发管理按钮
// 存储已选内容， 因为这个列表是增删很频繁的，所以选用map而不是数组，key对应的是数据的下标。至于value存放什么，完全由自己定
let selected = reactive(new Map());
// ------生命周期------
onMounted(() => {
  if (users.tabIndex) {
    tabIndex.value = users.tabIndex;
  }
  if (users.tabIndex === 0) {
    list.value.dealPList();
  } else {
    list.value.alreadList();
  }
});

// ------定义方法------
// 搜索
const handleSearch = () => {
  list.value.searchInfo.taskType = 2;
  list.value.searchInfo.keyword = search.value.searchVal;
  store.commit("user/setIsInput", false); //是否在文本框里输入了文字，默认false
  store.commit("user/setDeliveryData", []);
  if (tabIndex.value === 0) {
    list.value.searchInfo.status = 1;
    list.value.dealSearchList();
  } else {
    list.value.searchInfo.status = 2;
    list.value.alreadSearchList();
  }
};
// 批量删除
const handleClick = async () => {
  const ids = [];
  // 要批量删除的id
  for (const [key, value] of selected) {
    ids.push(value);
  }

  await taskBatchDelete({ idList: ids }).then((res) => {
    if (res.code === 200) {
      list.value.alreadList();
      // 存储列表数据
      store.commit("user/setDeliveryData", []);
      // 总页数清空
      store.commit("user/setPages", 0);
      store.commit("user/setSelectTaskData", new Map());
      selected.clear();
      // expressageFoot.value.isAdmin = false
      isAdmin.value = false;
      return uni.showToast({
        title: "删除成功!",
        duration: 1000,
        icon: "none",
      });
    }
  });
};
// 清除搜索
const clearSearchData = () => {
  store.commit("user/setIsInput", true);
  store.commit("user/setDeliveryData", []); //清空列表数据
  store.commit("user/setSearchText", ""); //清空搜索框内容
  store.commit("user/setSearchClear", true); //是否清空搜索框
  list.value.searchInfo.keyword = ""; //清空搜索框内容
  // 总页数清空
  store.commit("user/setPages", 0);
  if (tabIndex.value === 0) {
    list.value.dealPList();
  } else {
    list.value.alreadList();
  }
};
// 获取tab切换当前的index
const getTabIndex = (index) => {
  tabIndex.value = index;

  // 存储列表数据
  store.commit("user/setDeliveryData", []);
  // 总页数清空
  store.commit("user/setPages", 0);
  store.commit("user/setSelectTaskData", new Map());
  store.commit("user/setFilterOverTime", null);
  store.commit("user/setIsFiltrate", false);
  search.value.searchVal = "";
  store.commit("user/setSearchText", ""); //清空搜索框内容
  store.commit("user/setSearchClear", true); //是否清空搜索框
  selected.clear();
  // 修改底部管理按钮状态
  isAdmin.value = false;
  // 根据不同的tab值切更新 取件数据
  if (index === 0) {
    list.value.dealPList();
  } else {
    list.value.alreadList();
  }
};
// 触发选项卡事件
const onChangeSwiperTab = (e) => {
  tab.value.changeTab(e.detail.current);
};
// 获取foot底部组件的管理按钮触发值，向列表页传递，全选，单选用
const getAdmin = (val) => {
  isAdmin.value = val;
};
// 给筛选组件传递，刷新列表
const getList = () => {
  list.value.dealPList();
};
// 全选与反选事件
const allSelect = () => {
  // 已经全选情况下，就是反选，全选就说明长度一样
  let itemData = users.deliveryData;
  if (selected.size === itemData.length) {
    selected.clear(); // 全部清除
    itemData.forEach((element) => {
      element.selected = false; // 全部不选，就行了
    });
  }
  // 还未全选的状态下
  else {
    itemData.forEach((element, index) => {
      // 因为可能存在部分已经选择了，所以得先判断是否已存在，不存在才需要添加
      if (!selected.has(index)) {
        selected.set(index, element.id); // key是对应的下标index，而value是可以自定义的
        element.selected = true; // 设为选中
      }
    });
  }
  emit("getSelected", selected);
  store.commit("user/setSelectTaskData", selected);
};
// 选项框点击事件，参数是数据的下标
const checkbox = (index) => {
  // 选中的状态下再次点击，即为取消选中
  let itemData = users.deliveryData;
  if (itemData[index].selected) {
    itemData[index].selected = false;
    selected.delete(index); // 然后删除对应key即可
  }
  // 未选中状态下点击
  else {
    itemData[index].selected = true;
    selected.set(index, itemData[index].id);
  }
  store.commit("user/setSelectTaskData", selected);
};
</script>
<style src="../../styles/expressage.scss" lang="scss" scoped></style>
