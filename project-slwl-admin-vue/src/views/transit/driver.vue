<!-- 车辆管理 -->
<template>
  <div class="dashboard-container driver customer-list-box">
    <div class="app-container">
      <el-card
        shadow="never"
        class="search-card-box"
      >
        <el-form
          ref="driverSearchFormData"
          :model="driverSearchFormData"
          label-width="80px"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                prop="username"
                label="司机账号:"
              >
                <el-input
                  v-model="driverSearchFormData.account"
                  placeholder="请输入司机账号"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="name"
                label="司机姓名:"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model="driverSearchFormData.name"
                  placeholder="请输入司机姓名"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="phone"
                label="司机手机号:"
                label-width="90px"
              >
                <el-input
                  v-model="driverSearchFormData.phone"
                  placeholder="请输入司机手机号"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="agentId"
                label="所属机构:"
                style="margin-bottom: 0px"
              >
                <treeselect
                  v-model="driverSearchFormData.agentId"
                  :options="agencyOptions"
                  :normalizer="normalizer"
                  :searchable="true"
                  style="width: 100%"
                  placeholder="请选择所属机构"
                  no-options-text="暂无数据"
                  no-results-text="暂无数据"
                  @select="selectAgency"
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
            <el-col :span="8">
              <el-button
                type="warning"
                @click="handleFilter"
              >搜索</el-button>
              <el-button
                plain
                class="reset-btn"
                @click="resetForm('driverSearchFormData')"
              >重置</el-button>
            </el-col>
          </el-row>
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
            :header-cell-style="{ background: 'rgba(250,252,255,1)'}"

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
              label="序号"
              min-width="100px"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.$index +
                    (driverSearchFormData.page - 1) *
                    driverSearchFormData.pageSize +
                    1
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="司机账号"
              min-width="200px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.account }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="司机姓名"
              min-width="200px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="司机电话"
              min-width="200px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.mobile }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="关联车辆"
              min-width="200px"
              prop=""
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.truck ? scope.row.truck.licensePlate : ''
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="所属机构"
              min-width="200px"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.agency === null ? '' : scope.row.agency.name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="工作状态"
              min-width="200px"
            >
              <template slot-scope="scope">
                <div
                  v-if="scope.row.workStatus !== null"
                  style="width: 100%;"
                >
                  <!-- 创建一个span，且span居中 -->
                  <span
                    style="display: inline-block; width: 100%;"
                    class="tableColumn-status"
                    :class="{ 'stop-use': String(scope.row.workStatus) === '0' }"
                  >
                    <span>
                      {{ String(scope.row.workStatus) === '1' ? '上班' : '休息' }}
                    </span>
                  </span>
                </div>
                <div v-else></div>
              </template>
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="130px"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="driverDetail(scope.row.userId)"
                >查看</el-link>
                <el-divider direction="vertical" />
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleOpenCarModal(scope.row)"
                >配置车辆</el-link>
              </template>
            </el-table-column>
          </el-table>
          <!-- end -->
          <!-- 分页 -->
          <div class="pagination">
            <div
              v-show="dataList && dataList.length > 0"
              class="pages"
            >
              <el-pagination
                :current-page="Number(driverSearchFormData.page)"
                :total="Number(total)"
                :page-size="Number(driverSearchFormData.pageSize)"
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
    <!-- 配置车辆弹窗 -->
    <CarConfig
      ref="CarConfigModals"
      :driver-modal-info="driverModalInfo"
      :dialog-form-visible="dialogFormVisible"
      :car-list="carList"
      @newDataes="initialDate"
    ></CarConfig>
  </div>
</template>
<script>
import { driverList, getTruckListInDriver } from '@/api/transit'
import { agencyList } from '@/api/institutions'
import Treeselect from '@riophae/vue-treeselect'
import CarConfig from '@/views/transit/components/car-config.vue'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'Courses',
  components: { CarConfig, Treeselect },
  data() {
    return {
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },
      multipleSelection: [],
      tableKey: 0,
      options: [],
      dataList: [],
      total: null,
      searchkey: false,
      listLoading: true,
      titleInfo: {
        pageTitle: '',
        text: ''
      },
      dialogFormVisible: false,
      driverSearchFormData: {
        page: 1,
        pageSize: 10,
        name: '', // 司机名称
        account: '', // 司机账号
        phone: '', // 工作状态
        agentId: null // 机构id
      },
      driverModalInfo: {},
      carList: [],
      agencyOptions: []
    }
  },
  // 创建完毕状态
  created() {
    var _this = this
    this.initialDate()
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.driverSearchFormData)
      }
    }
  },
  methods: {
    open() {
      this.$refs.arrow.style.transform = 'rotate(-180deg)'
    },
    close() {
      this.$refs.arrow.style.transform = 'rotate(0deg)'
    },
    selectAgency(val) {
      this.driverSearchFormData.agentId = val.id
    },
    // 获取起始/目的地机构列表数据
    async getAgencyList() {
      const { data: res } = await agencyList()
      // 获取数据给options
      this.agencyOptions = JSON.parse(res)
    },
    // 获取车辆列表数据
    async getTruckList() {
      const { data: res } = await getTruckListInDriver()
      this.carList = res
    },
    handleOpenCarModal(row) {
      const h = this.$createElement
      this.$confirm(
        `启用`,
        {
          title: '车辆配置',
          message: h('div',
            [h('p', { style: 'margin-bottom :9px;color:#332929' }, '配置车辆需满足以下条件：'),
              h('span', { style: 'width: 16px;height: 16px;background: #FAFCFF;border: 1px solid #EBEEF5;border-radius : 50% ;display : inline-block ;text-align:center ;margin-right:6px;line-height:14px;' }, '1'),
              h('span', { style: 'color:#332929' }, '司机信息已完善'),
              h('span', { style: 'width: 16px;height: 16px;background: #FAFCFF;border: 1px solid #EBEEF5;margin-left :90px ; border-radius : 50% ;display : inline-block ;text-align:center;line-height:14px;margin-right:6px' }, '2'),
              h('span', { style: 'color:#332929;margin-right :20px ;' }, '司机已设置排班'),
              h('span', { style: 'width: 16px;height: 16px;background: #FAFCFF;border: 1px solid #EBEEF5;margin-top :10px ; border-radius : 50% ;display : inline-block ;text-align:center;line-height:14px;margin-right:6px' }, '3'),
              h('span', { style: 'color:#332929' }, '司机绑定车辆未在启用状态')]),
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'carmodel'
        },
      )
        .then(() => {
          this.driverModalInfo = Object.assign({}, row)
          this.$refs.CarConfigModals.handleOpen()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 初始数据
    initialDate() {
      // 读取数据
      this.clearField()
      this.getList()
      this.getTruckList()
      this.getAgencyList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取司机分页数据
    async getList() {
      this.listLoading = true
      const { data: res } = await driverList(this.driverSearchFormData)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
    },
    // 清除重置
    clearField() {
      if (this.driverSearchFormData.account === '') {
        this.$delete(this.driverSearchFormData, 'account')
      }
      if (this.driverSearchFormData.name === '') {
        this.$delete(this.driverSearchFormData, 'name')
      }
      if (this.driverSearchFormData.phone === '') {
        this.$delete(this.driverSearchFormData, 'phone')
      }
    },
    // 搜索，添加
    setField() {
      this.$set(this.driverSearchFormData, 'account')
      this.$set(this.driverSearchFormData, 'name')
      this.$set(this.driverSearchFormData, 'phone')
      this.$set(this.driverSearchFormData, 'agentId')
    },
    // 搜索信息
    handleFilter() {
      this.clearField()
      this.driverSearchFormData.page = 1
      this.searchkey = true
      this.getList(this.driverSearchFormData)
    },
    // 重置
    resetForm(driverSearchFormData) {
      this.setField()
      this.searchkey = false
      this.$refs[driverSearchFormData].resetFields()
      this.getList()
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.driverSearchFormData.pageSize = val
      if (this.driverSearchFormData.page === 1) {
        this.getList(this.driverSearchFormData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.driverSearchFormData.page = val
      this.getList()
    },
    // 司机详情
    driverDetail(id) {
      this.$router.push({
        path: '/transit/driver-detail',
        query: { id: id, formUrlName: '司机管理' }
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
  margin-top: 40px;
}
// 下拉框
/deep/ .el-select {
  width: 100%;
}

/deep/ .el-card{
  overflow: initial;
}
</style>

