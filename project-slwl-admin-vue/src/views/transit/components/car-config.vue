<!-- 配置车辆弹窗 -->
<template>
  <div>
    <el-dialog
      title="配置车辆"
      :visible.sync="dialogModalVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
      width="640px"
    >
      <div class="header">
        <div class="num">
          <label>司机编号：</label>
          <span>{{ driverModalInfo.userId || '' }}</span>
        </div>
        <div class="name">
          <label>司机名称：</label>
          <span>{{ driverModalInfo.name || '' }}</span>
        </div>
        <div class="iphone">
          <label>司机电话：</label>
          <span>{{ driverModalInfo.mobile }}</span>
        </div>
        <div class="agency">
          <label>所属机构：</label>
          <span>{{
            (driverModalInfo.agency && driverModalInfo.agency.name) || ''
          }}</span>
        </div>
      </div>
      <div class="serchBox">
        <label>配置车辆：</label>
        <el-select
          v-model="selecteds"
          suffix-icon="el-icon-search"
          placeholder="请输入车牌号"
          filterable
          @change="handleChange"
        >
          <el-option
            v-for="item in carList"
            :key="item.id"
            :label="item.licensePlate"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="dataList"
        fit
        style="
        width: 584px;
        margin: 0 auto;
        "
        stripe
        :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
      >
        <div
          v-show="
            (!dataList || dataList.length <= 0) && !loading
          "
          slot="empty"
        >
          <img
            src="../../../icons/pic-kong.png"
            alt="img"
            style="margin-top: 20px;"
          >
          <p
            style="
          margin-top: -20px;
          padding-bottom: 0px;
          "
          >这里空空如也</p>

        </div>
        <el-table-column
          align="left"
          label="车牌号"
          min-width="100"
          prop="licensePlate"
        >
        </el-table-column>
        <!-- <el-table-column
          align="left"
          label="车辆类型"
          min-width="100"
          prop="truckTypeName"
        >
        </el-table-column> -->
        <el-table-column
          align="left"
          label="车辆状态"
          min-width="100"
          prop="workStatus"
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
        <!-- <el-table-column
          align="left"
          label="关联线路"
          min-width="100"
          prop="transportLineName"
        >
        </el-table-column> -->
        <!-- 操作按钮 -->
        <el-table-column
          align="center"
          label="操作"
          width="160"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="handleVehicleDetail(scope.row.id)"
            >查看</el-link>
            <el-divider direction="vertical" />
            <el-link
              type="danger"
              :underline="false"
              @click="
                handleDelete
              "
            >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
        style="text-align: center; padding-bottom: 20px"
      >
        <el-button
          type="warning"
          class="save-btn"
          style="width:90px"
          @click="confirm"
        >确认</el-button>
        <el-button
          plain
          style="width:90px"
          class="cancel-btn"
          @click="handleClose"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { driverArrangeCar } from '@/api/transit'
export default {
  name: 'CarConfig',
  props: {
    driverModalInfo: {
      type: Object,
      default() {
        return {}
      },
      require: true
    },
    carList: {
      type: Array,
      default() {
        return []
      },
      require: true
    }
  },
  data() {
    return {
      dialogModalVisible: false,
      params: {
        page: 1,
        pageSize: 10
      },
      dataList: [],
      selectedInfo: {},
      selectedCarId: '',
      loading: false,
      selecteds: ''
    }
  },
  watch: {
    driverModalInfo(news, olds) {
      if (news.truck && news.truck.id) {
        this.dataList = [{ ...news.truck }]
        this.selecteds = this.dataList[0].licensePlate
      }
    }
  },
  methods: {
    handleDelete() {
      this.dataList = []
      this.selectedCarId = ''
      this.selecteds = ''
    },
    // 选择车辆，内容改变时发生变化
    handleChange(value, value1, value2) {
      this.selectedCarId = value
      this.dataList = this._props.carList.filter((item) => item.id === value)
    },
    async confirm() {
      await driverArrangeCar({
        driverIds: [this.driverModalInfo.userId],
        truckId: this.selectedCarId
      }).then((res) => {
        if (String(res.code) === '200') {
          this.$message.success('安排车辆成功')
          this.$emit('newDataes')
          this.dialogModalVisible = false
          this.dataList = []
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 关闭弹窗
    handleClose() {
      this.dialogModalVisible = false
      this.dataList = []
      this.selecteds = ''
    },
    // 打开弹窗
    handleOpen() {
      this.dialogModalVisible = true
    },
    // 跳转到车辆详情
    handleVehicleDetail(id) {
      this.$router.push({
        path: '/transit/vehicle-detail',
        query: { id: id, formUrlName: '车辆管理' }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.serchBox {
  width: 584px;
  margin: 0 auto;
  margin-top: 19px;
  .el-select {
    width: 238px;
  }
  margin-bottom: 20px;
}
.workTime {
  white-space: nowrap;
}
.header {
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  width: 584px;
  height: 90px;
  background-color: #fbfafa;
  flex-wrap: wrap;
  padding: 21px 52px;
  margin: 0 auto;
  // 使得整体内容距离上部分的距离为20px
  margin-top: -10px;
  .el-input {
    width: 240px;
  }
  div {
    flex: 40%;
     // 使包裹的所有div的上下间距为14px
    // margin-bottom: 14px;
  }
  .num,
  .iphone{
    flex: 60%;
  }
  .num,.name{
    margin-bottom: 14px;
  }
  label {
    width: 71px;
    height: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 14px;
    color: #20232A;
    letter-spacing: 0.16px;
    text-align: right;
  }
  span {
    color: #818693;
    font-size: 14px;
  }
}
.pagination {
  margin: 32px 0 44px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px !important;
  color: #20232a !important;
}
.selected-driver {
  margin-top: 18px;
}
</style>
