<!-- 回车登记 -->
<template>
  <div
    class="dashboard-container dispatch-task customer-list-box"
    style="width: 100%"
  >
    <div class="app-container">
      <el-card
        class="search-card-box"
        shadow="never"
      >
        <el-form
          ref="operationalSearchFormData"
          :model="operationalSearchFormData"
          label-width="80px"
        >
          <div class="filter-container">
            <el-row :gutter="60">
              <el-col :span="8">
                <el-form-item
                  label="运输任务编号:"
                  style="margin-bottom: 0px"
                  label-width="110px"
                >
                  <el-input
                    v-model="operationalSearchFormData.transportTaskId"
                    placeholder="请输入运输任务编号"
                    clearable
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
                    v-model="operationalSearchFormData.startAgencyId"
                    :options="agencyOptions"
                    :normalizer="normalizer"
                    :searchable="true"
                    style="width: 100%"
                    placeholder="请选择起始地机构"
                    no-options-text="暂无数据"
                    no-results-text="暂无数据"
                    @select="selectStartAgency"
                    @open="open"
                    @close="close"
                  />
                  <img
                    ref="arrow"
                    src="@/assets/pullDown.png"
                    style="
                      position: absolute;
                      width: 18px;
                      height: 18px;
                      right: 9px;
                      top: 12px;
                      cursor: pointer;
                      pointer-events: none;
                      transition-duration: 0.3s;
                    "
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
                    v-model="operationalSearchFormData.endAgencyId"
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
                    style="
                      position: absolute;
                      width: 18px;
                      height: 18px;
                      right: 9px;
                      top: 12px;
                      cursor: pointer;
                      pointer-events: none;
                      transition-duration: 0.3s;
                    "
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="回车时间:"
                  style="margin-bottom: 20px"
                  label-width="110px"
                >
                  <el-date-picker
                    v-model="intoStorage"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    placeholder="选择回车时间"
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
                  label="车辆是否可用:"
                  style="margin-bottom: 20px"
                  label-width="110px"
                >
                  <el-select
                    v-model="operationalSearchFormData.isAvailable"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in carStatus"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-button
                  type="warning"
                  @click="handleFilter('查询')"
                >搜索</el-button>
                <el-button
                  class="reset-btn"
                  plain
                  @click="resetForm('operationalSearchFormData')"
                >重置</el-button>
              </el-col>
            </el-row>
          </div>
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
              v-show="
                (!dataList || dataList.length <= 0) &&
                  !listLoading &&
                  !searchkey
              "
              slot="empty"
            >
              <img
                src="@/icons/pic-kong.png"
                alt="img"
                style="margin-top: 20px; width: 25%; height: 25%"
              />
              <p style="margin-top: -20px; padding-bottom: 0px">这里空空如也</p>
            </div>
            <el-card
              v-show="
                (!dataList || dataList.length <= 0) && !listLoading && searchkey
              "
              slot="empty"
              class="table-empty-box"
              shadow="never"
            >
              <empty></empty>
            </el-card>
            <el-table-column
              align="left"
              label="运输任务编号"
              min-width="180px"
              prop="transportTaskId"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="起始地机构"
              min-width="180"
              prop="startAgencyName"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="目的地机构"
              min-width="180"
              prop="endAgencyName"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="运单数量"
              min-width="120"
              prop="transportOrderNumber"
            >
            </el-table-column>

            <el-table-column
              align="left"
              label="出车时间"
              min-width="160"
              prop="outStorageTime"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="回车时间"
              min-width="160"
              prop="intoStorageTime"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="车牌号码"
              min-width="160"
              prop="licensePlate"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="车辆是否可用"
              min-width="120px"
            >
              <template slot-scope="scope">
                <div
                  class="tableColumn-status"
                  :class="{ 'stop-use': !scope.row.isAvailable }"
                >
                  {{ String(scope.row.isAvailable) ? '可用' : '不可用' }}
                </div>
              </template>
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column
              align="center"
              label="操作"
              fixed="right"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleWayllDetail(scope.row.id)"
                >查看</el-link>
              </template>
            </el-table-column>
          </el-table>
          <!-- end -->
          <!-- 分页 -->
          <div
            v-if="total > 10"
            class="pagination"
          >
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
      </div>
    </div>
  </div>
</template>

<script>
import { carRegisterList, pickupTaskUpdate } from '@/api/branch'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'
import { agencyList } from '@/api/institutions'
import { getNotNullParams } from '@/utils/index'
export default {
  components: {
    Treeselect
  },
  data() {
    return {
      tableKey: 0,
      dataList: [],
      total: null,
      searchkey: false,
      tableChecked: [],
      carStatus: [
        {
          id: 3,
          name: '全部'
        },
        {
          id: 1,
          name: '可用'
        },
        {
          id: 2,
          name: '不可用'
        }
      ],
      listLoading: true,
      operationalSearchFormData: {
        page: 1,
        pageSize: 10,
        transportTaskId: '',
        startAgencyId: null,
        endAgencyId: null,
        isAvailable: '',
        intoStorageStartTime: '',
        intoStorageEndTime: ''
      },
      intoStorage: [],
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
    // 获取起始/目的地机构列表数据
    async getAgencyList() {
      const { data: res } = await agencyList()
      // 获取数据给options
      this.agencyOptions = JSON.parse(res)
    },
    selectStartAgency(val) {
      this.operationalSearchFormData.startAgencyId = val.id
    },
    selectEndAgency(val) {
      this.operationalSearchFormData.endAgencyId = val.id
    },
    handleEstimatedTimeChange(val) {
      if (!val) {
        this.intoStorage = []
        this.operationalSearchFormData.intoStorageStartTime = ''
        this.operationalSearchFormData.intoStorageEndTime = ''
      } else {
        this.intoStorage = val
        this.operationalSearchFormData.intoStorageStartTime = val[0]
        this.operationalSearchFormData.intoStorageEndTime = val[1]
      }
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
    cancelDisFn() {
      this.$refs['dataForm'].resetFields()
      this.dialogFormVisible = false
    },
    // 初始数据
    initialDate() {
      // 读取数据
      this.getList()
    },

    handleSelectionChange(val) {
      this.tableChecked = val
    },
    // 获取列表数据
    async getList() {
      this.listLoading = true
      const params = getNotNullParams(this.operationalSearchFormData)
      if (params.isAvailable === 3) {
        delete params.isAvailable
      } else if (params.isAvailable === 2) {
        params.isAvailable = false
      } else if (params.isAvailable === 1) {
        params.isAvailable = true
      }
      const { data: res } = await carRegisterList(params)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
    },
    // 重置
    resetForm() {
      this.$refs['operationalSearchFormData'].resetFields()
      this.operationalSearchFormData.page = 1
      this.operationalSearchFormData.pageSize = 10
      this.operationalSearchFormData.transportTaskId = ''
      this.operationalSearchFormData.startAgencyId = ''
      this.operationalSearchFormData.endAgencyId = ''
      this.searchkey = false
      this.operationalSearchFormData.isAvailable = ''
      this.operationalSearchFormData.intoStorageStartTime = ''
      this.operationalSearchFormData.intoStorageEndTime = ''
      this.intoStorage = []
      this.getList()
    },
    // 搜索信息
    handleFilter() {
      this.getList()
      this.searchkey = true
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.operationalSearchFormData.pageSize = val
      if (this.operationalSearchFormData.page === 1) {
        this.getList()
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.operationalSearchFormData.page = val
      this.getList()
    },

    // 查看回车登记详情
    handleWayllDetail(id) {
      this.$router.push({
        path: '/transit/car-register-info',
        query: { id: id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-card__body {
  padding-bottom: 28px !important;
}
.pagination {
  margin-top: 40px;
}
// 下拉框
/deep/ .el-select {
  width: 100%;
}
</style>

<style lang="scss" scoped>
/deep/ .el-card {
  overflow: initial;
}
/deep/ .vue-treeselect__menu-container {
  z-index: 9999 !important;
}
</style>
