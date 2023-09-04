<template>
  <el-container class="customer-details-box">
    <el-card
      shadow="never"
      style="width:100%;"
    >
      <div class="block">
        <div
          div
          class="car-base driver-info"
        >基本设置</div>
        <el-card
          shadow="never"
          class="form-box"
        >
          <div class="form-item-box">
            <div class="form-item">
              <span class="span-title">员工编号：</span>
              <el-input
                v-model="couriers.userId"
                :disabled="disabled"
              />
            </div>
            <div class="form-item">
              <span class="span-title">快递员姓名：</span>
              <el-input
                v-model="couriers.name"
                :disabled="disabled"
              />
            </div>
            <div class="form-item">
              <span class="span-title">所属机构：</span>
              <el-input
                v-model="couriers.agencyName"
                :disabled="disabled"
              />
            </div>
            <div class="form-item">
              <span class="span-title">电话：</span>
              <el-input
                v-model="couriers.mobile"
                :disabled="disabled"
              />
            </div>
          </div>
        </el-card>
        <div class="footer-box">
          <el-button
            class="cancel-btn"
            @click="handleEditCouriersList()"
          >返回</el-button>
        </div>
      </div>
    </el-card>
  </el-container>
</template>
<script>
import { courierDetail, courierAdd } from '@/api/branch'
export default {
  data() {
    return {
      disabled: true,
      isShow: true,
      disabledName: true,
      disabledMobile: true,
      couriers: {
        userId: '',
        name: '',
        agencyName: '',
        agencyId: '',
        mobile: ''
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(this.id)
  },
  methods: {
    goBack() {},
    // 获取快递员详情
    async getList(id) {
      const { data: res } = await courierDetail(id)
      this.couriers.userId = res.userId
      this.couriers.name = res.name
      if (res.agency != null) {
        this.couriers.agencyName = res.agency.name
        this.couriers.agencyId = res.agency.id
      }
      this.couriers.mobile = res.mobile
    },
    // 编辑快递员详情
    async handleEditCouriersInfo() {
      this.isShow = false
      this.disabledName = false
      this.disabledMobile = false
    },
    // 保存快递员详情
    async handleSubCouriersInfo() {
      const data = {
        courier: {
          agency: {
            id: this.couriers.agencyId,
            name: this.couriers.agencyName
          },
          userId: this.couriers.userId,
          name: this.couriers.name,
          mobile: this.couriers.mobile
        }
      }
      await courierAdd(data).then(() => {
        this.isShow = true
        this.disabledName = true
        this.disabledMobile = true
      })
    },
    // 返回列表
    handleEditCouriersList() {
      this.$router.push({ path: '/branches/operational-range' })
    },
    // 取消
    handleCanCouriersInfo() {
      this.isShow = true
      this.disabledName = true
      this.disabledMobile = true
    }
  }
}
</script>
<style lang="scss" scoped>
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
  /deep/ .car-img-base{
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
            min-width: 100px;
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
