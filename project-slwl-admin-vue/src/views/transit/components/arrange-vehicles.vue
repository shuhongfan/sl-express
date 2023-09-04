<template>
  <div>
    <el-dialog
      :title="titleInfo.text"
      :visible.sync="dialogFormVisible"
      width="600px"
      :before-close="dialogFormH"
    >
      <el-form
        ref="dataForm"
        :rules="ruleInline"
        :model="formData"
        label-position="right"
        label-width="100px"
        style="width: 100%"
      >
        <el-form-item label="线路名称：" prop="lineName">
          <el-input
            v-model="formData.lineName"
            :disabled="true"
            placeholder="请输入线路名称"
          />
        </el-form-item>
        <el-form-item label="车次名称：" prop="tripsName">
          <el-input
            v-model="formData.tripsName"
            :disabled="true"
            placeholder="请输入车次名称"
          />
        </el-form-item>
        <el-form-item label="发车时间：" prop="departureTime">
          <el-input
            v-model="formData.departureTime"
            :disabled="true"
            placeholder="请输入发车时间"
          />
        </el-form-item>
        <el-form-item label="车辆安排：" prop="truckId">
          <el-select
            v-model="formData.truckId"
            suffix-icon="el-icon-search"
            placeholder="请输入车牌号"
            filterable
            @change="handleChange"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.licensePlate"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button class="save-btn" @click="createData">确认</el-button>
        <el-button class="cancel-btn" @click="dialogFormH">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { arrangeCar } from '@/api/transit'
import { getUseCarSuccess } from '@/api/transport'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  props: {
    titleInfo: {
      type: Object,
      required: true
    },
    formBaseAv: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      truckId: '',
      truckName: '',
      requestParameters: {},
      result: {},
      options: [], // 车辆列表
      dialogFormVisible: false,
      // 表单验证
      ruleInline: {
        name: [{ required: true, message: '车次不能为空', trigger: 'blur' }]
      },
      formData: {
        truckId: ''
      },
      selectedCarId: '',
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.trucks
        }
      }
    }
  },
  computed: {},
  watch: {
    formBaseAv(newValue, oldValu) {
      this.formData = newValue
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    handleChange(value) {
      this.$set(this.formData, 'truckId', value)
      this.$forceUpdate()
    },
    // 将已绑定的车辆数据与可绑定下拉数据进行拼接
    resetOptions(truckDrivers) {
      if (truckDrivers) {
        this.options = truckDrivers.truck
          ? [...this.options.concat(truckDrivers.truck)]
          : this.options
      }
    },
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true
      this.getList()
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
      this.getList()
    },
    // 获取车辆数据
    async getList() {
      const { data: res } = await getUseCarSuccess({
        endAgentId: this._props.formBaseAv.endAgentId,
        startAgentId: this._props.formBaseAv.startAgentId
      })
      this.options = res
    },
    // 表单提交
    async createData() {
      this.$refs['dataForm'].validate(async (valid) => {
        if (valid) {
          this.dialogFormH()
          await arrangeCar({
            truckIds: [this.formData.truckId],
            transportTripsId: this.formData.tripsId
          }).then((res) => {
            if (String(res.code) === '200') {
              this.$message({
                message: '车辆安排成功!',
                type: 'success'
              })
              this.$emit('newDataesAv')
            } else {
              this.$message({
                message: res.msg || '车辆安排失败!',
                type: 'error'
              })
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
