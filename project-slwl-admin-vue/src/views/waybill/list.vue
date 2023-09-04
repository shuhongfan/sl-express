<!-- 运单管理页 -->
<template>
  <div
    ref="contentData"
    class="dashboard-container waybill-list customer-list-box"
  >
    <div class="app-container">
      <el-card class="search-card-box" shadow="never">
        <el-form
          ref="waybillSearchFormData"
          :model="waybillSearchFormData"
          label-width="80px"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                label="运单编号:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="waybillSearchFormData.id"
                  placeholder="请输入运单编号"
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
                  v-model="waybillSearchFormData.orderId"
                  placeholder="请输入订单编号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="调度状态:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-select
                  v-model="waybillSearchFormData.schedulingStatus"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in schedulingStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="起始地机构:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <treeselect
                  v-model="waybillSearchFormData.startAgencyId"
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
                  v-model="waybillSearchFormData.endAgencyId"
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
                label="当前所在机构:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <treeselect
                  v-model="waybillSearchFormData.currentAgencyId"
                  :options="agencyOptions"
                  :normalizer="normalizer"
                  :searchable="true"
                  style="width: 100%"
                  placeholder="请选择当前所在机构"
                  no-options-text="暂无数据"
                  no-results-text="暂无数据"
                  @select="selectCurrentAgency"
                  @open="opensCurrentAgency"
                  @close="closesCurrentAgency"
                />
                <img
                  ref="arrowsCurrentAgency"
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
            <el-col :span="8" style="padding-left: 50px">
              <el-button type="warning" @click="handleFilter('查询')"
                >搜索</el-button
              >
              <el-button
                plain
                class="reset-btn"
                @click="resetForm('waybillSearchFormData')"
                >重置</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <TabChange
        :default-active-index="0"
        :setting-list="settingList"
        @tabChange="tabChange"
      ></TabChange>
      <div
        v-loading="listLoading"
        :class="{ 'loading-box': listLoading }"
        element-loading-text="加载中"
        style="margin-top: 20px"
      >
        <el-card shadow="never" class="table-card-box">
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
                src="@/icons/pic-kong@2x.png"
                alt="img"
                style="margin-top: 20px; width: 14%; height: 14%"
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
            <el-table-column align="left" type="index" label="序号" width="60">
              <template slot-scope="scope">
                <span>{{
                  scope.$index +
                  (waybillSearchFormData.page - 1) *
                    waybillSearchFormData.pageSize +
                  1
                }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="运单编号" min-width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="订单编号" min-width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.orderId }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="运单状态" min-width="130">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 1">新建</span>
                <span v-else-if="scope.row.status == 2">已装车</span>
                <span v-else-if="scope.row.status == 3">到达</span>
                <span v-else-if="scope.row.status == 4">到达终端网点</span>
                <span v-else-if="scope.row.status == 5">已签收</span>
                <span v-else>拒收</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="调度状态" min-width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.schedulingStatus == 1">待调度</span>
                <span v-else-if="scope.row.schedulingStatus == 2"
                  >未匹配线路</span
                >
                <span v-else>已调度</span>
              </template>
            </el-table-column>

            <el-table-column
              align="left"
              label="起始营业部"
              min-width="170"
              prop="startAgencyName"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="终点营业部"
              min-width="170"
              prop="endAgencyName"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="当前所在机构"
              min-width="170"
              prop="currentAgencyName"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="下一个机构"
              min-width="170"
              prop="nextAgencyName"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="货品总体积(立方米)"
              min-width="170"
              prop="totalVolume"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="货品总重量(千克)"
              min-width="170"
              prop="totalWeight"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="创建时间"
              min-width="170"
              prop="created"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="更新时间"
              min-width="170"
              prop="updated"
            >
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="85"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleWayBillDetail(scope.row.id, scope.row.order)"
                  >查看详情</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- end -->
          <!-- 分页 -->
          <div v-show="dataList && dataList.length > 0" class="pagination">
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
      </div>
    </div>
  </div>
</template>
<script>
import { setToken } from '@/utils/auth'
import { waybillList, waybillStatic } from '@/api/waybill'
import options from '@/api/waybillstatus.json'
import { areaList } from '@/api/common'
import { agencyList } from '@/api/institutions'
import TabChange from '@/components/TabChange'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'
export default {
  components: {
    TabChange,
    Treeselect
  },
  data() {
    return {
      agencyOptions: [],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },
      schedulingStatus: [
        {
          id: 1,
          name: '待调度'
        },
        {
          id: 2,
          name: '未匹配线路'
        },
        {
          id: 3,
          name: '已调度'
        }
      ],
      settingList: [
        {
          value: 0,
          label: '全部',
          num: 0
        },
        {
          value: 1,
          label: '新建',
          num: 0
        },
        {
          value: 2,
          label: '已装车',
          num: 0
        },
        {
          value: 3,
          label: '运输中',
          num: 0
        },
        {
          value: 4,
          label: '到达终端网点',
          num: 0
        },
        {
          value: 6,
          label: '拒收',
          num: 0
        }
      ],
      provinceList: [],
      statusOptions: '',
      searchkey: false,
      multipleSelection: [],
      tableKey: 0,
      dataList: [],
      cityList: [],
      countryList: [],
      receiverCityList: [],
      countryReceiverList: [],
      total: null,
      listLoading: true,
      alertText: '',
      waybillSearchFormData: {
        page: 1,
        pageSize: 10,
        id: '',
        orderId: '' // 订单id
      },
      requestParamsProvince: {}
    }
  },
  // 挂载结束
  mounted: function () {
    window.addEventListener(
      'message',
      function (event) {
        setToken(event.data)
      },
      false
    )
  },
  // 创建完毕状态
  created() {
    this.statusOptions = options
    var _this = this
    this.companyId = this.$route.query.companyId
    this.initialDate()
    this.getAgencyList()
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.waybillSearchFormData)
      }
    }
  },
  methods: {
    // 获取起始/目的地机构列表数据
    async getAgencyList() {
      const { data: res } = await agencyList()
      // 获取数据给options
      this.agencyOptions = JSON.parse(res)
    },
    // 初始数据
    initialDate() {
      // 读取数据
      this.getList()
      this.getWaybillStatic()
    },
    async getCity() {
      if (this.waybillSearchFormData.senderPro !== 0) {
        this.requestParamsProvince.parentId =
          this.waybillSearchFormData.senderCi
        const { data: res } = await areaList(this.requestParamsProvince)
        this.countryList = res
        this.waybillSearchFormData.sendercountyStr = ''
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
    opensCurrentAgency() {
      this.$refs.arrowsCurrentAgency.style.transform = 'rotate(-180deg)'
    },
    closesCurrentAgency() {
      this.$refs.arrowsCurrentAgency.style.transform = 'rotate(0deg)'
    },
    selectStartAgency(val) {
      this.waybillSearchFormData.startAgencyId = val.id
    },
    selectEndAgency(val) {
      this.waybillSearchFormData.endAgencyId = val.id
    },
    selectCurrentAgency(val) {
      this.waybillSearchFormData.currentAgencyId = val.id
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 状态变更
    tabChange(activeIndex) {
      this.waybillSearchFormData.status = activeIndex
      this.waybillSearchFormData.page = 1
      this.getList()
    },
    // 获取运单统计数据
    async getWaybillStatic() {
      const { data: res } = await waybillStatic()
      this.settingList[1].num = res[1] || 0
      this.settingList[2].num = res[0] || 0
      this.settingList[3].num = res[3] || 0
      this.settingList[4].num = res[4] || 0
      this.countFive = res[5] || 0
      this.settingList[5].num = res[6] || 0
      this.settingList[0].num =
        Number(this.settingList[1].num) +
        Number(this.settingList[2].num) +
        Number(this.settingList[3].num) +
        Number(this.settingList[4].num) +
        Number(this.countFive) +
        Number(this.settingList[5].num)
    },
    // 获取运单列表数据
    async getList() {
      this.listLoading = true
      const params = { ...this.waybillSearchFormData }
      if (params.status === 0) {
        delete params.status
      }
      const { data: res } = await waybillList(params)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
    },
    // 重置
    resetForm(waybillSearchFormData) {
      // 之所以注释掉是因为这里必须配合prop对表单进行赋值，但后端有的字段不支持空串
      // this.$refs[waybillSearchFormData].resetFields()
      this.waybillSearchFormData = {
        page: 1,
        pageSize: 10,
        status: this.waybillSearchFormData.status
      }
      this.searchkey = false
      this.getList()
    },
    // 搜索信息
    handleFilter() {
      this.waybillSearchFormData.page = 1
      this.getList(this.waybillSearchFormData)
      this.searchkey = true
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
    },
    // 运单详情
    handleWayBillDetail(id, orderId) {
      this.$router.push({
        path: '/business/waybill-detail',
        query: { id: id, orderId: orderId }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
/deep/ .pagination {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  padding-bottom: 0px;
}
/deep/ .el-dialog__body {
  padding-left: 50px !important;
}
</style>

<style lang="scss" scoped>
.waybill-list {
  /deep/ .el-table td,
  /deep/ .el-table th {
    padding: 12px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    overflow: hidden;
  }
}

.waybill-list /deep/ .el-table td,
.el-table th {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  overflow: hidden;
}
/deep/ .el-card {
  overflow: initial;
}
/deep/ .el-select {
  width: 100%;
}
/deep/ .el-card__body {
  padding-bottom: 58px !important;
}
</style>
