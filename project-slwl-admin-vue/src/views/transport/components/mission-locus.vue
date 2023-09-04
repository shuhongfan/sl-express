<template>
  <el-container class="customer-details-box">
    <el-card
      shadow="never"
      style="width: 100%"
      :class="isShow ? 'show' : 'hidden'"
    >
      <div class="block">
        <div class="car-base mission-locus">
          任务轨迹
          <img
            ref="arrow"
            src="../../../assets/new-pull-down.png"
            style="
              position: absolute;
              width: 18px;
              height: 18px;
              right: 44px;
              top: 20px;
              cursor: pointer;
              transition-duration: 0.3s;
            "
            @click="open"
          />
        </div>
        <el-card
          shadow="never"
          class="form-box"
        >
          <div class="form-item-box">
            <div class="form-item">
              <span class="span-title">车牌号：</span>
              <el-input
                v-model="missionLocus.licensePlate"
                :disabled="disabled"
                placeholder="请输入车牌号"
              />
            </div>
            <div class="form-item">
              <span class="span-title">司机：</span>
              <el-input
                v-model="missionLocus.driverName"
                :disabled="disabled"
                placeholder="请输入司机"
              />
            </div>
            <div class="form-item">
              <span class="span-title">计划发车时间：</span>
              <el-input
                v-model="missionLocus.planDepartureTime"
                :disabled="disabled"
                placeholder="请输入计划发车时间"
              />
            </div>
            <div class="form-item">
              <span class="span-title">实际发车时间：</span>
              <el-input
                v-model="missionLocus.actualDepartureTime"
                :disabled="disabled"
                :placeholder="missionLocus.actualDepartureTime?'':'暂未发车'"
              />
            </div>
            <div class="form-item">
              <span class="span-title">计划到达时间：</span>
              <el-input
                v-model="missionLocus.planArrivalTime"
                :disabled="disabled"
                placeholder="请输入计划到达时间"
              />
            </div>
            <div class="form-item">
              <span class="span-title">实际到达时间：</span>
              <el-input
                v-model="missionLocus.actualArrivalTime"
                :disabled="disabled"
                :placeholder="missionLocus.actualArrivalTime?'':'暂未到达'"
              />
            </div>
          </div></el-card>
      </div>
    </el-card>
  </el-container>
</template>
<script>
import {
  transportJobDetail
} from '@/api/transport'
export default {
  data() {
    return {
      isShow: true,
      disabled: true,
      play: true,
      queryParams: {},
      missionLocus: {
        licensePlate: '',
        driverName: '',
        planDepartureTime: '',
        actualDepartureTime: '',
        planArrivalTime: '',
        actualArrivalTime: ''
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(this.id)
  },
  methods: {
    open() {
      this.isShow = !this.isShow
      this.$refs.arrow.style.transform = !this.isShow
        ? 'rotate(-90deg)'
        : 'rotate(0deg)'
    },
    // 返回列表
    handleTaskList() {
      this.$router.push({ path: '/transport/transport-task' })
    },
    reset() {
      this.play = false
    },
    handleLocusPlace() {
      this.getList(this.id)
    },
    goBack() {},
    // 获取运输详情-任务轨迹信息
    async getList(id) {
      const { data: res } = await transportJobDetail(id)
      if (res.truck != null) {
        this.missionLocus.licensePlate = res.truck.licensePlate
      }
      this.missionLocus.driverName = res.drivers.map((item) => item.name).join(',')
      this.missionLocus.planDepartureTime = res.planDepartureTime
      this.missionLocus.actualDepartureTime = res.actualDepartureTime
      this.missionLocus.planArrivalTime = res.planArrivalTime
      this.missionLocus.actualArrivalTime = res.actualArrivalTime
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-input__inner {
  padding-left: 0px !important;
  padding-right: 0 !important;
}
.map {
  margin-top: 20px 0 24px;
  width: 100%;
  height: 428px;
}
.customer-details-box {
  height: 100%;
  margin-left: 20px;
  .block {
    background-color: #ffffff;
    width: 100%;
    padding: 0 24px 15px;
  }
  .car-base {
    color: #2a2929;
    font-size: 16px;
    margin: 15px 0;
    font-weight: 700;
  }
  .car-img-base {
    margin: 25px 0;
    // border-bottom: 1px solid #e5e7ec;
    .info-box {
      border: 0 !important;
      padding: 35px 0;
      width: 100%;
    }
  }
  .info-box {
    border: 0 !important;
    width: 100%;
  }
  .form-box {
    border: 0 !important;
    /deep/ .el-card__body {
      padding: 15px 26px;
      padding-left: 45px !important;
      padding-right: 0 !important;
      .form-item-box {
        display: flex;
        flex-wrap: wrap;
        .form-item {
          width: 50%;
          display: flex;
          align-items: center;
          margin-top: 24px;
          box-sizing: border-box;
          &:nth-child(1),
          &:nth-child(2) {
            margin-top: 0;
          }
          &:nth-child(odd) {
            padding-right: 35px;
          }
          &:nth-child(even) {
            padding-left: 35px;
          }
          .span-title {
            min-width: 100px;
            font-weight: 400;
            text-align: right;
            color: #20232a;
            font-size: 14px;
          }
          /deep/ .el-input {
            flex: 1;
            margin-left: 10px;
          }
          /deep/.el-input.is-disabled .el-input__inner {
            background: #eff3f8;
            border: 1px solid #d8dde3;
            border-radius: 5px;
            font-weight: 400;
            color: #bac0cd;
          }
        }
      }
    }
  }
  .footer-box {
    text-align: center;
    // padding: 5px 0 16px;
    margin-top: 20px;
    padding: 30px 0 16px;
    border-top: 1px solid #e5e7ec;
    .save-btn {
      background-color: #e15536;
      color: #ffffff;
      width: 110px;
      border-radius: 5px;
      font-weight: 400;
      border: 1px solid #e15536;
      &:hover {
        background: #ffab98;
        border: 1px solid #ffab98;
      }
    }
    .cancel-btn {
      width: 110px;
      color: #2a2929;
      border: 1px solid #d8dde3;
      border-radius: 5px;
      font-weight: 400;
      &:hover {
        background: #ffeeeb;
        border: 1px solid #f3917c;
        color: #e15536;
      }
    }
  }
}
.map-btn-box {
  // text-align: right;
  .refresh {
    width: 14px;
    height: 14px;
    cursor: pointer;
    float: right;
  }
}
</style>
