<!-- 机构作业范围 -->
<template>
  <div class="org institutions-jobs-area">
    <div class="app-container scheduling-box">
      <div class="l-box">
        <el-card class="box-card" shadow="never" style="border-radius: 8px">
          <div class="app-container-tree" style="border-radius: 8px">
            <el-scrollbar style="height: 728px; width: 100% border-radius: 8px">
              <div class="tree-box">
                <el-tree
                  ref="tree"
                  class="filter-tree customer-tree-box"
                  style="font-size: 12px"
                  :indent="22"
                  :data="instituJobDataList"
                  highlight-current
                  node-key="id"
                  :props="defaultProps"
                  :expand-on-click-node="false"
                  :filter-node-method="filterNode"
                  :default-expanded-keys="treeExpandData"
                  @node-click="handleNodeClick"
                >
                </el-tree>
              </div>
            </el-scrollbar>
          </div>
        </el-card>
      </div>
      <div
        v-loading="loadingMap"
        class="r-box"
        element-loading-text="只有网点机构的作业范围可以查看和编辑"
      >
        <el-card shadow="never">
          <div v-if="agencyId" slot="header" style="">
            <span>作业范围</span>
            <div
              v-if="currentNode.type === 3"
              style="float: right; margin-right: 40px"
            >
              <el-tooltip
                effect="dark"
                content="点击编辑释放绘制电子围栏功能"
                placement="top"
              >
                <el-button
                  v-show="showEdit"
                  class="save-area-btn"
                  @click="editData"
                  >编辑</el-button
                >
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="点击保存上传绘制好的电子围栏"
                placement="top"
              >
                <el-button
                  v-show="showSave"
                  class="save-area-btn"
                  @click="createData"
                  >提交</el-button
                >
              </el-tooltip>
              <el-button
                v-show="showSave"
                class="cancel-area-btn"
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
          <div style="padding: 22px 0">
            <baidu-map
              ref="myMap"
              class="map"
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
              <bm-control
                v-show="showSave"
                style="background: #fff; width: 100%"
              >
                <el-button
                  type="primary"
                  class="new-btn"
                  @click="toggle('polyline')"
                  >{{ polyline.editing ? '完成绘制' : '开始绘制' }}</el-button
                >
                <el-button
                  v-show="polyline.editing !== false"
                  style="
                    color: #818693;
                    border: 1px solid #d8dde3;
                    padding: 10px 20px;
                    margin-left: 12px;
                  "
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
                  ><img
                    src="@/assets/warn.png"
                    alt=""
                    style="
                      width: 14px;
                      vertical-align: middle;
                      margin-bottom: 2px;
                      margin-right: 6px;
                    "
                  />点击或拖动鼠标绘制作业范围，右击鼠标结束图形绘制，图形不可有交叉点。完成绘制后，点击提交按钮保存。每个机构仅可支持绘制一个作业范围</P
                >
              </bm-control>
              <bm-polygon
                v-for="(path, index) of polyline.paths"
                :key="index"
                :path="path"
                stroke-color="#e85552"
                fill-color="rgba(232,85,82,0.30)"
                :fill-opacity="0.9"
                :stroke-opacity="0.5"
                :stroke-weight="1"
                :editing="polyline.editing"
                stroke-style="dashed"
                @lineupdate="updatePolygonPath"
              />
            </baidu-map>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { agencyList } from '@/api/institutions'
import { courierScopeList, courierAdd, deleteCourierScope } from '@/api/branch'
import { toAMap, toBaiduMap } from '@/utils/index'
export default {
  name: 'InstitutionsJobsArea',
  data() {
    return {
      agencyType: null, // 当前点击所处的机构类型（1,2级机构不展示编辑按钮）
      keyword: '',
      agencyId: '',
      isFirstEdit: true, // 默认进来是否存在电子围栏
      polygonPath: '', // 电子围栏的坐标
      treeExpandData: [], // 机构树的展开数据
      treeExpandData2: [], // 机构数默认展开需要用到的数据
      provincialCenterId: '', // 机构树展开的id
      provincialCenterId2: [], // 机构树默认展开的id
      loadingMap: false, // 地图加载loading
      center: {
        lng: 116.404,
        lat: 39.915
      },
      isOperation: false, // 解决已经作业范围时，编辑时会默认开启编辑状态
      zoom: 13, // 地图缩放级别
      showEdit: true, // 是否显示编辑按钮
      showSave: false, // 是否显示保存按钮
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      provinceCity: '暂无地址', // 机构地址
      instituJobDataList: [], // 机构作业范围列表
      listLoading: true, // 机构作业范围列表loading
      polyline: {
        editing: false,
        paths: []
      }, // 作业范围,绘制的多边形
      currentNode: {} // 当前选中的机构
    }
  },
  // 创建完毕状态
  created() {
    this.initialDate()
  },
  // 组件更新
  updated: function () {},
  methods: {
    // 组件注入map实例
    ready({ BMap, map }) {
      this.map = map
      this.BMap = BMap
      this.initialDate()
    },
    // 初始数据
    initialDate() {
      // 读取数据
      this.getList()
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 获取机构作业范围
    async handleNodeClick(data) {
      this.currentNode = data
      const { data: res } = await courierScopeList(data.id, 1)
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

      this.isFirstEdit = Boolean(res.polygon && res.polygon.length > 0)

      this.agencyId = data.id
      this.$set(this.polyline, 'paths', !pointArr ? [] : [pointArr])
      this.$set(this.polyline, 'editing', false)
    },
    // 获取树形结构默认展开节点
    getExpandData(provincialCenterId) {
      // 将传入的数据转换为数组
      const provincialCenterIdArr = provincialCenterId.split(',')
      // 循环数组，将数组中的数据添加到treeExpandData中
      provincialCenterIdArr.forEach((item) => {
        this.treeExpandData.push(item)
      })
    },
    // 获取机构作业范围列表
    getExpandData2(provincialCenterId2) {
      // 将传入的数据添加到treeExpandData2中
      this.treeExpandData2 = [provincialCenterId2]
      const _this = this
      setTimeout(() => {
        _this.handleNodeClick(provincialCenterId2)
      }, 50)
    },
    // 保存机构作业范围
    async createData() {
      this.polyline.editing = false
      this.isOperation = false
      if (this.polyline.paths.length === 0) {
        return this.$message.error('请绘制作业机构范围')
      }
      // 用于解决绘画电子围栏时，取消默认选中点的绘画开启新的绘画时，无法提交的问题
      const arr = []
      this.polyline.paths.forEach((item) => {
        arr.push(item.length)
      })
      const max = Math.max(...arr)
      const indexOfMax = arr.indexOf(max)
      // point是经纬度数组，即坐标点
      const point = (
        !this.isFirstEdit ? this.polyline.paths[indexOfMax] : this.polygonPath
      ).map((item) => {
        return toAMap(item.lng, item.lat)
      })
      point.push(point[0]) // 需要闭环所以前端这边手动在数组末尾加上第一个坐标点
      const data = {
        polygon: point,
        type: 1,
        bid: this.agencyId
      }
      // 发送请求，调用接口，保存数据
      await courierAdd(data)
        .then((res) => {
          if (res.code === 200) {
            this.showSave = false
            this.showEdit = true
            this.$emit('newDataes', this.newDataes)
            this.$message.success('电子围栏保存成功')
            this.$set(this.polyline, 'editing', false)
          } else {
            this.$message.error(res.msg || '电子围栏保存失败')
          }
        })
        .catch(() => {
          this.$message.error('电子围栏保存失败')
        })
    },
    // 到达地区关键词搜索
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
    // 获取列表数据
    async getList() {
      this.listLoading = true
      const { data: res } = await agencyList()
      // 获取数据给dataList
      this.instituJobDataList = JSON.parse(res)
      // 将instituJobDataList的数据赋予provincialCenter
      // 获取默认展开节点的ID
      this.provincialCenterId2 =
        this.instituJobDataList[0].children[0].children[0]
      this.provincialCenterId = this.instituJobDataList[0].children[0].id
      this.getExpandData(this.provincialCenterId)
      this.getExpandData2(this.provincialCenterId2)
      this.$nextTick(function () {
        this.$refs['tree'].setCurrentKey(
          this.instituJobDataList[0].children[0].children[0].id
        )
      })
      this.listLoading = false
    },
    // 开启多边形绘制
    toggle(name) {
      this[name].editing = !this[name].editing
    },
    // 删除围栏
    async clear() {
      this.isOperation = false
      this.polyline.editing = false
      this.showSave = true
      this.showEdit = false
      if (!this.isFirstEdit) {
        // isFristEdit为false时，说明是编辑状态，需要删除电子围栏
        this.$set(this.polyline, 'paths', [])
      } else {
        // 清除绘制电子围栏
        const res = await deleteCourierScope(this.agencyId, 1)
        if (res.code === 200) {
          this.$message.success('删除机构作业范围成功')
          this.polyline.paths = []
          this.handleNodeClick(this.currentNode)
        } else {
          this.$message.error(res.msg || '删除机构作业范围成功')
        }
      }
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
      // 解决默认有电子围栏时，在绘制过程中有某些点可能会清空之前画的并且回到原点的问题
      if (!this.polyline.editing || this.isFirstEdit) {
        return
      }
      this.isOperation = true
      const { paths } = this.polyline
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    },

    // 在原有多边形的基础上继续绘制触发
    updatePolygonPath(e) {
      this.polygonPath = e.target.getPath()
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .customer-tree-box {
  .el-tree-node {
    margin: 2px 0 !important;
    .is-focusable {
      position: relative;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 6px;
        // width: 1px;
        border-left: #e5e7ec solid 1px;
        height: calc(100% + 3px);
        // 将此类名的最后一项样式设置为none
        &:last-child {
          border-left: none !important;
        }
      }
      margin: 2px 0 !important;
      .el-tree-node {
        .el-tree-node__children {
          margin: 2px 0 !important;
          .el-tree-node {
            .el-tree-node__content {
              .el-tree-node__expand-icon {
                display: none;
              }
              .el-tree-node__label {
                margin-left: 0px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 131px;
              }
            }
          }
        }
      }
    }
  }
  .el-tree-node {
    .el-tree-node {
      .el-tree-node {
        position: relative;
        &::before {
          content: '';
          display: inline-block;
          position: absolute;
          left: 26px;
          // width: 1px;
          border-left: #e5e7ec solid 1px;
          height: calc(100% + 3px);
          &:last-child {
            border-left: none !important;
          }
        }
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.scheduling-box {
  width: 100%;

  display: flex;
  .l-box {
    border-radius: 4px !important;
  }
  .el-card box-card {
    border-radius: 4px;
  }
}
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 10px;
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
</style>
<style lang="scss" scoped>
.searchBox {
  display: flex;

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
/deep/ .el-tree-node__content {
  margin-right: 20px;
  .el-tree-node__label {
  }
}
/deep/ .l-box {
  width: 219px !important;
}
.map {
  width: 100%;
  height: 668px;
  overflow: hidden;
  // 使上下居中
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-main {
  background-color: #fff;
}
.disabled td {
  background-color: #f9f9f9;
  color: #c1c1c1;
}
.disabled .el-button--primary,
.disabled .el-button--danger {
  background-color: #dbdada;
  border: 1px solid #dbdada;
  color: #999;
  cursor: not-allowed;
}
.org {
  .l-box {
    width: 338px;
    border-radius: 8px;

    box-sizing: border-box;
    background: #ffffff;
    /deep/ .el-card__body {
      padding: 10px 8px 0 9px !important;
      border-radius: 8px;
    }
    .app-container-tree {
      padding: 0 !important;
      margin: 0 !important;
      /deep/ .el-scrollbar__wrap {
        margin-bottom: -5px !important;
        margin-right: -30px !important;
        margin-left: 10px !important;
      }
      /deep/ .el-input {
        .el-input__inner::placeholder {
          color: #bac0cd !important;
        }
      }
      /deep/ .customer-tree-box {
        .el-tree-node {
          margin: 5px 0 !important;
          .el-tree-node__children {
            margin: 2px 0 !important;
            .el-tree-node {
              .el-tree-node__children {
                margin: 2px 0 !important;
                .el-tree-node {
                  .el-tree-node__content {
                    .el-tree-node__expand-icon {
                      display: none;
                    }
                    .el-tree-node__label {
                      margin-left: 0px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      width: 131px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .r-box {
    flex: 1;
    margin-left: 20px;
    /deep/ .el-card__header {
      padding: 0 0 0 25px !important;
      border-bottom: 0 !important;
      background: #f8faff !important;
      font-size: 16px !important;
      font-weight: 700 !important;
      color: #2a2929 !important;
      height: 60px;
      line-height: 60px;
      .el-button {
        padding: 10px 20px !important;
      }
    }
    /deep/ .el-card__body {
      padding: 25px 25px 25px 25px !important;
    }
  }
}
.filter-container {
  background-color: #ffff;
  margin-bottom: 18px;
}
.tree-box {
  height: 723px;
  box-sizing: border-box;
  padding-right: 10px;
}
.el-card.is-always-shadow {
  box-shadow: none;
}
.el-card {
  border: none;
  .el-card__header {
    background: #f8faff;
    border-bottom: 0px solid #e6ebf5;
  }
}

.active {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

.dele {
  &.el-button:focus {
    background-color: #fff;
  }
}

.save-area-btn {
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
.cancel-area-btn {
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
</style>

<style lang="scss">
.el-tree-node__content {
  cursor: default;
}

.custom-tree-node {
  cursor: pointer;
}
.custom-tree-node:hover {
  color: #419eff !important;
}

.new-btn {
  background: #ffeeeb;
  padding: 10px 20px;
  border: 1px solid rgba(243, 145, 124, 1);
  color: #e15536;
  font-family: PingFangSC, PingFangSC-Regular;
}

.new-btn:hover {
  background-color: rgba(255, 107, 74, 1);
  border: 1px solid rgba(255, 107, 74, 1);
  color: #ffffff;
}

.new-btn:focus {
  background: #e15536;
  border: 1px solid #e15536;
  color: #ffffff;
}
</style>
