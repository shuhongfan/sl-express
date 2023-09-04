"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_api_order = require("../../pages/api/order.js");
var utils_index = require("../../utils/index.js");
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
    const twoLine = common_vendor.ref();
    const orderInfo = common_vendor.reactive({
      estimatedStartTime: "",
      receiverName: "",
      receiverAddress: "",
      receiverPhone: "",
      senderName: "",
      senderAddress: "",
      senderPhone: "",
      goods: "",
      goodsWeight: "",
      paymentMethod: "",
      amount: ""
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.onLoad((options) => {
      orderId.value = options.orderId;
      getOrderDetailFun();
    });
    const handleToLink = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    const handleToOrderInfo = (event, id) => {
      common_vendor.index.navigateTo({
        url: "/subPages/order-info/index?orderId=" + orderId.value
      });
    };
    const handleSecondQi = () => {
      common_vendor.index.showToast({
        title: "\u7A0B\u5E8F\u5458\u54E5\u54E5\u6B63\u5728\u5B9E\u73B0\u4E2D",
        icon: "none",
        duration: 1e3
      });
    };
    const getOrderDetailFun = () => {
      pages_api_order.getOrderDetail(orderId.value).then((res) => {
        const {
          estimatedStartTime,
          receiverName,
          senderName,
          receiverProvince,
          receiverCity,
          receiverCounty,
          receiverAddress,
          senderProvince,
          senderCity,
          senderCounty,
          senderAddress,
          orderCargoVOS,
          paymentMethod,
          amount,
          senderPhone,
          receiverPhone
        } = res.data;
        orderInfo.estimatedStartTime = estimatedStartTime;
        orderInfo.receiverName = receiverName;
        orderInfo.senderName = senderName;
        orderInfo.receiverAddress = receiverProvince.name + receiverCity.name + receiverCounty.name + receiverAddress;
        orderInfo.senderAddress = senderProvince.name + senderCity.name + senderCounty.name + senderAddress;
        orderInfo.goods = orderCargoVOS[0].name + (orderCargoVOS[0].goodsType ? "(" + orderCargoVOS[0].goodsType.name + ")" : "");
        orderInfo.goodsWeight = orderCargoVOS[0].totalWeight;
        orderInfo.paymentMethod = paymentMethod === 1 ? "\u5BC4\u4ED8" : "\u5230\u4ED8";
        orderInfo.amount = amount;
        orderInfo.receiverPhone = receiverPhone;
        orderInfo.senderPhone = senderPhone;
        common_vendor.nextTick(() => {
          common_vendor.index.createSelectorQuery().select(".send-desc").boundingClientRect((res2) => {
            let height = res2.height;
            let line = height / 15;
            twoLine.value = line;
          }).exec();
        });
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "\u4E0B\u5355\u6210\u529F",
          handleToLink,
          src: "../../static/order-success-goBack.png"
        }),
        b: orderInfo.estimatedStartTime
      }, orderInfo.estimatedStartTime ? {
        c: common_vendor.t(common_vendor.unref(utils_index.handleTimeToStrTime)(orderInfo.estimatedStartTime))
      } : {}, {
        d: twoLine.value >= 2 ? 1 : "",
        e: common_vendor.t(orderInfo.senderName),
        f: common_vendor.t(orderInfo.senderPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")),
        g: common_vendor.t(orderInfo.senderAddress),
        h: common_vendor.t(orderInfo.receiverName),
        i: common_vendor.t(orderInfo.receiverPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")),
        j: common_vendor.t(orderInfo.receiverAddress),
        k: common_vendor.t(orderInfo.goods),
        l: common_vendor.t(orderInfo.goodsWeight),
        m: common_vendor.t(orderInfo.paymentMethod),
        n: common_vendor.t(orderInfo.amount),
        o: common_vendor.t(orderInfo.amount),
        p: common_vendor.o(handleToOrderInfo),
        q: common_vendor.o(handleSecondQi),
        r: common_vendor.o(handleSecondQi)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-56fe3aea"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/subPages/order-success/index.vue"]]);
wx.createPage(MiniProgramPage);
