<!-- 登录页 -->
<template>
  <div class="login-container">
    <div class="shadow"></div>
    <video
      src="../../assets/video.mp4"
      autoplay
      loop
      muted
      style="width: 100%; height: 100%; object-fit: fill"
    ></video>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      autocomplete="off"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <img src="../../assets/logo1.png" />
      </div>
      <span v-if="login.type === 'up'">
        <el-form-item
          v-show="isMultiTenant"
          prop="tenant"
        >
          <el-input
            ref="tenant"
            v-model="loginForm.tenant"
            :placeholder="$t('login.tenant')"
            autocomplete="off"
            name="tenant"
            prefix-icon="el-icon-user"
            type="text"
            style="width: 300px"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="account">
          <!--  style="width:255px"  -->
          <el-input
            ref="account"
            v-model="loginForm.account"
            :placeholder="$t('login.username')"
            autocomplete="off"
            name="account"
            type="text"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
          <img
            src="../../assets/icon-account.png"
            class="icon-img"
          />
        </el-form-item>
        <el-form-item prop="password">
          <!--  style="width:255px"  -->
          <el-input
            ref="password"
            v-model="loginForm.password"
            :placeholder="$t('login.password')"
            :show-password="true"
            autocomplete="off"
            name="password"
            type="password"
            @keyup.enter.native="handleLogin"
          />
          <img
            src="../../assets/icon-password.png"
            class="icon-img"
          />
        </el-form-item>
        <el-form-item
          class="code-input"
          prop="code"
        >
          <el-input
            ref="code"
            v-model="loginForm.code"
            :placeholder="$t('login.code')"
            autocomplete="off"
            name="code"
            style="width: 100%"
            type="text"
            @keyup.enter.native="handleLogin"
          />
          <img
            src="../../assets/icon-code.png"
            class="icon-img"
          />
          <img
            :src="imageCode"
            alt="codeImage"
            class="code-image"
            @click="getCodeImage"
          />
        </el-form-item>

        <el-button
          :loading="loading"
          class="login-button"
          type="primary"
          @click.native.prevent="handleLogin"
        >{{ $t('login.logIn') }}</el-button>
      </span>
      <span v-if="login.type === 'social'">
        {{ $t('login.chooseToSignIn') }}
        <div>
          <template v-for="(l, index) in logo">
            <div
              :key="index"
              class="logo-wrapper"
            >
              <img
                :class="{ radius: l.radius }"
                :src="resolveLogo(l.img)"
                alt
                @click="socialLogin(l.name)"
              />
            </div>
          </template>
        </div>
      </span>
      <span
        v-if="login.type === 'bind'"
        style="margin-top: -1rem"
      >
        <el-tabs
          v-model="tabActiveName"
          @tab-click="handleTabClick"
        >
          <el-tab-pane
            :label="$t('common.bindLogin')"
            name="bindLogin"
          >
            <el-form-item prop="bindAccount">
              <el-input
                ref="bindAccount"
                v-model="loginForm.bindAccount"
                :placeholder="$t('login.account')"
                autocomplete="off"
                name="bindAccount"
                prefix-icon="el-icon-user"
                type="text"
              />
            </el-form-item>
            <el-form-item prop="bindPassword">
              <el-input
                ref="bindPassword"
                v-model="loginForm.bindPassword"
                :placeholder="$t('login.password')"
                :show-password="true"
                autocomplete="off"
                name="bindPassword"
                prefix-icon="el-icon-key"
                type="password"
              />
            </el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="login-button2"
              @click.native.prevent="bindLogin"
            >{{ $t('common.bindLogin') }}</el-button>
          </el-tab-pane>
          <el-tab-pane
            :label="$t('common.signLogin')"
            name="signLogin"
          >
            <el-form-item prop="signAccount">
              <el-input
                ref="signAccount"
                v-model="loginForm.signAccount"
                :placeholder="$t('login.account')"
                autocomplete="off"
                name="signAccount"
                prefix-icon="el-icon-user"
                type="text"
              />
            </el-form-item>
            <el-form-item prop="signPassword">
              <el-input
                ref="signPassword"
                v-model="loginForm.signPassword"
                :placeholder="$t('login.password')"
                :show-password="true"
                autocomplete="off"
                name="signPassword"
                prefix-icon="el-icon-key"
                type="password"
              />
            </el-form-item>
            <el-button
              :loading="loading"
              class="login-button2"
              type="primary"
              @click.native.prevent="signLogin"
            >{{ $t('common.signLogin') }}</el-button>
          </el-tab-pane>
        </el-tabs>
      </span>
      <!--<el-dropdown class="login-type" placement="top-end">-->
      <!--<span class="el-dropdown-link">-->
      <!--<el-link type="primary">{{ $t("login.ortherLoginType") }}</el-link>-->
      <!--</span>-->
      <!--<el-dropdown-menu slot="dropdown">-->
      <!--<el-dropdown-item-->
      <!--:disabled="login.type === 'up'"-->
      <!--@click.native="login.type = 'up'"-->
      <!--&gt;{{ $t("login.type.up") }}</el-dropdown-item-->
      <!--&gt;-->
      <!--<el-dropdown-item-->
      <!--:disabled="login.type === 'social'"-->
      <!--@click.native="login.type = 'social'"-->
      <!--&gt;{{ $t("login.type.social") }}</el-dropdown-item-->
      <!--&gt;-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
    </el-form>
    <div class="login-footer">
      <div
        style="
          font-size: 14px;
          color: white;
          text-align: center;
          position: absolute;
          bottom: 0;
          left: 0%;
          width: 100%;
          opacity: 0.9;
        "
      >
        江苏传智播客教育科技股份有限公司
        <span
          style="margin-left: 20px"
        >版权所有Copyright 2006-2022 All Rights Reserved</span>
        <span style="margin-left: 20px">苏ICP备16007882号-11</span>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/utils/localstorage'
import { randomNum } from '@/utils'
import { socialLoginUrl } from '@/settings'
import { getCaptcha, login, loginLog } from '@/api/login.js'
import commonApi from '@/api/common.js'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data () {
    return {
      // 是否启用多租户
      isMultiTenant: process.env.VUE_APP_IS_MULTI_TENANT === 'true',
      tabActiveName: 'bindLogin',
      login: {
        type: 'up'
      },
      logo: [
        { img: 'gitee.png', name: 'gitee', radius: true },
        { img: 'github.png', name: 'github', radius: true },
        { img: 'tencent_cloud.png', name: 'tencent_cloud', radius: true },
        { img: 'qq.png', name: 'qq', radius: false },
        { img: 'dingtalk.png', name: 'dingtalk', radius: true },
        { img: 'microsoft.png', name: 'microsoft', radius: false }
      ],
      // 登录表单
      loginForm: {
        // 账户
        account: 'shenlingadmin', // 用户名
        password: '123456', // 密码
        tenant: '0000',
        bindAccount: '',
        bindPassword: '',
        signAccount: '',
        signPassword: '',
        code: ''
      },
      // 登录表单验证规则
      rules: {
        // 账户
        account: {
          required: true,
          message: this.$t('rules.require'), // $t是vue-i18n的方法，用于国际化，作用是获取国际化语言包中的值，在这里用于将rules.require的值赋给message并
          trigger: 'blur'
        },
        tenant: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'blur'
        },
        password: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'blur'
        },
        code: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'blur'
        },
        bindAccount: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'blur'
        },
        bindPassword: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'blur'
        },
        signAccount: [
          {
            required: true,
            message: this.$t('rules.require'),
            trigger: 'blur'
          },
          {
            min: 4,
            max: 10,
            message: this.$t('rules.range4to10'),
            trigger: 'blur'
          }
        ],
        signPassword: [
          {
            required: true,
            message: this.$t('rules.require'),
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: this.$t('rules.range6to20'),
            trigger: 'blur'
          }
        ]
      },
      authUser: null,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      randomId: randomNum(24, 16),
      imageCode: '',
      page: {
        width: window.screen.width * 0.5,
        height: window.screen.height * 0.5
      }
    }
  },
  created () { },
  mounted () {
    db.clear()
    Cookies.remove('TENANT')
    Cookies.remove('ACCESS_TOKEN')
    Cookies.remove('REFRESH_TOKEN')
    Cookies.remove('TOKEN')
    Cookies.remove('EXPIRE_TIME')
    this.getCodeImage()
  },
  destroyed () {
    window.removeEventListener('message', this.resolveSocialLogin)
  },
  methods: {
    getCodeImage () {
      getCaptcha(this.randomId)
        .then((response) => {
          const res = response
          if (res.byteLength <= 100) {
            this.$message({
              message: this.$t('tips.systemError'),
              type: 'error'
            })
          }
          return (
            'data:image/png;base64,' +
            btoa(
              new Uint8Array(res).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            )
          )
        })
        .then((res) => {
          this.imageCode = res
        })
        .catch((e) => {
          if (e.toString().indexOf('429') !== -1) {
            this.$message({
              message: this.$t('tips.tooManyRequest'),
              type: 'error'
            })
          } else {
            this.$message({
              message: this.$t('tips.getCodeImageFailed'),
              type: 'error'
            })
          }
        })
    },
    handleTabClick (tab) {
      this.tabActiveName = tab.name
    },
    resolveLogo (logo) {
      return require(`@/assets/logo/${logo}`)
    },
    socialLogin (oauthType) {
      const url = `${socialLoginUrl}/${oauthType}/login`
      window.open(
        url,
        'newWindow',
        `resizable=yes, height=${this.page.height}, width=${this.page.width}, top=10%, left=10%, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no`
      )
      window.addEventListener('message', this.resolveSocialLogin, false)
    },
    resolveSocialLogin (e) {
      const data = e.data
      const that = this
      if (data.message === 'not_bind') {
        that.login.type = 'bind'
        const authUser = data.data
        that.authUser = authUser
        that
          .$confirm(
            that.$t('common.current') +
            authUser.source +
            that.$t('common.socialAccount') +
            authUser.nickname +
            that.$t('common.socialTips'),
            that.$t('common.tips'),
            {
              confirmButtonText: that.$t('common.signLogin'),
              cancelButtonText: that.$t('common.bindLogin'),
              type: 'warning'
            }
          )
          .then(() => {
            that.tabActiveName = 'signLogin'
          })
          .catch(() => {
            that.tabActiveName = 'bindLogin'
          })
      } else if (data.message === 'social_login_success') {
        that.saveLoginData(data.data)
        that.getUserDetailInfo()
        that.loginSuccessCallback(data.account)
      } else {
        // do nothing
      }
    },
    bindLogin () {
      let account_c = false
      let password_c = false
      this.$refs.loginForm.validateField('bindAccount', (e) => {
        if (!e) {
          account_c = true
        }
      })
      this.$refs.loginForm.validateField('bindPassword', (e) => {
        if (!e) {
          password_c = true
        }
      })
      if (account_c && password_c) {
        this.loading = true
        const that = this
        const params = {
          bindAccount: that.loginForm.bindAccount,
          bindPassword: that.loginForm.bindPassword,
          ...that.authUser
        }
        params.token = null
        that
          .$post('auth/social/bind/login', params)
          .then((r) => {
            const data = r.data.data
            this.saveLoginData(data)
            this.getUserDetailInfo()
            this.loginSuccessCallback(that.loginForm.bindAccount)
          })
          .catch((error) => {
            console.error(error)
            that.loading = false
          })
      }
    },
    // 登录
    signLogin () {
      let account_c = false
      let password_c = false
      this.$refs.loginForm.validateField('signAccount', (e) => {
        if (!e) {
          account_c = true
        }
      })
      this.$refs.loginForm.validateField('signPassword', (e) => {
        if (!e) {
          password_c = true
        }
      })
      if (account_c && password_c) {
        this.loading = true
        const that = this
        const params = {
          bindAccount: that.loginForm.signAccount,
          bindPassword: that.loginForm.signPassword,
          ...that.authUser
        }
        params.token = null
        that
          .$post('auth/social/sign/login', params)
          .then((r) => {
            const data = r.data.data
            this.saveLoginData(data)
            this.getUserDetailInfo()
            this.loginSuccessCallback(that.loginForm.signAccount)
          })
          .catch((error) => {
            console.error(error)
            that.loading = false
          })
      }
    },
    // 登录
    handleLogin () {
      let account_c = false
      let password_c = false
      let tenant_c = false
      let code_c = false
      // 验证
      this.$refs.loginForm.validateField('tenant', (e) => {
        if (!e) {
          tenant_c = true
        }
      })
      // 验证账号
      this.$refs.loginForm.validateField('account', (e) => {
        if (!e) {
          account_c = true
        }
      })
      // 验证密码
      this.$refs.loginForm.validateField('password', (e) => {
        if (!e) {
          password_c = true
        }
      })
      // 验证验证码
      this.$refs.loginForm.validateField('code', (e) => {
        if (!e) {
          code_c = true
        }
      })
      if (account_c && password_c && code_c && tenant_c) {
        this.loading = true
        const that = this
        that.loginForm['key'] = that.randomId
        login(this.loginForm).then((response) => {
          const res = response
          // debugger;
          if (res.code === 200) {
            // 登录成功的处理
            that.saveLoginData(res.data.token.token, res.data.user) // 保存token
            that.saveUserInfo(res.data.user, res.data.permissionsList || [])
            // loginLog(res.data.user.account, this.$t('tips.loginSuccess'))
            // that.$message({
            //   message: this.$t('tips.loginSuccess'),
            //   type: 'success'
            // })
            that.loading = false

            // if (process.env.NODE_ENV === 'production') {
            //   // 生产环境跳转到项目课程简介页
            //   const query = encodeURIComponent(
            //     `from=${location.origin}/&resource=https://v.itheima.net/project_index_img/76VmUR.png`
            //   )
            //   location.href = `https://pmp-preview.itheima.net/j8rXem/?${query}`
            // } else {
            //   // 开发环境直接跳转到首页
            that.$router.push('/')
            // }
          } else {
            // 登录失败的处理
            that.loading = false
            that.getCodeImage() // 刷新验证码
            this.$message({ message: res.msg, type: 'error' }) // 登录失败,提示错误信息
            this.$store.commit('account/setTenant', this.loginForm.tenant) // 保存账户
            // loginLog(that.loginForm.account, res.msg)// 登录日志
          }
        })
      }
    },
    // 保存登录信息，token
    saveLoginData (token, user) {
      // this.$store.commit('account/setTenant', user.id)
      this.$store.commit('account/setToken', token) // 设置token
      // const current = new Date()
      // const expireTime = current.setTime(
      //   current.getTime() + 1000 * token.expire
      // )
      // this.$store.commit('account/setExpireTime', expireTime)
    },
    // 保存用户信息
    saveUserInfo (user, permissionsList) {
      this.$store.commit('account/setUser', user)
      // TODO 从后台拉取权限列表
      // const permissions = [
      //   "org:view",
      //   "org:add",
      //   "org:update",
      //   "org:delete",
      //   "org:export",
      //   "user:view",
      //   "user:add",
      //   "user:update",
      //   "user:delete",
      //   "user:reset",
      //   "user:export",
      //   "station:view",
      //   "station:add",
      //   "station:update",
      //   "station:delete",
      //   "station:export",
      //   "menu:view",
      //   "menu:add",
      //   "menu:update",
      //   "menu:delete",
      //   "menu:export",
      //   "resource:view",
      //   "resource:add",
      //   "resource:update",
      //   "resource:delete",
      //   "resource:export",
      //   "role:view",
      //   "role:add",
      //   "role:update",
      //   "role:delete",
      //   "role:export",
      //   "role:auth",
      //   "role:config",
      //   "client:view",
      //   "client:add",
      //   "client:decrypt",
      //   "log:view",
      //   "log:export",
      //   "monitor:loginlog",
      //   "loginlog:export",
      //   "monitor:register",
      //   "monitor:zipkin",
      //   "monitor:kibana",
      //   "mobitor:admin",
      //   "monitor:swagger",
      //   "grafana:view",
      //   "gen:config",
      //   "gen:generate",
      //   "gen:generate:gen",
      //   "others:eximport"
      // ]
      this.$store.commit('account/setPermissions', permissionsList)
    },
    // 获取用户详细信息
    loginSuccessCallback () {
      // 登录成功后的回调，记录登录日志，最后登录时间等
      commonApi.dictionaryEnums().then((response) => {
        const res = response.data
        if (res.isSuccess) {
          this.$store.commit('common/setEnums', res.data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #283443;
$light_gray: #fff;
$cursor: #555;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 5px;
      color: #000000;
      // height: 28px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  /deep/ .el-input--prefix .el-input__inner {
    padding-left: 48px;
    line-height: 54px;
    height: 54px;
    border-radius: 5px;
  }

  /deep/ .el-input__icon {
    line-height: 54px;
    font-size: 20px;
    padding-left: 12px;

    // 新添加的
    padding-right: 26px;
  }

  // 新增处理的样式-2021-03-09
  /deep/ .el-form-item__content {
    //   line-height: 59px !important;
    position: relative;
    .icon-img {
      width: 21px;
      height: 21px;
      position: absolute;
      left: 14px;
      top: 13px;
    }
    .el-input__inner {
      padding-left: 48px;
      height: 50px;
    }
    //   font-size: 16px;
  }

  /deep/ .el-form-item {
    // border: 1px solid #dedede;
    border-radius: 5px;
    color: #454545;
    transition: all 0.3s;
    &:hover {
      border-color: #57a3f3;
    }
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #aaa;
$light_gray: #eee;

.login-button {
  width: 100%;
  height: 54px;
  margin-bottom: 14px;
  margin-top: 22px;
  background-color: #e15536;
  border: 0px;
  font-size: 18px;
  color: white;
  font-weight: bold;
}
.login-button2{
  width: 100%; margin-bottom: 14px
}
.login-container {
  // background: url(../../assets/background.png) 100% no-repeat;
  background-size: 100% 100%;
  // width: 65%;
  height: 100vh;
  overflow-y: hidden;
  position: relative;
  video {
    // width: 100%;
  }
  .shadow {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.3;
    background: #1a1c41;
  }
  .login-info {
    position: absolute;
    left: 15%;
    top: 44%;
    margin-top: -100px;
    color: #fff;
    .title {
      font-size: 1.8rem;
      font-weight: 600;
    }
    .sub-title {
      font-size: 1.5rem;
      margin: 0.3rem 0 0.7rem 1rem;
    }
    .desc {
      font-size: 0.96rem;
      line-height: 1.9rem;
    }
  }
  .login-form {
    border-radius: 10px;
    position: absolute;
    top: 45%;
    left: 45%;
    margin: -180px 0 0 -160px;
    width: 450px;
    height: 467px;
    padding: 36px 40px;
    background: #fff;
    border-radius: 10px;
    .code-input {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
      position: relative;
    }
    .code-image {
      display: inline-block;
      vertical-align: top;
      width: 71px;
      height: 32px;
      cursor: pointer;
      margin-left: 10px;
      position: absolute;
      right: 10px;
      top: 9px;
    }
    .login-type {
      text-align: right;
      display: inline-block;
      width: 100%;
    }
    .logo-wrapper {
      display: inline-block;
      margin: 10px 0;
      img {
        width: 1.9rem;
        display: inline-block;
        margin: 0.8rem 0.8rem -0.8rem 0.8rem;
        cursor: pointer;
        &.radius {
          border-radius: 50%;
        }
      }
    }
  }
  .login-footer {
    position: fixed;
    bottom: 20px;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 0.85rem;
    line-height: 1rem;
    height: 1rem;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;
    // margin-bottom: 20px;
    margin-bottom: 28px;
    text-align: center;
    .title {
      font-size: 20px;
      color: rgba(0, 0, 0, 0.85);
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    img {
      // width: 270px;
      height: 54px;
    }
    .set-language {
      color: #aaa;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0;
      cursor: pointer;
    }
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }

  @media screen and (max-width: 1100px) {
    .login-info {
      left: 8%;
    }
  }

  @media screen and (max-width: 970px) {
    .login-form {
      left: 50%;
    }
    .login-info {
      display: none;
    }
  }
}
</style>
