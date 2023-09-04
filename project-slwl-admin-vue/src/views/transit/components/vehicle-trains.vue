<template>
  <el-container class="customer-details-box">
    <el-card
      shadow="never"
      style="width: 100%"
      class=""
    >
      <div class="block">
        <div class="car-base">车次信息</div>
        <el-card
          shadow="never"
          class="form-box"
        >
          <div
            v-for="(item, index) in tripsInfoList"
            :key="index"
            class="form-item-box"
          >
            <div class="form-item">
              <span class="span-title">所属线路：</span>
              <el-input
                v-model="item.transportLine.name"
                :disabled="disabled"
              />
            </div>
            <div class="form-item">
              <span class="span-title">所属车次：</span>
              <el-input
                v-model="item.transportTrips.name"
                :disabled="disabled"
              />
            </div>
          </div>
        </el-card>
      </div>

      <div class="footer-box car-img-base">
        <el-button
          class="cancel-btn"
          plain
          @click="handleEditVehicleList()"
        >返回</el-button>
      </div>
    </el-card>
  </el-container>
</template>
<script>
import { truckTripsList } from '@/api/transit'
export default {
  data() {
    return {
      disabled: true,
      truckTrips: {
        lineName: '',
        tripsName: ''
      },
      tripsInfoList: [],
      businessPicUrl:
        'http://pic1.zhimg.com/50/v2-52b22b096a2bf0a4bf96c4f57504c958_hd.jpg',
      businessPicSrcList: [
        'http://pic1.zhimg.com/50/v2-52b22b096a2bf0a4bf96c4f57504c958_hd.jpg'
      ]
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(this.id)
  },
  methods: {
    goBack() {},
    async getList(id) {
      // var _this = this
      const { data: res } = await truckTripsList(id)
      this.tripsInfoList = res
      // res.forEach(function (item, index) {
      //   if (item.transportLine != null) {
      //     _this.truckTrips.lineName = item.transportLine.name
      //   }
      //   if (item.transportTrips != null) {
      //     _this.truckTrips.tripsName = item.transportTrips.name
      //   }
      // })
    },
    // 判断返回上一级要跳转的页面
    handleEditVehicleList() {
      // this.$router.push({ path: '/transit/vehicle' })
      // this.$router.push('/transit/motorcade')
      // this.$router.push('/transit/vehicle')
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
.el-aside {
  color: #333;
}

/deep/ .el-row {
  margin-bottom: 20px;
}

.customer-details-box {
  height: 100%;
  margin-left: 20px;
  .block {
    background-color: #ffffff;
    width: 100%;
    padding: 0 24px;
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
    border-top: 1px solid #e5e7ec;
    .info-box {
      border: 0 !important;
      padding: 35px 0;
      width: 100%;
    }
  }
  .form-box {
    border: 0 !important;
    /deep/ .el-card__body {
      padding: 15px 26px;
      .form-item-box {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
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
            min-width: 80px;
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
    padding: 5px 0 16px;
    .cancel-btn {
      margin-top: 20px;
      width: 110px;
      border-radius: 5px;
      font-weight: 400;
    }
  }
}
</style>
