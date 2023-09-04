<!-- 数据空展示组件 -->
<template>
  <div class="empty-box">
    <img
      v-if="!src"
      class="icon"
      src="@/assets/icon-empty.png"
    />
    <img
      v-else
      class="icon"
      src="@/assets/empty.png"
    />
    <span
      class="label"
      style="margin-top: 25px; color: #818693"
    >{{
      desc || '没有找到您要的内容哦~'
    }}</span>
  </div>
</template>

<script>
export default {
  components: {},
  filters: {},
  props: {
    src: {
      type: String,
      required: false,
      default: ''
    },
    desc: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.empty-box {
  width: 100%;
  min-height: 320px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  .icon {
    width: 336px;
    height: 232px;
  }
  .label {
    font-size: 14px;
    color: #20232a;
    line-height: 21px;
  }
}
</style>
