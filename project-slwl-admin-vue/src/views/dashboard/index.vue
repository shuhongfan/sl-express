<!-- 工作台 -->
<template>
  <div
    class="dashboard-container"
  >
    <!-- 机构概述、今日数据 -->
    <el-row
      :gutter="24"
      class="dashboard-row"
      justify="center"
    >

      <el-col
        class="dashboard-col"
        :span="14"
      >
        <el-card class="box-card institution">
          <p
            class="institutionalOverview"
          >机构概述</p>
          <div class="content">
            <div class="left-content">
              <div class="name">{{ organOverview.organName }}</div>
              <div class="address">地址：{{ organOverview.organAddress }}</div>
              <div class="duty-people">负责人：{{ organOverview.principal }} {{ organOverview.phone }}</div>
              <div
                class="search-sales-department el-button el-button--warning is-plain"
                @click="showDepartment()"
              >
                查看营业部分布
              </div>
            </div>
            <div class="right-content">
              <div class="item">
                <div>
                  <div class="label">分拣中心(个)</div>
                  <div
                    class="num"
                    @click="()=>{
                      this.$router.push({
                        path: '/branches/organization-manage'
                      })
                    }"
                  >{{ organOverview.sortingCenterNumber }}</div>
                </div>
              </div>
              <div class="item">
                <div>
                  <div class="label">营业部(个)</div>
                  <div
                    class="num"
                    @click="()=>{
                      this.$router.push({
                        path: '/branches/organization-manage'
                      })
                    }"
                  >{{ organOverview.agencyNumber }}</div>
                </div>
              </div>
              <div class="item">
                <div>
                  <div class="label">司机人数(个)</div>
                  <div
                    class="num"
                    @click="()=>{
                      this.$router.push({
                        path: '/transit/driver'
                      })
                    }"
                  >{{ organOverview.driverNumber }}</div>
                </div>
              </div>
              <div class="item">
                <div>
                  <div class="label">快递员人数(个)</div>
                  <div
                    class="num"
                    @click="()=>{
                      this.$router.push({
                        path: '/branches/operational-range'
                      })
                    }"
                  >{{ organOverview.courierNumber }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col
        :span="10"
        class="dashboard-col2"
      >
        <el-card
          class="box-card right-info"
          :body-style="{ paddingTop: '21px', minHeight: '60px' }"
        >
          <div class="header">
            <p>今日数据</p>
            <div
              class="refresh-box"
              @click="handleRefreshTodayDataTime()"
            >
              {{ todayDataTime }}
            </div>
          </div>
          <el-row
            :span="24"
            type="flex"
            class="row-bg"
            justify="space-around"
          >
            <el-col :span="8">
              <div class="label">订单金额(元)</div>
              <div
                id="my-number1"
                class="value"
              >{{ todayData.orderAmount }}</div>
              <div
                class="bottom"
                :class="todayData.orderAmountChanges<=0?'active':''"
              >较昨日 {{ todayData.orderAmountChanges<=0? '-':"+" }}{{ todayData.orderAmountChanges }}</div>
            </el-col>
            <el-col :span="8">
              <div class="label">订单数量(笔)</div>
              <div
                id="my-number2"
                class="value"
              >{{ todayData.orderNumber }}</div>
              <div
                class="bottom"
                :class="todayData.orderNumberChanges<=0?'active':''"
              >较昨日 {{ todayData.orderNumberChanges<=0? '-':"+" }}{{ todayData.orderNumberChanges }}</div>
            </el-col>
            <el-col :span="8">
              <div class="label">运输任务(次)</div>
              <div
                id="my-number3"
                class="value"
              >{{ todayData.transportTaskNumber }}</div>
              <div
                class="bottom"
                :class="todayData.transportTaskNumberChanges<=0?'active':''"
              >较昨日 {{ todayData.transportTaskNumberChanges<=0? '-':"+" }}{{ todayData.transportTaskNumberChanges }}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 待办任务、执行中任务-->
    <el-row
      :gutter="24"
      class="dashboard-row2"
    >
      <el-col
        :span="14"
        class="dashboard-col3"
      >
        <el-card
          class="hots cover-card backlog notTasking"
        >
          <div class="header">
            <p
              class="todoTasks"
            >
              待办任务
              <el-tooltip
                class="tooltip item"
                effect="light"
                placement="bottom-start"
              >
                <div
                  slot="content"
                  class="todoTasks1"
                >
                  待取件率=待取件/(下单数量-取消数量)，且取件类型=上门取件<br />
                  待派送率=待派送/(待派送+派送中+已签收+拒收)<br />
                  未分配率=未分配/全部数据<br />
                  超时率=超时任务/(已完成+进行中+已取消）<br />
                </div>
                <img src="../../assets/explain.png" />
              </el-tooltip>
            </p>
            <div
              class="refresh-box"
              @click="handleRefreshNotTaskDataTime()"
            >
              {{ notTaskDataTime }}
            </div>
          </div>
          <div class="ball-chart-box">
            <BallChart
              id="ballChart"
              ref="ballChart"
              :data="backlogChartData"
              :x-distance="25"
            >

            </BallChart>
          </div>

          <div class="bottom-label">
            <div
              v-for="(item,index) in backlogListdata"
              :key="index"
              class="item"
              @click="handleBacklog(item.url,item.status)"
            >
              <span>{{ item.label }}</span> <span>{{ item.value }}</span>

            </div>
          </div>
        </el-card>
      </el-col>
      <el-col
        :span="10"
        class="dashboard-col4"
      >
        <el-card class="hots cover-card backlog tasking">
          <div class="header">
            <p
              class="Tasksinprogress"
            >
              执行中任务
              <el-tooltip
                class="tooltip item"
                effect="light"
                placement="bottom"
              >
                <div
                  slot="content"
                  class="toolipcontent"
                >
                  运输率=运输中/(全部订单-待取件-已取件-网点入库-待装车-已取消）<br />
                  派送率=派送中/(待派送+派送中+已签收+拒收）<br />
                </div>
                <img src="../../assets/explain.png" />
              </el-tooltip>
            </p>
            <div
              class="refresh-box"
              @click="handleRefreshTaskingDataTime()"
            >
              {{ taskingDataTime }}
            </div>
          </div>
          <div>
            <BallChart
              id="ballChartIng"
              ref="ballChartIng"
              :data="taskingChartData"
              :x-distance="48"
            >

            </BallChart>
          </div>
          <div class="bottom-label">
            <div
              v-for="(item,index) in taskingListData"
              :key="index"
              class="item"
              @click="handleBacklog(item.url,item.status)"
            >
              <span>{{ item.label }}</span> <span>{{ item.value }}</span>

            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 常用功能 -->
    <el-row
      :gutter="20"
      class="dashboard-row2"
      style="margin-bottom: 20px"
    >
      <el-col
        :xs="24"
        :sm="24"
        class="dashboard-col5"
      >
        <el-card class="hots cover-card useFeature">
          <p
            class="Commonfunctions"
          >常用功能</p>
          <div class="useFeaturelist">
            <div
              v-for="(item,index) in useFeatureList"
              :key="index"
              class="item"
              @click="handleClick(item.link)"
            >
              <img :src="item.url" />
              <p>{{ item.label }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 线路管理和运输任务 -->
    <el-row
      :gutter="24"
      class="dashboard-row2"
    >
      <el-col
        :span="12"
      >
        <el-card class="hots cover-card lineManage">
          <p
            class="LineManagement"
          >线路管理</p>
          <LineManageChart ref="lineManageChart"></LineManageChart>
        </el-card>
      </el-col>
      <el-col
        :span="12"
        class="dashboard-col4"
      >
        <el-card class="hots cover-card transport-task">
          <div class="header">
            <p>
              运输任务
            </p>
            <div
              class="search-more"
              @click="handleToTransportTask"
            >
              查看更多
            </div>
          </div>
          <div class="table_body">
            <div class="table_th">
              <div class="tr1 th_style">任务编号</div>
              <div class="tr2 th_style">起始地</div>
              <div class="tr3 th_style">目的地</div>
              <div class="tr4 th_style">车辆</div>
              <div class="tr4 th_style">任务状态</div>
            </div>
            <div
              class="table_main_body"
              @mousemove="handleStopScroll()"
              @mouseleave="handleStartScroll()"
            >
              <div
                class="table_inner_body"
                :class="!tableTop?'':'startTransition'"
                :style="{top: tableTop + 'px'}"
              >
                <div
                  v-for="(item,index) in transportTaskListData"
                  :key="index"
                  class="table_tr"
                >
                  <div class="tr1 tr">{{ item.id }}</div>
                  <div class="tr2 tr">{{ item.startAgency }}</div>
                  <div class="tr3 tr"> {{ item.endAgency }}</div>
                  <div class="tr4 tr">{{ item.licensePlate }}</div>
                  <div class="tr4 tr ">{{
                    item.status =='1'?'待执行':item.status == '2'?'进行中':item.status == '3'?'待确认':item.status == '4'?'已完成':'已取消'
                  }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 订单总量和订单分布 -->
    <el-row
      :gutter="24"
      class="dashboard-row2"
    >
      <el-col
        :span="12"
        class="dashboard-col3"
      >
        <el-card class="hots cover-card orderAccount">
          <div class="header">
            <p
              class="Totalorders"
            >
              订单总量
            </p>
            <div
              class="Totalorderstime"
            >
              {{ getMonthsBeforeSix() }}
            </div>
          </div>
          <p class="Totalorderstype">单位：笔</p>
          <div
            ref="orderStatic"
            class="order-static"
          >
            <div class="item">
              <div
                id="my-number4"
                class="num"
              >{{ orderAccountTitleData.orderMaxNumber }}</div>
              <div class="label">订单最高值</div>
            </div>
            <div class="item">
              <div
                id="my-number5"
                class="num"
              >{{ orderAccountTitleData.orderAverageNumber }}</div>
              <div class="label">订单平均值</div>
            </div>
            <div class="item">
              <div
                id="my-number6"
                class="num"
              >{{ orderAccountTitleData.orderMinNumber }}</div>
              <div class="label">订单最低值</div>
            </div>
          </div>
          <OrderAccountChart
            ref="orderAccountChart"
            :order-account-chart-y="orderAccountChartY"
            :order-account-chart-x="orderAccountChartX"
          ></OrderAccountChart>
        </el-card>

      </el-col>
      <el-col
        :span="12"
        class="dashboard-col4"
      >
        <el-card class="hots cover-card orderDistribute">
          <div class="header">
            <p
              class="Orderdistribution"
            >
              订单分布
            </p>
            <div
              class="Orderdistributiontime"
            >
              {{ getMonthsBeforeSix() }}
            </div>
          </div>
          <p
            class="Orderdistributiontype"
          >单位：笔</p>
          <OrderDistributeChart
            ref="orderDistributeChart"
          ></OrderDistributeChart>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      class="deparment"
    >
      <div
        class="close-btn"
        @click="handleClose"
      ></div>
      <img src="../../assets/department_map.png" />
    </el-dialog>
    <span class="gzt-remark">注：工作台展示数据为虚拟数据</span>
  </div>
</template>
<script>

import { dashboardData } from '@/api/common'
import BallChart from './components/ballChart.vue'
import LineManageChart from './components/lineManageChart.vue'
import OrderAccountChart from './components/orderAccountLineChart.vue'
import OrderDistributeChart from './components/orderDistributeChart.vue'
import { useFeatureList, backlogListdata, taskingListData } from './static'

export default {
  name: 'Dashboard',
  components: {
    BallChart,
    LineManageChart,
    OrderAccountChart,
    OrderDistributeChart
  },
  data () {
    return {
      tableTimerInterval: 2000,
      tableTimer: null,
      tableTop: 0,
      tableListSize: 0,
      visibleSize: 5,
      notTaskDataTime: '',
      taskingDataTime: '',
      todayDataTime: '',
      dialogVisible: false,
      transportTaskListData: [],
      notChangeTransportTaskListData: [],
      useFeatureList: useFeatureList,
      // 待办任务数据
      backlogListdata: backlogListdata,
      // 待办任务图表数据
      backlogChartData: [
        {
          value: 0
        },
        {
          value: 0
        },
        {
          value: 0
        },
        {
          value: 0
        }
      ],
      // 执行中任务初始化图表数据
      taskingChartData: [
        {
          value: 0
        },
        {
          value: 0
        }
      ],
      // 执行中任务数据
      taskingListData: taskingListData,
      // 机构概述
      organOverview: {
        organName: '',
        organAddress: '',
        principal: '',
        phone: '',
        sortingCenterNumber: '',
        agencyNumber: '',
        driverNumber: '',
        courierNumber: ''
      },
      // 今日数据
      todayData: {
        orderAmount: '',
        orderAmountChanges: '',
        orderNumber: '',
        orderNumberChanges: '',
        transportTaskNumber: '',
        transportTaskNumberChanges: ''
      },
      // 待办事项
      backlog: {
        waitingPickupNumber: '',
        waitingPickupRate: '',
        waitingDispatchNumber: '',
        waitingDispatchRate: '',
        unassignedTransportTaskNumber: '',
        unassignedTransportTaskRate: '',
        timeoutTransportTaskNumber: '',
        timeoutTransportTaskRate: ''
      },
      // 订单总量
      orderAccountTitleData: {
        orderMaxNumber: '',
        orderAverageNumber: '',
        orderMinNumber: ''
      },
      // 订单总量折线图Y轴数据
      orderAccountChartY: [],
      // 订单总量折线图X轴数据
      orderAccountChartX: [],
      isScrollNum: true
    }
  },
  computed: {}, // 计算属性
  // 生命周期
  mounted () {
    this.todayDataTime = this.getCurrentTime()
    this.taskingDataTime = this.getCurrentTime()
    this.notTaskDataTime =
      this.getCurrentTime() + ' - ' + this.getAfterThreeDays()
    this.getPageData()
    document.querySelector('.dashboard-container').addEventListener('scroll', this.load)
    // 监听浏览器窗口切换状态，用来优化页面切回来时列表迅速滚动的问题
    if (document.hidden !== undefined) {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          clearInterval(this.tableTimer)
        } else {
          this.tableActionFun()
        }
      })
    }
  },
  methods: {
    // load是初次加载的方法，只加载当前能看到的数据
    load () {
      if (!this.isScrollNum) {
        return
      }
      if (!!document.querySelector('.dashboard-container').scrollTop &&
        document.querySelector('.dashboard-container').scrollTop > 600) {
        this.isScrollNum = false
        this.addNumber(
          0,
          this.orderAccountTitleData.orderMaxNumber,
          'my-number4',
          300
        )
        this.addNumber(
          0,
          this.orderAccountTitleData.orderAverageNumber,
          'my-number5',
          300
        )
        this.addNumber(
          0,
          this.orderAccountTitleData.orderMinNumber,
          'my-number6',
          300
        )
      }
    },
    // 根据列表长度是否超过可视范围内能够显示的最大完整数据条数，来控制列表是否需要滚动
    tableActionFun () {
      this.tableListSize = this.transportTaskListData.length
      this.transportTaskListData = this.notChangeTransportTaskListData.concat(this.notChangeTransportTaskListData)// 此处重新赋值避免出现transportTaskListData无限累加造成DOM过多导致页面崩溃，echarts不会自动清理多次触发的DOM
      // 下面的visibleSize是可视范围内能够显示的最大完整数据条数
      if (this.tableListSize > this.visibleSize) {
        this.transportTaskListData = this.transportTaskListData.concat(
          this.transportTaskListData
        )
        this.tableTimerFun() // 列表滚动方法
      } else {
        // this.fillTableList() // 无需滚动时的数据填充方法，如果没必要，可以删掉
      }
    },
    // 停止滚动
    handleStopScroll () {
      clearInterval(this.tableTimer)
    },
    // 开始滚动
    handleStartScroll () {
      this.tableActionFun()
    },
    // 列表滚动方法
    tableTimerFun () {
      var count = 0
      this.tableTimer = setInterval(() => {
        if (count < this.transportTaskListData.length / 2) {
          this.tableTop -= 50
          count++
        } else {
          count = 0
          this.tableTop = 0
        }
      }, this.tableTimerInterval)
    },
    // 关闭弹窗
    handleClose () {
      this.dialogVisible = false
    },
    // 展示营业部分布
    showDepartment () {
      this.dialogVisible = true
    },
    // 处理待办事项跳转
    handleBacklog (url, status) {
      this.$router.push({
        path: url + status
      })
    },
    // 获取当前月份之前6个月的时间节点
    getMonthsBeforeSix () {
      const date = new Date() // 获取当前时间
      const year = date.getFullYear() // 获取当前年份
      const month = date.getMonth() // 获取当前月份
      let newYear = 0 // 用于存储年份
      let newMonth = 0 // 用于存储月份
      const newDateArr = []
      for (let i = 0; i < 6; i++) {
        // 这里是获取前六个月,所以循环6次,根据需要修改
        if (month - i < 1) {
          // 这里的判断是如果当前月份往前推到了去年需要做的处理
          newYear = year - 1
          newMonth =
            month - i + 12 >= 10 ? month - i + 12 : '0' + (month - i + 12) // nonth - i + 12>=10是为了处理月份为10,11,12的情况,当月份为1-9时,前面需要加0所以需要用三元运算符判断
          newDateArr.push(newYear + '-' + newMonth) // 这里拼接格式化,在时间中间加了个-,根据实际需求来
        } else {
          newMonth = month - i >= 10 ? month - i : '0' + (month - i) // 这里是对月份小于10做加前面加0处理
          newDateArr.push(year + '-' + newMonth)
        }
      }
      return newDateArr[5] + ' - ' + newDateArr[0]
    },
    // 获取前三天时间节点
    getAfterThreeDays () {
      const date = new Date(new Date().getTime() + 172800000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-'
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      const D =
        (date.getDate() < 10
          ? '0' + (date.getDate())
          : date.getDate()) + ' '
      return Y + M + D + '23' + ':' + '59'
    },
    // 待办任务刷新
    handleRefreshNotTaskDataTime () {
      this.notTaskDataTime =
        String(this.getCurrentTime()) +
        ' - ' +
        String(this.getAfterThreeDays())
    },
    // 今日数据刷新
    handleRefreshTodayDataTime () {
      this.todayDataTime = this.getCurrentTime()
    },
    // 执行中任务刷新
    handleRefreshTaskingDataTime () {
      this.taskingDataTime = this.getCurrentTime()
    },
    // 获取当前时间节点
    getCurrentTime () {
      var date = new Date() // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '

      var h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      return Y + M + D + h + m
    },
    // 获取页面数据
    getPageData () {
      dashboardData().then((res) => {
        this.organOverview = res.data.organOverview
        this.todayData = res.data.todayData
        this.addNumber(0, res.data.todayData.orderAmount, 'my-number1', 25)
        this.addNumber(0, res.data.todayData.orderNumber, 'my-number2', 2)
        this.addNumber(
          0,
          res.data.todayData.transportTaskNumber,
          'my-number3',
          1
        )
        this.dealWithBacklogChartData(res)
        this.dealWithTaskingListData(res)
        this.transportTaskListData = res.data.transportTaskList // 运输任务
        this.notChangeTransportTaskListData = res.data.transportTaskList
        this.orderAccountTitleData = res.data.orderLineChart // 近期订单总量
        // 对订单总量折线图Y轴数据接受的数据进行处理，使其显示正确的数据
        this.orderAccountChartY = res.data.orderLineChart.monthlyOrderList.map(
          (item) => {
            return item.dateTime
          }
        )
        // 对订单总量折线图X轴数据接受的数据进行处理，使其显示正确的数据
        this.orderAccountChartX = res.data.orderLineChart.monthlyOrderList.map(
          (item) => {
            return item.orderNumber
          }
        )
        // 等待数据更新完成后再执行
        this.$nextTick(() => {
          this.$refs.ballChart.initial()
          this.$refs.ballChartIng.initial()
          this.$refs.lineManageChart.initial()
          this.$refs.orderAccountChart.initial()
          this.$refs.orderDistributeChart.initial()
          this.tableActionFun()
        })
      })
    },
    // 跳转到运输任务列表
    handleToTransportTask () {
      this.$router.push({
        path: '/transport/transport-task'
      })
    },
    // 常用功能点击
    handleClick (link) {
      this.$router.push({
        path: link
      })
    },
    // 整理执行中任务数据符合传参要求
    dealWithTaskingListData(res) {
      // 创建数组接收执行中任务数的数据。把云端返回的数据拼接入其中
      const taskingChartArr = [
        res.data.todayData.taskInTransitNumber, // 运输中任务数
        res.data.todayData.taskInDeliveryNumber// 派送中任务数
      ]
      const ColorList = ['#E15536', '#FFC257'] // 链群颜色值
      const LabelColorList = ['#20232A', '#20232A'] // 文本字体颜色
      const OtherColorList = ['#FFE5E0', '#FFF1D9'] // 波浪其他地方填充色
      // 改变taskingListData的数据，使其显示正确的数据
      this.taskingListData = this.taskingListData.map((item, index) => {
        return Object.assign({}, item, {
          value: taskingChartArr[index]
        })
      })
      // 创建数组接收执行中任务比率的数据。把云端返回的数据拼接入其中
      const taskingChartArrBottom = [
        res.data.todayData.taskInTransitRate, // 运输中任务比率
        res.data.todayData.taskInDeliveryRate// 派送中任务比率
      ]
      // 对taskingChartData的数据进行处理，成为一个符合echarts图表数据格式的数组，将taskingChartArrBottom的值拼接赋入其中
      this.taskingChartData = this.taskingChartData.map((item, index) => {
        return {
          value: taskingChartArrBottom[index],
          color: ColorList[index],
          labelColor: LabelColorList[index],
          otherColor: OtherColorList[index]
        }
      })
    },
    // 整理待办任务数据符合传参要求
    dealWithBacklogChartData(res) {
      // 创建数组arr用于接收拼接后台返回的数据，将返回数据中的待取件、待派件、未分配运输和超时运输的数据拼接到arr中，成为一个符合echarts图表数据格式的数组
      const arr = [
        res.data.backlog.waitingPickupNumber, // 待取件数
        res.data.backlog.waitingDispatchNumber, // 待派件数
        res.data.backlog.unassignedTransportTaskNumber, // 未分配运输数
        res.data.backlog.timeoutTransportTaskNumber // 超时运输数
      ]
      // 对backlogListdata的数据进行处理，改变其value的值让其显示正确的数据
      this.backlogListdata = this.backlogListdata.map((item, index) => {
        return Object.assign({}, item, {
          value: arr[index]
        })
      })
      // 拼接数组表示当前待办任务的比率，将云端返回的数据赋值到其中
      const backlogChartArr = [
        res.data.backlog.waitingPickupRate, // 待取件率
        res.data.backlog.waitingDispatchRate, // 待派件率
        res.data.backlog.unassignedTransportTaskRate, // 未分配运输率
        res.data.backlog.timeoutTransportTaskRate// 超时运输率
      ]
      const ColorList = ['#E15536', '#FFC257', '#FF9739', '#ECDC7E']
      const LabelColorList = ['#20232A', '#20232A', '#20232A', '#20232A']
      const OtherColorList = ['#FFE5E0', '#FFF1D9', '#FFEAD7', '#FAFADE']
      // 对backlogChartdata的数据进行处理，成为一个符合echarts图表数据格式的数组，将backlogChartArr的值拼接赋入其中
      this.backlogChartData = this.backlogChartData.map((item, index) => {
        return {
          value: backlogChartArr[index],
          color: ColorList[index],
          labelColor: LabelColorList[index],
          otherColor: OtherColorList[index]
        }
      })
    },
    // 动态实现数字上升
    addNumber (start, end, id, interval) {
      var o = document.getElementById(id)
      var i = start
      var Interval
      if (i < end) {
        Interval = setInterval(function () {
          i += interval // 设置每次增加的动态数字，可调整
          if (i > end) {
            clearInterval(Interval) // 清除setInterval的time，这个方法w3c可具体查看文档
            o.innerHTML = end.toLocaleString() // 此赋值是为了避免最后一次增加过后的数据和真实数据不同
            i = 0
          } else {
            o.innerHTML = i.toLocaleString()
          }
        }, 10) // 数据跳转的速度控制
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
