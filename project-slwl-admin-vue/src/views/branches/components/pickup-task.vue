<!-- 取件作业管理 -->
<template>
  <div class="dashboard-container pickup-task customer-list-box">
    <div class="app-container">
      <el-card
        class="search-card-box"
        shadow="never"
      >
        <el-form
          ref="operationalSearchFormData"
          :model="operationalSearchFormData"
          class="demo-form-inline"
          label-width="80px"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                label="取件任务编号:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="operationalSearchFormData.id"
                  placeholder="请输入取件任务编号"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="订单编号:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="operationalSearchFormData.orderId"
                  placeholder="请输入订单编号"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="所属营业部:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <treeselect
                  v-model="operationalSearchFormData.agencyId"
                  :options="agencyOptions"
                  :normalizer="normalizer"
                  :searchable="true"
                  style="width: 100%"
                  placeholder="请选择所属营业部"
                  no-options-text="暂无数据"
                  no-results-text="暂无数据"
                  @select="selectAgency"
                  @open="open"
                  @close="close"
                />
                <img
                  ref="arrow"
                  src="../../../assets/pullDown.png"
                  style="position:absolute;width:18px;height:18px;right:9px;top:12px;cursor:pointer;pointer-events:none;transition-duration:0.3s"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="预计完成时间:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-date-picker
                  v-model="estimatedTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  placeholder="选择预计完成时间"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  @change="handleEstimatedTimeChange"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="实际完成时间:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-date-picker
                  v-model="actualTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  placeholder="选择预计完成时间"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  @change="handleActualTimeChange"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="任务分配状态:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-select
                  v-model="operationalSearchFormData.assignedStatus"
                  clearable
                  placeholder="请选择任务分配状态"
                >
                  <el-option
                    v-for="item in operationOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
            >
              <el-button
                type="warning"
                @click="handleFilter('查询')"
              >搜索</el-button>
              <el-button
                plain
                class="reset-btn"
                @click="resetForm('operationalSearchFormData')"
              >重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <TabChange
        :default-active-index="0"
        :is-show-num="false"
        :setting-list="[
          {
            key: 'all',
            value: 0,
            label: '全部',
            num: allNum
          },
          {
            key: 'able',
            value: 1,
            label: '新任务',
            num: newNum
          },
          {
            key: 'unable',
            value: 2,
            label: '已完成',
            num: doneNum
          },
          {
            key: 'unable',
            value: 3,
            label: '已取消',
            num: cancelNum
          }
        ]"
        @tabChange="tabChange"
      ></TabChange>
      <div
        v-loading="listLoading"
        :class="{ 'loading-box': listLoading }"
        element-loading-text="加载中"
        style="margin-top: 20px"
      >
        <el-card
          class="table-card-box"
          shadow="never"
        >
          <el-button
            class="customer-add-btn"
            @click="handleAddCourier(multipleSelection)"
          >人工分配</el-button>
          <el-table
            :key="tableKey"
            ref="multipleTable"
            :data="dataList"
            fit
            style="width: 100%"
            stripe
            :header-cell-style="{ background: 'rgba(250,252,255,1)' ,}"
            :header-cell-class-name="isTableDisabled?'disabled':'able'"
            @selection-change="handleSelectionChange"
          >
            <div
              v-show="(!dataList || dataList.length <= 0) && !listLoading && !searchkey"
              slot="empty"
            >
              <img
                src="@/icons/pic-kong@2x.png"
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
              type="selection"
              width="60"
              fixed
              :selectable="selectEnable"
            />
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
              label="取件作业编号"
              min-width="180"
              prop="id"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="所在营业部"
              min-width="180"
              prop="agencyName"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="任务分配状态"
              min-width="110"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.assignedStatus == 1">未分配</span>
                <span
                  v-else-if="scope.row.assignedStatus == 2"
                  class="tableColumn-status normal"
                >已分配</span>
                <span
                  v-else
                  class="tableColumn-status stop-use"
                >待人工分配</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="快递员姓名"
              min-width="120"
              prop="courierName"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="订单编号"
              min-width="180"
              prop="orderId"
            >
            </el-table-column>
            <el-table-column
              v-if="operationalSearchFormData.status ===3"
              align="left"
              label="取消时间"
              min-width="180"
              prop="cancelTime"
            >
            </el-table-column>
            <el-table-column
              v-if="operationalSearchFormData.status ===3"
              align="left"
              label="取消原因"
              min-width="180"
              prop="cancelReason"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="预计开始时间"
              min-width="160"
              prop="estimatedStartTime"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="预计完成时间"
              min-width="160"
              prop="estimatedEndTime"
            >
            </el-table-column>
            <el-table-column
              v-if="![1,3].includes(operationalSearchFormData.status)"
              key="actualEndTime"
              align="left"
              label="实际完成时间"
              min-width="160"
              prop="actualEndTime"
            >
            </el-table-column>
          </el-table>
          <!-- end -->
          <!-- 分页 -->
          <div
            class="pagination"
          >
            <div
              v-show="dataList && dataList.length > 0"
              class="pages"
            >
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
          <!-- end -->
          <el-dialog
            class="add-form-dialog"
            :title="titleInfo.text"
            :visible.sync="dialogFormVisible"
            width="600px"
          >
            <el-form
              ref="dataForm"
              label-position="right"
            >
              <el-form-item
                label="选择快递员："
                prop="courierName"
                :label-width="formLabelWidth"
              >
                <el-select
                  v-model="courierId"
                  value-key="item.userId"
                  placeholder="请选择"
                  clearable
                  filterable
                  @change="handleChange"
                >
                  <el-option
                    v-for="item in courierOptions"
                    :key="item.userId"
                    :label="item.name"
                    :value="item.userId"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <div
              slot="footer"
              class="dialog-footer"
              style="text-align: center"
            >
              <el-button
                class="save-btn"
                @click="createData"
              >确定</el-button>
              <el-button
                class="cancel-btn"
                @click="cancelFn"
              >取消</el-button>
            </div>
          </el-dialog>
        </el-card>
      </div>
    </div>

  </div>
</template>
<script>
import { pickupTaskList, courierList, dispatchTaskForCourier } from '@/api/branch'
import { getNotNullParams } from '@/utils/index'
import Treeselect from '@riophae/vue-treeselect'
import TabChange from '@/components/TabChange'
import { agencyList } from '@/api/institutions'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    Treeselect,
    TabChange
  },
  props: {
    getNewDisabled: Boolean
  },
  data() {
    return {
      // 表头全选是否禁用
      isTableDisabled: false,
      allNum: 0,
      newNum: 0,
      doneNum: 0,
      cancelNum: 0,
      courierId: '',
      formLabelWidth: '100px',
      multipleSelection: [],
      tableKey: 0,
      dataList: [],
      cityList: [],
      searchkey: false,
      courierOptions: {},
      total: null,
      operationOptions: [
        {
          id: 2,
          name: '已分配'
        },
        {
          id: 3,
          name: '待人工分配'
        }
      ],

      listLoading: true,
      dialogFormVisible: false,
      operationalSearchFormData: {
        page: 1,
        pageSize: 10,
        taskType: 1,
        id: '',
        orderId: '',
        agencyId: '',
        status: 0,
        minEstimatedEndTime: '',
        maxEstimatedEndTime: '',
        minActualEndTime: '',
        maxActualEndTime: '',
        assignedStatus: ''
      },
      actualTime: [],
      estimatedTime: [],
      courierParams: {
        page: 1,
        pageSize: 1000,
        agentId: ''
      },
      titleInfo: {
        pageTitle: '',
        text: ''
      },
      selectedAgencyList: [],
      agencyOptions: [],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
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
    this.getAgencyList()
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
    selectEnable(row) {
      if (row.assignedStatus === 2) {
        return false
      } else {
        return true
      }
    },
    tabChange(val) {
      if (val === this.operationalSearchFormData.status) return
      this.operationalSearchFormData.status = val
      this.getList()
    },
    selectAgency(val) {
      this.operationalSearchFormData.agencyId = val.id
    },
    handleActualTimeChange(val) {
      this.actualTime = val
      this.operationalSearchFormData.minActualEndTime = val[0]
      this.operationalSearchFormData.maxActualEndTime = val[1]
    },
    handleEstimatedTimeChange(val) {
      this.estimatedTime = val
      this.operationalSearchFormData.minEstimatedEndTime = val[0]
      this.operationalSearchFormData.maxEstimatedEndTime = val[1]
    },
    opens() {
      this.$refs.arrows.style.transform = 'rotate(-180deg)'
    },
    closes() {
      this.$refs.arrows.style.transform = 'rotate(0deg)'
    },
    open() {
      this.$refs.arrow.style.transform = 'rotate(-180deg)'
    },
    close() {
      this.$refs.arrow.style.transform = 'rotate(0deg)'
    },
    // 获取起始/目的地机构列表数据
    async getAgencyList() {
      const { data: res } = await agencyList()
      // 获取数据给options
      this.agencyOptions = JSON.parse(res)
      // // // 递归处理树形数据结构并且修改可修改每一项的属性
      // const mapTree = (org) => {
      //   const haveChildren = Array.isArray(org.children) && org.children.length > 0

      //   return {
      //     ...org,
      //     isDisabled: org.name === '昌平沙河镇营业部',
      //     children: haveChildren ? org.children.map(child => mapTree(child)) : null
      //   }
      // }
      // this.agencyOptions = JSON.parse(res).map(org => mapTree(org))
    },
    // 快递员下拉选择
    handleChange(val) {
      this.courierId = val
    },
    // 取消弹框
    cancelFn() {
      this.dialogFormVisible = false
      this.$refs['dataForm'].resetFields()
    },
    // 初始数据
    initialDate() {
      // 读取数据
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map((item) => item.id)
      this.selectedAgencyList = Array.from(new Set(val.map(item => item.agencyId)))
      if (!this.courierParams.agentId) {
        this.getLineList()
      }
      this.courierParams.agentId = this.selectedAgencyList[0]
    },
    // 获取快递员列表数据
    async getLineList() {
      const { data: res } = await courierList(this.courierParams)
      // 获取数据给options
      this.courierOptions = res.items
    },
    // 获取取件任务列表数据
    async getList() {
      this.listLoading = true
      const params = getNotNullParams(this.operationalSearchFormData)
      const { data: res } = await pickupTaskList(params)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 当页全禁用时表头多选也禁用
      this.isTableDisabled = this.dataList.every(item => item.assignedStatus === 2)
      // 获取总条数
      this.total = res.counts
    },
    // 搜索信息
    handleFilter(opt) {
      // this.operationalSearchFormData = {
      //   ...this.operationalSearchFormData,
      //   page: opt === '查询' ? 1 : this.operationalSearchFormData.page
      // }
      this.operationalSearchFormData.page = 1
      const params = getNotNullParams(this.operationalSearchFormData)
      this.getList(params)
      this.searchkey = true
    },
    // 重置
    resetForm(operationalSearchFormData) {
      this.$refs[operationalSearchFormData].resetFields()
      this.operationalSearchFormData.page = 1
      this.operationalSearchFormData.pageSize = 10
      this.operationalSearchFormData.taskType = 1
      this.operationalSearchFormData.id = ''
      this.operationalSearchFormData.orderId = ''
      this.operationalSearchFormData.agencyId = ''
      this.operationalSearchFormData.minEstimatedEndTime = ''
      this.searchkey = false
      this.operationalSearchFormData.maxEstimatedEndTime = ''
      this.operationalSearchFormData.minActualEndTime = ''
      this.operationalSearchFormData.maxActualEndTime = ''
      this.operationalSearchFormData.assignedStatus = ''
      this.actualTime = []
      this.estimatedTime = []
      this.getList()
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
    // 分配快递员
    handleAddCourier() {
      const length = this.multipleSelection.length
      if (length === 0) {
        this.$message({
          message: '选择要分配的作业！',
          type: 'error'
        })
        return
      }
      if (this.selectedAgencyList.length > 1) {
        this.$message({
          message: '请选择一个营业部下面的取件作业！',
          type: 'error'
        })
        return
      }
      this.dialogFormVisible = true
      this.titleInfo.text = '人工分配'
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
    },
    // 表单提交
    async createData() {
      if (!this.courierId) {
        return this.$message.error('请选择快递员')
      }
      this.dialogFormH()
      await dispatchTaskForCourier(
        {
          ids: this.multipleSelection,
          courierId: this.courierId
        }
      ).then((res) => {
        if (String(res.code) === '200') {
          this.$message.success('人工分配成功')
          this.getList(this.operationalSearchFormData)
          this.courierId = ''
          this.multipleSelection = []
          this.selectedAgencyList = []
        }
        this.$refs.multipleTable.clearSelection()
      }).catch((err) => {
        this.courierId = ''
        this.multipleSelection = []
        this.selectedAgencyList = []
        this.$refs.multipleTable.clearSelection()
        this.$message.error(err.msg || '人工分配失败')
      })
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
.el-card {
  border-radius: 0;
  border: none;
  .el-card__header {
    background: #f8faff;
    /* padding: 10px 20px !important; */
    border-bottom: 0px solid #e6ebf5;
  }
}

// 下拉框
/deep/ .el-select {
  width: 100%;
}
</style>

<style lang="scss" scoped>
/deep/ .el-card{
  overflow: initial;
}
/deep/ .vue-treeselect__menu-container{
  z-index: 9999!important;
}
</style>
