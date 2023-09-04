"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  props: {
    tabBars: {
      type: Object,
      default: () => ({})
    },
    staticNum: {
      type: Object
    }
  },
  emits: "",
  setup(__props, { expose, emit }) {
    const scrollinto = common_vendor.ref("tab0");
    let tabIndex = common_vendor.ref(0);
    const changeTab = (index) => {
      if (tabIndex.value == index) {
        return;
      }
      tabIndex.value = index;
      emit("getTabIndex", index);
      scrollinto.value = "tab" + index;
    };
    expose({
      changeTab
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.tabBars, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(__props.staticNum[index]),
            c: common_vendor.n(common_vendor.unref(tabIndex) == index ? "scroll-row-item-act" : "scroll-row-item-normal"),
            d: index,
            e: "tab" + index,
            f: common_vendor.o(($event) => changeTab(index), index)
          };
        }),
        b: scrollinto.value
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/components/uni-tab/index.vue"]]);
wx.createComponent(Component);
