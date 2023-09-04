<template>
  <view v-if="tabIndex === 0">
    <!-- 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度-->
    <scroll-view scroll-y="true">
      <view v-if="newItemData.length > 0">
        <view class="boxCon">
          <view class="tabConList">
            <view
              class="item"
              v-for="(item, index) in newItemData"
              :key="index"
            >
              <view @click="handleClick(item)">
                <text class="text active">
                  {{ item.title }}
                </text>
                <text class="time">{{ taskTimeFormat(item.created) }}</text>
              </view>
            </view>
          </view>
        </view>
        <!-- 暂时先不做，后期做 -->
        <!-- <ReachBottom v-if="loading" :loadingText="loadingText"></ReachBottom> -->
      </view>

      <!-- 无数据显示 -->
      <view v-else><EmptyPage :emptyData="emptyData"></EmptyPage></view>
      <!-- end -->
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { taskTimeFormat } from "@/utils/index.js";
// 公告数据
import { newItemData } from "@/utils/commonData.js";
// 接口api
import { getNewList } from "@/pages/api/news.js";
// 导入组件
//空页面
import EmptyPage from "@/components/uni-empty-page/index.vue";
// 下拉提示
import ReachBottom from "@/components/reach-bottom/index.vue";
// ------定义变量------
let loadingText = ref("");
let loading = ref(false);
// 获取父组件数据
const props = defineProps({
  // 当前触发的tab值
  tabIndex: {
    type: Number,
    default: 0,
  },
});
// ------定义变量------
const emit = defineEmits("handleSearch"); //子组件向父组件事件传递
// ------生命周期------
onMounted(() => {
  // init();
});
// ------定义方法------
const init = () => {
  // TODO 暂时不做此功能数据先写死
  // getList();
};
// 获取公告列表
const getList = async () => {
  await getNewList("300")
    .then((res) => {
      if (res.code === 200) {
        itemData.value = res.data;
      }
    })
    .catch((err) => {
      return uni.showToast({
        title: err.msg,
        duration: 1000,
        icon: "none",
      });
    });
};
const handleClick = async (item) => {
  uni.navigateTo({
    url: "/pages/news/detail?obj=" + JSON.stringify(item),
  });
};
//把数据、方法暴漏给父组件
defineExpose({
  getList,
});
</script>
