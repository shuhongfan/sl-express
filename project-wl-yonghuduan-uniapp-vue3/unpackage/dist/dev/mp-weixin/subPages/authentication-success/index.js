"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_api_my = require("../../pages/api/my.js");
require("../../utils/request.js");
require("../../utils/env.js");
require("../../pages/api/login.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let src = common_vendor.ref("../../static/idcard-goback.png");
    let idCard = common_vendor.ref("");
    let name = common_vendor.ref("");
    let alertDialog = common_vendor.ref("");
    let capsuleTop = common_vendor.ref();
    common_vendor.onLoad((options) => {
      idCard.value = options.idCard || "";
      name.value = options.name;
      common_vendor.index.getSystemInfo({
        success: (res) => {
          capsuleTop.value = common_vendor.index.getMenuButtonBoundingClientRect().top;
        }
      });
    });
    const handleTo = () => {
      common_vendor.index.navigateBack();
    };
    const handleDelete = () => {
      alertDialog.value.open();
    };
    const dialogConfirm = () => {
      pages_api_my.getRealNameStatusApi({
        flag: 0
      }).then((res) => {
        if (res.code !== 200) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none",
            duration: 1e3
          });
        } else {
          common_vendor.index.showToast({
            title: "\u5220\u9664\u6210\u529F",
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
    const dialogClose = () => {
      alertDialog.value.close();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(src),
        b: common_vendor.o(handleTo),
        c: common_vendor.unref(capsuleTop) + 9 + "px",
        d: common_vendor.t(common_vendor.unref(name)),
        e: common_vendor.t(common_vendor.unref(idCard)),
        f: common_vendor.o(handleDelete),
        g: common_vendor.o(dialogConfirm),
        h: common_vendor.o(dialogClose),
        i: common_vendor.p({
          type: "info",
          cancelColor: "red",
          cancelText: "\u53D6\u6D88",
          confirmText: "\u786E\u5B9A",
          title: "\u786E\u5B9A\u5220\u9664\u5B9E\u540D\u4FE1\u606F\u5417\uFF1F",
          content: "\u5220\u9664\u540E\uFF0C\u5BC4\u4EF6\u65F6\u9700\u51FA\u793A\u8EAB\u4EFD\u8BC1\u4EF6\u4F9B\r\n\u5FEB\u9012\u5458\u91CD\u65B0\u91C7\u96C6\u8EAB\u4EFD\u4FE1\u606F"
        }),
        j: common_vendor.sr(alertDialog, "5f422b5e-0", {
          "k": "alertDialog"
        }),
        k: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5f422b5e"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/subPages/authentication-success/index.vue"]]);
wx.createPage(MiniProgramPage);
