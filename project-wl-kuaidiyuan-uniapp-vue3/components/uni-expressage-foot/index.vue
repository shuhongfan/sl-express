<template>
  <view
    class="boxCon dataAdmin"
    v-if="store.state.user.deliveryData.length > 0"
  >
    <button class="uni-btn concelBtn" @click="handleAdmin" v-if="!isAdmin">
      管理
    </button>
    <view v-else class="adminInfo">
      <view class="selectInfo">
        <label class="checkRadio">
          <radio
            value="1"
            :checked="selected.size === store.state.user.deliveryData.length"
            :class="
              selected.size === store.state.user.deliveryData.length
                ? 'active'
                : ''
            "
            @click="allSelect"
          />
          全选
        </label>
        总计
        <text class="num">{{ selected.size }}</text>
        条
      </view>
      <view>
        <button
          class="uni-btn concelBtn"
          v-if="isAdmin"
          @click="handleAccomplish"
        >
          完成
        </button>
        <button
          class="uni-btn btn-default"
          v-if="tabIndex === 0 && !isDelivery"
          @click="handleOrder"
        >
          转单
        </button>
        <button
          class="uni-btn btn-default"
          v-else-if="tabIndex === 1 && !isDelivery"
          @click="handlePrint"
        >
          打印
        </button>

        <button
          class="uni-btn btn-default"
          v-if="!isDelivery && tabIndex === 2"
          @click="handleBatchDelete"
        >
          批量删除
        </button>
      </view>
    </view>
    <!-- 提示窗示例 -->
    <UniPopup
      ref="popup"
      :tipInfo="tipInfo"
      @handleClick="handleClick"
    ></UniPopup>
    <!-- end -->
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
// 弹层
import UniPopup from "@/components/uni-popup/index.vue";
// ------定义变量------
// 获取父组件数据
const props = defineProps({
  // 已选内容
  selected: {
    type: Map,
    default: () => [],
  },
  // 当前tab切换值，判断是已取件还是待取件
  tabIndex: {
    type: Number,
    default: null,
  },
  // 是否触发管理按钮，此处是用来控制是否显示全选、条数、转单、打印、删除按钮
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // 区分取件派件
  isDelivery: {
    type: Boolean,
    default: false,
  },
});
const store = useStore();
const users = store.state.user;
const emit = defineEmits();
let popup = ref();
const tipInfo = ref("确定要批量删除吗？");
let itemData = store.state.user.deliveryData;
// ------定义方法------
// 管理数据
const handleAdmin = () => {
  emit("getAdmin", true);
};
// 全选
const allSelect = () => {
  emit("allSelect");
};
// 转单
const handleOrder = () => {
  if (props.selected.size > 0) {
    let ids = [];
    for (let [key, value] of props.selected) {
      ids.push(value);
    }
    if (props.isDelivery) {
      store.commit("user/setIsDelivery", true);
    } else {
      store.commit("user/setIsDelivery", false);
    }
    uni.navigateTo({
      url: "/pages/turnorder/index",
    });
  } else {
    return uni.showToast({
      title: "请选择任务！",
      duration: 1000,
      icon: "none",
    });
  }
};
// 批量删除
const handleBatchDelete = () => {
  if (props.selected.size > 0) {
    popup.value.dialogOpen();
  } else {
    return uni.showToast({
      title: "请选择要删除的任务！",
      duration: 1000,
      icon: "none",
    });
  }
};
// 打印
const handlePrint = () => {
  uni.showToast({
    title: "程序员哥哥正在实现中",
    duration: 1000,
    icon: "none",
  });
};
// 完成
const handleAccomplish = () => {
  let itemData = users.deliveryData;
  props.selected.clear(); // 全部清除
  itemData.forEach((element) => {
    element.selected = false; // 全部不选，就行了
  });
  store.commit("user/setDeliveryData", itemData);
  emit("getAdmin", false);
};
// 确认删除
const handleClick = () => {
  emit("handleClick");
};
</script>

<style lang="scss" scoped>
.dataAdmin {
  padding: 24rpx 30rpx 24rpx 36rpx;
  position: fixed;
  bottom: 100rpx;
  left: 0;
  right: 0;
  z-index: 0;
  .concelBtn,
  .btn-default {
    height: 60rpx;
    line-height: 60rpx;
    width: 140rpx;
    border-radius: 30rpx;
    font-weight: 600;
  }
  .btn-default {
    margin-left: 20rpx !important;
  }
  .concelBtn {
    float: right;
  }
  .num {
    color: var(--essential-color-red);
    padding: 0 4rpx;
  }
  .adminInfo {
    display: flex;
    align-items: center;
    height: 60rpx;
    line-height: 60rpx;
    & > view {
      &.selectInfo {
        flex: 1;
        .checkRadio {
          padding-right: 24rpx;
        }
      }
      &:last-child {
        text-align: right;
        display: flex;
      }
    }
  }
}
</style>
