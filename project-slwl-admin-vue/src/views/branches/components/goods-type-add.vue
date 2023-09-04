<!-- 货品类型添加 -->
<template>
  <div>
    <el-dialog
      :title="titleInfo.text"
      :visible.sync="dialogFormVisible"
      custom-class="way"
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
          label="货物类型名称"
          prop="name"
        >
          <el-input
            v-model="formBase.name"
            placeholder="请输入货物类型名称"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item
          label="运输车型"
          prop="truckType"
        >
          <el-select
            v-model="formBase.truckType"
            value-key="id"
            placeholder="请选择运输车型"
            style="width: 100%"
            multiple
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="默认重量 (千克)"
          prop="defaultWeight"
        >
          <el-input
            v-model="formBase.defaultWeight"
            placeholder="请输入默认重量"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          label="默认体积 (立方)"
          prop="defaultVolume"
        >
          <el-input
            v-model="formBase.defaultVolume"
            placeholder="请输入默认体积"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          label="说明"
          prop="remark"
        >
          <el-input
            v-model="formBase.remark"
            placeholder="请输入说明"
            maxlength="200"
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
import { truckTypeCommonList } from '@/api/common'
import { goodsTypeAdd, goodsTypeUpdate } from '@/api/branch'
export default {
  name: 'InstitutionsAdd',
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
      // 是否可以编辑
      options: '',
      disabled: true,
      activeClass: 'active',
      disactiveClass: 'disactive',
      dialogFormVisible: false,
      // 表单验证
      ruleInline: {
        truckType: [
          { required: true, message: '运输车型不能为空', trigger: 'blur' }
        ],
        remark: [{ required: true, message: '说明不能为空', trigger: 'blur' }],
        name: [
          {
            required: true,
            // message: '货物类型名称不能为空',
            validator: (rule, value, callback) => {
              if (value.trim()) {
                callback()
              } else {
                callback(new Error('货物类型名称不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        defaultWeight: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else {
                  callback()
                }
              } else {
                callback(new Error('重量不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        defaultVolume: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[0-9]+(.[0-9]{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else {
                  callback()
                }
              } else {
                callback(new Error('体积不能为空'))
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
      this.$refs['dataForm'].resetFields()
      this.dialogFormVisible = false
    },
    // 获取运输车型列表数据
    async getTruckTypeList() {
      const { data: res } = await truckTypeCommonList()
      // 获取数据给options
      this.options = res
    },
    // 表单提交
    createData() {
      this.$refs['dataForm'].validate(async (valid) => {
        if (valid) {
          const data = {
            name: this.formBase.name ? this.formBase.name.trim() : '',
            defaultVolume: this.formBase.defaultVolume,
            defaultWeight: this.formBase.defaultWeight,
            remark: this.formBase.remark,
            truckTypes:
              this.formBase.truckType.length > 0 ? this.formBase.truckType : []
          }
          if (this.formBase.id) {
            // eslint-disable-next-line no-undef
            await goodsTypeUpdate(this.formBase.id, data).then((res) => {
              if (String(res.code) === '200') {
                this.$message.success('修改成功')
                this.$emit('newDataes', this.formBase)
                this.dialogFormH()
              } else {
                this.$message.error('修改货物类型失败')
              }
            })
          } else {
            // eslint-disable-next-line no-undef
            await goodsTypeAdd(data).then((res) => {
              if (String(res.code) === '200') {
                this.$message.success('新增货物类型成功')
                this.$emit('newDataes', this.formBase)
                this.dialogFormH()
              } else {
                this.$message.error('新增货物类型失败')
              }
            })
          }
        } else {
          this.$message.error('*号为必填项!')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-form-item__label {
  white-space: nowrap;
}
/deep/ .el-dialog__footer {
  text-align: center;
}
</style>
