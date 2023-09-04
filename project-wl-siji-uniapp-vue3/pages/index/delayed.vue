<!-- 延迟交货 -->
<template>
  <!-- end -->
  <view class="pageBox">
    <!-- title -->
    <DetailsNav title="延迟提货"></DetailsNav>
    <!-- 取件状态列表 -->
    <view class="container">
      <view class="delayedCont">
        <view class="lineBoder">
          <text>原定时间</text>
          <text class="label">{{ orgTime }}</text>
        </view>
        <view class="lineBoder">
          <text>延迟时间</text>
          <picker
            mode="time"
            :value="time"
            start="09:01"
            end="21:01"
            @change="bindTimeChange"
          >
            <view class="uni-input timeInfo">
              <text>{{ time }}</text>
              <image
                class="iconImg"
                src="../../static/sj_open_rit.png"
                mode=""
              ></image>
            </view>
          </picker>
        </view>
        <view class="">
          <textarea
            class="textInput"
            v-model="formData.delayReason"
            placeholder-style="color:#818181"
            placeholder="请输入延迟提货原因"
          />
        </view>
        <view class="butCont">
          <text
            class="button buttonDis1"
            v-show="formData.delayReason == '' || time == '不可超过两小时'"
            >提交</text
          >
          <text
            class="button"
            v-show="formData.delayReason != '' && time != '不可超过两小时'"
            @click="formActioin()"
            >提交</text
          >
        </view>
      </view>
    </view>
    <!-- end -->
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
// 导入接口
import { PutDelay } from '@/pages/api/index.js';
// 导入组件
import DetailsNav from '@/components/DetailsNav/index.vue';
// 主体部分

// ------定义变量------
const orgTime = ref(); // 原定提货时间
const time = ref('不可超过两小时');
// 提交数据
const formData = ref({
  id: '',
  delayTime: '',
  delayReason: '',
});

// ------生命周期------
onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1].$page.options;
  orgTime.value = currentPage.time;
  formData.value.id = currentPage.id;
});

// ------定义方法------
const bindTimeChange = (e) => {
  time.value = e.detail.value;
};
// 延迟提货提交
const formActioin = async () => {
  const data = formData.value;
  // 延迟时间必选
  if (time.value == '不可超过两小时') {
    uni.showToast({
      title: '请选择延迟时间！',
      duration: 1000,
      icon: 'none',
    });
    return;
  }
  // 请填写延迟提货原因
  if (data.delayReason.trim() == '') {
    uni.showToast({
      title: '请填写延迟提货原因！',
      duration: 1000,
      icon: 'none',
    });
    return;
  }
  // 网络慢的时候添加按钮loading
  let times = setTimeout(() => {
    uni.showLoading({
      title: 'loading',
      mask:true
    });
  }, 500);
  // 原始时间
  const lastTime = orgTime.value;
  // 替换处理 延迟的实际时间
  data.delayTime = lastTime.replace(/(\d+){2}(:\d+){1}/, time.value);
  // 延迟提货
  await PutDelay(formData.value)
    .then((res) => {
      if (res.code === 200) {
        // 操作成功后清除loading
        setTimeout(function () {
          uni.hideLoading();
        }, 500);
        clearTimeout(times);
        uni.showToast({
          title: '延迟提货提交成功',
          duration: 1000,
          icon: 'none',
        });
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/index/index',
          });
        }, 500);
      } else {
        uni.showToast({
          title: res.msg,
          duration: 1000,
          icon: 'none',
        });
      }
    })
    .catch((err) => {});
};
</script>
<style lang="scss">
@import url('@/styles/theme.scss');
.delayedCont {
  background-color: var(--neutral-color-white);
  margin: 30rpx;
  padding: 30rpx 30rpx 40rpx 30rpx;
  border-radius: 20rpx;
  font-size: var(--font-size-14);
  .lineBoder {
    display: flex;
    justify-content: space-between;
    padding: 40rpx 0;
    border-bottom: solid 1px var(--neutral-color-cancel);
    .label {
      color: var(--neutral-color-font);
    }
  }
  .textInput {
    font-size: var(--font-size-14);
    background-color: var(--neutral-color-cancel);
    width: 100%;
    border-radius: 20rpx;
    margin-top: 40rpx;
    padding: 30rpx;
    box-sizing: border-box;
  }
  .butCont {
    width: 60%;
    margin: 40rpx auto 0 auto;
  }
  .timeInfo {
    display: flex;
    line-height: 48rpx;
    .iconImg {
      width: 48rpx;
      height: 48rpx;
    }
  }
}
</style>
