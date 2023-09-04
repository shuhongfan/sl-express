"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "payType",
  emits: ["@getPayType"],
  setup(__props, { expose, emit: emits }) {
    const popup = common_vendor.ref();
    const payType = common_vendor.ref(1);
    const list = common_vendor.reactive([
      {
        title: "\u5BC4\u4ED8",
        subTitle: "\u5FEB\u9012\u5458\u53D6\u4EF6\u65F6\uFF0C\u5BC4\u65B9\u53EF\u5728\u7EBF\u652F\u4ED8\u3001\u626B\u5FEB\u9012\u5458\u6536\u6B3E\u7801\u8FDB\u884C\u652F\u4ED8",
        value: 1
      },
      {
        title: "\u5230\u4ED8",
        subTitle: "\u5FEB\u9012\u7B7E\u6536\u540E\uFF0C\u6536\u65B9\u53EF\u901A\u8FC7\u626B\u5FEB\u9012\u5458\u6536\u6B3E\u7801\u8FDB\u884C\u652F\u4ED8",
        value: 2
      }
    ]);
    const handleChangePayType = (item) => {
      payType.value = item.value;
    };
    const handleOpen = () => {
      popup.value.open("bottom");
    };
    const handleCancel = () => {
      popup.value.close("bottom");
      emits("getPayType", payType.value);
    };
    expose({
      handleOpen
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleCancel),
        b: common_vendor.f(list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.subTitle),
            c: item.value === payType.value ? 1 : "",
            d: index,
            e: common_vendor.o(($event) => handleChangePayType(item), index)
          };
        }),
        c: common_vendor.o(handleCancel),
        d: common_vendor.sr(popup, "3e8a4ebe-0", {
          "k": "popup"
        }),
        e: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false
        })
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3e8a4ebe"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/pages/express-delivery/components/payType.vue"]]);
wx.createComponent(Component);
