"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_api_order = require("../../pages/api/order.js");
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
    const orderId = common_vendor.ref();
    let defaultReason = common_vendor.ref(1);
    common_vendor.onLoad((options) => {
      orderId.value = options.orderId;
    });
    const customerReason = common_vendor.reactive([
      {
        value: 1,
        label: "\u8BA1\u5212\u6709\u53D8\uFF0C\u4E0D\u9700\u8981\u5BC4\u4E86"
      },
      {
        value: 2,
        label: "\u6362\u4E2A\u65F6\u95F4\u518D\u5BC4"
      },
      {
        value: 3,
        label: "\u53BB\u670D\u52A1\u70B9\u81EA\u5BC4"
      }
    ]);
    const senderReason = common_vendor.reactive([
      {
        value: 4,
        label: "\u9001\u8FBE\u65F6\u95F4\u4E0D\u80FD\u8FBE\u5230\u6211\u7684\u8981\u6C42"
      },
      {
        value: 5,
        label: "\u8FD0\u8D39\u592A\u8D35\u4E86"
      },
      {
        value: 6,
        label: "\u5FEB\u9012\u5458\u672A\u53CA\u65F6\u53D6\u4EF6"
      },
      {
        value: 7,
        label: "\u5FEB\u9012\u5458\u4E0D\u4E0A\u95E8"
      },
      {
        value: 8,
        label: "\u5FEB\u9012\u5458\u670D\u52A1\u6001\u5EA6\u5DEE"
      }
    ]);
    const handleConfirmCancel = () => {
      pages_api_order.cancelOrder(orderId.value).then((res) => {
        common_vendor.index.showToast({
          title: "\u53D6\u6D88\u6210\u529F",
          icon: "none",
          success: () => {
          },
          duration: 2e3
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 2500);
      }).catch(() => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
      });
    };
    const handleNoCancel = () => {
      common_vendor.index.navigateBack();
    };
    const checkbox = (value) => {
      defaultReason.value = value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u53D6\u6D88\u8BA2\u5355"
        }),
        b: common_vendor.f(customerReason, (item, index, i0) => {
          return {
            a: String(item.value),
            b: item.value === common_vendor.unref(defaultReason),
            c: common_vendor.t(item.label),
            d: index,
            e: common_vendor.o(($event) => checkbox(item.value), index)
          };
        }),
        c: common_vendor.f(senderReason, (item, index, i0) => {
          return {
            a: String(item.value),
            b: item.value === common_vendor.unref(defaultReason),
            c: common_vendor.t(item.label),
            d: index,
            e: common_vendor.o(($event) => checkbox(item.value), index)
          };
        }),
        d: common_vendor.o(handleNoCancel),
        e: common_vendor.o(handleConfirmCancel)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c6dafee"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/subPages/order-cancel/index.vue"]]);
wx.createPage(MiniProgramPage);
