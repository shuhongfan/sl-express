<!-- 新增车次弹窗 -->
<template>
  <div class="line-manage">
    <el-dialog
      :title="titleInfo.text"
      :visible.sync="dialogFormVisible"
      width="600px"
    >
      <el-form
        ref="dataForm"
        :rules="ruleInline"
        :model="formBase1"
        label-position="right"
        label-width="120px"
        style="width: 100%"
      >
        <el-form-item
          label="线路名称："
          prop="lineName"
        >
          <el-input
            v-model="transportLineName"
            :disabled="true"
            placeholder="请输入线路名称"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item
          label="车次名称："
          prop="name"
        >
          <el-input
            v-model="formBase1.name"
            placeholder="请输入车次名称"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item
          prop="departureTime"
          style="width: 100%"
          label="发车时间："
        >
          <el-time-picker
            v-model="formBase1.departureTime"
            :picker-options="{
              start: '00:00',
              end: '23:59'
            }"
            :editable="false"
            format="HH:mm"
            placeholder="请选择发车时间"
            style="width: 100%"
            @change="handleDate"
          />
        </el-form-item>
        <el-form-item
          prop="estimatedTime"
          style="width: 100%"
          label="持续时间："
        >
          <el-input
            v-model="formBase1.estimatedTime"
            placeholder="请输入持续时间"
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
            >分钟</span>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="periodName"
          style="width: 100%"
          label="发车周期："
        >
          <el-select
            v-model="formBase1.periodName"
            value-key="period"
            placeholder="请选择周期"
            clearable
            style="width: 100%"
            @change="selectEndGet"
          >
            <el-option
              v-for="item in options"
              :key="item.period"
              :value="item.period"
              :label="item.periodName"
            />
          </el-select>
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
import { tripsAdd, tripsUpdate, tripsDetail } from '@/api/transit'
export default {
  name: 'LineAdd',
  props: {
    titleInfo: {
      type: Object,
      required: true
    },
    transportLineId: {
      type: String,
      require: true,
      default: ''
    },
    transportLineName: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      requestTripsParameters: {
        transportLineId: ''
      },
      options: [
        {
          period: 1,
          periodName: '天'
        },
        {
          period: 2,
          periodName: '周'
        },
        {
          period: 3,
          periodName: '月'
        }
      ],
      formBase1: {
        lineName: '',
        name: '',
        departureTime: '',
        estimatedTime: '',
        periodName: '',
        period: ''
      },
      departureTime: '',
      periods: {
        period: '',
        periodName: ''
      },
      dialogFormVisible: false,
      // 表单验证
      ruleInline: {
        name: [{ required: true, message: '车次不能为空', trigger: 'blur' }],
        departureTime: [
          { required: true, message: '发车时间不能为空', trigger: 'blur' }
        ],
        estimatedTime: [
          { required: true, message: '持续时间不能为空', trigger: 'blur' }
        ],
        periodName: [
          { required: true, message: '周期不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 处理时间(将时间转为当前时间距离当日0点0分的分钟差值)
    handleDate(val) {
      this.departureTime = (
        (val.getTime() -
          new Date(
            new Date(new Date().getTime()).setHours(0, 0, 0, 0)
          ).getTime()) /
        1000 /
        60
      ).toFixed()
    },
    // 查询车次详情
    async hanldeEditTripsForm(id) {
      const { data: res } = await tripsDetail(id)
      this.formBase1.id = res.id
      if (res.transportLine != null) {
        this.formBase1.lineName = res.transportLine.name
        this.formBase1.lineId = res.transportLine.id
      }
      this.formBase1.name = res.name
      this.formBase1.departureTime =
        Number(res.departureTime) * 1000 * 60 +
        new Date(new Date().getTime()).setHours(0, 0, 0, 0)
      this.formBase1.periodName = res.periodName
      this.formBase1.period = res.period
      this.formBase1.estimatedTime = res.estimatedTime
    },
    selectEndGet(vId) {
      let arr = []
      arr = this.options.filter((item) => {
        return item.period === Number(vId)
      })
      this.$set(this.formBase1, 'periodName', arr[0].periodName)
      this.$set(this.formBase1, 'period', vId)
    },
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
      this.$refs['dataForm'].validate(async (valid) => {
        if (valid) {
          const data = {
            name: this.formBase1.name,
            departureTime: this.departureTime,
            period: this.formBase1.period,
            periodName: this.formBase1.periodName,
            transportLineId: this.transportLineId,
            estimatedTime: this.formBase1.estimatedTime
          }
          if (this.formBase1.id && this.titleInfo.text !== '新增车次') {
            await tripsUpdate(this.formBase1.id, data).then((res) => {
              if (String(res.code) === '200') {
                this.$message({
                  message: '车次编辑成功!',
                  type: 'success'
                })
                this.$emit('newDataes1')
              }
            })
          } else {
            await tripsAdd(data).then((res) => {
              if (String(res.code) === '200') {
                this.$message({
                  message: '车次添加成功!',
                  type: 'success'
                })
                this.$emit('newDataes1')
              }
            })
          }
          this.dialogFormH()
        } else {
          this.$message.error('*号为必填项!')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.line-manage {
  .el-form-item__content {
    flex-wrap: wrap;
  }
}
/deep/ .el-dialog__body {
  padding: 40px 40px 0 10px !important;
}
</style>
