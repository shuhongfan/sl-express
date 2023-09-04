<!-- 新增线路 -->
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
          label="线路编号："
          prop="number"
        >
          <el-input
            v-model="formBase.number"
            placeholder="请输入线路名称"
            maxlength="8"
          />
        </el-form-item>
        <el-form-item
          label="线路名称："
          prop="name"
        >
          <el-input
            v-model="formBase.name"
            placeholder="请输入线路名称"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item
          label="线路类型："
          prop="type"
        >
          <el-select
            v-model="formBase.type"
            placeholder="请选择线路类型"
            style="width: 100%"
            clearable
            value-key="id"
            :disabled="titleInfo.text === '编辑线路'"
            @change="selectEndGet"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="起始地机构："
          prop="startAgency"
        >
          <treeselect
            v-model="formBase.startAgency"
            :options="agencyOptions"
            :normalizer="normalizer"
            :searchable="true"
            style="width: 100%"
            placeholder="请选择起始地机构"
            :disabled="titleInfo.text === '编辑线路'"
            no-options-text="暂无数据"
            no-results-text="暂无数据"
            @select="selectDepart"
            @open="open"
            @close="close"
          />
          <img
            ref="arrow"
            src="../../../assets/pullDown.png"
            style="position:absolute;width:18px;height:18px;right:9px;top:12px;cursor:pointer;pointer-events:none;transition-duration:0.3s"
          />
        </el-form-item>
        <el-form-item
          label="目的地机构："
          prop="endAgency"
        >
          <treeselect
            v-model="formBase.endAgency"
            :options="agencyOptions"
            :normalizer="normalizer"
            :searchable="true"
            style="width: 100%"
            placeholder="请选择目的地机构"
            :disabled="titleInfo.text === '编辑线路'"
            no-options-text="暂无数据"
            no-results-text="暂无数据"
            @select="selectDepartEnd"
            @open="opens"
            @close="closes"
          />
          <img
            ref="arrows"
            src="../../../assets/pullDown.png"
            style="position:absolute;width:18px;height:18px;right:9px;top:12px;cursor:pointer;pointer-events:none;transition-duration:0.3s"
          />
        </el-form-item>
        <el-form-item
          v-if="titleInfo.text === '编辑线路'"
          label="距离："
          prop="distance"
        >
          <el-input
            v-model="formBase.distance"
            placeholder="请输入距离"
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
            >千米</span>
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="titleInfo.text === '编辑线路'"
          label="成本："
          prop="cost"
        >
          <el-input
            v-model="formBase.cost"
            placeholder="请输入成本"
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
            >元</span>
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
import { lineAdd, lineUpdate } from '@/api/transit'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
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
    },
    agencyOptions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },
      options: [
        {
          id: 1,
          name: '干线'
        },
        {
          id: 2,
          name: '支线'
        },
        {
          id: 3,
          name: '接驳路线'
        }
        // {
        //   id: 4,
        //   name: '专线'
        // },
        // {
        //   id: 5,
        //   name: '临时线路'
        // }
      ],
      // agencyOptions: [],
      startAgency: [],
      endAgency: [],
      transportLineType: [],
      dialogFormVisible: false,
      // 表单验证
      ruleInline: {
        number: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('线路编号不能为空'))
              } else {
                const reg = /[A-Z]{2}\d{6}/
                if (!reg.test(value)) {
                  callback(
                    new Error('线路编号前两位为XL，后6位位数字，请重新输入')
                  )
                } else {
                  callback()
                }
              }
            },
            trigger: 'blur'
          }
        ],
        type: [
          { required: false, validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('线路类型不能为空'))
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ],
        distance: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('距离不能为空'))
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
        cost: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('成本不能为空'))
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
        estimatedTime: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('预计时间不能为空'))
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
        name: [
          { required: true, message: '线路名称不能为空', trigger: 'blur' }
        ],
        startAgency: [
          { required: true, message: '起始地机构不能为空', trigger: 'blur' }
        ],
        endAgency: [
          { required: true, message: '目的地机构不能为空', trigger: 'blur' }
        ]
      },
      flag: true// 防止重复点击生成一下生成很多条相同的线路
    }
  },
  methods: {
    opens() {
      this.$refs.arrows.style.transform = 'rotate(-180deg)'
    },
    closes() {
      this.$refs.arrows.style.transform = 'rotate(0deg)'
    },
    open() {
      this.$refs.arrow.style.transform = 'rotate(-180deg)'
    },
    close() {
      this.$refs.arrow.style.transform = 'rotate(0deg)'
    },
    selectEndGet(vId) {
      this.formBase.type = vId
    },
    selectDepart(val) {
      this.startAgency.name = val.name
    },
    selectDepartEnd(val) {
      this.endAgency.name = val.name
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
      if (!this.flag) {
        return
      }
      this.flag = false
      this.$refs['dataForm'].validate(async (valid) => {
        if (valid) {
          const data = {
            number: this.formBase.number,
            name: this.formBase.name,
            cost: this.formBase.cost,
            distance: this.formBase.distance,
            startOrganName: this.startAgency.name,
            startOrganId: this.formBase.startAgency,
            endOrganId: this.formBase.endAgency,
            endOrganName: this.endAgency.name,
            type: this.formBase.type
          }
          if (this.formBase.id) {
            await lineUpdate(this.formBase.id, data)
              .then((res) => {
                this.dialogFormH()
                if (String(res.code) === '200') {
                  this.$message.success('线路修改成功')
                  this.$emit('newDataes', this.formBase)
                } else {
                  this.$message.error(res.msg || '线路修改失败')
                }
                this.flag = true
              })
              .catch((err) => {
                this.$message.error(err.msg || '线路修改失败')
              })
          } else {
            await lineAdd(data)
              .then((res) => {
                if (String(res.code) === '200') {
                  this.$message.success('新增线路成功')
                  this.$emit('newDataes', this.formBase)
                  this.dialogFormH()
                } else {
                  this.$message.error(res.msg || '线路新增失败')
                }
                this.flag = true
              })
              .catch((err) => {
                this.$message.error(err.msg || '新增线路失败')
              })
          }
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
}
</style>
