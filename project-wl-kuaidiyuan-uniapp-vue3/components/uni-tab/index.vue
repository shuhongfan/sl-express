<template>
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
        {{ item.label }}
      </view>
    </view>
  </scroll-view>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
// 获取父组件数据
const props = defineProps({
  tabBars: {
    type: Array,
    default: () => [],
  },
});
// ------定义变量------
const store = useStore();
const users = store.state.user;
const emit = defineEmits(""); //子组件向父组件事件传递
const scrollinto = ref("tab0"); //tab切换
let tabIndex = ref(users.tabIndex ? users.tabIndex : 0); //当前tab
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
//把数据、方法暴漏给父组件
defineExpose({
  changeTab,
});
</script>