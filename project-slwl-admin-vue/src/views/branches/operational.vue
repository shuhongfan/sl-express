<!-- 快递作业管理 -->
<template>
  <div class="dashboard-container operational">
    <div class="app-container">
      <el-card
        shadow="never"
        class="operation-box"
      >
        <div
          v-for="(item, index) in menu"
          :key="index"
          class="operation-item"
          :class="{ active: isActive == item.value ? true : false }"
          @click="
            isActive = item.value
            currentComp = item.comp
          "
        >
          {{ item.name }}
        </div>
      </el-card>
      <el-container>
        <test1 :is="currentComp" />
      </el-container>
    </div>
  </div>
</template>
<script>
import pickUptask from './components/pickup-task'
import dispatchTask from './components/dispatch-task'
import cancelTask from './components/cancel-task'
export default {
  name: 'Courses',
  components: {
    pickUptask,
    dispatchTask,
    cancelTask
  },
  data() {
    return {
      city: '',
      value: '',
      currentComp: 'pickUptask',
      isActive: '1',
      id: '',
      menu: [
        {
          name: '取件作业',
          value: '1',
          comp: 'pickUptask'
        },
        {
          name: '派件作业',
          value: '2',
          comp: 'dispatchTask'
        }
        // {
        //   name: '已取消',
        //   value: '3',
        //   comp: 'cancelTask'
        // }
      ]
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
  created() {},
  // 组件更新
  updated: function () {},
  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.operational {
  .operation-box {
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
    /deep/ .el-card__body {
      padding: 0;
      display: flex;
    }
    .operation-item {
      width: 120px;
      font-size: 14px;
      text-align: center;
      font-weight: 400;
      color: #20232a;
      cursor: pointer;
      &.active {
        background: #ffeeeb;
        color: #e15536;
      }
    }
  }
}
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 10px;
}
</style>
<style lang="scss" scoped>
.active {
  color: #ff643d;
}
</style>
