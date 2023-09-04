<!-- 去掉 -->
<template>
  <div class="dashboard-container goods-type customer-list-box">
    <div class="app-container">
      <el-card
        class="search-card-box"
        shadow="never"
      >
        <el-form
          ref="goodsTypeSearchFromData"
          :model="goodsTypeSearchFromData"
          label-width="110px"
        >
          <!-- <div class="filter-container"> -->
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                label="货物类型名称:"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model="goodsTypeSearchFromData.name"
                  placeholder="请输入货物类型名称"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="运输车型:"
                style="margin-bottom: 0px"
                label-width="80px"
              >
                <el-select
                  v-model="goodsTypeSearchFromData.truckTypeId"
                  value-key="item.id"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
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
                @click="resetForm('goodsTypeSearchFromData')"
              >重置</el-button>
            </el-col>
          </el-row>
          <!-- </div> -->
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
          class="customer-add-btn"
          @click="handleAddGoodsType()"
        >+新增货物类型</el-button>
        <!-- highlight-current-row -->
        <el-table
          v-show="dataList && dataList.length > 0"
          :key="tableKey"
          ref="multipleTable"
          :data="dataList"
          fit
          style="width: 100%"
          stripe
          :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column align="left" type="selection" width="40" /> -->
          <el-table-column
            align="left"
            type="index"
            label="序号"
            width="60"
          >
            <template slot-scope="scope">
              <span>{{
                scope.$index +
                  (goodsTypeSearchFromData.page - 1) *
                  goodsTypeSearchFromData.pageSize +
                  1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="货物类型编号"
            width="180px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="货物类型名称"
            width="160px"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row.name }}
                <!-- <router-link
                  target="_blank"
                  :to="{path:'/content/course/preview',query:{courseBaseId:scope.row.courseBaseId}}"
                >{{ scope.row.name }}</router-link> -->
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="运输车型"
            width="280px"
            class-name="transport-car"
          >
            <template slot-scope="scope">
              <span
                v-for="(item, i) in scope.row.truckTypes"
                :key="i"
              >
                {{ item === null ? '' : item.name }}
                <!-- <br /> -->
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="默认重量 (千克)"
            width="150px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.defaultWeight }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="默认体积 (立方)"
            width="150px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.defaultVolume }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="说明"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <!-- 操作按钮 -->
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="110"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="handleAddGoodsType(scope.row.id)"
              >修改</el-link>
              <el-divider direction="vertical" />
              <el-link
                type="danger"
                :underline="false"
                @click="handleDelete(scope.row.id)"
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
              :current-page="Number(goodsTypeSearchFromData.page)"
              :total="Number(total)"
              :page-size="Number(goodsTypeSearchFromData.pageSize)"
              :page-sizes="[10, 20, 30, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <empty
          v-show="(!dataList || dataList.length <= 0) && !listLoading"
        ></empty>
        <!-- end -->
        <goodsTypeModelsDialog
          ref="addGoodsType"
          class="add-form-dialog"
          :title-info="titleInfo"
          :form-base="formData"
          @newDataes="getList"
        />
      </el-card>
    </div>
    <!-- 删除弹框重绘 -->
    <el-dialog
      class="customer-dialog"
      title="删除确认"
      :visible.sync="dialogVisible"
      width="394px"
      :before-close="handleClose"
    >
      <img
        class="warn-img"
        src="@/assets/warn.png"
        alt=""
      />
      <p>确认删除？</p>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="confirm-btn"
          type="primary"
          @click="sumbitDelte"
        >确定</el-button>
        <el-button
          class="cancel-btn"
          @click="dialogVisible = false"
        >取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { goodsTypeList, goodsTypeDel, goodsTypeDetail } from '@/api/branch'
import { truckTypeCommonList } from '@/api/common'
import goodsTypeModelsDialog from './components/goods-type-add'
export default {
  name: 'GoodsType',
  components: {
    goodsTypeModelsDialog
  },
  data() {
    return {
      dialogVisible: false,
      handleDeleteId: '',
      multipleSelection: [],
      options: [],
      tableKey: 0,
      dataList: [],
      total: null,
      listLoading: true,
      alertText: '',
      goodsTypeSearchFromData: {
        page: 1,
        pageSize: 10,
        name: ''
      },
      titleInfo: {
        pageTitle: '',
        text: ''
      },
      formData: {
        name: '',
        defaultVolume: '',
        defaultWeight: '',
        remark: '',
        truckType: ''
      }
    }
  },
  computed: {
    status() {
      return status
    }
  },
  // 挂载结束
  mounted: function () {},
  // 创建完毕状态
  created() {
    var _this = this
    this.companyId = this.$route.query.companyId
    this.initialDate()
    // 键盘enter操作
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.goodsTypeSearchFromData)
      }
    }
  },
  // 组件更新
  updated: function () {},
  methods: {
    // 删除弹框重绘方法
    handleClose() {
      this.dialogVisible = false
    },
    // 初始数据
    initialDate() {
      // 读取数据
      this.getList()
      this.getTruckTypeList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取货物类型分页数据
    async getList() {
      this.listLoading = true
      const { data: res } = await goodsTypeList(this.goodsTypeSearchFromData)
      this.listLoading = false
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
    },
    // 重置
    resetForm(goodsTypeSearchFromData) {
      // this.$refs[goodsTypeSearchFromData].resetFields()
      // this.goodsTypeSearchFromData = {}
      this.goodsTypeSearchFromData.page = 1
      this.goodsTypeSearchFromData.pageSize = 10
      this.goodsTypeSearchFromData.name = ''
      this.goodsTypeSearchFromData.truckTypeId = null
      this.getList()
    },
    // 搜索信息
    handleFilter() {
      this.goodsTypeSearchFromData.page = 1
      this.getList(this.goodsTypeSearchFromData)
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.goodsTypeSearchFromData.pageSize = val
      if (this.goodsTypeSearchFromData.page === 1) {
        this.getList(this.goodsTypeSearchFromData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.goodsTypeSearchFromData.page = val
      this.getList()
    },
    // **********************************
    // 搜索的项目
    // 添加、编辑之后表单清空
    query() {
      this.formData = {}
    },
    // 获取车辆类型列表数据
    async getTruckTypeList() {
      const { data: res } = await truckTypeCommonList()
      // 获取数据给options
      this.options = res
    },
    // 新增货物类型
    handleAddGoodsType(id) {
      if (id) {
        this.$refs.addGoodsType.dialogFormV()
        this.titleInfo.text = '编辑货物类型'
        this.hanldeEditForm(id)
      } else {
        this.$refs.addGoodsType.dialogFormV()
        this.titleInfo.text = '新增货物类型'
        this.formData.id = ''
        this.formData.name = ''
        this.formData.defaultVolume = ''
        this.formData.defaultWeight = ''
        this.formData.remark = ''
        this.formData.truckType = ''
      }
    },
    // 编辑线路
    async hanldeEditForm(id) {
      const { data: res } = await goodsTypeDetail(id)
      this.formData.id = res.id
      this.formData.name = res.name
      this.formData.defaultVolume = res.defaultVolume
      this.formData.defaultWeight = res.defaultWeight
      this.formData.remark = res.remark
      if (res.truckTypes != null) {
        this.formData.truckType = res.truckTypes
      } else {
        this.formData.truckType = ''
      }
    },
    // 删除货物类型
    async handleDelete(id) {
      this.handleDeleteId = ''
      this.handleDeleteId = id
      this.$confirm('确定要删除货物类型吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.sumbitDelte(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      // 新绘制的删除动作template
      // this.dialogVisible = true
    },
    // 确认删除
    sumbitDelte() {
      this.change(this.handleDeleteId)
    },
    async change(id) {
      await goodsTypeDel(id).then((res) => {
        // 异常不处理，信息不外抛。。。。
        if (Number(res.code) === 200) {
          this.$message.success('删除成功')
          this.getList()
          this.dialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 40px;
}

.goods-type {
  /deep/ .transport-car {
    .cell {
      padding-right: 50px;
    }
  }
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
    padding: 40px 60px 0;
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

// 下拉框
/deep/ .el-select {
  width: 100%;
}
</style>

<style>
/* .el-table th {
  background-color: #ffffff;
}
.el-table th.is-leaf {
  border-bottom: 2px solid #e8e8e8;
}
.disabled td {
  background-color: #f9f9f9;
  color: #c1c1c1;
}
.disabled .el-button--primary,
.disabled .el-button--danger {
  background-color: #dbdada;
  border: 1px solid #dbdada;
  color: #999;
  cursor: not-allowed;
}
.el-dropdown-menu--medium .el-dropdown-menu__item {
  width: 125px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-bottom: 10px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.bg-purple-dark {
  background: #ffffff;
} */
</style>
