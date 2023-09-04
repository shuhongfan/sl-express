<!-- 排班设置页 -->
<template>
  <div class="dashboard-container waybill-list customer-list-box">
    <div class="app-container">
      <div
        v-loading="listLoading"
        :class="{ 'loading-box': listLoading }"
        element-loading-text="加载中"
      >
        <el-card
          shadow="never"
          class="table-card-box"
        >
          <el-button
            style="padding: 9px 0px; margin-bottom: 20px; width: 120px"
            type="warning"
            @click="handleAddModels()"
          >添加工作模式</el-button>
          <el-table
            :key="tableKey"
            ref="multipleTable"
            :data="dataList"
            fit
            style="width: 100%; margin-bottom: 30px"
            stripe
            :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
          >
            <el-table-column
              align="left"
              label="工作模式编号"
              min-width="140"
              prop="id"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="工作模式"
              min-width="140"
              prop="name"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="类型"
              min-width="140"
              prop="workPatternTypeDesc"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="工作日期"
              min-width="140"
              prop="workDate"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="工作时间"
              min-width="160"
            >
              <template slot-scope="scope">
                <span>{{
                  (
                    (scope.row.workEndMinute1 - scope.row.workStartMinute1) /
                    60
                  ).toFixed(2)
                }}小时</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="165"
              class-name="small-padding fixed-width waybillDispatch"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleEdit(scope.row)"
                >编辑</el-link>
                <el-divider direction="vertical" />
                <el-link
                  type="danger"
                  :underline="false"
                  @click="handleDelete(scope.row.id)"
                >删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div
            v-show="dataList && dataList.length > 0"
            class="pagination"
          >
            <div class="pages">
              <el-pagination
                :current-page="Number(waybillSearchFormData.page)"
                :total="Number(total)"
                :page-size="Number(waybillSearchFormData.pageSize)"
                :page-sizes="[10, 20, 30, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </el-card>
        <el-dialog
          :title="type === 'add' ? '新增工作模式' : '编辑工作模式'"
          :visible.sync="dialogVisible"
          width="700px"
          :before-close="handleClose"
          class="add-form-dialog"
        >
          <el-tabs
            v-model="workPatternType"
            class="tab-box"
            @tab-click="handleClick"
          >
            <el-tab-pane
              v-if="
                (this.workPatternType === '1' && this.type === 'edit') ||
                  this.type === 'add'
              "
              label="礼拜制"
              name="1"
            >
              <el-form
                ref="dataForm"
                :rules="ruleInline"
                :model="weekParams"
                label-position="right"
                label-width="130px"
                style="width: 100%"
              >
                <el-form-item
                  label="工作模式名称："
                  prop="name"
                  style="margin-bottom: 0px"
                >
                  <el-input
                    v-model="weekParams.name"
                    placeholder="请填写工作模式名称"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="连续工作天数："
                  prop="workDay"
                  style="margin-bottom: 0px"
                  class="workDay"
                ><el-checkbox-group
                  v-model="weekParams.workDay"
                  @change="handleCheckedChange"
                >
                  <el-checkbox
                    v-for="day in weekList"
                    :key="day"
                    :label="day"
                  >{{ day }}</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <div class="tips">选中为工作时间，未选中为休息时间</div>
                <el-form-item
                  label="工作时间："
                  prop="dateRange"
                >
                  <el-time-picker
                    v-model="weekParams.dateRange"
                    is-range
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="HH:mm"
                    :editable="false"
                    @change="handleDate"
                  >
                  </el-time-picker> </el-form-item></el-form>
            </el-tab-pane>
            <el-tab-pane
              v-if="
                (this.workPatternType === '2' && this.type === 'edit') ||
                  this.type === 'add'
              "
              label="连续制"
              name="2"
            >
              <el-form
                ref="dataForm1"
                :rules="ruleInline2"
                :model="continuousParams"
                label-position="right"
                label-width="130px"
                style="width: 100%"
              >
                <el-form-item
                  label="工作模式名称："
                  prop="name"
                  style="margin-bottom: 15px"
                >
                  <el-input
                    v-model="continuousParams.name"
                    placeholder="请填写工作模式名称"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="连续工作天数："
                  prop="workDay2"
                  style="margin-bottom: 15px"
                >
                  上
                  <el-input
                    v-model="continuousParams.workDayNum"
                    placeholder="请输入"
                    style="width: 110px; margin-right: 21px; margin-left: 10px"
                  >
                    <span
                      slot="suffix"
                      style="
                        color: #20232a;
                        font-weight: 400;
                        font-size: 14px;
                        font-family: PingFangSC, PingFangSC-Regular;
                        margin-right: 14px;
                      "
                    >天</span></el-input>
                  休
                  <el-input
                    v-model="continuousParams.restDayNum"
                    placeholder="请输入"
                    style="width: 110px; margin-left: 10px"
                  >
                    <span
                      slot="suffix"
                      style="
                        color: #20232a;
                        font-weight: 400;
                        font-size: 14px;
                        font-family: PingFangSC, PingFangSC-Regular;
                        margin-right: 14px;
                      "
                    >天</span></el-input>
                </el-form-item>
                <el-form-item
                  label="工作时间："
                  prop="dateRange2"
                >
                  <el-time-picker
                    v-model="continuousParams.dateRange"
                    is-range
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="HH:mm"
                    :editable="false"
                    @change="handleDate"
                  >
                  </el-time-picker>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <div
            slot="footer"
            class="dialog-footer"
            style="text-align: center"
          >
            <el-button
              class="save-btn"
              @click="confirm"
            >确认</el-button>
            <el-button
              class="cancel-btn"
              @click="handleClose"
            >取消</el-button>
          </div>
        </el-dialog>
        <el-card
          v-show="(!dataList || dataList.length <= 0) && !listLoading"
          class="table-empty-box"
          shadow="never"
        >
          <empty></empty>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addWorkHistory,
  updateWorkHistory,
  workHistoryList,
  workHistoryInfo,
  deleteWorkHistory
} from '@/api/transit'

import { getHMS } from '@/utils/index'
export default {
  data() {
    return {
      id: '', // 工作模式ID
      workPatternType: '1',
      // 礼拜制
      weekParams: {
        name: '', // 工作模式名称
        workEndMinute1: new Date(2016, 9, 10, 18, 0).getTime(), // 工作结束时间,2016年9月10号18点至此刻的毫秒数
        workStartMinute1: new Date(2016, 9, 10, 9, 0).getTime(), // 工作开始时间，2016年9月10号9点至此刻的毫秒数
        workPatternType: '', // 工作类型
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
        dateRange: [
          new Date(2016, 9, 10, 9, 0).getTime(),
          new Date(2016, 9, 10, 18, 0).getTime()
        ],
        workDay: []
      },
      // 连续制
      continuousParams: {
        name: '',
        workPatternType: '',
        workEndMinute1: new Date(2016, 9, 10, 18, 0).getTime(),
        workStartMinute1: new Date(2016, 9, 10, 9, 0).getTime(),
        restDayNum: '', // 休息天数
        workDayNum: '', // 上班天数
        dateRange: [
          new Date(2016, 9, 10, 9, 0).getTime(),
          new Date(2016, 9, 10, 18, 0).getTime()
        ]
      },
      checkedDay: [],
      weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      type: 'add',
      waybillSearchFormData: {
        page: 1,
        pageSize: 10
      },
      ruleInline2: {
        dateRange2: [
          {
            required: true,
            validator: this.validateDateRange2,
            trigger: 'blur'
          }
        ],
        workDay2: [
          { required: true, validator: this.validateWorkDay2, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '工作模式名称不能为空', trigger: 'blur' }
        ]
      },
      ruleInline: {
        dateRange: [
          {
            required: true,
            validator: this.validateDateRange,
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '工作模式名称不能为空', trigger: 'blur' }
        ],
        workDay: [
          { required: true, validator: this.validateWorkDay, trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      tableKey: 0,
      dataList: [
        {
          name: '上五休一',
          workDate: '2017.10.19 ',
          workPatternTypeDesc: '礼拜制度',
          workType: 1
        }
      ],
      formBase: {
        id: '',
        templateType: '',
        transportType: '',
        associatedCityList: [1],
        firstWeight: '',
        continuousWeight: '',
        lightThrowingCoefficient: ''
      },
      listLoading: false,
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    dealWithParams(type, workPatternType) {
      if (workPatternType === '1') {
        return {
          name: this.weekParams.name,
          workEndMinute1:
            // 此处需要将时间转为距离当天0点0分的分钟数的差值
            (this.weekParams.workEndMinute1 -
              new Date(2016, 9, 10, 0, 0).getTime()) /
            1000 /
            60,
          workStartMinute1:
            (this.weekParams.workStartMinute1 -
              new Date(2016, 9, 10, 0, 0).getTime()) /
            1000 /
            60,
          workPatternType: this.workPatternType,
          monday:
            this.weekParams.workDay.findIndex((item) => item === '周一') === -1
              ? 2
              : 1,
          tuesday:
            this.weekParams.workDay.findIndex((item) => item === '周二') === -1
              ? 2
              : 1,
          wednesday:
            this.weekParams.workDay.findIndex((item) => item === '周三') === -1
              ? 2
              : 1,
          thursday:
            this.weekParams.workDay.findIndex((item) => item === '周四') === -1
              ? 2
              : 1,
          friday:
            this.weekParams.workDay.findIndex((item) => item === '周五') === -1
              ? 2
              : 1,
          saturday:
            this.weekParams.workDay.findIndex((item) => item === '周六') === -1
              ? 2
              : 1,
          sunday:
            this.weekParams.workDay.findIndex((item) => item === '周日') === -1
              ? 2
              : 1
        }
      } else {
        return {
          name: this.continuousParams.name,
          workPatternType: this.workPatternType,
          workEndMinute1:
            (this.continuousParams.workEndMinute1 -
              new Date(2016, 9, 10, 0, 0).getTime()) /
            1000 /
            60,
          workStartMinute1:
            (this.continuousParams.workStartMinute1 -
              new Date(2016, 9, 10, 0, 0).getTime()) /
            1000 /
            60,
          restDayNum: this.continuousParams.restDayNum,
          workDayNum: this.continuousParams.workDayNum
        }
      }
    },
    handleDate(value) {
      if (this.workPatternType === '1') {
        this.weekParams.dateRange = value
          ? [value[0].getTime(), value[1].getTime()]
          : []
        this.weekParams.workStartMinute1 = value[0].getTime()
        this.weekParams.workEndMinute1 = value[1].getTime()
      } else {
        this.continuousParams.dateRange = value
          ? [getHMS(value[0]), getHMS(value[1])]
          : []
        this.continuousParams.workStartMinute1 = value[0].getTime()
        this.continuousParams.workEndMinute1 = value[1].getTime()
      }
    },
    validateDateRange2(rule, value, callback) {
      if (!this.continuousParams.dateRange.length) {
        callback()
      } else {
        callback()
      }
    },
    validateDateRange(rule, value, callback) {
      if (!this.weekParams.dateRange.length) {
        callback()
      } else {
        callback()
      }
    },
    validateWorkDay2(rule, value, callback) {
      if (
        this.continuousParams.restDayNum === '' ||
        this.continuousParams.workDayNum === ''
      ) {
        callback(new Error('请填写连续工作天数'))
      } else {
        callback()
      }
    },
    validateWorkDay(rule, value, callback) {
      if (!this.weekParams.workDay.length) {
        callback(new Error('请选择连续工作天数'))
      } else {
        callback()
      }
    },
    confirm() {
      this.$refs[
        this.workPatternType === '1' ? 'dataForm' : 'dataForm1'
      ].validate(async (valid) => {
        if (valid) {
          const params = this.dealWithParams(this.type, this.workPatternType)
          await (this.type === 'add'
            ? addWorkHistory(params)
            : updateWorkHistory(Object.assign(params, { id: this.id }))
          ).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: '操作成功！',
                type: 'success'
              })
              this.getList()
              this.handleClose()
            } else {
              this.$message({
                message: res.msg || '操作失败！',
                type: 'error'
              })
            }
          })
        } else {
          this.$message.error('*号为必填项!')
        }
      })
    },
    handleClick(tab, event) {
      this.workPatternType = tab.name
    },
    // 连续工作天数选择
    handleCheckedChange(value) {
      this.weekParams.workDay = value
    },
    // 删除工作模式
    handleDelete(id) {
      this.$confirm('确定要删除吗?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteWorkHistory(id).then((res) => {
            if (String(res.code) === '200') {
              this.$message.success('删除成功')
              this.getList()
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
    },
    // 新增模板
    handleAddModels() {
      this.dialogVisible = true
      this.type = 'add'
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false

      // 处理关闭一瞬间表单重置问题
      setTimeout(() => {
        this.workPatternType = '1'
        this.$nextTick(() => {
          if (this.workPatternType === '1') {
            this.$refs.dataForm.resetFields()
          } else {
            this.$refs.dataForm1.resetFields()
          }
        })
      }, 200)
    },
    // 编辑工作模式
    async handleEdit(row) {
      this.dialogVisible = true
      this.type = 'edit'
      const { data: res } = await workHistoryInfo(row.id)

      this.workPatternType = String(res.workPatternType)
      this.id = res.id

      if (res.workPatternType === 1) {
        this.weekParams = {
          name: res.name,
          dateRange: [
            new Date(2016, 9, 10, 0, 0).getTime() +
              res.workStartMinute1 * 60 * 1000,
            new Date(2016, 9, 10, 0, 0).getTime() +
              res.workEndMinute1 * 60 * 1000
          ],
          workPatternType: res.workPatternType,
          workEndMinute1:
            new Date(2016, 9, 10, 0, 0).getTime() +
            res.workEndMinute1 * 60 * 1000,
          workStartMinute1:
            new Date(2016, 9, 10, 0, 0).getTime() +
            res.workStartMinute1 * 60 * 1000,
          monday: res.monday,
          tuesday: res.tuesday,
          wednesday: res.wednesday,
          thursday: res.thursday,
          friday: res.friday,
          saturday: res.saturday,
          sunday: res.sunday,
          workDay: [
            res.monday === 1 ? '周一' : '',
            res.tuesday === 1 ? '周二' : '',
            res.wednesday === 1 ? '周三' : '',
            res.thursday === 1 ? '周四' : '',
            res.friday === 1 ? '周五' : '',
            res.saturday === 1 ? '周六' : '',
            res.sunday === 1 ? '周日' : ''
          ]
        }
      } else {
        this.continuousParams = {
          name: res.name,
          workPatternType: res.workPatternType,
          workEndMinute1:
            new Date(2016, 9, 10, 0, 0).getTime() +
            res.workEndMinute1 * 60 * 1000,
          workStartMinute1:
            new Date(2016, 9, 10, 0, 0).getTime() +
            res.workStartMinute1 * 60 * 1000,
          restDayNum: res.restDayNum,
          workDayNum: res.workDayNum,
          dateRange: [
            new Date(2016, 9, 10, 0, 0).getTime() +
              res.workStartMinute1 * 60 * 1000,
            new Date(2016, 9, 10, 0, 0).getTime() +
              res.workEndMinute1 * 60 * 1000
          ]
        }
      }
    },
    async getList() {
      this.listLoading = true
      const { data: res } = await workHistoryList(this.waybillSearchFormData)

      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.waybillSearchFormData.pageSize = val
      if (this.waybillSearchFormData.page === 1) {
        this.getList(this.waybillSearchFormData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.waybillSearchFormData.page = val
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .table-card-box {
  .el-card__body {
    padding-bottom: 0px;
  }
}
/deep/ .pagination{
  padding-bottom: 30px;
}
.tab-box {
  color: #20232a;
  /deep/ .el-tabs__item.is-active {
    color: #20232a;
    font-size: 16px;
    font-weight: bold;
  }
  /deep/ .el-form-item__content {
    height: 40px;
  }
  /deep/ .el-tabs__item {
    font-size: 14px;
  }
  /deep/ .el-tabs__item:hover {
    color: #20232a;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  /deep/ .el-tabs__active-bar {
    background-color: #e15536;
  }
  /deep/ .tips {
    margin-left: 130px;
    margin-bottom: 14px;
    color: #bac0cd;
  }
  .el-checkbox {
    margin-right: 12px;
  }
  /deep/ .workDay {
    .el-form-item__error {
      position: relative;
    }
  }
}
/deep/ .el-dialog__body {
  padding-top: 30px !important;
  .el-tabs__header {
    padding-bottom: 25px;
  }
}
/deep/ .el-tabs__nav,
.is-top {
  transform: translateX(30px) !important;
}
</style>
