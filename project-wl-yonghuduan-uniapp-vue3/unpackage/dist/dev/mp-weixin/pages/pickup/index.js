"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_commonData = require("../../utils/commonData.js");
var pages_api_order = require("../api/order.js");
require("../../utils/request.js");
require("../../utils/env.js");
require("../api/login.js");
if (!Math) {
  (SearchPage + UniTab + common_vendor.unref(OrderList))();
}
const SearchPage = () => "../../components/uni-search/index.js";
const UniTab = () => "../../components/uni-tab/index.js";
const OrderList = () => "./components/orderList.js";
const _sfc_main = {
  __name: "index",
  emits: "",
  setup(__props, { emit }) {
    const tab = common_vendor.ref();
    const tabBars = utils_commonData.DeliveryData;
    let tabIndex = common_vendor.ref(0);
    let staticNum = common_vendor.reactive({
      data: [0, 0]
    });
    common_vendor.reactive(/* @__PURE__ */ new Map());
    let orderListRef = common_vendor.ref();
    let deviceNavHeight = common_vendor.ref();
    let capsuleTop = common_vendor.ref();
    let capsuleBottom = common_vendor.ref();
    let all = common_vendor.ref();
    let capsuleHeight = common_vendor.ref();
    let serchValue = common_vendor.ref();
    common_vendor.onShow(() => {
      getStaticNum();
      orderListRef.value && getTabIndex(tabIndex.value);
    });
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
    const handleSearch = (index) => {
      serchValue.value = index.value;
      orderListRef.value.indexGetOrderListFunc({
        keyword: index.value
      });
    };
    const getStaticNum = () => {
      pages_api_order.getGoodsNum().then((res) => {
        if (res.code === 200) {
          staticNum.data = [res.data["1"], res.data["2"]];
        }
      });
    };
    const getTabIndex = (index) => {
      tabIndex.value = index;
      orderListRef.value.indexGetOrderListFunc({
        mailType: index + 1
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearch),
        b: common_vendor.sr(tab, "0e6a68f8-1", {
          "k": "tab"
        }),
        c: common_vendor.o(getTabIndex),
        d: common_vendor.p({
          tabBars: common_vendor.unref(tabBars),
          staticNum: common_vendor.unref(staticNum).data
        }),
        e: common_vendor.unref(capsuleBottom) + "px",
        f: common_vendor.sr(orderListRef, "0e6a68f8-2", {
          "k": "orderListRef"
        }),
        g: common_vendor.o(_ctx.stopRefreshFunc),
        h: common_vendor.p({
          serchValue: common_vendor.unref(serchValue)
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e6a68f8"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/pages/pickup/index.vue"]]);
wx.createPage(MiniProgramPage);
