<template>
  <el-container class="customer-details-box">
    <el-card
      shadow="never"
      style="width:100%;"
      :class="isShow?'show':'hidden'"
    >
      <div class="block">
        <div class="car-base task-info">
          基本信息
          <img
            ref="arrow"
            src="../../../assets/new-pull-down.png"
            style="position:absolute;width:18px;height:18px;right:44px;top:20px;cursor:pointer;transition-duration:0.3s"
            @click="open"
          />
        </div>
        <el-card
          shadow="never"
          class="form-box"
        >
          <div class="form-item-box">
            <div class="form-item">
              <span class="span-title">运输任务编号：</span>
              <el-input
                v-model="taskInfo.taskNo"
                :disabled="disabled"
                placeholder="请输入运输任务编号"
              />
            </div>
            <div class="form-item">
              <span class="span-title">车牌号码：</span>
              <el-input
                v-model="taskInfo.carNum"
                :disabled="disabled"
                placeholder="请输入车牌号码"
              />
            </div>
            <div class="form-item">
              <span class="span-title">调度机构：</span>
              <el-input
                v-model="taskInfo.startAgencyName"
                :disabled="disabled"
                placeholder="请输入调度机构"
              />
            </div>
            <div class="form-item">
              <span class="span-title">起始地：</span>
              <el-input
                v-model="taskInfo.startAgencyName"
                :disabled="disabled"
                placeholder="请输入起始地"
              />
            </div>
            <div class="form-item">
              <span class="span-title">目的地：</span>
              <el-input
                v-model="taskInfo.endAgencyName"
                :disabled="disabled"
                placeholder="请输入目的地"
              />
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </el-container>
</template>
<script>
import { transportJobDetail } from '@/api/transport'
export default {
  data() {
    return {
      isShow: true,
      disabled: true,
      taskInfo: {
        taskNo: '',
        carNum: '',
        startAgencyName: '',
        endAgencyName: ''
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(this.id)
  },
  methods: {
    goBack() {},
    open() {
      this.isShow = !this.isShow
      this.$refs.arrow.style.transform = !this.isShow ? 'rotate(-90deg)' : 'rotate(0deg)'
    },
    // 获取运输详情基本信息
    async getList(id) {
      const { data: res } = await transportJobDetail(id)

      this.taskInfo.taskNo = res.id
      if (res.truck != null) {
        this.taskInfo.carNum = res.truck.licensePlate
      }
      if (res.startAgency != null) {
        // this.taskInfo.startAgencyName = res.endAgency.name
        this.taskInfo.startAgencyName = res.startAgency.name
      }
      if (res.endAgency != null) {
        this.taskInfo.endAgencyName = res.endAgency.name
      }
    },
    // 返回列表
    handleTaskList() {
      this.$router.push({ path: '/transport/transport-task' })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-input__inner {
  padding-left: 0px !important;
  padding-right: 0 !important;
  width: 160px!important;
}
/deep/ .form-item {
  width: 25% !important;
  &:nth-child(1) {
    .span-title {
      min-width: 100px !important;
    }
  }
    &:nth-child(2) {
    .span-title {
      min-width: 80px !important;
    }
    .el-input__inner {
      width: 110px!important;
    }
  }
  &:nth-child(4) {
    .span-title {
      min-width: 60px !important;
    }
  }
  &:nth-child(5) {
    .span-title {
      min-width: 100px !important;
    }
  }
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    margin-top: 0 !important;
  }
  &:nth-child(2) {
    padding-left: 50px !important;
    padding-right: 0 !important;
  }
  // &:nth-child(even) {
  //   padding-left: 35px !important;
  // }
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
    border-bottom: 1px solid #e5e7ec;
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
      padding-left: 45px !important;
      padding-right: 0px!important;
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
            min-width: 70px;
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
</style>
