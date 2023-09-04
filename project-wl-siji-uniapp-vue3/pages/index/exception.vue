<!-- 上报异常 -->
<template>
  <!-- end -->
  <view class="pageBox">
    <!-- title -->
    <DetailsNav :title="title"></DetailsNav>
    <!-- 取件状态列表 -->
    <view class="container">
      <view class="delayedCont">
        <view class="lineBoder">
          <text>异常时间</text>
          <text v-if="type == 'details'">{{ exceptionsDeta.time }}</text>
          <!-- <text v-else class="label">请选择</text> -->
          <uni-datetime-picker
            v-else
            type="datetime"
            v-model="exceptionsDeta.time"
            :clear-icon="false"
          />
        </view>
        <view class="lineBoder">
          <text>上报位置</text>
          <text v-if="type == 'details'">{{ exceptionsDeta.province }}</text>
          <text v-else class="label">请选择</text>
        </view>
        <view class="lineBoder">
          <text>异常类型</text>
          <text v-if="type == 'details'">{{ exceptionsDeta.type }}</text>
          <view v-else class="label">
            <Select :options="typeOptions"></Select>
          </view>
        </view>
        <view v-if="type == 'details'" class="lineBoder noborder">
          <view class="" style="width: 100%">
            <view>
              <text>异常描述</text>
            </view>
            <view>
              <text class="desc">{{ exceptionsDeta.description }}</text>
            </view>
          </view>
        </view>
        <view v-else class="lineBoder">
          <view class="" style="width: 100%">
            <text>异常描述</text>
            <textarea
              class="textInput"
              v-model="formData.delayReason"
              placeholder-style="color:#818181"
              placeholder="请输入异常描述"
            />
          </view>
        </view>
      </view>
      <view class="delayedCont">
        <view :class="{ upPicCont: true, setBottom: type == 'details' }">
          <view class="title">上传图片（最多6张）</view>
          <view v-if="type == 'details'" class="exceptionImages">
            <image
              class="exceptionImage"
              v-for="(item, index) in exceptionsDeta.images"
              :src="item"
              key="index"
              mode=""
            ></image>
          </view>
          <uni-file-picker
            v-else
            v-model="imageValue"
            fileMediatype="image"
            mode="grid"
            @select="select"
            @progress="progress"
            @success="success"
            @fail="fail"
          />
        </view>
      </view>
    </view>
    <!-- end -->
    <view class="footCont positionBot" style="justify-content: center">
      <view class="footBut" style="width: 400rpx; flex: initial">
        <text class="button" @click="exceptionHandle()">提交</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
// 导入接口
import { Exception, ExceptionDetails } from '@/pages/api/index.js';
// 导入组件
import DetailsNav from '@/components/DetailsNav/index.vue';
import Select from '@/components/Select/index.vue';
// 主体部分

// ------定义变量------
const imageValue = ref([]); // 上次图片
const type = ref('add'); // 类型
const title = ref('上报异常'); // 标题
const exceptionId = ref(''); // 异常的id - 详情
const exceptionsDeta = ref({});
// 类型
const typeOptions = [
  { title: '发动机启动困难', value: '1' },
  { title: '不着车，漏油', value: '2' },
  { title: '照明失灵', value: '3' },
  { title: '有异常响动', value: '4' },
  { title: '排烟异常、温度异常', value: '5' },
  { title: '其他问题', value: '6' },
];

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
  if (Object.keys(currentPage).length > 0) {
    type.value = 'details';
    title.value = '异常详情';
    exceptionId.value = currentPage.exceptionId;
    getDetails();
  } else {
    type.value = 'add';
    title.value = '上报异常';
  }
});
// ------定义方法------
// 上报异常
const exceptionHandle = async () => {
  // 网络慢的时候添加按钮loading
  let times = setTimeout(() => {
    uni.showLoading({
      title: 'loading',
      mask:true
    });
  }, 500);
  // 上报异常
  await Exception(formData)
    .then((res) => {
      if (res.code === 200) {
        // 操作成功后清除loading
        setTimeout(function () {
          uni.hideLoading();
        }, 500);
        clearTimeout(times);
        uni.showToast({
          title: '提交成功',
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

// 获取异常详情数据
async function getDetails() {
  await ExceptionDetails({ exceptionId: exceptionId })
    .then((res) => {
      if (res.code === 200) {
        const data = res.data;
        data.images = [
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F04%2F2411191727687.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645143&t=8fed835d7336cac9b3fedb170766a678',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2017%2F03%2F26%2FB1371.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645178&t=07a6e8bcc05b75d3dd86c369c70f7274',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2017%2F03%2F26%2FB2154.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645143&t=54afc59b141abad9f7799f005e20c944',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2019%2F05%2F08211345608033.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645143&t=c8a2aa7a7bd874381fbb98bc4223e6fe',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2017%2F03%2F26%2FB1365.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645143&t=55b411cc1ad4aea58cef44fe11438f72',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2019%2F04%2F07090912704156.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645143&t=fa6d42ffb721c66f1e42548895a64e89',
        ];
        exceptionsDeta.value = res.data;
      } else {
        uni.showToast({
          title: res.msg,
          duration: 1000,
          icon: 'none',
        });
      }
    })
    .catch((err) => {});
}

// 获取上传状态
function select(e) {
  console.log('选择文件：', e);
}
// 获取上传进度
function progress(e) {
  console.log('上传进度：', e);
}

// 上传成功
function success(e) {
  console.log('上传成功');
}

// 上传失败
function fail(e) {
  console.log('上传失败：', e);
}
</script>
<style src="./index.scss" lang="scss"></style>
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
  .noborder {
    border: none;
  }
  .desc {
    display: inline-block;
    padding-top: 40rpx;
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
  .exceptionImages {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .exceptionImage {
      width: 26vw;
      height: 26vw;
      margin-bottom: 3vw;
    }
  }
  .setBottom {
    margin-bottom: 0;
  }
  ::v-deep .uni-input-placeholder {
    text-align: right;
  }
}
.positionBot {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
