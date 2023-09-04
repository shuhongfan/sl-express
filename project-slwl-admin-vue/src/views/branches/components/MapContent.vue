<!-- 地图编辑功能 -->
<template>
  <div class="map-content">
    <div class="app-container">
      <el-card shadow="never" class="card-box">
        <div class="header-box">
          <span>作业范围分配</span>
          <div style="float: right">
            <el-button
              v-show="showEdit"
              style="
                background-color: #e15536;
                color: #ffffff;
                width: 90px;
                border: 1px solid #e15536;
              "
              class="save-map-btn"
              @click="editData"
              >编辑</el-button
            >
            <el-button
              v-show="showSave"
              style="
                background-color: #e15536;
                color: #ffffff;
                width: 90px;
                border: 1px solid #e15536;
              "
              class="save-map-btn"
              @click="createData"
              >保存</el-button
            >
            <el-button
              v-show="showSave"
              style="width: 90px"
              class="cancel-map-btn"
              @click="cancelData"
              >取消</el-button
            >
          </div>
        </div>
        <div class="searchBox">
          <div class="keyword">
            <label>地区关键词：</label>
            <el-input
              v-model="keyword"
              placeholder="请输入地区关键词"
              @input="handleInputfun"
            />
          </div>
        </div>
        <baidu-map
          ref="myMap"
          class="map"
          :class="keyword ? '' : 'active'"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          :map-click="false"
          @mousemove="syncPolyline"
          @click="paintPolyline"
          @rightclick="newPolyline"
          @ready="ready"
        >
          <bm-local-search
            :keyword="keyword"
            :auto-viewport="true"
            :panel="false"
          ></bm-local-search>
          <bm-control v-show="showSave" style="background: #fff; width: 100%">
            <el-button
              type="primary"
              style="
                background: rgba(225, 85, 54, 1);
                border: 1px solid rgba(225, 85, 54, 1);
              "
              @click="toggle('polyline')"
              >{{ polyline.editing ? '完成绘制' : '开始绘制' }}</el-button
            >
            <el-button
              v-show="polyline.editing !== false"
              style="color: #818693"
              class="dele"
              @click="clear()"
              >删除围栏</el-button
            >
            <P
              style="
                font-size: 12px;
                color: rgba(198, 126, 18, 1);
                width: 100%;
                background: rgba(255, 245, 231, 1);
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: left;
                padding-left: 10px;
              "
            >
              <img
                src="@/assets/warn.png"
                alt=""
                style="
                  width: 14px;
                  vertical-align: middle;
                  margin-bottom: 2px;
                  margin-right: 6px;
                "
              />
              点击或拖动鼠标绘制电子围栏，右击鼠标结束图形绘制，图形不可有交叉点。完成绘制后，点击提交按钮保存。仅支持绘制单个电子围栏区域
            </P>
          </bm-control>
          <bm-control
            v-show="!isHaveAgencyArange && !showSave"
            style="background: #fff; width: 100%"
          >
            <p
              style="
                font-size: 12px;
                color: rgba(198, 126, 18, 1);
                width: 100%;
                background: rgba(255, 245, 231, 1);
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
              "
            >
              <img
                src="@/assets/warn.png"
                alt=""
                style="
                  width: 14px;
                  vertical-align: middle;
                  margin-bottom: 2px;
                  margin-right: 6px;
                "
              />
              当前{{ $route.query.agencyName }}下暂无作业范围
            </p>
          </bm-control>
          <bm-polygon
            v-for="(path, index) of polyline.paths"
            :key="index"
            :path="path"
            stroke-color="#e85552"
            fill-color="rgba(232,85,82,0.30)"
            :fill-opacity="0.9"
            :stroke-opacity="0.5"
            :stroke-weight="2"
            :editing="polyline.editing"
            stroke-style="dashed"
            @lineupdate="updatePolygonPath"
          />
        </baidu-map>
      </el-card>
    </div>
  </div>
</template>

<script>
import { courierAdd, deleteCourierScope, courierScopeList } from '@/api/branch'
import { toAMap, toBaiduMap } from '@/utils/index'
export default {
  data() {
    return {
      isHaveAgencyArange: false, // 判断该快递员是否有作业范围
      keyword: '',
      showEdit: true, // 控制编辑按钮显隐
      showSave: false, // 控制保存按钮显隐
      center: {
        lng: '116.404',
        lat: '39.915'
      },
      path: '',
      zoom: 13,
      markList: '',
      agencyType: '',
      agencyTypeName: '',
      agencyId: '',
      agencyName: '',
      parentAgencyId: '',
      parentAgencyName: '',
      polygonPath: [],
      isOperation: false, // 解决已经作业范围时，编辑时会默认开启编辑状态
      polyline: {
        editing: false,
        paths: []
      },
      submitPath: [],
      countrys: [],
      // 保留原始地图禁止删除的数组
      disDeltePaths: [],
      // newOptionAreas: []
      newOptionAreas: null,
      isFirstEdit: true // 默认进来是否存在电子围栏
    }
  },
  mounted() {
    this.paintPolyline()
  },
  methods: {
    handleInput(e) {
      this.keyword = e.target.value
    },
    // 组件注入map实例
    ready({ BMap, map }) {
      this.map = map
      this.BMap = BMap
      this.handleNodeClick(this.$route.query.id)
    },
    goBack() {
      history.go(-1)
    },
    // 获取机构作业范围
    async handleNodeClick(id) {
      // 进来先清空数组
      // this.disDeltePaths = []
      this.polyline.paths = []
      const { data: res } = await courierScopeList(id, 2)
      let pointArr = []
      let noAgencyArange = []
      if (res.polygon && res.polygon.length > 0) {
        pointArr = res.polygon.map((item) => {
          return toBaiduMap(item.longitude, item.latitude)
        })
        this.isHaveAgencyArange = true
      } else {
        this.isHaveAgencyArange = false
        if (res.latitude) {
          noAgencyArange = [{ lat: res.latitude, lng: res.longitude }]
        } else {
          noAgencyArange = [{ lat: '39.915', lng: '116.4045' }]
        }
      }
      // 根据坐标点自动调整地图的中心点和地图缩放等级
      const viewPointInfo =
        this.map &&
        this.map.getViewport(
          this.isHaveAgencyArange ? pointArr : noAgencyArange
        )
      this.$set(this.center, 'lng', viewPointInfo.center.lng)
      this.$set(this.center, 'lat', viewPointInfo.center.lat)
      this.zoom = this.isHaveAgencyArange ? viewPointInfo.zoom : 11

      this.$set(this.polyline, 'paths', !pointArr ? [] : [pointArr])
      this.isFirstEdit = Boolean(res.polygon && res.polygon.length > 0)
      this.newOptionAreas = []
      this.disDeltePaths = [...this.polygonPath]
    },
    // 保存快递员
    async createData() {
      this.isOperation = false
      if (this.polyline.paths.length === 0) {
        return this.$message.error('请先绘制快递员作业范围')
      }
      // 用于解决绘画电子围栏时，取消默认选中点的绘画开启新的绘画时，无法提交的问题
      const arr = []
      this.polyline.paths.forEach((item) => {
        arr.push(item.length)
      })
      const max = Math.max(...arr)
      const indexOfMax = arr.indexOf(max)
      let point = []
      point = (
        !this.isFirstEdit ? this.polyline.paths[indexOfMax] : this.submitPath
      ).map((item) => {
        return toAMap(item.lng, item.lat)
      })
      point.push(point[0]) // 需要闭环所以前端这边手动在数组末尾加上第一个坐标点
      const data = {
        polygon: point,
        type: 2,
        bid: this.$route.query.id
      }
      await courierAdd(data)
        .then((res) => {
          if (res.code === 200) {
            this.showSave = false
            this.showEdit = true
            this.$message.success('电子围栏保存成功')
            this.polyline.paths = []
            this.$set(this.polyline, 'editing', false)
            this.handleNodeClick(this.$route.query.id)
          } else {
            this.$message.error(res.msg || '电子围栏保存失败')
          }
        })
        .catch(() => {
          this.$message.error('电子围栏保存失败')
        })
    },
    handleInputfun() {
      // 重置中心点和缩放等级为了在编辑时可以重新回到绘制区域
      this.$set(this.center, 'lng', 0)
      this.$set(this.center, 'lat', 0)
      this.zoom = 0
    },
    // 编辑机构作业范围
    async editData() {
      this.showSave = true
      this.showEdit = false
      // 编辑的时候回到绘制的区域中心点
      // 根据坐标点自动调整地图的中心点和地图缩放等级
      const viewPointInfo =
        this.map && this.map.getViewport(this.polyline.paths[0])
      this.$set(this.center, 'lng', viewPointInfo.center.lng)
      this.$set(this.center, 'lat', viewPointInfo.center.lat)
      this.zoom = this.isHaveAgencyArange ? viewPointInfo.zoom : 11
    },
    // 取消机构作业范围
    cancelData() {
      this.showSave = false
      this.showEdit = true
      // 清除绘制电子围栏
      this.polyline.editing = false
    },
    // 开启多边形绘制
    toggle(name) {
      this[name].editing = !this[name].editing
    },
    // 清除/删除电子围栏
    async clear() {
      this.polyline.editing = false
      this.showSave = true
      this.showEdit = false
      if (!this.isFirstEdit) {
        this.$set(this.polyline, 'paths', [])
      } else {
        const res = await deleteCourierScope(this.$route.query.id, 2)
        if (res.code === 200) {
          this.$message.success('删除快递员作业范围成功')
          this.polyline.paths = []
          // this.showSave = true
          // this.showEdit = false

          this.handleNodeClick(this.$route.query.id)
        } else {
          this.$message.error(res.msg || '删除机构作业范围成功')
        }
      }
    },
    // 在原有多边形的基础上继续绘制触发
    updatePolygonPath(e) {
      this.submitPath = e.target.getPath()
    },
    // 鼠标移动时
    syncPolyline(e) {
      if (!this.polyline.editing || !this.isOperation) {
        return
      }
      const { paths } = this.polyline
      if (!paths.length) {
        return
      }
      const path = paths[paths.length - 1]
      if (!path.length) {
        return
      }
      if (path.length === 1) {
        path.push(e.point)
      }
      this.$set(path, path.length - 1, e.point)
    },
    // 鼠标右键多边形绘制完成
    newPolyline(e) {
      if (!this.polyline.editing) {
        return
      }
      const { paths } = this.polyline
      if (!paths.length) {
        paths.push([])
      }
      const path = paths[paths.length - 1]
      path.pop()
      if (path.length) {
        paths.push([])
      }
    },
    // 鼠标左键点击时往路径里push一个点
    paintPolyline(e) {
      if (!this.polyline.editing || this.isFirstEdit) {
        return
      }
      this.isOperation = true
      const { paths } = this.polyline
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    }
  }
}
</script>

<style lang="scss" scoped>
.searchBox {
  display: flex;
  padding-left: 25px;
  padding-top: 20px;
  label {
    color: #20232a;
    font-weight: 400;
    font-size: 14px;
  }
  /deep/ .el-input {
    width: 230px;
  }
  .keyword {
    margin-right: 30px;
  }
}
.map-content {
  .map {
    width: 100%;
    height: calc(100vh - 245px);
  }
  .card-box {
    border-radius: 4px;
    /deep/ .el-card__body {
      padding: 0;
    }
    .header-box {
      padding: 0 25px;
      border-bottom: 0;
      background: #f8faff;
      font-size: 16px;
      font-weight: 700;
      color: #2a2929;
      height: 60px;
      line-height: 60px;
    }
    .map {
      padding: 22px 25px;
    }
  }
}

/deep/ .BMap_vectex_node {
  background-image: none;
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
  text-align: center;
}
/deep/ .BMap_vectex_nodeT {
  background-image: none;
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
  text-align: center;
}
// 更改比例尺位置
/deep/ .BMap_stdMpCtrl {
  margin-top: 120px;
}

.save-map-btn {
  background-color: #e15536;
  color: #ffffff;
  width: 90px;
  border-radius: 5px;
  font-weight: 400;
  border: 1px solid #e15536;
  &:hover {
    background: #ffab98;
    border: 1px solid #ffab98;
  }
}
.cancel-map-btn {
  width: 90px;
  color: #2a2929;
  border: 1px solid #d8dde3;
  border-radius: 5px;
  font-weight: 400;
  &:hover {
    background: #ffeeeb;
    border: 1px solid #f3917c;
    color: #e15536;
  }
}

.dele {
  &.el-button:focus {
    background-color: #fff;
  }
}
</style>
