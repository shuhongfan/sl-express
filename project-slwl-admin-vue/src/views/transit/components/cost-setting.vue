<!-- 成本设置 -->
<template>
  <div>
    <el-dialog
      title="成本设置"
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
          label="线路类型"
          class="title"
        >
          <span>每公里平均成本（元）</span>
        </el-form-item>
        <el-form-item
          label="干线："
          prop="transportLineType1"
        >
          <el-input
            v-model="formBase.transportLineType1"
            placeholder="请输入"
            maxlength="8"
          />
        </el-form-item>
        <el-form-item
          label="支线："
          prop="transportLineType2"
        >
          <el-input
            v-model="formBase.transportLineType2"
            placeholder="请输入"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item
          label="接驳："
          prop="transportLineType3"
        >
          <el-input
            v-model="formBase.transportLineType3"
            placeholder="请输入"
            maxlength="15"
          />
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
import { setCostSetting } from '@/api/transit'
export default {
  props: {
    formBase: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      // 表单验证
      ruleInline: {
        transportLineType1: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('干线不能为空'))
              } else {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else {
                  callback()
                }
              }
            },
            trigger: 'blur'
          }
        ],
        transportLineType2: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('支线不能为空'))
              } else {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else {
                  callback()
                }
              }
            },
            trigger: 'blur'
          }
        ],
        transportLineType3: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('接驳不能为空'))
              } else {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else {
                  callback()
                }
              }
            },
            trigger: 'blur'
          }
        ]
      },
      flag: true// 防止重复点击生成一下生成很多条相同的线路
    }
  },

  // 创建完毕状态
  created() {
  },
  mounted() {

  },
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
    // 表单提交
    createData() {
      if (!this.flag) {
        return
      }
      this.flag = false
      this.$refs['dataForm'].validate(async (valid) => {
        if (valid) {
          await setCostSetting(
            [
              {
                transportLineType: 3,
                cost: Number(this.formBase.transportLineType3)
              },
              {
                transportLineType: 2,
                cost: Number(this.formBase.transportLineType2)
              },
              {
                transportLineType: 1,
                cost: Number(this.formBase.transportLineType1)
              }
            ]
          )
            .then((res) => {
              this.dialogFormH()
              if (String(res.code) === '200') {
                this.$message.success('成本修改成功')
                this.$emit('resetCostSetting')
              } else {
                this.$message.error(res.msg || '成本修改失败')
              }
              this.flag = true
            })
            .catch((err) => {
              this.$message.error(err.msg || '成本修改失败')
              this.flag = true
            })
        } else {
          this.flag = true
          this.$message.error('请按照提示填写!')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add-form-dialog {
  /deep/ .el-dialog__body {
    padding: 40px 66px 0 50px !important;
  }
  /deep/ .title{
    .el-form-item__content{
      text-align: left;
    }
    .el-form-item__label{
      padding-right: 20px;
    }
  }
}
</style>
