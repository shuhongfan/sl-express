<!-- 作业范围页 -->
<template>
  <!-- 自定义头部 -->
  <UniNav :title="title" @goBack="goBack"></UniNav>
  <!-- end -->
  <view class="content"
    ><map
      class="mapBox"
      :latitude="latitude"
      :longitude="longitude"
      :polygons="polygons"
      scale="16"
    ></map
  ></view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
// 导入组件
// 导航组件
import UniNav from "@/components/uni-nav/index.vue";
// 导入接口
import { getUserScope } from "@/pages/api/my.js";
// ------定义变量------
const title = ref("作业范围"); //nav标题
const latitude = ref(39.997534); //维度
const longitude = ref(116.475334); //经度
const polygons = reactive([
  {
    //多边形的坐标数组
    points: [
      {
        longitude: 116.475334,
        latitude: 39.997534,
      },
      {
        longitude: 116.476627,
        latitude: 39.998315,
      },
      {
        longitude: 116.478603,
        latitude: 39.99879,
      },
      {
        longitude: 116.478529,
        latitude: 40.000296,
      },
      {
        longitude: 116.475082,
        latitude: 40.000151,
      },
      {
        longitude: 116.473421,
        latitude: 39.998717,
      },
    ],
    fillColor: "#EF4F3F20", //填充颜色后两个数值是透明度
    strokeColor: "#EF4F3F", //描边颜色
    strokeWidth: 2, //描边宽度
    zIndex: 1, //层级
    dottedLine: true,
  },
]);
// ------生命周期------
onMounted(() => {
  getUserPolygon();
});
// ------定义方法------
// 获取作业范围
const getUserPolygon = async () => {
  await getUserScope().then((res) => {
    if (res.code === 200) {
		// TODO暂时保留
      // polygons[0].points=res.data.polygon
      // latitude.value=polygons[0].points[0].latitude
      // longitude.value=polygons[0].points[0].longitude
    }
  });
};
// 返回上一页
const goBack = () => {
  uni.redirectTo({
    url: "/pages/my/index",
  });
};
</script>
<style src="./index.scss" lang="scss" scoped></style>
