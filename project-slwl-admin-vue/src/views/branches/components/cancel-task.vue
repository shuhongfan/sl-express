<!-- 快递作业管理 -->
<template>
  <div class="dashboard-container cancel-task customer-list-box">
    <div
      v-loading="listLoading"
      :class="{ 'loading-box': listLoading }"
      element-loading-text="加载中"
      style="margin-top: 20px"
    >
      <el-card
        v-show="dataList && dataList.length > 0"
        class="table-card-box"
        shadow="never"
      >
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
          <!-- <el-table-column align="left" type="selection" width="40" /> -->
          <el-table-column
            align="left"
            type="index"
            label="序号"
            width="80"
          >
            <template slot-scope="scope">
              <span>{{
                scope.$index +
                  (operationalSearchFormData.page - 1) *
                  operationalSearchFormData.pageSize +
                  1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="作业编号"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="运单编号"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.transportOrder === null
                  ? ''
                  : scope.row.transportOrder.id
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="快递员分配状态"
            width="140"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.assignedStatus == 1">未分配</span>
              <span v-else-if="scope.row.assignedStatus == 2">已分配</span>
              <span v-else>待人工分配</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="下单时间"
            width="160"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.order === null ? '' : scope.row.order.createTime
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="作业状态"
            width="100"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">待提货</span>
              <span v-else-if="scope.row.status == 2">在途</span>
              <span
                v-else-if="scope.row.status == 3 || scope.row.status == 4"
              >已交付</span>
              <span v-else>已作废</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="快递员姓名"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.courier === null ? '' : scope.row.courier.name
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="取消时间"
            width="160"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.cancelTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="发件人姓名"
            width="120"
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
            width="120"
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
                scope.row.order === null
                  ? ''
                  : scope.row.order.senderProvince.name
              }}</span>
              <span>{{
                scope.row.order === null ? '' : scope.row.order.senderCity.name
              }}</span>
              <span>{{
                scope.row.order === null
                  ? ''
                  : scope.row.order.senderCounty.name
              }}</span>
              <span>{{
                scope.row.order === null ? '' : scope.row.order.senderAddress
              }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="left" label="发件人电话" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.mark }}</span>
          </template>
        </el-table-column> -->
          <!-- 操作按钮 -->
          <!-- <el-table-column
          align="left"
          label="操作"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-link
              v-if="scope.row.transportOrderId"
              type="primary"
              :underline="false"
              @click="handleWayllDetail(scope.row.transportOrderId)"
            >查看运单详情</el-link>
            <el-link
              v-else
              disabled
              :underline="false"
              @click="handleWayllDetail(scope.row.transportOrderId)"
            >查看运单详情</el-link>
          </template>
        </el-table-column> -->
        </el-table>
        <!-- end -->
        <!-- 分页 -->
        <div class="pagination">
          <div class="pages">
            <el-pagination
              :current-page="Number(operationalSearchFormData.page)"
              :total="Number(total)"
              :page-size="Number(operationalSearchFormData.pageSize)"
              :page-sizes="[10, 20, 30, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-card>
      <el-card
        v-show="(!dataList || dataList.length <= 0) && !listLoading"
        class="table-empty-box"
        shadow="never"
      >
        <empty></empty>
      </el-card>
    </div>
  </div>
</template>
<script>
import { pickupTaskList } from '@/api/branch'
export default {
  data() {
    return {
      multipleSelection: [],
      tableKey: 0,
      dataList: [],
      total: null,
      listLoading: true,
      alertText: '',
      operationalSearchFormData: {
        page: 1,
        pageSize: 10,
        status: 5
      },
      titleInfo: {
        pageTitle: '',
        text: ''
      },
      formData: {
        isFamous: '',
        shortName: '',
        company: '',
        tags: '',
        remarks: ''
      }
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
    this.companyId = this.$route.query.companyId
    this.initialDate()
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        this.handleFilter(this.operationalSearchFormData)
      }
    }
  },
  // 组件更新
  updated: function () {},
  methods: {
    // 初始数据
    initialDate() {
      // 读取数据
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取列表数据
    async getList() {
      this.listLoading = true
      // eslint-disable-next-line no-undef
      const { data: res } = await pickupTaskList(this.operationalSearchFormData)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
    },
    // 重置
    resetForm() {
      this.$refs['operationalSearchFormData'].resetFields()
    },
    // 搜索信息
    handleFilter() {
      this.operationalSearchFormData.page = 1
      this.getList(this.operationalSearchFormData)
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.operationalSearchFormData.pageSize = val
      if (this.operationalSearchFormData.page === 1) {
        this.getList(this.operationalSearchFormData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.operationalSearchFormData.page = val
      this.getList()
    },
    // 查看运单详情
    handleWayllDetail(id) {
      // eslint-disable-next-line object-curly-spacing
      this.$router.push({ path: '/business/waybill-detail', query: { id: id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 40px;
}
.dashboard-container {
  width: 100%;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<style lang="scss" scoped>
.cancel-task {
}
</style>
