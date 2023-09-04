"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_validate = require("../../utils/validate.js");
var pages_api_my = require("../../pages/api/my.js");
require("../../utils/request.js");
require("../../utils/env.js");
require("../../pages/api/login.js");
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let namePlaceholder = common_vendor.ref("\u8BF7\u586B\u5199");
    let idcardPlaceholder = common_vendor.ref("\u8BF7\u586B\u5199");
    let showClearIconName = common_vendor.ref(false);
    let showClearIcon = common_vendor.ref(false);
    let nameInputValue = common_vendor.ref("");
    let inputClearValue = common_vendor.ref("");
    const isCanAuth = common_vendor.computed$1(() => {
      return utils_validate.validateIdentityCard(inputClearValue.value) && nameInputValue.value;
    });
    const clearInput = (event) => {
      inputClearValue.value = event.detail.value;
      if (event.detail.value.length > 0) {
        showClearIcon.value = true;
      } else {
        showClearIcon.value = false;
        idcardPlaceholder.value = "\u8BF7\u586B\u5199";
      }
    };
    const clearInputName = (event) => {
      nameInputValue.value = event.detail.value;
      if (event.detail.value.length > 0) {
        showClearIconName.value = true;
      } else {
        showClearIconName.value = false;
        namePlaceholder.value = "\u8BF7\u586B\u5199";
      }
    };
    const clearIconName = () => {
      nameInputValue.value = "";
      showClearIconName.value = false;
      namePlaceholder.value = "\u8BF7\u586B\u5199";
      if (!inputClearValue.value) {
        idcardPlaceholder.value = "\u8BF7\u586B\u5199";
      }
    };
    const clearIcon = () => {
      inputClearValue.value = "";
      showClearIcon.value = false;
      idcardPlaceholder.value = "\u8BF7\u586B\u5199";
      if (!nameInputValue.value) {
        namePlaceholder.value = "\u8BF7\u586B\u5199";
      }
    };
    const doAuth = () => {
      if (!isCanAuth.value) {
        return common_vendor.index.showToast({
          title: "\u4FE1\u606F\u586B\u5199\u4E0D\u5B8C\u6574",
          icon: "none",
          duration: 1e3
        });
      }
      pages_api_my.getRealNameStatusApi({
        flag: 1,
        idCard: inputClearValue.value,
        name: nameInputValue.value
      }).then((res) => {
        if (res.code !== 200) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none",
            duration: 1e3
          });
        } else {
          common_vendor.index.showToast({
            title: "\u8BA4\u8BC1\u6210\u529F",
            icon: "none",
            duration: 1e3
          });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/my/index"
            });
          }, 2e3);
        }
      }).catch(() => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "\u5B9E\u540D\u8BA4\u8BC1"
        }),
        b: common_vendor.o(clearInputName),
        c: common_vendor.unref(nameInputValue),
        d: common_vendor.unref(namePlaceholder),
        e: common_vendor.unref(showClearIconName)
      }, common_vendor.unref(showClearIconName) ? {
        f: common_vendor.o(clearIconName)
      } : {}, {
        g: common_vendor.o(clearInput),
        h: common_vendor.unref(inputClearValue),
        i: common_vendor.unref(idcardPlaceholder),
        j: common_vendor.unref(showClearIcon)
      }, common_vendor.unref(showClearIcon) ? {
        k: common_vendor.o(clearIcon)
      } : {}, {
        l: common_vendor.n(common_vendor.unref(isCanAuth) ? "active" : ""),
        m: common_vendor.o(doAuth)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71333222"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/subPages/realName-authentication/index.vue"]]);
wx.createPage(MiniProgramPage);
