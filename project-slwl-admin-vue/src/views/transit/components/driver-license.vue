<!-- 司机详情，驾驶证信息 -->
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
              <span class="span-title">驾驶证号：</span>
              <el-input
                v-model="driverLicens.licenseNumber"
                :disabled="disabledLicenseNumber"
                :placeholder="isShow?'--':'请输入驾驶证号'"
                maxlength="40"
              />
            </div>
            <div class="form-item">
              <span class="span-title">准驾车型：</span>
              <el-input
                v-model="driverLicens.allowableType"
                :disabled="disabledAllowableType"
                :placeholder="isShow?'--':'请输入准驾车型'"
                maxlength="20"
              />
            </div>
            <div class="form-item">
              <span class="span-title">初次领证日期：</span>
              <el-date-picker
                v-model="driverLicens.initialCertificateDate"
                type="date"
                :disabled="disabledInitialCertificateDate"
                value-format="yyyy-MM-dd"
                :placeholder="isShow?'--':'请选择注册时间'"
              />
            </div>
            <div class="form-item">
              <span class="span-title">驾驶证有效期限：</span>
              <el-input
                v-model="isShow ? driverLicens.validPeriod+'年': driverLicens.validPeriod"
                :disabled="disabledValidPeriod"
                :placeholder="isShow?'--':'请输入驾驶证有效期限'"
                maxlength="5"
              >
                <span
                  slot="suffix"
                  style="
                    color: #20232a;
                    font-weight: 400;
                    font-size: 14px;
                    font-family: PingFangSC, PingFangSC-Regular;
                    margin-right: 14px;
                    line-height: 40px;
                  "
                >年</span>
              </el-input>
            </div>
            <div class="form-item">
              <span class="span-title">驾龄：</span>
              <el-input
                v-model="isShow?driverLicens.driverAge+' 年':driverLicens.driverAge"
                :disabled="disabledDriverAge"
                :placeholder="isShow?'--':'请输入驾龄'"
                maxlength="5"
              >
                <span
                  slot="suffix"
                  style="
                    color: #20232a;
                    font-weight: 400;
                    font-size: 14px;
                    font-family: PingFangSC, PingFangSC-Regular;
                    margin-right: 14px;
                    line-height: 40px;
                  "
                >年</span>
              </el-input>
            </div>
            <div class="form-item driver-license-type">
              <span
                class="span-title"
                :style="{marginRight:isShow?'15px':'0px'}"
              >驾驶证类型：</span>
              <el-input
                v-model="driverLicens.licenseType"
                :disabled="disabledLicenseType"
                :placeholder="isShow?'--':'请输入驾驶证类型'"
                maxlength="5"
              />
            </div>
            <div class="form-item">
              <span class="span-title">从业资格证：</span>
              <el-input
                v-model="driverLicens.qualificationCertificate"
                :disabled="disabledQualificationCertificate"
                :placeholder="isShow?'--':'请输入从业资格证'"
                maxlength="20"
              />
            </div>
            <div class="form-item">
              <span class="span-title">入场证信息：</span>
              <el-input
                v-model="driverLicens.passCertificate"
                :disabled="disabledPassCertificate"
                :placeholder="isShow?'--':'请输入入场证信息'"
                maxlength="200"
              />
            </div>
          </div>
        </el-card>

        <div class="car-base car-img-base driver-licence">
          <span
            class="imgUpload-label"
            style="margin-right:35px"
          >图片信息</span>
          <el-card
            shadow="never"
            class="info-box"
          >
            <div
              class="demo-input-suffix"
              style="color: #2a2929; font-size: 14px; padding-left: 6px"
            >
              <ImageUpload
                v-if="!isShow"
                :prop-image-url="driverLicens.picture"
                :disabled="isShow"
                :edit-type="isShow?'read':'edit'"
                :is-show-example-img="diasbledImg"
                :example-list="['https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/f5b1a839-88ab-4af4-aba4-8b23320098a8.png','https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/50dcaf77-01ae-424c-b4b2-2f5efb96791a.png']"
                @imageChange="imageChange"
              >
                注：图片大小不超过5M；仅能上传 PNG JPEG JPG类型图片；建议上传400*300尺寸的图片；最多上传2张
              </ImageUpload>
              <div
                v-else
                class="read-img"
                style="margin-left:15px"
              >
                <img
                  v-if="!driverLicens.picture.length"
                  src="../../../assets/empty-img.png"
                  style="width:212px;height:159px;border: 1px solid #D8DDE3;border-radius: 4px;"
                />

                <div
                  v-for="(item,index) in driverLicens.picture"
                  v-else
                  :key="index"
                  class="img-box"
                >
                  <img
                    style="width:212px;height:159px;border: 1px solid #D8DDE3;border-radius: 4px;margin-right:20px"
                    :src="item.url"
                  >
                  <div class="img-shadow">
                    <img
                      class="el-upload-span searchBigImg"
                      src="../../../assets/img-search.png"
                      @click.stop="searchBigImg(item)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>

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
        @click="handleEditDriverLicense()"
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
        @click="handleSubDriverLicense()"
      >保存</el-button>
      <el-button
        class="cancel-btn"
        plain
        @click="handleCanDriverLicense()"
      >取消</el-button>
    </div>
    <!-- 预览弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      height="600px"
    >
      <img
        width="100%"
        :src="imageUrl"
        alt=""
      >
    </el-dialog>
  </el-container>
</template>
<script>
import {
  driverLicenseDetail,
  driverLicenseDetailUpdate
} from '@/api/transit'
import ImageUpload from '@/components/ImgUpload/index.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      imageUrl: '',
      dialogVisible: false,
      diasbledImg: true,
      headers: {
        Authorization: Cookies.get('TOKEN')
      },
      licenseData: {
        bizType: 'driver'
      },
      isShow: true,
      disabledPicture: true,
      disabledLicenseNumber: true,
      disabledAllowableType: true,
      disabledInitialCertificateDate: true,
      disabledValidPeriod: true,
      disabledDriverAge: true,
      disabledLicenseType: true,
      disabledQualificationCertificate: true,
      disabledPassCertificate: true,
      driverLicens: {
        id: '',
        licenseNumber: '',
        allowableType: '',
        initialCertificateDate: '',
        validPeriod: '',
        driverAge: '',
        licenseType: '',
        qualificationCertificate: '',
        passCertificate: '',
        picture: ''
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(this.id)
  },
  methods: {
    // 查询大图
    searchBigImg(file) {
      this.imageUrl = file.url
      this.dialogVisible = true
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      const _this = this
      if (res.code === 200) {
        _this.driverLicens.picture = res.data
      }
    },
    // 图片改变
    imageChange(value) {
      this.diasbledImg = !value.length
      this.driverLicens.picture = value
    },
    // 获取司机驾驶证信息
    async getList(id) {
      const { data: res } = await driverLicenseDetail(id)
      this.driverLicens.id = res.id
      this.driverLicens.licenseNumber = res.licenseNumber
      this.driverLicens.allowableType = res.allowableType
      this.driverLicens.initialCertificateDate = res.initialCertificateDate
      this.driverLicens.validPeriod = res.validPeriod ? res.validPeriod : ''
      this.driverLicens.driverAge = res.driverAge ? res.driverAge : ''
      this.driverLicens.licenseType = res.licenseType
      this.driverLicens.qualificationCertificate = res.qualificationCertificate
      this.driverLicens.passCertificate = res.passCertificate
      this.driverLicens.picture = res.picture
        ? res.picture.split(',').map((item) => {
          return { url: item }
        })
        : ''
      this.diasbledImg = !res.picture
      this.driverLicens.userId = res.userId
    },
    // 编辑基本信息
    async handleEditDriverLicense() {
      this.isShow = false
      this.disabledLicenseNumber = false
      this.disabledAllowableType = false
      this.disabledPicture = false
      this.disabledInitialCertificateDate = false
      this.disabledValidPeriod = false
      this.disabledDriverAge = false
      this.disabledLicenseType = false
      this.disabledQualificationCertificate = false
      this.disabledPassCertificate = false
    },
    // 保存
    async handleSubDriverLicense() {
      if (this.driverLicens.picture.length < 2) {
        return this.$message.error('驾驶证照片必须上传两张')
      }
      const data = {
        licenseNumber: this.driverLicens.licenseNumber,
        allowableType: this.driverLicens.allowableType,
        initialCertificateDate: this.driverLicens.initialCertificateDate,
        validPeriod: this.driverLicens.validPeriod,
        driverAge: this.driverLicens.driverAge,
        licenseType: this.driverLicens.licenseType,
        qualificationCertificate: this.driverLicens.qualificationCertificate,
        passCertificate: this.driverLicens.passCertificate,
        id: this.driverLicens.id,
        picture: this.driverLicens.picture
          .map((item) => {
            return item.size ? item.response.data : item.url
          })
          .join(),
        userId: this.driverLicens.userId
      }
      await driverLicenseDetailUpdate(data)
        .then((res) => {
          if (String(res.code) === '200') {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this.isShow = true
            this.disabledLicenseNumber = true
            this.disabledAllowableType = true
            this.disabledInitialCertificateDate = true
            this.disabledPicture = true
            this.disabledValidPeriod = true
            this.disabledDriverAge = true
            this.disabledLicenseType = true
            this.disabledQualificationCertificate = true
            this.disabledPassCertificate = true
          } else {
            this.$message({
              message: res.msg || '保存失败！',
              type: 'error'
            })
          }
        })
        .catch((err) => {
          this.$message({
            message: err.msg || '保存失败！',
            type: 'error'
          })
        })
    },
    // 取消
    handleCanDriverLicense() {
      this.isShow = true
      this.disabledLicenseNumber = true
      this.disabledAllowableType = true
      this.disabledInitialCertificateDate = true
      this.disabledValidPeriod = true
      this.disabledPicture = true
      this.disabledDriverAge = true
      this.disabledLicenseType = true
      this.disabledQualificationCertificate = true
      this.disabledPassCertificate = true
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

/deep/ .el-card {
  height: 100%;
}

/deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

/deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  position: relative;
}
.disabled-cover {
  width: 178px;
  height: 178px;
  background-color: #d8dde3;
  position: absolute;
  left: 0;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  display: block;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
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
    border-bottom: none !important;
    margin-top: 0px;
    display: flex;
    padding-left: 25px;
    margin-top: 5px;
    position: relative;
    /deep/ .el-card__body {
      padding-left: 4px;
    }
    .info-box {
      border: 0 !important;
      padding: 0 0 15px 0;
      width: 100%;
    }
    .imgUpload-label {
      font-size: 14px;
      color: #20232a;
      font-weight: normal;
      white-space: nowrap;
    }
    /deep/ .img-box {
      display: inline-block;
      position: relative;
      .img-shadow {
        position: absolute;
        top: 0;
        width: 212px;
        height: 159px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        text-align: center;
        display: none;
        .searchBigImg {
          width: 28px;
          height: 28px;
          margin-top: 64px;
          cursor: pointer;
        }
      }
    }
    .img-box:hover {
      .img-shadow {
        display: block;
      }
    }
  }
  .form-box {
    border: 0 !important;
    /deep/ .el-card__body {
      padding: 15px 26px;
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

          &:nth-child(2),
          &:nth-child(5),
          &:nth-child(8) {
            padding-left: 20px !important;
            margin-right: 0px !important;
            .span-title {
              min-width: 90px !important;
            }
          }
          &:nth-child(3) {
            padding-left: 20px !important;
          }
          &:nth-child(6) {
            padding-left: 20px !important;
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
    padding: 5px 0 16px;
    .save-btn {
      width: 110px;
      border-radius: 5px;
      font-weight: 400;
    }
    .cancel-btn {
      width: 110px;
      border-radius: 5px;
      font-weight: 400;
    }
  }
}
// 修改el-button中warnning的默认样式
.el-button--warning {
  width: 100px;
  height: 40px;
  background: #e15536;
  border-radius: 4px;
  // 修改鼠标悬浮时的样式
  &:hover {
    width: 100px;
    height: 40px;
    background: #ffab98;
    border-radius: 4px;
  }
  // 修改按下时的样式
  &:active {
    width: 100px;
    height: 40px;
    background: #cc4628;
    border-radius: 4px;
  }
  // 修改禁用时的样式
  &.is-disabled {
    width: 100px;
    height: 40px;
    background: #ffdfda;
    border-radius: 4px;
  }
}
/deep/ .el-dialog__header {
  background-color: white;
  position: relative;
  z-index: 2;
  padding: 0px;
}
/deep/ .el-dialog__body {
  position: absolute;
  height: 600px;
  width: 100%;
  top: 0;
  padding: 0;
  img {
    position: absolute;
    width: 100%;
    height: 600px;
  }
}
/deep/ .el-dialog {
  height: 600px;
}
/deep/ .el-date-editor{
  width:auto!important;
}
</style>
