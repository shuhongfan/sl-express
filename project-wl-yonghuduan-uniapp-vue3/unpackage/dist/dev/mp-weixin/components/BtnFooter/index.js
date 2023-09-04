"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  props: {
    btnText: {
      type: String,
      default: "\u786E\u5B9A"
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ["@confirm"],
  setup(__props, { emit: emits }) {
    const handleClick = () => {
      emits("confirm");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.btnText),
        b: common_vendor.n(__props.isActive ? "active" : ""),
        c: common_vendor.o(handleClick)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e2d1a4f"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/components/BtnFooter/index.vue"]]);
wx.createComponent(Component);
