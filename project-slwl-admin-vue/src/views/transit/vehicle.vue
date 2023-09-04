<!-- 车辆列表 -->
<template>
  <div class="dashboard-container vehicle customer-list-box">
    <div class="app-container">
      <el-card
        shadow="never"
        class="search-card-box"
      >
        <el-form
          ref="vehicleSearchFormData"
          :model="vehicleSearchFormData"
          label-width="80px"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                prop="truckTypeId"
                label="车辆类型:"
                style="margin-bottom: 0px"
              >
                <el-select
                  v-model="vehicleSearchFormData.truckTypeId"
                  value-key="id"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="licensePlate"
                label="车牌号码:"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model="vehicleSearchFormData.licensePlate"
                  placeholder="请输入车牌号码"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button
                type="warning"
                @click="handleFilter"
              >搜索</el-button>
              <el-button
                plain
                class="reset-btn"
                @click="resetForm('vehicleSearchFormData')"
              >重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <TabChange
        :default-active-index="2"
        :setting-list="settingList"
        @tabChange="tabChange"
      ></TabChange>

      <el-card
        v-loading="listLoading"
        element-loading-text="加载中"
        class="table-card-box"
        :class="{
          'table-empty-box': !dataList || dataList.length <= 0,
          'loading-box': listLoading
        }"
        shadow="never"
        style="margin-top: 20px"
      >
        <el-button
          type="warning"
          style="margin-bottom: 20px"
          @click="handleAddVehicle()"
        >新增车辆</el-button>
        <el-table
          :key="tableKey"
          ref="multipleTable"
          :data="dataList"
          fit
          style="width: 100%"
          stripe
          :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
          @selection-change="handleSelectionChange"
        >
          <div
            v-show="(!dataList || dataList.length <= 0) && !listLoading && !searchkey"
            slot="empty"
          >
            <img
              src="@/icons/pic-kong.png"
              alt="img"
              style="margin-top: 20px;width: 25%;height: 25%;"
            >
            <p
              style="
          margin-top: -20px;
          padding-bottom: 0px;
          "
            >这里空空如也</p>

          </div>
          <el-card
            v-show="(!dataList || dataList.length <= 0) && !listLoading && searchkey"
            slot="empty"
            class="table-empty-box"
            shadow="never"
          >
            <empty></empty>
          </el-card>
          <el-table-column
            align="left"
            type="index"
            label="序号"
            width="60"
          >
            <template slot-scope="scope">
              <span>{{
                scope.$index +
                  (vehicleSearchFormData.page - 1) *
                  vehicleSearchFormData.pageSize +
                  1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="车牌号码"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.licensePlate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="车辆类型"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.truckTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="司机数量"
            prop="driverNum"
          >
          </el-table-column>
          <el-table-column
            align="left"
            label="车辆状态"
          >
            <template slot-scope="scope">
              <div
                class="tableColumn-status"
                :class="{ 'stop-use': String(scope.row.workStatus) === '0' }"
              >
                {{ String(scope.row.workStatus) === '1' ? '可用' : '停用' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="GPS设备ID"
            min-width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.deviceGpsId }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="实载重量（T）"
            min-width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.allowableLoad }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="实载体积（方）"
            min-width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.allowableVolume }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="220"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="handleVehicleDetail(scope.row.id)"
              >查看详情</el-link>
              <el-divider direction="vertical" />
              <el-link
                :type="scope.row.workStatus == '0' ? 'primary' : 'danger'"
                :underline="false"
                @click="handleStatus(scope.row)"
              >{{ scope.row.workStatus == '1' ? '停用' : '启用' }}</el-link>
              <el-divider direction="vertical" />
              <el-link
                type="primary"
                :underline="false"
                @click="handleArrangeDriver(scope.row)"
              >配置司机</el-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
        <!-- 分页 -->
        <div
          v-show="dataList && dataList.length > 0"
          class="pagination"
        >
          <div class="pages">
            <el-pagination
              :current-page="Number(vehicleSearchFormData.page)"
              :total="Number(total)"
              :page-size="Number(vehicleSearchFormData.pageSize)"
              :page-sizes="[10, 20, 30, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <!-- end -->
        <!-- 新增编辑车辆 -->
        <vehicleModelsDialog
          ref="addVehicleModels"
          class="add-form-dialog"
          :title-info="titleInfo"
          :form-base="formData"
          @newDataes="getData"
        />
        <!-- 安排司机 -->
        <arrangeDriver
          ref="arrangeDriverModels"
          :title-info="{ text: '配置司机' }"
          :form-base-ad="{}"
          :car-modal-info="carModalInfo"
          :drivers-list="driversList"
          @newDataes="getData"
        ></arrangeDriver>
      </el-card>
    </div>
  </div>
</template>
<script>
import {
  truckList,
  truckDel,
  truckStatusUse,
  truckStatusNoUse,
  getCarTypeStatics,
  unBindDriverList
} from '@/api/transit'
import { truckTypeCommonList } from '@/api/common'
import vehicleModelsDialog from './components/vehicle-add'
import arrangeDriver from '@/views/transit/components/arrange-driver'
import TabChange from '@/components/TabChange'
export default {
  name: 'Vehicle',
  components: {
    vehicleModelsDialog,
    TabChange,
    arrangeDriver
  },
  data() {
    return {
      dialogVisible: false,
      handleDeleteId: '',
      multipleSelection: [],
      tableKey: 0,
      dataList: [],
      searchkey: false,
      options: [],
      total: null,
      listLoading: true,
      vehicleSearchFormData: {
        page: 1,
        pageSize: 10,
        truckTypeId: '',
        licensePlate: '',
        workStatus: 2
      },
      titleInfo: {
        pageTitle: '',
        text: ''
      },
      formData: {
        fleet: '',
        deviceGpsId: '',
        licensePlate: '',
        allowableLoad: '',
        allowableVolume: '',
        truckType: ''
      },
      settingList: [
        {
          key: 'all',
          value: 2,
          label: '全部',
          num: 0 // 全部数量
        },
        {
          key: 'able',
          value: 1,
          label: '可用',
          num: 0 // 停用数量
        },
        {
          key: 'unable',
          value: 0,
          label: '停用',
          num: 0 // 停用数量
        }
      ],
      carModalInfo: {}, // 弹窗需要的车辆详情数据
      driversList: [] // 司机列表数据
    }
  },
  // 挂载结束
  mounted: function () {
    this.getCarTypeStatics()
    this.getDriverList()
  },
  // 创建完毕状态
  created() {
    var _this = this

    this.initialDate()
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.vehicleSearchFormData)
      }
    }
  },
  // 组件更新
  updated: function () {},
  methods: {
    // 打开安排司机弹窗
    handleArrangeDriver(row) {
      const h = this.$createElement
      this.$confirm(
        `启用`,
        {
          title: '车辆配置',
          message: h('div',
            [h('p', { style: 'margin-bottom :9px;color:#332929' }, '配置司机需满足以下条件：'),
              h('span', { style: 'width: 16px;height: 16px;background: #FAFCFF;border: 1px solid #EBEEF5;border-radius : 50% ;display : inline-block ;text-align:center ;margin-right:6px;line-height:14px;' }, '1'),
              h('span', { style: 'color:#332929' }, '车辆信息已完善'),
              h('span', { style: 'width: 16px;height: 16px;background: #FAFCFF;border: 1px solid #EBEEF5;margin-left :90px ; border-radius : 50% ;display : inline-block ;text-align:center;line-height:14px;margin-right:6px' }, '2'),
              h('span', { style: 'color:#332929' }, '车辆无未完成运输任务')]),
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'startconfirm'
        },
      )
        .then(() => {
          this.carModalInfo = Object.assign({}, row)
          this.$refs.arrangeDriverModels.dialogFormV()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 获取车辆数据和车辆列表
    getData() {
      this.getList()
      this.getCarTypeStatics()
      this.getDriverList()
    },
    // 获取未绑定司机列表
    async getDriverList() {
      const { data: res } = await unBindDriverList()
      this.driversList = res
    },
    // 获取统计车辆数据
    async getCarTypeStatics() {
      const { data: res } = await getCarTypeStatics()
      this.settingList[2].num = res[0] || 0
      this.settingList[1].num = res[1] || 0
      this.settingList[0].num = Number(this.settingList[1].num) + Number(this.settingList[2].num)
    },
    // 状态变更
    tabChange(activeIndex) {
      this.vehicleSearchFormData.workStatus = activeIndex
      this.getList()
    },
    // 删除弹框重绘方法
    handleClose() {
      this.dialogVisible = false
    },
    // 初始数据
    initialDate() {
      // 读取数据
      this.clearField()
      this.getList()
      this.getTruckTypeList()
    },
    clearField() {
      if (this.vehicleSearchFormData.truckTypeId === '') {
        this.$delete(this.vehicleSearchFormData, 'truckTypeId')
      }
      if (this.vehicleSearchFormData.licensePlate === '') {
        this.$delete(this.vehicleSearchFormData, 'licensePlate')
      }
    },
    setField() {
      this.$set(this.vehicleSearchFormData, 'truckTypeId')
      this.$set(this.vehicleSearchFormData, 'licensePlate')
    },
    // 获取车辆类型列表数据
    async getTruckTypeList() {
      const { data: res } = await truckTypeCommonList()
      // 获取数据给options
      this.options = res
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取车辆列表数据
    async getList() {
      this.listLoading = true
      const params = this.vehicleSearchFormData
      if (params.workStatus === 2) {
        delete params.workStatus
      }

      const { data: res } = await truckList(params)

      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
    },
    // 重置
    resetForm(vehicleSearchFormData) {
      this.setField()
      this.searchkey = false
      this.$refs[vehicleSearchFormData].resetFields()
      this.getList()
    },
    // 搜索信息
    handleFilter() {
      this.vehicleSearchFormData.page = 1
      this.searchkey = true
      this.getList(this.vehicleSearchFormData)
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.vehicleSearchFormData.pageSize = val
      if (this.vehicleSearchFormData.page === 1) {
        this.getList(this.vehicleSearchFormData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.vehicleSearchFormData.page = val
      this.getList()
    },
    // 新增车辆
    handleAddVehicle() {
      this.$refs.addVehicleModels.dialogFormV()
      this.titleInfo.text = '新增车辆'
      this.formData.id = ''
      this.formData.deviceGpsId = ''
      this.formData.licensePlate = ''
      this.formData.allowableLoad = ''
      this.formData.allowableVolume = ''
      this.formData.fleet = ''
      this.formData.truckType = ''
    },
    // 删除车辆
    async handleDelete(id, index) {
      this.handleDeleteId = ''
      this.handleDeleteId = id
      this.handleDeleteIndex = index
      // 获取点击对象的id
      // 如果未停用，提示先停用
      if (this.handleDeleteIndex === 1) {
        this.$message({
          message: '请先停用车辆',
          type: 'warning'
        })
        return
      } else if (this.handleDeleteIndex === 0) {
        this.dialogVisible = true
        this.$confirm('确定要删除车辆吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.change(id)
          // change(id)是删除的方法，原理是将车辆的状态改为2，即删除，不是真正的删除，只是状态改变，数据库中还是有数据的，只是不显示，如果需要真正的删除，需要在数据库中删除，这里不做删除操作，只是将状态改变
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      }
    },
    // 启用禁用逻辑
    async handleStatus(row) {
      const h = this.$createElement
      if (String(row.workStatus) === '0') {
        this.$confirm(
          `启用`,
          {
            title: '车辆启用',
            message: h('div',
              [h('p', { style: 'margin-bottom :9px;color:#332929' }, '确定要启用吗？车辆启用需满足以下条件：'),
                h('span', { style: 'width: 16px;height: 16px;background: #FAFCFF;border: 1px solid #EBEEF5;border-radius : 50% ;display : inline-block ;text-align:center ;margin-right:6px;line-height:14px;' }, '1'),
                h('span', { style: 'color:#332929' }, '车辆信息已完善'),
                h('span', { style: 'width: 16px;height: 16px;background: #FAFCFF;border: 1px solid #EBEEF5;margin-left :90px ; border-radius : 50% ;display : inline-block ;text-align:center;line-height:14px;margin-right:6px' }, '2'),
                h('span', { style: 'color:#332929' }, '绑定司机>=2,且有排班')]),
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            customClass: 'startconfirm'
          },
        )
          .then(() => {
            (String(row.workStatus) === '0'
              ? truckStatusUse(row.id)
              : truckStatusNoUse(row.id)
            ).then((res) => {
              // 异常不处理，信息不外抛。。。。
              // String(res.code)的意识是将res.code转换为字符串，因为res.code是数字类型，而String(row.status) === '0'是字符串类型，所以要转换为字符串类型
              if (String(res.code) === '200') {
                this.getList()
                this.getCarTypeStatics()
                this.dialogVisible = false
                this.$message.success('恭喜你，车辆启用成功！')
              } else {
                this.$message.error(res.msg)
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else {
        this.$confirm(
          `启用`,
          {
            title: '车辆停用',
            message: h('div',
              [
                h('p', { style: 'margin-bottom :9px;color:#332929' }, '确定要停用吗？车辆停用需满足以下条件：'),
                h('span', { style: 'width: 16px;height: 16px;background: #FAFCFF;border: 1px solid #EBEEF5;border-radius : 50% ;display : inline-block;text-align:center;margin-right:6px;line-height:14px' }, '1'),
                h('span', { style: 'color:#332929' }, '车辆当前无运输任务'),
                h('span', { style: 'width: 16px;height: 16px;background: #FAFCFF;border: 1px solid #EBEEF5;margin-left :110px ; border-radius : 50% ;display : inline-block ;text-align:center;margin-right:6px;line-height:14px' }, '2'),
                h('span', { style: 'color:#332929' }, '车辆无关联运输线路'),
                h('p', { style: 'color: #FFB302;margin-top:10px;margin-bottom:-10px' }, '注：停用后司机将自动解除绑定')
              ]),
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'startconfirm',
            type: 'warning'
          },
        )
          .then(() => {
            (String(row.workStatus) === '0'
              ? truckStatusUse(row.id)
              : truckStatusNoUse(row.id)
            ).then((res) => {
              // 异常不处理，信息不外抛。。。。
              // String(res.code)的意识是将res.code转换为字符串，因为res.code是数字类型，而String(row.status) === '0'是字符串类型，所以要转换为字符串类型
              if (String(res.code) === '200') {
                this.getList()
                this.getCarTypeStatics()
                this.getDriverList()
                this.dialogVisible = false
                this.$message.success('车辆停用成功！司机已解除绑定。')
              } else {
                this.$message.error(res.msg)
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      }
    },
    async change(id) {
      await truckDel(id).then((res) => {
        // 异常不处理，信息不外抛。。。。
        if (String(res.code) === '200') {
          this.$message.success('删除成功')
          this.getList()
          this.getCarTypeStatics()
          this.dialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 车辆详情
    handleVehicleDetail(id) {
      this.$router.push({
        path: '/transit/vehicle-detail',
        query: { id: id, formUrlName: '车辆管理' }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 10px;
}
.vehicle /deep/ .el-table td,
.el-table th {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  overflow: hidden;
}

.vehicle {
  /deep/ .el-dialog__title {
    width: 73px;
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #20232a;
    line-height: 25px;
    letter-spacing: 0px;
  }
  /deep/ .el-dialog__body {
    text-align: center;
    padding: 20px 20px 0px 20px;
  }
  .warn-img {
    width: 40px;
  }
  p {
    height: 24px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #818693;
    line-height: 24px;
  }
}

// 下拉框
/deep/ .el-select {
  width: 100%;
}
</style>

<style>
  .startconfirm{
    width: 481px;

    }
    .startconfirm .el-message-box__header{
      padding-bottom: 4px;
    }
    .startconfirm .el-message-box__container{
      margin-bottom: 15px;
    }
    .confirm .el-message-box__status.el-icon-warning{
      left: 70px;
    }
    .confirm.el-message-box__title{
      font-size: 16px;
    }
    .confirm .el-message-box__message p {
      color: #F92D2D;
      margin-top: 5px;
    }
    .confirm .el-message-box__btns{
      text-align: center;
      margin-top: 10px;
    }
</style>
