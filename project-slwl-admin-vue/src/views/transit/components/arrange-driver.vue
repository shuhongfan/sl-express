<!-- 配置司机弹窗 -->
<template>
  <div>
    <el-dialog
      :title="titleInfo.text"
      :visible.sync="dialogFormVisible"
      width="640px"
    >
      <div class="header">
        <div class="num">
          <label>车牌号：</label>
          <span>{{ carModalInfo.licensePlate || '' }}</span>
        </div>
        <div class="name">
          <label>车型：</label>
          <span>{{ carModalInfo.truckTypeName || '' }}</span>
        </div>
        <div class="carType">
          <label>车辆状态：</label>
          <span
            :class="{
              use: carModalInfo.status === 1,
              noUse: carModalInfo.status === 0
            }"
          >{{ carModalInfo.status === 1 ? '可用' : '停用' }}</span>
        </div>
        <div class="agency">
          <label>实载重量：</label>
          <span>{{ carModalInfo.allowableLoad || '' }}</span>
        </div>
        <div class="workTime">
          <label>实载体积：</label>
          <span>{{ carModalInfo.allowableVolume || '' }}</span>
        </div>
      </div>
      <div class="serchBox">
        <label>配置司机：</label>
        <el-select
          suffix-icon="el-icon-search"
          placeholder="请输入司机名称"
          filterable
          multiple
          :value="selecteds"
          reserve-keyword
          @change="handleChange"
        >
          <el-option
            v-for="item in driversList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <el-table
        :key="tableKey"
        ref="multipleTable"
        v-loading="loading"
        :data="dataList"
        style="width: 100%"
        stripe
        :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
      >
        <div
          v-show="(!dataList || dataList.length <= 0) && !loading"
          slot="empty"
        >
          <img
            src="../../../icons/pic-kong.png"
            alt="img"
            style="margin-top: 20px"
          />
          <p style="margin-top: -20px; padding-bottom: 0px">这里空空如也</p>
        </div>
        <el-table-column
          type="index"
          label="序号"
          width="200"
        />
        <el-table-column
          align="left"
          label="司机名称"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          width="160"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="handleVehicleDetail(scope.row.userId)"
            >查看</el-link>
            <el-divider direction="vertical" />
            <el-link
              type="danger"
              :underline="false"
              @click="deleteDriver(scope.row.userId, scope.row.name)"
            >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
        style="text-align: center; padding-top: 30px; padding-bottom: 20px"
      >
        <el-button
          type="warning"
          style="width: 90px"
          class="save-btn"
          @click="confirm"
        >确认</el-button>
        <el-button
          plain
          style="width: 90px; color: #2a2929"
          class="cancel-btn"
          @click="dialogFormH"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { carArrangeDriver, getDriverListByCar } from '@/api/transit'
export default {
  props: {
    titleInfo: {
      type: Object,
      required: true
    },
    formBaseAd: {
      type: Object,
      required: true
    },
    carModalInfo: {
      type: Object,
      required: true
    },
    driversList: {
      type: Array,
      default () {
        return []
      },
      require: true
    }
  },
  data () {
    return {
      tableKey: 0,
      dialogFormVisible: false,
      form: {},
      dataList: [],
      selecteds: [],
      loading: false
    }
  },
  mounted () { },
  methods: {
    async getDriverListByCar (id) {
      this.loading = true
      await getDriverListByCar(id).then((res) => {
        if (String(res.code) === '200') {
          this.dataList = res.data
          this.selecteds = res.data.map((item) => item.name)
          this.loading = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 删除选中司机
    deleteDriver (id, name) {
      this.dataList = this.dataList.filter((item) => item.userId !== id)
      this.selecteds = this.selecteds.filter((item) => item !== name)
    },
    async confirm () {
      await carArrangeDriver({
        driverIds: this.dataList.map((item) => item.userId),
        truckId: this.carModalInfo.id
      }).then((res) => {
        if (String(res.code) === '200') {
          this.$message.success('安排司机成功')
          this.$emit('newDataes')
          this.dialogFormVisible = false
          this.dataList = []
          this.selecteds = []
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 跳转到司机详情
    handleVehicleDetail (id) {
      this.$router.push({
        path: '/transit/driver-detail',
        query: { id: id, formUrlName: '司机管理' }
      })
    },
    // 改变时触发
    handleChange (value) {
      if (value.length > 2) {
        return this.$message.error('车辆最多只能绑定2名司机，请先删除绑定司机！')
      }
      this.selecteds = value
      this.arr = [...this._props.driversList, ...this.dataList].filter(
        (item) => {
          return this.selecteds.indexOf(item.name) !== -1
        }
      )
      const some = []
      this.arr.forEach((el) => {
        if (!some.some((e) => e.id === el.id)) {
          some.push(el)
        }
      })
      this.dataList = some
    },
    // 弹层显示
    dialogFormV () {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.getDriverListByCar(this._props.carModalInfo.id)
      })
    },
    // 弹层隐藏
    dialogFormH () {
      this.dialogFormVisible = false
      this.dataList = []
    },
    // 选择司机
    handleChooseDriver () {
      this.$refs.chooseDriver.dialogFormV()
      this.titleInfo.text = '安排车辆'
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .small-padding{
  .cell{
    text-align:left!important
  }
}
.serchBox {
  .el-select {
    width: 300px;
  }
  text-align: left;
  margin-bottom: 20px;
}
.header {
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  width: 584px;
  height: 131px;
  background-color: #fbfafa;
  flex-wrap: wrap;
  padding: 21px 52px;
  text-align: left;
  .el-input {
    width: 240px;
  }
  div {
    flex: 40%;
  }
  .num,
  .iphone {
    flex: 60%;
  }
  label {
    color: #20232a;
    font-size: 14px;
    font-weight: normal;
  }
  span {
    color: #818693;
    font-size: 14px;
  }
  .carType {
    flex: 60%;
    span {
      display: inline-block;
      text-align: center;
      line-height: 20px;
      width: 41px;
      height: 20px;
      border-radius: 13.5px;
      color: white;
      font-size: 12px;
    }
    .use {
      background: #37c608;
    }
    .noUse {
      background: #808694;
    }
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
/deep/ .el-table {
  overflow: initial;
  .el-table__body-wrapper {
    overflow: initial;
    .cell {
      overflow: initial;
    }
  }
}
</style>
