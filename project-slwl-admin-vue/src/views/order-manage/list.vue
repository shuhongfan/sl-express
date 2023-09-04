<!-- 订单管理 -->
<template>
  <div class="dashboard-container order-list customer-list-box">
    <div class="app-container">
      <el-card
        class="search-card-box"
        shadow="never"
      >
        <el-form
          ref="orderSearchFormData"
          :model="orderSearchFormData"
          label-width="90px"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item label="订单编号:">
                <el-input
                  v-model="orderSearchFormData.id"
                  placeholder="请输入订单编号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单状态:">
                <el-select
                  v-model="orderSearchFormData.status"
                  value-key="id"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in orderStatusOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="付费状态:">
                <el-select
                  v-model="orderSearchFormData.paymentStatus"
                  value-key="id"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in paymentStatusOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="发件人姓名:">
                <el-input
                  v-model="orderSearchFormData.senderName"
                  placeholder="请输入发件人姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发件人电话:">
                <el-input
                  v-model="orderSearchFormData.senderPhone"
                  placeholder="请输入发件人电话"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="page-form-item"
                label="发件人地址:"
              >
                <el-select
                  v-model="orderSearchFormData.senderProvinceId"
                  placeholder="请选择省"
                  value-key="id"
                  clearable
                  @change="getSenderProvince"
                >
                  <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>

                <el-select
                  v-model="orderSearchFormData.senderCityId"
                  placeholder="请选择市"
                  clearable
                  @change="getSenderCity"
                >
                  <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="orderSearchFormData.senderCountyId"
                  value-key="id"
                  clearable
                  placeholder="请选择县/区"
                  @change="getArea"
                >
                  <el-option
                    v-for="item in countryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="收件人姓名:">
                <el-input
                  v-model="orderSearchFormData.receiverName"
                  placeholder="请输入收件人姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人电话:">
                <el-input
                  v-model="orderSearchFormData.receiverPhone"
                  placeholder="请输入收件人电话"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="page-form-item"
                label="收件人地址:"
              >
                <el-select
                  v-model="orderSearchFormData.receiverProvinceId"
                  placeholder="请选择省"
                  value-key="id"
                  clearable
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
                  v-model="orderSearchFormData.receiverCityId"
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
                  v-model="orderSearchFormData.receiverCountyId"
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
              <el-button
                type="warning"
                @click="handleFilter('查询')"
              >搜索</el-button>
              <el-button
                plain
                class="reset-btn"
                @click="resetForm('orderSearchFormData')"
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
                style="margin-top: 20px;width: 20%;height: 20%;"
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
              width="60"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.$index +
                    (orderSearchFormData.page - 1) *
                    orderSearchFormData.pageSize +
                    1
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="订单编号"
              min-width="160px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="运单编号"
              min-width="130px"
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
              label="下单时间"
              min-width="160px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="订单状态"
              min-width="90px"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.status == ' 23000'">待取件</span>
                <span v-else-if="scope.row.status == '23001'">已取件</span>
                <span v-else-if="scope.row.status == '23002'">网点自寄</span>
                <span v-else-if="scope.row.status == '23003'">网点入库</span>
                <span v-else-if="scope.row.status == '23004'">待装车</span>
                <span v-else-if="scope.row.status == '23005'">运输中</span>
                <span v-else-if="scope.row.status == '23006'">网点出库</span>
                <span v-else-if="scope.row.status == '23007'">待派送</span>
                <span v-else-if="scope.row.status == '23008'">派送中</span>
                <span v-else-if="scope.row.status == '23009'">已签收</span>
                <span v-else-if="scope.row.status == '23010'">拒收</span>
                <span v-else>已取消</span>
              </template>
            </el-table-column>

            <el-table-column
              align="left"
              label="发件人姓名"
              min-width="100"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.senderName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="发件人电话"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.senderPhone }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="发件人地址"
              min-width="150px"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.senderProvince === null
                    ? ''
                    : scope.row.senderProvince.name
                }}</span>
                <span>{{
                  scope.row.senderCity === null ? '' : scope.row.senderCity.name
                }}</span>
                <span>{{
                  scope.row.senderCounty === null
                    ? ''
                    : scope.row.senderCounty.name
                }}</span>
                <span>{{ scope.row.senderAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="收件人姓名"
              min-width="100"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.receiverName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="收件人电话"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.receiverPhone }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="收件人地址"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.receiverProvince === null
                    ? ''
                    : scope.row.receiverProvince.name
                }}</span>
                <span>{{
                  scope.row.receiverCity === null
                    ? ''
                    : scope.row.receiverCity.name
                }}</span>
                <span>{{
                  scope.row.receiverCounty === null
                    ? ''
                    : scope.row.receiverCounty.name
                }}</span>
                <span>{{ scope.row.receiverAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="取件类型"
              min-width="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.pickupType == 1">网点自寄</span>
                <span v-else>上门取件</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="付费类型"
              min-width="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.paymentMethod == 1">预结</span>
                <span v-else>到付</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="付费状态"
              min-width="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.paymentStatus == 1">未付</span>
                <span v-else>已付</span>
              </template>
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column
              align="center"
              label="操作"
              width="85"
              fixed="right"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-link
                  v-if="
                    scope.row.status == '23002' && scope.row.pickupType == 1
                  "
                  type="primary"
                  :underline="false"
                  @click="handleOrderDetail(scope.row.id, scope.row.pickupType)"
                >编辑详情</el-link>
                <el-link
                  v-else
                  type="primary"
                  :underline="false"
                  @click="
                    handleOrderDetail(
                      scope.row.id,
                      scope.row.status,
                      scope.row.pickupType,
                      scope.row.transportOrder === null
                        ? ''
                        : scope.row.transportOrder.id
                    )
                  "
                >查看详情</el-link>
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
                :current-page="Number(orderSearchFormData.page)"
                :total="Number(total)"
                :page-size="Number(orderSearchFormData.pageSize)"
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
  </div>
</template>
<script>
import { orderList } from '@/api/order'
import options from '@/api/orderstatus.json'
import pickupoptions from '@/api/pickupstatus.json'
import { areaList } from '@/api/common'
export default {
  data() {
    return {
      orderId: '',
      multipleSelection: [],
      provinceList: [],
      cityList: [],
      countryList: [],
      countryReceiverList: [],
      receiverCityList: [],
      orderStatusOptions: '',
      pickUpTypeOptions: '',
      paymentStatusOptions: [
        {
          id: 1,
          name: '未付'
        },
        {
          id: 2,
          name: '已付'
        }
      ],
      tableKey: 0,
      dataList: [],
      total: null,
      listLoading: true,
      searchkey: false,
      orderSearchFormData: {
        page: 1,
        pageSize: 10,
        id: '',
        senderPhone: '',
        receiverName: '',
        receiverPhone: '',
        status: '',
        pickUpType: '',
        // 收件人
        senderProvinceId: '',
        senderCityId: '',
        senderCountyId: '',
        // 派件人
        receiverProvinceId: '',
        receiverCityId: '',
        receiverCountyId: '',
        paymentStatus: ''
      },
      requestParamsProvince: {}
    }
  },
  // 创建完毕状态，生命周期
  created() {
    this.orderStatusOptions = options // 订单状态
    this.pickUpTypeOptions = pickupoptions // 取件类型
    this.orderSearchFormData.status = this.$route.query.status ? Number(this.$route.query.status) : '' // 三元表达式判断是否有值
    var _this = this
    this.initialDate() // 初始化日期数据
    this.showcity() // 初始化省市区数据

    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.orderSearchFormData = {
          ..._this.orderSearchFormData,
          status:
            _this.orderSearchFormData.status === 0
              ? ''
              : _this.orderSearchFormData.status
        }
        _this.handleFilter(this.orderSearchFormData)
      }
    }
  },
  methods: {
    // 初始数据
    initialDate() {
      // 读取数据
      this.getList()
    },
    // 数据变化时触发，赋予数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取省
    async showcity() {
      this.requestParamsProvince.parentId = 0
      const { data: res } = await areaList(this.requestParamsProvince)
      this.provinceList = res
    },
    // 获取发件人地址
    async getSenderProvince(vId) {
      if (this.orderSearchFormData.senderProvinceId !== 0) {
        this.requestParamsProvince.parentId =
          this.orderSearchFormData.senderProvinceId
        const { data: res } = await areaList(this.requestParamsProvince)
        this.cityList = res
      }
      // 重置市区
      this.orderSearchFormData.senderCityId = ''
      // 新添加的
      this.orderSearchFormData.senderCountyId = ''
      if (vId !== '') {
        let obj = {}
        obj = this.provinceList.find((item) => {
          return item.id === vId
        })
        this.orderSearchFormData.senderProvinceId = obj.id
      }
    },
    // 参照权限写法，不敢改
    async getCity() {
      if (this.orderSearchFormData.senderProvinceId !== 0) {
        this.requestParamsProvince.parentId =
          this.orderSearchFormData.senderCityId
        const { data: res } = await areaList(this.requestParamsProvince)
        this.countryList = res
        this.orderSearchFormData.senderCountyId = ''
      }
    },
    // 获取市区ID
    getSenderCity(vId) {
      // TODO
      this.orderSearchFormData.senderCountyId = ''
      if (vId !== '') {
        let obj = {}
        obj = this.cityList.find((item) => {
          return item.id === vId
        })
        this.getCity()
        this.orderSearchFormData.senderCityId = obj.id
      }
    },
    // 新增县地址
    getArea() {
      if (this.orderSearchFormData.senderCountyId !== '') {
        let obj = {}
        obj = this.countryList.find((item) => {
          return item.id === this.orderSearchFormData.senderCountyId
        })
        this.orderSearchFormData.senderCountyId = obj.id
      }
    },
    // 获取收件人地址
    async getProvinceReceiver(vId) {
      if (this.orderSearchFormData.receiverProvinceId !== 0) {
        this.requestParamsProvince.parentId =
          this.orderSearchFormData.receiverProvinceId
        const { data: res } = await areaList(this.requestParamsProvince)
        this.receiverCityList = res
      }
      this.orderSearchFormData.receiverCityId = ''

      // TODO
      this.orderSearchFormData.receiverCountyId = ''
      if (vId !== '') {
        let obj = {}
        obj = this.provinceList.find((item) => {
          return item.id === vId
        })
        this.orderSearchFormData.receiverProvinceId = obj.id
      }
    },
    // 参照权限写法，不敢改
    async receiverCity() {
      if (this.orderSearchFormData.receiverProvinceId !== 0) {
        this.requestParamsProvince.parentId =
          this.orderSearchFormData.receiverCityId
        const { data: res } = await areaList(this.requestParamsProvince)
        this.countryReceiverList = res
        this.orderSearchFormData.receiverCountyId = ''
      }
    },
    // 获取市区ID
    getReceiverCity(vId) {
      // TODO
      this.orderSearchFormData.receiverCountyId = ''
      if (vId !== '') {
        let obj = {}
        obj = this.receiverCityList.find((item) => {
          return item.id === this.orderSearchFormData.receiverCityId
        })
        this.receiverCity()
        this.orderSearchFormData.receiverCityId = obj.id
      }
    },
    // 新增县地址
    getReceiverArea() {
      if (this.orderSearchFormData.receiverCountyId !== '') {
        let obj = {}
        obj = this.countryReceiverList.find((item) => {
          return item.id === this.orderSearchFormData.receiverCountyId
        })
        this.orderSearchFormData.receiverCountyId = obj.id
      }
    },
    // 获取订单列表数据
    async getList() {
      this.listLoading = true
      // 查询
      const { data: res } = await orderList(this.orderSearchFormData)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
    },
    // 重置
    resetForm(formData) {
      // this.getList()
      this.$refs[formData].resetFields()
      this.cityList = {}
      this.orderSearchFormData.page = 1
      this.orderSearchFormData.pageSize = 10
      this.orderSearchFormData.id = ''
      this.orderSearchFormData.status = ''
      this.orderSearchFormData.paymentStatus = ''
      this.orderSearchFormData.senderName = ''
      this.orderSearchFormData.senderPhone = ''
      this.orderSearchFormData.receiverName = ''
      this.orderSearchFormData.receiverPhone = ''

      this.orderSearchFormData.receiverCityId = ''
      this.orderSearchFormData.receiverCountyId = ''
      this.orderSearchFormData.receiverProvinceId = ''

      this.orderSearchFormData.senderProvinceId = ''
      this.orderSearchFormData.senderCityId = ''
      this.orderSearchFormData.senderCountyId = ''
      this.searchkey = false
      this.getList()
    },
    // 搜索信息
    handleFilter(opt) {
      this.orderSearchFormData = {
        ...this.orderSearchFormData,
        status:
          this.orderSearchFormData.status === 0
            ? ''
            : this.orderSearchFormData.status
        // page: opt === '查询' ? 1 : this.orderSearchFormData.page
      }
      this.orderSearchFormData.page = 1
      this.getList(this.orderSearchFormData)
      this.searchkey = true
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.orderSearchFormData.pageSize = val
      if (this.orderSearchFormData.page === 1) {
        this.getList(this.orderSearchFormData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.orderSearchFormData.page = val
      this.getList()
    },
    // 订单详情
    handleOrderDetail(id, status, pickupType, transportOrderId) {
      // eslint-disable-next-line object-curly-spacing
      this.$router.push({
        path: '/business/edit-order',
        query: { orderId: id, status: status, pickUpType: pickupType, transportOrderId }
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
</style>

<style lang="scss" scoped>
.order-list /deep/ .el-table td,
.el-table th {
  padding: 12px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  overflow: hidden;
}
</style>
