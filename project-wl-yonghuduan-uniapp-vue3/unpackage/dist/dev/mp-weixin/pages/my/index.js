"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_api_my = require("../api/my.js");
var utils_index = require("../../utils/index.js");
require("../../utils/request.js");
require("../../utils/env.js");
require("../api/login.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const token = common_vendor.ref();
    const sexList = common_vendor.reactive(["\u5973", "\u7537"]);
    let nickName = common_vendor.ref("");
    let avatarUrl = common_vendor.ref("");
    let startDate = common_vendor.ref();
    let endDate = common_vendor.ref();
    let idCard = common_vendor.ref("");
    let name = common_vendor.ref("");
    let sex = common_vendor.ref(1);
    let birthday = common_vendor.ref("1995-09-01");
    const isRealNameAuth = common_vendor.ref(false);
    common_vendor.onShow(() => {
      startDate.value = getDate("start");
      endDate.value = getDate("end");
      nickName.value = common_vendor.index.getStorageSync("nickName") || "\u795E\u9886\u7528\u6237";
      avatarUrl.value = common_vendor.index.getStorageSync("avatarUrl") || "../../static/defaultHeadImg.png";
      token.value = common_vendor.index.getStorageSync("token");
      baseUserInfo();
    });
    const handleLogout = () => {
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.removeStorageSync("nickName");
      common_vendor.index.removeStorageSync("avatarUrl");
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    const baseUserInfo = () => {
      pages_api_my.getUserInfo().then((res) => {
        if (res) {
          isRealNameAuth.value = Boolean(res.data.idCardNoVerify);
          idCard.value = res.data.idCardNo || "";
          name.value = res.data.name;
          sex.value = res.data.sex;
          birthday.value = res.data.birthday;
          nickName.value = res.data.phone;
          common_vendor.index.setStorageSync("nickName", res.data.phone);
        }
      });
    };
    const getDate = (type) => {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    };
    const toLogin = () => {
      if (common_vendor.index.getStorageSync("token")) {
        getUserInfoFunc();
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/index"
        });
      }
    };
    const handleToAddress = () => {
      common_vendor.index.navigateTo({
        url: common_vendor.index.getStorageSync("token") ? "/pages/address/index?type=address&isFromAddress=true" : "/pages/login/index"
      });
    };
    const handleTorealName = () => {
      if (!common_vendor.index.getStorageSync("token")) {
        return common_vendor.index.navigateTo({
          url: "/pages/login/index"
        });
      }
      if (isRealNameAuth.value) {
        common_vendor.index.navigateTo({
          url: "/subPages/authentication-success/index?name=" + name.value + "&idCard=" + idCard.value
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/subPages/realName-authentication/index"
        });
      }
    };
    const getDateChange = (e) => {
      pages_api_my.updateUserInfo({
        birthday: e.detail.value
      }).then((res) => {
        baseUserInfo();
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
      });
    };
    const changeSex = (e) => {
      pages_api_my.updateUserInfo({
        sex: Number(e.detail.value)
      }).then((res) => {
        baseUserInfo();
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(avatarUrl),
        b: common_vendor.t(common_vendor.unref(nickName)),
        c: common_vendor.o(toLogin),
        d: common_vendor.o(handleToAddress),
        e: common_vendor.o(handleTorealName),
        f: common_vendor.o((...args) => common_vendor.unref(utils_index.handleSecondQi) && common_vendor.unref(utils_index.handleSecondQi)(...args)),
        g: token.value
      }, token.value ? {
        h: common_vendor.t(common_vendor.unref(sex) ? "\u7537" : "\u5973"),
        i: common_vendor.o(changeSex),
        j: common_vendor.unref(sex),
        k: sexList,
        l: common_vendor.t(common_vendor.unref(birthday)),
        m: common_vendor.unref(birthday),
        n: common_vendor.unref(startDate),
        o: common_vendor.unref(endDate),
        p: common_vendor.o(getDateChange)
      } : {}, {
        q: token.value
      }, token.value ? {
        r: common_vendor.o(handleLogout)
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4dcceeb0"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/pages/my/index.vue"]]);
wx.createPage(MiniProgramPage);
