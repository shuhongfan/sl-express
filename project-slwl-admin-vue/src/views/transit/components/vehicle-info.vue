<template>
  <el-container
    class="customer-details-box vehicle-info"
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
          <el-form
            :model="vehicles"
            :rules="rules"
          >
            <div class="form-item-box">
              <div class="form-item">
                <el-form-item
                  label="车辆编号："
                  prop="id"
                >
                  <!-- <span class="span-title">车辆编号：</span> -->
                  <el-input
                    v-model="vehicles.id"
                    :disabled="true"
                    :placeholder="isShow?'--':'请输入车辆编号'"
                    maxlength="20"
                  />
                </el-form-item>

              </div>
              <div class="form-item">
                <el-form-item
                  label="车牌号码："
                  prop="licensePlate"
                >
                  <el-input
                    v-model="vehicles.licensePlate"
                    :disabled="isShow"
                    :placeholder="isShow?'--':'请输入车牌号码'"
                    maxlength="15"
                  />
                </el-form-item>
                <!-- <span class="span-title">车牌号码：</span> -->

              </div>
              <div class="form-item">
                <el-form-item
                  label="车型名称："
                  prop="truckTypeName"
                >
                  <!-- <span class="span-title">车型名称：</span> -->
                  <el-select
                    v-model="vehicles.truckTypeName"
                    value-key="id"
                    :disabled="isShow"
                    :placeholder="isShow?'--':'请选择车型名称'"
                    clearable
                    @change="selectTruckTypeGet"
                  >
                    <el-option
                      v-for="item in carTypeList"
                      :key="item.id"
                      :value="item.name"
                      :label="item.name"
                    />
                  </el-select>
                </el-form-item>

              </div>
              <div class="form-item">
                <el-form-item
                  label="车辆体积："
                  prop="allowableVolume"
                >
                  <!-- <span class="span-title">车辆体积：</span> -->
                  <el-input
                    v-model="isShow?vehicles.allowableVolume +' m³':vehicles.allowableVolume"
                    :disabled="isShow"
                    :placeholder="isShow?'--':'请输入车辆体积'"
                    maxlength="20"
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
                    >m³</span>
                  </el-input></el-form-item>

              </div>
              <div class="form-item">
                <el-form-item
                  label="车辆载重："
                  prop="allowableLoad"
                >
                  <!-- <span class="span-title">车辆载重：</span> -->
                  <el-input
                    v-model="isShow?vehicles.allowableLoad + ' 吨':vehicles.allowableLoad"
                    :disabled="isShow"
                    :placeholder="isShow?'--':'请输入车辆载重'"
                    maxlength="20"
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
                  </el-input></el-form-item>

              </div>
              <div class="form-item">
                <el-form-item
                  label="GPSID："
                  prop="deviceGpsId"
                >
                  <!-- <span class="span-title">GPSID：</span> -->
                  <el-input
                    v-model="vehicles.deviceGpsId"
                    :disabled="isShow"
                    :placeholder="isShow?'--':'请输入GPSID'"
                    maxlength="20"
                    style="margin-left:12px"
                  />
                </el-form-item>

              </div>
            </div>
          </el-form>

        </el-card>
        <div class="car-base car-img-base drive-base">
          <span
            class="imgUpload-label"
            style="margin-right:14px;margin-left:12px"
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
                :prop-image-url="vehicles.picture"
                :disabled="isShow"
                :edit-type="isShow?'read':'edit'"
                :is-show-example-img="diasbledImg"
                :example-list="['https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/2a6cbcb0-93d0-41a3-ae18-248ee68c1def.png','https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/95f1ad63-c8f0-4be3-a5e9-c3c9320de30f.png']"
                @imageChange="imageChange"
              >
                注：图片大小不超过5M；仅能上传 PNG JPEG JPG类型图片；建议上传400*300尺寸的图片；最多上传2张
              </ImageUpload>
              <div
                v-else
                class="read-img"
                style="padding-left:15px"
              >
                <img
                  v-if="!vehicles.picture.length"
                  src="../../../assets/empty-img.png"
                  style="width:212px;height:159px;border: 1px solid #D8DDE3;border-radius: 4px;"
                />

                <div
                  v-for="(item,index) in vehicles.picture"
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
      class="footer-box"
    >
      <el-button
        class="save-btn"
        type="warning"
        @click="handleEditVehicleInfo()"
      >编辑</el-button>
    </div>
    <div
      v-else
      class="footer-box"
    >
      <el-button
        class="save-btn"
        type="warning"
        @click="handleSubVehicleInfo()"
      >保存</el-button>
      <el-button
        class="cancel-btn"
        type="warning"
        plain
        @click="handleCanVehicleInfo()"
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
import { truckTypeDetail, truckTypeUpdate, getCarTypeList } from '@/api/transit'
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
      disabled: true,
      isShow: true,
      disabledLicensePlate: true,
      disabledAllowableVolume: true,
      disabledAllowableLoad: true,
      disabledGPSID: true,
      vehicles: {
        id: '',
        licensePlate: '',
        fleetName: '',
        truckTypeName: '',
        truckTypeId: '',
        allowableVolume: '',
        allowableLoad: '',
        deviceGpsId: '',
        workStatus: '',
        picture: []
      },
      carTypeList: [],
      rules: {
        id: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('车辆编号输入有误，请重新输入')
                  )
                } else {
                  callback()
                }
              } else {
                callback(new Error('车辆编号不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        allowableVolume: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('请输入车辆体积，只保留两位小数')
                  )
                } else {
                  callback()
                }
              } else {
                callback(new Error('车辆体积不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        licensePlate: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg =
                  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
                if (!reg.test(value)) {
                  callback(
                    new Error('请输入正确的车牌号码')
                  )
                } else {
                  callback()
                }
              } else {
                callback(new Error('车牌号码不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        truckTypeName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('车型名称不能为空'))
              }
            },
            trigger: 'change'
          }
        ],
        allowableLoad: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('请输入车辆载重，只保留两位小数')
                  )
                } else {
                  callback()
                }
              } else {
                callback(new Error('车辆载重不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        deviceGpsId: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('GPSID输入有误，请重新输入')
                  )
                } else {
                  callback()
                }
              } else {
                callback(new Error('GPSID不能为空'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(this.id)
    this.getCarTypeList()
  },
  methods: {
    // 查询大图
    searchBigImg(file) {
      this.imageUrl = file.url
      this.dialogVisible = true
    },
    selectTruckTypeGet(vId) {
      let obj = {}
      obj = this.carTypeList.find((item) => {
        return item.name === vId
      })
      this.$set(this.vehicles, 'truckTypeName', obj.name)
      this.$set(this.vehicles, 'truckTypeId', obj.id)
    },
    async getCarTypeList() {
      const { data: res } = await getCarTypeList()
      this.carTypeList = res
    },
    imageChange(value) {
      this.diasbledImg = !value.length
      this.vehicles.picture = value.map((item) => {
        return { url: item.size ? item.response.data : item.url }
      })
    },
    // 获取车辆详情-基本信息
    async getList(id) {
      const { data: res } = await truckTypeDetail(id)
      this.vehicles.id = res.id
      this.vehicles.licensePlate = res.licensePlate
      this.vehicles.truckTypeName = res.truckTypeName
      this.vehicles.allowableVolume = res.allowableVolume
      this.vehicles.allowableLoad = res.allowableLoad
      this.vehicles.deviceGpsId = res.deviceGpsId
      this.vehicles.picture = res.picture
        ? res.picture.split(',').map((item) => {
          return { url: item }
        })
        : []
      this.diasbledImg = !res.picture
    },
    // 编辑基本信息
    async handleEditVehicleInfo() {
      this.isShow = false
    },
    // 保存
    async handleSubVehicleInfo() {
      const { deviceGpsId, picture, licensePlate, truckTypeName, allowableVolume, allowableLoad } = this.vehicles
      if (/[\u4E00-\u9FA5]/g.test(deviceGpsId)) {
        return this.$message.error('GPSID不能为中文')
      }
      if (picture.length < 1) {
        return this.$message.error('车辆信息照片至少上传一张')
      }
      if (!licensePlate) {
        return this.$message.error('请填写车牌号码')
      } else if (!truckTypeName) {
        return this.$message.error('请选择车型名称')
      } else if (!allowableVolume) {
        return this.$message.error('请填写车辆体积')
      } else if (!allowableLoad) {
        return this.$message.error('请填写车辆载重')
      } else if (!deviceGpsId) {
        return this.$message.error('GPSID')
      }

      const data = {
        deviceGpsId: this.vehicles.deviceGpsId,
        licensePlate: this.vehicles.licensePlate,
        allowableLoad: this.vehicles.allowableLoad,
        allowableVolume: this.vehicles.allowableVolume,
        truckTypeId: this.vehicles.truckTypeId,
        truckTypeName: this.vehicles.truckTypeName,
        picture: this.vehicles.picture
          .map((item) => {
            return item.size ? item.response.data : item.url
          })
          .join()
      }
      await truckTypeUpdate(this.vehicles.id, data).then((res) => {
        if (String(res.code) === '200') {
          this.$message({
            message: '保存成功！',
            type: 'success'
          })
          this.isShow = true
          this.disabledLicensePlate = true
          this.disabledAllowableVolume = true
          this.disabledAllowableLoad = true
          this.disabledGPSID = true
        }
      })
    },
    // 取消
    handleCanVehicleInfo() {
      this.isShow = true
      this.disabledLicensePlate = true
      this.disabledAllowableVolume = true
      this.disabledAllowableLoad = true
      this.disabledGPSID = true
      this.getList(this.id)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-card {
  height: 100%;
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
    margin-top: 10px;
    display: flex;
    padding-left: 25px;
    position: relative;
    bottom: 20px;
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
    /deep/ .el-card {
      .el-card__body {
        padding-left: 5px;
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
      padding-bottom: 30px;
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
    padding: 30px 0 16px;
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
/deep/ .el-form-item__content{
  white-space: nowrap;
  flex-wrap: nowrap;

}
/deep/ .el-form-item{
  margin-bottom: 0px;
  width: 100%;
}
/deep/ .el-form-item__label{
  font-size: 14px;
  color:#20232a ;
  font-weight: normal;
}
/deep/ .el-form-item__error{
  left: 90px;
}
/deep/ .el-date-editor{
  width:auto!important;
}
//只读状态下不展示表单提示语
.read{
  /deep/ .el-form-item__error {
    display: none;
  }
}
</style>
