<template>
  <div class="add-form">
    <el-dialog
      :title="titleInfo.text"
      :visible.sync="dialogFormVisible"
      top="300px"
    >
      <el-form
        ref="dataForm"
        :rules="ruleInline"
        :model="institutionsAddForm"
        label-position="left"
        label-width="150px"
        style="width: 50%;"
      >
        <el-form-item
          label="选择快递员"
          prop="company"
        >
          <el-select
            v-model="value"
            style="width:300px"
            clearable
            placeholder="请选择"
          />
        </el-form-item>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            style="background-color:#E15536;color:#ffffff;"
            @click="createData"
          >确认</el-button>
          <el-button @click="dialogFormH">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'InstitutionsAdd',
  props: {
    titleInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 是否可以编辑
      disabled: true,
      activeClass: 'active',
      disactiveClass: 'disactive',
      institutionsAddForm: {
        shortName: '',
        jgbh: 'WD001',
        company: ''
      },
      dialogFormVisible: false,
      // 表单验证
      ruleInline: {
        shortName: [
          { required: true, message: '机构简称不能为空', trigger: 'blur' }
        ],
        company: [{ required: true, message: '请选择省份', trigger: 'change' }]
      }
    }
  },
  computed: {},
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created() {
    this.showcity()
  },
  // 组件更新
  updated: function() {},
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
    },
    // 表单提交
    createData() {
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          this.dialogFormH()
          const data = {
            ...this.formBase
          }
          if (this.formBase.id) {
            // eslint-disable-next-line no-undef
            await update(data).then(() => {
              this.$emit('newDataes', this.formBase)
            })
          } else {
            // eslint-disable-next-line no-undef
            await add(this.formBase).then(() => {
              this.$emit('newDataes', this.formBase)
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
<style>
.el-form--label-left .el-form-item__label {
  /* text-align: right; */
}
.el-form-item--medium {
  /* margin-bottom: 22px; */
}
.el-dialog__footer {
  /* text-align: center; */
}
</style>
