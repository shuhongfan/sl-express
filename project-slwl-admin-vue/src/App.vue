<template>
  <div
    id="app"
  >
    <el-scrollbar
      ref="main"
      style="height: 100%; width: 100%"
    >
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date()
    }
  },
  watch: {
    // 解决页面跳转后无法回到新页面顶部的问题
    $route() {
      const main = this.$refs.main
      main.wrap.scrollTop = 0
    }
  },
  methods: {
    goJobsArea() {
      this.$router.push('/organization/institutions-jobs-area')
    },
    goOperational() {
      this.$router.push('/branches/operational')
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  /* min-width: 1620px; */
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
