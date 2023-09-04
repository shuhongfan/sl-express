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
        label-width="120px"
        style="width: 100%"
      >
        <el-form-item
          label="司机名称"
          prop="name"
        >
          <el-input
            v-model="formBase.name"
            :disabled="true"
            placeholder="请输入司机名称"
          />
        </el-form-item>

        <el-form-item
          label="车队"
          prop="fleetId"
        >
          <treeselect
            v-model="formBase.fleetId"
            :options="fleetOptions"
            :normalizer="normalizer"
            :searchable="true"
            style="width: 100%"
            placeholder="请选择车队"
            no-options-text="暂无数据"
            no-results-text="暂无数据"
            @select="selectDepart"
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
import { driverChangeFleet } from '@/api/transit'
import { fleetCommonList } from '@/api/common'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'LineAdd',
  components: {
    Treeselect
  },
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
      readonly: true,
      fleetName: '',
      normalizer(node) {
        return {
          id: node.id,
          label: node.name
        }
      },
      fleetOptions: [],
      dialogFormVisible: false,
      // 表单验证
      ruleInline: {
        name: [{ required: true, message: '车次不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  // 挂载结束
  mounted: function () {},
  // 创建完毕状态
  created() {
    this.getList()
  },
  // 组件更新
  updated: function () {},
  methods: {
    // 获取车队数据
    async getList() {
      const { data: res } = await fleetCommonList()
      this.fleetOptions = res
    },

    selectDepart(val) {
      this.fleetName = val.name
    },
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
      this.$refs['dataForm'].validate(async (valid) => {
        if (valid) {
          this.dialogFormH()
          const data = {
            fleet: {
              id: this.formBase.fleetId,
              name: this.fleetName
            }
          }
          await driverChangeFleet(this.formBase.id, data).then((res) => {
            //  && String(res.data.code) === '0'
            if (String(res.status) === '200') {
              this.$emit('newDataes')
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
