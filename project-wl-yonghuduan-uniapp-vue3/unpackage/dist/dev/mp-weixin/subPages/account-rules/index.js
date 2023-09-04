"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const topList = common_vendor.reactive([
      {
        title: "\u91CD\u91CF\u5C0F\u4F53\u79EF\u5C0F",
        subTitle: "\u6309\u91CD\u91CF\u8BA1\u8D39"
      },
      {
        title: "\u91CD\u91CF\u5C0F\u4F53\u79EF\u5927",
        subTitle: "\u6309\u4F53\u79EF\u8BA1\u8D39"
      },
      {
        title: "\u91CD\u91CF\u5927\u4F53\u79EF\u5927",
        subTitle: "\u91CD\u91CF\u4F53\u79EF\u53D6\u9AD8\u8BA1\u8D39"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u8BA1\u8D39\u89C4\u5219"
        }),
        b: common_vendor.f(topList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.subTitle),
            c: index
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-51ac3806"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/subPages/account-rules/index.vue"]]);
wx.createPage(MiniProgramPage);
