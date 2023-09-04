<!-- 机构管理 -->
<template>
  <div
    class="organization-manage org log-list customer-list-box dashboard-container"
  >
    <div class="test">
      <!-- 左侧树形结构树 -->
      <div class="log-list-left">
        <el-scrollbar
          style="width: 100%;margin-bottom:50px"
        >
          <el-card
            class="box-card"
            shadow="never"
          >
            <div class="app-container">
              <el-tree
                ref="orgTree"
                style="font-size: 12px display: none;"
                :props="defaultProps"
                :check-strictly="true"
                :data="orgTree"
                :indent="22"
                :filter-node-method="filterNode"
                highlight-current
                node-key="id"
                :expand-on-click-node="false"
                class="filter-tree customer-tree-box"
                :default-expanded-keys="treeExpandData"
                @node-click="nodeClick"
              />
            </div>
          </el-card>
        </el-scrollbar>
      </div>
      <!-- 右侧结构树对应的内容 -->
      <div
        class="log-list-right"
      >
        <el-card
          class="box-card"
          shadow="always"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>机构信息</span>
          </div>
          <div>
            <el-form
              ref="form"
              :model="org"
              label-position="right"
              label-width="120px"
              style="width: 90%; text-align: center"
              class="form-bottom"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="机构编号">
                    <el-input
                      v-model="org.id"
                      disabled
                    /> </el-form-item></el-col>
                <el-col :span="8">
                  <el-form-item
                    label="机构名称"
                    prop="parentId"
                    disabled
                  >
                    <el-input
                      v-model="org.name"
                      disabled
                    /> </el-form-item></el-col>
                <el-col :span="8">
                  <!-- 组织类型 -->
                  <el-form-item
                    label="机构类型"
                    prop="orgType"
                    disabled
                  >
                    <el-select
                      v-model="org.type"
                      disabled
                      clearable
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in orgTypeOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select> </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <!-- 地址 -->
                  <el-form-item
                    label="机构地址"
                    prop="describe"
                  >
                    <el-row
                      :gutter="24"
                      style="margin: 0"
                    >
                      <el-col
                        :span="8"
                        style="padding: 0"
                      >
                        <el-select
                          :value="org.province !== null ? org.province.id : ''"
                          placeholder="请选择省"
                          value-key="id"
                          clearable
                          :disabled="!isCanSubmit"
                          @change="getCity($event, true)"
                        >
                          <el-option
                            v-for="item in provinceList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      </el-col>
                      <el-col
                        :span="8"
                        style="padding: 0 4px"
                      >
                        <el-select
                          :value="org.city !== null ? org.city.id : ''"
                          value-key="id"
                          clearable
                          placeholder="请选择市"
                          :disabled="!isCanSubmit ||!org.province.id"
                          @change="getCounty($event, true)"
                        >
                          <el-option
                            v-for="item in cityList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      </el-col>
                      <el-col
                        :span="8"
                        style="padding: 0"
                      >
                        <el-select
                          :value="countyId"
                          value-key="id"
                          clearable
                          placeholder="请选择县/区"
                          :disabled="!isCanSubmit||!org.city.id"
                          @change="getCurrent"
                        >
                          <el-option
                            v-for="item in countryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      </el-col>
                    </el-row> </el-form-item></el-col>
                <el-col :span="8">
                  <!-- 机构负责人 -->
                  <el-form-item
                    label="详细地址"
                    prop="address"
                  >
                    <el-input
                      v-model="org.address"
                      maxlength="20"
                      :disabled="!isCanSubmit"
                    /> </el-form-item></el-col>
                <el-col :span="8">
                  <!-- 经度 -->
                  <el-form-item
                    label="经度"
                    prop="longitude"
                  >
                    <el-input
                      v-model="org.longitude"
                      disabled
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
                          line-height: 40px;
                        "
                      >E</span></el-input>
                  </el-form-item></el-col>
                <el-col :span="8">
                  <!-- 纬度 -->
                  <el-form-item
                    label="纬度"
                    prop="latitude"
                  >
                    <el-input
                      v-model="org.latitude"
                      disabled
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
                          line-height: 40px;
                        "
                      >N</span></el-input>
                  </el-form-item></el-col>
                <el-col :span="8">
                  <!-- 机构负责人 -->
                  <el-form-item
                    label="机构负责人"
                    prop="contractNumber"
                  >
                    <el-input
                      v-model="org.managerName"
                      maxlength="20"
                      :disabled="!isCanSubmit"
                    /> </el-form-item></el-col>
                <el-col :span="8">
                  <el-form-item
                    label="机构电话"
                    prop="abbreviation"
                  >
                    <el-input
                      v-model="org.phone"
                      maxlength="200"
                      :disabled="!isCanSubmit"
                    /> </el-form-item></el-col>
              </el-row>
              <el-button
                v-if="org.id"
                type="warning"
                style="width: 89px; height: 36px; padding: 10px 20px"
                @click="submit"
              >{{ isCanSubmit ? '保存' : '编辑' }}</el-button>
            </el-form>
          </div>
        </el-card>
        <el-card
          class="box-card org-index"
          style="margin-top: 20px; box-shadow: none"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>员工信息</span>
          </div>
          <el-table
            v-if="dataList && dataList.length > 0"
            ref="multipleTable"
            :data="dataList"
            fit
            style="width: 100%"
            stripe
            :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
          >
            <el-table-column
              type="index"
              label="序号"
              width="60"
            />
            <el-table-column
              align="left"
              label="员工编号"
              min-width="150"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.userId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="员工姓名"
              min-width="100"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="手机号"
              min-width="100"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.mobile }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="所属机构"
              min-width="140"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.agency === null ? '' : scope.row.agency.name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="系统账户"
              min-width="100"
              prop="account"
            >
            </el-table-column>
            <el-table-column
              align="left"
              label="系统角色"
              min-width="100"
              prop="stationName"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.roleNames && scope.row.roleNames.join(',')
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="账号状态"
            >
              <template slot-scope="scope">
                <div
                  v-if="scope.row.status !== null"
                  class="tableColumn-status"
                  :class="{ 'stop-use': String(scope.row.status) === '0' }"
                >
                  {{ String(scope.row.status) === '1' ? '正常' : '禁用' }}
                </div>
                <div v-else></div>
              </template>
            </el-table-column>
          </el-table>
          <empty
            v-else
            src="../../assets/empty.png"
            desc="这里空空如也~"
          ></empty>
          <!-- end -->
          <!-- 分页 -->
          <div
            v-show="total > 5"
            class="pagination"
          >
            <div class="pages">
              <el-pagination
                :current-page="Number(requestParameters.page)"
                :total="Number(total)"
                :page-size="Number(requestParameters.pageSize)"
                :page-sizes="[5, 10, 20, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import options from '@/api/OrgType.json' // 机构类型
import { areaList } from '@/api/common' // 地区
import { agencyList, detail, update, getuserByAgency } from '@/api/institutions'
export default {
  name: 'OrgManager',
  data() {
    return {
      total: 0,
      requestParameters: {
        page: 1, // 当前页
        pageSize: 5, // 每页条数
        agencyId: '' // 机构id
      },
      dataList: [],
      defaultProps: {
        children: 'children', // 子节点
        label: 'name' // 显示的名称
      },
      treeExpandData: [], // 树形展开的数据
      treeExpandData2: [], // 树形默认展开的数据
      provincialCenterId: '', // 省级中心id
      provincialCenterId2: [], // 省级树形默认展开中心id
      countyId: '', // 城市id
      name: '', // 机构名称
      orgTypeOptions: '', // 机构类型
      orgTree: [], // 树形数据
      parentName: '无上级',
      provinceList: [], // 省列表
      cityList: [], // 市列表
      countryList: [], // 县区列表
      isCanSubmit: false, // 是否处于编辑状态
      org: this.initOrg() // 机构信息数据
    }
  },
  mounted() {
    this.orgTypeOptions = options
    this.initOrgTree()
  },
  methods: {
    // 初始化
    initOrg() {
      this.countyId = ''
      return {
        id: '',
        name: '',
        type: '',
        address: '',
        managerName: '',
        provinceId: '',
        cityId: '',
        countyId: '',
        phone: '',
        parentId: 0,
        latitude: '',
        longitude: '',
        county: {
          id: ''
        },
        province: {
          id: ''
        },
        city: {
          id: ''
        }
      }
    },
    // 提交修改当前数据
    submit() {
      const data = this.org
      // 当前数据
      const params = {
        id: data.id,
        name: data.name,
        type: data.type,
        provinceId: data.province ? data.province.id : '',
        cityId: data.province ? data.city.id : '',
        countyId: data.county ? data.county.id : '',
        address: data.address,
        managerName: data.managerName,
        phone: data.phone
      }
      // 判断是否可以提交
      if (!this.isCanSubmit) {
        return (this.isCanSubmit = !this.isCanSubmit)
      }
      if (!data.address) {
        return this.$message.error('请填写详细地址')
      } else if (!data.province.id || !data.city.id || !this.countyId) {
        return this.$message.error('请选择机构地址')
      }
      update(params)
        .then((res) => {
          if (Number(res.code) === 200) {
            this.$message.success('机构信息保存成功')
            this.isCanSubmit = false
          } else {
            this.$message.error(res.msg || '机构信息保存失败')
          }
        })
        .catch((err) => {
          this.$message.error(err.msg || '机构信息保存失败')
        })
    },
    // 获取省信息
    getProvince(val) {
      areaList({ parentId: val }).then((response) => {
        this.provinceList = response.data
      })
    },
    // 获取市信息，获取到省的信息后才能进行，因此需要绑定在省上
    getCity(val, isClear) {
      areaList({ parentId: val }).then((response) => {
        this.cityList = response.data
        this.org.province.id = val
        if (isClear) {
          this.org.city.id = ''
          this.countyId = ''
        }
      })
    },
    // 获取县区信息，获取到市之后才能够继续进行，因此事件需要绑定在市上
    getCounty(val, isClear) {
      areaList({ parentId: val }).then((response) => {
        this.countryList = response.data
        this.org.city.id = val
        if (isClear) {
          this.countyId = ''
        }
      })
    },
    // 获取当前的数据id
    getCurrent(val) {
      this.org.county.id = val
      this.countyId = val
    },
    // 获取树形结构默认展开节点
    getExpandData(provincialCenterId) {
      // 将传入的数据转换为数组
      const provincialCenterIdArr = provincialCenterId.split(',')
      // 循环数组，将数组中的数据添加到treeExpandData中
      provincialCenterIdArr.forEach((item) => {
        this.treeExpandData.push(item)
      })
    },
    getExpandData2(provincialCenterId2) {
      // 将传入的数据添加到treeExpandData2中
      this.treeExpandData2 = [provincialCenterId2]
      const _this = this
      // 加入延时函数是因为需要等待页面数据加载完毕
      setTimeout(() => {
        _this.nodeClick(provincialCenterId2)
      }, 50)
    },
    // 初始化机构数
    initOrgTree() {
      agencyList({}).then((response) => {
        const res = response.data
        this.orgTree = JSON.parse(res)
        this.provincialCenterId = this.orgTree[0].children[0].id // 默认展开第一个节点下的第一个节点
        this.provincialCenterId2 = this.orgTree[0].children[0].children[0]
        this.$nextTick(function () {
          this.$refs['orgTree'].setCurrentKey(
            this.orgTree[0].children[0].children[0].id
          )
        })
        this.getExpandData2(this.provincialCenterId2)
        this.getExpandData(this.provincialCenterId)
      })
    },
    // 过滤器，过滤出空数据和不存在的数据
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 树形点击事件
    nodeClick(data) {
      this.requestParameters.agencyId = data.id
      this.isCanSubmit = false
      this.showEdit = true
      this.showSave = false
      // 获取机构详情
      detail(data.id)
        .then((response) => {
          this.org = response.data
          this.countyId = ''
          if (response.data.province === null) this.org.province = {}
          if (response.data.city === null) this.org.city = {}
          if (response.data.county === null) this.org.county = {}
          this.getProvince()
          if (response.data.city !== null && response.data.city.id) {
            this.getCity(response.data.province.id, false)
            this.getCounty(response.data.city.id, false)
          }
          if (response.data.county !== null && response.data.county.id) {
            this.countyId = response.data.county.id
          }
        })
        .catch(() => {
          this.$message.error('获取机构详情失败')
          this.org = this.initOrg()
        })
      this.getList()
    },
    getList() {
      // 获取机构下的员工列表数据
      getuserByAgency(this.requestParameters).then((res) => {
        this.dataList = res.data.items
        this.total = res.data.counts
      })
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.requestParameters.pageSize = val
      if (this.requestParameters.page === 1) {
        this.getList(this.requestParameters)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .customer-tree-box {
  .el-tree-node {
    margin: 2px 0 !important;
    .is-focusable {
      position: relative;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 6px;
        // width: 1px;
        border-left: #e5e7ec solid 1px;
        height: calc(100% + 3px);
        // 将此类名的最后一项样式设置为none
        &:last-child {
          border-left: none !important;
        }
      }
      margin: 2px 0 !important;
      .el-tree-node {
        .el-tree-node__children {
          margin: 2px 0 !important;
          .el-tree-node {
            .el-tree-node__content {
              .el-tree-node__expand-icon {
                display: none;
              }
              .el-tree-node__label {
                margin-left: 0px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 131px;
              }
            }
          }
        }
      }
    }
  }
  .el-tree-node {
    .el-tree-node {
      .el-tree-node {
        position: relative;
        &::before {
          content: '';
          display: inline-block;
          position: absolute;
          left: 26px;
          // width: 1px;
          border-left: #e5e7ec solid 1px;
          height: calc(100% + 3px);
        }
        // 将此类名的最后一项样式设置为none
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.organization-manage {
  // overflow-x: scroll;
  min-height: 870px;
  padding-top: 23px !important;
  .log-list-left {
    height: auto !important;
    border-radius: 4px;
    width: 214px;
    // 设置内边距
    padding-left: 9px;
    /deep/ .customer-tree-box {
      .el-tree-node {
        margin: 5px 0 !important;
        .el-tree-node__children {
          margin: 2px 0 !important;
          .el-tree-node {
            .el-tree-node__children {
              margin: 2px 0 !important;
              .el-tree-node {
                .el-tree-node__content {
                  .el-tree-node__expand-icon {
                    display: none;
                  }
                  .el-tree-node__label {
                    margin-left: 0px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 131px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .log-list-right {
    /deep/ .el-card__header {
      color: #2a2929;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .el-tree {
    padding-left: 10px;
    margin-top: 5px;
  }
  .app-container {
    background-color: white;
  }
  .pagination {
    text-align: center;
    margin-top: 26px;
    padding-bottom: 40px;
  }
  /deep/ .el-card__body {
    padding: 0;
    padding-top: 10px;
    .app-container {
      padding: 0;
    }
  }

  .el-form--label-right {
    padding: 20px 0;
    width: 100% !important;
    padding-right: 37px;
  }

  /deep/ .el-tree-node__content {
    margin-right: 20px;
  }
}

.addEdit {
  background-color: #e05635;
  color: #fff;
  border-radius: 5px;
  &:hover {
    background-color: #e05635;
    color: #fff;
    border-color: #dcdfe6;
  }
}
.org {
  .app-container {
    margin: 0 0 10px 0 !important;
  }
}
.el-card {
  border-radius: 8px;
  border: none;
  .el-card__header {
    background: #f8faff;
    border-bottom: 0px solid #e6ebf5;
  }
}

.log-list {
  width: 100%;
  padding: 20px;
  padding-top: 0;
  .test {
    width: 100%;
    display: -webkit-box;
    // display: flex;
    /deep/ .el-row {
      width: 100%;
    }
    .log-list-right {
      flex: 1;
      // 新添加的
      margin-left: 20px;

      .log-list-right-table {
        min-height: calc(75vh - 0px);
      }
      /deep/ .el-card__header {
        background-color: #fafafa;
        // border-radius: 8px 8px 0 0;
      }
      /deep/ .el-card.is-always-shadow {
        border-radius: 4px !important;
        box-shadow: none;
      }
      /deep/ .el-select {
        width: 100%;
      }
      // 新添加的
      /deep/ .custom-theme .el-input.is-disabled .el-input__inner {
        background-color: #fafafa !important;
        color: red;
      }
    }
    .log-list-left,
    .log-list-right {
      // height: 870px;

      background-color: #fff;
      border-radius: 4px;
      /deep/ .el-scrollbar {
        border-radius: 8px;
      }
    }
    .log-list-right{
      background-color: #f3f4f7;
    }
  }

  /deep/ .org-index {
    .el-card__body {
      // border-top: 1px solid #e5e7ec;
      // margin: 0px 60px;
      box-sizing: border-box;
      padding-top: 20px !important;
      padding: 0 28px;
      padding-bottom: 20px;
    }
  }
}
/deep/ .el-pager li.active {
  color: #e15536;
}
/deep/ .el-pagination__total {
  color: #20232a;
}
/deep/ .el-pagination button:hover {
  color: #e15536;
}
/deep/ .el-pagination__sizes .el-input .el-input__inner:hover {
  border-color: #e15536;
}
</style>
