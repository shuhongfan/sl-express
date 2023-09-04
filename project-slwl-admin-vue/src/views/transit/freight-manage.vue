<!-- 运费管理 -->
<template>
  <div class="dashboard-container waybill-list customer-list-box">
    <div
      class="app-container"
      style="
      padding-top: 0px;
    "
    >
      <div
        v-loading="listLoading"
        :class="{ 'loading-box': listLoading }"
        element-loading-text="加载中"
        style="margin-top: 20px"
      >
        <el-card
          v-show="dataList && dataList.length > 0"
          shadow="never"
          class="table-card-box"
        >
          <el-button
            style="margin-bottom: 20px"
            type="warning"
            @click="handleAddModels()"
          >新增模板</el-button>
          <el-table
            :key="tableKey"
            ref="multipleTable"
            :data="dataList"
            fit
            style="width: 100%; margin-bottom: 30px"
            stripe
            :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
          >
            <div
              v-show="(!dataList || dataList.length <= 0) && !listLoading"
              slot="empty"
            >
              <img
                src="@/icons/pic-kong.png"
                alt="img"
                style="margin-top: 20px;width: 25%;height: 25%;"
              >
              <p
                style="
          margin-top: -20px;
          padding-bottom: 0px;
          "
              >这里空空如也</p>

            </div>
            <el-table-column
              align="left"
              label="模板类型"
              min-width="140"
            >
              <template slot-scope="scope">
                <span>{{
                  templateTypeList.filter(
                    (item) => item.value === scope.row.templateType
                  )[0].label
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="运送类型"
              min-width="140"
            >
              <template slot-scope="scope">
                <span>{{
                  transportTypeList.filter(
                    (item) => item.value === scope.row.transportType
                  )[0].label
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="关联城市"
              min-width="140"
            >
              <template slot-scope="scope">
                <span>{{
                  getAssociatedCityList(scope.row.associatedCityList)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="首重"
              min-width="160"
              prop="firstWeight"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="续重"
              min-width="160"
              prop="continuousWeight"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="轻抛系数"
              min-width="160"
              prop="lightThrowingCoefficient"
            >
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="165"
              class-name="small-padding fixed-width waybillDispatch"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleEdit(scope.row)"
                >编辑</el-link>
                <el-divider direction="vertical" />
                <el-link
                  type="danger"
                  :underline="false"
                  @click="handleDelete(scope.row.id)"
                >删除</el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-dialog
          :title="type === 'add' ? '新增模板' : '编辑模板'"
          :visible.sync="dialogVisible"
          width="600px"
          :before-close="handleClose"
          class="add-form-dialog"
        >
          <el-form
            ref="dataForm"
            :rules="ruleInline"
            :model="formBase"
            label-position="right"
            label-width="130px"
            style="width: 100%"
          >
            <el-form-item
              label="模板类型"
              prop="templateType"
            >
              <el-select
                v-model="formBase.templateType"
                value-key="templateType"
                placeholder="请选择模板类型"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="item in templateTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="运送类型"
              prop="transportType"
            >
              <el-select
                v-model="formBase.transportType"
                value-key="transportType"
                placeholder="请选择运送类型"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="item in transportTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="关联城市"
              prop="associatedCityList"
            >
              <span v-if="formBase.templateType !== 3">全国</span>
              <el-checkbox-group
                v-else
                v-model="formBase.associatedCityList"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="city in associatedCityList.filter(
                    (item) => item.value !== 1
                  )"
                  :key="city.value"
                  :label="city.value"
                >{{ city.label }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="首重价格"
              prop="firstWeight"
            >
              <el-input
                v-model="formBase.firstWeight"
                placeholder="请输入首重价格"
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
            <el-form-item
              label="续重价格"
              prop="continuousWeight"
            >
              <el-input
                v-model="formBase.continuousWeight"
                placeholder="请输入续重价格"
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
            <el-form-item
              label="轻抛系数"
              prop="lightThrowingCoefficient"
            >
              <el-input
                v-model="formBase.lightThrowingCoefficient"
                placeholder="请输入轻抛系数"
                maxlength="10"
              >
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
              @click="handleClose"
            >取消</el-button>
          </div>
        </el-dialog>
        <el-card
          v-show="(!dataList || dataList.length <= 0) && !listLoading"
          class="table-empty-box"
          shadow="never"
        >
          <empty></empty>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  freightManageList,
  freightManageOperate,
  freightManageDelete
} from '@/api/transit'
export default {
  data() {
    return {
      type: 'add',
      waybillSearchFormData: {
        page: 1,
        pageSize: 10
      },
      ruleInline: {
        templateType: [
          { required: true, message: '模板类型不能为空', trigger: 'blur' }
        ],
        transportType: [
          { required: true, message: '运送类型不能为空', trigger: 'blur' }
        ],
        associatedCityList: [
          { required: true, message: '关联城市不能为空', trigger: 'blur' }
        ],
        firstWeight: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
                if (!reg.test(Number(value))) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else {
                  callback()
                }
              } else {
                callback(new Error('首重价格不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        continuousWeight: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
                if (!reg.test(value)) {
                  callback(
                    new Error('只能输入数字类型，最多保留两位小数，请重新输入')
                  )
                } else {
                  callback()
                }
              } else {
                callback(new Error('续重价格不能为空'))
              }
            },
            trigger: 'blur'
          }
        ],
        lightThrowingCoefficient: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                const reg = /^[1-9]+[0-9]*$/
                if (!reg.test(value)) {
                  callback(new Error('只能输入正整数，请重新输入'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('轻抛系数不能为空'))
              }
            },
            trigger: 'blur'
          }
        ]
      },
      // 关联城市
      associatedCityList: [
        {
          value: 1,
          label: '全国'
        },
        {
          value: 2,
          label: '京津冀'
        },
        {
          value: 3,
          label: '江浙沪'
        },
        {
          value: 4,
          label: '川渝'
        },
        {
          value: 5,
          label: '黑吉辽'
        }
      ],
      // 模板类型
      templateTypeList: [
        {
          value: 1,
          label: '同城寄'
        },
        {
          value: 2,
          label: '省内寄'
        },
        {
          value: 3,
          label: '经济区互寄'
        },
        {
          value: 4,
          label: '跨省'
        }
      ],
      // 运送类型
      transportTypeList: [
        {
          value: 1,
          label: '普快'
        }
      ],
      dialogVisible: false,
      tableKey: 0,
      dataList: [],
      formBase: {
        id: '',
        templateType: '',
        transportType: '',
        associatedCityList: [1],
        firstWeight: '',
        continuousWeight: '',
        lightThrowingCoefficient: ''
      },
      listLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 删除运费模板
    handleDelete(id) {
      this.$confirm('确定要删除吗?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          freightManageDelete(id).then((res) => {
            if (String(res.code) === '200') {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 新增或修改运费模板
    createData() {
      this.$refs['dataForm'].validate(async (valid) => {
        if (
          // 经济区互寄必须要选择关联城市
          this.formBase.templateType === 3 &&
          this.formBase.associatedCityList.length === 1 &&
          this.formBase.associatedCityList[0] === 1
        ) {
          return this.$message({
            message: '请选择关联城市',
            type: 'error'
          })
        }
        if (valid) {
          const data = {
            id: this.formBase.id,
            templateType: this.formBase.templateType,
            transportType: this.formBase.transportType,
            associatedCityList: this.formBase.associatedCityList,
            firstWeight: this.formBase.firstWeight,
            continuousWeight: this.formBase.continuousWeight,
            lightThrowingCoefficient: this.formBase.lightThrowingCoefficient
          }
          await freightManageOperate(data).then((res) => {
            if (String(res.code) === '200') {
              this.$message({
                message: '操作成功！',
                type: 'success'
              })
              this.handleClose()
              this.getList()
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        } else {
          this.$message.error('*号为必填项!')
        }
      })
    },
    // 新增模板
    handleAddModels() {
      this.dialogVisible = true
      this.formBase = {
        templateType: '',
        transportType: '',
        associatedCityList: [1],
        firstWeight: '',
        continuousWeight: '',
        lightThrowingCoefficient: ''
      }
      this.type = 'add'
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false
      this.formBase = {
        templateType: '',
        transportType: '',
        associatedCityList: [],
        firstWeight: '',
        continuousWeight: '',
        lightThrowingCoefficient: ''
      }
    },
    // 更改关联城市
    handleCheckedCitiesChange(value) {
      this.formBase.associatedCityList = value.filter((item) => item !== 1)
    },
    // 编辑运费模板
    handleEdit(row) {
      this.dialogVisible = true
      this.type = 'edit'
      const arr = row.associatedCityList.map((item) => {
        return Number(item)
      })
      this.formBase = Object.assign({}, row, { associatedCityList: arr })
    },
    // 获取运费模板列表
    async getList() {
      this.listLoading = true
      const { data: res } = await freightManageList()
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res
    },
    // 处理返回的关联城市的value数组转化为城市名称
    getAssociatedCityList(list) {
      return this.associatedCityList
        .filter((item) => {
          return list.findIndex((item1) => item1 === String(item.value)) !== -1
        })
        .map((item) => item.label)
        .join(',')
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.waybill-list {
  .el-dialog__wrapper {
    /deep/ .el-dialog__body {
      padding-left: 0px;
    }
  }
}
</style>
