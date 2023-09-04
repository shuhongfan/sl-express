<!-- 车辆详情 -->
<template>
  <el-container class="customer-details-box">
    <el-card
      shadow="never"
      style="width:100%;"
    >
      <div class="block">
        <div class="car-base driver-vehicle">车辆信息</div>
        <el-card
          shadow="never"
          class="form-box"
        >
          <div class="form-item-box">
            <div class="form-item">
              <span class="span-title">当前使用车辆：</span>
              <el-input
                v-model="driverTrucks.truckName"
                :disabled="disabled"
                placeholder="请输入当前使用车辆"
              />
            </div>
            <div class="form-item">
              <span class="span-title">车辆所属线路：</span>
              <el-input
                v-model="driverTrucks.lineName"
                :disabled="disabled"
                placeholder="请输入车辆所属线路"
              />
            </div>
            <div class="form-item">
              <span class="span-title">车辆所属车次：</span>
              <el-input
                v-model="driverTrucks.tripsName"
                :disabled="disabled"
                placeholder="请输入车辆所属车次"
              />
            </div>
          </div>
        </el-card>
        <div class="footer-box">
          <el-button
            class="cancel-btn"
            @click="handleEditDriverList()"
          >返回</el-button>
        </div>
      </div>
    </el-card>
  </el-container>
</template>
<script>
import { driverTruckList } from '@/api/transit'
export default {
  data() {
    return {
      disabled: true,
      driverTrucks: {
        truckName: '',
        lineName: '',
        tripsName: ''
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(this.id)
  },
  methods: {
    // 获取司机车辆安排信息
    async getList(id) {
      var _this = this
      const { data: res } = await driverTruckList(id)
      res.forEach(function(item, index) {
        if (item.truck != null) {
          _this.driverTrucks.truckName = item.truck.licensePlate
        }
        if (item.transportLine != null) {
          _this.driverTrucks.lineName = item.transportLine.name
        }
        if (item.transportTrips != null) {
          _this.driverTrucks.tripsName = item.transportTrips.name
        }
      })
    },
    // 返回触发跳转的页面
    handleEditDriverList() {
      // this.$router.push({ path: '/transit/driver' })
      // this.$router.push('/transit/motorcade')
      // if (this.$route.query.formUrlName) this.$router.push({ path: '/transit/driver' })
      // else this.$router.push('/transit/motorcade')
      if (this.$route.query.formUrlName === '车辆管理') {
        this.$router.push('/transit/vehicle')
      } else if (this.$route.query.formUrlName === '司机管理') {
        this.$router.push('/transit/driver')
      } else {
        this.$router.push('/transit/motorcade')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-aside {
  color: #333;
}

/deep/ .el-row {
  margin-bottom: 20px;
}

.customer-details-box{
  height:100%;
  margin-left: 20px;
  .block{
    background-color: #FFFFFF;
    width:100%;
    padding: 0 24px;
  }
  .car-base{
    color:#2A2929;
    font-size:16px;
    margin: 15px 0;
    font-weight: 700;
  }
  .car-img-base{
    margin: 25px 0;
    border-bottom: 1px solid #e5e7ec;
    .info-box{
      border: 0 !important;
      padding: 35px 0;
      width: 100%;
    }
  }
  .form-box{
    border: 0 !important;
    /deep/ .el-card__body{
      padding: 15px 26px;
      .form-item-box{
        display: flex;
        flex-wrap: wrap;
        .form-item{
          width: 50%;
          display: flex;
          align-items: center;
          margin-top: 24px;
          box-sizing: border-box;
          &:nth-child(1),&:nth-child(2){
            margin-top: 0;
          }
          &:nth-child(odd){
            padding-right: 35px;
          }
          &:nth-child(even){
            padding-left: 35px;
          }
          .span-title{
            min-width: 120px;
            font-weight: 400;
            text-align: right;
            color: #20232a;
            font-size: 14px;
          }
          /deep/ .el-input{
            flex: 1;
            margin-left: 10px;
          }
          /deep/.el-input.is-disabled .el-input__inner{
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
  .footer-box{
    text-align: center;
    margin-top: 20px;
    padding: 30px 0 16px;
    border-top: 1px solid #e5e7ec;
    .save-btn{
      background-color:#E15536;
      color:#ffffff;
      width:110px;
      border-radius: 5px;
      font-weight: 400;
      border: 1px solid #E15536;
      &:hover{
        background: #ffab98;
        border: 1px solid #ffab98;
      }
    }
    .cancel-btn{
      width:110px;
      color: #2a2929;
      border: 1px solid #d8dde3;
      border-radius: 5px;
      font-weight: 400;
      &:hover{
        background: #ffeeeb;
        border: 1px solid #f3917c;
        color: #e15536;
      }
    }
  }
}
</style>
