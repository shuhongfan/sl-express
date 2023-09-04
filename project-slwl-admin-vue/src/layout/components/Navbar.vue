<template>
  <div class="navbar new-navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />
    <div class="right-menu">
      <template v-if="device !== 'mobile'"> </template>
      <div class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img
            :src="avatar"
            class="user-avatar"
            alt="avatar"
          />
          <span
            class="user-name new-name"
            style="margin-right: 8px;"
          >{{ name }}</span>
          <el-divider direction="vertical" />
          <img
            src="@/assets/tuichu.png"
            alt=""
            class="user-avatar"
            style="width: 18px;height: 19px;border-radius : 0; margin-left: 8px;"
            @click="logout"
          >
        </div>
        <!-- <el-dropdown-menu
          slot="dropdown"
          style="width: 140px; text-align: center; padding: 0 0"
          class="new-dropdown-menu"
        >
          <el-dropdown-item divided>
            <span
              style="display: block"
              @click="logout"
            >退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu> -->
      </div>
    </div>

    <!-- 添加清除缓存弹框重做 -->
    <el-dialog
      title="清除确认"
      :visible.sync="dialogVisible"
      width="394px"
      height="234px"
      :before-close="handleClose"
      top="30vh"
      style="text-align: center"
      :modal-append-to-body="false"
    >
      <img
        class="warn-img"
        src="@/assets/warn.png"
        alt=""
      />
      <p>是否立即清除用户权限缓存？</p>
      <span
        slot="footer"
        class="dialog-footer"
        style="text-align: right"
      >
        <el-button
          type="primary"
          style="
            background-color: #e15536;
            color: #ffffff;
            width: 90px;
            border: none;
          "
          @click="newDeleteDialog"
        >确 定</el-button>
        <el-button
          style="width: 90px; margin-right: 16px"
          @click="canleFn"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import db from '@/utils/localstorage'
import Cookies from 'js-cookie'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  filters: {
    userAvatarFilter(name) {
      return name !== undefined ? name.charAt(0) : ''
    }
  },
  data() {
    return {
      breadcrumbObjList: [],
      flag: false,
      dialogVisible: false
    }
  },
  computed: {
    breadcrumbList() {
      const arr = []
      const menuList = JSON.parse(window.localStorage.getItem('USER_ROUTER'))
      const _this = this
      menuList.some(function isHas(obj) {
        if (obj.name === _this.$route.meta.title) {
          arr.unshift(obj)
          return true
        } else if (
          obj.children &&
          obj.children.length &&
          obj.children.some(isHas)
        ) {
          arr.unshift(obj)
          return true
        } else {
          return false
        }
      })
      return arr
    },

    sidebar() {
      return this.$store.state.setting.sidebar
    },
    avatar() {
      const user = this.$store.state.account.user
      if (!user['avatar']) {
        return require(`@/assets/avatar/default.jpg`)
      } else {
        if (
          user['avatar'].startsWith('http://') ||
          user['avatar'].startsWith('https://')
        ) {
          return user['avatar']
        } else {
          return require(`@/assets/avatar/${user.avatar}`)
        }
      }
    },
    name() {
      return this.$store.state.account.user.name
    },
    device() {
      return this.$store.state.setting.device
    }
  },
  watch: {
    $route(to, from) {},
    immediate: true
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handleMessage)
  },
  mounted() {
    console.dir(this.$t, 'thissss')
    window.addEventListener('message', this.handleMessage)
  },
  methods: {
    getRouters() {
      const menuListPinda = JSON.parse(
        window.localStorage.getItem('USER_ROUTER')
      )[0].children
        ? JSON.parse(window.localStorage.getItem('USER_ROUTER'))[0].children
        : []
      const routers = []
      menuListPinda.forEach(function getr(obj) {
        obj.meta = {
          title: obj.name,
          id: obj.path
        }
        if (obj.component) {
          routers.push(obj)
        }
        if (obj.children) obj.children.forEach(getr)
      })
      return routers
    },
    toggleSideBar() {
      this.$store.commit('setting/toggleSidebar')
    },
    setting() {
      this.$store.commit('setting/openSettingBar', true)
    },
    logout() {
      this.clean()
    },
    clean() {
      Cookies.set('TENANT')
      Cookies.set('ACCESS_TOKEN', '')
      Cookies.set('REFRESH_TOKEN', '')
      Cookies.set('TOKEN', '')
      Cookies.set('EXPIRE_TIME', '')
      db.clear()
      location.reload()
    },
    // 添加清除弹框新增的逻辑
    handleClose() {
      this.dialogVisible = false
    },
    // 确认动作
    newDeleteDialog() {
      db.remove('USER_ROUTER')
      db.remove('PERMISSIONS')
      location.reload()
    },
    // 取消动作
    canleFn() {
      this.dialogVisible = false
    },
    deleteCache() {
      this.dialogVisible = true
    },
    // 监听子Iframe传递token失效
    handleMessage(event) {
      if (event.data.data && event.data.data === 'tokenFailed' && !this.flag) {
        this.flag = true
        this.$alert('很抱歉，认证已失效，请重新登录', '提醒', {
          confirmButtonText: '确定',
          showClose: false,
          callback: () => {
            this.clean()
            window.location.hash = '/login'
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  // height: 61px;
  // overflow: hidden;
  position: relative;
  // background: #fff;
  // border-bottom: 1px solid #f1f1f1;
  // border-radius: 4px;
  .hamburger-container {
    // line-height: 60px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    // line-height: 60px;
    // margin-top: 18px!important;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    // line-height: 60px;
    position: relative;
    bottom: 5px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      // 新添加的
      .new-dropdown-menu {
        margin-right: 30px;
        padding: 0 20px;
        /deep/ .el-dropdown-menu__item {
          width: 100%;
        }
      }

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
          width: 100%;
        }
      }

      /deep/ .el-dropdown-menu__item {
        border: 1px solid red;
      }
      /deep/ .el-dropdown-menu__item:not(.is-disabled):hover,
      /deep/ .el-dropdown-menu__item:focus {
        width: 100%;
      }

      /deep/ .custom-theme .el-dropdown-menu__item--divided {
        margin-top: 0px !important;
      }
      /deep/ .el-dropdown-menu__item--divided {
        margin-top: 0px !important;
      }
      /deep/ .custom-theme .el-dropdown-menu__item--divided:before {
        height: 0px !important;
      }
      /deep/ .el-dropdown-menu__item--divided:before {
        height: 0px !important;
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        .user-name {
          vertical-align: middle;
          font-size: 1rem;
          margin-left: 5px;
          margin-top: -4px;
          display: inline-block;
        }
        // 新添加的
        .new-name {
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #072c56;
        }
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.new-navbar {
  /deep/ .el-dialog {
    transform: none;
    left: 0;
    position: relative;
    margin: auto;
    border-radius: 8px;
  }
  // 新加header样式优化
  /deep/ .el-dialog__header {
    text-align: left;
    padding: 15px 30px;
    background-color: rgb(77, 105, 190);
    border-radius: 8px 8px 0 0;
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
    padding: 20px 20px 0px 20px;
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
  /deep/ .custom-theme .el-date-editor .el-range__icon {
    color: 'rgba(224,86,53,1)' !important;
  }
}

/deep/ .custom-theme .el-dropdown-menu__item--divided {
  margin-top: 0px !important;
}
/deep/ .el-dropdown-menu__item--divided {
  margin-top: 0px !important;
}
/deep/ .custom-theme .el-dropdown-menu__item--divided:before {
  height: 0px !important;
}
/deep/ .el-dropdown-menu__item--divided:before {
  height: 0px !important;
}
</style>
