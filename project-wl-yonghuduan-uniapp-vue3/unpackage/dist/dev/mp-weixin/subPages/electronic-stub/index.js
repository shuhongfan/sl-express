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
    let orderId = common_vendor.ref();
    let orderInfo = common_vendor.reactive({
      estimatedArrivalTime: "",
      receiverName: "",
      receiverAddress: "",
      receiverProvince: "",
      receiverPhone: "",
      senderName: "",
      senderAddress: "",
      senderProvince: "",
      senderPhone: "",
      goods: "",
      goodsWeight: "",
      paymentMethod: "",
      amount: "",
      barCode: "",
      transportOrderId: ""
    });
    let sendIsOpen = common_vendor.ref(false);
    let getIsOpen = common_vendor.ref(false);
    common_vendor.onLoad((options) => {
      orderId.value = options.orderId;
      getOrderDetailFunc();
    });
    const getClick = () => {
      getIsOpen.value = !getIsOpen.value;
    };
    const sendClick = () => {
      sendIsOpen.value = !sendIsOpen.value;
    };
    const getOrderDetailFunc = () => {
      pages_api_order.getOrderDetail(orderId.value).then((res) => {
        const {
          estimatedArrivalTime,
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
          receiverPhone,
          createTime,
          barCode,
          transportOrderId
        } = res.data;
        orderInfo.estimatedArrivalTime = estimatedArrivalTime;
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
        orderInfo.receiverProvince = receiverProvince.name;
        orderInfo.senderProvince = senderProvince.name;
        orderInfo.createTime = createTime;
        orderInfo.barCode = barCode;
        orderInfo.transportOrderId = transportOrderId;
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u7535\u5B50\u5B58\u6839"
        }),
        b: common_vendor.unref(orderInfo).barCode,
        c: common_vendor.t(common_vendor.unref(orderInfo).transportOrderId),
        d: common_vendor.t(common_vendor.unref(orderInfo).senderName),
        e: common_vendor.t(common_vendor.unref(sendIsOpen) ? common_vendor.unref(orderInfo).senderPhone : common_vendor.unref(orderInfo).senderPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")),
        f: common_vendor.unref(sendIsOpen) ? "../../static/zhengkai.png" : "../../static/biyan.png",
        g: common_vendor.o(sendClick),
        h: common_vendor.t(common_vendor.unref(orderInfo).senderAddress),
        i: common_vendor.t(common_vendor.unref(orderInfo).receiverName),
        j: common_vendor.t(common_vendor.unref(getIsOpen) ? common_vendor.unref(orderInfo).receiverPhone : common_vendor.unref(orderInfo).receiverPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")),
        k: common_vendor.unref(getIsOpen) ? "../../static/zhengkai.png" : "../../static/biyan.png",
        l: common_vendor.o(getClick),
        m: common_vendor.t(common_vendor.unref(orderInfo).receiverAddress),
        n: common_vendor.t(common_vendor.unref(orderInfo).goods),
        o: common_vendor.t(common_vendor.unref(orderInfo).goodsWeight),
        p: common_vendor.t(common_vendor.unref(orderInfo).paymentMethod),
        q: common_vendor.t(common_vendor.unref(orderInfo).amount),
        r: common_vendor.t(common_vendor.unref(orderInfo).createTime),
        s: common_vendor.t(common_vendor.unref(orderInfo).transportOrderId)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eccf7176"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/subPages/electronic-stub/index.vue"]]);
wx.createPage(MiniProgramPage);
