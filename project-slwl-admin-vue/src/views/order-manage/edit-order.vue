<!-- 订单详情 -->
<template>
  <div class="dashboard-container edit-order">
    <div class="app-container">
      <el-card
        shadow="never"
        class="order-box"
      >
        <el-row
          :gutter="24"
          justify="center"
        >
          <el-col
            :span="6"
            class="order-info"
          >
            <div class="ddbh">
              订单编号：
              <label>{{ orderDetails.orderId }}</label>
            </div>
          </el-col>
          <el-col
            :span="6"
            class="Waybill-info"
          >
            <div class="ydbh">
              运单编号：
              <label>{{ orderDetails.transportOrderId || '--' }}</label>
            </div>
          </el-col>
          <el-col
            :span="6"
            class="ordertime"
          >
            <div class="xdsj">
              下单时间：
              <label>{{ orderDetails.createTime || '--' }}</label>
            </div>
          </el-col>
          <el-col
            :span="6"
            class="orderstatus"
          >
            <div class="ddzt">
              订单状态：
              <label v-if="orderDetails.status == ' 23000'">待取件</label>
              <label v-else-if="orderDetails.status == '23001'">已取件</label>
              <label v-else-if="orderDetails.status == '23003'">网点入库</label>
              <label v-else-if="orderDetails.status == '23005'">运输中</label>
              <label v-else-if="orderDetails.status == '23004'">待装车</label>
              <label v-else-if="orderDetails.status == '23006'">网点出库</label>
              <label v-else-if="orderDetails.status == '23007'">待派送</label>
              <label v-else-if="orderDetails.status == '23008'">派送中</label>
              <label v-else-if="orderDetails.status == '23009'">已签收</label>
              <label v-else-if="orderDetails.status == '23010'">拒收</label>
              <label v-else>已取消</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="yjddrq">
              预计到达日期：
              <label>{{ orderDetails.estimatedArrivalTime || '--' }}</label>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <!-- 基本信息 -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="collapse-title">基本信息</div>
          </template>
          <div class="block">
            <el-timeline>
              <div class="line"></div>
              <div class="pake1 pake-info-detail">
                <img
                  class="img-info1"
                  src="../../assets/fahuo.png"
                  alt=""
                />
                <span>发货方</span>
              </div>
              <div class="Shipper">
                <div style="">
                  <div class="demo-input-suffix">
                    发货方姓名：
                    <span>{{ orderDetails.senderName }}</span>
                  </div>

                  <div class="demo-input-suffix">
                    发货方地址：
                    <span>{{
                      orderDetails.senderProvince +
                        orderDetails.senderCity +
                        orderDetails.senderCounty
                    }}</span>
                  </div>
                </div>
                <div class="suffixphone">
                  <div class="demo-input-suffix">
                    发货方电话：
                    <span>{{ orderDetails.senderPhone }}</span>
                  </div>
                  <div class="demo-input-suffix">
                    &nbsp;&nbsp;&nbsp;详细地址：
                    <span>{{ orderDetails.senderAddress }}</span>
                  </div>
                </div>
              </div>
              <div class="pake-infos pake-info-detail">
                <img
                  class="img-info2"
                  src="../../assets/shouhuo.png"
                  alt=""
                />
                <span class="pake-infos-text">收货方</span>
              </div>
              <div class="pake-infos-name">
                <div style="">
                  <div class="demo-input-suffix">
                    收货方姓名：

                    <span>{{ orderDetails.receiverName }}</span>
                  </div>

                  <div class="demo-input-suffix">
                    收货方地址：
                    <span>{{
                      orderDetails.receiverProvince +
                        orderDetails.receiverCity +
                        orderDetails.receiverCounty
                    }}</span>
                  </div>
                </div>
                <div class="pake-infos-phone">
                  <div class="demo-input-suffix">
                    收货方电话：

                    <span>{{ orderDetails.receiverPhone }}</span>
                  </div>
                  <div class="demo-input-suffix">
                    &nbsp;&nbsp;&nbsp;详细地址：
                    <span>{{ orderDetails.receiverAddress }}</span>
                  </div>
                </div>
                <!-- 原来地图位置 -->
              </div>
              <!-- 现在地图位置 -->
              <div class="pake-info-juli">
                <img
                  src="@/assets/juli.png"
                  alt=""
                  style="
                    width: 15px;
                    height: 18px;
                    vertical-align: middle;
                    margin-top: 2px;
                  "
                />
                <span class="pake-info-juli-text">距离：</span>
                <span
                  class="pake-info-juli-texts"
                  v-html="juli"
                ></span>
              </div>
              <!-- 备注 -->
              <div class="pake-info-remarks">
                <span class="pake-info-remarks-text">备注：</span>
                <span class="pake-info-remarks-texts">
                  <!-- 如果没有数据显示暂无 -->
                  {{ orderDetails.remark ? orderDetails.remark : '暂无' }}
                </span>
              </div></el-timeline>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 订单跟踪 -->
      <el-collapse
        v-if="this.$route.query.transportOrderId"
        v-model="activeNames"
        class="order-collapse"
      >
        <el-collapse-item name="2">
          <template slot="title">
            <div class="collapse-detail">订单跟踪</div>
          </template>
          <el-scrollbar
            scroll-x
            class="order-scroll"
          >
            <div class="logistics-orderInfo">
              <div
                v-for="(item, index) in logisticsInfo"
                :key="index"
                class="logistics-orderInfo-item"
                :class="[index === 0 ? 'active' : '']"
              >
                <div class="logistics-orderInfo-left">
                  <div
                    v-if="['已拒收', '已签收', '已取件'].includes(item.status)"
                    class="circle gray"
                  >
                    {{
                      item.status === '已拒收'
                        ? '拒'
                        : item.status === '已签收'
                          ? '签'
                          : '取'
                    }}
                  </div>

                  <div
                    v-else-if="
                      (index === 0 &&
                        ['运送中', '派送中'].includes(item.status)) ||
                        (index > 0 &&
                        logisticsInfo[index - 1].status !== '运送中')
                    "
                    class="circle gray"
                  >
                    <img
                      v-if="item.status === '派送中'"
                      src="../../assets/paisong.png"
                    />
                    <img
                      v-else
                      src="../../assets/yunshuzhong.png"
                    />
                  </div>

                  <div
                    v-else-if="
                      index > 0 && logisticsInfo[index - 1].status === '运送中'
                    "
                    class="circle gray"
                  >
                    <img
                      v-if="item.status === '派送中'"
                      src="../../assets/paisong.png"
                    />
                    <img
                      v-else
                      src="../../assets/yunshuzhong.png"
                    />
                  </div>
                  <div
                    v-if="index !== 0"
                    class="line"
                    :class="item.status === '运送中' ? 'short' : ''"
                  ></div>
                </div>
                <div class="logistics-orderInfo-right">
                  <div class="status">
                    {{ item.status }}
                  </div>
                  <div class="time">{{ item.created }}</div>
                  <div
                    class="desc"
                    :class="
                      index === 0 || item.status === 23010 ? 'active' : ''
                    "
                    v-html="item.info"
                  >
                    {{ item.info }}
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </el-collapse-item>
      </el-collapse>
      <!-- 订单轨迹 -->
      <el-collapse
        v-if="this.$route.query.transportOrderId"
        v-model="activeNames"
        class="maps"
      >
        <el-collapse-item name="3">
          <template slot="title">
            <div class="collapse-detail">订单轨迹</div>
          </template>
          <baidu-map
            class="mapsClass"
            :center="center"
            :zoom="zoom"
            :scroll-wheel-zoom="scrollWheelZoom"
            @ready="ready"
          >
            <!-- 起始地 -->
            <bm-marker
              v-if="points.length"
              :position="points[0]"
              :dragging="false"
              :icon="{
                url: 'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/6fb8993f-98fb-4474-80a9-6a7bfb0ffd68.png',
                size: { width: 21, height: 20 }
              }"
            >
            </bm-marker>
            <!-- 目的地 -->
            <bm-marker
              v-if="points.length"
              :position="points[points.length - 1]"
              :dragging="false"
              :icon="{
                url: 'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/9d63e5a1-209f-44f3-a1af-5602832849bf.png',
                size: { width: 21, height: 20 }
              }"
            >
            </bm-marker>
            <!-- 快递员 -->
            <bm-marker
              v-if="orderLineStatus === 3"
              :position="carLocation"
              :dragging="false"
              :icon="{
                url: 'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/b3ab7f06-8b95-45ac-b4d9-41745c0c1b85.png',
                size: { width: 63, height: 63 }
              }"
            >
            </bm-marker>
            <!-- 小车坐标 -->
            <bm-marker
              v-if="orderLineStatus === 2"
              :position="carLocation"
              :dragging="false"
              :icon="{
                url: 'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/bc1130ca-93ec-45d5-9dae-12c930b9d1e0.png',
                size: { width: 40, height: 41 }
              }"
            >
            </bm-marker>

            <bm-overlay
              v-if="orderLineStatus === 3"
              pane="labelPane"
              class="sample"
              @draw="drawCourier"
            >
              <div class="courier">快递员上门中</div>
            </bm-overlay>

            <bm-overlay
              pane="labelPane"
              class="sample"
              @draw="drawStart"
            >
              <div class="startPoint">
                <div class="content">起始地</div>
                <div class="name">{{ senderAreaName }}</div>
              </div>
            </bm-overlay>

            <bm-overlay
              pane="labelPane"
              class="sample"
              @draw="drawEnd"
            >
              <div class="endPoint">
                <div class="content">目的地</div>
                <div class="name">{{ receiverAreaName }}</div>
              </div>
            </bm-overlay>
            <bm-polyline
              :path="this.haveDriveredLine"
              stroke-color="blue"
              :stroke-opacity="1"
              :stroke-weight="5"
              :editing="false"
            ></bm-polyline>
            <bm-polyline
              :path="this.notHaveDriveredLine"
              stroke-color="blue"
              :stroke-opacity="1"
              :stroke-weight="5"
              :editing="false"
              stroke-style="dashed"
            ></bm-polyline>
          </baidu-map>
        </el-collapse-item>
      </el-collapse>

      <!-- 取件信息 -->
      <el-collapse
        v-model="activeNames"
        class="pickup"
      >
        <el-collapse-item name="4">
          <template slot="title">
            <div class="collapse-title">取件信息</div>
          </template>
          <el-row
            :gutter="24"
            justify="center"
          >
            <el-col :span="6">
              <div class="szwd">
                所在网点：
                <label>{{ orderDetails.agencyName }}</label>
              </div> </el-col>·
            <el-col
              :span="6"
              class="pickup-type"
            >
              <div class="qjlx">
                取件类型：
                <label>{{ orderDetails.pickupType }}</label>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="zyzt">
                作业状态：
                <label>{{ orderDetails.zystatus }}</label>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="qjkdy">
                取件快递员：
                <label>{{ orderDetails.courierName }}</label>
              </div>
            </el-col>
          </el-row>
          <el-row
            :gutter="18"
            justify="center"
          >
            <el-col :span="6">
              <div class="kdydh">
                快递员电话：
                <label>{{ orderDetails.courierMobile }}</label>
              </div>
            </el-col>
            <el-col
              :span="6"
              class="pickup-type-time"
            >
              <div class="yjqjrq">
                预计取件时间：
                <label>{{ orderDetails.estimatedStartTime }}</label>
              </div>
            </el-col>
            <el-col
              :span="6"
              class="Pickup-completed-time"
            >
              <div class="qjwcsj">
                取件完成时间：
                <label>{{ orderDetails.actualEndTime }}</label>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <!-- 派送信息 -->
      <el-collapse
        v-if="orderDetails.taskDispatch"
        v-model="activeNames"
        class="delivery"
      >
        <el-collapse-item name="5">
          <template slot="title">
            <div class="collapse-detail">派送信息</div>
          </template>
          <el-row
            :gutter="20"
            justify="center"
          >
            <el-col :span="6">
              <div class="szwd">
                所在网点：
                <label>{{ orderDetails.psagencyName || '--' }}</label>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="pszyzt">
                作业状态：
                <label>{{ orderDetails.pszystatus || '--' }}</label>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="pskdy">
                派送快递员：
                <label>{{ orderDetails.pscourierName || '--' }}</label>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="kdydh">
                快递员电话：
                <label>{{ orderDetails.pscourierMobile || '--' }}</label>
              </div>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            justify="center"
          >
            <el-col :span="6">
              <div class="yjqjrq">
                预计派送时间：
                <label>{{ orderDetails.psestimatedStartTime || '--' }}</label>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="qjwcsj">
                派件完成时间：
                <label>{{ orderDetails.psactualEndTime || '--' }}</label>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <!-- 拒收派件信息 -->
      <el-collapse
        v-if="orderDetails.taskRejectionDispatch"
        v-model="activeNames"
        class="rejection-delivery"
      >
        <el-collapse-item name="6">
          <template slot="title">
            <div class="collapse-detail">拒收派件信息</div>
          </template>
          <el-row
            :gutter="20"
            justify="center"
          >
            <el-col :span="6">
              <div class="szwd">
                所在网点：
                <label>{{
                  orderDetails.taskRejectionDispatchAgencyName || '--'
                }}</label>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="zyzt">
                作业状态：
                <label>{{ orderDetails.jsstatus || '--' }}</label>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="qjkdy">
                派件快递员：
                <label>{{ orderDetails.jscourierName || '--' }}</label>
              </div>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            justify="center"
          >
            <el-col :span="6">
              <div class="kdydh">
                快递员电话：
                <label>{{ orderDetails.jscourierMobile || '--' }}</label>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="yjqjrq">
                预计取件时间：
                <label>{{ orderDetails.jsestimatedStartTime || '--' }}</label>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="qjwcsj">
                取件完成时间：
                <label>{{ orderDetails.jsactualEndTime || '--' }}</label>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <!-- 费用信息 -->
      <el-collapse
        v-model="activeNames"
        style="margin-top: 20px; border: none !important"
      >
        <el-collapse-item name="7">
          <template slot="title">
            <div class="collapse-title">费用信息</div>
          </template>
          <div class="const-content">
            <div class="cost-message">
              运费：
              <span class="cost">{{ orderDetails.amount }}</span><span>元</span>
            </div>
            <div class="cost-message">
              支付方式：
              <span>{{
                orderDetails.paymentMethod === 1 ? '预结' : '到付'
              }}</span>
            </div>
            <div class="cost-message">
              付款状态：
              <span>{{
                orderDetails.paymentStatus === 1 ? '未付' : '已付'
              }}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 货品信息 -->
      <el-collapse
        v-model="activeNames"
        class="customer-table-box"
      >
        <el-collapse-item name="8">
          <template slot="title">
            <div class="collapse-title">货品信息</div>
          </template>
          <el-button
            v-if="pickupType == 1"
            class="add-goods"
            @click="handleAdd"
          >+新增</el-button>
          <div style="box-sizing: border-box">
            <el-table
              :data="propTableData.col"
              style="width: 100%"
              stripe
              :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
              show-summary
            >
              <el-table-column
                label="序号"
                type="index"
                align="left"
                width="60"
              />
              <el-table-column label="货品名称">
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-input
                      v-model="scope.row.name"
                      clearable
                      size="mini"
                      placeholder="请输入"
                    />
                  </span>
                  <span v-else>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="货品类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-select
                      v-model="scope.row.goodsType"
                      value-key="id"
                      placeholder="请选择"
                      style="width: 100px outline:none"
                      clearable
                      size="mini"
                    >
                      <el-option
                        v-for="item in hpOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item"
                      />
                    </el-select>
                  </span>
                  <span v-if="!scope.row.isSet && scope.row.goodsType">
                    <span>{{ scope.row.goodsType.name }}</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="重量（千克）"
                prop="totalWeight"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-input
                      v-model="scope.row.totalWeight"
                      clearable
                      size="mini"
                      placeholder="请输入"
                    />
                  </span>
                  <span v-else>{{ scope.row.totalWeight }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="体积（立方）"
                prop="totalVolume"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-input
                      v-model="scope.row.totalVolume"
                      clearable
                      size="mini"
                      placeholder="请输入"
                    />
                  </span>
                  <span v-else>{{ scope.row.totalVolume }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="170px"
              >
                <template slot-scope="scope">
                  <el-link
                    v-if="!scope.row.isSet"
                    :underline="false"
                    size="mini"
                    type="primary"
                    round
                    plain
                    @click="valChange(scope.row, scope.$index, true)"
                  >编辑</el-link>
                  <el-link
                    v-else
                    :underline="false"
                    size="mini"
                    type="primary"
                    round
                    plain
                    @click="valChange(scope.row, scope.$index, true)"
                  >保存</el-link>
                  <el-link
                    v-if="!scope.row.isSet"
                    :underline="false"
                    size="mini"
                    type="danger"
                    round
                    plain
                    @click="handleDelete(scope.$index, scope.row)"
                  >
                    <el-divider direction="vertical" />删除
                  </el-link>
                  <el-link
                    v-else
                    :underline="false"
                    size="mini"
                    type="danger"
                    round
                    plain
                    @click="valChange(scope.row, scope.$index, false)"
                  >
                    <el-divider direction="vertical" />取消
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div
        class="backbutton"
      >
        <el-button
          v-if="pickupType == 1"
          style="width: 110px"
          type="warning"
          @click="handelSub()"
        >保存</el-button>
      </div>
    </div>
    <orderMapsDialog
      ref="orderMaps"
      :title-info="titleInfo"
      :form-base="formData"
      @newDataes="getList"
    />
  </div>
</template>
<script>
import { orderDetail, updateOrder, getOrderTrackApi } from '@/api/order'
import { carGoList, carGoAdd, carGoDel, carGoEdit } from '@/api/cargo'
import { goodsTypeCommonList } from '@/api/common'
import orderMapsDialog from './components/show-order-maps'

export default {
  components: {
    orderMapsDialog
  },
  data () {
    return {
      startPoing: {
        url: '../../assets/startPoint.png'
      },
      // 订单轨迹相关
      scrollWheelZoom: true,
      zoom: 6,
      center: {
        lng: 116.404,
        lat: 39.915
      },
      carLocation: {
        // 起始地的中国矿业大学
        lng: 116.267889,
        lat: 40.159276
      },
      // 规划的线路上离小车最近的点
      linePoint: {},
      haveDriveredLine: [],
      // 还未行驶的路线
      notHaveDriveredLine: [],
      points: [], // 规划的全程的路线
      //
      logisticsInfo: [], // 运输流信息
      goodsItemId: '', // 用于存储编辑货品的ID
      name: '1',
      juli: '',
      readonly: true,
      disabledAmount: true,
      disabledPaymentMethod: true,
      disabledPaymentStatus: true,
      requestParameters: {
        orderId: ''
      },
      titleInfo: {
        pageTitle: '',
        text: ''
      },
      formData: {
        startLat: '',
        startLng: '',
        endLat: '',
        endLng: ''
      },
      hpOptions: [],
      // 支付方式
      paymentMethodOptions: [
        {
          id: 1,
          name: '预结'
        },
        {
          id: 2,
          name: '到付'
        }
      ],
      // 付款状态
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
      // 订单详情
      orderDetails: {
        orderId: '',
        transportOrderId: '',
        createTime: '',
        status: '',
        mark: '',
        senderName: '',
        senderPhone: '',
        senderAddress: '',
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        paymentMethod: '',
        paymentStatus: '',
        goodsTypeId: '',
        goodsTypeName: '',
        receiverProvince: '',
        receiverCity: '',
        receiverCounty: '',
        senderProvince: '',
        senderCity: '',
        senderCounty: '',
        amount: '',
        agencyName: '',
        courierName: '',
        courierMobile: '',
        estimatedStartTime: '',
        actualEndTime: '',
        pickupType: '',
        zystatus: '',
        estimatedArrivalTime: ''
      },
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '8'],
      zyzt: '网点自寄',
      input3: '',
      propTableData: {
        sel: null,
        col: []
      },
      senderAreaName: '', // 始发地名称
      receiverAreaName: '', // 目的地名称
      orderLineStatus: ''// 订单轨迹状态
    }
  },
  // 生命周期
  created () {
    this.orderId = this.$route.query.orderId
    this.pickupType = this.$route.query.status
    if (this.pickupType === 1) {
      this.disabledAmount = false
      this.disabledPaymentMethod = false
      this.disabledPaymentStatus = false
    } else {
      this.disabledAmount = true
      this.disabledPaymentMethod = true
      this.disabledPaymentStatus = true
    }
    this.getList(this.orderId)
    this.getCarGoList(this.orderId)
  },
  methods: {
    // 快递员轨迹
    drawCourier ({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(this.carLocation)
      if (pixel) {
        el.style.left = pixel.x - 70 + 'px'
        el.style.top = pixel.y - 80 + 'px'
      }
    },
    // 起始地
    drawStart ({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(this.points[0])
      if (pixel) {
        el.style.left = pixel.x - 60 + 'px'
        el.style.top = pixel.y - 60 + 'px'
      }
    },
    // 终点
    drawEnd ({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(this.points[this.points.length - 1])
      if (pixel) {
        el.style.left = pixel.x - 60 + 'px'
        el.style.top = pixel.y - 60 + 'px'
      }
    },
    // 获取订单轨迹
    async getOrderTrack () {
      const { data: res } = await getOrderTrackApi(
        this.$route.query.transportOrderId
      )
      this.points = res.pointList
      this.carLocation = res.lastPoint
      this.orderLineStatus = res.status

      if (res.status === 1) {
        // 没有上报的坐标点，规划路线均为虚线
        this.notHaveDriveredLine = res.pointList
        // 根据坐标点自动调整地图的中心点和地图缩放等级
        const viewPointInfo =
          this.map && this.map.getViewport([...this.points])
        this.zoom = viewPointInfo.zoom
        this.center = viewPointInfo.center
      } else if (res.status === 2) {
        // 有上报的坐标点，并且是在运输状态,显示小车
        this.findPoint()
        const viewPointInfo =
          this.map && this.map.getViewport([...this.points, this.carLocation])
        this.zoom = viewPointInfo.zoom
        this.center = viewPointInfo.center
      } else if (res.status === 3) {
        // 有上报的坐标点，并且是在派件状态,显示快递员
        this.findPoint()
        const viewPointInfo =
          this.map && this.map.getViewport([this.points[this.points.length - 1], this.carLocation])
        this.zoom = viewPointInfo.zoom
        this.center = viewPointInfo.center
      } else {
        // 整个流程结束，规划路线均为实线
        this.haveDriveredLine = res.pointList
        // 根据坐标点自动调整地图的中心点和地图缩放等级
        const viewPointInfo =
          this.map && this.map.getViewport([...this.points])
        this.zoom = viewPointInfo.zoom
        this.center = viewPointInfo.center
      }
    },
    // 计算两个坐标点之间的距离
    GetDistance (lat1, lng1, lat2, lng2) {
      var radLat1 = (lat1 * Math.PI) / 180.0
      var radLat2 = (lat2 * Math.PI) / 180.0
      var a = radLat1 - radLat2
      var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) *
            Math.cos(radLat2) *
            Math.pow(Math.sin(b / 2), 2)
          )
        )
      s = s * 6378.137 // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000
      return s
    },
    // 根据一个坐标点找出数组中离该坐标点最近的点
    findPoint () {
      const distanceList = []
      let pointIndex = null
      this.points.map((item) => {
        distanceList.push(
          this.GetDistance(
            item.lat,
            item.lng,
            this.carLocation.lat,
            this.carLocation.lng
          )
        )
      })
      // 找出数组中最小的值
      const minNum = Math.min(...distanceList)
      pointIndex = distanceList.indexOf(minNum)
      this.linePoint = this.points[pointIndex]
      this.haveDriveredLine = this.points.slice(0, pointIndex)
      this.notHaveDriveredLine = this.points.slice(
        pointIndex,
        this.points.length - 1
      )
    },
    // 组件注入map实例
    ready ({ BMap, map }) {
      this.map = map
      this.BMap = BMap
      if (this.$route.query.transportOrderId) this.getOrderTrack()
    },
    // 获取订单详情
    async getList (orderId) {
      const { data: res } = await orderDetail(orderId)
      this.senderAreaName = res.senderCity.name
      this.receiverAreaName = res.receiverCity.name
      this.logisticsInfo =
        res.transportOrderPointVOS == null
          ? []
          : res.transportOrderPointVOS.reverse()
      this.orderDetails.orderId = res.id
      this.orderDetails.createTime = res.createTime
      this.orderDetails.estimatedArrivalTime = res.estimatedArrivalTime
      this.orderDetails.status = res.status
      this.orderDetails.senderName = res.senderName
      this.orderDetails.senderPhone = res.senderPhone
      this.orderDetails.senderAddress = res.senderAddress
      this.orderDetails.receiverName = res.receiverName
      this.orderDetails.receiverPhone = res.receiverPhone
      this.orderDetails.receiverAddress = res.receiverAddress
      this.orderDetails.paymentMethod = res.paymentMethod
      this.orderDetails.paymentStatus = res.paymentStatus
      this.orderDetails.mark = res.mark
      if (res.receiverProvince != null) {
        this.orderDetails.receiverProvince = res.receiverProvince.name
      }
      // eslint-disable-next-line eqeqeq
      if (res.pickupType == 1) {
        this.orderDetails.pickupType = '网点自寄'
      } else {
        this.orderDetails.pickupType = '上门取件'
      }
      if (res.receiverCity != null) {
        this.orderDetails.receiverCity = res.receiverCity.name
      }
      if (res.receiverCounty != null) {
        this.orderDetails.receiverCounty = res.receiverCounty.name
      }
      this.orderDetails.amount = res.amount
      if (res.senderProvince != null) {
        this.orderDetails.senderProvince = res.senderProvince.name
      }
      if (res.receiverCity != null) {
        this.orderDetails.senderCity = res.senderCity.name
      }
      if (res.receiverCounty != null) {
        this.orderDetails.senderCounty = res.senderCounty.name
      }
      if (res.taskPickup != null && res.taskPickup.agency != null) {
        this.orderDetails.agencyName = res.taskPickup.agency.name
      }
      if (res.taskPickup != null && res.taskPickup.courier != null) {
        this.orderDetails.courierName = res.taskPickup.courier.name
      }
      if (res.taskPickup != null && res.taskPickup.courier != null) {
        this.orderDetails.courierMobile = res.taskPickup.courier.mobile
      }
      if (res.taskPickup != null) {
        this.orderDetails.estimatedStartTime = res.taskPickup.estimatedStartTime
      }
      if (res.taskPickup != null) {
        this.orderDetails.actualEndTime = res.taskPickup.actualEndTime
      }
      if (res.transportOrder != null) {
        this.orderDetails.transportOrderId = res.transportOrder.id
      }
      // 派送信息
      if (res.taskDispatch !== null) {
        this.orderDetails.taskDispatch = { ...res.taskDispatch }
        if (res.taskDispatch.agency !== null) {
          this.orderDetails.psagencyName = res.taskDispatch.agency.name
        }
        if (res.taskDispatch.courier !== null) {
          this.orderDetails.pscourierName = res.taskDispatch.courier.name
          this.orderDetails.pscourierMobile = res.taskDispatch.courier.mobile
        }
        if (res.taskDispatch && res.taskDispatch.status === 1) {
          this.orderDetails.pszystatus = '新任务'
        } else if (res.taskDispatch && res.taskDispatch.status === 2) {
          this.orderDetails.pszystatus = '已完成'
        } else if (res.taskDispatch && res.taskDispatch.status === 3) {
          this.orderDetails.pszystatus = '已取消'
        }
        this.orderDetails.psestimatedStartTime =
          res.taskDispatch.estimatedStartTime
        this.orderDetails.psactualEndTime = res.taskDispatch.actualEndTime
      }

      // 拒收派件信息
      if (res.taskRejectionDispatch !== null) {
        if (res.taskRejectionDispatch.agency !== null) {
          this.orderDetails.taskRejectionDispatchAgencyName =
            res.taskRejectionDispatch.agency.name
        }
        if (res.taskPickup.courier !== null) {
          this.orderDetails.jscourierName =
            res.taskRejectionDispatch.courier.name
          this.orderDetails.jscourierMobile =
            res.taskRejectionDispatch.courier.mobile
        }
        if (
          res.taskRejectionDispatch &&
          res.taskRejectionDispatch.status === 1
        ) {
          this.orderDetails.jsstatus = '新任务'
        } else if (
          res.taskRejectionDispatch &&
          res.taskRejectionDispatch.status === 2
        ) {
          this.orderDetails.jsstatus = '已完成'
        } else if (
          res.taskRejectionDispatch &&
          res.taskRejectionDispatch.status === 3
        ) {
          this.orderDetails.jsstatus = '已取消'
        }
        this.orderDetails.jsestimatedStartTime =
          res.taskRejectionDispatch.estimatedStartTime
        this.orderDetails.jsactualEndTime =
          res.taskRejectionDispatch.actualEndTime
        this.orderDetails.jspickupType = res.taskRejectionDispatch.pickupType
      }
      this.juli = res.distance + 'km'
      this.formData.startLat = res.senderCounty.lat
      this.formData.startLng = res.senderCounty.lng
      this.formData.endLat = res.receiverCounty.lat
      this.formData.endLng = res.receiverCounty.lng
      if (res.taskPickup != null) {
        if (res.taskPickup.status === 1) {
          this.orderDetails.zystatus = '新任务'
        } else if (res.taskPickup.status === 2) {
          this.orderDetails.zystatus = '已完成'
        } else if (res.taskPickup.status === 3) {
          this.orderDetails.zystatus = '已取消'
        }
      }
    },
    // 根据订单id获取货品类型
    async getCarGoList (orderId) {
      this.requestParameters.orderId = orderId
      const { data: res } = await carGoList(this.requestParameters)
      this.propTableData.col = res
    },
    // 新增货品
    async handleAdd () {
      this.goodsItemId = ''
      for (const i of this.propTableData.col) {
        if (i.isSet) {
          return this.Message('请先保存上次结果！', 'warning')
        }
      }
      const { data: res } = await goodsTypeCommonList()
      this.hpOptions = res.filter((obj) => obj.status === 1)
      const row = {
        name: '',
        quantity: '',
        goodsType: '',
        totalWeight: '',
        totalVolume: '',
        cargoBarcode: '',
        remark: '',
        isSet: true
      }
      this.propTableData.col.push(row)
      this.propTableData.sel = row
    },
    // 编辑货品
    async valChange (row, index, qx) {
      this.goodsItemId = row.id
      // 点击修改，判断是否已经保存所有操作
      for (const i of this.propTableData.col) {
        // eslint-disable-next-line eqeqeq
        if (i.isSet && i.id != row.id) {
          this.Message('请先保存数据!', 'warning')
          return false
        }
      }
      // 是否是取消操作
      if (!qx) {
        if (!this.propTableData.sel.id) {
          this.propTableData.col.splice(index, 1)
        }
        // 重新回到编辑之前的数据状态
        this.getCarGoList(this.orderId)
        return (row.isSet = !row.isSet)
      }
      // 保存货品
      if (row.isSet) {
        const v = this.propTableData.sel
        v.order = {
          id: this.orderId
        }
        if (v.name === '') {
          this.Message('货品名称不能为空!', 'warning')
        } else {
          const {
            cargoBarcode,
            name,
            quantity,
            remark,
            totalVolume,
            totalWeight,
            goodsType,
            order
          } = this.propTableData.sel
          const params = {
            cargoBarcode,
            name,
            quantity,
            totalVolume,
            remark,
            totalWeight,
            goodsTypeId: goodsType.id,
            orderId: order.id
          }
          await (this.goodsItemId
            ? carGoEdit(params, this.goodsItemId)
            : carGoAdd(params)
          ).then(() => {
            this.goodsItemId = ''
            this.$emit('confirm', this.propTableData.sel)
          })
          row.isSet = false
          this.getCarGoList(this.orderId)
        }
      } else {
        this.$set(row, 'isSet', true)
        this.propTableData.sel = row
        const { data: res } = await goodsTypeCommonList()
        this.hpOptions = res.filter((obj) => obj.status === 1)
      }
    },
    // 删除货品
    async handleDelete (index, row) {
      this.$confirm('确定要删除货品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          this.change(row.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 改变时触发的变化
    async change (id) {
      await carGoDel(id).then(() => {
        // 获取货品类型
        this.getCarGoList(this.orderId)
      })
    },
    // 提示框
    Message (msg, type) {
      this.$message({ type: type || 'info', message: msg })
    },
    // 提交订单
    async handelSub () {
      const data = {
        amount: this.orderDetails.amount,
        paymentMethod: this.orderDetails.paymentMethod,
        paymentStatus: this.orderDetails.paymentStatus,
        status: '23003'
      }
      await updateOrder(this.orderDetails.orderId, data)
      this.$message({
        message: '订单修改修改成功',
        type: 'success'
      })
      this.$router.push('/order-manage/list')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './index.scss';
</style>

