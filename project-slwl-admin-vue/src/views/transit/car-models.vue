<!-- 车型管理 -->
<template>
  <div class="dashboard-container car-models customer-list-box">
    <div class="app-container">
      <el-card
        shadow="never"
        class="search-card-box"
      >
        <el-form
          ref="carModelsSearchFormData"
          :model="carModelsSearchFormData"
          label-width="80px"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                label="车型编号:"
                prop="id"
              >
                <el-input
                  v-model="carModelsSearchFormData.id"
                  placeholder="请输入车型编号"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="应载重量:"
                prop="allowableLoad"
                label-width="105px"
              >
                <el-select
                  v-model="carModelsSearchFormData.allowableLoad"
                  placeholder="请选择应载重量"
                >
                  <el-option
                    v-for="item in allowableLoadList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="应载体积:"
                prop="allowableVolume"
                label-width="135px"
              >
                <el-select
                  v-model="carModelsSearchFormData.allowableVolume"
                  placeholder="请选择应载体积"
                >
                  <el-option
                    v-for="item in allowableVolumeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="车辆类型:"
                prop="name"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model="carModelsSearchFormData.name"
                  placeholder="请输入车辆类型"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button
                type="warning"
                @click="handleFilter"
              >搜索</el-button>
              <el-button
                plain
                class="reset-btn"
                @click="resetForm('carModelsSearchFormData')"
              >重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card
        v-loading="listLoading"
        element-loading-text="加载中"
        class="table-card-box"
        :class="{
          'table-empty-box': !dataList || dataList.length <= 0,
          'loading-box': listLoading
        }"
        shadow="never"
        style="margin-top: 20px"
      >
        <el-button
          type="warning"
          class="add-btn"
          @click="handleAddModels()"
        >新增车型</el-button>
        <el-table
          :key="tableKey"
          ref="multipleTable"
          :data="dataList"
          fit
          style="width: 100%"
          stripe
          :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
        >
          <div
            v-show="(!dataList || dataList.length <= 0) && !listLoading && !searchkey"
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
          <el-card
            v-show="(!dataList || dataList.length <= 0) && !listLoading && searchkey"
            slot="empty"
            class="table-empty-box"
            shadow="never"
          >
            <empty></empty>
          </el-card>
          <el-table-column
            align="left"
            type="index"
            label="序号"
            width="60"
          >
            <template slot-scope="scope">
              <span>{{
                scope.$index +
                  (carModelsSearchFormData.page - 1) *
                  carModelsSearchFormData.pageSize +
                  1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="车型编号"
            min-width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="车辆类型"
            min-width="130"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="车型数量"
            min-width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="应载重量（吨）"
            min-width="150"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.allowableLoad }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="应载体积（立方米）"
            min-width="150"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.allowableVolume }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="长（米）"
            min-width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.measureLong }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="宽（米）"
            min-width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.measureWidth }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="高（米）"
            min-width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.measureHigh }}</span>
            </template>
          </el-table-column>
          <!-- 操作按钮 -->
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="110"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="handleAddModels(scope.row.id)"
              >编辑</el-link>
              <el-divider direction="vertical" />
              <el-link
                type="danger"
                :underline="false"
                @click="handleDelete(scope.row.id, scope.row.num)"
              >删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
        <!-- 分页 -->
        <div
          v-show="dataList && dataList.length > 0"
          class="pagination"
        >
          <div class="pages">
            <el-pagination
              :current-page="Number(carModelsSearchFormData.page)"
              :total="Number(total)"
              :page-size="Number(carModelsSearchFormData.pageSize)"
              :page-sizes="[10, 20, 30, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <!-- end -->
        <carModelsDialog
          ref="addCarModels"
          class="add-form-dialog add-form-dialog-car"
          :title-info="titleInfo"
          :form-base="formData"
          @newDataes="getList"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import { list, del, detail } from '@/api/transit'
import carModelsDialog from './components/car-models-add'
export default {
  components: {
    carModelsDialog
  },
  data() {
    return {
      // 搜索表单,应载重量数组
      allowableLoadList: [
        {
          value: 'RANGE_LEVEL_1',
          name: '<1.8（吨）'
        },
        {
          value: 'RANGE_LEVEL_2',
          name: '1.8-6（吨）'
        },
        {
          value: 'RANGE_LEVEL_3',
          name: '6-14（吨）'
        },
        {
          value: 'RANGE_LEVEL_4',
          name: '14-30（吨）'
        },
        {
          value: 'RANGE_LEVEL_5',
          name: '30-50（吨）'
        },
        {
          value: 'RANGE_LEVEL_6',
          name: '50-100（吨）'
        },
        {
          value: 'RANGE_LEVEL_7',
          name: '100>（吨）'
        }
      ],
      // 搜索表单,应载体积数组
      allowableVolumeList: [
        {
          value: 'RANGE_LEVEL_1',
          name: '<3（m³）'
        },
        {
          value: 'RANGE_LEVEL_2',
          name: '3-5（m³）'
        },
        {
          value: 'RANGE_LEVEL_3',
          name: '5-10（m³）'
        },
        {
          value: 'RANGE_LEVEL_4',
          name: '10-15（m³）'
        },
        {
          value: 'RANGE_LEVEL_5',
          name: '15-30（m³）'
        },
        {
          value: 'RANGE_LEVEL_6',
          name: '30-50（m³）'
        },
        {
          value: 'RANGE_LEVEL_7',
          name: '50-80（m³）'
        },
        {
          value: 'RANGE_LEVEL_8',
          name: '80-150（m³）'
        },
        {
          value: 'RANGE_LEVEL_9',
          name: '150>（m³）'
        }
      ],
      handleDeleteId: '',
      tableKey: 0,
      dataList: [],
      total: null,
      searchkey: false,
      listLoading: true,
      carModelsSearchFormData: {
        page: 1,
        pageSize: 10
      },
      titleInfo: {
        pageTitle: '',
        text: ''
      },
      formData: {
        name: '',
        allowableLoad: '',
        allowableVolume: '',
        measureHigh: '',
        measureLong: '',
        measureWidth: '',
        goodsTypes: []
      }
    }
  },
  // 创建完毕状态
  created() {
    var _this = this
    this.initialData()
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.carModelsSearchFormData)
      }
    }
  },
  // 组件更新
  updated: function () {},
  methods: {
    // 初始数据
    initialData() {
      // 读取数据
      this.clearField()
      this.getList()
    },
    // 清空搜索条件
    clearField() {
      if (this.carModelsSearchFormData.allowableLoad === '') {
        this.$delete(this.carModelsSearchFormData, 'allowableLoad')
      }
      if (this.carModelsSearchFormData.allowableVolume === '') {
        this.$delete(this.carModelsSearchFormData, 'allowableVolume')
      }
      if (this.carModelsSearchFormData.name === '') {
        this.$delete(this.carModelsSearchFormData, 'name')
      }
      if (this.carModelsSearchFormData.id === '') {
        this.$delete(this.carModelsSearchFormData, 'id')
      }
    },
    // 获取列表
    setField() {
      this.$set(this.carModelsSearchFormData, 'allowableLoad')
      this.$set(this.carModelsSearchFormData, 'allowableVolume')
      this.$set(this.carModelsSearchFormData, 'name')
      this.$set(this.carModelsSearchFormData, 'id')
    },
    // 获取列表数据
    async getList() {
      this.listLoading = true
      const { data: res } = await list(this.carModelsSearchFormData)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
    },
    // 重置
    resetForm(carModelsSearchFormData) {
      this.setField()
      this.searchkey = false
      this.$refs[carModelsSearchFormData].resetFields()
      this.getList()
    },
    // 搜索信息
    handleFilter() {
      this.clearField()
      this.carModelsSearchFormData.page = 1
      this.searchkey = true
      this.getList(this.carModelsSearchFormData)
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.carModelsSearchFormData.pageSize = val
      if (this.carModelsSearchFormData.page === 1) {
        this.getList(this.carModelsSearchFormData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.carModelsSearchFormData.page = val
      this.getList()
    },
    // 新增/编辑车辆类型
    handleAddModels(id) {
      if (id) {
        this.$refs.addCarModels.dialogFormV()
        this.titleInfo.text = '编辑车型'
        this.hanldeEditForm(id)
      } else {
        this.$refs.addCarModels.dialogFormV()
        this.titleInfo.text = '新增车型'
        this.formData.id = ''
        this.formData.name = ''
        this.formData.allowableLoad = ''
        this.formData.allowableVolume = ''
        this.formData.measureHigh = '0.0'
        this.formData.measureLong = '0.0'
        this.formData.measureWidth = '0.0'
        this.formData.goodsTypes = []
      }
    },
    // 编辑车辆类型
    async hanldeEditForm(id) {
      const { data: res } = await detail(id)
      this.formData.id = res.id
      this.formData.name = res.name
      this.formData.allowableLoad = Number(res.allowableLoad)
      this.formData.allowableVolume = Number(res.allowableVolume)
      this.formData.measureLong = Number(res.measureLong)
      this.formData.measureWidth = Number(res.measureWidth)
      this.formData.measureHigh = Number(res.measureHigh)
      if (res.goodsTypes != null) {
        // this.formData.goodsTypes = res.goodsTypes.map((obj) => ({ id: obj.id, name: obj.name }))
        this.formData.goodsTypes = res.goodsTypes
      } else {
        this.formData.goodsTypes = []
      }
    },
    // 删除车辆类型
    async handleDelete(id, num) {
      if (num) {
        return this.$message({
          type: 'error',
          message: '绑定车辆的车型无法删除'
        })
      }
      this.handleDeleteId = ''
      this.handleDeleteId = id
      this.$confirm('确定要删除车型吗?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.change(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 删除车辆类型
    async change(id) {
      await del(id)
        .then((res) => {
          // 异常不处理，信息不外抛。。。。
          if (String(res.code) === '200') {
            this.$message.success('删除成功')
            this.getList()
          } else {
            this.$message.error(res.msg || '删除失败')
          }
        })
        .catch(() => {
          this.$message.error('已绑定车辆的车型无法删除')
        })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.add-btn{
  margin-bottom: 20px;
}
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 40px;
  padding-bottom: 0px;
}

.el-select {
  width: 100%;
}

.car-models /deep/ .el-table td,
.el-table th {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  overflow: hidden;
}
.car-models {
  /deep/ .el-dialog__title {
    width: 73px;
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #20232a;
    line-height: 25px;
    letter-spacing: 0px;
  }
  /deep/ .el-dialog__body {
    text-align: center;
    padding: 40px 60px 0 30px;
  }
  .warn-img {
    width: 40px;
  }
  p {
    height: 24px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #818693;
    line-height: 24px;
  }
}
</style>
