<!-- 车型添加 -->
<template>
  <div>
    <el-dialog
      :title="titleInfo.text"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :before-close="dialogFormH"
      width="600px"
    >
      <el-form
        ref="dataForm"
        :rules="ruleInline"
        :model="formBase"
        label-position="right"
        label-width="130px"
        style="width: 100%"
        algin="center"
      >
        <el-form-item
          label="车辆类型"
          prop="name"
        >
          <el-input
            v-model="formBase.name"
            placeholder="请输入车辆类型"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item
          label="应载重量"
          prop="allowableLoad"
        >
          <el-input
            v-model="formBase.allowableLoad"
            placeholder="请输入车型载重"
            maxlength="10"
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
          label="应载体积"
          prop="allowableVolume"
        >
          <el-input
            v-model="formBase.allowableVolume"
            placeholder="请输入车型体积"
            maxlength="10"
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
        </el-form-item>
        <el-form-item
          label="长"
          prop="measureLong"
        >
          <el-input
            v-model="formBase.measureLong"
            placeholder="请输入长"
            maxlength="10"
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
            >米</span>
          </el-input>
        </el-form-item>
        <el-form-item
          label="宽"
          prop="measureWidth"
        >
          <el-input
            v-model="formBase.measureWidth"
            placeholder="请输入宽"
            maxlength="10"
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
            >米</span>
          </el-input>
        </el-form-item>
        <el-form-item
          label="高"
          prop="measureHigh"
        >
          <el-input
            v-model="formBase.measureHigh"
            placeholder="请输入高"
            maxlength="10"
            :max="100"
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
            >米</span>
          </el-input>
        </el-form-item>
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
import { add, update } from '@/api/transit'
export default {
  name: 'CarModelsAdd',
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
      selectShow: false,
      options: [],
      requestParameters: {
        page: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      ruleInline: {
        // 车辆类型名
        name: [
          { required: true, message: '车型名称不能为空', trigger: 'blur' }
        ],
        // 货品类型
        goodsTypes: [
          { required: true, message: '货品类型不能为空', trigger: 'blur' }
        ],
        // 应载重量
        allowableLoad: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[1-9]\d*$/
                if (!reg.test(Number(value))) {
                  callback(new Error('只能输入1-100之间的正整数，请重新输入'))
                } else if (value > 100 || value < 1) {
                  callback(new Error('只可输入1-100之间的整数'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('应载重量不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        // 应载体积
        allowableVolume: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[1-9]\d*$/
                if (!reg.test(value)) {
                  callback(new Error('只能输入1-100之间的正整数，请重新输入'))
                } else if (value > 100 || value < 1) {
                  callback(new Error('只可输入1-100之间的整数'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('应载体积不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        // 长
        measureLong: [
          {
            required: false,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else if (value > 100) {
                  callback(new Error('长最多只能输入100，请重新输入'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // 宽
        measureWidth: [
          {
            required: false,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else if (value > 100) {
                  callback(new Error('宽最多只能输入100，请重新输入'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // 高
        measureHigh: [
          {
            required: false,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else if (value > 100) {
                  callback(new Error('高最多只能输入100，请重新输入'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  // 组件更新
  updated: function () {},
  methods: {
    getSelectShowFn() {
      this.selectShow = true
    },
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
      this.selectShow = false
      this.$refs['dataForm'].resetFields()
    },
    // 添加车辆类型
    createData() {
      this.$refs['dataForm'].validate(async (valid) => {
        if (valid) {
          const data = {
            name: this.formBase.name,
            allowableLoad: this.formBase.allowableLoad,
            allowableVolume: this.formBase.allowableVolume,
            measureHigh: this.formBase.measureHigh,
            measureLong: this.formBase.measureLong,
            measureWidth: this.formBase.measureWidth,
            goodsTypes: this.formBase.goodsTypes
          }
          if (this.formBase.id) {
            await update(this.formBase.id, data).then((res) => {
              if (String(res.code) === '200') {
                this.$message({
                  message: '操作成功！',
                  type: 'success'
                })

                this.$emit('newDataes', this.formBase)
                this.dialogFormH()
              }
            })
          } else {
            await add(data).then((res) => {
              //  && String(res.data.code) === '0'
              if (String(res.code) === '200') {
                this.$message({
                  message: '操作成功！',
                  type: 'success'
                })
                this.$emit('newDataes', this.newDataes)
                this.dialogFormH()
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
            })
          }
          this.selectShow = false
        } else {
          this.$message.error('*号为必填项!')
        }
      })
    }
  }
}
</script>
