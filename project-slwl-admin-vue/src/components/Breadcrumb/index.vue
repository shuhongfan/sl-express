<template>
  <div
    v-if="$route.meta.pageHeader"
    style="float: left; position: relative;  margin-left: 20px"
  >
    <el-page-header
      style="font-weight: bold; color: #2a2929; font-size: 20px"
      :content="$route.meta.title"
      title="返回"
      @back="goBack"
    />
  </div>
  <div
    v-else
    style="float: left; margin-left: 2px"
  >
    <font style="font-size: 16px; color: #2a2929; font-weight: bold">{{
      this.$route.meta.title
    }}</font>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter((item) => item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        // eslint-disable-next-line object-curly-spacing
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(
          matched
        )
      }
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
