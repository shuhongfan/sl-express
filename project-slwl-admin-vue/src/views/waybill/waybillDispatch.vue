<template>
  <div class="dashboard-container waybill-list customer-list-box">
    <div class="app-container">
      <el-card
        class="search-card-box"
        shadow="never"
      >
        <el-form
          ref="waybillSearchFormData"
          :model="waybillSearchFormData"
          label-width="120px"
        >
          <!-- <div class="filter-container"> -->
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item label="运单编号:">
                <el-input
                  v-model="waybillSearchFormData.id"
                  placeholder="请输入运单编号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="重量:">
                <el-input
                  v-model="waybillSearchFormData.order.senderName"
                  placeholder="请输入重量"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转运中心:">
                <el-select
                  v-model="waybillSearchFormData.status"
                  value-key="id"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运单状态:">
                <el-select
                  v-model="waybillSearchFormData.status"
                  value-key="id"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运单时间:">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="体积:">
                <el-input
                  v-model="waybillSearchFormData.order.senderPhone"
                  placeholder="请输入体积"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="page-form-item"
                prop="receiverPro"
                label="收件人地址:"
              >
                <el-select
                  v-model="waybillSearchFormData.receiverPro"
                  placeholder="请选择省"
                  clearable
                  value-key="id"
                  @change="getProvinceReceiver"
                >
                  <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>

                <el-select
                  v-model="waybillSearchFormData.receiverCi"
                  placeholder="请选择市"
                  clearable
                  @change="getReceiverCity"
                >
                  <el-option
                    v-for="item in receiverCityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="waybillSearchFormData.receivercountyStr"
                  value-key="id"
                  clearable
                  placeholder="请选择县/区"
                  @change="getReceiverArea"
                >
                  <el-option
                    v-for="item in countryReceiverList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button @click="handleFilter('查询')">搜索</el-button>
              <el-button
                class="reset-btn"
                @click="resetForm('waybillSearchFormData')"
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
          v-show="dataList && dataList.length > 0"
          shadow="never"
          class="table-card-box"
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
            <el-table-column
              align="left"
              type="selection"
              width="50"
            />
            <el-table-column
              align="left"
              label="运单编号"
              min-width="140"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="调度状态"
              min-width="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.schedulingStatus == 1">待调度</span>
                <span
                  v-else-if="scope.row.schedulingStatus == 2"
                >未匹配线路</span>
                <span v-else>已调度</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="任务编号"
              min-width="140"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="线路"
              min-width="160"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="车次"
              min-width="160"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="当前所在转运中心"
              min-width="160"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="发货网点"
              min-width="160"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="发货城市"
              min-width="160"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="收货网点"
              min-width="160"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="收货城市"
              min-width="160"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="下单时间"
              min-width="160"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="最晚送达时间"
              min-width="160"
            >
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
                  @click="handleWayBillDetail(scope.row.id, scope.row.order.id)"
                >查看</el-link>
                <el-divider direction="vertical" />
                <el-link
                  type="danger"
                  :underline="false"
                  @click="handleWayBillDetail(scope.row.id, scope.row.order.id)"
                >拦截</el-link>
                <el-divider direction="vertical" />
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleWayBillDetail(scope.row.id, scope.row.order.id)"
                >调度</el-link>
              </template>
            </el-table-column>
          </el-table>
          <!-- end -->
          <!-- 分页 -->
          <div class="pagination">
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
import { setToken } from '@/utils/auth'
import options from '@/api/waybillstatus.json'
import { areaList } from '@/api/common'

export default {
  components: {},
  data() {
    return {
      provinceList: [],
      statusOptions: '',
      multipleSelection: [],
      tableKey: 0,
      dataList: [
        {
          id: 1
        },
        { id: 2 }
      ],
      cityList: [],
      countryList: [],
      receiverCityList: [],
      countryReceiverList: [],
      total: null,
      listLoading: false,
      alertText: '',
      waybillSearchFormData: {
        page: 1,
        pageSize: 10,
        id: '',
        order: {
          senderName: '',
          senderPhone: '',
          receiverName: '',
          receiverPhone: '',
          senderProvince: {},
          senderCity: {},
          senderCounty: {},
          receiverProvince: {},
          receiverCity: {},
          receiverCounty: {}
        },
        status: '',
        senderPro: '',
        senderCi: '',
        sendercountyStr: '',
        receiverPro: '',
        receiverCi: '',
        receivercountyStr: ''
      },
      requestParamsProvince: {}
    }
  },
  computed: {},
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
    this.showcity()
    this.statusOptions = options
    var _this = this
    this.companyId = this.$route.query.companyId
    this.initialDate()
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.waybillSearchFormData)
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
    async getCity() {
      if (this.waybillSearchFormData.senderPro !== 0) {
        this.requestParamsProvince.parentId =
          this.waybillSearchFormData.senderCi
        const { data: res } = await areaList(this.requestParamsProvince)
        this.countryList = res
        this.waybillSearchFormData.sendercountyStr = ''
      }
    },
    // 获取省
    async showcity() {
      this.requestParamsProvince.parentId = 0
      const { data: res } = await areaList(this.requestParamsProvince)
      this.provinceList = res
    },
    // 新增县地址
    getArea() {
      if (this.waybillSearchFormData.sendercountyStr !== '') {
        let obj = {}
        obj = this.countryList.find((item) => {
          return item.id === this.waybillSearchFormData.sendercountyStr
        })
        this.waybillSearchFormData.order.senderCounty.id = obj.id
        this.waybillSearchFormData.order.senderCounty.name = obj.name
      } else {
        this.waybillSearchFormData.order.senderCounty.id = ''
        this.waybillSearchFormData.order.senderCounty.name = ''
      }
    },
    // 获取收件人地址
    async getProvinceReceiver(vId) {
      if (this.waybillSearchFormData.receiverPro !== 0) {
        this.requestParamsProvince.parentId =
          this.waybillSearchFormData.receiverPro
        const { data: res } = await areaList(this.requestParamsProvince)
        this.receiverCityList = res
      }
      this.waybillSearchFormData.receiverCi = ''

      // TODO
      this.waybillSearchFormData.receivercountyStr = ''
      if (vId !== '') {
        let obj = {}
        obj = this.provinceList.find((item) => {
          return item.id === vId
        })
        this.waybillSearchFormData.order.receiverProvince.id = obj.id
        this.waybillSearchFormData.order.receiverProvince.name = obj.name
      } else {
        this.waybillSearchFormData.order.receiverProvince.id = ''
        this.waybillSearchFormData.order.receiverProvince.name = ''
      }
    },
    // 参照权限写法，不敢改
    async receiverCity() {
      if (this.waybillSearchFormData.receiverPro !== 0) {
        this.requestParamsProvince.parentId =
          this.waybillSearchFormData.receiverCi
        const { data: res } = await areaList(this.requestParamsProvince)
        this.countryReceiverList = res
        this.waybillSearchFormData.receivercountyStr = ''
      }
    },
    getReceiverCity(vId) {
      // TODO
      this.waybillSearchFormData.receivercountyStr = ''
      if (vId !== '') {
        let obj = {}
        obj = this.receiverCityList.find((item) => {
          return item.id === vId
        })
        this.receiverCity()
        this.waybillSearchFormData.order.receiverCity.id = obj.id
        this.waybillSearchFormData.order.receiverCity.name = obj.name
      } else {
        this.waybillSearchFormData.order.receiverCity.id = ''
        this.waybillSearchFormData.order.receiverCity.name = ''
      }
    },
    // 新增县地址
    getReceiverArea() {
      if (this.waybillSearchFormData.receivercountyStr !== '') {
        let obj = {}
        obj = this.countryReceiverList.find((item) => {
          return item.id === this.waybillSearchFormData.receivercountyStr
        })
        this.waybillSearchFormData.order.receiverCounty.id = obj.id
        this.waybillSearchFormData.order.receiverCounty.name = obj.name
      } else {
        this.waybillSearchFormData.order.receiverCounty.id = ''
        this.waybillSearchFormData.order.receiverCounty.name = ''
      }
    },
    // 获取发件人地址
    async getSenderProvince(vId) {
      if (this.waybillSearchFormData.senderPro !== 0) {
        this.requestParamsProvince.parentId =
          this.waybillSearchFormData.senderPro
        const { data: res } = await areaList(this.requestParamsProvince)
        this.cityList = res
      }
      this.waybillSearchFormData.senderCi = ''
      // TODO
      this.waybillSearchFormData.sendercountyStr = ''
      if (vId !== '') {
        let obj = {}
        obj = this.provinceList.find((item) => {
          return item.id === vId
        })
        this.waybillSearchFormData.order.senderProvince.id = obj.id
        this.waybillSearchFormData.order.senderProvince.name = obj.name
      } else {
        this.waybillSearchFormData.order.senderProvince.id = ''
        this.waybillSearchFormData.order.senderProvince.name = ''
      }
    },
    getSenderCity(vId) {
      // TODO
      this.waybillSearchFormData.sendercountyStr = ''
      if (vId !== '') {
        let obj = {}
        obj = this.cityList.find((item) => {
          return item.id === vId
        })
        this.getCity()
        this.waybillSearchFormData.order.senderCity.id = obj.id
        this.waybillSearchFormData.order.senderCity.name = obj.name
      } else {
        this.waybillSearchFormData.order.senderCity.id = ''
        this.waybillSearchFormData.order.senderCity.name = ''
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 重置
    resetForm(waybillSearchFormData) {
      this.$refs[waybillSearchFormData].resetFields()
      this.waybillSearchFormData.page = 1
      this.waybillSearchFormData.pageSize = 10
      this.waybillSearchFormData.id = ''
      this.waybillSearchFormData.status = ''
      this.waybillSearchFormData.order.senderName = ''
      this.waybillSearchFormData.order.senderPhone = ''
      this.waybillSearchFormData.order.receiverName = ''
      this.waybillSearchFormData.order.receiverPhone = ''

      this.waybillSearchFormData.senderPro = ''
      this.waybillSearchFormData.senderCi = ''
      this.waybillSearchFormData.sendercountyStr = ''
      this.waybillSearchFormData.receiverPro = ''
      this.waybillSearchFormData.receiverCi = ''
      this.waybillSearchFormData.receivercountyStr = ''
      this.waybillSearchFormData.order.senderProvince = {}
      this.waybillSearchFormData.order.senderCity = {}
      this.waybillSearchFormData.order.senderCounty = {}
      this.waybillSearchFormData.order.receiverProvince = {}
      this.waybillSearchFormData.order.receiverCity = {}
      this.waybillSearchFormData.order.receiverCounty = {}
      this.getList()
    },
    // 搜索信息
    handleFilter(opt) {
      this.waybillSearchFormData.page = 1
      this.getList(this.waybillSearchFormData)
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
<style>
.waybillDispatch .cell {
  padding-right: 25px !important;
}
</style>
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
.waybill-list /deep/ .el-table td,
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
