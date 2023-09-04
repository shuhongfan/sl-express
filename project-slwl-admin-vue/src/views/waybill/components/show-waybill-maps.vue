<!-- 地图弹层 -->
<template>
  <div class="add-form maps-details-box">
    <el-dialog
      :title="titleInfo.text"
      :visible.sync="dialogFormVisible"
    >
      <div class="content">
        <baidu-map
          class="mapsClass"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="scrollWheelZoom"
          @ready="handler"
        >
          <!-- <bm-polyline
            :path="[{ lng: formBase.startLng, lat: formBase.startLat },{ lng: formBase.endLng, lat: formBase.endLat }]"
            stroke-color="blue"
            :stroke-opacity="0.5"
            :stroke-weight="2"
          ></bm-polyline> -->
          <bm-driving
            :panel="false"
            :start="startArea"
            :end="endArea"
            :auto-viewport="true"
            location="中国"
          ></bm-driving>
          <!-- <bm-transit :panel="false" :start="startArea" :end="endArea" :auto-viewport="true" location="中国"></bm-transit> -->
        </baidu-map>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    titleInfo: {
      type: Object,
      required: true
    },
    formBase: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      scrollWheelZoom: true,
      zoom: 6,
      center: {
        lng: 116.404,
        lat: 39.915
      },
      dialogFormVisible: false,
      startArea: '',
      endArea: ''
    }
  },
  computed: {},
  created() {},
  // 挂载结束
  mounted: function() {},
  // 组件更新
  updated: function() {},
  methods: {
    handler: function({ BMap, map }) {
      const _this = this
      _this.startArea = ''
      _this.endArea = ''
      // map.enableScrollWheelZoom(true)
      _this.BMap = BMap
      _this.map = map
      const startPoint = new BMap.Point(_this.formBase.startLng, _this.formBase.startLat)
      const endPoint = new BMap.Point(_this.formBase.endLng, _this.formBase.endLat)
      var gc = new BMap.Geocoder()
      gc.getLocation(startPoint, function(rs) {
        _this.startArea = rs.address
      })
      gc.getLocation(endPoint, function(rs) {
        _this.endArea = rs.address
      })
    },
    update(e) {
      this.points = e.target.cornerPoints
    },

    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>

/*定义滚动条轨道 内阴影+圆角*/
/deep/ .el-dialog__wrapper {

  padding-bottom: 5px;
  margin-bottom: 5px;
  &::-webkit-scrollbar {
    height: 10px;
    width: 4px;
  }

  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    //border: 3px solid rgba(0, 0, 0, 0);
    background-color:rgba(144,147,153,.3);
  }

  &::-webkit-scrollbar-track-piece{
    margin-right: 3px;
    margin-left: 3px;
  }
}

.mapsClass {
  width: 100%;
  height: 700px;
  text-align: center;
}
.el-form--label-left .el-form-item__label {
  // text-align: right;
}
.el-form-item--medium {
  // margin-bottom: 22px;
}
.el-dialog__footer {
  // text-align: center;
}
/deep/ .el-dialog {
  width: 1200px;
}
.maps-details-box{
  /deep/ .el-dialog__header{
    .el-dialog__title{
      font-size: 18px;
      font-weight: 400;
      color: #20232a;
    }
  }
  /deep/ .el-dialog__body{
    padding: 32px;
  }
}
</style>
