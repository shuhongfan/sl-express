<!-- 司机详情基本信息 -->
<template>
  <el-container
    class="customer-details-box"
    :class="isShow?'read':'edit'"
  >
    <el-card
      shadow="never"
      style="width: 100%"
      class="outCard"
    >
      <div class="block">
        <el-card
          shadow="never"
          class="form-box"
        >
          <div class="form-item-box">
            <div class="form-item">
              <span class="span-title">员工编号：</span>
              <el-input
                v-model="driverInfos.id"
                :disabled="disabled"
                :placeholder="isShow?'--':'请输入员工编号'"
                maxlength="20"
              />
            </div>
            <div class="form-item">
              <span class="span-title">司机名称：</span>
              <el-input
                v-model="driverInfos.name"
                :disabled="disabledName"
                :placeholder="isShow?'--':'请输入司机名称'"
                maxlength="15"
              />
            </div>

            <div class="form-item">
              <span class="span-title">所属机构：</span>
              <el-input
                v-model="driverInfos.agencyName"
                :disabled="disabledAvatar"
                :placeholder="isShow?'--':'请输入所属机构'"
                maxlength="20"
              />
            </div>
            <div class="form-item">
              <span class="span-title">电话：</span>
              <el-input
                v-model="driverInfos.mobile"
                :disabled="disabledMobile"
                :placeholder="isShow?'--':'请输入电话'"
                maxlength="20"
              />
            </div>
            <div class="form-item">
              <span class="span-title">年龄：</span>
              <el-input
                v-model="driverInfos.age"
                :disabled="disabledAge"
                maxlength="4"
                :placeholder="isShow?'--':'请输入年龄'"
              >
              </el-input>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
    <div
      v-if="isShow"
      style="text-align: center"
      class="footer-box"
    >
      <el-button
        class="save-btn"
        type="warning"
        @click="handleEditDriverInfo()"
      >编辑</el-button>
    </div>
    <div
      v-else
      style="text-align: center"
      class="footer-box"
    >
      <el-button
        class="save-btn"
        type="warning"
        @click="handleSubDriverInfo()"
      >保存</el-button>
      <el-button
        class="cancel-btn"
        @click="handleCanDriverInfo()"
      >取消</el-button>
    </div>
  </el-container>
</template>
<script>
import { driverDetail, driverDetailUpdate } from '@/api/transit'
export default {
  data() {
    return {
      disabled: true,
      pdfData: {
        bizType: 'driver'
      },
      isShow: true,
      dialogVisible: false,
      disabledName: true,
      disabledMobile: true,
      disabledAge: true,
      disabledAvatar: true,
      driverInfos: {
        id: '',
        name: '',
        agencyName: '',
        fleetName: '',
        mobile: '',
        age: '',
        avatar: ''
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(this.id)
  },
  methods: {
    goBack() {},
    handleAvatarSuccess(res, file) {
      const _this = this
      if (res.code === 0) {
        _this.driverInfos.avatar = res.data.url
      }
    },
    // 获取司机详情基本信息
    async getList(id) {
      const { data: res } = await driverDetail(id)
      this.driverInfos.id = res.userId
      this.driverInfos.name = res.name
      if (res.fleet != null) {
        this.driverInfos.fleetId = res.fleet.id
        this.driverInfos.fleetName = res.fleet.name
      }
      if (res.agency != null) {
        this.driverInfos.agencyId = res.agency.id
        this.driverInfos.agencyName = res.agency.name
      }
      this.driverInfos.mobile = res.mobile
      this.driverInfos.age = res.age
      this.driverInfos.avatar = res.avatar
    },
    // 编辑基本信息
    async handleEditDriverInfo() {
      this.isShow = false
      this.disabledName = true
      this.disabledMobile = true
      this.disabledAvatar = true
      this.disabledAge = false
    },
    // 保存
    async handleSubDriverInfo() {
      const data = {
        name: this.driverInfos.name,
        mobile: this.driverInfos.mobile,
        age: this.driverInfos.age,
        userId: this.driverInfos.id,
        agency: {
          id: this.driverInfos.agencyId,
          name: this.driverInfos.agencyName
        },
        fleet: {
          id: this.driverInfos.fleetId,
          name: this.driverInfos.fleetName
        },
        avatar: this.driverInfos.avatar
      }
      await driverDetailUpdate(this.id, data).then(() => {
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        this.isShow = true
        this.disabledName = true
        this.disabledAvatar = true
        this.disabledMobile = true
        this.disabledAge = true
      })
    },
    // 取消
    handleCanDriverInfo() {
      this.isShow = true
      this.disabledName = true
      this.disabledMobile = true
      this.disabledAvatar = true
      this.disabledAge = true
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-card{
  height: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
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
      padding-top: 16px!important;
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
          &:nth-child(2),
          &:nth-child(3) {
            margin-top: 0;
          }
          &:nth-child(odd) {
            padding-left: 35px;
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
