<!-- 运单详情 -->
<template>
  <div class="dashboard-container waybill-detail">
    <div class="app-container">
      <el-card
        shadow="never"
        class="order-box"
      >
        <el-row
          :gutter="20"
          justify="center"
        >
          <el-col :span="6">
            <div class="ddbh">
              订单编号：
              <label>{{ waybillDetailShow.orderId }}</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="ydbh">
              运单编号：
              <label>{{ waybillDetailShow.ydId }}</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="xdsj">
              下单时间：
              <label>{{ waybillDetailShow.createTime }}</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="ddzt">
              订单状态：
              <label v-if="waybillDetailShow.status == ' 23000'">待取件</label>
              <label
                v-else-if="waybillDetailShow.status == '23001'"
              >已取件</label>
              <label
                v-else-if="waybillDetailShow.status == '23003'"
              >网点入库</label>
              <label
                v-else-if="waybillDetailShow.status == '23004'"
              >待装车</label>
              <label
                v-else-if="waybillDetailShow.status == '23005'"
              >运输中</label>
              <label
                v-else-if="waybillDetailShow.status == '23006'"
              >网点出库</label>
              <label
                v-else-if="waybillDetailShow.status == '23007'"
              >待派送</label>
              <label
                v-else-if="waybillDetailShow.status == '23008'"
              >派送中</label>
              <label
                v-else-if="waybillDetailShow.status == '23009'"
              >已签收</label>
              <label
                v-else-if="waybillDetailShow.status == '23010'"
              >拒收</label>
              <label v-else>已取消</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="yjddrq">
              预计到达日期：
              <label>{{ waybillDetailShow.estimatedArrivalTime }}</label>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-collapse
        v-model="activeNames"
        style="margin-top: 20px; border: none"
      >
        <el-collapse-item name="1">
          <template slot="title">
            <div class="collapse-detail">基本信息</div>
          </template>
          <div class="block">
            <el-timeline>
              <div class="line"></div>
              <div
                class="pake-info"
                style="margin-top: 10px"
              >
                <img
                  class="img-info1"
                  src="../../assets/fahuo.png"
                  alt=""
                />
                <span>发货方</span>
              </div>
              <div style="margin-top: 0px; margin-left: 40px; display: flex">
                <div style="">
                  <div class="demo-input-suffix base-info">
                    发货方姓名：
                    <span>{{ waybillDetailShow.senderName }}</span>
                  </div>

                  <div class="demo-input-suffix base-info">
                    发货方地址：
                    <span>{{
                      waybillDetailShow.senderProvince +
                        waybillDetailShow.senderCity +
                        waybillDetailShow.senderCounty
                    }}</span>
                  </div>
                </div>
                <div style="margin-left: 174px">
                  <div class="demo-input-suffix base-info">
                    发货方电话：

                    <span>{{ waybillDetailShow.senderPhone }}</span>
                  </div>
                  <div class="demo-input-suffix base-info">
                    &nbsp;&nbsp;&nbsp;详细地址：

                    <span>{{ waybillDetailShow.senderAddress }}</span>
                  </div>
                </div>
              </div>
              <div
                class="pake-info"
                style="margin-top: 20px"
              >
                <img
                  class="img-info2"
                  src="../../assets/shouhuo.png"
                  alt=""
                />
                <span
                  style="display: inline-block; margin-top: 6px"
                >收货方</span>
              </div>
              <div style="margin-top: 0px; margin-left: 40px; display: flex">
                <div style="">
                  <div class="demo-input-suffix base-info">
                    收货方姓名：
                    <span>{{ waybillDetailShow.receiverName }}</span>
                  </div>

                  <div class="demo-input-suffix base-info">
                    收货方地址：
                    <span>{{
                      waybillDetailShow.receiverProvince +
                        waybillDetailShow.receiverCity +
                        waybillDetailShow.receiverCounty
                    }}</span>
                  </div>
                </div>
                <div style="margin-left: 174px">
                  <div class="demo-input-suffix base-info">
                    收货方电话：
                    <span>{{ waybillDetailShow.receiverPhone }}</span>
                  </div>
                  <div class="demo-input-suffix base-info">
                    &nbsp;&nbsp;&nbsp;详细地址：
                    <span>{{ waybillDetailShow.receiverAddress }}</span>
                  </div>
                </div>
              </div>
            </el-timeline>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-collapse
        v-model="activeNames"
        class="transport-box"
        style="margin-top: 20px"
      >
        <el-collapse-item name="6">
          <template slot="title">
            <div class="collapse-detail">运输信息</div>
          </template>
          <el-scrollbar
            scroll-x
            class="order-scroll"
          >
            <el-steps
              v-show="
                waybillDetailShow.taskTransports &&
                  waybillDetailShow.taskTransports.length > 0
              "
              shadow="never"
              align-center
              finish-status="success"
            >
              <el-step
                v-for="(item, index) in waybillDetailShow.taskTransports"
                :key="item.id"
                :class="{
                  lastBefore: !(
                    index !==
                    waybillDetailShow.taskTransports.length - 1 - 1
                  ),
                  solid:
                    item.status === 4 &&
                    index === waybillDetailShow.taskTransports.length - 1 - 1
                }"
                :title="item.startAgency === null ? '' : item.startAgency.name"
                :status="
                  item.status === 1
                    ? 'wait'
                    : item.status === 2
                      ? index === waybillDetailShow.taskTransports.length - 1 - 1
                        ? 'success'
                        : 'process'
                      : 'success'
                "
              >
                <template
                  v-if="index !== waybillDetailShow.taskTransports.length - 1"
                  slot="description"
                >
                  <div class="step-row">
                    <table
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      class="processing_content"
                    >
                      <tr>
                        <td>运输任务：</td>
                        <td class="num">
                          {{ item.id === null ? '--' : item.id }}
                        </td>
                      </tr>
                      <tr>
                        <td>车辆：</td>
                        <td>
                          {{
                            item.truck === null ? '--' : item.truck.licensePlate
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td>司机：</td>
                        <td>
                          {{
                            item.drivers === null
                              ? '--'
                              : item.drivers.map((item) => item.name).join(',')
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td>到达时间：</td>
                        <td>
                          {{
                            item.actualArrivalTime === null
                              ? '--'
                              : item.actualArrivalTime
                          }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </template>
              </el-step>
            </el-steps>
          </el-scrollbar>

          <empty
            v-show="
              !waybillDetailShow.taskTransports ||
                waybillDetailShow.taskTransports.length <= 0
            "
            src="@/assets/empty.png"
            desc="这里空空如也~"
          ></empty>
        </el-collapse-item>
      </el-collapse>
      <el-collapse
        v-model="activeNames"
        class="customer-table-box"
        style="margin-top: 20px; margin-bottom: 40px"
      >
        <el-collapse-item name="3">
          <template slot="title">
            <div class="collapse-detail">货品信息</div>
          </template>
          <div style="box-sizing: border-box">
            <el-table
              :data="propTableData.col"
              style="width: 100%"
              stripe
              :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
            >
              <div
                v-show="
                  (!propTableData.col || propTableData.col.length <= 0)
                "
                slot="empty"
              >
                <img
                  src="@/icons/pic-kong.png"
                  alt="img"
                  style="margin-top: 20px; width: 25%; height: 25%"
                />
                <p style="margin-top: -10px; padding-bottom: 10px">
                  这里空空如也
                </p>
              </div>
              <el-table-column
                label="序号"
                type="index"
                align="left"
                width="60"
              />
              <el-table-column label="货品名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.name || '--' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="货品类型">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.goodsType === null
                      ? '--'
                      : scope.row.goodsType.name
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="重量（千克）">
                <template slot-scope="scope">
                  <span>{{ scope.row.totalWeight || '--' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="体积（立方）">
                <template slot-scope="scope">
                  <span>{{ scope.row.totalVolume || '--' }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <waybillMapsDialog
      ref="wayBillMaps"
      :title-info="titleInfo"
      :form-base="formData"
    />
  </div>
</template>
<script>
import waybillMapsDialog from './components/show-waybill-maps'
import {
  waybillDetail
} from '@/api/waybill'
export default {
  components: {
    waybillMapsDialog
  },
  data() {
    return {
      logisticsInfo: [], // 运输流信息
      formData: {
        startLat: '',
        startLng: '',
        endLat: '',
        endLng: ''
      },
      wayId: '',
      orderId: '',
      titleInfo: {
        pageTitle: '',
        text: ''
      },
      activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      propTableData: {
        col: []
      },
      waybillDetailShow: {
        orderId: '',
        ydId: '',
        createTime: '',
        status: '',
        estimatedArrivalTime: '',
        senderName: '',
        senderPhone: '',
        senderAddress: '',
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        senderProvince: '',
        senderCity: '',
        senderCounty: '',
        receiverProvince: '',
        receiverCity: '',
        receiverCounty: '',
        amount: '',
        paymentMethod: '',
        paymentStatus: '',
        // 取件信息
        agencyName: '',
        courierName: '',
        pickupType: '',
        zystatus: '',
        courierMobile: '',
        estimatedStartTime: '',
        actualEndTime: '',
        // 派送信息
        psagencyName: '',
        pscourierName: '',
        pszystatus: '',
        pscourierMobile: '',
        psestimatedStartTime: '',
        psactualEndTime: '',
        taskTransports: [],
        taskDispatch: {}
      }
    }
  },
  created() {
    this.wayId = this.$route.query.id
    this.orderId = this.$route.query.orderId
    this.getList(this.wayId)
    this.getOrderLocusParams(this.orderId)
  },

  mounted() {
    this.$router.afterEach((to, form, next) => {
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    })
  },
  methods: {
    // 返回运单列表
    hadlleCancel() {
      history.go(-1)
    },
    // 获取运单详情
    async getList(wayId) {
      const { data: res } = await waybillDetail(wayId)
      this.waybillDetailShow.ydId = res.id
      this.waybillDetailShow.taskDispatch = res.taskDispatch
      this.waybillDetailShow.taskRejectionDispatch = res.taskRejectionDispatch
      this.waybillDetailShow.taskPickup = res.taskPickup
      // this.logisticsInfo = res.transportOrderPointVOS.reverse()
      // this.logisticsInfo = res.transportOrderPointVOS.reverse().concat(res.transportOrderPointVOS.reverse()).concat(res.transportOrderPointVOS.reverse())
      // 订单信息
      if (res.order != null) {
        this.waybillDetailShow.orderId = res.order.id
        this.waybillDetailShow.createTime = res.order.createTime
        this.waybillDetailShow.status = res.order.status
        this.waybillDetailShow.estimatedArrivalTime =
          res.order.estimatedArrivalTime
        this.waybillDetailShow.senderName = res.order.senderName
        this.waybillDetailShow.senderPhone = res.order.senderPhone
        this.waybillDetailShow.senderAddress = res.order.senderAddress
        this.waybillDetailShow.receiverName = res.order.receiverName
        this.waybillDetailShow.receiverPhone = res.order.receiverPhone
        this.waybillDetailShow.receiverAddress = res.order.receiverAddress
        this.waybillDetailShow.amount = res.order.amount
        this.propTableData.col = res.order.orderCargoDTOS
        if (res.paymentMethod === 1) {
          this.waybillDetailShow.paymentMethod = '预结'
        } else {
          this.waybillDetailShow.paymentMethod = '到付'
        }
        if (res.order.paymentStatus === 1) {
          this.waybillDetailShow.paymentStatus = '未付'
        } else {
          this.waybillDetailShow.paymentStatus = '已付'
        }
        if (res.senderProvince !== null) {
          this.waybillDetailShow.senderProvince = res.order.senderProvince.name
        }
        if (res.senderCity !== null) {
          this.waybillDetailShow.senderCity = res.order.senderCity.name
        }
        if (res.senderCounty !== null) {
          this.waybillDetailShow.senderCounty = res.order.senderCounty.name
        }
        if (res.receiverProvince !== null) {
          this.waybillDetailShow.receiverProvince =
            res.order.receiverProvince.name
        }
        if (res.receiverCity !== null) {
          this.waybillDetailShow.receiverCity = res.order.receiverCity.name
        }
        if (res.receiverCounty !== null) {
          this.waybillDetailShow.receiverCounty = res.order.receiverCounty.name
        }
        if (res.order.pickupType === 1) {
          this.waybillDetailShow.pickupType = '网点自寄'
        } else {
          this.waybillDetailShow.pickupType = '上门取件'
        }
        this.formData.startLat = res.order.senderCity.lat
        this.formData.startLng = res.order.senderCity.lng
        this.formData.endLat = res.order.receiverCity.lat
        this.formData.endLng = res.order.receiverCity.lng
      }
      // 运输信息
      if (res.taskTransports.length) {
        this.waybillDetailShow.taskTransports = res.taskTransports.reverse()
        this.waybillDetailShow.taskTransports.push(
          Object.assign(
            {},
            {
              startAgency: {
                name: this.waybillDetailShow.taskTransports[
                  this.waybillDetailShow.taskTransports.length - 1
                ].endAgency.name
              },
              status:
                this.waybillDetailShow.taskTransports[
                  this.waybillDetailShow.taskTransports.length - 1
                ].status
            }
          )
        )
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './waybill-detail.scss';
</style>
