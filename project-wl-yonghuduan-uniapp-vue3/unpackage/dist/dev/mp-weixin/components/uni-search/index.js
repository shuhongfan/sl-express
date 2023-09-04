"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "index",
  props: {
    isShowCancel: {
      type: Boolean,
      default: false
    }
  },
  emits: "handleSearch",
  setup(__props, { emit }) {
    const searchVal = common_vendor.ref("");
    let capsuleTop = common_vendor.ref();
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          capsuleTop.value = common_vendor.index.getMenuButtonBoundingClientRect().top;
        }
      });
    });
    const handleCancel = () => {
      searchVal.value = "";
      emit("handleSearch", searchVal);
    };
    const handleSearch = (e) => {
      searchVal.value = e.detail.value;
      emit("handleSearch", searchVal);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "search",
          size: "18",
          color: "#999"
        }),
        b: common_vendor.o(handleSearch),
        c: common_vendor.o([($event) => searchVal.value = $event.detail.value, handleSearch]),
        d: searchVal.value,
        e: searchVal.value
      }, searchVal.value ? {
        f: common_vendor.o(handleCancel)
      } : {}, {
        g: common_vendor.unref(capsuleTop) + "px"
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-39bdeeba"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/components/uni-search/index.vue"]]);
wx.createComponent(Component);
