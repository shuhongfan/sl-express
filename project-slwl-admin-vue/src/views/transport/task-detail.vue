<!-- 运输任务详情 -->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div
        v-for="(item, index) in menu"
        :key="index"
        class="item"
      >
        <div
          :is="item.comp"
          class="content"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import taskInfo from './components/task-info'
import missionLocus from './components/mission-locus'
import waybillDetail from './components/waybill-detail'
import deliveryPic from './components/delivery-pic'
import pickPic from './components/pick-pic'
export default {
  // 注册组件
  components: {
    taskInfo,
    missionLocus,
    waybillDetail,
    deliveryPic,
    pickPic
  },
  data() {
    return {
      // formData: {},
      // 当前选中的组件
      currentComp: 'taskInfo',
      // 当前选中的li标签
      isActive: '1',
      id: '',
      menu: [
        {
          name: '基本信息',
          value: '1',
          comp: taskInfo
        },
        {
          name: '任务轨迹',
          value: '2',
          comp: missionLocus
        },
        {
          name: '运单详情',
          value: '3',
          comp: waybillDetail
        },
        {
          name: '交付照片',
          value: '4',
          comp: deliveryPic
        },
        {
          name: '提货照片',
          value: '5',
          comp: pickPic
        }
      ]
    }
  },
  created() {},
  methods: {
    goBack() {}
  }
}
</script>
<style lang="scss" scoped>

/deep/ .hidden {
  .el-card {
    display: none;
  }
  .car-base {
    margin-bottom: 0 !important;
  }
  .mission-locus.map-btn-box,
  .map {
    display: none;
  }
  .demo-input-suffix {
    display: none;
  }
}
.active {
  color: #ff643d;
}
/deep/ .show-hidden-btn {
  display: inline-block;
  float: right;
  color: #419eff;
  font-size: 14px;
  cursor: pointer;
}

.app-container {
  padding-bottom: 0px;
  .aside-box {
    background: #ffffff;
    border-radius: 4px;
    width: 150px;
    padding: 37px 35px;
    box-sizing: border-box;
    min-height: calc(100vh - 50px);
    /deep/ .el-aside {
      width: 80px !important;
      background-color: #ffffff;
      text-align: left;
      font-size: 14px;
      .aside-item {
        margin-top: 38px;
        cursor: pointer;
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
  /deep/ .item {
    margin-bottom: 20px;
    .car-base {
      margin-top: 0px;
      height: 60px;
      background-color: #f8faff;
      padding: 20px 20px 20px 44px;
      margin-bottom: 20px;
    }
    .el-card__body {
      padding: 0;
    }
    .form-box {
      .el-card__body {
        padding-bottom: 30px !important;
        padding-right: 40px;
        padding-left: 20px;
      }
    }

    .block {
      padding: 0;
    }
    .customer-details-box {
      margin-left: 0px;
    }
    .el-input__inner {
      background-color: white;
      border: none;
      height: 20px;
      color: #818693;
    }
  }
}
</style>
