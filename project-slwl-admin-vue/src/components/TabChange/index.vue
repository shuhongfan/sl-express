<!-- 卡片切换组件 -->
<template>
  <el-card
    shadow="never"
    class="tabchange-card"
  >
    <div class="tab-change">
      <div
        v-for="item in settingList"
        :key="item.value"
        class="tab-item"
        :class="{ active: item.value == activeIndex }"
        @click="tabChange(item.value)"
      >
        <span class="status">{{ item.label }}</span>
        <span
          v-if="isShowNum"
          class="status-num"
          style="font-weight: bold"
        >{{
          item.num
        }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'TabChange',
  props: {
    defaultActiveIndex: {
      type: Number,
      required: true
    },
    settingList: {
      type: Array,
      required: true
    },
    isShowNum: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeIndex: this._props.defaultActiveIndex || 0
    }
  },

  methods: {
    tabChange(activeIndex) {
      this.activeIndex = activeIndex
      this.$emit('tabChange', activeIndex)
    }
  }
}
</script>
<style lang="scss">
.tabchange-card {
  height: 48px;
  margin-top: 20px;
  .el-card__body {
    padding: 0px;
  }
  .tab-change {
    display: flex;
    border-radius: 4px;

    .tab-item {
      width: 120px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      color: #333;
      font-size: 14px;
      background-color: white;

      cursor: pointer;
      .special-item {
        .el-badge__content {
          width: 20px;
          padding: 0 5px;
        }
      }
      .item {
        .el-badge__content {
          background-color: #fd3333 !important;
          line-height: 18px;
          height: auto;
          min-width: 18px;
          min-height: 18px;
          // border-radius: 50%;
        }
        .el-badge__content.is-fixed {
          top: 14px;
          right: 2px;
        }
      }
    }
    .active {
      background-color: #ffeeeb;
      color: #e15536;
    }
  }
}
</style>
