<template>
  <el-container class="customer-details-box waybill-detail">
    <el-card
      shadow="never"
      style="width: 100%"
      :class="isShow?'show':'hidden'"
    >
      <div class="block">
        <div class="car-base">货品信息
          <img
            ref="arrow"
            src="../../../assets/new-pull-down.png"
            style="position:absolute;width:18px;height:18px;right:44px;top:20px;cursor:pointer;transition-duration:0.3s"
            @click="open"
          />
        </div>
        <el-card
          v-loading="listLoading"
          element-loading-text="加载中"
          :class="{ 'loading-box': listLoading }"
          shadow="never"
          class="form-box"
        >
          <el-table
            :key="tableKey"
            ref="multipleTable"
            :data="dataList"
            fit
            style="width: 100%; text-align: center; overflow: auto"
            stripe
            :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
            @selection-change="handleSelectionChange"
          >
            <div
              v-show="(!dataList || dataList.length <= 0) && !listLoading"
              slot="empty"
            >
              <img
                src="../../../icons/pic-kong.png"
                alt="img"
                style="margin-top: 20px;width: 20%;height: 20%;"
              >
              <p
                style="
          margin-top: -20px;
          padding-bottom: 0px;
          "
              >这里空空如也</p>

            </div>
            <el-table-column
              type="index"
              label="序号"
              width="100"
            />
            <el-table-column
              align="left"
              label="运单编号"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="下单时间"
              min-width="140"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.order === null ? '' : scope.row.order.createTime
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="发件人姓名"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.order === null ? '' : scope.row.order.senderName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="发件人电话"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.order === null ? '' : scope.row.order.senderPhone
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="发件人地址"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.order === null ? '' : scope.row.order.senderAddress
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="货品数量"
              min-width="80"
            >
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.companyName }}</span> -->
                <span>{{
                  scope.row.order &&
                    scope.row.order.orderCargoDtos &&
                    scope.row.order.orderCargoDtos.length
                }}</span>
              </template>
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              min-width="86"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleTransportDetail(scope.row.id, scope.row)"
                >查看详情</el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-card>
  </el-container>
</template>
<script>
import { transportJobDetail } from '@/api/transport'
// eslint-disable-next-line no-unused-vars
var _this = null
export default {
  name: 'Courses',
  components: {},
  data() {
    return {
      isShow: true,
      transportOrderCount: '',
      value: '',
      multipleSelection: [],
      tableKey: 0,
      dataList: [],
      total: null,
      listLoading: true,
      alertText: ''
    }
  },
  computed: {
    status() {
      return status
    }
  },
  // 挂载结束
  mounted: function () {},
  // 创建完毕状态
  created() {
    var _this = this
    this.id = this.$route.query.id
    this.getList(this.id)
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.requestParameters)
      }
    }
  },
  // 组件更新
  updated: function () {},
  methods: {
    open() {
      this.isShow = !this.isShow
      this.$refs.arrow.style.transform = !this.isShow ? 'rotate(-90deg)' : 'rotate(0deg)'
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 查看详情
    handleTransportDetail(id, row) {
      // eslint-disable-next-line object-curly-spacing
      this.$router.push({
        path: '/business/waybill-detail',
        query: {
          id: id,
          orderId: row.order && row.order.id,
          type: this.$route.query.type
        }
      })
    },
    // 获取列表数据
    async getList(id) {
      this.listLoading = true
      const { data: res } = await transportJobDetail(id)
      this.listLoading = false
      if (res.transportOrders != null) {
        // 获取数据给dataList
        this.dataList = res.transportOrders
        this.transportOrderCount = res.transportOrderCount
        // 获取总条数
        this.total = res.counts
      }
    },
    // 返回列表
    handleTaskList() {
      this.$router.push({ path: '/transport/transport-task' })
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
.customer-details-box {
  height: 100%;
  margin-left: 20px;
  .block {
    background-color: #ffffff;
    width: 100%;
    padding: 0 24px;
  }
  .car-base {
    color: #2a2929;
    font-size: 16px;
    margin: 15px 0;
    font-weight: 700;
  }
  .car-img-base {
    margin: 25px 0;
    border-bottom: 1px solid #e5e7ec;
    .info-box {
      border: 0 !important;
      padding: 35px 0;
      width: 100%;
    }
  }
  .form-box {
    border: 0 !important;
    /deep/ .el-card__body {
      padding: 10px 40px!important;
      .form-item-box {
        display: flex;
        flex-wrap: wrap;
        .form-item {
          width: 50%;
          display: flex;
          align-items: center;
          margin-top: 24px;
          box-sizing: border-box;
          &:nth-child(1),
          &:nth-child(2) {
            margin-top: 0;
          }
          &:nth-child(odd) {
            padding-right: 35px;
          }
          &:nth-child(even) {
            padding-left: 35px;
          }
          .span-title {
            min-width: 80px;
            font-weight: 400;
            text-align: right;
            color: #20232a;
            font-size: 14px;
          }
          /deep/ .el-input {
            flex: 1;
            margin-left: 10px;
          }
          /deep/.el-input.is-disabled .el-input__inner {
            background: #eff3f8;
            border: 1px solid #d8dde3;
            border-radius: 5px;
            font-weight: 400;
            color: #bac0cd;
          }
        }
      }
    }
  }
  .footer-box {
    text-align: center;
    margin-top: 20px;
    padding: 30px 0 16px;
    border-top: 1px solid #e5e7ec;
    .save-btn {
      background-color: #e15536;
      color: #ffffff;
      width: 110px;
      border-radius: 5px;
      font-weight: 400;
      border: 1px solid #e15536;
      &:hover {
        background: #ffab98;
        border: 1px solid #ffab98;
      }
    }
    .cancel-btn {
      width: 110px;
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
  }
}
// .el-table th {
//   background-color: #ffffff;
// }
// .el-table th.is-leaf {
//   border-bottom: 2px solid #e8e8e8;
// }
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
.el-dropdown-menu--medium .el-dropdown-menu__item {
  width: 125px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-bottom: 10px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.bg-purple-dark {
  background: #ffffff;
}

.waybill-detail /deep/ .el-table td,
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
</style>
