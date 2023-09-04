<!-- 车辆详情，行驶证信息 -->
<template>
  <el-container
    class="customer-details-box"
    :class="isShowDriving?'read':'edit'"
  >
    <el-card
      shadow="never"
      style="width: 100%;height:100%"
      class="outCard"
    >
      <div class="block">
        <el-card
          shadow="never"
          class="form-box"
        >
          <el-form
            ref="vehiclesDriving"
            :model="vehiclesDriving"
            :rules="rules"
            label-width="110px"
            class="demo-ruleForm"
          >
            <el-row :gutter="24">
              <el-col :span="8">
                <el-form-item
                  label="行驶证号码："
                  prop="transportCertificateNumber"
                  class="form-item"
                >
                  <el-input
                    v-model="vehiclesDriving.transportCertificateNumber"
                    :disabled="disabledStr"
                    maxlength="20"
                    :placeholder="isShowDriving?'--':'请输入行驶证号码'"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                style="padding-left:30px"
              >
                <el-form-item
                  label="发动机号码："
                  prop="engineNumber"
                  class="form-item"
                  label-width="100px"
                >
                  <el-input
                    v-model="vehiclesDriving.engineNumber"
                    :disabled="disabledStr"
                    maxlength="20"
                    :placeholder="isShowDriving?'--':'请输入发动机号码'"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                style="padding-left:30px"
              >
                <el-form-item
                  label="注册时间："
                  prop="registrationDate"
                  class="form-item"
                  label-width="95px"
                >
                  <el-date-picker
                    v-model="vehiclesDriving.registrationDate"
                    type="date"
                    :disabled="disabledStr"
                    style="width: 100%"
                    value-format="yyyy-MM-dd"
                    :placeholder="isShowDriving?'--':'请选择注册时间'"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="强制报废日期："
                  prop="mandatoryScrap"
                  class="form-item"
                >
                  <el-date-picker
                    v-model="vehiclesDriving.mandatoryScrap"
                    type="date"
                    :disabled="disabledStr"
                    style="width: 100%"
                    value-format="yyyy-MM-dd"
                    :placeholder="isShowDriving?'--':'请选择强制报废日期'"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                style="padding-left:30px"
              >
                <el-form-item
                  label="整备质量："
                  prop="overallQuality"
                  class="form-item"
                  label-width="100px"
                >
                  <el-input
                    v-model="isShowDriving?vehiclesDriving.overallQuality+' 吨':vehiclesDriving.overallQuality"
                    :disabled="disabledStr"
                    maxlength="20"
                    :placeholder="isShowDriving?'--':'请输入整备质量'"
                  >
                    <span
                      slot="suffix"
                      style="
                        color: #20232a;
                        font-weight: 400;
                        font-size: 14px;
                        font-family: PingFangSC, PingFangSC-Regular;
                        margin-right: 14px;
                      "
                    >吨</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                style="padding-left:30px"
              >
                <el-form-item
                  label="检验有效期："
                  prop="expirationDate"
                  class="form-item"
                  label-width="95px"
                >
                  <el-date-picker
                    v-model="vehiclesDriving.expirationDate"
                    type="date"
                    :disabled="disabledStr"
                    style="width: 100%"
                    value-format="yyyy-MM-dd"
                    :placeholder="isShowDriving?'--':'请选择检验有效期'"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="核定载质量："
                  prop="allowableWeight"
                  class="form-item"
                >
                  <el-input
                    v-model="isShowDriving?vehiclesDriving.allowableWeight+' 吨':vehiclesDriving.allowableWeight"
                    :disabled="disabledStr"
                    maxlength="20"
                    :placeholder="isShowDriving?'--':'请输入核定载质量'"
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
                    >吨</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                style="padding-left:30px"
              >
                <el-form-item
                  label="有效期："
                  prop="validityPeriod"
                  class="form-item"
                  label-width="100px"
                >
                  <el-date-picker
                    v-model="vehiclesDriving.validityPeriod"
                    type="date"
                    style="width: 100%"
                    :disabled="disabledStr"
                    value-format="yyyy-MM-dd"
                    :placeholder="isShowDriving?'--':'请选择行驶证有效期'"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <div class="car-base car-img-base drive-base">
          <span
            class="imgUpload-label"
            style="margin-right:6px;margin-left:12px"
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
                v-if="!disabledStr"
                :prop-image-url="vehiclesDriving.picture"
                :disabled="disabledStr"
                :edit-type="disabledStr?'read':'edit'"
                :is-show-example-img="diasbledImg"
                :example-list="['https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/086942c3-6c43-432d-80f1-64f53b424be9.png','https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/4002ebba-8a62-4a5c-b64c-358189456eb6.png']"
                @imageChange="imageChange"
              >
                注：图片大小不超过5M；仅能上传 PNG JPEG JPG类型图片；建议上传400*300尺寸的图片；最多上传2张
              </ImageUpload>
              <div
                v-else
                class="read-img"
              >
                <img
                  v-if="!vehiclesDriving.picture.length"
                  src="../../../assets/empty-img.png"
                  style="width:212px;height:159px;border: 1px solid #D8DDE3;border-radius: 4px;"
                />

                <div
                  v-for="(item,index) in vehiclesDriving.picture"
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
            </div></el-card>
        </div>

      </div>
    </el-card>
    <div
      v-if="isShowDriving"
      class="footer-box"
    >
      <el-button
        class="save-btn"
        type="warning"
        @click="handleEditVehicleDriving()"
      >编辑</el-button>
    </div>
    <div
      v-else
      class="footer-box"
    >
      <el-button
        class="save-btn"
        type="warning"
        @click="handleSubVehicleDriving()"
      >保存</el-button>
      <el-button
        class="cancel-btn"
        type="warning"
        plain
        @click="handleCanVehicleDriving()"
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
  truckTypeDrivingLicenseDetail,
  truckTypeDrivingLicense,
  imgUpload
} from '@/api/transit'
import Cookies from 'js-cookie'
import ImageUpload from '@/components/ImgUpload/index.vue'
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
      vehicleLicenseData: {
        bizType: 'vehicleLicense'
      },
      disabledAvatar: true,
      disabledStr: true,
      isShowDriving: true,
      vehiclesDriving: {
        id: '',
        engineNumber: '',
        registrationDate: '',
        mandatoryScrap: '',
        overallQuality: '',
        expirationDate: '',
        allowableWeight: '',
        outsideDimensions: '',
        validityPeriod: '',
        transportCertificateNumber: '',
        picture: []
      },
      rules: {
        registrationDate: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('注册时间不能为空'))
              }
            },
            trigger: 'change'
          }
        ],
        mandatoryScrap: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('强制报废日期不能为空'))
              }
            },
            trigger: 'change'
          }
        ],
        validityPeriod: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('有效期不能为空'))
              }
            },
            trigger: 'change'
          }
        ],
        expirationDate: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('检验有效期不能为空'))
              }
            },
            trigger: 'change'
          }
        ],
        engineNumber: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9A-Za-z]{1,50}$/
                if (!reg.test(value)) {
                  callback(new Error('发动机号码输入有误，请重新输入'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('发动机号码不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        overallQuality: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(new Error('请输入数字类型，只保留两位小数'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('整备质量不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        allowableWeight: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(new Error('请输入数字类型，只保留两位小数'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('核定载质量不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        transportCertificateNumber: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9a-zA-Z]{1,50}$/
                if (!reg.test(value)) {
                  callback(new Error('行驶证号码输入有误，请重新输入'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('行驶证号码不能为空'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  // 生命周期
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
    // 上传
    upload(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      imgUpload(formData)
        .then((res) => {
          this.vehiclesDriving.picture = res.data
        })
        .catch(() => {
          this.$message.error('上传失败')
        })
    },
    // 图片改变
    imageChange(value) {
      this.diasbledImg = !value.length
      this.vehiclesDriving.picture = value
    },
    // 获取车辆详情-行驶证信息
    async getList(id) {
      const { data: res } = await truckTypeDrivingLicenseDetail(id)
      this.vehiclesDriving.id = res.id
      this.vehiclesDriving.engineNumber = res.engineNumber
      this.vehiclesDriving.registrationDate = res.registrationDate
      this.vehiclesDriving.mandatoryScrap = res.mandatoryScrap
      this.vehiclesDriving.overallQuality = res.overallQuality
      this.vehiclesDriving.expirationDate = res.expirationDate
      this.vehiclesDriving.allowableWeight = res.allowableWeight
      this.vehiclesDriving.outsideDimensions = res.outsideDimensions
      this.vehiclesDriving.validityPeriod = res.validityPeriod
      this.vehiclesDriving.picture = res.picture
        ? res.picture.split(',').map((item) => {
          return { url: item }
        })
        : ''
      this.diasbledImg = !res.picture
      this.vehiclesDriving.transportCertificateNumber =
        res.transportCertificateNumber
    },
    // 编辑基本信息
    async handleEditVehicleDriving() {
      this.isShowDriving = false
      this.disabledStr = false
      this.disabledAvatar = false
    },
    // 保存
    async handleSubVehicleDriving() {
      const {
        transportCertificateNumber,
        engineNumber,
        registrationDate,
        mandatoryScrap,
        overallQuality,
        expirationDate,
        allowableWeight,
        validityPeriod
      } = this.vehiclesDriving
      if (!transportCertificateNumber) {
        return this.$message.error('请填写行驶证号')
      } else if (!engineNumber) {
        return this.$message.error('请填写发动机号码')
      } else if (!registrationDate) {
        return this.$message.error('请填写注册时间')
      } else if (!mandatoryScrap) {
        return this.$message.error('请填写强制报废日期')
      } else if (!overallQuality) {
        return this.$message.error('请填写整备质量')
      } else if (!expirationDate) {
        return this.$message.error('请填写检验有效期')
      } else if (!allowableWeight) {
        return this.$message.error('请填写核定载质量')
      } else if (!validityPeriod) {
        return this.$message.error('请填写有效期')
      }
      this.$refs['vehiclesDriving'].validate(async (valid) => {
        if (this.vehiclesDriving.picture.length < 2) {
          return this.$message.error('行驶证照片必须上传两张')
        }
        if (valid) {
          const data = {
            id: this.vehiclesDriving.id,
            engineNumber: this.vehiclesDriving.engineNumber,
            registrationDate: this.vehiclesDriving.registrationDate,
            mandatoryScrap: this.vehiclesDriving.mandatoryScrap,
            overallQuality: this.vehiclesDriving.overallQuality,
            expirationDate: this.vehiclesDriving.expirationDate,
            allowableWeight: this.vehiclesDriving.allowableWeight,
            outsideDimensions: this.vehiclesDriving.outsideDimensions,
            validityPeriod: this.vehiclesDriving.validityPeriod,
            transportCertificateNumber:
              this.vehiclesDriving.transportCertificateNumber,
            picture: this.vehiclesDriving.picture
              .map((item) => {
                return item.size ? item.response.data : item.url
              })
              .join()
          }
          await truckTypeDrivingLicense(this.id, data).then((res) => {
            if (String(res.code) === '200') {
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
              this.isShowDriving = true
              this.disabledStr = true
              this.disabledAvatar = true
            }
          })
        }
      })
    },
    // 取消
    handleCanVehicleDriving() {
      this.isShowDriving = true
      this.disabledStr = true
    }
  }
}
</script>
<style lang="scss" scoped>
.read {
  /deep/ .el-input__inner {
    padding-left: 0px;
  }
  /deep/ .el-form-item {
    height: 20px;
  }
}
.edit {
  /deep/ .el-form-item {
    height: 40px;
  }
}
/deep/ .el-input__suffix {
  top: 0px !important;
}
/deep/ .el-aside {
  color: #333;
}
/deep/ .el-row {
  margin-bottom: 20px;
}

/deep/ .el-upload {
  border: 1px dashed #d9d9d9;
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
    position: relative;
    bottom: 25px;
    /deep/ .el-card {
      .el-card__body {
        padding-left: 30px;
      }
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
      padding-top: 5px !important;
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
            min-width: 120px;
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

/deep/ .el-form-item__label {
  font-weight: 400;
  text-align: left;
  padding-right: 0px;
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
.customer-details-box .form-item {
  width: 100% !important;
  padding-right: 0px;
}
/deep/ .el-date-editor {
  width: auto !important;
}
//只读状态下不展示表单提示语
.read{
  /deep/ .el-form-item__error {
    display: none;
  }
}
</style>
