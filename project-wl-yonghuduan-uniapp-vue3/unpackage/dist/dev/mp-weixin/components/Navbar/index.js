"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  props: {
    title: {
      type: String,
      default: ""
    },
    handleToLink: {
      type: Function
    },
    src: {
      type: String,
      default: "../../static/goBack.png"
    }
  },
  setup(__props) {
    const props = __props;
    let deviceNavHeight = common_vendor.ref();
    let capsuleTop = common_vendor.ref();
    let capsuleBottom = common_vendor.ref();
    let all = common_vendor.ref();
    let capsuleHeight = common_vendor.ref();
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          deviceNavHeight.value = res.statusBarHeight;
          capsuleTop.value = common_vendor.index.getMenuButtonBoundingClientRect().top;
          capsuleBottom.value = common_vendor.index.getMenuButtonBoundingClientRect().bottom;
          all.value = capsuleTop.value + capsuleBottom.value - deviceNavHeight.value + "px";
          capsuleHeight.value = common_vendor.index.getMenuButtonBoundingClientRect().height;
        }
      });
    });
    const handleTo = () => {
      if (props.handleToLink) {
        props.handleToLink();
      } else {
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: __props.src,
        c: common_vendor.o(handleTo),
        d: common_vendor.unref(capsuleTop) + "px",
        e: common_vendor.unref(capsuleHeight) + "px",
        f: common_vendor.unref(all)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6e7b2b6e"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/components/Navbar/index.vue"]]);
wx.createComponent(Component);
