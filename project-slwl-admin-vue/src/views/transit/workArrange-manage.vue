<!-- 排班管理 -->
<template>
  <div class="dashboard-container transport-task customer-list-box">
    <div class="app-container">
      <el-card
        shadow="never"
        class="search-card-box"
      >
        <el-form
          ref="formData"
          :model="formData"
          label-width="80px"
        >
          <!-- <div class="filter-container"> -->
          <!-- 按照员工名称进行查找 -->
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                label="员工账号:"
                prop="employeeNumber"
                style="margin-bottom: 20px"
              >
                <el-input
                  v-model="formData.employeeNumber"
                  clearable
                  placeholder="请输入员工账号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="员工姓名:"
                prop="name"
                style="margin-bottom: 20px"
              >
                <el-input
                  v-model="formData.name"
                  clearable
                  placeholder="请输入员工姓名"
                />
              </el-form-item>
            </el-col>
            <!-- 按照工作模式进行查找 -->
            <el-col :span="8">
              <el-form-item
                label="工作模式："
                prop="workPatternId"
                style="margin-bottom: 20px"
              >
                <el-select
                  v-model="formData.workPatternId"
                  placeholder="请选择工作模式"
                >
                  <el-option
                    v-for="item in workManageList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option> </el-select></el-form-item>
            </el-col>
            <!-- 按照月份进行查找，且仅可查最近三个月 -->
            <el-col :span="8">
              <el-form-item
                label="月份："
                prop="month"
                style="margin-bottom: 20px"
              >
                <el-date-picker
                  v-model="formData.month"
                  type="month"
                  placeholder="请选择月份"
                  value-format="yyyy-MM"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="agencyId"
                label="所属机构:"
                style="margin-bottom: 0px"
              >
                <treeselect
                  v-model="formData.agencyId"
                  :options="agencyOptions"
                  :normalizer="normalizer"
                  :searchable="true"
                  style="width: 100%"
                  placeholder="请选择所属机构"
                  no-options-text="暂无数据"
                  no-results-text="暂无数据"
                  @open="open"
                  @close="close"
                />
                <img
                  ref="arrow"
                  src="../../assets/pullDown.png"
                  style="position:absolute;width:18px;height:18px;right:9px;top:12px;cursor:pointer;pointer-events:none;transition-duration:0.3s"
                />
              </el-form-item>
            </el-col>
            <!-- 搜索功能 -->
            <el-col :span="8">
              <el-button
                type="warning"
                style="margin: top 20px;"
                @click="handleFilter"
              >搜索</el-button>
              <el-button
                plain
                class="reset-btn"
                @click="resetForm('formData')"
              >重置</el-button>
            </el-col>
          </el-row>
          <!-- </div> -->
        </el-form>
      </el-card>
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
            type="warning"
            style="margin-bottom: 20px;"
            @click="toWorkArrangeSetting"
          >排班设置</el-button>
          <el-button
            type="warning"
            plain
            style="margin-bottom: 20px"
            @click="openPeopleSettingModal"
          >绑定排班</el-button>
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
              type="selection"
              width="60"
              fixed
            />

            <el-table-column
              align="left"
              label="员工账号"
              width="100"
              fixed

              prop="employeeNumber"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="员工姓名"
              width="120"
              fixed
              prop="name"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="员工电话"
              width="120"
              fixed
              prop="phone"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="员工角色"
              min-width="100"
              fixed
              prop="userType"
            >
              <template slot-scope="scope">
                <span>
                  {{
                    scope.row.userType === 1
                      ? '员工'
                      : scope.row.userType === 2
                        ? '快递员'
                        : '司机'
                  }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="当前工作模式"
              fixed
              width="110"
              prop="workPatternName"
            >
              <template slot-scope="scope">
                <span>
                  {{ scope.row.workPatternName?scope.row.workPatternName:'暂无排班' }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in dataList.length
                ? dataList[0].workSchedules
                : []"
              :key="item.index"
              class-name="date"
              :label="String(index + 1)"
            >
              <template slot-scope="scope">
                <div
                  :class="{
                    work: scope.row.workSchedules[index],
                    rest: !scope.row.workSchedules[index]
                  }"
                >
                  {{ scope.row.workPatternName?scope.row.workSchedules[index] ? '上' : '休': '无' }}
                </div>
              </template>
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
                :current-page="Number(formData.page)"
                :total="Number(total)"
                :page-size="Number(formData.pageSize)"
                :page-sizes="[10, 20, 30, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
          <!-- end -->
        </el-card>

      </div>
    </div>
    <el-dialog
      title="人工调整"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="566px"
      height="300px"
      class="workArrange-manage-people-setting"
    >
      <el-form label-width="120px">
        <el-form-item class="work-type">
          <el-radio
            v-model="workPatternType"
            label="1"
            @change="handleWorkType"
          >礼拜制</el-radio>
          <el-radio
            v-model="workPatternType"
            label="2"
            @change="handleWorkType"
          >连续制</el-radio>
        </el-form-item>
        <el-form-item
          label="模式名称:"
          prop="workPatternId"
        >
          <el-select
            v-model="workHistoryId"
            placeholder="请选择"
            class="history-name"
            @change="handleSelect"
          >
            <el-option
              v-for="item in workPatternType==='1'?dialogWorkManageWeekList:dialogWorkManageContinuousList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        style="text-align: center"
      >
        <el-button
          type="warning"
          class="save-btn"
          @click="confirm"
        >确认</el-button>
        <el-button
          plain
          class="cancel-btn"
          @click="handleClose"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  selectWorkHistoryList,
  workManage,
  peopleSet
} from '@/api/transit'
import { agencyList } from '@/api/institutions'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import options from '@/api/transporttask.json'

export default {
  components: { Treeselect },
  data() {
    return {
      workType: '1',
      dialogVisible: false,
      yddStatus: false,
      dfcStatus: true,
      ztStatus: false,
      showStatus: '',
      transportTaskStatus: '',
      transportTaskOptions: '',
      multipleSelection: [],
      tableKey: 0,
      dataList: [],
      searchkey: false,
      total: null,
      listLoading: false,
      formData: {
        page: 1,
        pageSize: 10,
        workPatternId: '',
        name: '',
        employeeNumber: ''
      },
      workManageList: [],
      dialogWorkManageWeekList: [],
      dialogWorkManageContinuousList: [],
      workPatternType: '1',
      workHistoryId: '',
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
  // 创建完毕状态
  created() {
    this.showStatus = this.formData.status
    this.transportTaskOptions = options
    var _this = this
    this.initialDate()
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.formData)
      }
    }
  },
  // 组件更新
  updated: function () {},
  methods: {
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
    },
    // 跳转至排班设置页面
    toWorkArrangeSetting() {
      this.$router.push('workArrange-setting')
    },
    handleClose() {
      this.dialogVisible = false
      this.workPatternType = '1'
      this.getWorkManageList(this.workPatternType)
      this.workHistoryId = ''
    },
    handleSelect(val) {
      this.workHistoryId = val
    },
    // 人工调整确认
    async confirm() {
      if (!this.workHistoryId) {
        return this.$message.error('请选择模式名称')
      }
      await peopleSet({
        workPatternId: this.workHistoryId,
        userIdList: this.multipleSelection,
        workPatternType: this.workPatternType
      }).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          })
          this.handleClose()
          this.getList()
          this.workPatternType = '1'
          this.getWorkManageList(this.workPatternType)
        } else {
          this.$message({
            message: res.msg || '操作失败',
            type: 'error'
          })
        }
      })
    },
    // 打开人工调整弹窗
    openPeopleSettingModal() {
      if (!this.multipleSelection.length) {
        return this.$message({
          message: '请选择调整人员',
          type: 'error'
        })
      }

      this.dialogVisible = true
    },
    // 初始数据
    initialDate() {
      // 读取数据
      this.getList()
      this.getWorkManageList()
      this.getWorkManageList('1')
      this.getAgencyList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map((item) => item.id)
    },
    // 查看运输任务详情
    handleTransportDetail(id) {
      // eslint-disable-next-line object-curly-spacing
      this.$router.push({
        path: '/transport/task-detail',
        query: { id: id, type: '运输管理' }
      })
    },

    // 获取排班管理列表数据
    async getList() {
      this.listLoading = true
      const params = this.formData
      if (params.status === 0) {
        delete params.status
      }
      const { data: res } = await workManage(params)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items || []
      // 获取总条数
      this.total = res.counts
    },
    // 获取排班设置列表数据
    async getWorkManageList(val) {
      const { data: res } = await selectWorkHistoryList()
      this.workManageList = [
        ...(res[1] ? res[1] : []),
        ...(res[2] ? res[2] : [])
      ].concat([{ id: '0', name: '暂无排班' }])
      if (val === '1') {
        this.dialogWorkManageWeekList = [...(res[1] ? res[1] : [])]
      } else {
        this.dialogWorkManageContinuousList = [...(res[2] ? res[2] : [])]
      }
    },
    // 更改为选中的内容
    handleWorkType(val) {
      this.workPatternType = val
    },
    // 重置
    resetForm(formData) {
      this.$refs[formData].resetFields()
      this.searchkey = false
      this.getList()
    },
    // 搜索信息
    handleFilter() {
      this.showStatus = this.formData.status
      this.formData.page = 1
      this.searchkey = true
      this.getList(this.formData)
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.formData.pageSize = val
      if (this.formData.page === 1) {
        this.getList(this.formData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.formData.page = val
      this.getList()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ th.date{
  .cell{
    padding-left: 17px!important;
  }
}
.work {
  width: 24px;
  height: 24px;
  background: #ffeeeb;
  border: 1px solid #e15536;
  border-radius: 50%;
  text-align: center;
  color: #e15536;
  font-size: 13px;
}
.history-name {
  width: auto !important;
  /deep/ .el-input__inner {
    width: 293px;
  }
}

.workArrange-manage-people-setting {
  /deep/ .el-dialog__body {
    padding: 30px 50px 10px 50px !important;
  }
  /deep/ .el-dialog__footer {
    padding-bottom: 40px;
  }
}

.work-type {
  /deep/ .el-form-item__content {
    margin-left: 40px !important;
  }
  /deep/ .el-radio:first-child {
    margin-right: 80px !important;
  }
  /deep/.el-radio__label {
    font-weight: bold;
    color: #333333;
  }
}

.dialog-footer {
  .el-button {
    width: 89px;
    height: 36px;
    padding: 10px 20px;
  }
}

.rest {
  width: 24px;
  height: 24px;
  background: #eff3f8;
  border: 1px solid #d8dde3;
  border-radius: 50%;
  text-align: center;
  color: #20232a;
  font-size: 13px;
}

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

<style></style>
