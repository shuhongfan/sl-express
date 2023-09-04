<!-- 快递员管理 -->
<template>
  <div class="dashboard-container operational-range customer-list-box">
    <div class="app-container">
      <el-card
        class="search-card-box"
        shadow="never"
      >
        <el-form
          ref="rangeSearchFormData"
          :model="rangeSearchFormData"
          label-width="95px"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                label="快递员账号:"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model="rangeSearchFormData.account"
                  clearable
                  placeholder="请输入快递员账号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="快递员姓名:"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model="rangeSearchFormData.name"
                  clearable
                  placeholder="请输入快递员姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="快递员手机号:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="rangeSearchFormData.phone"
                  clearable
                  placeholder="请输入快递员手机"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="username"
                label="所属机构:"
                style="margin-top: 20px; margin-bottom: 0px"
              >
                <treeselect
                  v-model="rangeSearchFormData.agentId"
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
            <el-col
              :span="8"
              style="margin-top: 20px"
            >
              <el-button
                type="warning"
                @click="handleFilter('查询')"
              >搜索</el-button>
              <el-button
                plain
                class="reset-btn"
                @click="resetForm('rangeSearchFormData')"
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
            style="width: 100%"
            stripe
            :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
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
              type="index"
              label="序号"
              width="100px"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.$index +
                    (rangeSearchFormData.page - 1) *
                    rangeSearchFormData.pageSize +
                    1
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="快递员账号"
              min-width="200px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.account }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="快递员姓名"
              min-width="300px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="快递员手机号"
              min-width="250px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.mobile }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="所属机构"
              min-width="300px"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.agency === null ? '' : scope.row.agency.name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="工作状态"
              min-width="230px"
            >
              <template
                slot-scope="scope"
              >
                <div
                  v-if="scope.row.workStatus !== null"
                  style="width: 100%; align: center"
                >
                  <!-- 创建一个span，且span居中 -->
                  <span
                    style="display: inline-block; width: 100%; text-align: center"
                    class="tableColumn-status"
                    :class="{ 'stop-use': String(scope.row.workStatus) === '0' }"
                  >
                    <span>
                      {{ String(scope.row.workStatus) === '1' ? '上班' : '休息' }}
                    </span>
                  </span>
                </div>
                <div v-else>未排班</div>
              </template>
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column
              align="center"
              label="操作"
              width="120px"
              class-name="small-padding fixed-width"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleAssignmentJob(scope.row)"
                >作业范围分配</el-link>
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
                :current-page="Number(rangeSearchFormData.page)"
                :total="Number(total)"
                :page-size="Number(rangeSearchFormData.pageSize)"
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
import { courierList } from '@/api/branch'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { agencyList } from '@/api/institutions'
export default {
  name: 'Courses',
  components: {
    Treeselect
  },
  data() {
    return {
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },
      tableKey: 0,
      dataList: [],
      searchkey: false,
      total: null,
      listLoading: true,
      alertText: '',
      rangeSearchFormData: {
        page: 1,
        pageSize: 10,
        name: '',
        phone: '',
        account: '',
        agentId: null // 机构id
      },
      titleInfo: {
        pageTitle: '',
        text: ''
      },
      formData: {
        userId: '',
        options: '',
        countrys: ''
      },
      agencyOptions: []
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
    this.companyId = this.$route.query.companyId
    this.initialDate()
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.rangeSearchFormData)
      }
    }
  },
  // 组件更新
  updated: function () {},
  methods: {
    // 打开所属机构下拉框
    open() {
      this.$refs.arrow.style.transform = 'rotate(-180deg)'
    },
    // 关闭所属机构下拉框
    close() {
      this.$refs.arrow.style.transform = 'rotate(0deg)'
    },
    // 初始数据
    initialDate() {
      // 读取数据
      this.getList()
      this.getAgencyList()
    },
    // 获取起始/目的地机构列表数据
    async getAgencyList() {
      // 读取数据
      const { data: res } = await agencyList()
      // 获取数据给options
      this.agencyOptions = JSON.parse(res)
    },
    // 赋予搜索id为搜索框内的数据
    selectAgency(val) {
      this.rangeSearchFormData.agentId = val.id
    },
    // 获取快递员列表数据
    async getList() {
      this.listLoading = true
      const { data: res } = await courierList(this.rangeSearchFormData)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
    },
    // 重置
    resetForm(rangeSearchFormData) {
      this.$refs[rangeSearchFormData].resetFields()
      // this.rangeSearchFormData = {}
      this.rangeSearchFormData.name = ''
      this.rangeSearchFormData.phone = ''
      this.rangeSearchFormData.account = ''
      this.rangeSearchFormData.agentId = null
      this.searchkey = false
      this.getList()
    },
    // 搜索信息
    handleFilter() {
      this.rangeSearchFormData.page = 1
      this.getList(this.rangeSearchFormData)
      this.searchkey = true
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.rangeSearchFormData.pageSize = val
      if (this.rangeSearchFormData.page === 1) {
        this.getList(this.rangeSearchFormData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.rangeSearchFormData.page = val
      this.getList()
    },
    // 作业范围分配
    async handleAssignmentJob(row) {
      this.$router.push({
        path: '/branches/MapContent',
        query: {
          agencyName: row.agency.name,
          id: row.userId,
          name: 'row.name'
        }
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
</style>

<style lang="scss" scoped>
.operational-range {
  .el-card {
    overflow: initial;
  }
}
</style>
