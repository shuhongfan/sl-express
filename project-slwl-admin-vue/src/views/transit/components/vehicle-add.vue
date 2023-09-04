<!-- 新增编辑车辆 -->
<template>
  <div>
    <el-dialog
      :title="titleInfo.text"
      :visible.sync="dialogFormVisible"
      width="600px"
    >
      <el-form
        ref="dataForm"
        :rules="ruleInline"
        :model="formBase"
        label-position="right"
        label-width="110px"
        style="width: 100%"
      >
        <el-form-item
          label="车辆类型"
          prop="truckType"
        >
          <el-select
            v-model="formBase.truckType"
            value-key="id"
            placeholder="请选择"
            style="width: 100%"
            clearable
            @change="selectTruckTypeGet"
          >
            <el-option
              v-for="item in truckTypeOptions"
              :key="item.id"
              :value="item.name"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="车牌号码"
          prop="licensePlate"
        >
          <el-input
            v-model="formBase.licensePlate"
            placeholder="请输入车牌号码"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item
          label="GPS设备ID"
          prop="deviceGpsId"
        >
          <el-input
            v-model="formBase.deviceGpsId"
            placeholder="请输入GPS设备ID"
            maxlength="80"
          />
        </el-form-item>
        <!-- <el-form-item
          label="准载重量"
          prop="allowableLoad"
        >
          <el-input
            v-model="formBase.allowableLoad"
            placeholder="请输入准载重量"
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
              "
            >吨</span>
          </el-input>
        </el-form-item>
        <el-form-item
          label="准载体积"
          prop="allowableVolume"
        >
          <el-input
            v-model="formBase.allowableVolume"
            placeholder="请输入准载体积"
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
              "
            >立方</span>
          </el-input>
        </el-form-item> -->
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        style="text-align: center"
      >
        <el-button
          class="save-btn"
          @click="createData"
        >确认</el-button>
        <el-button
          class="cancel-btn"
          @click="dialogFormH"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { truckTypeCommonList } from '@/api/common'
import { truckTypeAdd } from '@/api/transit'
export default {
  name: 'VehicleAdd',
  props: {
    titleInfo: {
      type: Object,
      required: true
    },
    formBase: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      truckTypes: [],
      fleets: [],
      fleetOptions: [],
      truckTypeOptions: [],
      dialogFormVisible: false,
      // 表单验证
      ruleInline: {
        licensePlate: [
          {
            required: true,
            // message: '车牌号码不能为空',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value) {
                const reg =
                  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
                if (!reg.test(value)) {
                  callback(new Error('请输入正确格式的车牌号'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('车牌号码不能为空'))
              }
            }
          }
        ],

        truckType: [
          { required: true, message: '车辆类型不能为空', trigger: 'blur' }
        ],
        deviceGpsId: [
          { required: true, message: 'GPS设备ID不能为空', trigger: 'blur' }
        ],
        allowableLoad: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^\d+(.\d{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else if (value > 100 || value < 1) {
                  callback(new Error('只可输入1-100之间的整数'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('准载重量不能为空'))
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
                const reg = /^\d+(.\d{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else if (value > 100 || value < 1) {
                  callback(new Error('只可输入1-100之间的整数'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('准载体积不能为空'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  // 挂载结束
  mounted: function () {},
  // 创建完毕状态
  created() {
    this.getTruckTypeList()
  },
  // 组件更新
  updated: function () {},
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
      this.$refs['dataForm'].resetFields()
    },
    selectTruckTypeGet(vId) {
      let obj = {}
      obj = this.truckTypeOptions.find((item) => {
        return item.name === vId
      })
      this.formBase.truckType = obj.name
      this.truckTypes.name = obj.name
      this.truckTypes.id = obj.id
    },
    // 获取车辆类型列表数据
    async getTruckTypeList() {
      const { data: res } = await truckTypeCommonList()
      // 获取数据给options
      this.truckTypeOptions = res
    },
    // 表单提交
    createData() {
      this.$refs['dataForm'].validate(async (valid) => {
        if (valid) {
          const data = {
            deviceGpsId: this.formBase.deviceGpsId,
            licensePlate: this.formBase.licensePlate,
            allowableLoad: this.formBase.allowableLoad,
            allowableVolume: this.formBase.allowableVolume,
            truckTypeId: this.truckTypes.id,
            truckTypeName: this.truckTypes.name
          }
          // eslint-disable-next-line no-undef
          await truckTypeAdd(data).then((res) => {
            //  && String(res.data.code) === '0'
            if (String(res.code) === '200') {
              this.$message.success('新增车辆成功')
              this.$emit('newDataes', this.formBase)
              this.dialogFormH()
            } else {
              this.$message.error('新增车辆失败')
            }
          })
        } else {
          this.$message.error('*号为必填项!')
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
/deep/ .el-dialog__body {
  padding: 40px 50px 0 20px !important;
}
</style>
