"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  props: {
    handleToRefresh: {
      type: Function
    }
  },
  setup(__props) {
    const props = __props;
    const handleTo = () => {
      props.handleToRefresh();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleTo)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33ea5bd3"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/components/NetFail/index.vue"]]);
wx.createComponent(Component);
