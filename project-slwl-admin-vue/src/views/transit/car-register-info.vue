<!-- 回单查看 -->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="item">
        <!-- 基本信息 -->
        <el-container class="customer-details-box base-info">
          <el-card
            shadow="never"
            style="width: 100%"
          >
            <div class="block">
              <div class="car-base task-info base-info">基本信息</div>
              <el-card
                shadow="never"
                class="form-box"
              >
                <div class="form-item-box">
                  <div class="form-item">
                    <span class="span-title">运输任务编号：</span>
                    <el-input v-model="taskInfo.transportTaskId" />
                  </div>
                  <div class="form-item">
                    <span class="span-title">车牌号码：</span>
                    <el-input v-model="taskInfo.licensePlate" />
                  </div>
                  <div class="form-item">
                    <span class="span-title">起始地机构：</span>
                    <el-input v-model="taskInfo.startAgencyName" />
                  </div>
                  <div class="form-item">
                    <span class="span-title">目的地机构：</span>
                    <el-input v-model="taskInfo.endAgencyName" />
                  </div>
                  <div class="form-item">
                    <span class="span-title">出车时间：</span>
                    <el-input v-model="taskInfo.outStorageTime" />
                  </div>
                  <div class="form-item">
                    <span class="span-title">回车时间：</span>
                    <el-input v-model="taskInfo.intoStorageTime" />
                  </div>
                  <div class="form-item driver">
                    <span class="span-title">司机：</span>
                    <el-input
                      v-model="taskInfo.driverName"
                    />
                  </div>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-container>
        <div
          v-if="taskInfo.isFault==='是' || taskInfo.isBreakRules==='是'||taskInfo.isAccident==='是'"
          class="by-accident"
        >
          <!-- 故障信息 -->
          <el-container
            class="customer-details-box breakdown-info"
            style="margin-top: 20px"
          >
            <el-card
              shadow="never"
              style="width: 100%"
            >
              <div class="block">
                <div class="car-base task-info">故障信息</div>
                <el-card
                  shadow="never"
                  class="form-box"
                >
                  <div class="form-item-box">
                    <div class="form-item">
                      <span class="span-title">车辆故障：</span>
                      <el-input v-model="taskInfo.isFault" />
                    </div>
                    <div class="form-item">
                      <span class="span-title">是否可用：</span>
                      <el-input v-model="taskInfo.isAvailable" />
                    </div>
                    <div class="form-item">
                      <span class="span-title">故障类型：</span>
                      <el-input v-model="taskInfo.faultType" />
                    </div>
                    <div
                      class="form-item"
                      style="align-items:flex-start"
                    >
                      <span class="span-title">故障图片：</span>
                      <div
                        v-if="taskInfo.faultImages.length"
                        style="display:flex"
                      >
                        <div
                          v-for="(item,index) in taskInfo.faultImages"
                          :key="index"
                          class="img-box"
                        >
                          <img
                            style="width: 212px; height: 159px; border-radius: 4px"
                            :src="item"
                          />
                          <div class="img-shadow">
                            <img
                              class="el-upload-span searchBigImg"
                              src="../../assets/img-search.png"
                              @click.stop="searchBigImg(item)"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        v-else
                        style="color:#818693;font-size:14px"
                      >无</div>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-card>
          </el-container>
          <!-- 违章信息 -->
          <el-container
            class="customer-details-box breakRules-info"
            style="margin-top: 20px"
          >
            <el-card
              shadow="never"
              style="width: 100%"
            >
              <div class="block">
                <div class="car-base task-info">违章信息</div>
                <el-card
                  shadow="never"
                  class="form-box"
                >
                  <div class="form-item-box">
                    <div class="form-item">
                      <span class="span-title">车辆违章：</span>
                      <el-input v-model="taskInfo.isBreakRules" />
                    </div>
                    <div class="form-item">
                      <span class="span-title">违章类型：</span>
                      <el-input v-model="taskInfo.breakRulesType" />
                    </div>
                    <div class="form-item">
                      <span class="span-title">罚款金额：</span>
                      <el-input v-model="taskInfo.penaltyAmount" />
                    </div>
                    <div
                      class="form-item"
                      style="align-items:flex-start"
                    >
                      <span class="span-title">扣分：</span>
                      <el-input v-model="taskInfo.deductPoints" />
                    </div>
                  </div>
                </el-card>
              </div>
            </el-card>
          </el-container>
          <!-- 事故信息 -->
          <el-container
            class="customer-details-box accident-info"
            style="margin-top: 20px;margin-bottom:60px"
          >
            <el-card
              shadow="never"
              style="width: 100%"
            >
              <div class="block">
                <div class="car-base task-info">事故信息</div>
                <el-card
                  shadow="never"
                  class="form-box"
                >
                  <div class="form-item-box">
                    <div class="form-item">
                      <span class="span-title">车辆事故：</span>
                      <el-input v-model="taskInfo.isAccident" />
                    </div>
                    <div class="form-item">
                      <span class="span-title">事故类型：</span>
                      <el-input v-model="taskInfo.accidentType" />
                    </div>
                    <div
                      class="form-item"
                      style="align-items:flex-start;margin-top:20px!important"
                    >
                      <span class="span-title">事故图片：</span>
                      <div
                        v-if="taskInfo.accidentImages.length"
                        style="display:flex"
                      >
                        <div
                          v-for="(item,index) in taskInfo.accidentImages"
                          :key="index"
                          class="img-box"
                        >
                          <img
                            style="width: 212px; height: 159px; border-radius: 4px"
                            :src="item"
                          />
                          <div class="img-shadow">
                            <img
                              class="el-upload-span searchBigImg"
                              src="../../assets/img-search.png"
                              @click.stop="searchBigImg(item)"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        v-else
                        style="color:#818693;font-size:14px"
                      >无</div>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-card>
          </el-container>
        </div>
        <!-- 异常信息 -->
        <el-container
          v-else
          class="customer-details-box breakdown-info"
          style="margin-top: 20px"
        >
          <el-card
            shadow="never"
            style="width: 100%"
          >
            <div class="block">
              <div class="car-base task-info">异常信息</div>
              <el-card
                shadow="never"
                class="form-box"
              >
                <div class="form-item-box">
                  <div class="form-item">
                    <span class="span-title">车辆故障：</span>
                    <el-input v-model="taskInfo.isFault" />
                  </div>
                  <div class="form-item">
                    <span class="span-title">车辆违章：</span>
                    <el-input v-model="taskInfo.isBreakRules" />
                  </div>
                  <div class="form-item">
                    <span class="span-title">车辆事故：</span>
                    <el-input v-model="taskInfo.isAccident" />
                  </div>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-container>
      </div>
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
  </div>
</template>
<script>
import { carRegisterInfo } from '@/api/branch'
export default {
  data() {
    return {
      imageUrl: '',
      dialogVisible: false,
      taskInfo: {
        transportTaskId: '', // 运输任务id
        licensePlate: '', // 车牌号码
        startAgencyName: '', // 起始地机构
        endAgencyName: '', // 目的地机构
        outStorageTime: '', // 出车时间
        intoStorageTime: '', // 回车时间
        driverName: '', // 司机
        isFault: '', // 是否故障
        isAvailable: '', // 是否可用
        faultType: '', // 故障类型
        faultImages: [], // 故障图片
        isBreakRules: '', // 是否违章
        breakRulesType: '', // 违章类型
        penaltyAmount: '', // 罚款金额
        deductPoints: '', // 扣分
        accidentImages: [], // 事故照片
        isAccident: '', // 是否事故
        accidentType: '' // 事故类型
      },
      breakRulesType: [
        {
          key: 1,
          value: '闯红灯'
        },
        {
          key: 2,
          value: '无证驾驶'
        },
        {
          key: 3,
          value: '超载'
        },
        {
          key: 4,
          value: '酒后驾驶'
        },
        {
          key: 5,
          value: '超速行驶,可用'
        }
      ],
      accidentType: [
        {
          key: 1,
          value: '直行事故'
        },
        {
          key: 2,
          value: '追尾事故'
        },
        {
          key: 3,
          value: '超车事故'
        },
        {
          key: 4,
          value: '左转弯事故'
        },
        {
          key: 5,
          value: '右转弯事故'
        },
        {
          key: 6,
          value: '弯道事故'
        },
        {
          key: 7,
          value: '坡道事故'
        },
        {
          key: 8,
          value: '会车事故'
        },
        {
          key: 9,
          value: '其他,可用'
        }
      ],
      faultType: [
        {
          key: 1,
          value: '发动机启动困难'
        },
        {
          key: 2,
          value: '不着车'
        },
        {
          key: 3,
          value: '漏油'
        },
        {
          key: 4,
          value: '漏水'
        },
        {
          key: 5,
          value: '照明失灵'
        },
        {
          key: 6,
          value: '有异响'
        },
        {
          key: 7,
          value: '排烟异常'
        },
        {
          key: 8,
          value: '温度异常'
        },
        {
          key: 9,
          value: '其他,可用'
        }
      ]
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(this.id)
  },
  methods: {
    // 查询大图
    searchBigImg(url) {
      this.imageUrl = url
      this.dialogVisible = true
    },
    // 获取运输详情基本信息
    async getList(id) {
      const { data: res } = await carRegisterInfo(id)

      this.taskInfo = res
      this.taskInfo.isFault = res.isFault ? '是' : '否'
      this.taskInfo.isAvailable = res.isAvailable ? '是' : '否'
      this.taskInfo.faultType = res.faultType ? this.faultType.filter(
        (item) => item.key === res.faultType
      )[0].value : '无'
      this.taskInfo.breakRulesType = res.breakRulesType ? this.breakRulesType.filter(
        (item) => item.key === res.breakRulesType
      )[0].value : '无'
      this.taskInfo.isBreakRules = res.isBreakRules ? '是' : '否'
      this.taskInfo.penaltyAmount = res.penaltyAmount + '元'
      this.taskInfo.deductPoints = res.deductPoints + '分'
      this.taskInfo.isAccident = res.isAccident ? '是' : '否'
      this.taskInfo.accidentType = res.accidentType ? this.accidentType.filter(
        (item) => item.key === res.accidentType
      )[0].value : '无'
      this.taskInfo.accidentImages = res.accidentImages
        ? res.accidentImages.split(',')
        : []
      this.taskInfo.faultImages = res.faultImages
        ? res.faultImages.split(',')
        : []
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .customer-details-box{
  border-radius: 4px;
}
/deep/ .el-input__inner {
  padding-left: 0px !important;
  padding-right: 0 !important;
  width: 160px !important;
}
/deep/ .form-item {
  width: 25% !important;
}
/deep/ .form-item.driver{
  .el-input__inner{
    width: 250px!important;
  }
}
/deep/ .img-box {
  display: inline-block;
  position: relative;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-right: 20px;
  height: 161px;
  width: 214px;
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
//基本信息
.base-info {
  .form-item:nth-child(4) {
    margin-top: 0px !important;
    .span-title {
      min-width: 90px !important;
    }
  }
  .form-item:nth-child(2) {
    .span-title {
      min-width: 75px !important;
    }
  }

  .form-item:nth-child(3) {
    .span-title {
      min-width: 90px !important;
    }
  }
  .form-item:nth-child(6) {
    .span-title {
      min-width: 75px !important;
    }
  }
  .form-item:nth-child(7) {
    .span-title {
      min-width: 90px !important;
    }
  }
}
//基本信息
.base-info{
  .form-item:nth-child(2){
    width:24%!important ;
  }
   .form-item:nth-child(4){
    width:23%!important ;
  }
.form-item:nth-child(1),.form-item:nth-child(5){
    width:28%!important ;
  }
  .form-item:nth-child(6){
    width:24%!important ;
  }
}
//故障信息
.breakdown-info {
  .form-item {
    width: 33.3% !important;
  }
}

//违章信息
.breakRules-info {
  .form-item:nth-child(4) {
    margin-top: 0px !important;
  }
}

//事故信息
.accident-info {
  .form-item {
    width: 50%!important;
  }
  .form-item:nth-child(1),.form-item:nth-child(1){
    width: 33%!important;
  }
  /deep/ .el-card__body{
    padding-bottom: 32px!important;
  }
  .form-item-box{
    display: block;
  }
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
      padding-right: 0px !important;
      .form-item-box {
        display: flex;
        flex-wrap: wrap;
        .form-item {
          width: 50%;
          display: flex;
          align-items: center;
          margin-top: 24px;
          box-sizing: border-box;
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
}
</style>
<style lang="scss" scoped>
.app-container {
  padding-bottom: 0px;
  .aside-box {
    background: #ffffff;
    border-radius: 4px;
    width: 150px;
    padding: 37px 35px;
    box-sizing: border-box;
    min-height: calc(100vh - 50px);
    /deep/ .el-aside {
      width: 80px !important;
      background-color: #ffffff;
      text-align: left;
      font-size: 14px;
      .aside-item {
        margin-top: 38px;
        cursor: pointer;
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
  .item {
    margin-bottom: 20px;
    .car-base {
      margin-top: 0px;
      height: 60px;
      background-color: #f8faff;
      padding: 20px 20px 20px 44px;
      margin-bottom: 8px;
    }
    /deep/ .el-card {
      .el-card__body {
        padding: 0;
        // padding-bottom: 13px;
      }
    }

    /deep/ .form-box {
      .el-card__body {
        padding-bottom: 24px !important;
        padding-right: 40px;
        padding-left: 20px;
      }
      .el-input__inner {
        background-color: white;
        border: none;
        height: 20px;
        color: #818693;
      }
    }

    .block {
      padding: 0;
    }
    .customer-details-box {
      margin-left: 0px;
    }
  }
}
</style>
