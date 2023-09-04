<!-- 运输任务管理 -->
<template>
  <div class="dashboard-container transport-task customer-list-box">
    <div class="app-container">
      <el-card
        shadow="never"
        class="search-card-box"
      >
        <el-form
          ref="taskSearchFormData"
          :model="taskSearchFormData"
          label-width="80px"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                label="任务编号:"
                prop="id"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model="taskSearchFormData.id"
                  clearable
                  placeholder="请输入任务编号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="任务分配状态:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-select
                  v-model="taskSearchFormData.assignedStatus"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in taskDispatchStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="满载状态:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-select
                  v-model="taskSearchFormData.loadingStatus"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in loadingStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="车牌号码:"
                prop="id"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model="taskSearchFormData.licensePlate"
                  clearable
                  placeholder="请输入车牌号码"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="起始地机构:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <treeselect
                  v-model="taskSearchFormData.startAgencyId"
                  :options="agencyOptions"
                  :normalizer="normalizer"
                  :searchable="true"
                  style="width: 100%"
                  placeholder="请选择起始地机构"
                  no-options-text="暂无数据"
                  no-results-text="暂无数据"
                  @select="selectStartAgency"
                  @opens="opens"
                  @closes="closes"
                />
                <img
                  ref="arrows"

                  src="@/assets/pullDown.png"
                  style="position:absolute;width:18px;height:18px;right:9px;top:12px;cursor:pointer;pointer-events:none;transition-duration:0.3s"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="目的地机构:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <treeselect
                  v-model="taskSearchFormData.endAgencyId"
                  :options="agencyOptions"
                  :normalizer="normalizer"
                  :searchable="true"
                  style="width: 100%"
                  placeholder="请选择目的地机构"
                  no-options-text="暂无数据"
                  no-results-text="暂无数据"
                  @select="selectEndAgency"
                  @open="opens"
                  @close="closes"
                />
                <img
                  ref="arrows"

                  src="@/assets/pullDown.png"
                  style="position:absolute;width:18px;height:18px;right:9px;top:12px;cursor:pointer;pointer-events:none;transition-duration:0.3s"
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
                @click="resetForm('taskSearchFormData')"
              >重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <TabChange
        :default-active-index="showStatus"
        :setting-list="[
          {
            value: 0,
            label: '全部',
            num: countAll
          },
          {
            value: 1,
            label: '待提货',
            num: countOne
          },
          {
            value: 2,
            label: '进行中',
            num: countTwo
          },
          {
            value: 4,
            label: '已完成',
            num: countFour
          },
          {
            value: 5,
            label: '已取消',
            num: countFive
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
            <el-table-column
              align="left"
              type="index"
              label="序号"
              width="60"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.$index +
                    (taskSearchFormData.page - 1) * taskSearchFormData.pageSize +
                    1
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="运输任务编号"
              width="180"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="车牌号码"
              width="100"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.truck === null ? '' : scope.row.truck.licensePlate
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="起始地"

              min-width="150"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.startAgency === null
                    ? ''
                    : scope.row.startAgency.name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="目的地"

              min-width="170"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.endAgency === null ? '' : scope.row.endAgency.name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="运输任务状态"
              width="120"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.status == 1">待提货</span>
                <span v-else-if="scope.row.status == 2">进行中</span>
                <span v-else-if="scope.row.status == 3">待确认</span>
                <span v-else-if="scope.row.status == 4">已完成</span>
                <span v-else>已取消</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="车辆装载状态"
              width="120"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.loadingStatus === 1">半载</span>
                <span v-else-if="scope.row.loadingStatus === 2">满载</span>
                <span v-else>空载</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="任务分配状态"
              width="120"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.assignedStatus == '2'">已分配</span>
                <span v-else>待人工分配</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="dfcStatus"
              align="left"
              label="计划发车时间"
              width="160"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.planDepartureTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="dfcStatus"
              align="left"
              label="实际发车时间"
              width="160"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.actualDepartureTime }}</span>
              </template>
            </el-table-column>
            <!-- 待发车 end-->
            <!-- 已到达状态 start-->
            <el-table-column
              v-if="yddStatus"
              align="left"
              label="计划到达时间"
              width="160"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.planArrivalTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="yddStatus"
              align="left"
              label="实际到达时间"
              width="160"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.actualArrivalTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="yddStatus"
              align="left"
              label="计划交付时间"
              width="160"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.planDeliveryTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="yddStatus"
              align="left"
              label="实际交付时间"
              width="160"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.actualDeliveryTime }}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="left"
              label="更新时间"
              prop="updated"
              width="160"
            >
            </el-table-column>
            <!-- 在途状态 end-->
            <!-- 操作按钮 -->
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="180"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleTransportDetail(scope.row.id)"
                >查看</el-link>
                <el-divider direction="vertical" />
                <el-link
                  :disabled="!(scope.row.status === 1 && scope.row.loadingStatus===3)"
                  :type="(scope.row.status === 1 && scope.row.loadingStatus===3)?'danger':'info'"
                  :underline="false"
                  @click="handleTransportCancel(scope.row.id)"
                >取消</el-link>
                <el-divider direction="vertical" />
                <el-link
                  :disabled="!(scope.row.status === 1 )"
                  :type="(scope.row.status===1)?'primary':'info'"
                  :underline="false"
                  @click="handleTransportDispatchCar(scope.row)"
                >手动调整</el-link>
              </template>
            </el-table-column>
            <el-card
              v-show="(!dataList || dataList.length <= 0) && !listLoading && searchkey"
              slot="empty"
              class="table-empty-box"
              shadow="never"
            >
              <empty></empty>
            </el-card>
          </el-table>
          <!-- end -->
          <!-- 搜索为空 -->
          <!-- 分页 -->
          <div class="pagination">
            <div
              v-show="dataList && dataList.length > 0"
              class="pages"
            >
              <el-pagination
                :current-page="Number(taskSearchFormData.page)"
                :total="Number(total)"
                :page-size="Number(taskSearchFormData.pageSize)"
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
            title="手动调整"
            :visible.sync="dialogFormVisible"
            width="600px"
          >
            <el-form
              ref="dataForm"
            >
              <el-form-item
                label="任务编号："
                prop="courierName"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="taskId"
                  readonly=""
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="运单数量："
                prop="courierName"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="transportOrderCount"
                  readonly=""
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="选择车次："
                :label-width="formLabelWidth"
              >
                <el-select
                  v-model="carTripsId"
                  value-key="item.userId"
                  placeholder="请选择"
                  clearable
                  filterable
                  @change="handleChangeLine"
                >
                  <el-option
                    v-for="item in lineList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="选择车辆："
                :label-width="formLabelWidth"
              >
                <el-select
                  v-model="carId"
                  value-key="item.userId"
                  placeholder="请选择"
                  clearable
                  filterable
                  @change="handleChange"
                >
                  <el-option
                    v-for="item in carList"
                    :key="item.id"
                    :label="item.licensePlate"
                    :value="item.id"
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
                type="primary"
                class="save-btn"
                @click="disaptchCar"
              >确定</el-button>
              <el-button
                class="cancel-btn"
                @click="cancelDisFn"
              >取消</el-button>
            </div>
          </el-dialog>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { transportList, transportListCount, cancelTransportTask, dispatchTransportTask } from '@/api/transport'
import {
  tripsList,
  carByTrips
} from '@/api/transit'
import options from '@/api/transporttask.json'
import TabChange from '@/components/TabChange'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'
import { getHMS } from '@/utils/index'
import { agencyList } from '@/api/institutions'
export default {
  components: {
    Treeselect,
    TabChange
  },
  data() {
    return {
      formLabelWidth: '100px',
      dialogFormVisible: false,
      agencyOptions: [],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },
      taskDispatchStatus: [
        {
          id: 2,
          name: '已分配'
        },
        {
          id: 3,
          name: '待人工分配'
        }
      ],
      countAll: '', // 全部
      countOne: '', // 未分配
      countTwo: '', // 已分配
      countThree: '', // 进行中
      countFour: '', // 已完成
      countFive: '', // 超时
      showLoadingStatus: true,
      yddStatus: false,
      dfcStatus: true,
      ztStatus: false,
      showStatus: '',
      transportTaskStatus: '',
      transportTaskOptions: '',
      multipleSelection: [],
      tableKey: 0,
      dataList: [],
      total: null,
      listLoading: true,
      searchkey: false,
      taskSearchFormData: {
        page: 1,
        pageSize: 10,
        id: '',
        status: '',
        assignedStatus: '', // 任务分配状态
        loadingStatus: '', // 满载状态
        licensePlate: '', // 车牌号码
        startAgencyId: null, // 起始地机构
        endAgencyId: null// 目的地机构
      },
      taskId: '',
      carId: '',
      carTripsId: '', // 车次id
      transportLineId: '', // 运输任务id
      transportOrderCount: '', // 运输任务数量
      lineList: '', // 车次列表
      loadingStatus: [
        // {
        //   id: 1,
        //   name: '半载'
        // },
        {
          id: 2,
          name: '满载'
        },
        {
          id: 3,
          name: '空载'
        }
      ],
      carList: []
    }
  },
  // 创建完毕状态
  created() {
    this.transportTaskOptions = options
    this.taskSearchFormData.status = Number(this.$route.query.status)
    this.showStatus = this.taskSearchFormData.status
    var _this = this
    this.initialDate()
    this.getAgencyList()
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.taskSearchFormData)
      }
    }
  },
  methods: {
    handleChangeLine(val) {
      this.carTripsId = val
      this.getUseCar(this.carTripsId)
    },
    handleChange(val) {
      this.carId = val
    },
    // 获取已启用并且为绑定过车次的车辆
    getUseCar(id) {
      carByTrips({ transportTripsId: id }).then((res) => {
        this.carList = res.data
      })
    },
    cancelDisFn() {
      this.$refs['dataForm'].resetFields()
      this.dialogFormVisible = false
      this.taskId = ''
      this.carId = ''
      this.transportLineId = ''
      this.carTripsId = ''
      this.carList = []
    },
    // 获取运输任务下线路下的车次
    async getLine(id) {
      const { data: res } = await tripsList({ transportLineId: id })
      this.lineList = res
    },
    // 给运输任务分配车辆
    handleTransportDispatchCar(row) {
      this.dialogFormVisible = true
      this.taskId = row.id
      this.transportOrderCount = row.transportOrderCount
      this.transportLineId = row.transportLineId
      this.getLine(this.transportLineId)
    },
    disaptchCar() {
      if (!this.carId) {
        return this.$message.error('请选择分配车辆')
      }
      this.dialogFormVisible = false

      dispatchTransportTask(
        {
          id: this.taskId,
          truckId: this.carId,
          transportTripsId: this.carTripsId
        }
      ).then((res) => {
        if (String(res.code) === '200') {
          this.$message.success('手动调整成功')
          this.initialDate()
          this.taskId = ''
          this.carId = ''
          this.transportLineId = ''
          this.carTripsId = ''
          this.carList = []
        }
      }).catch((err) => {
        this.taskId = ''
        this.carId = ''
        this.transportLineId = ''
        this.carTripsId = ''
        this.carList = []
        this.$message.error(err.msg || '手动调整失败')
      })
    },
    // 取消运输任务
    handleTransportCancel(id) {
      this.$confirm(
        `删除确认`,
        {
          title: '删除确认',
          message: '确认取消此运输任务吗？',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'cancelTransportTask'
        },
      )
        .then(() => {
          cancelTransportTask(id).then((res) => {
            if (res.code === 200) {
              this.$message.success('运输任务取消成功')
            } else {
              this.$message.error(res.msg || '运输任务取消失败')
            }
            this.initialDate()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    opens() {
      this.$refs.arrows.style.transform = 'rotate(-180deg)'
    },
    closes() {
      this.$refs.arrows.style.transform = 'rotate(0deg)'
    },
    // 获取起始/目的地机构列表数据
    async getAgencyList() {
      const { data: res } = await agencyList()
      // 获取数据给options
      this.agencyOptions = JSON.parse(res)
    },
    selectStartAgency(val) {
      this.taskSearchFormData.startAgencyId = val.id
    },
    selectEndAgency(val) {
      this.taskSearchFormData.endAgencyId = val.id
    },
    // 初始数据
    initialDate() {
      // 读取数据
      this.getUseCar()
      this.getTransportTask()
      this.getList()
    },
    // 获取运输任务列表
    selectGet(vId) {
      let obj = {}
      obj = this.options.find((item) => {
        return item.name === vId
      })
      if (vId === '') {
        this.requestParametersLike.transportTaskStatus = ''
      } else {
        this.transportTaskStatus = obj.name
        this.requestParametersLike.transportTaskStatus = obj.id
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 查看运输任务详情
    handleTransportDetail(id) {
      this.$router.push({
        path: '/transport/task-detail',
        query: { id: id, type: '运输管理' }
      })
    },
    // 状态变更
    tabChange(activeIndex) {
      this.taskSearchFormData.status = activeIndex
      this.getList()
    },
    // 获取运输任务统计
    async getTransportTask() {
      const { data: res } = await transportListCount()
      this.countOne = res[1] || 0
      this.countTwo = res[2] || 0
      this.countThree = res[3] || 0
      this.countFour = res[4] || 0
      this.countFive = res[5] || 0
      this.countAll =
        Number(this.countOne) +
        Number(this.countTwo) +
        Number(this.countThree) +
        Number(this.countFour) +
        Number(this.countFive)
    },

    // 获取运输列表数据
    async getList() {
      // var _this = this
      this.listLoading = true
      const params = { ...this.taskSearchFormData }
      params.planDeliveryTime = this.taskSearchFormData.planDeliveryTime
        ? getHMS(this.taskSearchFormData.planDeliveryTime)
        : ''
      if (params.status === 0) {
        delete params.status
      }
      const { data: res } = await transportList(params)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 已到达状态
      if (this.showStatus === 4) {
        this.showLoadingStatus = false
        this.dfcStatus = false
        this.yddStatus = true
        this.ztStatus = false
        // 待发车状态
      } else if (this.showStatus === 1) {
        this.showLoadingStatus = false
        this.dfcStatus = true
        this.ztStatus = false
        this.yddStatus = false
        // 在途状态
      } else if (this.showStatus === 2) {
        this.showLoadingStatus = false
        this.ztStatus = true
        this.dfcStatus = false
        this.yddStatus = false
      }
      // 获取总条数
      this.total = res.counts
    },
    // 重置
    resetForm(taskSearchFormData) {
      // this.$refs[taskSearchFormData].resetFields()
      this.searchkey = false
      this.taskSearchFormData = {
        page: 1,
        pageSize: 10,
        status: this.taskSearchFormData.status,
        id: ''
      }
      this.getList()
    },
    // 搜索信息
    handleFilter() {
      this.showStatus = this.taskSearchFormData.status
      this.taskSearchFormData.page = 1
      this.getList(this.taskSearchFormData)
      this.searchkey = true
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.taskSearchFormData.pageSize = val
      if (this.taskSearchFormData.page === 1) {
        this.getList(this.taskSearchFormData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.taskSearchFormData.page = val
      this.getList()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 40px;
}
.transport-task /deep/ .el-table td,
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

/deep/ .el-dialog__body{
  padding-left: 40px!important;
}

// 下拉框
/deep/ .el-select {
  width: 100%;
}

/*定义滚动条轨道 内阴影+圆角*/
/deep/ .el-table--scrollable-x .el-table__body-wrapper {
  padding-bottom: 5px;
  margin-bottom: 5px;
  &::-webkit-scrollbar {
    height: 10px;
  }

  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(144, 147, 153, 0.3);
  }

  &::-webkit-scrollbar-track-piece {
    margin-right: 3px;
    margin-left: 3px;
  }
}
/deep/ .el-card{
  overflow: initial;
}
</style>
