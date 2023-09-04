<!-- 订单跟踪详情页 -->
<template>
  <!-- 自定义头部 -->
  <UniNav :title="title" @goBack="goBack"></UniNav>
  <!-- end -->
  <view class="content">
    <view class="bottmBox">
      <view class="orderList">
        <view
          class="logistics-orderInfo logistics-orderInfo-item"
          :class="[index === 0 ? 'active' : '']"
          :key="index"
          v-for="(item, index) in markers.value"
        >
          <view class="logistics-orderInfo-left">
            <view
              class="circle gray"
              v-if="['已拒收', '已签收', '已取件'].includes(item.status)"
            >
              {{
                item.status === "已拒收"
                  ? "拒"
                  : item.status === "已签收"
                  ? "签"
                  : "取"
              }}
            </view>

            <view
              class="circle gray"
              v-else-if="
                (index === 0 && ['运送中', '派送中'].includes(item.status)) ||
                (index > 0 && markers.value[index - 1].status !== '运送中')
              "
            >
              <image :class="item.status === '派送中' ? 'ys' : 'ps'"></image>
            </view>

            <view
              class="point"
              v-else-if="
                index > 0 && markers.value[index - 1].status === '运送中'
              "
            ></view>

            <view
              class="line"
              v-if="!(index === markers.value.length - 1)"
              :class="item.status === '运送中' ? 'short' : ''"
            ></view>
          </view>
          <view class="logistics-orderInfo-right">
            <view
              class="status"
              v-if="
                !(
                  index > 0 &&
                  markers.value[index - 1].status === '运送中' &&
                  item.status === '运送中'
                )
              "
              >{{ item.status }}</view
            >
            <view class="time">{{ item.created }}</view>
            <view class="desc" v-html="strInit(item.info)"></view>
          </view>
        </view>
      </view>
    </view>
    <!-- TODO此处代码保留 -->
    <!-- <map class="mapBox" :latitude="latitude" :longitude="longitude" scale="6">
			<cover-view class="bottmBox" v-if="markers.value">
				<cover-view class="orderList" scroll-top='0'>
					<cover-view class="logistics-orderInfo logistics-orderInfo-item" :class="[index===0?'active':'']" :key="index"
										v-for='(item,index) in markers.value'>
										<cover-view class="logistics-orderInfo-left">
											<cover-view class="circle" v-if="['已拒收','已签收','已取件'].includes(item.status)">
												<cover-view class="iconBg" ><cover-view class="fontPostion">{{item.status==='已拒收'?'拒':item.status==='已签收'?'签':'取'}}</cover-view></cover-view>
											</cover-view>
					
											<cover-view class="circle"
												v-else-if="index ===0 &&['运送中','派送中'].includes(item.status) || index>0 && markers.value[index-1].status !=='运送中'">
												<cover-view class="iconBg" ><cover-image :src="item.status==='派送中'?'../../static/yunshuzhong.png':'../../static/paisong.png'"></cover-image></cover-view>
											</cover-view>
					
											<cover-view class="point" v-else-if="index>0 && markers.value[index-1].status==='运送中'"></cover-view>
					
											<cover-view class="line" v-if='!(index === markers.value.length - 1)'
												:class="item.status==='运送中'?'short':''"></cover-view>
										</cover-view>
										<cover-view class="logistics-orderInfo-right">
											<cover-view class="status"
												v-if='!(index>0 && markers.value[index-1].status==="运送中" &&item.status==="运送中")'>
												{{item.status}}
											</cover-view>
											<cover-view class="time">{{item.created}}</cover-view>
											<cover-view class="desc"
												:class="index === 0|| item.status === 23010?'active':''"
												>{{item.info}}
											</cover-view>
										</cover-view>
									</cover-view>
				</cover-view>
			</cover-view>
		</map> -->
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
// 导入接口
import { getTracks } from "@/pages/api/index.js";
// ------定义变量------
const store = useStore(); //vuex获取、储存数据
const users = store.state.user; //vuex获取、储存数据
const title = ref("订单跟踪"); //nav标题
const latitude = ref(39.91667); //维度
const longitude = ref(116.41667); //经度
// 起始位置
const markers = reactive([]);
// 路线点
const polyline = reactive([
  // 第一条线
  {
    // 每个点的经纬度
    points: [
      { longitude: 116.41667, latitude: 39.91667 },
      { longitude: 118.78333, latitude: 32.05 },
    ],
    // 路线颜色
    color: "#EF4F3F",
    // 线条宽度
    width: 12,
  },
]);
// ------生命周期------
// ------定义方法------
onMounted(() => {
  getTrack();
});

//将后端传来的字符串中的数字变为红色
const strInit = (value) => {
  let strText = value;
  let replaceText = [];
  for (let i = 0; i <= 10; i++) {
    replaceText.push("" + i);
  }
  // 后面
  const str = value.split("【")[1];
  // 转换成html形式解析
  for (let i = 0; i < replaceText.length; i++) {
    var replaceString = `<span class='red'>` + replaceText[i] + `</span>`;
    strText = strText.replace(RegExp(replaceText[i], "g"), replaceString);
  }

  // 这里再把这个红色替换成你想要的颜色
  // 由于在循环体里面数字会被替换，所以用了一个单词（red）来当成初始色
  strText = strText.replace(RegExp("red", "g"), "red");
  return strText;
};
// 获取运单轨迹
const getTrack = async () => {
  await getTracks(users.detailsData.transportOrderId).then((res) => {
    if (res.code === 200) {
      markers.value = res.data.reverse();
      polyline[0].points = res.data.data;
    }
  });
};
// 返回上一页
const goBack = () => {
  uni.redirectTo({
    url: "/pages/details/waybill",
  });
};
</script>
<style src="./index.scss" lang="scss" scoped></style>
<style></style>
