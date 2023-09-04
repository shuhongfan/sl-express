<template>
  <view v-if="tabIndex === 1">
    <scroll-view scroll-y="true">
      <view>
        <view class="boxCon">
          <view class="newConBox">
            <view class="item">
              <navigator
                :url="'/pages/news/system?title=取件相关&type=' + 301"
                open-type="redirect"
              >
                <view
                  class="icon send"
                  :class="objData.haveNewSendNotice ? 'active' : ''"
                  ><icon></icon
                ></view>
                <view class="text">
                  <view>取件相关</view>
                  <view>{{
                    objData.newSendNoticeTime
                      ? "您有一个新的取件订单"
                      : "暂无消息"
                  }}</view>
                </view>
                <text class="time" v-if="objData.newSendNoticeTime">{{
                  taskTimeFormat(objData.newSendNoticeTime)
                }}</text>
              </navigator>
            </view>
            <view class="item">
              <navigator
                :url="'/pages/news/system?title=派件相关&type=' + 304"
                open-type="redirect"
              >
                <view
                  class="icon delivery"
                  :class="objData.haveNewDispatchNotice ? 'active' : ''"
                  ><icon></icon
                ></view>
                <view class="text">
                  <view>派件相关</view>
                  <view>{{
                    objData.newDispatchNoticeTime
                      ? "您有一个新的派件订单"
                      : "暂无消息"
                  }}</view>
                </view>
                <text class="time" v-if="objData.newDispatchNoticeTime">{{
                  taskTimeFormat(objData.newDispatchNoticeTime)
                }}</text>
              </navigator>
            </view>
            <view class="item">
              <navigator
                :url="'/pages/news/system?title=签收提醒&type=' + 302"
                open-type="redirect"
              >
                <view
                  class="icon income"
                  :class="objData.haveNewReceiveNotice ? 'active' : ''"
                  ><icon></icon
                ></view>
                <view class="text">
                  <view>签收提醒</view>
                  <view>{{
                    objData.newReceiveNoticeTime
                      ? "您有一个派件已签收"
                      : "暂无消息"
                  }}</view>
                </view>
                <text class="time" v-if="objData.newReceiveNoticeTime">{{
                  taskTimeFormat(objData.newReceiveNoticeTime)
                }}</text>
              </navigator>
            </view>
            <view class="item">
              <navigator
                :url="'/pages/news/system?title=快件取消&type=' + 303"
                open-type="redirect"
              >
                <view
                  class="icon cancel"
                  :class="objData.haveNewCancelNotice ? 'active' : ''"
                  ><icon></icon
                ></view>
                <view class="text">
                  <view>快件取消</view>
                  <view>{{
                    objData.newCancelNoticeTime
                      ? "您有一个快件已取消"
                      : "暂无消息"
                  }}</view>
                </view>
                <text class="time" v-if="objData.newCancelNoticeTime">{{
                  taskTimeFormat(objData.newCancelNoticeTime)
                }}</text>
              </navigator>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { taskTimeFormat } from "@/utils/index.js";
// 接口api
import { getNotice } from "@/pages/api/news.js";
// 导入组件
// ------定义变量------
let objData = ref({}); //列表数据
// 获取父组件数据
const props = defineProps({
  // 当前触发的tab值
  tabIndex: {
    type: Number,
    default: 1,
  },
});
// ------定义变量------
const emit = defineEmits("getTabIndex"); //子组件向父组件事件传递
// ------生命周期------
onMounted(() => {
  getOjb();
});
// ------定义方法------
// 获取系统通知
const getOjb = async () => {
  await getNotice()
    .then((res) => {
      if (res.code === 200) {
        objData.value = res.data;
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
//把数据、方法暴漏给父组件
defineExpose({
  getOjb,
});
</script>
